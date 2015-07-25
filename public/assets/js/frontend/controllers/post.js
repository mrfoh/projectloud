app.controller('ArticleCtrl', ['$rootScope','$scope', '$log', '$document', '$page', '$stateParams', 'posts', 'comments',
	function($rootScope, $scope, $log, $document, $page, $stateParams, posts, comments) {
		//Post object
		$scope.post;
		//Loading
		$scope.loading = true;
		//post loaded
		$scope.postLoaded = false;

		$scope.share = function(url, mode) {
			if(mode == "facebook") {
				window.open(encodeURI("https://www.facebook.com/sharer/sharer.php?u="+url+"&title="+$scope.post.title+"")
					, '_blank',"width=420,height=300");
			}

			if(mode == "twitter") {
				window.open(encodeURI("http://twitter.com/intent/tweet?status="+$scope.post.title+"  "+url+"")
					, '_blank',"width=420,height=300");
			}

			if(mode == "google") {
				window.open(encodeURI("https://plus.google.com/share?url="+url+""), '_blank',"width=420,height=300");
			}
		}

		$scope.loadComments = function() {
			$rootScope.$broadcast('load:comments', { post: $scope.post });
		}

		$scope.fetch = function() {
			$scope.loading = true;			
			var $slug = $stateParams.slug;

			posts.get($slug)
			.success(function (response) {
				if(response.data) {
					$scope.post = response.data;
					$scope.loading = false;
					$scope.postLoaded = true;
					//set page title
					$page.setPageTitle($scope.post.title+ " - Bayelsa Public Square");
					$page.setMetaDescription($scope.post.excerpt);
					$page.addFbMetaTag('og:title', $scope.post.title);
					$page.addFbMetaTag('og:url', $scope.post.url);
					$page.addFbMetaTag('og:description', $scope.post.excerpt);

					if($scope.post.featured_image && $scope.post.featured_image.disk == "local") {
						$page.addFbMetaTag('og:image', "/content/"+$scope.post.featured_image.src)
					}

					$rootScope.$broadcast('post:loaded', { post: $scope.post});
				}
			})
			.error(function (response) {
				$scope.loading = false;
				$scope.postLoaded = false;
			})
		}

		$scope.$on('fetch:post', $scope.fetch);
		$rootScope.$on('comments:updated', function (event, args) {
			$scope.post.comment_count = args.count;
		})

		$scope.$emit('fetch:post');
	}
]);