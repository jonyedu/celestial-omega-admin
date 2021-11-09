<?php

use Illuminate\Support\Str;
use App\Models\Live\Live;
use Illuminate\Database\Seeder;

class LiveSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Live::truncate();
        $int= mt_rand(0,1262055681);
        for ($i = 0; $i < 20; $i++) {
            Live::create(
                [
                    'red_social_id' => mt_rand(1, 5),
                    'fecha' => date("Y-m-d", $int),
                    'hora'  => date("H:i:s", $int),
                    'nombre' => Str::random(10),
                    'descripcion' => Str::random(10),
                    'url' => 'www.' . Str::random(10) . 'com',
                    'usu_created' => 1,
                    'usu_update' => 1,
                    'ip_visitor' => '192.168.8.78',
                    'status' => true
                ]
            );
        }
    }
}
