app.controller('ArticleCtrl', ['$scope', '$log', '$document', '$page', '$stateParams', 'posts',
	function($scope, $log, $document, $page, $stateParams, posts) {
		//Post object
		$scope.post;

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

		$scope.fetch = function() {
			$log.info('Viewing post: ', $stateParams.slug);

			var $slug = $stateParams.slug;

			posts.get($slug)
			.success(function (response) {
				if(response.data) {
					$scope.post = response.data;
					//set page title
					$page.setPageTitle($scope.post.title+ " - Bayelsa Public Square");
					$page.setMetaDescription($scope.post.excerpt);
					$page.addFbMetaTag('og:title', $scope.post.title);
					$page.addFbMetaTag('og:url', $scope.post.url);
					$page.addFbMetaTag('og:description', $scope.post.excerpt);

					if($scope.post.featured_image && $scope.post.featured_image.disk == "local") {
						$page.addFbMetaTag('og:image', "/content/"+$scope.post.featured_image.src)
					}
				}
			})
		}

		$scope.$on('fetch:post', $scope.fetch);
		$scope.$emit('fetch:post');
	}
]);