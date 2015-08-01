app.controller('AuthCtrl', ['$rootScope','$scope', '$log', '$document', '$page', '$auth', '$timeout', '$state',
	function($rootScope, $scope, $log, $document, $page, $auth, $timeout, $state) {

		$scope.boot = function() {
			var $token = $state.params.token;
			$auth.saveToken($token);

			$rootScope.$broadcast('user:authed');

			$timeout(function() {
				$state.go('site.home');
			}, 3000)
		}
	}
]);