<?php

/*
|--------------------------------------------------------------------------
| Admin Routes
|--------------------------------------------------------------------------
}
*/

Route::group(['prefix' => 'admin'], function() {

	Route::get('/', 'AppController@index');
});
