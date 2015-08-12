angular.module('app')
.directive('relatedPosts', ['$rootScope', 'posts',
	function($rootScope, posts) {
		return {
			restrict: 'E',
			scope: {},
			templateUrl: '/assets/views/blocks/related-posts.html',
			link: function(scope, el, attrs) {

				scope.loading = true;
				scope.nodata = false;
				scope.posts = [];
				scope.count = attrs.count;

				scope.fetch = function() {
					posts.related(scope.$parent.post.id)
					.success(function(response) {
						if(response && response.data) {

							if(response.data.length > 0) {
								scope.posts = response.data;
								scope.nodata = false;
								scope.loading = false;
							}

							else {
								scope.nodata = true;
								scope.loading = false;
							}
						}
					});
				}

				$rootScope.$on('post:loaded', scope.fetch)
			}
		}
	}	
])