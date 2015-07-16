angular.module('app')
.directive('featuredPosts', ['$window','$document','$rootScope',
	function($window, $document, $rootScope) {

		return {
			restrict: 'E',
			templateUrl: '/assets/views/blocks/ui/featured-post.html'
		}
	}
]);