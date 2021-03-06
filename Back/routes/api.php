<?php

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
Route::prefix('auth')->group( function () {
    Route::post('login', 'AuthController@login');
    Route::get('refresh', 'AuthController@refresh');
    Route::group(['middleware' => 'auth:api'], function(){
        Route::post('register', 'AuthController@register');
        Route::get('user', 'AuthController@user');
        Route::post('logout', 'AuthController@logout');
    });
});

Route::prefix('/')->group(function () {
    Route::post('/publicaciones', 'publicacionesController@store');
    Route::get('/publicaciones', 'publicacionesController@show');
});

Route::get('/test', 'testController@hola');
// Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
//     return $request->user();
// });
