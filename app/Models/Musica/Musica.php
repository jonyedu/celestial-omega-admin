<?php

namespace App\Models\Musica;

use Illuminate\Database\Eloquent\Model;

class Musica extends Model
{
    protected $table = 'tb_musica';
    protected $primaryKey = 'musica_id';
    protected $casts = [
        'status' => 'boolean',
    ];
    protected $fillable = [
        'musica_id',
        'genero_musical_id',
        'descripcion',
        'url',
        'usu_created',
        'usu_update',
        'created_at',
        'updated_at',
        'ip_visitor',
        'status'
    ];
}
