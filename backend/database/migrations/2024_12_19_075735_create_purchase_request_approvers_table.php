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
        Schema::create('purchase_request_approvers', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('purchase_request_id')->nullable()->index('pra_purchase_request_id');
            $table->unsignedBigInteger('approver_id')->nullable()->index('pra_approver_id');
            $table->integer('level')->nullable();
            $table->string('status')->nullable()->index('pra_status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_request_approvers');
    }
};
