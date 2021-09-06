<?php

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UserSeeder::class);
        $this->call(ConfigEmpresaSeeder::class);
        $this->call(EventoSeeder::class);
        $this->call(GaleriaSeeder::class);
        $this->call(ProgramaSeeder::class);
        $this->call(ImagenSeeder::class);
    }
}
