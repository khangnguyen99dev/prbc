<?php

namespace Database\Seeders\RoleSeeder\Permissions;

use Database\Seeders\RoleSeeder\Core\PermissionsManager;

class SettingUserPermissions extends PermissionsManager
{
    public $permissions = [
        // Sidebar menu
        "View Settings in Sidebar",
        "Settings - View Master Data in Sidebar",
        
        // Region management
        "Settings - Master Data - View Region Management in Sidebar",
        "Settings - Master Data - Can Create Region Management",
        "Settings - Master Data - Can Show Region Management",
        "Settings - Master Data - Can Update Region Management",
        "Settings - Master Data - Can Delete Region Management",

        // Country management
        "Settings - Master Data - View Country Management in Sidebar",
        "Settings - Master Data - Can Create Country Management",
        "Settings - Master Data - Can Show Country Management",
        "Settings - Master Data - Can Update Country Management",
        "Settings - Master Data - Can Delete Country Management",

        // Entity management
        "Settings - Master Data - View Entity Management in Sidebar",
        "Settings - Master Data - Can Create Entity Management",
        "Settings - Master Data - Can Show Entity Management",
        "Settings - Master Data - Can Update Entity Management",
        "Settings - Master Data - Can Delete Entity Management",

        // Settings - Master Data - Currency
        'Settings - Master Data - View Currency in Sidebar',
        'Settings - Master Data - Can Create Currency',
        'Settings - Master Data - Can Show Currency',
        'Settings - Master Data - Can Update Currency',
        'Settings - Master Data - Can Delete Currency',
        
        // Settings - Master Data - Currency - Currency Rate Period
        'Settings - Master Data - Currency - Can Create Currency Rate Period',
        'Settings - Master Data - Currency - Can Show Currency Rate Period',
        'Settings - Master Data - Currency - Can Update Currency Rate Period',
        'Settings - Master Data - Currency - Can Delete Currency Rate Period',

    ];
}
