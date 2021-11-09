<?php

namespace App\Models\Live;

use App\Models\RedSocial\RedSocial;
use Illuminate\Database\Eloquent\Model;

class Live extends Model
{
    protected $table = 'tb_live';
    protected $primaryKey = 'live_id';
    protected $casts = [
        'status' => 'boolean',
    ];
    protected $fillable = [
        'live_id',
        'red_social_id',
        'fecha',
        'hora',
        'nombre',
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
