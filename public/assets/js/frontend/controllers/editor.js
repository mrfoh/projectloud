app.controller('EditorCtrl', ['$rootScope', '$scope', '$log', '$page', '$filter', 'toaster', 'posts', 'tags', 'files', '$stateParams', '$interval', '$localStorage',
	function($rootScope, $scope, $log, $page, $filter, toaster, posts, tags, files, $stateParams, $interval, $localStorage) {
		//set page title
		$page.setPageTitle("Post Editor - Bayelsa Public Square");

		//Editor mode
		$scope.mode = { create: true, edit: false };

		//on boarding
		$scope.showOnboarding = (typeof $localStorage.showOnboarding != "undefined") ? $localStorage.showOnboarding : true;

		$scope.onboardingSteps = [
		  	{
			    title: "Welcome",
			    position: "centered",
			    description: "Welcome to the BPS Editor!. The editor allows you write for the Bayelsa Public Square",
			    width: 300
			},
		  	{
			    title: "Post Title",
			    description: "Enter a title for your post here",
			    attachTo: "#title-tip",
			    position: "bottom"
			},
			{
			    title: "Post Excerpt",
			    description: "Enter a short intro for your post",
			    attachTo: "#excerpt-tip",
			    position: "bottom"
			},
			{
			    title: "Post Body",
			    description: "Enter the body of your post here, add images and youtube videos to enhance your post",
			    attachTo: "#editor-tip",
			    position: "top"
			},
			{
				title: "Category",
				description: "Select a category under which your post will be filed under. Make sure to select the appropriate category that matches the context of your post.",
				attachTo: "#category-tip",
				position: "left"
			},
			{
				title: "Tags",
				description: "Select tags appropriate to your post ensure post can be found among similarly tagged posts",
				attachTo: "#tag-tip",
				position: "left"
			},
			{
				title: "Featured Image",
				description: "Upload or select an image that will be displayed along side your post on the site. Be sure to use non-offsensive image with the same context as your post",
				attachTo: "#featured-tip",
				position: "left"
			},
			{
				title: "Save",
				description: "Save your post by clicking this button",
				attachTo: "#save-btn-tip",
				position: "left"
			}
		];
		//post
		$scope.post = {};
		$scope.id = $stateParams.id;
		//featured image
		$scope.featured_image = null;

		//tags
		$scope.tags = [];
		$scope.tagform = { visible: false };
		$scope.selectedtags = [];
		$scope.fieldDisabled = false;
		$scope.tag = {};

		$scope.hideOnboarding = function() {
			$scope.showOnboarding = false;
			$localStorage.showOnboarding = $scope.showOnboarding;
		}

		$scope.save = function() {
			//show toast
			toaster.clear();
			toaster.pop('wait','Status', 'Saving, please wait...', 0);

			($scope.selectedtags.length > 0) ? $scope.post.tags = $scope.selectedtags : $scope.post.tags = [];

			if($scope.mode.create)
			{
				$scope.post.status = "draft";
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
			}
		};

		$scope.fetchPost = function() {
			if(typeof $scope.id !== "undefined") {
				$scope.mode.edit = true;
				$scope.mode.create = false;
				$scope.showOnboarding = false;

				posts.get($scope.id).success(function(res) {
					if(res) {
						$scope.post = res.data;
						$scope.selectedtags = $scope.post.tags.data;
					}
				});
			}
			else {
				$scope.mode.edit = false;
				$scope.mode.create = true;
			}

			console.log($scope.mode);
		};

		$scope.fetchTags = function() {

			tags.all().success(function(response) {

				if(response && response.data.length > 0) {
					$scope.tags = response.data;
				}
			})
		}

		$scope.saveTag = function() {
			if(!$scope.tag.name)
				toaster.pop('error','Error', 'Enter tag name', 3000);

			//Disable name field
			$scope.fieldDisabled = true;

			tags.create($scope.tag).success(function (response) {
				if(response && response.data) {
					$scope.tags.push(response.data);
					$scope.fieldDisabled = false;
					$scope.tag.name = '';
					$scope.toggleTagForm();
				}
			})
		};

		$scope.onTagSelect = function($item, $model) {
			$scope.selectedtags.push($item);
		}

		$scope.onTagRemove = function($item, $model) {
			var $selectedtags = $scope.selectedtags.filter(function(el) {
				return el.name !== $item.name;
			})

			$scope.selectedtags = $selectedtags;
		}

		$scope.onError = function(event, args) {
			var $response = args.response;
			console.log($response);

			if($response.status == 500) {
				toaster.clear();
				toaster.pop('danger','Error','An error occured on the server. Please try again later', 5000);
			}
		}

		$scope.toggleTagForm = function() {
			if($scope.tagform.visible === false)
				$scope.tagform.visible = true;
			else if($scope.tagform.visible === true)
				$scope.tagform.visible = false
		};

		$scope.$watch('featured_image', function(newValue, oldValue) {
			$scope.post.featured_image = newValue;
		});

		$scope.$on('fetch:tags', $scope.fetchTags);
		$scope.$on('fetch:post', $scope.fetchPost);
		$rootScope.$on('http.error', $scope.onError);
		$rootScope.$on('image:set', function(event, args) {
			console.log(args)
			$scope.featured_image = args.image;

		});

		$scope.$emit('fetch:tags');
		$scope.$emit('fetch:post');
	}
]);

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