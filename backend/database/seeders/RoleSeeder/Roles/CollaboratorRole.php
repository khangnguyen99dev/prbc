<?php

namespace Database\Seeders\RoleSeeder\Roles;

use Database\Seeders\RoleSeeder\Permissions\CollaboratorPermissions;
use Database\Seeders\RoleSeeder\Core\RoleSeedRunner;

class CollaboratorRole extends RoleSeedRunner
{
    protected $roleName = 'Collaborator';

    protected $permissionManager = CollaboratorPermissions::class;

    public function __construct()
    {
        // 
    }
}
