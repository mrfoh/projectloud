<?php

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
}
*/

Route::group(['prefix' => 'admin'], function() {
	
	Route::get('auth', 'AuthController@showlogin');
	Route::get('test', 'AppController@test');
	Route::get('/', 'AppController@index');
});
