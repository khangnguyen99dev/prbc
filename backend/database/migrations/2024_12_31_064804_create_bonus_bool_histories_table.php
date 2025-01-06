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
        Schema::create('bonus_bool_histories', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bonus_bool_id')->nullable()->index('bbh_bonus_bool_id');
            $table->unsignedBigInteger('user_id')->nullable()->index('bbh_user_id');
            $table->unsignedBigInteger('bonus_bool_item_id')->nullable()->index('bbh_bonus_bool_item_id');
            $table->string('action')->nullable()->index('bbh_action');
            $table->string('status')->nullable()->index('bbh_status');
            $table->text('comment')->nullable();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bonus_bool_histories');
    }
};
