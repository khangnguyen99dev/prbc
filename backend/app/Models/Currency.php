<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;

class Currency extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'currencies';

    protected $fillable = [
        'name',
        'code',
        'currency_code',
        'rate',
        'enabled',
        'precision',
        'symbol',
        'symbol_first',
        'decimal_mark',
        'thousands_separator',
        'created_from',
        'created_by',
    ];

    public $appends = [
        'last_default_rate',
        'label',
        'created_at_formatted',
    ];

    protected $casts = [
        'enabled'       => 'boolean',
        'deleted_at'    => 'datetime',
    ];

    public static function getSearchables()
    {
        return [
            'name' => 'like',
            'currency_code' => '=',
            'enabled' => '=',
            'rate' => '=',
        ];
    }

    public static function getDefaultOrderBy()
    {
        return [
            'column_name' => 'id',
            'order' => 'desc'
        ];
    }

    public function currencyRatePeriods()
    {
        return $this->hasMany(CurrencyRatePeriod::class, 'currency_id');
    }

    /**
     * Get the current precision.
     *
     * @return string
     */
    public function getPrecisionAttribute($value)
    {
        if (is_null($value)) {
            return config('money.' . $this->code . '.precision');
        }

        return (int) $value;
    }

    /**
     * Get the current symbol.
     *
     * @return string
     */
    public function getSymbolAttribute($value)
    {
        if (is_null($value)) {
            return config('money.' . $this->code . '.symbol');
        }

        return $value;
    }

    /**
     * Get the current symbol_first.
     *
     * @return string
     */
    public function getSymbolFirstAttribute($value)
    {
        if (is_null($value)) {
            return config('money.' . $this->code . '.symbol_first');
        }

        return $value;
    }

    /**
     * Get the current decimal_mark.
     *
     * @return string
     */
    public function getDecimalMarkAttribute($value)
    {
        if (is_null($value)) {
            return config('money.' . $this->code . '.decimal_mark');
        }

        return $value;
    }

    /**
     * Get the current thousands_separator.
     *
     * @return string
     */
    public function getThousandsSeparatorAttribute($value)
    {
        if (is_null($value)) {
            return config('money.' . $this->code . '.thousands_separator');
        }

        return $value;
    }

    /**
     * Get the label.
     *
     * @return string
     */
    public function getLabelAttribute()
    {
        return ($this->currency_code ?? '') . ' - ' . ($this->name ?? '');
    }

    public function getCurrentExchangeRateAttribute()
    {
        $currencyRate = $this->rate;
        $dateUsed = !empty($date) ? $date : date('Y-m-d');

        // find active period rate
        $currencyRatePeriod = CurrencyRatePeriod::where('currency_id', $this->id)
            ->where('period_start', '<=', $dateUsed)
            ->where('period_end', '>=', $dateUsed)
            ->first();

        if (!empty($currencyRatePeriod)) {
            $currencyRate = $currencyRatePeriod->exchange_rate;
        }

        return $currencyRate;
    }

    public function getLastDefaultRateAttribute()
    {
        $lastDefaultRate = '';
        $currencyRatePeriod = CurrencyRatePeriod::where('currency_id', $this->id)->orderBy('period_end', 'desc')->first();
        if (!empty($currencyRatePeriod)) {
            $lastDefaultRate = Carbon::createFromFormat('Y-m-d', $currencyRatePeriod->period_end)->format('d/m/Y');
        }

        return $lastDefaultRate;
    }

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

    public function entities()
    {
        return $this->hasMany(Entity::class, 'local_currency_id');
    }

    public function hasNoRelationships()
    {
        $error = false;
        $errorMessages = [];

        if ($this->entities()->count() > 0) {
            $error = true;
            $errorMessages[] = 'Entities';
        }

        return [
            'error' => $error,
            'error_message' => $errorMessages,
        ];
    }
}
