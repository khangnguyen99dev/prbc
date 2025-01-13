<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\RegionController;
use App\Http\Controllers\CountryController;
use App\Http\Controllers\WorkSpace\WeddingOnlineController;

Route::get('/', function () {
    return view('welcome');
});

Route::get('/wedding/{slug}', [WeddingOnlineController::class, 'testEmail'])->name('emails.activate_wedding_online');
