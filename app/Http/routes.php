<?php

use Bps\Data\Repositories\Categories;

/*
|--------------------------------------------------------------------------
| Frontend Routes
|--------------------------------------------------------------------------
*/

Route::get('account/activate/{token}/{id}', 'AuthController@activate');
Route::put('account/profile', 'AccountController@profile');
Route::post('account/change-password', 'AccountController@password');
Route::put('account/settings', 'AccountController@settings');
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
	
	if(Cache::has('categories')) {
		$cats = Cache::get('categories');
	}
	else {
		$cats = Cache::remember('categories', 120, function() use ($categories)
		{
		    return $categories->all()->toArray();
		});
	}
	
	$data['categories'] = $cats;
	return view('site', $data);
});

