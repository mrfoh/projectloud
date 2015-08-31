app.controller('HomeCtrl', ['$rootScope', '$scope', '$log', '$document', '$page','posts',
	function($rootScope, $scope, $log, $document, $page, posts) {
		//set page title
		$page.setPageTitle('The Bayelsa Public Square');
		//set meta tags
		$page.addMetaTag('description',"A public forum for news, reports and opinions on Bayelsa goverment policies, projects and programmes");
		$page.addMetaTag('keywords', "bayelsa, niger-delta, south-south, nigeria, policies, projects, news, programmes, politics, ijaw");
		
		$page.addMetaTag('og:title', "The Bayelsa Public Square");
		$page.addMetaTag('og:keywords', "bayelsa, niger-delta, south-south, nigeria, policies, projects, news, programmes");
		$page.addMetaTag('og:description', "A public forum for news, reports and opinions on Bayelsa goverment policies, projects and programmes");

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
					var max = $scope.recent.length - 1;

					$scope.template = "2-cols";
					$scope.pro = $scope.take($scope.recent, 0, 2);
					$scope.less = $scope.take($scope.recent, 3, max);
				}
				else {
					$scope.template = "1-col";
				}
			})
		}

		$scope.take = function(items, start, end) {

			var store  = [];

			for(start; start <= end; start++) {
				store.push(items[start]);
			}

			return store;
		}

		$scope.$on('featured:fetch', $scope.fetchFeatured);
		$scope.$on('recent:fetch', $scope.fetchRecent);

		$scope.$emit('featured:fetch');
		$scope.$emit('recent:fetch');
	}
]);