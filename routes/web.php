<?php

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

use App\Http\Controllers\Dashboard\DashboardController;
use App\Http\Controllers\Evento\EventoController;
use App\Http\Controllers\Galeria\GaleriaController;
use App\Http\Controllers\Imagen\ImagenController;
use App\Http\Controllers\Live\LiveController;
use App\Http\Controllers\Programa\ProgramaController;
use App\Http\Controllers\RedSocial\RedSocialController;
use App\Http\Controllers\GeneroMusical\GeneroMusicalController;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\Musica\MusicaController;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

$prefijo = config('global.router_prefix');

Auth::routes();

Route::get($prefijo . '/{any}', [HomeController::class, 'index'])->where('any', '.*');
Route::get($prefijo, [HomeController::class, 'index'])->where('any', '.*');

Route::get('/', function () {
    return redirect()->route('login');
});

Route::group(['middleware' => ['auth:web'], 'verified'], function () {
    Route::get('/galeria/get-galeria-paginacion', [GaleriaController::class, 'getGaleriaPaginacion']);
    Route::get('/imagen/get-imagen-por-proceso/{tipo_proceso}/{id}', [ImagenController::class, 'getImagenPorPoceso']);
    Route::get('/dashboard/get-dashboard', [DashboardController::class, 'getDashboard']);

    Route::resources([
        'galeria' => 'Galeria\GaleriaController',
        'evento' => 'Evento\EventoController',
        'programa' => 'Programa\ProgramaController',
        'imagen' => 'Imagen\ImagenController',
        'live' =>  'Live\LiveController',
        'red_social' => 'RedSocial\RedSocialController',
        'genero_musical' => 'GeneroMusical\GeneroMusicalController',
        'musica' => 'Musica\MusicaController',
    ]);
});
