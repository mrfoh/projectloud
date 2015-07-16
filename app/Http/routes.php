<?php

use Bps\Data\Repositories\Categories;
/*
|--------------------------------------------------------------------------
| Frontend Routes
|--------------------------------------------------------------------------
*/


Route::post('accounts/login', 'AuthController@login');
Route::get('accounts/logout', 'AuthController@logout');

Route::get('/', function(Categories $categories) {
	$categories->skipPresenter();
	$data['categories'] = $categories->all()->toArray();

	return view('site', $data);
});

