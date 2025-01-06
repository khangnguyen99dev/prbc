<?php

namespace Database\Seeders\RoleSeeder\Permissions;

use Database\Seeders\RoleSeeder\Core\PermissionsManager;

class ApprovePurchaseRequestLevel1Permissions extends PermissionsManager
{
    public $permissions = [

        // WorkSpace
        'WorkSpace - View in Sidebar',
        'WorkSpace - View Purchase Request in Sidebar',
        'WorkSpace - Can View Purchase Request',
        'WorkSpace - Can Show Purchase Request',
        'WorkSpace - Can Approval Purchase Request',

    ];
}
