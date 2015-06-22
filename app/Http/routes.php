<?php

/*
|--------------------------------------------------------------------------
| Frontend Routes
|--------------------------------------------------------------------------
*/

Route::post('accounts/login', 'AuthController@login');
Route::get('accounts/logout', 'AuthController@logout');

Route::get('/', 'WelcomeController@index');
