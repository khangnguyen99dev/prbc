<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use App\Models\User;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Carbon\Carbon;

class PurchaseRequestHistory extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'purchase_request_histories';

    protected $fillable = [
        'purchase_request_id',
        'user_id',
        'action',
        'comment',
        'status',
    ];

    protected $appends = [
        'created_at_formatted'
    ];

    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y H:i');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }

    public function purchaseRequest(): BelongsTo
    {
        return $this->belongsTo(PurchaseRequest::class, 'purchase_request_id', 'id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
}
