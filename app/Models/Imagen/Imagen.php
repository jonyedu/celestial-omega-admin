<?php

namespace App\Models\Imagen;

use Illuminate\Database\Eloquent\Model;

class Imagen extends Model
{
    protected $table = 'tb_imagen';
    protected $primaryKey = 'imagen_id';
    protected $casts = [
        'status' => 'boolean',
        'created_at' => 'datetime:m',
    ];
    protected $fillable = [
        'imagen_id',
        'galeria_id',
        'evento_id',
        'programa_id',
        'tipo_proceso',
        'src',
        'usu_created',
        'usu_update',
        'created_at',
        'updated_at',
        'ip_visitor',
        'status'
    ];
}
