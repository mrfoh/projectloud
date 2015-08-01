angular.module('app')
.controller('ReportModalCtrl', ['$rootScope','$scope', '$timeout', 'comments', '$modalInstance', 'commentID',
	function ($rootScope, $scope, $timeout, comments, $modalInstance, commentID) {
		$scope.valid;

		$scope.id = commentID
		$scope.disableBtn = false;

		$scope.types = [
			{name: "Intolerance", value: "intolerance"},
			{name: "Violence", value: "violence"},
			{name: "Name-Calling", value: "name-calling"}
		]

		$scope.comment;
		$scope.type;

		$scope.progress = {
			show: false,
			message: "",
			type: "info"
		}

		$scope.report = function(vaild) {
			$scope.valid = vaild;

			if($scope.valid) {
				$scope.progress.show = true;
				$scope.progress.message = "Please wait..";
				$scope.disableBtn = true;

				comments.report($scope.id, {type: $scope.type.value, comment: $scope.comment})
				.success($scope.reportSuccess)
				.error($scope.reportError)
			}
		}

		$scope.reportSuccess = function (response, status, headers, config) {
			if(response.status == "success") {
				$scope.progress.message = "Report submitted. We will be in touch with you";
				$scope.progress.type = "success";
				$scope.disableBtn = false;

				$timeout(function() {
					$modalInstance.close();
				}, 3000)
			}
		}

		$scope.reportError = function (response, status, headers, config) {
			$scope.disableBtn = false;
			$scope.progress.message = response.message;
		}
}])
.directive('reportComment', ['$window','$document','$rootScope', '$modal', 
	function($window, $document, $rootScope, $modal) {

		return {
			restrict: 'A',
			scope: {},
			link: function(scope, element, attrs) {

				scope.openReportModal = function (event) {
					var $modalInstance = $modal.open({
						templateUrl: '/assets/views/blocks/ui/report-modal.html',
						controller: 'ReportModalCtrl',
						size: 'md',
						windowClass: 'report-modal',
						resolve: {
					        commentID: function () {
					          return attrs.commentId;
					        }
					    }
					})   
				}

				element.on('click', scope.openReportModal);
			}
		}
}])