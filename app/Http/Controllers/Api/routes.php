<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
}
*/

Route::group(['prefix' => 'api'], function() {

	Route::group(['prefix' => 'posts'], function() {

		Route::post('bulk/delete', 'PostController@bulkDelete');
		Route::post('bulk/trash', 'PostController@bulkTrash');
		Route::post('bulk/publish', 'PostController@bulkPublish');
		Route::post('bulk/unpublish', 'PostController@bulkUnpublush');

		Route::get('{id}/comments', 'PostController@comments');
		Route::get('{id}/feature', 'PostController@feature');
		Route::get('{id}/unfeature', 'PostController@unfeature');
		Route::get('featured', 'PostController@featuredPosts');
		Route::get('recent', 'PostController@recentPosts');
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

	Route::group(['prefix' => 'categories'], function() {

		Route::put('{id}', 'CategoryController@store');
		Route::get('{id}', 'CategoryController@index');
		Route::post('/', 'CategoryController@store');
		Route::get('/', 'CategoryController@index');
	});

	Route::group(['prefix' => 'tags'], function() {

		Route::get('{id}', 'TagController@index');
		Route::post('/', 'TagController@store');
		Route::get('/', 'TagController@index');
	});

	Route::group(['prefix' => 'media'], function() {

		Route::any('upload', 'MediaController@upload');
		Route::get('{id}', 'MediaController@index');
		Route::delete('{id}', 'MediaController@delete');
		Route::get('/', 'MediaController@index');
	});

	Route::group(['prefix' => 'newsletter'], function() {

		Route::post('subscribe', 'NewsletterController@subscribe');
	});
});
