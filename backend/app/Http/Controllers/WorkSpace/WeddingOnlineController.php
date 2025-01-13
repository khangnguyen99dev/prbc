<?php

namespace App\Http\Controllers\WorkSpace;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\WeddingOnline;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Storage;
use Carbon\Carbon;
use Illuminate\Support\Str;
use App\Models\WeddingOnlineFeedbackWish;
use App\Models\User;
use App\Mail\SubmittedWeddingOnlineEmail;   
use App\Mail\ActivateWeddingOnlineEmail;
use App\Mail\SubmittedWeddingOnlineToUserEmail;
use Endroid\QrCode\QrCode;
use Endroid\QrCode\Writer\PngWriter;
use Endroid\QrCode\Encoding\Encoding;
use Endroid\QrCode\ErrorCorrectionLevel;
use Endroid\QrCode\RoundBlockSizeMode;
use Illuminate\Support\Facades\Mail;

class WeddingOnlineController extends Controller
{
    public function index(Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('WorkSpace - Can View Wedding Online')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $weddingOnlines = WeddingOnline::with('galleries', 'memories', 'videos', 'infoFeedbacks', 'dressCodes', 'feedbackWishes');

        if (!empty($request->slug)){
            $weddingOnlines->where('slug', $request->slug);
        }

        if (!empty($request->code)){
            $weddingOnlines->where('code', $request->code);
        }

        if (!empty($request->bride_name)){
            $weddingOnlines->where('bride_name', $request->bride_name);
        }

        if (!empty($request->groom_name)){
            $weddingOnlines->where('groom_name', $request->groom_name);
        }

        if (!empty($request->status)){
            $weddingOnlines->where('status', $request->status);
        }

        if ($user->hasRole('Collaborator')) {
            $weddingOnlines->where('user_id', $user->id);
        }

        $weddingOnlines = $weddingOnlines->orderBy('id', 'desc')->paginate(20);

        return response()->json([
            'error' => false,
            'wedding_onlines' => $weddingOnlines
        ]);
    }

    public function store(Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('WorkSpace - Can Create Wedding Online')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $validator = Validator::make($request->all(), [
            'slug' => 'required|unique:wedding_onlines,slug',
            'title' => 'required',
            'logo_url' => 'required',
            'groom_name' => 'required',
            'bride_name' => 'required',
            'wedding_date' => 'required',
            'wedding_month' => 'required',
            'wedding_year' => 'required',
            'wedding_day' => 'required',
            'wedding_full_date' => 'required',
            'wedding_date_month' => 'required',
            'wedding_period' => 'required',
            'wedding_lunar_full_date' => 'required',
            'wedding_lunar_date' => 'required',
            'wedding_lunar_month' => 'required',
            'wedding_lunar_year' => 'required',
            'wedding_time' => 'required',
            'wedding_location' => 'required',
            'wedding_location_address' => 'required',
            'map_url' => 'required',
            'invitation_to' => 'required',
            'father_groom_name' => 'required',
            'mother_groom_name' => 'required',
            'father_bride_name' => 'required',
            'mother_bride_name' => 'required',
            'pick_up_time' => 'required',
            'service_time' => 'required',
            'party_time' => 'required',
            'photo_time' => 'required',
            'transfer_of_bride_url' => 'required',
            'transfer_of_groom_url' => 'required',
            'card_cover_image_url' => 'required',
            'bride_image_url' => 'required',
            'groom_image_url' => 'required',
            'bride_image_url_2' => 'required',
            'groom_image_url_2' => 'required',
            'background_video_image_url' => 'required',
            'wedding_video_description' => 'required',
            'popup_video_description' => 'required',
            'background_youtube_url' => 'required',
            'youtube_url' => 'required',
            'facebook_bride_url' => 'required',
            'facebook_groom_url' => 'required',
            'wish_text' => 'required',
            'background_wish_image_url' => 'required',
            'background_wish_image_url_2' => 'required',
            'event_image_url' => 'required',
            'wedding_ceremony_image_url' => 'required',
            'invitation_text' => 'required',
            'background_footer_image_url' => 'required',
            'dress_codes' => 'required',
            'memories' => 'required',
            'galleries' => 'required',
            'bank_account_bride' => 'required',
            'bank_account_groom' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => true,
                'error_message' => $validator->errors()->first()
            ]);
        }

        try {
            $weddingOnline = DB::transaction(function () use ($request, $user) {
                $weddingOnline = new WeddingOnline();

                // Upload file to S3
                $fileFields = [
                    'logo_url' => 'logo',
                    'transfer_of_bride_url' => 'bride',
                    'transfer_of_groom_url' => 'groom',
                    'card_cover_image_url' => 'card-cover', 
                    'bride_image_url' => 'bride',
                    'groom_image_url' => 'groom',
                    'bride_image_url_2' => 'bride',
                    'groom_image_url_2' => 'groom',
                    'background_video_image_url' => 'video',
                    'background_youtube_url' => 'youtube',
                    'background_wish_image_url' => 'wish',
                    'background_wish_image_url_2' => 'wish',
                    'event_image_url' => 'event',
                    'wedding_ceremony_image_url' => 'ceremony',
                    'background_footer_image_url' => 'footer'
                ];
                
                foreach ($fileFields as $field => $folder) {
                    $fileKey = $field . '_file';
                    if (!empty($request->$fileKey) && $request->hasFile($fileKey)) {
                        $fileInS3 = $request->file($fileKey)->storeAs(
                            'wedding-online/' . $request->slug . '/' . $folder,
                            $request->file($fileKey)->getClientOriginalName(),
                            'public'
                        );
                        $weddingOnline->$field = $fileInS3;
                    }
                }
              
                $weddingOnline->fill($request->only([
                    'slug',
                    'title',
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
                    'wedding_video_description',
                    'popup_video_description',
                    'youtube_url',
                    'facebook_bride_url',
                    'facebook_groom_url',
                    'wish_text',
                    'invitation_text',
                    'bank_account_bride',
                    'bank_account_groom'
                ]));
                $weddingOnline->code = 'WO-' . Carbon::now()->format('YmdHis') . strtoupper(substr(md5(uniqid(mt_rand(), true)), 0, 5));
                $weddingOnline->user_id = $user->id;
                $weddingOnline->status = 'Inactive';
                $weddingOnline->save();

                $galleries = $request->galleries;
                if (!empty($galleries) && count($galleries) > 0) {
                    foreach ($galleries as $gallery) {
                        if (is_file($gallery['image_file'])) {
                            $fileInS3 = Storage::disk('public')->putFile(
                                'wedding-online/' . $request->slug . '/galleries',
                                $gallery['image_file']
                            );
                            $gallery['image_url'] = $fileInS3;
                        }

                        if (!empty($gallery['image_url']) && strlen($gallery['image_url']) > 255) {
                            $gallery['image_url'] = null;
                        }

                        $weddingOnline->galleries()->create([
                            'title' => $gallery['title'],
                            'image_url' => $gallery['image_url'], 
                            'order' => $gallery['order'],
                            'status' => $gallery['is_active'] ? 'Active' : 'Inactive',
                        ]);
                    }
                }

                $memories = $request->memories;
                if (!empty($memories) && count($memories) > 0) {
                    foreach ($memories as $index => $memory) {
                        if (is_file($memory['image_file'])) {
                            $fileInS3 = Storage::disk('public')->putFile(
                                'wedding-online/' . $request->slug . '/memories',
                                $memory['image_file']
                            );
                            $memory['image_url'] = $fileInS3;
                        }

                        if (!empty($memory['image_url']) && strlen($memory['image_url']) > 255) {
                            $memory['image_url'] = null;
                        }

                        $weddingOnline->memories()->create([
                            'title' => $memory['title'],
                            'image_url' => $memory['image_url'],
                            'order' => $memory['order'],
                            'status' => $memory['is_active'] ? 'Active' : 'Inactive',
                        ]);
                    }
                }

                $dressCodes = $request->dress_codes;
                if (!empty($dressCodes) && count($dressCodes) > 0) {
                    foreach ($dressCodes as $dressCode) {
                        $weddingOnline->dressCodes()->create([
                            'title' => $dressCode['title'],
                            'color' => $dressCode['color'],
                        ]);
                    }
                }

                return $weddingOnline;

            }, 5);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'error_message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'error' => false,
            'wedding_online' => $weddingOnline
        ]);
    }

    public function show($id)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('WorkSpace - Can View Wedding Online')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $weddingOnline = WeddingOnline::with('galleries', 'memories', 'dressCodes')->when($user->hasRole('Collaborator'), function ($query) use ($user) {
            $query->where('user_id', $user->id);
        })->find($id);

        if (!$weddingOnline) {
            return response()->json([
                'error' => true,
                'error_code' => '404',
                'error_message' => "Sorry, the wedding online is not found."
            ]);
        }

        return response()->json([
            'error' => false,
            'wedding_online' => $weddingOnline
        ]);
    }

    public function showBySlug(Request $request, $slug)
    {
        $user = null;
        if ($request->bearerToken()) {
            try {
                $user = auth('sanctum')->user();
            } catch (\Exception $e) {
                $user = null;
            }
        }

        $weddingOnline = WeddingOnline::with('galleries', 'memories', 'dressCodes')->where('slug', $slug);

        if($user && $user->hasRole('Collaborator')){
            $weddingOnline->where('user_id', $user->id);
        }

        if (empty($user)) {
            $weddingOnline->where('status', 'Activate');
        }

        $weddingOnline = $weddingOnline->first();

        if (!$weddingOnline) {
            return response()->json([
                'error' => true,
                'error_code' => '404',
                'error_message' => "Sorry, the wedding online is not found."
            ]);
        }

        return response()->json([
            'error' => false,
            'wedding_online' => $weddingOnline
        ]);
    }

    public function update($id, Request $request)
    {
        $user = auth()->user();
        if (!$user->hasPermissionTo('WorkSpace - Can Update Wedding Online')) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, you do not have permissions to this action."
            ]);
        }

        $validator = Validator::make($request->all(), [
            'slug' => 'required|unique:wedding_onlines,slug,' . $id,
            'title' => 'required',
            'logo_url' => 'required',
            'groom_name' => 'required',
            'bride_name' => 'required',
            'wedding_date' => 'required',
            'wedding_month' => 'required',
            'wedding_year' => 'required',
            'wedding_day' => 'required',
            'wedding_full_date' => 'required',
            'wedding_date_month' => 'required',
            'wedding_period' => 'required',
            'wedding_lunar_full_date' => 'required',
            'wedding_lunar_date' => 'required',
            'wedding_lunar_month' => 'required',
            'wedding_lunar_year' => 'required',
            'wedding_time' => 'required',
            'wedding_location' => 'required',
            'wedding_location_address' => 'required',
            'map_url' => 'required',
            'invitation_to' => 'required',
            'father_groom_name' => 'required',
            'mother_groom_name' => 'required',
            'father_bride_name' => 'required',
            'mother_bride_name' => 'required',
            'pick_up_time' => 'required',
            'service_time' => 'required',
            'party_time' => 'required',
            'photo_time' => 'required',
            'transfer_of_bride_url' => 'required',
            'transfer_of_groom_url' => 'required',
            'card_cover_image_url' => 'required',
            'bride_image_url' => 'required',
            'groom_image_url' => 'required',
            'bride_image_url_2' => 'required',
            'groom_image_url_2' => 'required',
            'background_video_image_url' => 'required',
            'wedding_video_description' => 'required',
            'popup_video_description' => 'required',
            'background_youtube_url' => 'required',
            'youtube_url' => 'required',
            'facebook_bride_url' => 'required',
            'facebook_groom_url' => 'required',
            'wish_text' => 'required',
            'background_wish_image_url' => 'required',
            'background_wish_image_url_2' => 'required',
            'event_image_url' => 'required',
            'wedding_ceremony_image_url' => 'required',
            'invitation_text' => 'required',
            'background_footer_image_url' => 'required',
            'dress_codes' => 'required',
            'memories' => 'required',
            'galleries' => 'required',
            'bank_account_bride' => 'required',
            'bank_account_groom' => 'required',
        ]);

        if ($validator->fails()) {
            return response()->json([
                'error' => true,
                'error_message' => $validator->errors()->first()
            ]);
        }

        $weddingOnline = WeddingOnline::where('status', 'Inactive')->find($id);
        if (!$weddingOnline) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the wedding online is not found."
            ]);
        }

        try {
            $weddingOnline = DB::transaction(function () use ($request, $weddingOnline) {
                // Upload file to S3
                $fileFields = [
                    'logo_url' => 'logo',
                    'transfer_of_bride_url' => 'bride',
                    'transfer_of_groom_url' => 'groom',
                    'card_cover_image_url' => 'card-cover', 
                    'bride_image_url' => 'bride',
                    'groom_image_url' => 'groom',
                    'bride_image_url_2' => 'bride',
                    'groom_image_url_2' => 'groom',
                    'background_video_image_url' => 'video',
                    'background_youtube_url' => 'youtube',
                    'background_wish_image_url' => 'wish',
                    'background_wish_image_url_2' => 'wish',
                    'event_image_url' => 'event',
                    'wedding_ceremony_image_url' => 'ceremony',
                    'background_footer_image_url' => 'footer'
                ];
                
                foreach ($fileFields as $field => $folder) {
                    $fileKey = $field . '_file';
                    if (!empty($request->$fileKey) && $request->hasFile($fileKey)) {
                        $fileInS3 = $request->file($fileKey)->storeAs(
                            'wedding-online/' . $request->slug . '/' . $folder,
                            $request->file($fileKey)->getClientOriginalName(),
                            'public'
                        );
                        // Delete existing file from storage if it exists
                        if ($weddingOnline->$field) {
                            Storage::disk('public')->delete($weddingOnline->$field);
                        }
                        $weddingOnline->$field = $fileInS3;
                    }
                }
              
                $weddingOnline->fill($request->only([
                    'slug',
                    'title',
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
                    'wedding_video_description',
                    'popup_video_description',
                    'youtube_url',
                    'facebook_bride_url',
                    'facebook_groom_url',
                    'wish_text',
                    'invitation_text',
                    'bank_account_bride',
                    'bank_account_groom'
                ]));
                $weddingOnline->save();

                $galleries = $request->galleries;
                if (!empty($galleries) && count($galleries) > 0) {
                    // Delete existing galleries that are not in the request
                    $galleryIds = array_column($galleries, 'id');
                    $deletedGalleries = $weddingOnline->galleries()->whereNotIn('id', $galleryIds)->get();
                    foreach ($deletedGalleries as $gallery) {
                        if ($gallery->image_url) {
                            Storage::disk('public')->delete($gallery->image_url);
                        }
                        $gallery->delete();
                    }

                    foreach ($galleries as $gallery) {
                        // Delete existing file from storage if it exists
                        if (isset($gallery['id']) && !empty($gallery['image_file']) && is_file($gallery['image_file'])) {
                            $existingGallery = $weddingOnline->galleries()->find($gallery['id']);
                            if ($existingGallery && $existingGallery->image_url) {
                                Storage::disk('public')->delete($existingGallery->image_url);
                            }
                        }

                        if (isset($gallery['image_file']) && is_file($gallery['image_file'])) {
                            $fileInS3 = Storage::disk('public')->putFile(
                                'wedding-online/' . $request->slug . '/galleries',
                                $gallery['image_file']
                            );
                            $gallery['image_url'] = $fileInS3;
                        }else{
                            if (isset($gallery['id'])) {
                                $existingGallery = $weddingOnline->galleries()->find($gallery['id']);
                                if ($existingGallery) {
                                    $gallery['image_url'] = $existingGallery->image_url;
                                }
                            }
                        }

                        if (!empty($gallery['image_url']) && strlen($gallery['image_url']) > 255 ) {
                            $gallery['image_url'] = null;
                        }

                        $weddingOnline->galleries()->updateOrCreate(
                            ['id' => $gallery['id']],
                            [
                                'title' => $gallery['title'],
                                'image_url' => $gallery['image_url'], 
                                'order' => $gallery['order'],
                                'status' => $gallery['is_active'] ? 'Active' : 'Inactive',
                            ]
                        );
                    }
                }

                $memories = $request->memories;
                if (!empty($memories) && count($memories) > 0) {
                    // Delete existing memories that are not in the request
                    $memoryIds = array_column($memories, 'id');
                    $deletedMemories = $weddingOnline->memories()->whereNotIn('id', $memoryIds)->get();
                    foreach ($deletedMemories as $memory) {
                        if ($memory->image_url) {
                            Storage::disk('public')->delete($memory->image_url);
                        }
                        $memory->delete();
                    }

                    foreach ($memories as $index => $memory) {
                        // Delete existing file from storage if it exists
                        if (isset($memory['id']) && !empty($memory['image_file']) && is_file($memory['image_file'])) {
                            $existingMemory = $weddingOnline->memories()->find($memory['id']);
                            if ($existingMemory && $existingMemory->image_url) {
                                Storage::disk('public')->delete($existingMemory->image_url);
                            }
                        }

                        if (isset($memory['image_file']) && is_file($memory['image_file'])) {
                            $fileInS3 = Storage::disk('public')->putFile(
                                'wedding-online/' . $request->slug . '/memories',
                                $memory['image_file']
                            );
                            $memory['image_url'] = $fileInS3;
                        }else{
                            if (isset($memory['id'])) {
                                $existingMemory = $weddingOnline->memories()->find($memory['id']);
                                if ($existingMemory) {
                                    $memory['image_url'] = $existingMemory->image_url;
                                }
                            }
                        }

                        if (!empty($memory['image_url']) && strlen($memory['image_url']) > 255) {
                            $memory['image_url'] = null;
                        }

                        $weddingOnline->memories()->updateOrCreate(
                            ['id' => $memory['id']],
                            [
                                'title' => $memory['title'],
                                'image_url' => $memory['image_url'],
                                'order' => $memory['order'],
                                'status' => $memory['is_active'] ? 'Active' : 'Inactive',
                            ]
                        );
                    }
                }

                $dressCodes = $request->dress_codes;
                if (!empty($dressCodes) && count($dressCodes) > 0) {
                    foreach ($dressCodes as $dressCode) {
                        $weddingOnline->dressCodes()->updateOrCreate(
                            ['id' => $dressCode['id']],
                            [
                                'title' => $dressCode['title'],
                                'color' => $dressCode['color'],
                            ]
                        );
                    }
                }

                return $weddingOnline;

            }, 5);
        } catch (\Exception $e) {
            return response()->json([
                'error' => true,
                'error_message' => $e->getMessage()
            ]);
        }

        return response()->json([
            'error' => false,
            'wedding_online' => $weddingOnline
        ]);
    }

    public function sendMessage(Request $request)
    {
        $weddingOnline = WeddingOnline::where('id', $request->id)->where('slug', $request->slug)->first();
        if (!$weddingOnline) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the wedding online is not found."
            ]);
        }

        $description = $request->message;
        if (empty($description)) {
           $description = $request->suggestion;
        }

        if (empty($description)) {
            $description = 'No message';
        }

        $weddingOnline->feedbackWishes()->create([
            'name' => $request->name,
            'from_whom' => $request->from_whom,
            'description' => $description,
        ]);

        return response()->json([
            'error' => false,
            'wedding_online' => $weddingOnline
        ]);
    }

    public function sendFeedback(Request $request)
    {
        $weddingOnline = WeddingOnline::where('id', $request->id)->where('slug', $request->slug)->first();
        if (!$weddingOnline) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the wedding online is not found."
            ]);
        }

        $weddingOnline->infoFeedbacks()->create([
            'name' => $request->name,
            'phone' => $request->phone,
            'number_of_people' => $request->number_of_people,
            'is_join_wedding' => $request->is_join_wedding,
            'is_guest_of_bride' => $request->is_guest_of_bride,
            'is_guest_of_groom' => $request->is_guest_of_groom,
        ]);

        return response()->json([
            'error' => false,
            'wedding_online' => $weddingOnline
        ]);
    }

    public function notifications($slug)
    {
        $weddingOnline = WeddingOnline::where('slug', $slug)->first();
        if (!$weddingOnline) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the wedding online is not found."
            ]);
        }

        $notifications = $weddingOnline->feedbackWishes()->orderBy('created_at', 'desc')->get();
        return response()->json([
            'error' => false,
            'notifications' => $notifications
        ]);
    }

    public function updateStatus($id, Request $request)
    {
        $user = auth()->user();
        if ($request->action == 'Submitted') {
            if (!$user->hasPermissionTo('WorkSpace - Can Submit Wedding Online')) {
                return response()->json([
                    'error' => true,
                    'error_message' => "Sorry, you do not have permissions to this action."
                ]);
            }
        } else if ($request->action == 'Approval') {
            if (!$user->hasPermissionTo('WorkSpace - Can Approval Wedding Online')) {
                return response()->json([
                    'error' => true,
                    'error_message' => "Sorry, you do not have permissions to this action."
                ]);
            }
        }

        $weddingOnline = WeddingOnline::find($id);
        if (empty($weddingOnline)) {
            return response()->json([
                'error' => true,
                'error_message' => "Sorry, the wedding online is not found."
            ]);
        }

        if ($request->action == 'Rejected') {
            if (empty($request->rejection_reason)) {
                return response()->json([
                    'error' => true,
                    'error_message' => "Sorry, the rejection reason is required."
                ]);
            }

            $weddingOnline->rejection_reason = $request->rejection_reason;
        }

        $weddingOnline->status = $request->action;
        if ($request->action == 'Approval') {
            $weddingOnline->approver_id = $user->id;
        }
        $weddingOnline->save();

        if ($weddingOnline->status == 'Activate') {
            // Send email to user
            $userSubmit = $weddingOnline->user;
            Mail::to($userSubmit->email)->send(new ActivateWeddingOnlineEmail($weddingOnline, $userSubmit));
        }else if ($weddingOnline->status == 'Submitted') {
            // Send email to admin
            $admin = User::where('employee_number', 'admin')->first();
            Mail::to($admin->email)->send(new SubmittedWeddingOnlineEmail($weddingOnline, $admin));
            
            // Send email to user - Format VietQR 
            $bankName = 'Techcombank';  // Mã Techcombank
            $accountNo = '3768888888';
            $amount = '199000';  // Số tiền
            $content = str_replace('-', '', $weddingOnline->code); // Nội dung

            $bankQrCodeImage = 'https://img.vietqr.io/image/' . $bankName . '-' . $accountNo . '-compact.png?amount=' . $amount . '&addInfo=' . $content;

            $userSubmit = $weddingOnline->user;
            Mail::to($userSubmit->email)->send(new SubmittedWeddingOnlineToUserEmail($weddingOnline, $userSubmit, $bankQrCodeImage));
        }

        return response()->json([
            'error' => false,
            'wedding_online' => $weddingOnline
        ]);
    }

    public function testEmail($slug)
    {
        $weddingOnline = WeddingOnline::where('slug', $slug)->first();
        $userSubmit = $weddingOnline->user;

        // Format VietQR 
        $bankName = 'Techcombank';  // Mã Techcombank
        $accountNo = '3768888888';
        $amount = '199000';  // Số tiền
        $content = str_replace('-', '', $weddingOnline->code); // Nội dung

        
        $bankQrCodeImage = 'https://img.vietqr.io/image/' . $bankName . '-' . $accountNo . '-compact.png?amount=' . $amount . '&addInfo=' . $content;
        
        return view('emails.submitted_wedding_online_to_user', [
            'weddingOnline' => $weddingOnline,
            'user' => $userSubmit,
            'bankQrCodeImage' => $bankQrCodeImage
        ]);
    }

    // Helper functions
    private function formatQRString($str)
    {
        $length = strlen($str);
        return str_pad($length, 2, '0', STR_PAD_LEFT) . $str;
    }

    private function formatAmount($amount)
    {
        // Remove any non-numeric characters
        $amount = preg_replace('/[^0-9]/', '', $amount);
        return str_pad(strlen($amount), 2, '0', STR_PAD_LEFT) . $amount;
    }
}

