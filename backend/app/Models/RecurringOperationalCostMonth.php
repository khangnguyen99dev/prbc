<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;

class RecurringOperationalCostMonth extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'recurring_operational_cost_months';

    protected $fillable = [
        'recurring_operational_cost_id',
        'date',
        'month',
        'year',
        'cost_amount_in_local_currency',
        'created_by',
        'created_from',
    ];

    protected $appends = [
        'created_at_formatted',
        'date_formatted',
        'cost_amount_in_local_currency_formatted',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }

    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y');
    }

    public function getCostAmountInLocalCurrencyFormattedAttribute()
    {
        return number_format($this->cost_amount_in_local_currency, 2, '.', ',');
    }

    public function getDateFormattedAttribute()
    {
        return Carbon::parse($this->date)->format('d/m/Y');
    }

    public function recurringOperationalCost()
    {
        return $this->belongsTo(RecurringOperationalCost::class, 'recurring_operational_cost_id');
    }
}
