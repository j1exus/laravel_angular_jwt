<?php

/*
|--------------------------------------------------------------------------
| Application Routes
|--------------------------------------------------------------------------
|
| Here is where you can register all of the routes for an application.
| It's a breeze. Simply tell Laravel the URIs it should respond to
| and give it the controller to call when that URI is requested.
|
*/

Route::group(['prefix' => 'api'], function () {
    Route::post('auth/register', 'AuthenticateController@register');
    Route::post('auth/login', 'AuthenticateController@authenticate');
    Route::post('auth/verify', 'AuthenticateController@verify');
    //get user info
    Route::get('authenticate/user', 'AuthenticateController@getAuthenticatedUser');
    //password reset
    Route::post('auth/reset', 'Auth\PasswordController@postEmail');
    Route::post('auth/resetconfirm', 'Auth\PasswordController@postReset');
});

Route::any('{undefinedRoute}', 'AngularController@serveApp')->where('undefinedRoute', '([A-z\d-\/_.]+)?');