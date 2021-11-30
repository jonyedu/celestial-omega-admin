<?php

namespace App\Models\Carrusel;

use Illuminate\Database\Eloquent\Model;

class Carrusel extends Model
{
    protected $table = 'tb_carrusel';
    protected $primaryKey = 'carrusel_id';
    protected $casts = [
        'status' => 'boolean',
    ];
    protected $fillable = [
        'carrusel_id',
        'src',
        'usu_created',
        'usu_update',
        'created_at',
        'updated_at',
        'ip_visitor',
        'status'
    ];
}
