<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\CountryBudget;
use App\Models\CountryBudgetMonth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Notifications\CreateCountryBudgetNotification;
use Illuminate\Support\Facades\Notification;
use Exception;
use App\Models\Entity;
use App\Models\EntityBudgetMonth;
use App\Http\Requests\Settings\CountryBudget\StoreCountryBudgetRequest;
use App\Http\Requests\Settings\CountryBudget\UpdateCountryBudgetRequest;

class CountryBudgetController extends Controller
{
    /**
     * @return \Illuminate\Http\JsonResponse
     */
    public function index(Request $request)
    {
        $countryBudgets = CountryBudget::with('country', 'user');
        if (!empty($request->country_name)){
            $countryBudgets->whereHas('country', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->country_name . '%');
            });
        }

        if (!empty($request->created_by)){
            $countryBudgets->whereHas('user', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->created_by . '%');
            });
        }

        if (!empty($request->year)){
            $countryBudgets->where('year', $request->year);
        }

        if (!empty($request->created_at)){
            $countryBudgets->whereBetween('created_at', [$request->created_at . ' 00:00:00', $request->created_at . ' 23:59:59']);
        }
        $countryBudgets = $countryBudgets->paginate(20);

        return response()->json([
            'error' => false,
            'country_budgets' => $countryBudgets
        ]);
    }

    public function store(StoreCountryBudgetRequest $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('Settings - Can Create Country Budget')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $countryBudget = CountryBudget::where('country_id', $request->country_id)->where('year', $request->year)->first();
        if (!empty($countryBudget)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, Country budget already exists for this year."
            ]);
        }

        try {
            $cb = DB::transaction(function () use ($request, $user) {
                $countryBudget = CountryBudget::create([
                    'country_id' => $request->country_id,
                    'year' => $request->year,
                    'created_by' => $user->id,
                    'currency' => $request->currency,
                    'status' => 'active'
                ]);

                $totalBudget = 0;
                foreach ($request->monthly_amounts as $value) {
                    // Ensure month is 2 digits
                    $month = str_pad($value['month'], 2, '0', STR_PAD_LEFT);
                    
                    $startDate = $request->year . '-' . $month . '-01';
                    $endDate = Carbon::parse($startDate)->endOfMonth()->format('Y-m-d');

                    CountryBudgetMonth::create([
                        'country_budget_id' => $countryBudget->id,
                        'year' => $request->year,
                        'month' => (string)$month,
                        'budget_amount' => (float)$value['amount'],
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                        'status' => 'active'
                    ]);

                    $totalBudget += (float)$value['amount'];
                }

                // Update total budget
                $countryBudget->total_budget = $totalBudget;
                $countryBudget->save();

                // Send notification
                Notification::send(auth()->user(), new CreateCountryBudgetNotification($countryBudget));

                return $countryBudget;
            }, 5);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'error_message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'error' => false,
            'country_budget' => $cb,
            'message' => "Country budget created successfully."
        ]);
    }


    public function show($id)
    {
        $countryBudget = CountryBudget::with('monthlyAmounts', 'country')->find($id);

        $totalActualBudgetAmount = 0;
        $totalAllottedBudgetAmount = 0;
        $totalAvailableBudgetAmount = 0;
        $totalPlannedBudgetAmount = 0;
        $totalPlannedEntityBudgetAmount = 0;

        foreach ($countryBudget->monthlyAmounts as $month) {
            // Get the amounts
            $month->actual_budget_amount = $month->getActualBudgetAmount();
            $month->allotted_budget_amount = $month->getAllottedBudgetAmount();
            $month->available_budget_amount = $month->getAvailableBudgetAmount();
            $month->planned_budget_amount = $month->getPlannedBudgetAmount();
            $month->planned_entity_budget_amount = $month->getPlannedEntityBudgetAmount();
            // Format the amounts
            $month->actual_budget_amount_formatted = number_format($month->actual_budget_amount, 2, '.', ',');
            $month->allotted_budget_amount_formatted = number_format($month->allotted_budget_amount, 2, '.', ',');
            $month->available_budget_amount_formatted = number_format($month->available_budget_amount, 2, '.', ',');
            $month->planned_budget_amount_formatted = number_format($month->planned_budget_amount, 2, '.', ',');
            $month->planned_entity_budget_amount_formatted = number_format($month->planned_entity_budget_amount, 2, '.', ',');
            // Add the amounts to the totals
            $totalActualBudgetAmount += $month->actual_budget_amount;
            $totalAllottedBudgetAmount += $month->allotted_budget_amount;
            $totalAvailableBudgetAmount += $month->available_budget_amount;
            $totalPlannedBudgetAmount += $month->planned_budget_amount;
            $totalPlannedEntityBudgetAmount += $month->planned_entity_budget_amount;
        }

        // Format the totals
        $countryBudget->total_actual_budget_amount_formatted = number_format($totalActualBudgetAmount, 2, '.', ',');
        $countryBudget->total_allotted_budget_amount_formatted = number_format($totalAllottedBudgetAmount, 2, '.', ',');
        $countryBudget->total_available_budget_amount_formatted = number_format($totalAvailableBudgetAmount, 2, '.', ',');
        $countryBudget->total_planned_budget_amount_formatted = number_format($totalPlannedBudgetAmount, 2, '.', ',');
        $countryBudget->total_planned_entity_budget_amount_formatted = number_format($totalPlannedEntityBudgetAmount, 2, '.', ',');
        return response()->json([
            'error' => false,
            'country_budget' => $countryBudget
        ]);
    }


    public function update(UpdateCountryBudgetRequest $request, $id)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('Settings - Can Update Country Budget')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $countryBudget = CountryBudget::find($id);
        if (empty($countryBudget)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the country budget you are trying to update does not exist!"
            ]);
        }
        $duplicateCountryBudget = CountryBudget::where('id', '!=', $id)->where('country_id', $request->country_id)->where('year', $request->year)->first();
        if (!empty($duplicateCountryBudget)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, Country budget already exists for this year."
            ]);
        }

        $entityIds = Entity::where('country_id', $request->country_id)->pluck('id')->toArray();
        try {
            DB::transaction(function () use ($request, $user, $countryBudget, $entityIds) {
                $countryBudget->update([
                    'country_id' => $request->country_id,
                    'year' => $request->year,
                    'created_by' => $user->id,
                    'currency' => $request->currency,
                    'status' => 'active'
                ]);

                $totalBudget = 0;
                foreach ($request->monthly_amounts as $value) {
                    // Ensure month is 2 digits
                    $month = str_pad($value['month'], 2, '0', STR_PAD_LEFT);
                    
                    $startDate = $request->year . '-' . $month . '-01';
                    $endDate = Carbon::parse($startDate)->endOfMonth()->format('Y-m-d');

                    // Get the amount of the entity budget for the month
                    $budgetAmount = EntityBudgetMonth::whereHas('budget', function($query) use ($entityIds, $request){
                        $query->whereIn('entity_id', $entityIds)
                            ->where('year', $request->year);
                    })->where('month', $month)->sum('budget_amount');

                    if ($budgetAmount > $value['budget_amount_calculate']) {
                        throw new Exception("Sorry, the country budget for {$month}/{$request->year} is less than the total entity budgets (" . number_format($budgetAmount, 2, '.', ',') . ")!");
                    }

                    CountryBudgetMonth::where('country_budget_id', $countryBudget->id)->where('month', $month)->update([
                        'year' => $request->year,
                        'month' => (string)$month,
                        'budget_amount' => (float)$value['budget_amount_calculate'],
                        'start_date' => $startDate,
                        'end_date' => $endDate,
                        'status' => 'active'
                    ]);

                    $totalBudget += (float)$value['budget_amount_calculate'];
                }

                // Update total budget
                $countryBudget->total_budget = $totalBudget;
                $countryBudget->save();

                return $countryBudget;
            }, 5);
        } catch (\Exception $e) {
            DB::rollBack();
            return response()->json([
                'error' => true,
                'error_message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'error' => false,
            'message' => "Country budget updated successfully."
        ]);
    }
}
