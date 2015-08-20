app.controller('CommentsCtrl', ['$rootScope','$scope', 'comments', '$filter', 'toaster', '$log', '$document',
	function($rootScope, $scope, comments , $filter, toaster, $log, $document) {
	//set view title
	$document[0].title = "Comments - BPS Admin";

	//comments
	$scope.comments = [];

	//total
	$scope.total;

	//Current page in pagination
	$scope.currentPage = 1;

	//Select all flag
	$scope.selectAll = false;

	//table columns
	$scope.columns = [
		{name: "Author"},
		{name: "Comment"},
		{name: "In Response To"}
	];

	//Bulk actions
	$scope.actions = [
		{name: "Approve selected", value: "approve"},
		{name: "Unapprove selected", value: "unapprove"}
	]
	//Selected action
	$scope.action;

	//Filters
	$scope.filters = [
		{name: "All comments", value: "all"},
		{name: "Approved Comments", value: "approved"},
		{name: "Unapproved Comments", value: "unapproved"}
	];
	//Active filter
	$scope.activefilter = null;

	$scope.nodata = true;
	$scope.statusText;
	$scope.showStatus = true;

	$scope.onFilterSelect = function() {
		$scope.$emit('comments:filter');
	}

	$scope.checkAll = function() {
		if($scope.selectAll === false) {
        	$scope.selectAll = true;
        }
        else if($scope.selectAll === true) {
        	$scope.selectAll = false;
        }

        angular.forEach($scope.comments, function (item) {
            item.selected = $scope.selectAll;
        });
	}

	$scope.getSelected = function() {
        var selected = [];

        angular.forEach($scope.comments, function(comment) {
            if(comment.selected) selected.push(comment);
        });
            
        return selected;
    };

    $scope.approve = function (comment) {
    	comments.approve(comment.id)
    	.success(function(response) {
    		if(response && response.status == "success") {
    			comment.status = "approved";
    		}
    	})
    }

    $scope.unapprove = function (comment) {
    	comments.unapprove(comment.id)
    	.success(function(response) {
    		if(response && response.status == "success") {
    			comment.status = "unapproved";
    		}
    	})
    }

    $scope.delete = function(comment) {
    	comments.delete(comment.id)
    	.success(function(response) {
    		if(response && response.status == "success") {
    			//remove trashed posts from list
				$comments = $scope.comments.filter(function (el) {    
		            return comment.id !== el.id;
		        });

		        $scope.comments = $comments;
    		}
    	})
    }

	$scope.applyAction = function() {
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

	$scope.filterComments = function() {

		comments.all({status: $scope.activefilter}).success(function (response) {
			$scope.comments = response.data;
			$scope.total = response.meta.pagination.total;
		});
	}

	$scope.switchPage = function(event, args) {
       	$scope.currentPage = args.page;

        comments.all({page: $scope.currentPage})
        .success(function (response) {
            $scope.comments = response.data;
            $scope.total = response.meta.pagination.total;
        });
    }


	$scope.fetch = function() {
		$scope.statusText = '<i class="fa fa-circle-o-notch fa-spin fa-2x"></i> Loading...';
	
		comments.all().success(function (response) {
			if(response.data.length > 0)
			{
				$scope.nodata = false;
				$scope.showStatus = false;

				$scope.comments = response.data;
				$scope.total = response.meta.pagination.total;
			}
			else {
				$scope.nodata = true;
				$scope.showStatus = true;
				$scope.statusText = "No comments have been created!";
			}
		});
	};

	$scope.$on('comments:fetch', $scope.fetch)
	$scope.$on('comments:filter', $scope.filterComments);
	$rootScope.$on('page:change', $scope.switchPage);
	$scope.$emit('comments:fetch');

}]);