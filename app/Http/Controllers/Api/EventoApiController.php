<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Evento\Evento;
use Carbon\Carbon;
use Exception;

class EventoApiController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function getEventForDateAndTime()
    {
        try {
            $eventos = Evento::select(
                'evento_id',
                'fecha',
                'hora',
                'titulo',
                'sub_titulo',
                'flex',
                'src',
            )
                ->whereDate('fecha', '>=', Carbon::now()->format('Y-m-d'))
                ->where('status', true)
                ->paginate(8);
            return response()->json(['count' => $eventos->count(), 'eventos' => $eventos]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'EventoController=>index(): ' . $e->getMessage()], 500);
        }
    }
}
