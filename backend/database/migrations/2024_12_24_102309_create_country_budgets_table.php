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
        Schema::create('country_budgets', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('country_id')->nullable()->index('cb_cid');
            $table->string('year', 10)->nullable()->index('cb_year');
            $table->string('currency', 10)->nullable()->index('cb_currency');
            $table->decimal('total_budget', 32, 8)->nullable();
            $table->string('status', 20)->nullable()->index('cb_status');
            $table->unsignedBigInteger('created_by')->nullable()->index('cb_created_by');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('country_budgets');
    }
};
