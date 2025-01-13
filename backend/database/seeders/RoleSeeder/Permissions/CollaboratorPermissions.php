<?php

namespace Database\Seeders\RoleSeeder\Permissions;

use Database\Seeders\RoleSeeder\Core\PermissionsManager;

class CollaboratorPermissions extends PermissionsManager
{
    public $permissions = [
        // Sidebar menu
        // "View Settings in Sidebar",

        // WorkSpace
        'WorkSpace - View in Sidebar',

        // Wedding Online
        'WorkSpace - View Wedding Online in Sidebar',
        'WorkSpace - Can View Wedding Online',
        'WorkSpace - Can Create Wedding Online',
        'WorkSpace - Can Update Wedding Online',
        // 'WorkSpace - Can Delete Wedding Online',

        'WorkSpace - Can Submit Wedding Online',
    ];
}
