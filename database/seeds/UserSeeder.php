<?php

use App\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::truncate();
        User::updateOrCreate([
            'name' => 'Jonathan Eduardo Mora Candelario',
            'email' => 'jonathan_1308@hotmail.com',
            'password' => Hash::make('jony,.123'),
        ]);
    }
}
