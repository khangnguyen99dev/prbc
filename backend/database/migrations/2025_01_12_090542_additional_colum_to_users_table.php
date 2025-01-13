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
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone')->nullable()->index('user_phone');
            $table->text('message')->nullable();
            $table->string('role')->index('user_role');
            $table->string('status')->index('user_status');
            $table->string('temp_password')->nullable();
            $table->boolean('is_send_email')->default(false);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropColumn('phone');
            $table->dropColumn('message');
            $table->dropColumn('role');
            $table->dropColumn('status');
            $table->dropColumn('temp_password');
            $table->dropColumn('is_send_email');
        });
    }
};
