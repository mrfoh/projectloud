app.controller('SignupCtrl', ['$rootScope','$scope', '$log', '$document', '$page', '$auth', '$timeout', '$state',
	function($rootScope, $scope, $log, $document, $page, $auth, $timeout, $state) {

		$scope.progress = false;
		$scope.valid = true;
		$scope.status;
		$scope.error = false;

		$page.setPageTitle('Sign up - Bayelsa Public Square');

		$scope.signup = function(valid) {
			$scope.valid = valid;

			if($scope.valid) {
				var $form = { name: $scope.name, username: $scope.username, password: $scope.password, email: $scope.email};

				$scope.progress =  true;
				$scope.status = "Please wait..."

				$auth.signup($form)
				.success($scope.signupSuccess)
				.error($scope.signupError);
			}
		}

		$scope.signupSuccess = function (response, status, headers, config) {
			if(response && response.token) {

				$scope.status = "Sign up successfull! Welcome to Bayelsa Public Square";
				$auth.saveToken(response.token);

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

		$scope.signupError = function(response, status, headers, config) {
			console.log(arguments);
		}

		$scope.oauthSignup = function() {
			OAuth.popup('google')
	      	.done($scope.oauthSuccess)
		    .fail(function (err) {
		        console.log(err)
		    })
		}

		$scope.oauthSuccess = function(result) {
	      	//save access token
	      	$auth.saveOauthToken(result.access_token);
	      	//call google api
	     	result.me()
	      	.done($scope.oauthMeSuccess)
	      	.fail(function (err) {
	        	console.log(err)
	      	})
		}

		$scope.oauthMeSuccess = function(me) {
			var token = $auth.OauthToken();
		      var form = { provider_id: response.id, name: response.name, email: response.email, access_token: token };
		      $auth.oauth(form)
		      .success(function (response) {
		          if(response.token) {
		          	$scope.progress = true;
		            $scope.status = "Sign up successfull! Welcome to Bayelsa Public Square";
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
	    //$rootScope.$on('auth:error', $scope.signupError);
	}
]);