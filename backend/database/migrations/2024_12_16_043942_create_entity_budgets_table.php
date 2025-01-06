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
        Schema::create('entity_budgets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('entity_id')->nullable()->index('eb_eid');
            $table->string('year', 10)->nullable()->index('eb_year');
            $table->string('currency', 10)->nullable()->index('eb_currency');
            $table->decimal('total_budget', 32, 8)->nullable();
            $table->string('status', 20)->nullable()->index('eb_status');
            $table->unsignedBigInteger('created_by')->nullable()->index('eb_created_by');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('entity_budgets');
    }
};
