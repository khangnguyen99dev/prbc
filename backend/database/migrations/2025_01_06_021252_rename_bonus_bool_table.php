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
        Schema::rename('bonus_bools', 'bonus_pools');
        Schema::rename('bonus_bool_items', 'bonus_pool_items');
        Schema::rename('bonus_bool_histories', 'bonus_pool_histories');

        Schema::table('bonus_pool_items', function (Blueprint $table) {
            $table->renameColumn('bonus_bool_id', 'bonus_pool_id');
        });

        Schema::table('bonus_pool_histories', function (Blueprint $table) {
            $table->renameColumn('bonus_bool_id', 'bonus_pool_id');
            $table->renameColumn('bonus_bool_item_id', 'bonus_pool_item_id');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::rename('bonus_pools', 'bonus_bools');
        Schema::rename('bonus_pool_items', 'bonus_bool_items');
        Schema::rename('bonus_pool_histories', 'bonus_bool_histories');

        Schema::table('bonus_bool_items', function (Blueprint $table) {
            $table->renameColumn('bonus_pool_id', 'bonus_bool_id');
        });

        Schema::table('bonus_bool_histories', function (Blueprint $table) {
            $table->renameColumn('bonus_pool_id', 'bonus_bool_id');
            $table->renameColumn('bonus_pool_item_id', 'bonus_bool_item_id');
        });
    }
};
