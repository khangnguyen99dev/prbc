<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use App\Models\User;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;
use App\Services\DigitalOceanSpacesService;

class Region extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'regions';

    protected $fillable = [
        'name',
        'code',
        'image',
        'owner_id',
        'created_by',
        'created_from',
    ];
    
    protected $appends = [
        'created_at_formatted',
        'image_url',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }

    public function owner()
    {
        return $this->belongsTo(User::class, 'owner_id');
    }

    public function createdByUser()
    {
        return $this->belongsTo(User::class, 'created_by');
    }

    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y');
    }

    public function getImageUrlAttribute()
    {
        return DigitalOceanSpacesService::getSignedUrl($this->image);
    }
}
