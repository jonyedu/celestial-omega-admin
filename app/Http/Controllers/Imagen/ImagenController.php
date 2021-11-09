<?php

namespace App\Http\Controllers\Imagen;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Imagen\Imagen;
use Exception;
use Illuminate\Database\Eloquent\Builder;

class ImagenController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $tipo_proceso
     * @param  int  $id = $galeria_id || $evento_id || $programa_id 
     * @return \Illuminate\Http\Response
     */
    public function getImagenPorPoceso($tipo_proceso, $id)
    {
        try {
            $imagenes = Imagen::select(
                'imagen_id',
                'galeria_id',
                'evento_id',
                'programa_id',
                'tipo_proceso',
                'src',
                'status'
            )
                ->where('status', true)
                ->where('tipo_proceso', $tipo_proceso)
                ->where(function (Builder $query) use ($tipo_proceso, $id) {
                    if ($tipo_proceso == 1) {
                        $query->where('galeria_id', $id);
                    } else if ($tipo_proceso == 2) {
                        $query->where('evento_id', $id);
                    } else if ($tipo_proceso == 3) {
                        $query->where('programa_id', $id);
                    }
                })
                ->get();
            return response()->json(['count' => $imagenes->count(), 'imagenes' => $imagenes]);
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
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        //
    }
}
