<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder\Roles\{
    SuperAdminRole,
    CollaboratorRole,
};

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Super Admin permisstion
        (new SuperAdminRole)->seed();

        // Collaborator permisstion
        (new CollaboratorRole)->seed();

    }
}

