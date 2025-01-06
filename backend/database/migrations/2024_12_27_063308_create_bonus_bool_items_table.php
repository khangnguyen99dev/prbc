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
        Schema::create('bonus_bool_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('bonus_bool_id')->nullable()->index('bbi_bonus_bool_id');
            $table->unsignedBigInteger('user_id')->nullable()->index('bbi_user_id');
            $table->string('employee_name')->nullable()->index('bbi_employee_name');
            $table->string('employee_number')->nullable()->index('bbi_employee_number');
            $table->date('date_of_birth')->nullable()->index('bbi_date_of_birth');
            $table->decimal('bonus_amount_in_doc', 32, 8)->nullable();
            $table->decimal('bonus_amount_in_local', 32, 8)->nullable();
            $table->text('description')->nullable();
            $table->string('status')->nullable()->index('bbi_status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('bonus_bool_items');
    }
};
