<?php

namespace App\Http\Controllers\Programa;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Programa\Programa;
use Exception;
use Illuminate\Support\Facades\Auth;

class ProgramaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
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
                ->with('imagenes:imagen_id,programa_id,src')
                ->where('status', true)
                ->get();
            return response()->json(['programas' => $programas, 'count' => $programas->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'ProgramaController=>index(): ' . $e->getMessage()], 500);
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
            Programa::create([
                'titulo' => $request->titulo,
                'sub_titulo' => $request->sub_titulo,
                'flex' => $request->flex,
                'src' => $request->src,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al guardar evento.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'ProgramaController=>store(): ' . $e->getMessage()], 500);
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
            $evento = Programa::where('status', true)->where('evento_id', $evento_id)->first();
            return response()->json(['evento' => $evento]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'ProgramaController=>show(): ' . $e->getMessage()], 500);
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
            Programa::where('evento_id', $evento_id)->where('status', true)->update([
                'titulo' => $request->titulo,
                'sub_titulo' => $request->sub_titulo,
                'flex' => $request->flex,
                'src' => $request->src,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
            ]);
            return response()->json(['msj' => 'Exito al actualizar evento.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'ProgramaController=>store(): ' . $e->getMessage()], 500);
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
            $user = Auth::user();
            Programa::where('evento_id', $evento_id)->where('status', true)->update([
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => false
            ]);
            return response()->json(['msj' => 'Exito al eliminar evento.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'ProgramaController=>store(): ' . $e->getMessage()], 500);
        }
    }
}
