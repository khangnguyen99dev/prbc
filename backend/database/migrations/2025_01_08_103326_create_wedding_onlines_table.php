<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('wedding_onlines', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('user_id')->nullable()->index('wo_user_id');
            $table->unsignedBigInteger('approver_id')->nullable()->index('wo_approver_id');
            $table->string('code')->nullable()->index('wo_code');

            $table->string('slug')->unique();
            $table->string('title')->nullable()->index('wo_title');
            $table->string('logo_url')->nullable()->index('wo_logo_url');
            $table->string('groom_name')->nullable()->index('wo_groom_name');
            $table->string('bride_name')->nullable()->index('wo_bride_name');
            $table->string('wedding_date')->nullable()->index('wo_wedding_date');
            $table->string('wedding_month')->nullable()->index('wo_wedding_month');
            $table->string('wedding_year')->nullable()->index('wo_wedding_year');
            $table->string('wedding_day')->nullable()->index('wo_wedding_day');
            $table->string('wedding_full_date')->nullable()->index('wo_wedding_full_date');
            $table->string('wedding_date_month')->nullable()->index('wo_wedding_date_month');
            $table->string('wedding_period')->nullable()->index('wo_wedding_period');
            $table->string('wedding_lunar_full_date')->nullable()->index('wo_wedding_lunar_full_date');
            $table->string('wedding_lunar_date')->nullable()->index('wo_wedding_lunar_date');
            $table->string('wedding_lunar_month')->nullable()->index('wo_wedding_lunar_month');
            $table->string('wedding_lunar_year')->nullable()->index('wo_wedding_lunar_year');
            $table->string('wedding_time')->nullable()->index('wo_wedding_time');
            $table->string('wedding_location')->nullable()->index('wo_wedding_location');
            $table->string('wedding_location_address')->nullable()->index('wo_wedding_location_address');
            $table->string('map_url')->nullable()->index('wo_map_url');
            $table->string('invitation_to')->nullable()->index('wo_invitation_to');
            $table->string('father_groom_name')->nullable()->index('wo_father_groom_name');
            $table->string('mother_groom_name')->nullable()->index('wo_mother_groom_name');
            $table->string('father_bride_name')->nullable()->index('wo_father_bride_name');
            $table->string('mother_bride_name')->nullable()->index('wo_mother_bride_name');
            $table->string('pick_up_time')->nullable()->index('wo_pick_up_time');
            $table->string('service_time')->nullable()->index('wo_service_time');
            $table->string('party_time')->nullable()->index('wo_party_time');
            $table->string('photo_time')->nullable()->index('wo_photo_time');
            $table->string('transfer_of_bride_url')->nullable()->index('wo_transfer_of_bride_url');
            $table->string('transfer_of_groom_url')->nullable()->index('wo_transfer_of_groom_url');
            $table->string('bank_account_bride')->nullable()->index('wo_bank_account_bride');
            $table->string('bank_account_groom')->nullable()->index('wo_bank_account_groom');
            $table->string('card_cover_image_url')->nullable()->index('wo_card_cover_image_url');
            $table->string('bride_image_url')->nullable()->index('wo_bride_image_url');
            $table->string('groom_image_url')->nullable()->index('wo_groom_image_url');
            $table->string('bride_image_url_2')->nullable()->index('wo_bride_image_url_2');
            $table->string('groom_image_url_2')->nullable()->index('wo_groom_image_url_2');
            $table->string('background_video_image_url')->nullable()->index('wo_background_video_image_url');
            $table->text('wedding_video_description')->nullable();
            $table->text('popup_video_description')->nullable();
            $table->string('background_youtube_url')->nullable()->index('wo_background_youtube_url');
            $table->string('youtube_url')->nullable()->index('wo_youtube_url');
            $table->string('facebook_bride_url')->nullable()->index('wo_facebook_bride_url');
            $table->string('facebook_groom_url')->nullable()->index('wo_facebook_groom_url');
            $table->text('wish_text')->nullable();
            $table->string('background_wish_image_url')->nullable()->index('wo_background_wish_image_url');
            $table->string('background_wish_image_url_2')->nullable()->index('wo_background_wish_image_url_2');
            $table->string('event_image_url')->nullable()->index('wo_event_image_url');
            $table->string('wedding_ceremony_image_url')->nullable()->index('wo_wedding_ceremony_image_url');
            $table->text('invitation_text')->nullable();
            $table->string('background_footer_image_url')->nullable()->index('wo_background_footer_image_url');
            $table->string('status')->nullable()->index('wo_status');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('wedding_online_galleries', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wedding_online_id')->nullable()->index('wo_gallery_wedding_online_id');
            $table->string('title')->nullable()->index('wo_gallery_title');
            $table->string('image_url')->nullable()->index('wo_gallery_image_url');
            $table->integer('order')->index('wo_gallery_order');
            $table->string('status')->index('wo_gallery_status');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('wedding_online_memories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wedding_online_id')->nullable()->index('wo_memory_wedding_online_id');
            $table->string('title')->nullable()->index('wo_memory_title');
            $table->string('image_url')->nullable()->index('wo_memory_image_url');
            $table->integer('order')->index('wo_memory_order');
            $table->string('status')->index('wo_memory_status');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('wedding_online_videos', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wedding_online_id')->nullable()->index('wo_video_wedding_online_id');
            $table->string('title')->nullable()->index('wo_video_title');
            $table->string('video_url')->nullable()->index('wo_video_url');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('wedding_online_info_feedbacks', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wedding_online_id')->nullable()->index('wo_info_feedback_wedding_online_id');
            $table->string('name')->nullable()->index('wo_info_feedback_name');
            $table->string('phone')->nullable()->index('wo_info_feedback_phone');
            $table->boolean('is_join_wedding')->default(false)->index('wo_info_feedback_is_join_wedding');
            $table->boolean('is_guest_of_bride')->default(false)->index('wo_info_feedback_is_guest_of_bride');
            $table->boolean('is_guest_of_groom')->default(false)->index('wo_info_feedback_is_guest_of_groom');
            $table->string('number_of_people')->nullable()->index('wo_info_feedback_number_of_people');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('wedding_online_dress_codes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wedding_online_id')->nullable()->index('wo_dress_code_wedding_online_id');
            $table->string('title')->nullable()->index('wo_dress_code_title');
            $table->string('color')->nullable()->index('wo_dress_code_color');
            $table->timestamps();
            $table->softDeletes();
        });

        Schema::create('wedding_online_feedback_wishes', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('wedding_online_id')->nullable()->index('wo_feedback_wish_wedding_online_id');
            $table->string('name')->nullable()->index('wo_feedback_wish_name');
            $table->string('from_whom')->nullable()->index('wo_feedback_wish_from_whom');
            $table->string('description')->nullable()->index('wo_feedback_wish_description');
            $table->timestamps();
            $table->softDeletes();
        });

    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('wedding_onlines');
        Schema::dropIfExists('wedding_online_galleries');
        Schema::dropIfExists('wedding_online_memories');
        Schema::dropIfExists('wedding_online_videos');
        Schema::dropIfExists('wedding_online_info_feedbacks');
        Schema::dropIfExists('wedding_online_dress_codes');
        Schema::dropIfExists('wedding_online_feedback_wishes');
    }
};
