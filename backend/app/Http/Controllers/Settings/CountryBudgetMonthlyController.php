<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\PurchaseRequest;
use App\Models\RecurringOperationalCostMonth;
use App\Models\CountryBudget;
use App\Models\Entity;
use App\Models\CountryBudgetMonth;
use App\Models\EntityBudgetMonth;

class CountryBudgetMonthlyController extends Controller
{
    public function __invoke(Request $request, $id, $itemId)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo("Settings - Country Budget - Can View Country Budget Monthly")) {
            return response()->json(['error' => true, 'error_message' => 'You are not authorized to view this budget monthly']);
        }

        $countryBudget = CountryBudget::with('country')->find($id);
        if (!$countryBudget) {
            return response()->json(['error' => true, 'error_message' => 'Country budget not found']);
        }

        $monthly = CountryBudgetMonth::where('country_budget_id', $countryBudget->id)->where('id', $itemId)->first();
        if (!$monthly) {
            return response()->json(['error' => true, 'error_message' => 'Monthly country budget not found']);
        }

        // Format the budget amount
        $monthly->planned_budget_amount_formatted = number_format($monthly->getPlannedBudgetAmount(), 2, '.', ',');
        $monthly->actual_budget_amount_formatted = number_format($monthly->getActualBudgetAmount(), 2, '.', ',');
        $monthly->allotted_budget_amount_formatted = number_format($monthly->getAllottedBudgetAmount(), 2, '.', ',');
        $monthly->available_budget_amount_formatted = number_format($monthly->getAvailableBudgetAmount(), 2, '.', ',');
        $monthly->planned_entity_budget_amount_formatted = number_format($monthly->getPlannedEntityBudgetAmount(), 2, '.', ',');

        $entityIds = Entity::where('country_id', $countryBudget->country_id)->pluck('id')->toArray();  
        $plannedPurchaseRequests = PurchaseRequest::with('entity')->whereIn('entity_id', $entityIds)->whereBetween('date', [$monthly->start_date, $monthly->end_date])->whereIn('status', ['Draft', 'Submitted'])->paginate(10, ['*'], 'planned');
        $actualPurchaseRequests = PurchaseRequest::with('entity')->whereIn('entity_id', $entityIds)->whereBetween('date', [$monthly->start_date, $monthly->end_date])->where('status', 'Approved')->paginate(10, ['*'], 'actual');
        $recurringOperationalCosts = RecurringOperationalCostMonth::with('recurringOperationalCost.entity')->whereHas('recurringOperationalCost', function ($query) use ($entityIds) {
            $query->whereIn('entity_id', $entityIds);
        })->where('date', $monthly->start_date)->paginate(10, ['*'], 'recurring');

        $entityBudgetMonths = EntityBudgetMonth::with('budget.entity')->whereHas('budget', function($query) use ($entityIds, $monthly){
            $query->whereIn('entity_id', $entityIds)
                ->where('year', $monthly->year);
        })->where('month', $monthly->month)->paginate(10, ['*'], 'entity');

        return response()->json([
            'error' => false,
            'countryBudget' => $countryBudget,
            'monthly' => $monthly,
            'plannedPurchaseRequests' => $plannedPurchaseRequests,
            'actualPurchaseRequests' => $actualPurchaseRequests,
            'recurringOperationalCosts' => $recurringOperationalCosts,
            'entityBudgetMonths' => $entityBudgetMonths,
        ]);
    }
}
