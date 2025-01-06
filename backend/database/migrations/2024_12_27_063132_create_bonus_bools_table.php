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
        Schema::create('bonus_bools', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('entity_id')->nullable()->index('bb_entity_id');
            $table->string('name')->nullable()->index('bb_name');
            $table->string('code')->nullable()->index('bb_code');
            $table->text('description')->nullable();
            $table->decimal('total_bonus_in_doc', 32, 8)->nullable();
            $table->decimal('minimum_management_bonus_in_doc', 32, 8)->nullable();
            $table->decimal('total_bonus_in_local', 32, 8)->nullable();
            $table->decimal('minimum_management_bonus_in_local', 32, 8)->nullable();
            $table->string('local_currency')->nullable()->index('bb_local_currency');
            $table->string('currency')->nullable()->index('bb_currency');
            $table->decimal('exchange_rate', 32, 8)->nullable()->index('bb_exchange_rate');
            $table->string('status')->nullable()->index('bb_status');
            $table->unsignedBigInteger('user_id')->nullable()->index('bb_user_id');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bonus_bools');
    }
};
