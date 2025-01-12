<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeddingOnlineVideo extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'wedding_online_videos';

    protected $fillable = [
        'wedding_online_id',
        'title',
        'description',
        'image',
        'status',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['wedding_online_id', 'title', 'description', 'image', 'status'])
            ->logOnlyDirty();
    }

    public function weddingOnline(): BelongsTo
    {
        return $this->belongsTo(WeddingOnline::class, 'wedding_online_id', 'id');
    }
}
