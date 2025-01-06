<?php

namespace App\Http\Controllers\Settings;

use App\Contracts\ModificationOrDeletionRequiresAuthorizationContract;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Http\Requests\Settings\CurrencyRatePeriodRequest;
use App\Models\CurrencyRatePeriod;
use Carbon\Carbon;

class CurrencyRatePeriodController extends Controller implements ModificationOrDeletionRequiresAuthorizationContract
{
    public function index(Request $request)
    {
        $currencyrateperiods = new CurrencyRatePeriod;
        $searchableColumns = CurrencyRatePeriod::getSearchables();
        $orderByColumns = CurrencyRatePeriod::getDefaultOrderBy();
        
        foreach ($searchableColumns as $column => $operator) {
            if (! empty ($request->$column)) {
                if (strtolower($operator) == 'like') {
                    $currencyrateperiods = $currencyrateperiods->where($column, $operator, '%'.$request->$column.'%');
                } else {
                    $currencyrateperiods = $currencyrateperiods->where($column, $operator, $request->$column);
                }
            }
        }
        
        $currencyrateperiods = $currencyrateperiods
            ->where('currency_id', $request->currency_id)
            ->orderBy($orderByColumns['column_name'], $orderByColumns['order'])
            ->paginate(25);

        return response()->json([
            'error' => false,
            'currency_rate_periods' => $currencyrateperiods
        ]);
    }

    public function create(Request $request)
    {
        return response()->json([
            'error' => false,
        ]);
    }

    public function store(CurrencyRatePeriodRequest $request)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Currency - Can Create Currency Rate Period')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $checkCurrencyRatePeriod = CurrencyRatePeriod::where('currency_id', $request->currency_id)
            ->whereBetween('period_start', [
                $request->period_start,
                $request->period_end
            ])->first();

        if(!empty($checkCurrencyRatePeriod)) {
            return response()->json([
                'error' => true,
                'error_message' => "Currency Rate Period from ".$request->period_start." to ".$request->period_end." already exist!",
            ]);
        }
        $checkCurrencyRatePeriod = CurrencyRatePeriod::where('currency_id', $request->currency_id)
            ->whereBetween('period_end', [
                $request->period_start,
                $request->period_end
            ])->first();

        if(!empty($checkCurrencyRatePeriod)) {
            return response()->json([
                'error' => true,
                'error_message' => "Currency Rate Period from ".$request->period_start." to ".$request->period_end." already exist!",
            ]);
        }
        $checkCurrencyRatePeriod = CurrencyRatePeriod::where('currency_id', $request->currency_id)
            ->where('period_start', '>', $request->period_start)
            ->where('period_end', '<', $request->period_end)
            ->first();

        if(!empty($checkCurrencyRatePeriod)) {
            return response()->json([
                'error' => true,
                'error_message' => "Currency Rate Period from ".$request->period_start." to ".$request->period_end." already exist!",
            ]);
        }
        $checkCurrencyRatePeriod = CurrencyRatePeriod::where('currency_id', $request->currency_id)
            ->where('period_start', '<', $request->period_start)
            ->where('period_end', '>', $request->period_end)
            ->first();

        if(!empty($checkCurrencyRatePeriod)) {
            return response()->json([
                'error' => true,
                'error_message' => "Currency Rate Period from ".$request->period_start." to ".$request->period_end." already exist!",
            ]);
        }
        $currencyrateperiod = CurrencyRatePeriod::create(array_merge($request->all(), [
            'created_from' => '',
            'created_by' => auth()->user()->id,
        ]));

        return response()->json([
            'error' => false,
            'currency_rate_period' => $currencyrateperiod
        ]);
    }

    public function show($id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Currency - Can Show Currency Rate Period')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $currencyrateperiod = CurrencyRatePeriod::find($id);

        if (empty ($currencyrateperiod)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, we couldn't find that currencyrateperiod"
            ]);
        }

        return response()->json([
            'error' => false,
            'currency_rate_period' => $currencyrateperiod
        ]);
    }

    public function update(CurrencyRatePeriodRequest $request, $id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Currency - Can Update Currency Rate Period')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }

        $checkCurrencyRatePeriod = CurrencyRatePeriod::where('currency_id', $request->currency_id)
            ->whereNotIn('id', [$id])
            ->whereBetween('period_start', [
                $request->period_start,
                $request->period_end
            ])->first();

        if(!empty($checkCurrencyRatePeriod)) {
            return response()->json([
                'error' => true,
                'error_message' => "Currency Rate Period from ".$request->period_start." to ".$request->period_end." already exist!",
            ]);
        }
        $checkCurrencyRatePeriod = CurrencyRatePeriod::where('currency_id', $request->currency_id)
            ->whereNotIn('id', [$id])
            ->whereBetween('period_end', [
                $request->period_start,
                $request->period_end
            ])->first();

        if(!empty($checkCurrencyRatePeriod)) {
            return response()->json([
                'error' => true,
                'error_message' => "Currency Rate Period from ".$request->period_start." to ".$request->period_end." already exist!",
            ]);
        }
        $checkCurrencyRatePeriod = CurrencyRatePeriod::where('currency_id', $request->currency_id)
            ->whereNotIn('id', [$id])
            ->where('period_start', '>', $request->period_start)
            ->where('period_end', '<', $request->period_end)
            ->first();

        if(!empty($checkCurrencyRatePeriod)) {
            return response()->json([
                'error' => true,
                'error_message' => "Currency Rate Period from ".$request->period_start." to ".$request->period_end." already exist!",
            ]);
        }
        $checkCurrencyRatePeriod = CurrencyRatePeriod::where('currency_id', $request->currency_id)
            ->whereNotIn('id', [$id])
            ->where('period_start', '<', $request->period_start)
            ->where('period_end', '>', $request->period_end)
            ->first();

        if(!empty($checkCurrencyRatePeriod)) {
            return response()->json([
                'error' => true,
                'error_message' => "Currency Rate Period from ".$request->period_start." to ".$request->period_end." already exist!",
            ]);
        }
        $currencyrateperiod = CurrencyRatePeriod::find($id);

        if (empty ($currencyrateperiod)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, we couldn't find that currencyrateperiod"
            ]);
        }

        $result = $this->authorizeUpdateOrDelete($currencyrateperiod, 'update', $request);
        if ($result['error']) {
            return response()->json($result);
        }

        $currencyrateperiod->update($request->except([

        ]));

        return response()->json([
            'error' => false, 
            'currency_rate_period' => $currencyrateperiod
        ]);
    }

    public function destroy($id)
    {
        if (!auth()->user()->hasPermissionTo('Settings - Master Data - Currency - Can Delete Currency Rate Period')){
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you don't have permission to do this action!"
            ]);
        }   

        $currencyrateperiod = CurrencyRatePeriod::find($id);

        $result = $this->authorizeUpdateOrDelete($currencyrateperiod, 'destroy');
        if ($result['error']) {
            return response()->json($result);
        }

        $currencyrateperiod->delete();

        return response()->json([
            'error' => false,
            'message' => 'Successfully deleted currencyrateperiod'
        ]);
    }

    public function authorizeUpdateOrDelete($model, $actionType = 'update', $request = null)
    {
        if ($actionType === 'update') {
            //No
        }

        if ($actionType === 'destroy') {
            //No
        }

        return [
            'error' => false,
        ];
    }
}
