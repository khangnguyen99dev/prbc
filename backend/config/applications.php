<?php

return [

    /*
    |--------------------------------------------------------------------------
    | Applications
    |--------------------------------------------------------------------------
    |
    | Manages the applications currently installed onto the Family application
    | instance.
    |
     */

    'installed' => [
        // Setting User
        'setting_user' => [
            'name' => 'Settings',
            'key' => 'settings',
            'roles' => [
                ['label' => 'Setting User', 'role_name' => 'Setting User'],
            ],
        ],
        'purchase_request' => [
            'name' => 'Purchase Request',
            'key' => 'purchase_request',
            'roles' => [
                ['label' => 'Approve Purchase Request Level 1', 'role_name' => 'Approve Purchase Request Level 1'],
                ['label' => 'Approve Purchase Request Level 2', 'role_name' => 'Approve Purchase Request Level 2'],
                ['label' => 'Approve Purchase Request Level 3', 'role_name' => 'Approve Purchase Request Level 3'],
            ],
        ],
        'business_unit' => [
            'name' => 'Business Unit',
            'key' => 'business_unit',
            'roles' => [
                ['label' => 'Business Unit Head', 'role_name' => 'Business Unit Head'],
            ],
        ],
    ],
];
