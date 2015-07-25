angular.module('app')
.controller('NewsletterCtrl', ['$rootScope','$scope', '$http', '$timeout', function($rootScope, $scope, $http, $timeout) {
	$scope.valid = true;
	$scope.showprogress = false;
	$scope.disablebtn = false;
	$scope.success = false;
	$scope.error = false;	

	$scope.subscribe = function(isValid) {
		$scope.valid = isValid;
		if(isValid) {

			$scope.disablebtn = true;
			$scope.showprogress = true;

			$http.post('/api/newsletter/subscribe', { email: $scope.email })
			.success($scope.subscribeSuccess)
			.error($scope.subscribeError);
		}
	}

	$scope.subscribeSuccess = function (response, status, headers, config) {
		$scope.showprogress = false;
		$scope.disablebtn = false;

		if(response.status == "success") {
			$scope.email = '';
			$scope.success = true;
			$timeout(function() {
				$scope.success = false;
			}, 5000);
		}
		else if(response.status == "error") {
			$scope.success = false;
			$scope.error = true;
			$scope.errormessage = response.message;

			$timeout(function() {
				$scope.error = false;
			}, 10000);
		}
	}

	$scope.subscribeError = function (data, status, headers, config) {
		console.log(arguments)
	}
}])
.directive('newsletterForm', ['$window','$document','$rootScope',
	function($window, $document, $rootScope) {

		return {
			restrict: 'E',
			templateUrl: '/assets/views/blocks/ui/newsletter-form.html',
			link: function (scope, el, attrs) {
			
			}
		}
	}
]);