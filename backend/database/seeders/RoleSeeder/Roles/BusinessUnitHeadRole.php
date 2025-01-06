<?php

namespace Database\Seeders\RoleSeeder\Roles;

use Database\Seeders\RoleSeeder\Permissions\BusinessUnitHeadPermissions;
use Database\Seeders\RoleSeeder\Core\RoleSeedRunner;

class BusinessUnitHeadRole extends RoleSeedRunner
{
    protected $roleName = 'Business Unit Head';

    protected $permissionManager = BusinessUnitHeadPermissions::class;

    public function __construct()
    {
        // 
    }
}
