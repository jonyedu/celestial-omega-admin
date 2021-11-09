<?php

namespace App\Http\Controllers\RedSocial;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;
use App\Models\RedSocial\RedSocial;
use Exception;
use Illuminate\Support\Facades\Auth;

class RedSocialController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        try {
            $redes_sociales = RedSocial::select(
                'red_social_id',
                'descripcion',
                'icono',
                'color'
            )
                ->where('status', true)
                ->get();
            return response()->json(['redes_sociales' => $redes_sociales, 'count' => $redes_sociales->count()]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'RedSocialController=>index(): ' . $e->getMessage()], 500);
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
            RedSocial::create([
                'descripcion' => $request->descripcion,
                'icono' => $request->icono,
                'color' => $request->color,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al guardar red social.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'RedSocialController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($red_social_id)
    {
        try {
            $red_social = RedSocial::where('status', true)->where('red_social_id', $red_social_id)->first();
            return response()->json(['red_social' => $red_social]);
        } catch (Exception $e) {
            return response()->json(['msj' => 'RedSocialController=>show(): ' . $e->getMessage()], 500);
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
    public function update(Request $request, $red_social_id)
    {
        try {
            $user = Auth::user();
            RedSocial::where('red_social_id', $red_social_id)->where('status', true)->update([
                'descripcion' => $request->descripcion,
                'icono' => $request->icono,
                'color' => $request->color,
                'usu_created' => $user->id,
                'usu_update' => $user->id,
                'ip_visitor' => $_SERVER["REMOTE_ADDR"],
                'status' => true,
            ]);
            return response()->json(['msj' => 'Exito al actualizar red social.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'RedSocialController=>store(): ' . $e->getMessage()], 500);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($red_social_id)
    {
        try {
            RedSocial::where('red_social_id', $red_social_id)->where('status', true)->delete();
            return response()->json(['msj' => 'Exito al eliminar red social.']);
        } catch (Exception $e) {
            return response()->json(['msj' => 'RedSocialController=>store(): ' . $e->getMessage()], 500);
        }
    }
}
