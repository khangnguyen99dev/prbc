<?php

namespace Database\Seeders\RoleSeeder\Roles;

use Database\Seeders\RoleSeeder\Permissions\ApprovePurchaseRequestLevel3Permissions;
use Database\Seeders\RoleSeeder\Core\RoleSeedRunner;

class ApprovePurchaseRequestLevel3Role extends RoleSeedRunner
{
    protected $roleName = 'Approve Purchase Request Level 3';

    protected $permissionManager = ApprovePurchaseRequestLevel3Permissions::class;

    public function __construct()
    {
        // 
    }
}
