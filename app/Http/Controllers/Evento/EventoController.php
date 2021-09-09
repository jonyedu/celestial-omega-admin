<?php

namespace App\Http\Controllers\Evento;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Evento\Evento;
use App\Models\Imagen\Imagen;
use Exception;
use Illuminate\Support\Facades\Auth;

class EventoController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
                ->with('imagenes:imagen_id,evento_id,src,status')
                ->where('status', true)
                ->get();
            return response()->json(['eventos' => $eventos, 'count' => $eventos->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'EventoController=>index(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $user = Auth::user();
            $evento = Evento::create([
                'fecha' => $request->fecha,
                'hora' => $request->hora,
                'titulo' => $request->titulo,
                'sub_titulo' => $request->sub_titulo,
                'flex' => $request->flex,
                'src' => $request->src,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            foreach ($request->imagenes as $key => $imagen) {
                Imagen::create([
                    'galeria_id' => 0,
                    'evento_id' => $evento->evento_id,
                    'programa_id' => 0,
                    'tipo_proceso' => 2,
                    'src' => $imagen['src'],
                    'usu_created' => $user->id,
                    'usu_update' => $user->id,
                    'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                    'status' => true,
                ]);
            }
            return response()->json(['msj' => 'Exito al guardar evento.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'EventoController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($evento_id)
    {
        try {
            $evento = Evento::where('status', true)->where('evento_id', $evento_id)->first();
            return response()->json(['evento' => $evento]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'EventoController=>show(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $evento_id)
    {
        try {
            $user = Auth::user();
            Evento::where('evento_id', $evento_id)->where('status', true)->update([
                'fecha' => $request->fecha,
                'hora' => $request->hora,
                'titulo' => $request->titulo,
                'sub_titulo' => $request->sub_titulo,
                'flex' => $request->flex,
                'src' => $request->src,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
            ]);
            foreach ($request->imagenes as $key => $imagen) {
                if (isset($imagen['delete'])) {
                    if ($imagen['delete']) {
                        Imagen::where('imagen_id', $imagen['imagen_id'])->delete();
                    }
                }
                Imagen::updateOrCreate(
                    [
                        'imagen_id' => $imagen['imagen_id'],
                        'status' => true
                    ],
                    [
                        'galeria_id' => 0,
                        'evento_id' => $evento_id,
                        'programa_id' => 0,
                        'tipo_proceso' => 2,
                        'src' => $imagen['src'],
                        'usu_created' => $user->id,
                        'usu_update' => $user->id,
                        'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                        'status' => true,
                    ]
                );
            }
            return response()->json(['msj' => 'Exito al actualizar evento.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'EventoController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($evento_id)
    {
        try {
            Evento::where('evento_id', $evento_id)->where('status', true)->delete();
            Imagen::where('galeria_id', $evento_id)->delete();
            return response()->json(['msj' => 'Exito al eliminar evento.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'EventoController=>store(): ' . $e->getMessage()], 500);
        }
    }
}
