<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;


class BonusPool extends Model
{
    use SoftDeletes, HasFactory, LogsActivity;

    protected $table = 'bonus_pools';

    protected $fillable = [
        'entity_id',
        'name',
        'code',
        'description',
        'total_bonus_in_doc',
        'minimum_management_bonus_in_doc',
        'total_bonus_in_local',
        'minimum_management_bonus_in_local',
        'local_currency',
        'currency',
        'exchange_rate',
        'status',
        'user_id',
    ];

    protected $appends = [
        'created_at_formatted',
        'total_bonus_in_doc_formatted',
        'minimum_management_bonus_in_doc_formatted',
        'total_bonus_in_local_formatted',
        'minimum_management_bonus_in_local_formatted',
        'status_color',
        'remaining_bonus_in_doc',
        'remaining_bonus_in_local',
    ];

    // Relations
    public function items()
    {
        return $this->hasMany(BonusPoolItem::class, 'bonus_pool_id', 'id');
    }

    // Entity
    public function entity()
    {
        return $this->belongsTo(Entity::class, 'entity_id', 'id');
    }

    // User
    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }

    // History
    public function histories()
    {
        return $this->hasMany(BonusPoolHistory::class, 'bonus_pool_id', 'id');
    }

    // Getters
    public function getCreatedAtFormattedAttribute()
    {
        return Carbon::parse($this->created_at)->format('d/m/Y H:i');
    }

    public function getTotalBonusInDocFormattedAttribute()
    {
        return number_format($this->total_bonus_in_doc, 2, ',', '.');
    }

    public function getMinimumManagementBonusInDocFormattedAttribute()
    {
        return number_format($this->minimum_management_bonus_in_doc, 2, ',', '.');
    }

    public function getTotalBonusInLocalFormattedAttribute()
    {
        return number_format($this->total_bonus_in_local, 2, ',', '.');
    }

    public function getMinimumManagementBonusInLocalFormattedAttribute()
    {
        return number_format($this->minimum_management_bonus_in_local, 2, ',', '.');
    }

    public function getStatusColorAttribute()
    {
        switch ($this->status) {
            case 'Approved':
                return 'success';
            case 'Pending':
                return 'warning';
            case 'Rejected':
                return 'error';
            default:
                return 'info';
        }
    }

    public function getRemainingBonusInDocAttribute()
    {
        return $this->total_bonus_in_doc - $this->minimum_management_bonus_in_doc;
    }

    public function getRemainingBonusInLocalAttribute()
    {
        return $this->total_bonus_in_local - $this->minimum_management_bonus_in_local;
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
