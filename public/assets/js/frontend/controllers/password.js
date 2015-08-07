app
.controller('PasswordCtrl', ['$rootScope','$scope', '$page', '$auth', '$state', '$account', '$timeout',
	function($rootScope, $scope, $page, $auth, $state, $account, $timeout) {

		var $user = $auth.getClaimsFromToken();
		$page.setPageTitle("Change Password - Bayelsa Public Square");

		//set user
		$scope.user = $user;

		$scope.current;
		$scope.update;
		$scope.confirm;

		$scope.submitted = false;

		$scope.progress = {
			show: false,
			type: 'info',
			message: ''
		}

		$scope.changePassword = function(valid) {
			$scope.submitted = true;

			if(valid) {
				$scope.progress.show = true;
				$scope.progress.message = '<i class="fa fa-spin fa-spinner"></i> Please wait..';

				var $form = { current: $scope.current, update: $scope.update, confirm: $scope.confirm }

				$account.password($form)
				.success(function (response, status, headers, config) {
					if(response.status == "success") {
						$scope.progress.type = "success";
						$scope.progress.message = "Password change successful";

						$scope.current = null;
						$scope.update = null;
						$scope.confirm = null;

						$timeout(function() {
							$scope.progress.show = false;
						}, 7000)
					}
				})
				.error(function (response, status, headers, config) {
					console.log(arguments);
				})
			}
		}

		$rootScope.$on('http.error', function(event, args) {
			var $response = args.response;
			$scope.progress.message = $response.data.message;
			$scope.progress.type = "danger";
		});
	}
])
