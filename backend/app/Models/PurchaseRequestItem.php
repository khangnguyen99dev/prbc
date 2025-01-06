<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Spatie\Activitylog\LogOptions;
use Spatie\Activitylog\Traits\LogsActivity;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class PurchaseRequestItem extends Model
{
    use SoftDeletes, LogsActivity;

    protected $table = 'purchase_request_items';

    protected $fillable = [
        'purchase_request_id',
        'item_code',
        'item_name',
        'item_description',
        'quantity',
        'unit_price',
        'total_price',
        'exchange_rate',
        'total_price_in_local_currency',
        'uom',
        'required_by',
        'status',
    ];

    protected $appends = ['required_by_formatted', 'status_color', 'total_price_formatted', 'unit_price_formatted', 'total_price_calculate', 'unit_price_calculate'];

    public function getRequiredByFormattedAttribute()
    {
        if ($this->required_by) {
            return Carbon::createFromFormat('Y-m-d', $this->required_by)->format('d/m/Y');
        }
        return null;
    }

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()->logAll()->logOnlyDirty();
    }

    public function purchaseRequest(): BelongsTo
    {
        return $this->belongsTo(PurchaseRequest::class, 'purchase_request_id', 'id');
    }

    public function getStatusColorAttribute()
    {
        if ($this->status == 'approved') {
            return 'bg-success';
        }
        return 'bg-danger';
    }

    public function getTotalPriceFormattedAttribute()
    {
        return number_format($this->total_price, 2, '.', ',');
    }

    public function getUnitPriceFormattedAttribute()
    {
        return number_format($this->unit_price, 2, '.', ',');
    }

    public function getTotalPriceCalculateAttribute()
    {
        return number_format($this->total_price, 2, '.', '');
    }

    public function getUnitPriceCalculateAttribute()
    {
        return number_format($this->unit_price, 2, '.', '');
    }

}
