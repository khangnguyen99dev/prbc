<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;

class BonusPoolItem extends Model
{
    use SoftDeletes, HasFactory, LogsActivity;

    protected $table = 'bonus_pool_items';

    protected $fillable = [
        'bonus_pool_id',
        'user_id',
        'employee_name',
        'employee_number',
        'date_of_birth',
        'bonus_amount_in_doc',
        'bonus_amount_in_local',
        'description',
        'status',
    ];

    protected $appends = ['status_color'];

    public function getStatusColorAttribute()
    {
        switch ($this->status) {
            case 'Approved':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Rejected':
                return 'danger';
            default:
                return 'info';
        }
    }

    // Relations
    public function bonusBool()
    {
        return $this->belongsTo(BonusPool::class, 'bonus_pool_id', 'id');
    }

    // User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // Activity Log
    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logAll()
            ->logOnlyDirty()
            ->dontSubmitEmptyLogs();
    }
}
