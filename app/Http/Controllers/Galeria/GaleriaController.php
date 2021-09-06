<?php

namespace App\Http\Controllers\Galeria;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Galeria\Galeria;
use App\Models\Imagen\Imagen;
use Exception;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Support\Facades\Auth;

class GaleriaController extends Controller
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
                ->with('imagenes:imagen_id,galeria_id,src')
                ->where('status', true)
                ->get();
            return response()->json(['galerias' => $galerias, 'count' => $galerias->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GaleriaController=>index(): ' . $e->getMessage()], 500);
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
            $galeria = Galeria::create([
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
                    'galeria_id' => $galeria->galeria_id,
                    'evento_id' => 0,
                    'programa_id' => 0,
                    'tipo_proceso' => 1,
                    'src' => $imagen['src'],
                    'usu_created' => $user->id,
                    'usu_update' => $user->id,
                    'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                    'status' => true,
                ]);
            }
            return response()->json(['msj' => 'Exito al guardar galeria.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GaleriaController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($galeria_id)
    {
        try {
            $galeria = Galeria::where('status', true)->where('galeria_id', $galeria_id)->first();
            return response()->json(['galeria' => $galeria]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GaleriaController=>show(): ' . $e->getMessage()], 500);
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
    public function update(Request $request, $galeria_id)
    {
        try {
            $user = Auth::user();
            Galeria::where('galeria_id', $galeria_id)->where('status', true)->update([
                'titulo' => $request->titulo,
                'sub_titulo' => $request->sub_titulo,
                'flex' => $request->flex,
                'src' => $request->src,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
            ]);
            //return response()->json(['galeria' => $galeria],500);
            //aca elimino todas
            Imagen::where('galeria_id', $galeria_id)->where('status', true)->delete();
            foreach ($request->imagenes as $key => $imagen) {
                Imagen::create([
                    'galeria_id' =>$galeria_id,
                    'evento_id' => 0,
                    'programa_id' => 0,
                    'tipo_proceso' => 1,
                    'src' => $imagen['src'],
                    'usu_created' => $user->id,
                    'usu_update' => $user->id,
                    'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                    'status' => true,
                ]);
            }
            return response()->json(['msj' => 'Exito al actualizar galeria.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GaleriaController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($galeria_id)
    {
        try {
            $user = Auth::user();
            Galeria::where('galeria_id', $galeria_id)->where('status', true)->update([
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => false
            ]);
            return response()->json(['msj' => 'Exito al eliminar galeria.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GaleriaController=>store(): ' . $e->getMessage()], 500);
        }
    }
}
