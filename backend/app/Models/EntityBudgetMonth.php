<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;
use App\Models\PurchaseRequest;
use App\Models\RecurringOperationalCostMonth;

class EntityBudgetMonth extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'entity_budget_months';

    protected $fillable = [
        'entity_budget_id',
        'year',
        'month',
        'start_date',
        'end_date',
        'budget_amount',
        'status'
    ];

    protected $appends = [
        'budget_amount_formatted',
        'start_date_formatted',
        'end_date_formatted',
        'budget_amount_calculate',
        'status_color'
    ];

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function budget(): BelongsTo
    {
        return $this->belongsTo(EntityBudget::class, 'entity_budget_id');
    }

    public function getBudgetAmountFormattedAttribute()
    {
        return number_format($this->budget_amount, 2, '.', ',');
    }

    public function getStartDateFormattedAttribute()
    {
        return Carbon::parse($this->start_date)->format('d/m/Y');
    }

    public function getEndDateFormattedAttribute()
    {
        return Carbon::parse($this->end_date)->format('d/m/Y');
    }

    public function getBudgetAmountCalculateAttribute()
    {
        return number_format($this->budget_amount, 2, '.', '');
    }

    public function getStatusColorAttribute()
    {
        return $this->status == 'Planned' ? 'primary' : 'success';
    }

    /**
     * @return \Spatie\Activitylog\LogOptions
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }

    /**
     * @return float
     */
    public function getPlannedBudgetAmount()
    {
        return PurchaseRequest::where('entity_id', $this->budget->entity_id)->whereBetween('date', [$this->start_date, $this->end_date])->whereIn('status', ['Draft', 'Submitted'])->sum('amount_in_local_currency');
    }

    /**
     * @return float
     */
    public function getActualBudgetAmount() {
        $actualBudgetPR = PurchaseRequest::where('entity_id', $this->budget->entity_id)
            ->whereBetween('date', [$this->start_date, $this->end_date])
            ->where('status', 'Approved')
            ->sum('amount_in_local_currency');

        $actualBudgetROC = RecurringOperationalCostMonth::whereHas('recurringOperationalCost', function ($query) {
                $query->where('entity_id', $this->budget->entity_id);
            })->where('date', $this->start_date)
                ->sum('cost_amount_in_local_currency');

        return $actualBudgetPR + $actualBudgetROC;
    }

    /**
     * @return float
     */
    public function getAllottedBudgetAmount() {
        return $this->getPlannedBudgetAmount() + $this->getActualBudgetAmount();
    }

    /**
     * @return float
     */
    public function getAvailableBudgetAmount() {
        return $this->budget_amount - $this->getAllottedBudgetAmount();
    }
}
