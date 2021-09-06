<?php

use App\Models\Programa\Programa;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;

class ProgramaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Programa::truncate();
        for ($i = 0; $i < 20; $i++) {
            $int = mt_rand(0, 1262055681);
            Programa::create(
                [
                    'fecha' => date("Y-m-d", $int),
                    'hora_inicio' => date("H:i:s", $int),
                    'hora_fin' => date("H:i:s", $int),
                    'titulo' => Str::random(10),
                    'sub_titulo' => Str::random(20),
                    'flex' => mt_rand(0, 12),
                    'usu_created' => 1,
                    'usu_update' => 1,
                    'ip_visitor' => '192.168.8.78',
                    'status' => true
                ]
            );
        }
    }
}
