<?php

namespace App\Http\Controllers\Programa;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Imagen\Imagen;
use App\Models\Programa\Programa;
use Carbon\Carbon;
use Exception;
use Illuminate\Support\Facades\Auth;

class ProgramaController extends Controller
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
                //->whereTime('hora_inicio', '<=', Carbon::now()->format('h:m:s'))
                //->whereTime('hora_fin', '<=', Carbon::now()->format('H:m:s'))
                ->where('status', true)
                ->get();
            return response()->json(['count' => $programas->count(), 'programas' => $programas,]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'ProgramaController=>index(): ' . $e->getMessage()], 500);
        }
    }

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
                //->with('imagenes:imagen_id,programa_id,src,status')
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
            $programa = Programa::create([
                'fecha' => $request->fecha,
                'hora_inicio' => $request->hora_inicio,
                'hora_fin' => $request->hora_fin,
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
                    'programa_id' => 0,
                    'programa_id' => $programa->programa_id,
                    'tipo_proceso' => 1,
                    'src' => $imagen['src'],
                    'usu_created' => $user->id,
                    'usu_update' => $user->id,
                    'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                    'status' => true,
                ]);
            }
            return response()->json(['msj' => 'Exito al guardar programa.']);
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
    public function show($programa_id)
    {
        try {
            $programa = Programa::where('status', true)->where('programa_id', $programa_id)->first();
            return response()->json(['programa' => $programa]);
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
    public function update(Request $request, $programa_id)
    {
        try {
            $user = Auth::user();
            Programa::where('programa_id', $programa_id)->where('status', true)->update([
                'fecha' => $request->fecha,
                'hora_inicio' => $request->hora_inicio,
                'hora_fin' => $request->hora_fin,
                'titulo' => $request->titulo,
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
                        'programa_id' => 0,
                        'programa_id' => $programa_id,
                        'tipo_proceso' => 3,
                        'src' => $imagen['src'],
                        'usu_created' => $user->id,
                        'usu_update' => $user->id,
                        'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                        'status' => true,
                    ]
                );
            }
            return response()->json(['msj' => 'Exito al actualizar programa.']);
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
    public function destroy($programa_id)
    {
        try {
            $user = Auth::user();
            Programa::where('programa_id', $programa_id)->where('status', true)->delete();
            Imagen::where('programa_id', $programa_id)->delete();
            return response()->json(['msj' => 'Exito al eliminar programa.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'ProgramaController=>store(): ' . $e->getMessage()], 500);
        }
    }
}
