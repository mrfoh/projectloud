app.controller('SettingsCtrl', ['$rootScope','$scope', '$page', '$auth', '$state', '$account', 
	function($rootScope, $scope, $page, $auth, $state, $account) {

		var $user = $auth.getClaimsFromToken();
		$page.setPageTitle("Settings - Bayelsa Public Square");

		//set user
		$scope.user = $user;

		$scope.profileSaveBtnDisabled = false;
		$scope.profileBtnText = "Save";

		$scope.settingsSaveBtnDisabled = false;
		$scope.settingsBtnText = "Save";

		$scope.saveProfile = function() {

			$scope.profileSaveBtnDisabled = true;
			$scope.profileBtnText = '<i class="fa fa-spin fa-spinner"></i> Saving...';

			$account.profile({name: $scope.user.name, username: $scope.user.username, email: $scope.user.email})
			.success($scope.saveSuccess)
			.error($scope.saveProfileError);
		}

		$scope.saveSettings = function() {

			$scope.settingsSaveBtnDisabled = true;
			$scope.settingsBtnText = '<i class="fa fa-spin fa-spinner"></i> Saving...';

			$account.settings({settings: $scope.user.settings})
			.success($scope.saveSuccess)
			.error($scope.saveSettingsError);
		}

		$scope.saveProfileError =  function (response, status, headers, config) {
			$scope.profileSaveBtnDisabled = false;
			$scope.profileBtnText = "Save";
		}

		$scope.saveSettingsError =  function (response, status, headers, config) {
			$scope.settingsSaveBtnDisabled = false;
			$scope.settingsBtnText = "Save";
		}

		$scope.saveSuccess =  function (response, status, headers, config) {

			$scope.profileSaveBtnDisabled = false;
			$scope.profileBtnText = "Save";

			$scope.settingsSaveBtnDisabled = false;
			$scope.settingsBtnText = "Save";

			if(response.status == "success") {
				$auth.saveToken(response.token);
				$scope.user = $auth.getClaimsFromToken();
			}
		}
	}
]);