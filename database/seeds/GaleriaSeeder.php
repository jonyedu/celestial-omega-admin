<?php

use Illuminate\Support\Str;
use App\Models\Galeria\Galeria;
use Illuminate\Database\Seeder;

class GaleriaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Galeria::truncate();
        for ($i = 0; $i < 20; $i++) {

            $path = public_path() . '/images/imgPrueba/' . $i . '.png';
            $base64 = convertImgToBinary($path);
            Galeria::create(
                [
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
