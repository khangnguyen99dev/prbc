<?php

namespace App\Http\Controllers\WorkSpace;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PurchaseRequest;
use App\Models\PurchaseRequestItem;
use App\Models\PurchaseRequestApprover;
use Illuminate\Support\Facades\DB;
use App\Services\PurchaseRequestService;
use App\Notifications\PurchaseRequestApproval;
use Illuminate\Support\Facades\Notification;
use App\Models\PurchaseRequestHistory;
use App\Models\EntityBudget;
use App\Models\EntityBudgetMonth;
use Carbon\Carbon;
use App\Models\Currency;
use App\Http\Requests\WorkSpace\PurchaseRequestRequest;

class PurchaseRequestController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('WorkSpace - Can View Purchase Request')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $purchaseRequests = PurchaseRequest::with('entity');

        if (!empty($request->entity_name)){
            $purchaseRequests->whereHas('entity', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->entity_name . '%');
            });
        }

        if (!$user->hasRole('Super Admin')){
            $purchaseRequests->where('entity_id', $user->entity_id);
        }

        if (!empty($request->pr_date)){
            $purchaseRequests->whereBetween('date', [$request->pr_date . ' 00:00:00', $request->pr_date . ' 23:59:59']);
        }

        if (!empty($request->status)){
            $purchaseRequests->where('status', $request->status);
        }

        if (!empty($request->pr_number)){
            $purchaseRequests->where('pr_number', 'like', '%' . $request->pr_number . '%');
        }

        $purchaseRequests = $purchaseRequests->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'error' => false,
            'purchase_requests' => $purchaseRequests
        ]);
    }


    public function store(PurchaseRequestRequest $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('WorkSpace - Can Create Purchase Request')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $currency = Currency::where('currency_code', $request->currency)->first();
        $exchangeRate = $currency->current_exchange_rate;
        if (empty($exchangeRate)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, exchange rate not found."
            ]);
        }

        $totalPriceInLocalCurrency = 0;
        foreach ($request->items as $item) {
            $totalPriceInLocalCurrency += $item['total_price'] * $exchangeRate;
        }
        $year = Carbon::createFromFormat('Y-m-d', $request->pr_date)->format('Y');
        $month = Carbon::createFromFormat('Y-m-d', $request->pr_date)->format('m');

        $entityBudget = EntityBudget::where('entity_id', $request->entity_id)
            ->where('year', $year)
            ->first();

        if (empty($entityBudget)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, entity budget not found with year " . $year . "."
            ]);
        }

        $entityBudgetMonth = EntityBudgetMonth::where('entity_budget_id', $entityBudget->id)
            ->where('month', $month)
            ->where('year', $year)
            ->first();

        if (empty($entityBudgetMonth)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, entity budget month not found with month " . $month . "."
            ]);
        }

        $availableBudgetInLocalCurrency = $entityBudgetMonth->getAvailableBudgetAmount();

        if ($totalPriceInLocalCurrency > $availableBudgetInLocalCurrency) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, total price is greater than available budget amount."
            ]);
        }

        try {
            $pr = DB::transaction(function () use ($request, $user, $exchangeRate) {
                $purchaseRequest = PurchaseRequest::create([
                    'entity_id' => $request->entity_id,
                    'pr_number' => $request->pr_number,
                    'pr_name' => $request->pr_name,
                    'date' => $request->pr_date,
                    'description' => $request->pr_description,
                    'local_currency' => config('currencies.default'),
                    'currency' => $request->currency,
                    'exchange_rate' => $exchangeRate,
                    'requester_id' => $user->id,
                    'status' => 'Draft',
                    'approval_level_approved' => 0,
                    'approval_level_required' => $request->approval_level_required,
                ]);

                $amountInLocalCurrency = 0;
                $amountInDocCurrency = 0;
                foreach ($request->items as $item) {
                    PurchaseRequestItem::create([
                        'purchase_request_id' => $purchaseRequest->id,
                        'item_code' => $item['item_code'],
                        'item_name' => $item['item_name'],
                        'item_description' => $item['item_description'],
                        'quantity' => $item['quantity'],
                        'unit_price' => $item['unit_price'],
                        'total_price' => $item['total_price'],
                        'exchange_rate' => $exchangeRate,
                        'total_price_in_local_currency' => $item['total_price'] * $exchangeRate,
                        'uom' => $item['uom'],
                        'required_by' => $item['required_by'],
                        'status' => 'Pending'
                    ]);

                    $amountInLocalCurrency += $item['total_price'] * $exchangeRate;
                    $amountInDocCurrency += $item['total_price'];
                }

                $purchaseRequest->amount_in_local_currency = $amountInLocalCurrency;
                $purchaseRequest->amount_in_document_currency = $amountInDocCurrency;

                $purchaseRequest->save();

                foreach ($request->approver_users_selected as $approver_item) {
                    foreach ($approver_item["approver_user_id"] as $user_id) {
                        PurchaseRequestApprover::create([
                            'purchase_request_id' => $purchaseRequest->id,
                            'approver_id' => $user_id,
                            'level' => $approver_item["level"],
                            'status' => 'Pending'
                        ]);
                    }
                }

                PurchaseRequestHistory::create([
                    'purchase_request_id' => $purchaseRequest->id,
                    'user_id' => auth()->user()->id,
                    'action' => 'Create',
                    'comment' => '',
                    'status' => 'Draft',
                ]);

                return $purchaseRequest;
            }, 5);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'error_message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'error' => false,
            'purchase_request' => $pr,
            'success_message' => 'Purchase request created successfully'
        ]);
    }

    public function show($id)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('WorkSpace - Can View Purchase Request')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $purchaseRequest = PurchaseRequest::with('entity', 'items', 'approvers.approver')->find($id);

        $levelSetup = PurchaseRequestService::levelSetup();

        return response()->json([
            'error' => false,
            'purchase_request' => $purchaseRequest,
            'level_setup' => $levelSetup
        ]);
    }

    public function setup()
    {
        $prNumber = PurchaseRequestService::getAutoGeneratePRNumber();
        $levelSetup = PurchaseRequestService::levelSetup();

        return response()->json([
            'error' => false,
            'pr_number' => $prNumber,
            'level_setup' => $levelSetup
        ]);
    }

    public function getAvailableBudget(Request $request)
    {
        if (empty($request->entity_id)) {
            return response()->json([
                'error' => true,
                'error_message' => 'Sorry, entity is required.'
            ]);
        }

        $year = Carbon::createFromFormat('Y-m-d', $request->pr_date)->format('Y');
        $month = Carbon::createFromFormat('Y-m-d', $request->pr_date)->format('m');

        $entityBudget = EntityBudget::where('entity_id', $request->entity_id)
            ->where('year', $year)
            ->first();

        if (empty($entityBudget)) {
            return response()->json([
                'error' => false,
                'available_budget_label' => 'Entity budget not found. Please setup entity budget first.',
            ]);
        }

        $entityBudgetMonth = EntityBudgetMonth::where('entity_budget_id', $entityBudget->id)
            ->where('month', $month)
            ->where('year', $year)
            ->first();

        if (empty($entityBudgetMonth)) {
            return response()->json([
                'error' => false,
                'available_budget_label' => 'Entity budget month not found. Please setup entity budget month first.',
            ]);
        }

        $availableBudgetInLocalCurrency = $entityBudgetMonth->getAvailableBudgetAmount();

        $exchangeRate = 0;
        $availableBudgetInDocCurrency = 0;
        if (!empty($request->currency)) {
            $currency = Currency::where('currency_code', $request->currency)->first();
            if (empty($currency)) {
                return response()->json([
                    'error' => false,
                    'available_budget_label' => 'Currency not found.',
                ]);
            }
            $exchangeRate = $currency->current_exchange_rate;
            if (empty($exchangeRate)) {
                return response()->json([
                    'error' => false,
                    'available_budget_label' => 'Exchange rate not found.',
                ]);
            }
            $availableBudgetInDocCurrency = $availableBudgetInLocalCurrency * (1 / $exchangeRate);
        }

        return response()->json([
            'error' => false,
            'available_budget_label' => '',

            'currency_in_local' => config('currencies.default'),
            'available_budget_in_local_currency' => $availableBudgetInLocalCurrency,

            'currency_in_doc' => $request->currency,
            'available_budget_in_doc_currency' => $availableBudgetInDocCurrency,

            'exchange_rate' => $exchangeRate,
        ]);
    }

    public function update(PurchaseRequestRequest $request, $id)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('WorkSpace - Can Update Purchase Request')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $purchaseRequest = PurchaseRequest::find($id);
        
        if (empty($purchaseRequest)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, purchase request not found."
            ]);
        }

        $currency = Currency::where('currency_code', $request->currency)->first();
        $exchangeRate = $currency->current_exchange_rate;
        if (empty($exchangeRate)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, exchange rate not found."
            ]);
        }

        $totalPriceInLocalCurrency = 0;
        foreach ($request->items as $item) {
            $totalPriceInLocalCurrency += $item['total_price'] * $exchangeRate;
        }
        $year = Carbon::createFromFormat('Y-m-d', $request->pr_date)->format('Y');
        $month = Carbon::createFromFormat('Y-m-d', $request->pr_date)->format('m');

        $entityBudget = EntityBudget::where('entity_id', $request->entity_id)
            ->where('year', $year)
            ->first();

        if (empty($entityBudget)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, entity budget not found with year " . $year . "."
            ]);
        }

        $entityBudgetMonth = EntityBudgetMonth::where('entity_budget_id', $entityBudget->id)
            ->where('month', $month)
            ->where('year', $year)
            ->first();

        if (empty($entityBudgetMonth)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, entity budget month not found with month " . $month . "."
            ]);
        }

        $availableBudgetInLocalCurrency = $entityBudgetMonth->getAvailableBudgetAmount();

        if ($purchaseRequest->entity_id == $request->entity_id) {
            $availableBudgetInLocalCurrency = $availableBudgetInLocalCurrency + $purchaseRequest->amount_in_local_currency;
        }

        if ($totalPriceInLocalCurrency > $availableBudgetInLocalCurrency) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, total price is greater than available budget amount."
            ]);
        }

        try {
            DB::transaction(function () use ($request, $user, $purchaseRequest, $exchangeRate) {
                $purchaseRequest->update([
                    'entity_id' => $request->entity_id,
                    'pr_number' => $request->pr_number,
                    'pr_name' => $request->pr_name,
                    'date' => $request->pr_date,
                    'description' => $request->pr_description,
                    'currency' => $request->currency,
                    'exchange_rate' => $exchangeRate,
                    'status' => 'Draft',
                    'approval_level_approved' => 0,
                    'approval_level_required' => $request->approval_level_required,
                ]);

                $amountInLocalCurrency = 0;
                $amountInDocCurrency = 0;

                $deleteItemIds = $request->delete_item_ids;
                if (!empty($deleteItemIds)) {
                    PurchaseRequestItem::whereIn('id', $deleteItemIds)->delete();
                }

                foreach ($request->items as $item) {

                    $purchaseRequestItem = null;
                    if (!empty($item['id'])) {
                        $purchaseRequestItem = PurchaseRequestItem::find($item['id']);
                    }
                    
                    if (!empty($purchaseRequestItem)) {
                        $purchaseRequestItem->update([
                            'item_code' => $item['item_code'],
                            'item_name' => $item['item_name'],
                            'item_description' => $item['item_description'],
                            'quantity' => $item['quantity'],
                            'unit_price' => $item['unit_price'],
                            'total_price' => $item['total_price'],
                            'exchange_rate' => $exchangeRate,
                            'total_price_in_local_currency' => $item['total_price'] * $exchangeRate,
                            'uom' => $item['uom'],
                            'required_by' => $item['required_by'],
                            'status' => 'Pending'
                        ]);
                    } else {
                        PurchaseRequestItem::create([
                            'purchase_request_id' => $purchaseRequest->id,
                            'item_code' => $item['item_code'],
                            'item_name' => $item['item_name'],
                            'item_description' => $item['item_description'],
                            'quantity' => $item['quantity'],
                            'unit_price' => $item['unit_price'],
                            'total_price' => $item['total_price'],
                            'exchange_rate' => $exchangeRate,
                            'total_price_in_local_currency' => $item['total_price'] * $exchangeRate,
                            'uom' => $item['uom'],
                            'required_by' => $item['required_by'],
                            'status' => 'Pending'
                        ]);
                    }

                    $amountInLocalCurrency += $item['total_price'] * $exchangeRate;
                    $amountInDocCurrency += $item['total_price'];
                }

                $purchaseRequest->amount_in_local_currency = $amountInLocalCurrency;
                $purchaseRequest->amount_in_document_currency = $amountInDocCurrency;

                $purchaseRequest->save();

                PurchaseRequestApprover::where('purchase_request_id', $purchaseRequest->id)->delete();

                foreach ($request->approver_users_selected as $approver_item) {
                    foreach ($approver_item["approver_user_id"] as $user_id) {
                        PurchaseRequestApprover::create([
                            'purchase_request_id' => $purchaseRequest->id,
                            'approver_id' => $user_id,
                            'level' => $approver_item["level"],
                            'status' => 'Pending'
                        ]);
                    }
                }

                PurchaseRequestHistory::create([
                    'purchase_request_id' => $purchaseRequest->id,
                    'user_id' => auth()->user()->id,
                    'action' => 'Update',
                    'comment' => '',
                    'status' => 'Draft',
                ]);

                return $purchaseRequest;
            }, 5);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'error_message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'error' => false,
            'success_message' => 'Purchase request updated successfully'
        ]);
    }

    public function submitForApproval($id)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('WorkSpace - Can Submit For Approval Purchase Request')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $purchaseRequest = PurchaseRequest::find($id);
        if (empty($purchaseRequest)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, purchase request not found."
            ]);
        }

        $purchaseRequest->status = 'Submitted';
        $purchaseRequest->save();

        $approvers = PurchaseRequestApprover::where('purchase_request_id', $purchaseRequest->id)
            ->where('status', 'Pending')
            ->where('level', 1)
            ->get();
        foreach ($approvers as $item) {
            Notification::send($item->approver, new PurchaseRequestApproval($purchaseRequest, 'Approve'));
        }

        PurchaseRequestHistory::create([
            'purchase_request_id' => $purchaseRequest->id,
            'user_id' => auth()->user()->id,
            'action' => 'Submit for Approval',
            'comment' => '',
            'status' => 'Submitted',
        ]);

        return response()->json([
            'error' => false,
            'purchase_request' => $purchaseRequest,
            'success_message' => 'Purchase request submitted for approval successfully'
        ]);
    }

    public function cancel($id, Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('WorkSpace - Can Cancel Purchase Request')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $purchaseRequest = PurchaseRequest::find($id);
        if (empty($purchaseRequest)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, purchase request not found."
            ]);
        }

        $purchaseRequest->status = 'Cancelled';
        $purchaseRequest->save();

        PurchaseRequestHistory::create([
            'purchase_request_id' => $purchaseRequest->id,
            'user_id' => auth()->user()->id,
            'action' => 'Cancel',
            'comment' => $request->comment,
            'status' => 'Cancelled',
        ]);

        return response()->json([
            'error' => false,
            'purchase_request' => $purchaseRequest,
            'success_message' => 'Purchase request cancelled successfully'
        ]);
    }

    public function approval(Request $request, $id)
    {
        if (!auth()->user()->hasPermissionTo('WorkSpace - Can Approval Purchase Request')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        if ($request->type == 'Reject' && empty($request->comment)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, comment is required when rejecting."
            ]);
        }

        $purchaseRequest = PurchaseRequest::find($id);
        if (empty($purchaseRequest)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, purchase request not found."
            ]);
        }
        if ($purchaseRequest->status != 'Submitted') {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, purchase request is not submitted."
            ]);
        }
        if ($request->approval_level_approved != $purchaseRequest->approval_level_approved) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, approval level is not valid."
            ]);
        }

        $approvalLevelApproved = $request->approval_level_approved + 1;

        $approver = PurchaseRequestApprover::where('purchase_request_id', $purchaseRequest->id)
            ->where('approver_id', auth()->user()->id)
            ->where('level', $approvalLevelApproved)
            ->where('status', 'Pending')
            ->first();

        if (empty($approver)) {
            return response()->json([
                'error' => true,
                'error_message' => 'Sorry, approver not found.'
            ]);
        }

        if ($request->type == 'Approve') {
            $approver->status = 'Approved';
            $approver->save();

            $maxApprovalLevel = PurchaseRequestApprover::where('purchase_request_id', $purchaseRequest->id)->max('level');
            $totalApprovalLevelApproved = PurchaseRequestApprover::where('purchase_request_id', $purchaseRequest->id)
                ->where('status', 'Approved')
                ->count();

            $purchaseRequest->approval_level_approved = $approvalLevelApproved;
            if ($totalApprovalLevelApproved == $maxApprovalLevel) {
                $purchaseRequest->status = 'Approved';
            }
            $purchaseRequest->save();

            PurchaseRequestHistory::create([
                'purchase_request_id' => $purchaseRequest->id,
                'user_id' => auth()->user()->id,
                'action' => 'Approve',
                'comment' => $request->comment,
                'status' => 'Approved level ' . $approvalLevelApproved,
            ]);

            if ($purchaseRequest->status == 'Approved') {
                // Send notification to requester
                Notification::send($purchaseRequest->requester, new PurchaseRequestApproval($purchaseRequest, 'Approve'));
            } else {
                // Send notification to next approver
                $approvers = PurchaseRequestApprover::where('purchase_request_id', $purchaseRequest->id)
                    ->where('status', 'Pending')
                    ->where('level', $approvalLevelApproved + 1)
                    ->get();
                foreach ($approvers as $item) {
                    Notification::send($item->approver, new PurchaseRequestApproval($purchaseRequest, 'Approve'));
                }
            }
            
        } else {
            $approver->status = 'Rejected';
            $approver->save();

            $purchaseRequest->approval_level_approved = $approvalLevelApproved;
            $purchaseRequest->status = 'Rejected';
            $purchaseRequest->save();

            PurchaseRequestHistory::create([
                'purchase_request_id' => $purchaseRequest->id,
                'user_id' => auth()->user()->id,
                'action' => 'Reject',
                'comment' => $request->comment,
                'status' => 'Rejected',
            ]);

            // Send notification to requester
            Notification::send($purchaseRequest->requester, new PurchaseRequestApproval($purchaseRequest, 'Reject'));
        }

        return response()->json([
            'error' => false,
            'purchase_request' => $purchaseRequest,
            'success_message' => 'Purchase request approved successfully'
        ]);
    }

    public function history($id, Request $request)
    {

        $histories = PurchaseRequestHistory::where('purchase_request_id', $id)
            ->orderBy('id', 'desc')
            ->with('user')
            ->paginate($request->input('per_page', 10));

        return response()->json([
            'error' => false,
            'histories' => $histories
        ]);
    }

    public function purchaseRequestApprove(Request $request)
    {
        
        $user = auth()->user();
        $purchaseRequests = PurchaseRequest::with('entity', 'approvers');
        if (!$user->hasRole('Super Admin')){
            $purchaseRequests->where('entity_id', $user->entity_id);
        }
        $purchaseRequests = $purchaseRequests->orderBy('id', 'desc')->get();

        $totalCanApprove = 0;
        $purchaseRequestApprove = [];
        foreach ($purchaseRequests as $purchaseRequest) {
            if ($purchaseRequest->can_approve) {
                $totalCanApprove++;
                $purchaseRequestApprove[] = $purchaseRequest;
            }
        }

        return response()->json([
            'error' => false,
            'purchase_requests' => $purchaseRequests,
            'purchase_request_approve' => $purchaseRequestApprove,
            'total_can_approve' => $totalCanApprove
        ]);
    }
}
