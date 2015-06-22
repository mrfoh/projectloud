<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
}
*/

Route::group(['prefix' => 'api'], function() {

	Route::get('test', 'TestController@index');

	Route::group(['prefix' => 'posts'], function() {

		Route::get('{id}/comments', 'PostController@comments');
		Route::put('{id}', 'PostController@store');
		Route::get('{id}', 'PostController@index');
		Route::post('/', 'PostController@store');
		Route::get('/', 'PostController@index');
	});

	Route::group(['prefix' => 'comments'], function() {

		Route::get('{id}/replies', 'CommentController@replies');
		Route::post('{id}/reply', 'CommentController@reply');
		Route::get('{id}', 'CommentController@index');
		Route::post('/', 'CommentController@store');
		Route::get('/', 'CommentController@index');
	});
});
