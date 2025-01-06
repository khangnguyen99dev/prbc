<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BonusPoolItem;
use App\Models\BonusPool;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use Exception;
use App\Models\BonusPoolHistory;

class BonusPoolItemController extends Controller
{
    public function saveItems(Request $request, $id)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('Settings - Bonus Pool - Can Create Bonus Pool Items')) {
            return response()->json(['error' => true, 'error_message' => 'You are not authorized to create Bonus Pool items']);
        }

        $bonusPool = BonusPool::find($id);
        if (empty($bonusPool)) {
            return response()->json(['error' => true, 'error_message' => 'Bonus Pool not found']);
        }

        $items = json_decode(json_encode($request->items), true);
        if (empty($items)) {
            return response()->json(['error' => true, 'error_message' => 'Items not found']);
        }

        $amountInDoc = 0;
        foreach ($items as $item) {
            if ($item['status'] != 'Rejected') {
                $amountInDoc += $item['amount'];
            }
        }

        if ($amountInDoc > $bonusPool->remaining_bonus_in_doc) {
            return response()->json(['error' => true, 'error_message' => 'Total amount is greater than remaining bonus']);
        }

        try {
            DB::transaction(function () use ($items, $bonusPool) {
                // Delete items that are not in the request
                $itemsIds = array_column($items, 'id');
                BonusPoolItem::whereNotIn('id', $itemsIds)->delete();

                // Save items
                foreach ($items as $item) {
                    if (empty($item['amount'])) {
                        throw new Exception('Amount is required');
                    }
                    if (empty($item['user_id'])) {
                        throw new Exception('User is required');
                    }
                    $amountInDoc = $item['amount'];
                    $amountInLocal = $item['amount'] * $bonusPool->exchange_rate;
                    if (empty($item['id'])) {
                        $bonusPoolItem = BonusPoolItem::create([
                            'bonus_pool_id' => $bonusPool->id,
                            'user_id' => $item['user_id'],
                            'employee_name' => $item['employee_name'],
                            'employee_number' => $item['employee_number'],
                            'date_of_birth' => empty($item['date_of_birth']) ? null : Carbon::createFromFormat('d/m/Y', $item['date_of_birth'])->format('Y-m-d'),
                            'bonus_amount_in_doc' => $amountInDoc,
                            'bonus_amount_in_local' => $amountInLocal,
                            'description' => $item['description'],
                            'status' => 'Pending',
                        ]);
                    } else {
                        BonusPoolItem::find($item['id'])->where('status', 'Pending')->update([
                            'user_id' => $item['user_id'],
                            'employee_name' => $item['employee_name'],
                            'employee_number' => $item['employee_number'],
                            'date_of_birth' => empty($item['date_of_birth']) ? null : Carbon::createFromFormat('d/m/Y', $item['date_of_birth'])->format('Y-m-d'),
                            'bonus_amount_in_doc' => $amountInDoc,
                            'bonus_amount_in_local' => $amountInLocal,
                            'description' => $item['description']
                        ]);
                    }
                }
            }, 5);
        } catch (\Exception $e) {
            return response()->json(['error' => true, 'error_message' => $e->getMessage()]);
        }

        return response()->json(['error' => false, 'message' => 'Bonus Pool items saved successfully']);
    }


    public function approval($id, $itemId, Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('Settings - Bonus Pool - Can Approval Bonus Pool Items')) {
            return response()->json(['error' => true, 'error_message' => 'You are not authorized to approval Bonus Pool items']);
        }
        
        $bonusPool = BonusPool::find($id);
        if (empty($bonusPool)) {
            return response()->json(['error' => true, 'error_message' => 'Bonus Pool not found']);
        }

        $bonusPoolItem = BonusPoolItem::find($itemId);
        if (empty($bonusPoolItem)) {
            return response()->json(['error' => true, 'error_message' => 'Bonus Pool Item not found']);
        }

        $action = '';
        if ($request->action == 'approve') {
            $bonusPoolItem->status = 'Approved';
            $action = 'Approve Bonus Pool item';
        } else {
            $bonusPoolItem->status = 'Rejected';
            $action = 'Reject Bonus Pool item';
        }

        $bonusPoolItem->save();

        BonusPoolHistory::create([
            'bonus_pool_id' => $bonusPool->id,
            'user_id' => $user->id,
            'bonus_pool_item_id' => $bonusPoolItem->id,
            'action' => $action,
            'status' => $bonusPoolItem->status,
            'comment' => $request->comment,
        ]);

        // Check if all items are approved
        $totalAmount = BonusPoolItem::where('bonus_pool_id', $bonusPool->id)->where('status', 'Approved')->sum('bonus_amount_in_doc');
        if ($totalAmount >= $bonusPool->remaining_bonus_in_doc) {
            $bonusPool->status = 'Approved';
            $bonusPool->save();

            BonusPoolHistory::create([
                'bonus_pool_id' => $bonusPool->id,
                'user_id' => $user->id,
                'bonus_pool_item_id' => null,
                'action' => 'Approve Bonus Pool',
                'status' => 'Approved',
                'comment' => null,
            ]);
        }

        return response()->json(['error' => false, 'message' => 'Bonus Pool item ' . strtolower($bonusPoolItem->status) . ' successfully']);
    }
}
