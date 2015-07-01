app.controller('PostsCtrl', ['$scope', 'posts', '$filter', 'toaster', '$log', '$document',
	function($scope, posts , $filter, toaster, $log, $document) {
	//set view title
	$document[0].title = "Posts - BPS Admin";

	//posts
	$scope.posts = [];

	//total
	$scope.total;

	//Current page in pagination
	$scope.currentPage = 1;

	//Select all flag
	$scope.selectAll = false;

	//table columns
	$scope.columns = [
		{name: "Title"},
		{name: "Author"},
		{name: "Category"},
		{name: "Status"},
		{name: "Created At"},
		{name: "Updated At"}
	];

	//Bulk actions
	$scope.actions = [
		//{name: "Publish selected", value: "publish"},
		//{name: "Unpublish selected", value: "unpublish"},
		{name: "Trash selected", value: "trash"},
		{name: "Delete selected", value: "delete"}
	]
	//Selected action
	$scope.action;

	//Filters
	$scope.filters = [
		{name: "All posts", value: "all"},
		{name: "Unpublished posts", value: "unpublished"},
		{name: "Published posts", value: "published"},
		{name: "Draft posts", value: "draft"},
		{name: "Trashed posts", value: "trash"}
	];
	//Active filter
	$scope.activefilter = null;

	$scope.nodata = true;
	$scope.statusText;
	$scope.showStatus = true;

	$scope.onFilterSelect = function() {
		$scope.$emit('posts:filter');
	}

	$scope.checkAll = function() {
		if($scope.selectAll === false) {
        	$scope.selectAll = true;
        }
        else if($scope.selectAll === true) {
        	$scope.selectAll = false;
        }

        angular.forEach($scope.posts, function (item) {
            item.selected = $scope.selectAll;
        });
	}

	$scope.getSelected = function() {
        var selected = [];

        angular.forEach($scope.posts, function(post) {
            if(post.selected) selected.push(post);
        });

        $log.info('Selected posts:', selected);
            
        return selected;
    };

	$scope.applyAction = function() {
		$log.info('Selected Action', $scope.action);
		var selected = $scope.getSelected();

		if(selected.length < 1) {
			toaster.clear();
			toaster.pop('error', 'Error', 'Please select post(s) to perform action on!', 3000);

			return false;
		}

		switch($scope.action) {
			case "delete":
				$scope.deletePosts(selected);
				break;

			case "trash":
				$scope.trashPosts(selected);
				break;

			case "publish":
				$scope.publishPosts(selected)
				break;

			case "unpublish":
				$scope.unpublishPosts(selected)
				break;
		}
	}

	$scope.deletePosts = function ($posts) {

		var confirm = window.confirm('Are you sure you want to delete these posts? They cannot be restored after deletion.');
		if(confirm) {
			toaster.clear();
			toaster.pop('info', 'Info', 'Deleting post(s)...', 5000);

			posts.bulkAction('delete', {posts: $posts})
			.success(function (response) {
				toaster.clear();
				if(response.status == "success") {
					//remove trashed posts from list
					$Posts = $scope.posts.filter(function (el) {    
		                return $posts.indexOf(el) === -1;
		            });
		            $scope.posts = $Posts;
		            
					toaster.pop('success', 'Info', 'Post(s) deleted!', 3000);
				}
			})
		}
	}

	$scope.trashPosts = function ($posts) {
		toaster.clear();
		toaster.pop('info', 'Info', 'Trashing post(s)...', 5000);

		posts.bulkAction('trash', {posts: $posts})
		.success(function (response) {
			toaster.clear();
			if(response.status == "success") {
				//remove trashed posts from list
				$Posts = $scope.posts.filter(function (el) {    
	                return $posts.indexOf(el) === -1;
	            });
	            $scope.posts = $Posts;

				toaster.pop('success', 'Info', 'Post(s) trashed!', 3000);
			}
		})
	}

	$scope.publishPosts = function ($posts) {

	}

	$scope.unpublishPosts = function ($posts) {

	}

	$scope.filterPosts = function() {

		posts.all({status: $scope.activefilter}).success(function (response) {
			$scope.posts = response.data;
			$scope.total = response.meta.pagination.total;
		});
	}

	$scope.fetch = function() {
		$scope.statusText = '<i class="fa fa-circle-o-notch fa-spin fa-2x"></i> Loading...';
	
		posts.all().success(function (response) {
			if(response.data.length > 0)
			{
				$scope.nodata = false;
				$scope.showStatus = false;

				$scope.posts = response.data;
				$scope.total = response.meta.pagination.total;
			}
			else {
				$scope.nodata = true;
				$scope.showStatus = true;
				$scope.statusText = "No posts have been created!";
			}
		});
	};

	//Listen for events
	$scope.$on('posts:fetch', $scope.fetch);
	$scope.$on('posts:filter', $scope.filterPosts)
	//Emit events
	$scope.$emit('posts:fetch');
}]);