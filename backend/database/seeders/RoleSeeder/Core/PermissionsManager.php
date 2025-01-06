<?php 

namespace Database\Seeders\RoleSeeder\Core;

class PermissionsManager
{
    /**
     * The permissions that this user level can access 
     *
     * @var array
     */
    public $permissions = array();

    /**
     * Function to return the permissions
     *
     * @return  array
     */
    public function getPermissions() : array
    {
        return $this->permissions;
    }
}
