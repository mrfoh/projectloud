angular.module('app')
.controller('SelectCtrl', ['$rootScope','$scope','$modalInstance', 'preSelected', 'files',
	function($rootScope, $scope, $modalInstance, preSelected, files) {

	$scope.statusShow = true;
	$scope.statusText = "Loading...";
	$scope.files = [];
	$scope.selected = null;
	$scope.preselect = preSelected;
	$scope.disablebtn = true;

	$scope.select = function ($event, file) {

        if(!$event.ctrlKey) {
            angular.forEach($scope.files, function(file) {
                if(file.selected) file.selected = false;
            });
        }

        if(file.selected) {
            file.selected = false;
        }
        else {
            file.selected = true;
            $scope.$emit('image:selected', file);
        }
    };

    $scope.preSelect = function (selected) {
    	angular.forEach($scope.files, function(file) {
    		if(file.id == selected) file.selected = true;
    	});
    }

    $scope.setImage = function() {
    	var file = $scope.selected;
    	$scope.$emit('image:set', file);

    	$modalInstance.close()
    };

	$scope.fetch = function() {
		files.all({type: 'image'}).success(function(response) {
			if(response.data.length > 0) {
				$scope.files = response.data;
				$scope.noData = false;
        		$scope.statusShow = false;

        		if($scope.preselect) $scope.preSelect($scope.preselect);
			}
			else {
                $scope.statusShow = true;
                $scope.noData = true;
                $scope.statusText = "No files found!";
            }
		})
	};

	$scope.enableBtn = function(event, file) {
		$scope.disablebtn = false;
		$scope.selected = file;
	};

	$rootScope.$on('files:fetch', $scope.fetch);
	$rootScope.$on('image:selected', $scope.enableBtn);
	$rootScope.$emit('files:fetch');
}])
.directive('uiFeatureSet', ['$window','$document','$modal', '$rootScope',
	function($window, $document, $modal, $rootScope) {

		return {
			restrict: 'E',
			template: '<button class="btn btn-info"><i class="fa fa-picture-o"></i> Set featured image</button>',
			link: function (scope, el, attr) {
				el.on('click', function()
				{
					var modalInstance = $modal.open({
						templateUrl: '/assets/tpl/blocks/ui/feature-select.html',
						controller: 'SelectCtrl',
						size: 'lg',
						scope: scope,
						resolve: {
							preSelected: function() { 
								return attr.selected;
							}
						}
					})
				})
			}
		};
}]);
