<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class WeddingOnlineInfoFeedback extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'wedding_online_info_feedbacks';

    protected $fillable = [
        'wedding_online_id',
        'name',
        'phone',
        'number_of_people',
        'is_join_wedding',
        'is_guest_of_bride',
        'is_guest_of_groom',
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
