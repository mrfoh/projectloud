<?php

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
}
*/

Route::group(['prefix' => 'api'], function() {

	Route::group(['prefix' => 'analytics'], function() {
		Route::get('trendingposts', 'AnalyticsController@trendingPosts');
	});

	Route::group(['prefix' => 'posts'], function() {

		Route::post('bulk/delete', 'PostController@bulkDelete');
		Route::post('bulk/trash', 'PostController@bulkTrash');
		Route::post('bulk/publish', 'PostController@bulkPublish');
		Route::post('bulk/unpublish', 'PostController@bulkUnpublush');

		Route::get('{id}/related', 'PostController@related');
		Route::get('{id}/comments', 'PostController@comments');
		Route::get('{id}/feature', 'PostController@feature');
		Route::get('{id}/unfeature', 'PostController@unfeature');
		Route::get('by/{id}', 'PostController@by');
		Route::get('tagged/{slug}', 'PostController@tagged');
		Route::get('featured', 'PostController@featuredPosts');
		Route::get('recent', 'PostController@recentPosts');
		Route::put('{id}', 'PostController@store');
		Route::get('{id}', 'PostController@index');
		Route::post('/', 'PostController@store');
		Route::get('/', 'PostController@index');
	});

	Route::group(['prefix' => 'comments'], function() {

		Route::post('{id}/report', 'CommentController@report');
		Route::get('{id}/replies', 'CommentController@replies');
		Route::post('{id}/reply', 'CommentController@reply');
		Route::get('{id}/approve', 'CommentController@approve');
		Route::get('{id}/unapprove', 'CommentController@unapprove');
		Route::delete('{id}', 'CommentController@delete');
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
		Route::get('user', 'MediaController@byUser');
		Route::get('{id}', 'MediaController@index');
		Route::delete('{id}', 'MediaController@delete');
		Route::get('/', 'MediaController@index');
	});

	Route::group(['prefix' => 'reports'], function() {

		Route::get('{id}/resolve', 'ReportController@resolve');
		Route::delete('{id}', 'ReportController@delete');
		Route::get('{id}', 'ReportController@index');
		Route::get('/', 'ReportController@index');
	});

	Route::group(['prefix' => 'newsletter'], function() {

		Route::post('subscribe', 'NewsletterController@subscribe');
	});
});
