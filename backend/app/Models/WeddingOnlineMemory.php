<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use App\Services\DigitalOceanSpacesService;

class WeddingOnlineMemory extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'wedding_online_memories';

    protected $fillable = [
        'wedding_online_id',
        'title',
        'image_url',
        'order',
        'status', // active, inactive
    ];

    protected $appends = ['is_active', 'image_url_signed'];

    public function getIsActiveAttribute()
    {
        return $this->status == 'Active';
    }

    public function getImageUrlSignedAttribute()
    {
        if (empty($this->image_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->image_url);
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['wedding_online_id', 'title', 'image_url', 'order', 'status'])
            ->logOnlyDirty();
    }

    public function weddingOnline(): BelongsTo
    {
        return $this->belongsTo(WeddingOnline::class, 'wedding_online_id', 'id');
    }
}
