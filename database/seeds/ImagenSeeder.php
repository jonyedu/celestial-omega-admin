<?php

use App\Models\Imagen\Imagen;
use Illuminate\Database\Seeder;

class ImagenSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Imagen::truncate();
        for ($i = 0; $i < 20; $i++) {
            $path = public_path() . '/images/imgPrueba/' . $i . '.png';
            $base64 = convertImgToBinary($path);

            //galeria
            Imagen::create([
                'galeria_id' => $i + 1,
                'evento_id' => 0,
                'programa_id' => 0,
                'tipo_proceso' => 1,
                'src' => $base64,
                'usu_created' => 1,
                'usu_update' => 1,
                'ip_visitor' => '192.168.8.78',
                'status' => true
            ]);
            //evento
            Imagen::create([
                'galeria_id' => 0,
                'evento_id' => $i + 1,
                'programa_id' => 0,
                'tipo_proceso' => 2,
                'src' => $base64,
                'usu_created' => 1,
                'usu_update' => 1,
                'ip_visitor' => '192.168.8.78',
                'status' => true
            ]);
            //programa
            Imagen::create([
                'galeria_id' => 0,
                'evento_id' => 0,
                'programa_id' => $i + 1,
                'tipo_proceso' => 3,
                'src' => $base64,
                'usu_created' => 1,
                'usu_update' => 1,
                'ip_visitor' => '192.168.8.78',
                'status' => true
            ]);
        }
    }
}
