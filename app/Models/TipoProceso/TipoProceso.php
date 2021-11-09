<?php

namespace App\Models\TipoProceso;

use Illuminate\Database\Eloquent\Model;

class TipoProceso extends Model
{
    protected $table = 'tb_tipo_proceso';
    protected $primaryKey = 'tipo_proceso_id';
    protected $casts = [
        'status' => 'boolean',
    ];
    protected $fillable = [
        'tipo_proceso_id', 
        'descripcion', 
        'abreviatura', 
        'usu_update',
        'created_at',
        'updated_at',
        'ip_visitor',
        'status'
    ];
}
