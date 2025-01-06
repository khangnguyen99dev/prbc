<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Database\Seeders\RoleSeeder\Roles\{
    SuperAdminRole,
    SettingUserRole,
    ApprovePurchaseRequestLevel1Role,
    ApprovePurchaseRequestLevel2Role,
    ApprovePurchaseRequestLevel3Role,
    BusinessUnitHeadRole,
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

        // Setting User permisstion
        (new SettingUserRole)->seed();

        // Approve Purchase Request Level 1 permisstion
        (new ApprovePurchaseRequestLevel1Role)->seed();

        // Approve Purchase Request Level 2 permisstion
        (new ApprovePurchaseRequestLevel2Role)->seed();

        // Approve Purchase Request Level 3 permisstion
        (new ApprovePurchaseRequestLevel3Role)->seed();

        // Business Unit Head permisstion
        (new BusinessUnitHeadRole)->seed();

    }
}

