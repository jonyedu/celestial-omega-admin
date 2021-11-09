<?php

use App\Models\RedSocial\RedSocial;
use Illuminate\Database\Seeder;

class RedSocialSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $redes_sociales =  [
            (object) ['descripcion' => 'Facebook', 'icono' => 'mdi-facebook', 'color' => 'light-blue darken-4'],
            (object) ['descripcion' => 'Youtube', 'icono' => 'mdi-youtube', 'color' => 'red'],
            (object) ['descripcion' => 'Instagram', 'icono' => 'mdi-instagram', 'color' => 'accent'],
            (object) ['descripcion' => 'Twitter', 'icono' => 'mdi-twitter', 'color' => 'blue lighten-3'],
            (object) ['descripcion' => 'Twitch', 'icono' => 'mdi-twitch', 'color' => 'deep-purple lighten-1'],
        ];
        RedSocial::truncate();
        foreach ($redes_sociales as $red_social) {
            RedSocial::create(
                [
                    'descripcion' => $red_social->descripcion,
                    'icono' => $red_social->icono,
                    'color' => $red_social->color,
                    'usu_created' => 1,
                    'usu_update' => 1,
                    'ip_visitor' => '192.168.8.78',
                    'status' => true
                ]
            );
        }
    }
}
