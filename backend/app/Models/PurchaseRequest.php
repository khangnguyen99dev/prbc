<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;

class PurchaseRequest extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'purchase_requests';

    protected $fillable = [
        'entity_id',
        'pr_number',
        'pr_name',
        'date',
        'description',
        'currency',
        'local_currency',
        'amount_in_local_currency',
        'exchange_rate',
        'amount_in_document_currency',
        'requester_id',
        'approval_level_required',
        'approval_level_approved',
        'rejected_at_level',
        'approval_level_status',
        'status',
    ];
    
    protected $appends = [
        'pr_date_formatted', 
        'status_color', 
        'status_alias',
        'amount_in_document_currency_formatted',
        'amount_in_local_currency_formatted',
        'can_approve',
    ];

    public function getPrDateFormattedAttribute()
    {
        if ($this->date) {
            return Carbon::createFromFormat('Y-m-d', $this->date)->format('d/m/Y');
        }
        return null;
    }

    public function getStatusColorAttribute()
    {
        switch ($this->status) {
            case 'Draft':
                return 'warning';
            case 'Submitted':
                return 'info';
            case 'Approved':
                return 'success';
            case 'Rejected':
                return 'error';
            case 'Cancelled':
                return 'danger';
            default:
                return 'info';
        }
    }

    public function getStatusAliasAttribute()
    {

        switch ($this->status) {
            case 'Submitted':
                switch ($this->approval_level_approved) {
                    case '0':
                        return 'Submitted';
                    default:
                        return 'Approved level ' . $this->approval_level_approved;
                }
            
            default:
                return $this->status;
        }
    }

    public function getAmountInLocalCurrencyFormattedAttribute()
    {
        return number_format($this->amount_in_local_currency, 4, '.', ',');
    }

    public function getAmountInDocumentCurrencyFormattedAttribute()
    {
        return number_format($this->amount_in_document_currency, 2, '.', ',');
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }

    public function entity()
    {
        return $this->belongsTo(Entity::class, 'entity_id');
    }

    public function requester()
    {
        return $this->belongsTo(User::class, 'requester_id');
    }

    public function items()
    {
        return $this->hasMany(PurchaseRequestItem::class, 'purchase_request_id');
    }

    public function approvers()
    {
        return $this->hasMany(PurchaseRequestApprover::class, 'purchase_request_id');
    }

    public function getCanApproveAttribute()
    {
        $canApprove = false;
        if (auth()->user()->hasPermissionTo('WorkSpace - Can Approval Purchase Request')
            && $this->status == 'Submitted'
        ) {
            if (auth()->user()->hasRole('Super Admin')) {
                $canApprove = false;
            }else {
                $approvers = PurchaseRequestApprover::where('purchase_request_id', $this->id)
                    ->where('status', 'Pending')
                    ->where('level', $this->approval_level_approved + 1)
                    ->pluck('approver_id')
                    ->toArray();
                
                if (in_array(auth()->user()->id, $approvers)) {
                    $canApprove = true;
                }
            }
        }
        return $canApprove;
    }


}
