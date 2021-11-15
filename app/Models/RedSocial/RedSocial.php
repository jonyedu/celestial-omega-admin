<?php

namespace App\Models\RedSocial;

use Illuminate\Database\Eloquent\Model;

class RedSocial extends Model
{
    protected $table = 'tb_red_social';
    protected $primaryKey = 'red_social_id';
    protected $casts = [
        'status' => 'boolean',
    ];
    protected $fillable = [
        'red_social_id', 
        'descripcion', 
        'icono', 
        'color', 
        'url', 
        'usu_update',
        'created_at',
        'updated_at',
        'ip_visitor',
        'status'
    ];
}
