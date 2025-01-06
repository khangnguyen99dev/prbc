<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;

class EntityBudget extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'entity_budgets';

    protected $fillable = [
        'entity_id',
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
    public function entity(): BelongsTo
    {
        return $this->belongsTo(Entity::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function monthlyAmounts(): HasMany
    {
        return $this->hasMany(EntityBudgetMonth::class);
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    /**
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function months(): HasMany
    {
        return $this->hasMany(EntityBudgetMonth::class);
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
    public function getTotalBudgetFormattedAttribute(): string
    {
        return number_format($this->total_budget, 2, '.', ',');
    }

    /**
     * @return string
     */
    public function getCreatedAtFormattedAttribute(): string
    {
        return Carbon::parse($this->created_at)->format('d/m/Y');
    }
}
