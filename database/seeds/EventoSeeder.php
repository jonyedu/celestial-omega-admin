<?php

use Illuminate\Support\Str;
use App\Models\Evento\Evento;
use Illuminate\Database\Seeder;

class EventoSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Evento::truncate();
        for ($i = 0; $i < 20; $i++) {
            $int= mt_rand(0,1262055681);
            $path = public_path() . '/images/imgPrueba/' . $i . '.png';
            $base64 = convertImgToBinary($path);
            Evento::create(
                [
                    'fecha' => date("Y-m-d",$int),
                    'hora'  => date("H:i:s",$int),
                    'titulo' => Str::random(10),
                    'sub_titulo' => Str::random(20),
                    'flex' => mt_rand(0, 12),
                    'src' => $base64,
                    'usu_created' => 1,
                    'usu_update' => 1,
                    'ip_visitor' => '192.168.8.78',
                    'status' => true
                ]
            );
        }
    }
}
