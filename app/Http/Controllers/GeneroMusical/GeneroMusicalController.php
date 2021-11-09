<?php

namespace App\Http\Controllers\GeneroMusical;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\GeneroMusical\GeneroMusical;
use Exception;
use Illuminate\Support\Facades\Auth;

class GeneroMusicalController extends Controller
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
                'descripcion',
                'abreviatura',
            )
                ->where('status', true)
                ->get();
            return response()->json(['generos_musicales' => $generos_musicales, 'count' => $generos_musicales->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GeneroMusicalController=>index(): ' . $e->getMessage()], 500);
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
            GeneroMusical::create([
                'genero_musical_id' => $request->genero_musical_id,
                'descripcion' => $request->descripcion,
                'abreviatura' => $request->abreviatura,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al guardar genero_musical.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GeneroMusicalController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($genero_musical_id)
    {
        try {
            $genero_musical = GeneroMusical::where('status', true)->where('genero_musical_id', $genero_musical_id)->first();
            return response()->json(['genero_musical' => $genero_musical]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GeneroMusicalController=>show(): ' . $e->getMessage()], 500);
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
    public function update(Request $request, $genero_musical_id)
    {
        try {
            $user = Auth::user();
            GeneroMusical::where('genero_musical_id', $genero_musical_id)->where('status', true)->update([
                'genero_musical_id' => $request->genero_musical_id,
                'descripcion' => $request->descripcion,
                'abreviatura' => $request->abreviatura,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al actualizar Genero Musica.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GeneroMusicalController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($genero_musical_id)
    {
        try {
            GeneroMusical::where('genero_musical_id', $genero_musical_id)->where('status', true)->delete();
            return response()->json(['msj' => 'Exito al eliminar Genero Musica.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'GeneroMusicalController=>store(): ' . $e->getMessage()], 500);
        }
    }
}
