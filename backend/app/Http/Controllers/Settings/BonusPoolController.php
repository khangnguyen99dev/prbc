<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\BonusPool;
use App\Models\BonusPoolItem;
use App\Models\Currency;
use App\Models\BonusPoolHistory;

class BonusPoolController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        $bonusPools = BonusPool::with('user', 'entity');
        if (!empty($request->name)){
            $bonusPools->whereHas('user', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->name . '%');
            });
        }

        if ($user->hasRole('Business Unit Head')){
            $bonusPools->where('entity_id', $user->entity_id);
        }

        if (!empty($request->code)){
            $bonusPools->where('code', 'like', '%' . $request->code . '%');
        }

        if (!empty($request->created_at)){
            $bonusPools->whereBetween('created_at', [$request->created_at . ' 00:00:00', $request->created_at . ' 23:59:59']);
        }

        if (!empty($request->entity_name)){
            $bonusPools->whereHas('entity', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->entity_name . '%');
            });
        }

        $bonusPools = $bonusPools->paginate(20);

        return response()->json([
            'error' => false,
            'bonus_pools' => $bonusPools
        ]);
    }


    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('Settings - Bonus Pool - Can Create Bonus Pool')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $request->validate([
            'entity_id' => 'required|exists:entities,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:bonus_pools,code',
            'total_bonus' => 'required|numeric',
            'minimum_management_bonus' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $currency = Currency::where('currency_code', $request->currency)->first();
        $exchangeRate = $currency->current_exchange_rate;
        if (empty($exchangeRate)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, exchange rate not found."
            ]);
        }

        $bonusPool = BonusPool::where('code', $request->code)->first();
        if (!empty($bonusPool)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, Bonus Pool already exists."
            ]);
        }

        $minimumManagementBonusInLocal = $request->minimum_management_bonus * $exchangeRate;
        $totalBonusInLocal = $request->total_bonus * $exchangeRate;

        $bonusPool = BonusPool::create([
            'user_id' => $user->id,
            'status' => 'Pending',
            'entity_id' => $request->entity_id,
            'name' => $request->name,
            'code' => $request->code,
            'total_bonus_in_doc' => $request->total_bonus,
            'total_bonus_in_local' => $totalBonusInLocal,
            'minimum_management_bonus_in_doc' => $request->minimum_management_bonus,
            'minimum_management_bonus_in_local' => $minimumManagementBonusInLocal,
            'currency' => $request->currency,
            'local_currency' => config('settings.default_currency'),
            'exchange_rate' => $exchangeRate,
            'description' => $request->description
        ]);

        // Create history
        BonusPoolHistory::create([
            'bonus_pool_id' => $bonusPool->id,
            'user_id' => $user->id,
            'action' => 'Create Bonus Pool',
            'status' => 'Pending',
            'comment' => $request->description
        ]);

        return response()->json([
            'error' => false,
            'bonus_pool' => $bonusPool,
            'message' => "Bonus Pool created successfully."
        ]);
    }


    public function show($id)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('Settings - Bonus Pool - Can View Bonus Pool')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $bonusPool = BonusPool::with('user', 'entity', 'items', 'histories.user')->find($id);
        return response()->json([
            'error' => false,
            'bonus_pool' => $bonusPool
        ]);
    }

    public function update($id, Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('Settings - Bonus Pool - Can Update Bonus Pool')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $bonusPool = BonusPool::find($id);
        $request->validate([
            'entity_id' => 'required|exists:entities,id',
            'name' => 'required|string|max:255',
            'code' => 'required|string|max:255|unique:bonus_pools,code,' . $id,
            'total_bonus' => 'required|numeric',
            'minimum_management_bonus' => 'required|numeric',
            'description' => 'nullable|string',
        ]);

        $currency = Currency::where('currency_code', $request->currency)->first();
        $exchangeRate = $currency->current_exchange_rate;
        if (empty($exchangeRate)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, exchange rate not found."
            ]);
        }

        $minimumManagementBonusInLocal = $request->minimum_management_bonus * $exchangeRate;
        $totalBonusInLocal = $request->total_bonus * $exchangeRate;

        $bonusPool->entity_id = $request->entity_id;
        $bonusPool->name = $request->name;
        $bonusPool->code = $request->code;
        $bonusPool->minimum_management_bonus_in_doc = $request->minimum_management_bonus;
        $bonusPool->minimum_management_bonus_in_local = $minimumManagementBonusInLocal;
        $bonusPool->total_bonus_in_doc = $request->total_bonus;
        $bonusPool->total_bonus_in_local = $totalBonusInLocal;
        $bonusPool->currency = $request->currency;
        $bonusPool->local_currency = config('settings.default_currency');
        $bonusPool->exchange_rate = $exchangeRate;
        $bonusPool->description = $request->description;
        $bonusPool->save();

        return response()->json([
            'error' => false,
            'bonus_pool' => $bonusPool,
            'message' => "Bonus Pool updated successfully."
        ]);
    }
}
