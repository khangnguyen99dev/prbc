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
        Schema::create('recurring_operational_costs', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->string('code');
            $table->string('description')->nullable();
            $table->unsignedBigInteger('entity_id')->index();
            $table->decimal('cost_amount_in_local_currency', 32, 8)->nullable();
            $table->boolean('active')->nullable();
            $table->date('date_active')->nullable();
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
        Schema::dropIfExists('recurring_operational_costs');
    }
};
