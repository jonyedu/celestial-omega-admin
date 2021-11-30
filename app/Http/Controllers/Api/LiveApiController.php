<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Live\Live;
use Exception;

class LiveApiController extends Controller
{
    //Para la api
    public function getLiveApi()
    {
        try {
            $lives = Live::from('tb_live as liv')
                ->join('tb_red_social as red_soc', 'liv.red_social_id', '=', 'red_soc.red_social_id')
                ->select(
                    'red_soc.descripcion as red_social',
                    'icono',
                    'live_id',
                    'liv.red_social_id',
                    'fecha',
                    'color',
                    'hora',
                    'nombre',
                    'liv.descripcion',
                    'liv.url'
                )
                ->where('liv.status', true)
                ->first();
            return response()->json(['lives' => $lives]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'LiveController=>index(): ' . $e->getMessage()], 500);
        }
    }
}
