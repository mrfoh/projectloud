<?php

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
}
*/

Route::group(['prefix' => 'admin'], function() {
	
	Route::post('auth', 'AuthController@index');
	Route::get('/', 'AppController@index');
});
