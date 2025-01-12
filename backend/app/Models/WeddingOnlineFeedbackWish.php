<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeddingOnlineFeedbackWish extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'wedding_online_feedback_wishes';

    protected $fillable = [
        'wedding_online_id',
        'name',
        'from_whom',
        'description',
    ];

    protected $appends = ['time'];

    public function getTimeAttribute()
    {
        return $this->created_at->setTimezone('Asia/Ho_Chi_Minh')->format('H:i');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly(['wedding_online_id', 'name', 'description'])
            ->logOnlyDirty();
    }

    public function weddingOnline(): BelongsTo
    {
        return $this->belongsTo(WeddingOnline::class, 'wedding_online_id', 'id');
    }
}
