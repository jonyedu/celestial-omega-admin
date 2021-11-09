<?php

namespace App\Models\GeneroMusical;

use Illuminate\Database\Eloquent\Model;

class GeneroMusical extends Model
{
    protected $table = 'tb_genero_musical';
    protected $primaryKey = 'genero_musical_id';
    protected $casts = [
        'status' => 'boolean',
    ];
    protected $fillable = [
        'genero_musical_id',
        'descripcion',
        'abreviatura',
        'usu_created',
        'usu_update',
        'created_at',
        'updated_at',
        'ip_visitor',
        'status'
    ];
}
