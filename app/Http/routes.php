<?php

use Bps\Data\Repositories\Categories;

/*
|--------------------------------------------------------------------------
| Frontend Routes
|--------------------------------------------------------------------------
*/

Route::get('account/activate/{token}/{id}', 'AuthController@activate');
Route::post('auth/oauth', 'AuthController@authOauth');
Route::post('auth/signup', 'AuthController@signup');
Route::post('auth/login', 'AuthController@login');
Route::post('auth/refresh', 'AuthController@refresh');

Route::post('queue/receive', function()
{
    return Queue::marshal();
});

Route::get('/', function(Categories $categories) {
	$categories->skipPresenter();
	$data['categories'] = $categories->all()->toArray();

	return view('site', $data);
});

