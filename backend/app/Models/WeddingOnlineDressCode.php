<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeddingOnlineDressCode extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'wedding_online_dress_codes';

    protected $fillable = [
        'wedding_online_id',
        'title',
        'color',
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['wedding_online_id', 'title', 'color'])
            ->logOnlyDirty();
    }

    public function weddingOnline(): BelongsTo
    {
        return $this->belongsTo(WeddingOnline::class, 'wedding_online_id', 'id');
    }
}
