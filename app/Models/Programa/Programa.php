<?php

namespace App\Models\Programa;

use App\Models\Imagen\Imagen;
use Illuminate\Database\Eloquent\Model;

class Programa extends Model
{
    protected $table = 'tb_programa';
    protected $primaryKey = 'programa_id';
    protected $fillable = [
        'programa_id', 
        'fecha', 
        'hora_inicio', 
        'hora_fin',
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
        return $this->hasMany(Imagen::class, 'programa_id', 'programa_id')
            ->where('status', '=', true)
            ->where('tipo_proceso', 3);
    }
}
