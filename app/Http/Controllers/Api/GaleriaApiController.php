<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Galeria\Galeria;
use Exception;

class GaleriaApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $galerias = Galeria::select(
                'galeria_id',
                'titulo',
                'sub_titulo',
                'flex',
                'src',
            )
                ->where('status', true)
                ->paginate(8);
            return response()->json(['galerias' => $galerias, 'count' => $galerias->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GaleriaController=>index(): ' . $e->getMessage()], 500);
        }
    }
}
