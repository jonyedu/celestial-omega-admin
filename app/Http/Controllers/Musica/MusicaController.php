<?php

namespace App\Http\Controllers\Musica;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Musica\Musica;
use Exception;
use Illuminate\Support\Facades\Auth;

class MusicaController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $musicas = Musica::from('tb_musica as mus')
                ->join('tb_genero_musical as gene_mus', 'mus.genero_musical_id', '=', 'gene_mus.genero_musical_id')
                ->select(
                    'musica_id',
                    'mus.genero_musical_id',
                    'gene_mus.descripcion as genero_musical',
                    'mus.descripcion',
                    'url',
                )
                ->where('mus.status', true)
                ->get();
            return response()->json(['musicas' => $musicas, 'count' => $musicas->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'MusicaController=>index(): ' . $e->getMessage()], 500);
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
            Musica::create([
                'genero_musical_id' => $request->genero_musical_id,
                'descripcion' => $request->descripcion,
                'url' => $request->url,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al guardar Musica.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'MusicaController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($musica_id)
    {
        try {
            $musica = Musica::where('status', true)->where('musica_id', $musica_id)->first();
            return response()->json(['musica' => $musica]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'MusicaController=>show(): ' . $e->getMessage()], 500);
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
    public function update(Request $request, $musica_id)
    {
        try {
            $user = Auth::user();
            Musica::where('musica_id', $musica_id)->where('status', true)->update([
                'genero_musical_id' => $request->genero_musical_id,
                'descripcion' => $request->descripcion,
                'url' => $request->url,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al actualizar Genero Musica.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'MusicaController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($musica_id)
    {
        try {
            Musica::where('musica_id', $musica_id)->where('status', true)->delete();
            return response()->json(['msj' => 'Exito al eliminar Genero Musica.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'MusicaController=>store(): ' . $e->getMessage()], 500);
        }
    }
}
