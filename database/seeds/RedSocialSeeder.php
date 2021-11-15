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
            (object) ['descripcion' => 'Facebook', 'icono' => 'mdi-facebook', 'color' => 'light-blue darken-4', 'url' => 'https://www.facebook.com/celestial.omega.944'],
            (object) ['descripcion' => 'Youtube', 'icono' => 'mdi-youtube', 'color' => 'red', 'url' => 'https://www.youtube.com/channel/UCOjh_XOXLigAsMc3sMOKZlQ'],
            (object) ['descripcion' => 'Instagram', 'icono' => 'mdi-instagram', 'color' => 'accent', 'url' => 'https://www.instagram.com/celestialomegatv'],
            (object) ['descripcion' => 'Whatsapp', 'icono' => 'mdi-whatsapp', 'color' => 'teal', 'url' => 'https://api.whatsapp.com/send?phone=593997760413&text=Hola%20hermanos%20necesito%20oracion%20'],
            (object) ['descripcion' => 'Twitter', 'icono' => 'mdi-twitter', 'color' => 'blue lighten-3', 'url' => ''],
            (object) ['descripcion' => 'Twitch', 'icono' => 'mdi-twitch', 'color' => 'deep-purple lighten-1', 'url' => ''],
        ];
        RedSocial::truncate();
        foreach ($redes_sociales as $red_social) {
            RedSocial::create(
                [
                    'descripcion' => $red_social->descripcion,
                    'icono' => $red_social->icono,
                    'color' => $red_social->color,
                    'url' => $red_social->url,
                    'usu_created' => 1,
                    'usu_update' => 1,
                    'ip_visitor' => '192.168.8.78',
                    'status' => true
                ]
            );
        }
    }
}
