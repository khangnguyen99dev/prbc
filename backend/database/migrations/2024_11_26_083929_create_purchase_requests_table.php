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
        Schema::create('purchase_requests', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('entity_id')->nullable()->index('pr_entity_id');
            $table->string('pr_number')->nullable()->index('pr_number');
            $table->string('pr_name')->nullable()->index('pr_name');
            $table->date('date')->nullable()->index('pr_date');
            $table->text('description')->nullable();
            $table->string('currency')->nullable()->index('pr_currency');
            $table->string('local_currency')->nullable()->index('pr_local_currency');
            $table->decimal('amount_in_local_currency', 32, 8)->nullable();
            $table->decimal('amount_in_document_currency', 32, 8)->nullable();
            $table->decimal('exchange_rate', 32, 8)->nullable();
            $table->unsignedBigInteger('requester_id')->nullable()->index('pr_requester_id');
            $table->integer('approval_level_required')->default(1);
            $table->integer('approval_level_approved')->default(0);
            $table->integer('rejected_at_level')->default(0);
            $table->string('approval_level_status')->nullable()->index('pr_approval_level_status');
            $table->string('status')->default('Draft')->nullable()->index('pr_status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_requests');
    }
};
