<?php

namespace App\Models\Seguridad;

use Illuminate\Database\Eloquent\Model;

class Empresa extends Model
{
    protected $table = 'config_empresa';
    protected $primaryKey = 'id';

    protected $fillable = [
        'id',
        'nombre',
        'direccion',
        'email',
        'ruc',
        'telefono',
        'logo',
        'url',
        'pais_id',
        'ciudad_id',
        'usu_created',
        'usu_update',
        'created_at',
        'updated_at',
        'ip_visitor',
        'status'
    ];
}
