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
        Schema::create('purchase_request_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('purchase_request_id')->nullable()->index('phr_purchase_request_id');
            $table->unsignedBigInteger('user_id')->nullable()->index('phr_user_id');
            $table->string('action')->nullable()->index('phr_action');
            $table->text('comment')->nullable();
            $table->string('status')->nullable()->index('phr_status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_request_histories');
    }
};
