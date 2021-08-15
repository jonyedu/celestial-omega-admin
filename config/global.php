<?php

use App\Models\Seguridad\Empresa;

$config = Empresa::where('status', true)->orderBy('id', 'desc')->first();

return [

    'router_prefix' => $config!=null?$config->url:'/home',
];
