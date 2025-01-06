<?php

namespace Database\Seeders\RoleSeeder\Permissions;

use Database\Seeders\RoleSeeder\Core\PermissionsManager;

class BusinessUnitHeadPermissions extends PermissionsManager
{
    public $permissions = [
        // Sidebar menu
        "View Settings in Sidebar",

        // Bonus Pool
        'Settings - Bonus Pool - Can View Bonus Pool in Sidebar',
        'Settings - Bonus Pool - Can View Bonus Pool',

        // Bonus Pool items
        'Settings - Bonus Pool - Can View Bonus Pool Items',
        'Settings - Bonus Pool - Can Create Bonus Pool Items',
        'Settings - Bonus Pool - Can Delete Bonus Pool Items',
    ];
}
