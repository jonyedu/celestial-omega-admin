<?php

namespace App\Models\Galeria;

use App\Models\Imagen\Imagen;
use Illuminate\Database\Eloquent\Model;

class Galeria extends Model
{
    protected $table = 'tb_galeria';
    protected $primaryKey = 'galeria_id';
    protected $casts = [
        'status' => 'boolean',
    ];
    protected $fillable = [
        'galeria_id',
        'titulo',
        'sub_titulo',
        'flex',
        'src',
        'usu_created',
        'usu_update',
        'created_at',
        'updated_at',
        'ip_visitor',
        'status'
    ];

    public function imagenes()
    {
        return $this->hasMany(Imagen::class, 'galeria_id', 'galeria_id')
            ->where('status', '=', true)
            ->where('tipo_proceso', 1);
    }
    
}
