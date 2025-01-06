<?php

namespace Database\Seeders\RoleSeeder\Permissions;

use Database\Seeders\RoleSeeder\Core\PermissionsManager;

class SuperAdminPermissions extends PermissionsManager
{
    public $permissions = [
        // Sidebar menu
        "View Settings in Sidebar",
        "Settings - View Master Data in Sidebar",

        // User management
        "Settings - Master Data - View User Management in Sidebar",
        "Settings - Master Data - Can Create User Management",
        "Settings - Master Data - Can Show User Management",
        "Settings - Master Data - Can Update User Management",
        "Settings - Master Data - Can Assign Role User Management",
        // "Settings - Master Data - Can Delete User Management",
        
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

        // Budget management
        "Settings - View Budget Management in Sidebar",
        "Settings - Can Create Budget Management",
        "Settings - Can Show Budget Management",
        "Settings - Can Update Budget Management",
        "Settings - Can Delete Budget Management",

        // Budget monthly
        "Settings - Budget Management - Can View Budget Monthly",
        
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

        // Recurring Operational Cost management
        "Settings - View Recurring Operational Cost in Sidebar",
        "Settings - Can Create Recurring Operational Cost",
        "Settings - Can Show Recurring Operational Cost",
        "Settings - Can Update Recurring Operational Cost",
        "Settings - Can Delete Recurring Operational Cost",
        
        // WorkSpace
        'WorkSpace - View in Sidebar',
        'WorkSpace - View Purchase Request in Sidebar',
        'WorkSpace - Can View Purchase Request',
        'WorkSpace - Can Create Purchase Request',
        'WorkSpace - Can Show Purchase Request',
        'WorkSpace - Can Update Purchase Request',
        'WorkSpace - Can Delete Purchase Request',
        'WorkSpace - Can Submit For Approval Purchase Request',
        'WorkSpace - Can Cancel Purchase Request',
        'WorkSpace - Can Approval Purchase Request',

        // Country Budget
        'Settings - View Country Budget in Sidebar',
        'Settings - Can Show Country Budget',
        'Settings - Can Create Country Budget',
        'Settings - Can Update Country Budget',
        'Settings - Can Delete Country Budget',

        // Country Budget Monthly
        'Settings - Country Budget - Can View Country Budget Monthly',

        // Bonus Pool
        'Settings - Bonus Pool - Can View Bonus Pool in Sidebar',
        'Settings - Bonus Pool - Can View Bonus Pool',
        'Settings - Bonus Pool - Can Create Bonus Pool',
        'Settings - Bonus Pool - Can Update Bonus Pool',
        'Settings - Bonus Pool - Can Delete Bonus Pool',

        // Bonus Pool items
        'Settings - Bonus Pool - Can View Bonus Pool Items',
        'Settings - Bonus Pool - Can Approval Bonus Pool Items',
    ];
}
