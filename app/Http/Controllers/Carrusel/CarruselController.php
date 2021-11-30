<?php

namespace App\Http\Controllers\Carrusel;

use App\Http\Controllers\Controller;
use App\Models\Carrusel\Carrusel;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class CarruselController extends Controller
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
        //return response()->json(['request' => $request->all()],500);
        try {
            $user = Auth::user();
            Carrusel::create([
                'src' => $request->src,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al guardar carrusel.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'AlbumCabeceraController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($carrusel_id)
    {
        try {
            $carrusel = Carrusel::where('status', true)->where('carrusel_id', $carrusel_id)->first();
            return response()->json(['carrusel' => $carrusel]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'AlbumCabeceraController=>show(): ' . $e->getMessage()], 500);
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
    public function update(Request $request, $carrusel_id)
    {
        try {
            $user = Auth::user();
            Carrusel::where('carrusel_id', $carrusel_id)->where('status', true)->update([
                'src' => $request->src,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al actualizar carrusel.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'AlbumCabeceraController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($carrusel_id)
    {
        try {
            Carrusel::where('carrusel_id', $carrusel_id)->where('status', true)->delete();
            return response()->json(['msj' => 'Exito al eliminar carrusel.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'AlbumCabeceraController=>store(): ' . $e->getMessage()], 500);
        }
    }
}
