<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;
use App\Services\DigitalOceanSpacesService;

class Country extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'countries';

    protected $fillable = [
        'name',
        'code',
        'flag',
        'region_id',
        'owner_id',
        'created_by',
        'created_from',
    ];

    protected $appends = ['created_at_formatted', 'flag_url', 'label'];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function region()
    {
        return $this->belongsTo(Region::class, 'region_id');
    }

    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y H:i');
    }

    public function getFlagUrlAttribute()
    {
        return DigitalOceanSpacesService::getSignedUrl($this->flag);
    }

    public function getLabelAttribute()
    {
        return $this->code . ' - ' . $this->name;
    }
}
