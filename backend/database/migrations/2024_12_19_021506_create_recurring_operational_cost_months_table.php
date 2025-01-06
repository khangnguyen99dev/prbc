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
        Schema::create('recurring_operational_cost_months', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('recurring_operational_cost_id')->index('rocm_roc_id');
            $table->decimal('cost_amount_in_local_currency', 32, 8);
            $table->date('date');
            $table->string('month');
            $table->string('year');
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
        Schema::dropIfExists('recurring_operational_cost_months');
    }
};
