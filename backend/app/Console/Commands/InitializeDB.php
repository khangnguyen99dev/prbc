<?php

namespace App\Console\Commands;

use Illuminate\Console\Command;
use App\Models\User;
use Faker\Factory;
use Illuminate\Support\Facades\Hash;
use App\Models\Region;
use App\Models\Currency;
use App\Models\Entity;
use App\Models\RecurringOperationalCost;
use Carbon\Carbon;

class InitializeDB extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:initialize-db';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $checkUser01 = User::where('email', 'user01@admin.com')->first();
        if (!$checkUser01) {
            $user01 = User::create([
                'name' => 'User 01',
                'email' => 'user01@admin.com',
                'password' => Hash::make('password'),
                'created_by' => NULL,
                'created_from' => "InitializeDB@handle",
            ]);
            $user01->assignRole('Approve Purchase Request Level 1');
        }

        $checkUser02 = User::where('email', 'user02@admin.com')->first();
        if (!$checkUser02) {
            $user02 = User::create([
                'name' => 'User 02',
                'email' => 'user02@admin.com',
                'password' => Hash::make('password'),
                'created_by' => NULL,
                'created_from' => "InitializeDB@handle",
            ]);
            $user02->assignRole('Approve Purchase Request Level 2');
        }

        $checkUser03 = User::where('email', 'user03@admin.com')->first();
        if (!$checkUser03) {
            $user03 = User::create([
                'name' => 'User 03',
                'email' => 'user03@admin.com',
                'password' => Hash::make('password'),
                'created_by' => NULL,
                'created_from' => "InitializeDB@handle",
            ]);
            $user03->assignRole('Approve Purchase Request Level 3');
        }

        $createRandomUsers = $this->confirm('Do you want to create 20 random users?');
        if ($createRandomUsers) {
            for ($i = 0; $i < 20; $i++) {
                $faker = Factory::create();
                $checkUser = User::where('email', $faker->unique()->safeEmail)->first();
                if (!$checkUser) {
                    User::create([
                        'name' => $faker->name,
                        'email' => $faker->unique()->safeEmail,
                        'password' => Hash::make('password'),
                        'created_by' => NULL,
                        'created_from' => "InitializeDB@handle",
                    ]);
                    $this->info('User initialized ' . $i + 1 . ' users successfully');
                }
            }

            $this->info('User initialized 20 users successfully');
        } else {
            $this->info('No random users created.');
        }

        $createRandomRegions = $this->confirm('Do you want to create 20 random regions?');
        if ($createRandomRegions) {
            for ($i = 0; $i < 20; $i++) {
                $faker = Factory::create();

                $owner = User::inRandomOrder()->first();

                $region = Region::create([
                    'name' => $faker->name,
                    'code' => $faker->unique()->randomNumber(5, true),
                    'owner_id' => $owner->id,
                    'created_by' => NULL,
                    'created_from' => "InitializeDB@handle",
                ]);

                $this->info('Region initialized ' . $i + 1 . ' regions successfully');
            }
        } else {
            $this->info('No random regions created.');
        }

        $createRandomCurrencies = $this->confirm('Do you want to create 10 currencies?');
        if ($createRandomCurrencies) {
            $currencyExist = Currency::all()->pluck('currency_code')->toArray();
            $currencies = config('currencies.init_list');
            $i = 0;
            foreach ($currencies as $currencyCode => $data) {
                $currency = Currency::where('currency_code', $currencyCode)->first();
                if (empty($currency)) {
                    Currency::create([
                        'name' => $data['name'],
                        'code' => $data['code'],
                        'currency_code' => $currencyCode,
                        'rate' => rand(50, 200) / 100,
                        'enabled' => 1,
                        'precision' => 2,
                        'symbol' => $data['symbol'],
                        'symbol_first' => 1,
                        'decimal_mark' => $data['decimal_mark'],
                        'thousands_separator' => $data['thousands_separator'],
                        'created_from' => 'InitializeDB@handle',
                        'created_by' => NULL,
                    ]);
                    $this->info('Currency initialized ' . $i + 1 . ' currencies successfully');
                    $i++;
                    if ($i >= 10) {
                        break;
                    }
                }
            }
        } else {
            $this->info('No random currencies created.');
        }

        $createRandomEntities = $this->confirm('Do you want to create 20 random entities?');
        if ($createRandomEntities) {
            for ($i = 0; $i < 20; $i++) {
                $faker = Factory::create();

                $currency = Currency::inRandomOrder()->first();

                $entity = Entity::create([
                    'name' => $faker->name,
                    'code' => $faker->unique()->randomNumber(5, true),
                    'address' => $faker->address,
                    'local_currency_id' => $currency->id,
                    'created_by' => NULL,
                    'created_from' => "InitializeDB@handle",
                ]);

                $this->info('Entity initialized ' . $i + 1 . ' entities successfully');
            }
        } else {
            $this->info('No random entities created.');
        }

        $createRandomRecurringOperationalCosts = $this->confirm('Do you want to create 20 random recurring operational costs?');
        if ($createRandomRecurringOperationalCosts) {
            for ($i = 0; $i < 20; $i++) {
                $faker = Factory::create();

                $entity = Entity::inRandomOrder()->first();

                RecurringOperationalCost::create([
                    'name' => $faker->name,
                    'code' => $faker->unique()->randomNumber(5, true),
                    'description' => $faker->text,
                    'cost_amount_in_local_currency' => rand(1, 10) * 100000,
                    'date_active' => Carbon::now()->addDays(rand(1, 30)),
                    'active' => 1,
                    'entity_id' => $entity->id,
                    'created_by' => NULL,
                    'created_from' => "InitializeDB@handle",
                ]);

                $this->info('Recurring Operational Cost initialized ' . $i + 1 . ' recurring operational costs successfully');
            }
        } else {
            $this->info('No random recurring operational costs created.');
        }
    }
}
