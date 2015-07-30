app.controller('TaggedCtrl', ['$scope', '$log', '$document', '$page', '$stateParams', 'posts',
	function($scope, $log, $document, $page, $stateParams, posts) {
		$page.setPageTitle('Tagged '+$stateParams.tag+ " - The Bayelsa Public Square");
		$page.addMetaTag('description', 'Posts tagged '+$stateParams.tag);
		$page.addMetaTag('og:description', 'Posts tagged '+$stateParams.tag);
		$page.addMetaTag('og:title', 'Tagged '+$stateParams.tag+' - The Bayelsa Public Square');
		//Posts
		$scope.posts = [];
		//Loading
		$scope.loading = true;	
		$scope.noposts = false;
		$scope.showposts = false
		$scope.tag = $stateParams.tag;

		$scope.fetch = function() {
			var $slug = $stateParams.tag;

			posts.tagged($slug)
			.success(function (response) {
				if(response && response.data) {
					$scope.posts = response.data;

					$scope.loading = false;

					if(response.data.length > 0) {
						$scope.noposts = false
						$scope.showposts = true;
					}
					else {
						$scope.noposts = true;
						$scope.showposts = false;
					}
				}
			})
			.error(function (response, status, headers, config) {

			})
		}

		$scope.$on('fetch:tagged', $scope.fetch);
		$scope.$emit('fetch:tagged');
	}
]);