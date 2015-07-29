app.controller('SigninCtrl', ['$rootScope','$scope', '$log', '$document', '$page', '$auth', '$timeout', '$state',
	function($rootScope, $scope, $log, $document, $page, $auth, $timeout, $state) {

		$scope.progress = false;
		$scope.valid;
		$scope.status;
		$scope.error = false;

		$page.setPageTitle('Sign in - Bayelsa Public Square');

		$scope.login = function (valid) {
			$scope.valid = valid;

		    if(valid)
		    {
		        $scope.progress = true;
		        $scope.status = "Authenticating..."
		        var form = { email: $scope.email, password: $scope.password };
		         //login user
		        $auth.login(form).success($scope.siginSuccess)
		    }
		}

		$scope.siginSuccess = function(response, status, headers, config) {
			if(response && response.token) {
				$scope.status = "Authenticated!";
	            $auth.saveToken(response.token)

	            $rootScope.$broadcast('user:authed');
	            $timeout(function() {
	            	if($state.previous.name != "") {
	            		if($state.previous.params)
	            			$state.go($state.previous.name, $state.previous.params);
	            		else
	            			$state.go($state.previous.name);
	            	}
	            	else {
	            		$state.go('site.home');
	            	}
	            }, 3000);
			}
		}

		$scope.signinError = function(event, args) {
			$scope.error = true;
			$scope.progress =false;
			$scope.status = args.message;
		}

		$scope.googleLogin = function() {
	      OAuth.popup('google')
	      .done($scope.googleLoginSuccess)
	      .fail(function (err) {
	        console.log(err)
	      })
	    }

	    $scope.googleLoginSuccess = function(result) {
	      console.log(result);
	      //save access token
	      $auth.saveOauthToken(result.access_token);
	      //call google api
	      result.me()
	      .done($scope.googleMeSuccess)
	      .fail(function (err) {
	        console.log(err)
	      })
	    }

	    $scope.googleMeSuccess = function (response) {
	      var token = $auth.OauthToken();
	      var form = { provider_id: response.id, name: response.name, email: response.email, access_token: token };
	      $auth.oauth(form)
	      .success(function (response) {
	          if(response.token) {
	            $scope.status = "Authenticated!";
	            $auth.saveToken(response.token)

	            $rootScope.$broadcast('user:authed');

	            $timeout(function() {
	            	if($state.previous.name != "") {
	            		if($state.previous.params)
	            			$state.go($state.previous.name, $state.previous.params);
	            		else
	            			$state.go($state.previous.name);
	            	}
	            	else {
	            		$state.go('site.home');
	            	}
	            }, 2500);
	          }
	      });
	    }

	    $rootScope.$on('auth:error', $scope.signinError);
	}
]);