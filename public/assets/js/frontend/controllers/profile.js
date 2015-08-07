app.controller('ProfileCtrl', ['$rootScope','$scope', '$log', '$document', '$page', '$auth', '$state', 'posts',
	function($rootScope, $scope, $log, $document, $page, $auth, $state, posts) {

		var $user = $auth.getClaimsFromToken();
		$page.setPageTitle($user.username+" - Bayelsa Public Square");

		//set user
		$scope.user = $user;
		//loading
		$scope.loading = true;
		//posts
		$scope.posts = [];
		//no data
		$scope.nodata = false;

		$scope.fetch = function() {

			posts.by($scope.user.sub)
			.success($scope.fetchSuccess)
			.error($scope.fetchError);
		}

		$scope.fetchSuccess = function(response, status, headers, config) {
			if(response && response.data) {
				if(response.data.length > 0) {
					$scope.nodata = false;
					$scope.posts = response.data;

					$scope.loading = false;
				}
			}
		}

		$scope.fetchError = function(response, status, headers, config) {
			
		}

		$scope.$on('fetch:posts', $scope.fetch);
		$scope.$emit('fetch:posts');
	}
]);