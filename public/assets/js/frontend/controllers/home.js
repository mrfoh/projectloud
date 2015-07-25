app.controller('HomeCtrl', ['$rootScope', '$scope', '$log', '$document', '$page','posts',
	function($rootScope, $scope, $log, $document, $page, posts) {
		//set page title
		$page.setPageTitle('The Bayelsa Public Square');
		//set meta tags
		$page.setMetaDescription("A public forum for news, reports and opinions on Bayelsa goverment policies, projects and programmes");
		$page.setMetaKeywords("bayelsa, niger-delta, south-south, nigeria, policies, projects, news, programmes");
		$page.addFbMetaTag('og:title', "The Bayelsa Public Square");
		$page.addFbMetaTag('og:description', "A public forum for news, reports and opinions on Bayelsa goverment policies, projects and programmes");

		$scope.featured = []
		$scope.recent = [];

		$scope.featuredloading = true;
		$scope.feedloading = true;

		$scope.fetchFeatured = function() {

			posts.featured()
			.success(function (response) {
				$scope.featured = response.data;
				$scope.featuredloading = false;
			})
		}

		$scope.fetchRecent = function() {

			posts.recent()
			.success(function (response) {
				$scope.recent = response.data;
				$scope.feedloading = false;

				if($scope.recent.length >= 10) {
					$scope.template = "2-cols";
					$scope.pro = $scope.recent.splice(0,3);
					$scope.less = $scope.recent.splice(4, 11);

					console.log($scope)
				}
				else {
					$scope.template = "1-col";
				}
			})
		}

		$scope.$on('featured:fetch', $scope.fetchFeatured);
		$scope.$on('recent:fetch', $scope.fetchRecent);

		$scope.$emit('featured:fetch');
		$scope.$emit('recent:fetch');
	}
]);