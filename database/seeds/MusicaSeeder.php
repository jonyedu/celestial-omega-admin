<?php

use Illuminate\Support\Str;
use App\Models\Musica\Musica;
use Illuminate\Database\Seeder;

class MusicaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Musica::truncate();
        for ($i = 0; $i < 20; $i++) {
            Musica::create(
                [
                    'genero_musical_id' => mt_rand(1, 20),
                    'descripcion' => Str::random(15),
                    'url' => 'c:/' . Str::random(20),
                    'usu_created' => 1,
                    'usu_update' => 1,
                    'ip_visitor' => '192.168.8.78',
                    'status' => true
                ]
            );
        }
    }
}
