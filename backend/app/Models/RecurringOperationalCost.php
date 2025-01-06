<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;

class RecurringOperationalCost extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'recurring_operational_costs';

    protected $fillable = [
        'name',
        'code',
        'description',
        'entity_id',
        'cost_amount_in_local_currency',
        'active',
        'date_active',
        'created_by',
        'created_from',
    ];

    protected $appends = [
        'created_at_formatted',
        'cost_amount_in_local_currency_formatted',
        'date_active_formatted',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }

    public function entity()
    {
        return $this->belongsTo(Entity::class, 'entity_id');
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

    public function getDateActiveFormattedAttribute()
    {
        return Carbon::parse($this->date_active)->format('d/m/Y');
    }

    public function recurringOperationalCostMonths()
    {
        return $this->hasMany(RecurringOperationalCostMonth::class, 'recurring_operational_cost_id');
    }

    public function hasNoRelationships()
    {
        $error = false;
        $errorMessages = [];

        if (count($this->recurringOperationalCostMonths) > 0) {
            $error = true;
            $errorMessages[] = 'ROC Months';
        }

        return [
            'error' => $error,
            'error_message' => $errorMessages,
        ];
    }
}
