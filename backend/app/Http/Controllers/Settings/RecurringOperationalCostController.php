<?php

namespace App\Http\Controllers\Settings;

use App\Models\RecurringOperationalCost;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Http\Controllers\Controller;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Http\Requests\Settings\RecurringOperationalCostRequest;
use App\Models\RecurringOperationalCostMonth;
use Illuminate\Support\Facades\Artisan;
use App\Notifications\CreateROCNotification;
use Illuminate\Support\Facades\Notification;

class RecurringOperationalCostController extends Controller
{
    public function index(Request $request)
    {
        $recurringOperationalCosts = RecurringOperationalCost::query();

        if (!empty($request->name)) {
            $recurringOperationalCosts->where('name', 'like', '%' . $request->name . '%');
        }
        if (!empty($request->code)) {
            $recurringOperationalCosts->where('code', 'like', '%' . $request->code . '%');
        }
        if (!empty($request->entity_id)) {
            $recurringOperationalCosts->where('entity_id', $request->entity_id);
        }
        if (!empty($request->created_by)) {
            $recurringOperationalCosts->whereHas('createdByUser', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->created_by . '%');
            });
        }
        if (!empty($request->created_at)) {
            $recurringOperationalCosts->whereBetween('created_at', [$request->created_at . ' 00:00:00', $request->created_at . ' 23:59:59']);
        }

        $recurringOperationalCosts = $recurringOperationalCosts->orderBy('id', 'desc')
            ->with('entity', 'createdByUser')
            ->paginate($request->input('per_page', 10));
        return response()->json([
            'error' => false,
            'recurring_operational_costs' => $recurringOperationalCosts,
        ]);
    }

    public function store(RecurringOperationalCostRequest $request)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Can Create Recurring Operational Cost')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $recurringOperationalCost = RecurringOperationalCost::create(array_merge($request->all(), [
            'created_by' => auth()->user()->id,
            'created_from' => 'RecurringOperationalCostController@store',
        ]));

        // Send notification
        Notification::send(auth()->user(), new CreateROCNotification($recurringOperationalCost));
        
        return response()->json([
            'error' => false,
            'success_message' => 'Recurring Operational Cost created successfully',
            'recurring_operational_cost' => $recurringOperationalCost,
        ]);
    }

    public function show(string $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Can Show Recurring Operational Cost')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }
        $recurringOperationalCost = RecurringOperationalCost::with('entity')->find($id);

        if (empty($recurringOperationalCost)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the recurring_operational_cost you are trying to show does not exist!"
            ]);
        }

        return response()->json([
            'error' => false,
            'recurring_operational_cost' => $recurringOperationalCost,
        ]);
    }

    public function update($id, RecurringOperationalCostRequest $request)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Can Update Recurring Operational Cost')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $recurringOperationalCost = RecurringOperationalCost::find($id);

        if (empty($recurringOperationalCost)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the recurring_operational_cost you are trying to update does not exist!"
            ]);
        }

        $result = $this->authorizeUpdateOrDelete($recurringOperationalCost, 'update', $request);
        if ($result['error']) {
            return response()->json($result);
        }

        $recurringOperationalCost->update($request->all());

        return response()->json([
            'error' => false,
            'success_message' => 'Recurring Operational Cost updated successfully',
            'recurring_operational_cost' => $recurringOperationalCost,
        ]);
    }

    public function destroy(string $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Can Delete Recurring Operational Cost')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }
        $recurringOperationalCost = RecurringOperationalCost::find($id);
        if (empty($recurringOperationalCost)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the recurring_operational_cost you are trying to delete does not exist!"
            ]);
        }

        $result = $this->authorizeUpdateOrDelete($recurringOperationalCost, 'destroy');
        if ($result['error']) {
            return response()->json($result);
        }

        if ($recurringOperationalCost->image) {
            //TODO: Delete old image if exists
        }
        $recurringOperationalCost->delete();
        return response()->json([
            'error' => false,
            'success_message' => 'Recurring Operational Cost deleted successfully',
        ]);
    }

    public function indexRocMonths(Request $request, $id)
    {
        $rocMonths = RecurringOperationalCostMonth::where('recurring_operational_cost_id', $id)
            ->orderBy('id', 'desc')
            ->whereHas('recurringOperationalCost')
            ->with('recurringOperationalCost')
            ->paginate($request->input('per_page', 10));
        
        return response()->json([
            'error' => false,
            'roc_months' => $rocMonths,
        ]);
    }

    public function runManualRocMonth(Request $request, $id)
    {
        $roc = RecurringOperationalCost::find($id);

        if (empty($roc)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, ROC not found!"
            ]);
        }

        if (!$roc->active) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, ROC is not active!"
            ]);
        }

        Artisan::call('app:run-recurring-operational-cost-month', [
            'id' => $id,
            'createdBy' => auth()->user()->id,
            'createdFrom' => 'RecurringOperationalCostController@runManualRocMonth',
        ]);
        
        return response()->json([
            'error' => false,
            'success_message' => 'Recurring Operational Cost Month run successfully',
        ]);
    }

    public function authorizeUpdateOrDelete($recurringOperationalCost, $actionType = 'update', $request = null)
    {
        $result = $recurringOperationalCost->hasNoRelationships();
        if ($actionType === 'update') {
            
        }

        if ($actionType === 'destroy') {
            if ($result['error']) {
                return [
                    'error' => true,
                    'error_message' => "This ROC cannot be deleted as you still have an " . implode(', ', $result['error_message']) . " using this ROC."
                ];
            }
        }

        return [
            'error' => false,
        ];
    }
}
