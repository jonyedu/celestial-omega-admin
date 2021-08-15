<?php

use App\Models\Seguridad\Empresa;
use Illuminate\Database\Seeder;

class ConfigEmpresaSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Empresa::updateOrCreate(
            [
                'ruc' => '1234567891001'
            ],
            [
                'nombre' => 'Radio Celestial Omega',
                'direccion' => '',
                'email' => 'sin_correo@hotmail.com',
                'ruc' => '1234567891001',
                'telefono' => '123456789',
                'logo' => '',
                'url' => '/Omega',
                'pais_id' => 1,
                'ciudad_id' => 1,
                'usu_created' => 1,
                'usu_update' => 1,
                'ip_visitor' => '192.168.100.6',
                'status' => true
            ]
        );
    }
}
