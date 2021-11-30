<?php

use App\Http\Controllers\Api\CarruselApiController;
use App\Http\Controllers\Api\EventoApiController;
use App\Http\Controllers\Api\GaleriaApiController;
use App\Http\Controllers\Api\GeneroMusicalApiController;
use App\Http\Controllers\Api\ImagenApiController;
use App\Http\Controllers\Api\LiveApiController;
use App\Http\Controllers\Api\MusicaApiController;
use App\Http\Controllers\Api\ProgramaApiController;
use App\Http\Controllers\Api\RedSocialApiController;
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

Route::get('galeria', [GaleriaApiController::class, 'index']);
Route::get('evento', [EventoApiController::class, 'getEventForDateAndTime']);
Route::get('programa', [ProgramaApiController::class, 'getProgramForDateAndTime']);
Route::get('get-imagen-por-proceso/{tipo_proceso}/{id}', [ImagenApiController::class, 'getImagenPorPoceso']);
Route::get('live', [LiveApiController::class, 'getLiveApi']);
Route::get('red_social', [RedSocialApiController::class, 'index']);
Route::get('genero_musical', [GeneroMusicalApiController::class, 'index']);
Route::get('musica', [MusicaApiController::class, 'index']);
Route::get('get_music_for_genre/{genero_musical_id}', [MusicaApiController::class, 'getMusicForGenre']);
Route::get('carrusel', [CarruselApiController::class, 'index']);
