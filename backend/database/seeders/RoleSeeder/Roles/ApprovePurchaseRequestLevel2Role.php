<?php

namespace Database\Seeders\RoleSeeder\Roles;

use Database\Seeders\RoleSeeder\Permissions\ApprovePurchaseRequestLevel2Permissions;
use Database\Seeders\RoleSeeder\Core\RoleSeedRunner;

class ApprovePurchaseRequestLevel2Role extends RoleSeedRunner
{
    protected $roleName = 'Approve Purchase Request Level 2';

    protected $permissionManager = ApprovePurchaseRequestLevel2Permissions::class;

    public function __construct()
    {
        // 
    }
}
