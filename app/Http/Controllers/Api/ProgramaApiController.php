<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Programa\Programa;
use Carbon\Carbon;
use Exception;

class ProgramaApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getProgramForDateAndTime()
    {
        try {
            $programas = Programa::select(
                'programa_id',
                'fecha',
                'hora_inicio',
                'hora_fin',
                'titulo',
                'sub_titulo',
                'flex',
                'src',
            )
                ->whereDate('fecha', '>=', Carbon::now()->format('Y-m-d'))
                ->where('status', true)
                ->paginate(8);
            return response()->json(['count' => $programas->count(), 'programas' => $programas,]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'ProgramaController=>index(): ' . $e->getMessage()], 500);
        }
    }
}
