<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\RedSocial\RedSocial;
use Exception;

class RedSocialApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $redes_sociales = RedSocial::select(
                'red_social_id',
                'descripcion',
                'icono',
                'color',
                'url',
            )
                ->where('status', true)
                ->get();
            return response()->json(['redes_sociales' => $redes_sociales, 'count' => $redes_sociales->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'RedSocialController=>index(): ' . $e->getMessage()], 500);
        }
    }
}
