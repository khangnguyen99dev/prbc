<?php

namespace Database\Seeders\RoleSeeder\Roles;

use Database\Seeders\RoleSeeder\Permissions\SuperAdminPermissions;
use Database\Seeders\RoleSeeder\Core\RoleSeedRunner;

class SuperAdminRole extends RoleSeedRunner
{
    protected $roleName = 'Super Admin';

    protected $permissionManager = SuperAdminPermissions::class;

    public function __construct()
    {
        // 
    }
}
