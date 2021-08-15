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

use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Route;

$prefijo = config('global.router_prefix');

Auth::routes();

Route::get($prefijo . '/{any}', 'HomeController@index')->where('any', '.*');
Route::get($prefijo, 'HomeController@index')->where('any', '.*');

Route::get('/', function () {
    return redirect()->route('login');
});
