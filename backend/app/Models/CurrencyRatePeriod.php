<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class CurrencyRatePeriod extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $fillable = [
        'currency_id',
        'period_start',
        'period_end',
        'exchange_rate',
    ];

    public static function getSearchables() {
        return [
            
        ];
    }

    public static function getDefaultOrderBy() {
        return [
            'column_name' => 'id',
            'order' => 'desc'
        ];
    }

    public function getHasNoRelationshipsAttribute()
    {
        // Enter your relationship checking logic here

        return true;
    }

    public function currency()
    {
        return $this->belongsTo(Currency::class, 'currency_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }
}
