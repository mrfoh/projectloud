angular.module('app')
.controller('SelectCtrl', ['$rootScope','$scope', '$localStorage', 'Upload', '$modalInstance', 'preSelected', 'files',
	function($rootScope, $scope, $localStorage, Upload, $modalInstance, preSelected, files) {

	$scope.uploader = { active: false};
	$scope.library = { active: true };

	$scope.media = [];
	$scope.total;
	$scope.currentPage = 1;
	$scope.perPage = 12;
	$scope.loading = true;
	$scope.disablebtn = true;

	$scope.selected = null;
	$scope.preselect = preSelected;

	$scope.files = [];
	$scope.showQueue = false;

	$scope.onQueueChange = function($files) {
		if($files.length > 0) {
			$scope.showQueue = true;
			$scope.library.active = true;
			$scope.uploader.active = false

			angular.forEach($files, function(file) {
	            $scope.upload(file);
	        }); 
		}
	}

	$scope.removeFile = function(file) {
        var update = $scope.files.filter(function ($file) {
            return $file.name !== file.name;
        })

        $scope.files = update;
        console.log($scope.files)
    }

	$scope.upload = function($file) {
        var upload = Upload.upload({
            url: '/api/media/upload',
            method: 'POST',
            file: $file,
            fileFormDataName: 'upload',
            headers: {'Authorization': "Bearer "+$localStorage.token }
        }).progress(function (evt) {
            var progress = parseInt(100.0 * evt.loaded / evt.total);
            evt.config.file.progress = progress;
        }).success(function(data, status, headers, config) {
        	$scope.media.unshift(data.data);
            $scope.removeFile(config.file);
        })
    }

	$scope.select = function (item) {
        angular.forEach($scope.media, function(file) {
            if(file.selected) file.selected = false;
        });

        if(item.selected) {
            item.selected = false;
        }
        else {
            item.selected = true;
            $scope.selected = item;
            console.log(item)
            $scope.$emit('image:selected');
        }
	}	

	$scope.preSelect = function (selected) {
    	angular.forEach($scope.media, function(file) {
    		if(file.id == selected) file.selected = true;
    	});
    }

	$scope.enableBtn = function(event) {
		$scope.disablebtn = false;
	};

	$scope.closeModal = function() {
		$modalInstance.close()
	}

	 $scope.setImage = function() {
    	var file = $scope.selected;
    	$rootScope.$broadcast('image:set', { image: file});

    	$modalInstance.close()
    };

    $scope.deleteFile = function($file) {
    	var confirm = window.confirm('Are you sure want to delete this file?');
        if(confirm) {
            files.delete($file.id)
            .success(function(response) {
                if(response.status == "success") {
                 	var files = $scope.media.filter(function(file) {
			             return file.id !== $file.id;
			        })

			        $scope.media = files; 
			        $scope.selected = null;  
                }
            })
        }
    } 

	$scope.fetchUserFiles = function() {

		files.byUser()
		.success(function(response) {
			if(response && response.data) {
				if(response.data.length > 0) {

					$scope.nomedia = false;
					$scope.loading = false;
					$scope.media = response.data;
					$scope.total = response.meta.pagination.total;

					if($scope.preselect) $scope.preSelect($scope.preselect);
				}
				else {
					$scope.nomedia = true;
					$scope.loading = false;
				}
			}
		})
		.error(function(response, status, headers, config) {

		})
	}

	$scope.fetchPage = function  (event, args) {

		files.byUser({page: args.page})
		.success(function(response) {
			if(response && response.data) {
				if(response.data.length > 0) {

					$scope.nomedia = false;
					$scope.loading = false;
					$scope.media = response.data;
					$scope.total = response.meta.pagination.total;
				}
				else {
					$scope.nomedia = true;
					$scope.loading = false;
				}
			}
		})
		.error(function(response, status, headers, config) {

		})
	}

	$scope.pageChanged = function() {}

	$scope.$watch('files', function() {
      console.info('File Queue:', $scope.files);  
      if($scope.files.length > 0) {
        $scope.showQueue = true
      }
      else {
        $scope.showQueue = false;
      }
    })

	$rootScope.$on('page:change', $scope.fetchPage)
	$scope.$on('image:selected', $scope.enableBtn);
	$scope.$on('fetch:files', $scope.fetchUserFiles); 

	$scope.$emit('fetch:files');
}])
.directive('uiFeaturedSet', ['$window','$document','$modal', '$rootScope',
	function($window, $document, $modal, $rootScope) {

		return {
			restrict: 'E',
			scope: {},
			template: '<button class="btn btn-block btn-info"><i class="fa fa-picture-o"></i> Set featured image</button>',
			link: function (scope, el, attr) {
				el.on('click', function()
				{
					var modalInstance = $modal.open({
						templateUrl: '/assets/views/blocks/ui/feature-select-modal.html',
						controller: 'SelectCtrl',
						size: 'lg',
						windowClass: 'featured-select-modal',
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
