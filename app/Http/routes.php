<?php

use Bps\Data\Repositories\Categories;
/*
|--------------------------------------------------------------------------
| Frontend Routes
|--------------------------------------------------------------------------
*/
Route::post('auth/fb', 'AuthController@authFb');
Route::post('auth/signup', 'AuthController@signup');
Route::post('auth/login', 'AuthController@login');
Route::post('auth/refresh', 'AuthController@refresh');

Route::get('/', function(Categories $categories) {
	$categories->skipPresenter();
	$data['categories'] = $categories->all()->toArray();

	return view('site', $data);
});

