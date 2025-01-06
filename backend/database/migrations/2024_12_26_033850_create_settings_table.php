<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function __construct()
	{
        $this->tablename = Config::get('settings.table');
        $this->keyColumn = Config::get('settings.keyColumn');
        $this->valueColumn = Config::get('settings.valueColumn');
	}
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('settings', function (Blueprint $table) {
			$table->increments('id');
			$table->string($this->keyColumn)->index();
			$table->text($this->valueColumn);
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists($this->tablename);
    }
};
