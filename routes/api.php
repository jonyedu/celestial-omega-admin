<?php

use App\Models\Seguridad\Empresa;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

/* Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('/get-config-empresa', function (Request $request) {
    return Empresa::select('url')->where('status', true)->orderBy('id', 'desc')->first();
}); */

Route::get('galeria', 'Galeria\GaleriaController@index');
Route::get('evento', 'Evento\EventoController@getEventForDateAndTime');
Route::get('programa', 'Programa\ProgramaController@getProgramForDateAndTime');
Route::get('get-imagen-por-proceso/{tipo_proceso}/{id}', 'Imagen\ImagenController@getImagenPorPoceso');
Route::get('live', 'Live\LiveController@getLiveApi');
Route::get('red_social', 'RedSocial\RedSocialController@index');
Route::get('genero_musical', 'GeneroMusical\GeneroMusicalController@index');
Route::get('musica', 'Musica\MusicaController@index');
Route::get('get_music_for_genre/{genero_musical_id}', 'Musica\MusicaController@getMusicForGenre');

