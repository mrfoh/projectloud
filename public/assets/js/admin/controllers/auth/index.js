app.controller('AuthController',['$rootScope', '$scope', '$auth', '$log', '$document', '$localStorage', '$timeout',
	function($rootScope, $scope, $auth, $log, $document, $localStorage, $timeout) {
	//set view title
	$document[0].title = "Login - BPS Admin";

	//credentials
	$scope.email;
	$scope.password;

	$scope.error;
	$scope.loading = false;
	$scope.status;

	$scope.login = function() {
		var data = {
			email: $scope.email,
			password: $scope.password
		};

		$scope.loading = true;
		$scope.status = "Authenticating...";

		$auth.signin(data)
		.success(function (response) {
			$log.info('Response', response);
			$localStorage.token = response.token;

			$rootScope.$broadcast('user:signedin');

			$scope.status = "Authenticated";
			$timeout(function() {
				window.location.hash = "#/dashboard";
			}, 3000);
		})
		.error(function (response) {
			$scope.loading = false;
			$scope.status = null;
			$scope.error = response.message;
		});
	}
}]);