<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\LogOptions;
use App\Models\User;
use App\Models\CountryBudget;
use App\Models\PurchaseRequest;
use App\Models\RecurringOperationalCostMonth;
use App\Models\Entity;

class CountryBudgetMonth extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'country_budget_months';

    protected $fillable = [
        'country_budget_id',
        'year',
        'month',
        'start_date',
        'end_date',
        'budget_amount',
        'status',
        'created_by',
    ];

    protected $appends = ['start_date_formatted', 'end_date_formatted', 'budget_amount_formatted', 'budget_amount_calculate'];

    /**
     * @return string
     */
    public function getStartDateFormattedAttribute(): string
    {
        return Carbon::parse($this->start_date)->format('d-m-Y');
    }

    /**
     * @return string
     */
    public function getEndDateFormattedAttribute(): string
    {
        return Carbon::parse($this->end_date)->format('d-m-Y');
    }   

    /**
     * @return string
     */
    public function getBudgetAmountFormattedAttribute(): string
    {
        return number_format($this->budget_amount, 2, '.', ',');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function countryBudget(): BelongsTo
    {
        return $this->belongsTo(CountryBudget::class, 'country_budget_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * @return \Spatie\Activitylog\LogOptions
     */
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }

    /**
     * @return string
     */
    public function getBudgetAmountCalculateAttribute(): string
    {
        return number_format($this->budget_amount, 2, '.', '');
    }

       /**
     * @return float
     */
    public function getPlannedBudgetAmount()
    {
        $countryId = $this->countryBudget->country_id;
        if(!empty($countryId)) {
            $entityIds = Entity::where('country_id', $countryId)->pluck('id')->toArray();
            return PurchaseRequest::whereIn('entity_id', $entityIds)->whereBetween('date', [$this->start_date, $this->end_date])->whereIn('status', ['Draft', 'Submitted'])->sum('amount_in_local_currency');
        }
        return 0;
    }

    /**
     * @return float
     */
    public function getActualBudgetAmount() {
        $countryId = $this->countryBudget->country_id;
        if(!empty($countryId)) {
            $entityIds = Entity::where('country_id', $countryId)->pluck('id')->toArray();
            $actualBudgetPR = PurchaseRequest::whereIn('entity_id', $entityIds)->whereBetween('date', [$this->start_date, $this->end_date])->where('status', 'Approved')->sum('amount_in_local_currency');

            $actualBudgetROC = RecurringOperationalCostMonth::whereHas('recurringOperationalCost', function ($query) use ($entityIds) {
                    $query->whereIn('entity_id', $entityIds);
                })->where('date', $this->start_date)
                ->sum('cost_amount_in_local_currency');

            return $actualBudgetPR + $actualBudgetROC;
        }
        return 0;
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

    /**
     * @return float
     */
    public function getPlannedEntityBudgetAmount() {
        $entityIds = Entity::where('country_id', $this->countryBudget->country_id)->pluck('id')->toArray();
        return EntityBudgetMonth::whereHas('budget', function($query) use ($entityIds){
            $query->whereIn('entity_id', $entityIds)
                ->where('year', $this->year);
        })->where('month', $this->month)->sum('budget_amount');
    }
}
