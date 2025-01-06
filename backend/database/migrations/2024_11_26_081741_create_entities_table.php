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
        Schema::create('entities', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('country_id')->nullable()->index();
            $table->string('name');
            $table->string('code')->unique();
            $table->string('address')->nullable();
            $table->string('logo')->nullable();
            $table->unsignedBigInteger('local_currency_id')->index();
            $table->unsignedBigInteger('created_by')->nullable()->index();
            $table->string('created_from')->index();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entities');
    }
};
