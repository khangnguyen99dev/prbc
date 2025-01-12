<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use App\Models\User;
use Spatie\Activitylog\Traits\LogsActivity;
use Spatie\Activitylog\LogOptions;
use Carbon\Carbon;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Support\Facades\Storage;
use App\Services\DigitalOceanSpacesService;

class WeddingOnline extends Model
{
    use HasFactory, SoftDeletes, LogsActivity;

    protected $table = 'wedding_onlines';

    protected $fillable = [
        'user_id',
        'approver_id',
        'code',
        'slug',
        'title',
        'logo_url', 
        'groom_name',
        'bride_name',
        'wedding_date',
        'wedding_month',
        'wedding_year', 
        'wedding_day',
        'wedding_full_date',
        'wedding_date_month',
        'wedding_period',
        'wedding_lunar_full_date',
        'wedding_lunar_date',
        'wedding_lunar_month',
        'wedding_lunar_year',
        'wedding_time',
        'wedding_time_formatted',
        'wedding_location',
        'wedding_location_address',
        'map_url',
        'invitation_to',
        'father_groom_name',
        'mother_groom_name',
        'father_bride_name', 
        'mother_bride_name',
        'pick_up_time',
        'service_time',
        'party_time',
        'photo_time',
        'transfer_of_bride_url',
        'transfer_of_groom_url',
        'bank_account_bride',
        'bank_account_groom',
        'card_cover_image_url',
        'bride_image_url',
        'groom_image_url',
        'bride_image_url_2',
        'groom_image_url_2',
        'background_video_image_url',
        'wedding_video_description',
        'popup_video_description',
        'background_youtube_url',
        'youtube_url',
        'facebook_bride_url',
        'facebook_groom_url',
        'wish_text',
        'background_wish_image_url',
        'background_wish_image_url_2',
        'event_image_url',
        'wedding_ceremony_image_url',
        'invitation_text',
        'background_footer_image_url',
        'status',
    ];

    protected $appends = [
        'wedding_time_formatted', 
        'wedding_full_date_formatted', 
        'logo_url_signed', 
        'transfer_of_bride_url_signed', 
        'transfer_of_groom_url_signed', 
        'card_cover_image_url_signed', 
        'bride_image_url_signed', 
        'groom_image_url_signed', 
        'bride_image_url_2_signed', 
        'groom_image_url_2_signed', 
        'background_video_image_url_signed', 
        'background_youtube_url_signed', 
        'background_wish_image_url_signed', 
        'background_wish_image_url_2_signed', 
        'event_image_url_signed', 
        'wedding_ceremony_image_url_signed', 
        'background_footer_image_url_signed'
    ];

    public function getActivitylogOptions(): LogOptions
    {
        return LogOptions::defaults()
            ->logOnly($this->fillable)
            ->logOnlyDirty();
    }

    public function galleries(): HasMany
    {
        return $this->hasMany(WeddingOnlineGallery::class, 'wedding_online_id', 'id');
    }

    public function memories(): HasMany
    {
        return $this->hasMany(WeddingOnlineMemory::class, 'wedding_online_id', 'id');
    }

    public function videos(): HasMany
    {
        return $this->hasMany(WeddingOnlineVideo::class, 'wedding_online_id', 'id');
    }

    public function infoFeedbacks(): HasMany
    {
        return $this->hasMany(WeddingOnlineInfoFeedback::class, 'wedding_online_id', 'id');
    }

    public function dressCodes(): HasMany
    {
        return $this->hasMany(WeddingOnlineDressCode::class, 'wedding_online_id', 'id');
    }

    public function feedbackWishes(): HasMany
    {
        return $this->hasMany(WeddingOnlineFeedbackWish::class, 'wedding_online_id', 'id');
    }

    public function getWeddingTimeFormattedAttribute()
    {
        if (!empty($this->wedding_time)) {
            return Carbon::createFromFormat('H:i', $this->wedding_time)->format('H \G\I\Ờ i');
        }
        return '';
    }

    public function getWeddingFullDateFormattedAttribute()
    {
        if (!empty($this->wedding_full_date)) {
            return Carbon::createFromFormat('Y-m-d', $this->wedding_full_date)->format('d/m/Y');
        }
        return '';
    }

    public function getLogoUrlSignedAttribute()
    {
        if (empty($this->logo_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->logo_url);
    }

    public function getTransferOfBrideUrlSignedAttribute()
    {
        if (empty($this->transfer_of_bride_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->transfer_of_bride_url);
    }

    public function getTransferOfGroomUrlSignedAttribute()
    {
        if (empty($this->transfer_of_groom_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->transfer_of_groom_url);
    }

    public function getCardCoverImageUrlSignedAttribute()
    {
        if (empty($this->card_cover_image_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->card_cover_image_url);
    }

    public function getBrideImageUrlSignedAttribute()
    {
        if (empty($this->bride_image_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->bride_image_url);
    }

    public function getGroomImageUrlSignedAttribute()
    {
        if (empty($this->groom_image_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->groom_image_url);
    }

    public function getBrideImageUrl2SignedAttribute()
    {
        if (empty($this->bride_image_url_2)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->bride_image_url_2);
    }

    public function getGroomImageUrl2SignedAttribute()
    {
        if (empty($this->groom_image_url_2)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->groom_image_url_2);
    }

    public function getBackgroundVideoImageUrlSignedAttribute()
    {
        if (empty($this->background_video_image_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->background_video_image_url);
    }

    public function getBackgroundYoutubeUrlSignedAttribute()
    {
        if (empty($this->background_youtube_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->background_youtube_url);
    }

    public function getBackgroundWishImageUrlSignedAttribute()
    {
        if (empty($this->background_wish_image_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->background_wish_image_url);
    }

    public function getBackgroundWishImageUrl2SignedAttribute()
    {
        if (empty($this->background_wish_image_url_2)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->background_wish_image_url_2);
    }

    public function getEventImageUrlSignedAttribute()
    {
        if (empty($this->event_image_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->event_image_url);
    }

    public function getWeddingCeremonyImageUrlSignedAttribute()
    {
        if (empty($this->wedding_ceremony_image_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->wedding_ceremony_image_url);
    }

    public function getBackgroundFooterImageUrlSignedAttribute()
    {
        if (empty($this->background_footer_image_url)) {
            return null;
        }
        return DigitalOceanSpacesService::getSignedUrl($this->background_footer_image_url);
    }
}
