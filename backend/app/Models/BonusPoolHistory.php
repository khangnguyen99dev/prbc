<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\BonusBool;
use App\Models\BonusBoolItem;
use App\Models\User;
use Spatie\Activitylog\Models\Activity;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;

class BonusPoolHistory extends Model
{
    use SoftDeletes, HasFactory, LogsActivity;

    protected $table = 'bonus_pool_histories';

    protected $fillable = [
        'bonus_pool_id',
        'user_id', 
        'bonus_pool_item_id',
        'action',
        'status',
        'comment',
    ];

    protected $appends = ['created_at_formatted', 'status_color'];

    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y H:i');
    }

    public function getStatusColorAttribute()
    {
        switch ($this->status) {
            case 'Approved':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Active':
                return 'info';
            case 'Rejected':
                return 'danger';
            default:
                return 'info';
        }
    }

    public function bonusBool()
    {
        return $this->belongsTo(BonusPool::class, 'bonus_pool_id', 'id');
    }

    public function bonusBoolItem()
    {
        return $this->belongsTo(BonusPoolItem::class, 'bonus_pool_item_id', 'id');
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}
