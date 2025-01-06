<?php

namespace Database\Seeders\RoleSeeder\Roles;

use Database\Seeders\RoleSeeder\Permissions\SettingUserPermissions;
use Database\Seeders\RoleSeeder\Core\RoleSeedRunner;

class SettingUserRole extends RoleSeedRunner
{
    protected $roleName = 'Setting User';

    protected $permissionManager = SettingUserPermissions::class;

    public function __construct()
    {
        // 
    }
}
