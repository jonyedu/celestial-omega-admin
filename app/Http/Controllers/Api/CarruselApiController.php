<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Carrusel\Carrusel;
use Exception;
use Illuminate\Http\Request;

class CarruselApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $carruseles = Carrusel::select(
                'carrusel_id',
                'src',
            )
                ->where('status', true)
                ->get();
            return response()->json(['carruseles' => $carruseles, 'count' => $carruseles->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GaleriaController=>index(): ' . $e->getMessage()], 500);
        }
    }
}
