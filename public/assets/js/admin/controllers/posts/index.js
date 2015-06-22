app.controller('PostsCtrl', ['$scope', 'posts', '$filter', 'toaster', '$log', '$document', function($scope, posts, $filter, toaster, $log, $document) {
	//set view title
	$document[0].title = "Posts - BPS Admin";
	//posts
	$scope.posts = [];
	//table columns
	$scope.columns = [
		{name: "Title"},
		{name: "Category"}
		{name: "Status"},
		{name: "Created At"},
		{name: "Updated At"}
	];
}]);