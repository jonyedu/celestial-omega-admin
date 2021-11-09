<?php

use Illuminate\Support\Str;
use App\Models\GeneroMusical\GeneroMusical;
use Illuminate\Database\Seeder;

class GeneroMusicalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        GeneroMusical::truncate();
        for ($i = 0; $i < 20; $i++) {
            GeneroMusical::create(
                [
                    'descripcion' => Str::random(15),
                    'abreviatura' => Str::random(3),
                    'usu_created' => 1,
                    'usu_update' => 1,
                    'ip_visitor' => '192.168.8.78',
                    'status' => true
                ]
            );
        }
    }
}
