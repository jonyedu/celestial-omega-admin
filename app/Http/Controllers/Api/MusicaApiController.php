<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Musica\Musica;
use Exception;

class MusicaApiController extends Controller
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
     * Display the specified resource.
     *
     * @param  int  $genero_musical_id
     * @return \Illuminate\Http\Response
     */
    public function getMusicForGenre($genero_musical_id)
    {
        try {
            $musica = Musica::where('status', true)->where('genero_musical_id', $genero_musical_id)->get();
            return response()->json(['musica' => $musica]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'MusicaController=>show(): ' . $e->getMessage()], 500);
        }
    }
}
