<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Carbon\Carbon;
use App\Services\DigitalOceanSpacesService;

class Entity extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'entities';

    protected $fillable = [
        'country_id',
        'name',
        'code',
        'address',
        'logo',
        'local_currency_id',
        'created_by',
        'created_from',
    ];

    protected $appends = [
        'created_at_formatted',
        'logo_url',
        'label',
    ];

    public function country()
    {
        return $this->belongsTo(Country::class, 'country_id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }

    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function localCurrency()
    {
        return $this->belongsTo(Currency::class, 'local_currency_id');
    }

    public function getLogoUrlAttribute()
    {
        return DigitalOceanSpacesService::getSignedUrl($this->logo);
    }

    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y');
    }

    public function getLabelAttribute()
    {
        return $this->code . ' - ' . $this->name;
    }

    public function recurringOperationalCost()
    {
        return $this->hasOne(RecurringOperationalCost::class, 'entity_id');
    }

    public function hasNoRelationships()
    {
        $error = false;
        $errorMessages = [];

        if (!empty($this->recurringOperationalCost)) {
            $error = true;
            $errorMessages[] = 'Recurring Operational Costs';
        }

        return [
            'error' => $error,
            'error_message' => $errorMessages,
        ];
    }
}
