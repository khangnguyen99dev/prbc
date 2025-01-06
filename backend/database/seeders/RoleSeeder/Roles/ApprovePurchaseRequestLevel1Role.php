<?php

namespace Database\Seeders\RoleSeeder\Roles;

use Database\Seeders\RoleSeeder\Permissions\ApprovePurchaseRequestLevel1Permissions;
use Database\Seeders\RoleSeeder\Core\RoleSeedRunner;

class ApprovePurchaseRequestLevel1Role extends RoleSeedRunner
{
    protected $roleName = 'Approve Purchase Request Level 1';

    protected $permissionManager = ApprovePurchaseRequestLevel1Permissions::class;

    public function __construct()
    {
        // 
    }
}
