<?php

namespace App\Http\Controllers\Settings;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\EntityBudget;
use App\Models\EntityBudgetMonth;
use App\Models\PurchaseRequest;
use App\Models\RecurringOperationalCostMonth;

class BudgetMonthlyController extends Controller
{
    public function __invoke(Request $request, $id, $itemId)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo("Settings - Budget Management - Can View Budget Monthly")) {
            return response()->json(['error' => true, 'error_message' => 'You are not authorized to view this budget monthly']);
        }

        $budget = EntityBudget::with('entity')->find($id);
        if (!$budget) {
            return response()->json(['error' => true, 'error_message' => 'Budget not found']);
        }

        $monthly = EntityBudgetMonth::where('entity_budget_id', $budget->id)->where('id', $itemId)->first();
        if (!$monthly) {
            return response()->json(['error' => true, 'error_message' => 'Monthly budget not found']);
        }

        // Format the budget amount
        $monthly->planned_budget_amount_formatted = number_format($monthly->getPlannedBudgetAmount(), 2, '.', ',');
        $monthly->actual_budget_amount_formatted = number_format($monthly->getActualBudgetAmount(), 2, '.', ',');
        $monthly->allotted_budget_amount_formatted = number_format($monthly->getAllottedBudgetAmount(), 2, '.', ',');
        $monthly->available_budget_amount_formatted = number_format($monthly->getAvailableBudgetAmount(), 2, '.', ',');

        $plannedPurchaseRequests = PurchaseRequest::with('entity')->where('entity_id', $budget->entity_id)->whereBetween('date', [$monthly->start_date, $monthly->end_date])->whereIn('status', ['Draft', 'Submitted'])->paginate(10, ['*'], 'planned');
        $actualPurchaseRequests = PurchaseRequest::with('entity')->where('entity_id', $budget->entity_id)->whereBetween('date', [$monthly->start_date, $monthly->end_date])->where('status', 'Approved')->paginate(10, ['*'], 'actual');
        $recurringOperationalCosts = RecurringOperationalCostMonth::with('recurringOperationalCost.entity')->whereHas('recurringOperationalCost', function ($query) use ($budget) {
            $query->where('entity_id', $budget->entity_id);
        })->where('date', $monthly->start_date)->paginate(10, ['*'], 'recurring');

        return response()->json([
            'error' => false,
            'budget' => $budget,
            'monthly' => $monthly,
            'plannedPurchaseRequests' => $plannedPurchaseRequests,
            'actualPurchaseRequests' => $actualPurchaseRequests,
            'recurringOperationalCosts' => $recurringOperationalCosts,
        ]);
    }
}
