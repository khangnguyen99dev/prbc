<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Faker\Factory;
use Illuminate\Support\Facades\Hash;
use App\Models\RecurringOperationalCost;
use App\Models\RecurringOperationalCostMonth;
use Carbon\Carbon;
use App\Models\EntityBudget;
use App\Models\EntityBudgetMonth;

class RunRecurringOperationalCostMonth extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:run-recurring-operational-cost-month {id?} {createdBy?} {createdFrom?}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Run Recurring Operational Cost Month';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $id = $this->argument('id') ?? null;
        $createdBy = $this->argument('createdBy') ?? null;
        $createdFrom = $this->argument('createdFrom') ?? "RunRecurringOperationalCostMonth@handle";

        $rocs = RecurringOperationalCost::where('active', 1)
            ->whereNotNull('date_active');

        if (!empty($id)) {
            $rocs->where('id', $id);
        }
 
        $rocs = $rocs->get();
        $now = Carbon::now()->format('Y-m-d');

        foreach ($rocs as $roc) {
            $dateActive = $roc->date_active;

            $date01 = Carbon::parse($dateActive)->startOfMonth()->format('Y-m-d');
            if ($dateActive > $date01) {
                $dateActive = Carbon::parse($dateActive)->addMonth()->format('Y-m-01');
            } else {
                $dateActive = Carbon::parse($dateActive)->format('Y-m-01');
            }

            $eachMonths = [];
            while ($dateActive <= $now) {
                $eachMonths[] = $dateActive;
                $dateActive = Carbon::parse($dateActive)->addMonth()->format('Y-m-d');
            }

            foreach ($eachMonths as $date) {
                $checkExist = RecurringOperationalCostMonth::where('recurring_operational_cost_id', $roc->id)
                    ->where('date', $date)
                    ->first();
                if (!empty($checkExist)) {
                    continue;
                }

                $year = Carbon::createFromFormat('Y-m-d', $date)->format('Y');
                $month = Carbon::createFromFormat('Y-m-d', $date)->format('m');

                $entityBudget = EntityBudget::where('entity_id', $roc->entity_id)
                    ->where('year', $year)
                    ->first();

                if (empty($entityBudget)) {
                    continue;
                }

                $entityBudgetMonth = EntityBudgetMonth::where('entity_budget_id', $entityBudget->id)
                    ->where('month', $month)
                    ->where('year', $year)
                    ->first();

                if (empty($entityBudgetMonth)) {
                    continue;
                }

                $availableBudgetAmount = $entityBudgetMonth->getAvailableBudgetAmount();

                if ($roc->cost_amount_in_local_currency > $availableBudgetAmount) {
                    continue;
                }

                $roc->recurringOperationalCostMonths()->create([
                    'date' => $date,
                    'month' => Carbon::parse($date)->format('m'),
                    'year' => Carbon::parse($date)->format('Y'),
                    'cost_amount_in_local_currency' => $roc->cost_amount_in_local_currency,
                    'created_by' => $createdBy,
                    'created_from' => $createdFrom,
                ]);

                $this->info("Created Recurring Operational Cost Month for $date");
            }
        }
    }
}
