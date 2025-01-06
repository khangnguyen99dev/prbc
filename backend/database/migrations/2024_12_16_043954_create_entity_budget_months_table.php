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
        Schema::create('entity_budget_months', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('entity_budget_id')->nullable()->index('ebm_eid');
            $table->string('year', 10)->nullable()->index('ebm_year');
            $table->string('month', 10)->nullable()->index('ebm_month');
            $table->date('start_date')->nullable();
            $table->date('end_date')->nullable();
            $table->decimal('budget_amount', 32, 8)->nullable();
            $table->string('status', 20)->nullable()->index('ebm_status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entity_budget_months');
    }
};
