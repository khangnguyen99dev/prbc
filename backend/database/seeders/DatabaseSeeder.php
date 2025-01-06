<?php

namespace Database\Seeders;

use App\Models\User;
// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        // User::factory(10)->create();

        // Seed the roles
        $this->call(RoleSeeder::class);

        // Initialize the super admin user
        $this->call(InitializeDatabaseSeeder::class);
    }
}
