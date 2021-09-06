<?php

namespace App\Models\Evento;

use App\Models\Imagen\Imagen;
use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $table = 'tb_evento';
    protected $fillable = [
        'evento_id',
        'fecha',
        'hora',
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
        return $this->hasMany(Imagen::class, 'evento_id', 'evento_id')
            ->where('status', '=', true)
            ->where('tipo_proceso', 2);
    }
}
