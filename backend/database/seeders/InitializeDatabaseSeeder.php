<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use App\Models\User;
use Illuminate\Support\Facades\Hash;
use App\Models\Currency;
use Illuminate\Support\Facades\DB;

class InitializeDatabaseSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {

        $user = User::where('email', 'admin@admin.com')->first();
        if (!$user) {
            $user = User::create([
                'name' => 'Admin Admin',
                'email' => 'admin@admin.com',
                'password' => Hash::make('password'),
                'created_by' => NULL,
                'created_from' => "InitializeDatabaseSeeder@run",
            ]);

            $user->assignRole('Super Admin');
            echo 'User initialized admin user successfully';
        }
        
        $currencyCode = config('currencies.default');
        $dataCurrency = config('currencies.init_list')[$currencyCode];
        if (!empty($dataCurrency)) {
            $currency = Currency::where('currency_code', $currencyCode)->first();
            if (empty($currency)) {
                Currency::create([
                    'name' => $dataCurrency['name'],
                    'code' => $dataCurrency['code'],
                    'currency_code' => $currencyCode,
                    'rate' => 1,
                    'enabled' => 1,
                    'precision' => $dataCurrency['precision'],
                    'symbol' => $dataCurrency['symbol'],
                    'symbol_first' => $dataCurrency['symbol_first'],
                    'decimal_mark' => $dataCurrency['decimal_mark'],
                    'thousands_separator' => $dataCurrency['thousands_separator'],
                    'created_from' => "InitializeDatabaseSeeder@run",
                    'created_by' => Null,
                ]);
                echo 'Currency initialized ' . $currencyCode . ' successfully';
            }
        }

        $settingUser = DB::table('settings')->where('key', 'default.currency')->first();
        if (empty($settingUser)) {
            DB::table('settings')->insert([
                'key' => 'default.currency',
                'value' => 'SGD',
            ]);
        }
    }
}
