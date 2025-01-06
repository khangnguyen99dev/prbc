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
        Schema::create('purchase_request_items', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('purchase_request_id')->nullable()->index('pri_purchase_request_id');
            $table->string('item_name')->nullable()->index('pri_item_name');
            $table->string('item_code')->nullable()->index('pri_item_code');
            $table->string('item_description')->nullable()->index('pri_item_description');
            $table->integer('quantity')->nullable();
            $table->decimal('unit_price', 32, 8)->nullable();
            $table->decimal('total_price', 32, 8)->nullable();
            $table->decimal('exchange_rate', 32, 8)->nullable();
            $table->decimal('total_price_in_local_currency', 32, 8)->nullable();
            $table->string('uom')->nullable()->index('pri_uom');
            $table->date('required_by')->nullable();
            $table->string('status')->nullable()->index('pri_status');
            $table->timestamps();
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('purchase_request_items');
    }
};
