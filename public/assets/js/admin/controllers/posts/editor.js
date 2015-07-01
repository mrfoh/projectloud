app.controller('PostEditorCtrl', ['$rootScope', '$scope', 'posts', 'tags', 'categories', 'toaster', '$stateParams', '$log', '$document',
	function($rootScope, $scope, posts, tags, categories, toaster, $stateParams, $log, $document) {
	$document[0].title = "Post Editor - BPS Admin";
	$scope.id = $stateParams.post;
	$scope.disabled = undefined;
	//Editor mode
	$scope.mode = { create: true, edit: false };

	//category form
	$scope.categoryform = { visible: false };

	//tag form
	$scope.tagform = { visible: false };

	//category
	$scope.category = {};

	//Tag
	$scope.tag = {};

	//post
	$scope.post = {};

	//featured image
	$scope.featured_image = null;
	$scope.fieldDisabled = false;
	//Categories
	$scope.categories = [];

	//Tags
	$scope.tags = [];
	$scope.selectedtags = [];

	//Post statuses
	$scope.statuses = [
		{ name: "Draft", id: "draft"},
		{ name: "Published", id: "published"},
		{ name: "Unpublished", id: "unpublished"},
	];

	$scope.toggleCategoryForm = function() {
		if($scope.categoryform.visible === false)
			$scope.categoryform.visible = true;
		else if($scope.categoryform.visible === true)
			$scope.categoryform.visible = false
	};

	$scope.toggleTagForm = function() {
		if($scope.tagform.visible === false)
			$scope.tagform.visible = true;
		else if($scope.tagform.visible === true)
			$scope.tagform.visible = false
	};

	$scope.setStatus = function (status) {
		var $status;
		angular.forEach($scope.statuses, function(i) {
			if(i.id == status) {
				$status = i;
			}
		});

		return $status;
	};

	$scope.onTagSelect = function($item, $model) {
		$scope.selectedtags.push($item);
	}

	$scope.onTagRemove = function($item, $model) {
		var $selectedtags = $scope.selectedtags.filter(function(el) {
			return el.name !== $item.name;
		})

		$scope.selectedtags = $selectedtags;
		console.log($scope.selectedtags)
	}

	$scope.save = function() {
		//show toast
		toaster.clear();
		toaster.pop('wait','Status', 'Saving, please wait...', 0);
		//set post status
		$scope.post.status = $scope.statuses.selected.id;
		($scope.selectedtags.length > 0) ? $scope.post.tags = $scope.selectedtags : $scope.post.tags = null;

		if($scope.mode.create)
		{
			posts.create($scope.post).success($scope.saveSuccess);	
		}
		else if($scope.mode.edit)
		{
			posts.update($scope.id, $scope.post).success($scope.saveSuccess);
		}
	};

	$scope.saveSuccess = function (response) {
		if(response.data) {
			toaster.clear();
			toaster.pop('success', 'Success', 'Post saved successfully!', 3000);

			$scope.post = response.data;
			$scope.setStatus(response.data.status);
		}
	};

	$scope.saveCategory = function() {
		if(!$scope.category.name)
			toaster.pop('error','Error', 'Enter category name', 3000);

		//Disable name field
		$scope.fieldDisabled = true;

		categories.create($scope.category).success(function (response) {
			if(response) {
				$scope.categories.push(response);
				$scope.fieldDisabled = false;
				$scope.category.name = '';
				$scope.toggleCategoryForm();
			}
		})
	};

	$scope.saveTag = function() {
		if(!$scope.tag.name)
			toaster.pop('error','Error', 'Enter tag name', 3000);

		//Disable name field
		$scope.fieldDisabled = true;

		tags.create($scope.tag).success(function (response) {
			if(response.data) {
				$scope.tags.push(response.data);
				$scope.fieldDisabled = false;
				$scope.tag.name = '';
				$scope.toggleTagForm();
			}
		})
	};

	$scope.fetchCategories = function() {
		categories.all().success(function(res) {
			if(res.length > 0) {
				angular.forEach(res, function(category) { $scope.categories.push(category) });
			}
		});
	};

	$scope.fetchTags = function() {
		tags.all()
		.success(function(response) {
			if(response.data.length > 0) {
				$scope.tags = response.data;
			}
		})
	}

	$scope.fetchPost = function() {
		if(typeof $scope.id !== "undefined") {
			$scope.mode.edit = true;
			$scope.mode.create = false;

			posts.get($scope.id).success(function(res) {
				if(res) {
					$scope.post = res.data;
					$scope.statuses.selected = $scope.setStatus($scope.post.status);
					$scope.selectedtags = $scope.post.tags.data;
					console.log($scope.selectedtags)
				}
			});
		}
		else {
			$scope.mode.edit = false;
			$scope.mode.create = true;
		}
	};

	$scope.setFeaturedImage = function(event, file) {
		$scope.featured_image = file;
	}

	$scope.$watch('featured_image', function(newValue, oldValue) {
		$scope.post.featured_image = newValue;
	});
	//Listen to events
	$scope.$on('categories:fetch', $scope.fetchCategories);
	$scope.$on('tags:fetch', $scope.fetchTags);
	$scope.$on('post:fetch', $scope.fetchPost);
	$rootScope.$on('image:set', $scope.setFeaturedImage);

	//Emit events
	$scope.$emit('categories:fetch');
	$scope.$emit('tags:fetch');
	$scope.$emit('post:fetch');
}]);

app.directive('ngEnter', function () {
    return function (scope, element, attrs) {
        element.bind("keydown keypress", function (event) {
            if(event.which === 13) {
                scope.$apply(function (){
                    scope.$eval(attrs.ngEnter);
                });

                event.preventDefault();
            }
        });
    };
});