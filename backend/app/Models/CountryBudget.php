<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Carbon\Carbon;
use App\Models\Country;
use App\Models\User;
use App\Models\CountryBudgetMonth;

class CountryBudget extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'country_budgets';

    protected $fillable = [
        'country_id',
        'year',
        'currency',
        'total_budget',
        'status',
        'created_by',
    ];

    protected $appends = ['total_budget_formatted', 'created_at_formatted'];    

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function country(): BelongsTo
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function entities(): HasMany
    {
        return $this->hasMany(Entity::class, 'country_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function monthlyAmounts(): HasMany
    {
        return $this->hasMany(CountryBudgetMonth::class, 'country_budget_id');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * @return string
     */
    public function getTotalBudgetFormattedAttribute(): string
    {
        return number_format($this->total_budget, 2, '.', ',');
    }

    /**
     * @return string
     */
    public function getCreatedAtFormattedAttribute(): string
    {
        return Carbon::parse($this->created_at)->format('d-m-Y');
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
}
