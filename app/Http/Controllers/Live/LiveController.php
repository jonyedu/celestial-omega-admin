<?php

namespace App\Http\Controllers\Live;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\Live\Live;
use App\Models\RedSocial\RedSocial;
use Exception;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\DB;

class LiveController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $lives = Live::from('tb_live as liv')
                ->join('tb_red_social as red_soc', 'liv.red_social_id', '=', 'red_soc.red_social_id')
                ->select(
                    'red_soc.descripcion as red_social',
                    'icono',
                    'live_id',
                    'liv.red_social_id',
                    'fecha',
                    'color',
                    'hora',
                    'nombre',
                    'liv.descripcion',
                    'url'
                )
                ->where('liv.status', true)
                ->get();
            return response()->json(['lives' => $lives, 'count' => $lives->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'LiveController=>index(): ' . $e->getMessage()], 500);
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
            Live::create([
                'red_social_id' => $request->red_social_id,
                'fecha' => $request->fecha,
                'hora' => $request->hora,
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
                'url' => $request->url,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al guardar live.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'LiveController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($live_id)
    {
        try {
            $live = Live::where('status', true)->where('live_id', $live_id)->first();
            return response()->json(['live' => $live]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'LiveController=>show(): ' . $e->getMessage()], 500);
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
    public function update(Request $request, $live_id)
    {
        try {
            $user = Auth::user();
            Live::where('live_id', $live_id)->where('status', true)->update([
                'red_social_id' => $request->red_social_id,
                'fecha' => $request->fecha,
                'hora' => $request->hora,
                'nombre' => $request->nombre,
                'descripcion' => $request->descripcion,
                'url' => $request->url,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al actualizar live.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'LiveController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($live_id)
    {
        try {
            Live::where('live_id', $live_id)->where('status', true)->delete();
            return response()->json(['msj' => 'Exito al eliminar live.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'LiveController=>store(): ' . $e->getMessage()], 500);
        }
    }
}
