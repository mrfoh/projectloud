app.controller('SectionCtrl', ['$scope', '$log', '$document', '$page', '$stateParams', 'posts',
	function($scope, $log, $document, $page, $stateParams, posts) {
		
		$categories = JSON.parse(window.Data.categories);
		$category = $categories.filter(function(category) {
			return category.slug === $stateParams.category
		});

		//set page title
		$page.setPageTitle($category[0].name+" - The Bayelsa Public Square")
		//set page meta tags
		$page.addMetaTag('description', $category[0].description);
		$page.addMetaTag('url', 'http://www.bayelsapublicsquare.com/section/'+$category[0].slug);
		$page.addMetaTag('title', $category[0].name+" - The Bayelsa Public Square");
		$page.addMetaTag('keywords', "bayelsa, niger-delta, south-south, nigeria, policies, projects, news, programmes, politics, ijaw");

		$page.addMetaTag('og:title', $category[0].name+" - The Bayelsa Public Square");
		$page.addMetaTag('og:description', $category[0].description);
		$page.addMetaTag('og:url', 'http://www.bayelsapublicsquare.com/section/'+$category[0].slug);

		//Recent post in section
		$scope.recent = [];
		//Featured posts in section
		$scope.featuredPosts = [];
		$scope.featuredPro;
		//Loading indicator for feed
		$scope.feedloading = true;
		//loading indicator for featured
		$scope.featuredloading = true;
		$scope.noFeatured = false;
		$scope.noPosts = false;

		$scope.featured = function() {

			posts.featuredInCategory($category[0].id)
			.success(function(response) {
				$scope.featuredloading = false;
				if(response.data.length > 0) {
					$scope.featuredPosts = response.data;
					$scope.featuredPro = $scope.featuredPosts[0];
					$scope.noFeatured = false;
				}
				else {
					$scope.noFeatured = true;
				}
			}) 
		}

		$scope.fetch = function() {

			posts.recentInCategory($category[0].id)
			.success(function(response) {
				$scope.feedloading = false;
				if(response.data.length > 0) {
					$scope.recent = response.data;
					$scope.noPosts = false;
				}
				else {
					$scope.noPosts = true;
				}
			})
		}

		$scope.$on('fetch:featured', $scope.featured);
		$scope.$on('fetch:posts', $scope.fetch);

		$scope.$emit('fetch:featured');
		$scope.$emit('fetch:posts');
	}
]);