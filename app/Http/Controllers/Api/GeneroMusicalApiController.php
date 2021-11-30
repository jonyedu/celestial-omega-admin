<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\GeneroMusical\GeneroMusical;
use Exception;

class GeneroMusicalApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $generos_musicales = GeneroMusical::select(
                'genero_musical_id',
                'descripcion as genero_musical',
                'abreviatura',
            )
                ->where('status', true)
                ->get();
            return response()->json(['generos_musicales' => $generos_musicales, 'count' => $generos_musicales->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GeneroMusicalController=>index(): ' . $e->getMessage()], 500);
        }
    }
}
