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
        Schema::create('country_budget_months', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('country_budget_id')->nullable()->index('cbm_cid');
            $table->string('year', 10)->nullable()->index('cbm_year');
            $table->string('month', 10)->nullable()->index('cbm_month');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->decimal('budget_amount', 32, 8)->nullable();
            $table->string('status', 20)->nullable()->index('cbm_status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('country_budget_months');
    }
};
