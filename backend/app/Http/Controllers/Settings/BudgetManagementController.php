<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EntityBudget;
use App\Models\EntityBudgetMonth;
use Carbon\Carbon;
use Illuminate\Support\Facades\DB;
use App\Notifications\CreateBudgetNotification;
use Illuminate\Support\Facades\Notification;
use App\Models\CountryBudget;
use App\Models\CountryBudgetMonth;
use App\Models\Entity;
use Exception;
use App\Http\Requests\Settings\EntityBudget\StoreEntityBudgetRequest;
use App\Http\Requests\Settings\EntityBudget\UpdateEntityBudgetRequest;

class BudgetManagementController extends Controller
{
    public function index(Request $request)
    {
        $budgets = EntityBudget::with('entity', 'user');
        if (!empty($request->entity_name)){
            $budgets->whereHas('entity', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->entity_name . '%');
            });
        }

        if (!empty($request->created_by)){
            $budgets->whereHas('user', function($query) use ($request){
                $query->where('name', 'like', '%' . $request->created_by . '%');
            });
        }

        if (!empty($request->year)){
            $budgets->where('year', $request->year);
        }

        if (!empty($request->created_at)){
            $budgets->whereBetween('created_at', [$request->created_at . ' 00:00:00', $request->created_at . ' 23:59:59']);
        }
        $budgets = $budgets->paginate(20);

        return response()->json([
            'error' => false,
            'budgets' => $budgets
        ]);
    }

    public function store(StoreEntityBudgetRequest $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('Settings - Can Create Budget Management')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $budget = EntityBudget::where('entity_id', $request->entity_id)->where('year', $request->year)->first();
        if (!empty($budget)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, Entity budget already exists for this year."
            ]);
        }

        $entity = Entity::find($request->entity_id);
        if (empty($entity)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the entity you are trying to create budget for does not exist!"
            ]);
        }
        // Get all the entities in the same country
        $entityIds = Entity::where('country_id', $entity->country_id)->pluck('id')->toArray();

        try {
            $eb = DB::transaction(function () use ($request, $user, $entity, $entityIds) {
                $budget = EntityBudget::create([
                    'entity_id' => $request->entity_id,
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

                    $countryBudgetMonth = CountryBudgetMonth::whereHas('countryBudget', function($query) use ($entity, $request){
                        $query->where('country_id', $entity->country_id)
                            ->where('year', $request->year);
                    })->where('month', $month)->first();

                    if (!empty($countryBudgetMonth)) {
                        // Get the amount of the entity budget for the month
                        $budgetAmount = EntityBudgetMonth::whereHas('budget', function($query) use ($entityIds, $request){
                            $query->whereIn('entity_id', $entityIds)
                                ->where('year', $request->year);
                        })->where('month', $month)->sum('budget_amount');
                        // Get the amount of the country budget for the month
                        if (($budgetAmount + (float)$value['amount']) > $countryBudgetMonth->budget_amount) {
                            throw new Exception("Sorry, the remaining country budget " . number_format($countryBudgetMonth->budget_amount - $budgetAmount, 2, '.', ',') . " for {$month}/{$request->year} is exceeded by the total entity budgets (" . number_format($value['amount'], 2, '.', ',') . ")!");
                        }
                    }else{
                        throw new Exception("Sorry, the country budget month you are trying to create budget for does not exist!");
                    }

                    EntityBudgetMonth::create([
                        'entity_budget_id' => $budget->id,
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
                $budget->total_budget = $totalBudget;
                $budget->save();

                // Send notification
                Notification::send(auth()->user(), new CreateBudgetNotification($budget));

                return $budget;
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
            'message' => "Entity budget created successfully",
            'entity_budget' => $eb
        ]);
    }

    public function show($id)
    {
        $budget = EntityBudget::with('monthlyAmounts', 'entity')->find($id);

        $totalActualBudgetAmount = 0;
        $totalAllottedBudgetAmount = 0;
        $totalAvailableBudgetAmount = 0;
        $totalPlannedBudgetAmount = 0;

        foreach ($budget->monthlyAmounts as $month) {
            // Get the amounts
            $month->actual_budget_amount = $month->getActualBudgetAmount();
            $month->allotted_budget_amount = $month->getAllottedBudgetAmount();
            $month->available_budget_amount = $month->getAvailableBudgetAmount();
            $month->planned_budget_amount = $month->getPlannedBudgetAmount();
            // Format the amounts
            $month->actual_budget_amount_formatted = number_format($month->actual_budget_amount, 2, '.', ',');
            $month->allotted_budget_amount_formatted = number_format($month->allotted_budget_amount, 2, '.', ',');
            $month->available_budget_amount_formatted = number_format($month->available_budget_amount, 2, '.', ',');
            $month->planned_budget_amount_formatted = number_format($month->planned_budget_amount, 2, '.', ',');

            // Add the amounts to the totals
            $totalActualBudgetAmount += $month->actual_budget_amount;
            $totalAllottedBudgetAmount += $month->allotted_budget_amount;
            $totalAvailableBudgetAmount += $month->available_budget_amount;
            $totalPlannedBudgetAmount += $month->planned_budget_amount;
        }

        // Format the totals
        $budget->total_actual_budget_amount_formatted = number_format($totalActualBudgetAmount, 2, '.', ',');
        $budget->total_allotted_budget_amount_formatted = number_format($totalAllottedBudgetAmount, 2, '.', ',');
        $budget->total_available_budget_amount_formatted = number_format($totalAvailableBudgetAmount, 2, '.', ',');
        $budget->total_planned_budget_amount_formatted = number_format($totalPlannedBudgetAmount, 2, '.', ',');

        return response()->json([
            'error' => false,
            'budget' => $budget
        ]);
    }

    public function update(UpdateEntityBudgetRequest $request, $id)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('Settings - Can Update Budget Management')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $budget = EntityBudget::find($id);
        if (empty($budget)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the budget you are trying to update does not exist!"
            ]);
        }
        $duplicateBudget = EntityBudget::where('id', '!=', $id)->where('entity_id', $request->entity_id)->where('year', $request->year)->first();
        if (!empty($duplicateBudget)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, Entity budget already exists for this year."
            ]);
        }

        $entity = Entity::find($request->entity_id);
        if (empty($entity)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the entity you are trying to create budget for does not exist!"
            ]);
        }
        // Get all the entities in the same country
        $entityIds = Entity::where('country_id', $entity->country_id)->pluck('id')->toArray();

        try {
            DB::transaction(function () use ($request, $user, $budget, $entity, $entityIds) {
                $budget->update([
                    'entity_id' => $request->entity_id,
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

                    $countryBudgetMonth = CountryBudgetMonth::whereHas('countryBudget', function($query) use ($entity, $request){
                        $query->where('country_id', $entity->country_id)
                            ->where('year', $request->year);
                    })->where('month', $month)->first();

                    if (!empty($countryBudgetMonth)) {
                        // Get the amount of the entity budget for the month
                        $budgetAmount = EntityBudgetMonth::whereHas('budget', function($query) use ($entityIds, $request){
                            $query->whereIn('entity_id', $entityIds)
                                ->where('year', $request->year);
                        })->where('month', $month)
                        ->where('id', '!=', $value['id'])
                        ->sum('budget_amount');
                        // Get the amount of the country budget for the month
                        if (($budgetAmount + (float)$value['budget_amount_calculate']) > $countryBudgetMonth->budget_amount) {
                            throw new Exception("Sorry, the remaining country budget " . number_format($countryBudgetMonth->budget_amount - $budgetAmount, 2, '.', ',') . " for {$month}/{$request->year} is exceeded by the total entity budgets (" . number_format($value['budget_amount_calculate'], 2, '.', ',') . ")!");
                        }
                    }

                    EntityBudgetMonth::where('entity_budget_id', $budget->id)->where('month', $month)->update([
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
                $budget->total_budget = $totalBudget;
                $budget->save();

                return $budget;
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
            'message' => "Entity budget updated successfully."
        ]);
    }
}
