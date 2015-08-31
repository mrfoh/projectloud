app.controller('MediaModalCtrl', ['$rootScope','$scope', '$modalInstance', 'file', 'files',
    function ($rootScope, $scope, $modalInstance, file, files) {
    $scope.file = file;

    $scope.deleteFile = function() {
        var confirm = window.confirm('Are you sure want to delete this file?');
        if(confirm) {
            files.delete($scope.file.id)
            .success(function(response) {
                if(response.status == "success") {
                    $rootScope.$broadcast('file:deleted', { file: file });
                    $modalInstance.close();
                }
            })
        }
    }
}])

app.controller('MediaCtrl', ['$rootScope', '$scope',  '$filter','files', 'toaster', '$log', '$modal', '$document',
    function($rootScope, $scope, $filter, files, toaster, $log, $modal, $document) {
        //set view title
        $document[0].title = "Media - BPS Admin";
        //files
        $scope.files = [];
        //pagination
        $scope.total;
        $scope.currentPage = 1;

        $scope.statusShow = true;
        $scope.statusText;

        $scope.mode = "grid";

        $scope.filter;
        $scope.nodata;

        $scope.filters = [
            {name: "All Media", value: "all"},
            {name: "Images", value: "image"},
            {name: "Documents", value: "document"}
        ]

        $scope.onFilterSelect = function() { $scope.$emit('files:filter') }

        $scope.onPageChange = function() {
            console.log($scope.currentPage)
        }

        $scope.showMediaDialog = function(item) {
            var modalInstance = $modal.open({
                animation: true,
                controller: 'MediaModalCtrl',
                templateUrl: '/assets/tpl/blocks/media/modal.html',
                size: 'lg',
                resolve: {
                    file: function () {
                        return item;
                    }
                }
            });
        }

        $scope.select = function ($event, file) {

            if(!$event.ctrlKey) {
                angular.forEach($scope.files, function(file) {
                    if(file.selected) file.selected = false;
                });
            }

            if(file.selected)
                file.selected = false;
            else
                file.selected = true;
        };

        $scope.fetch = function() {
            $scope.statusText = '<i class="fa fa-spin fa-spinner"></i>';

            files.all()
            .success(function (response) {
                $scope.statusShow = false;

                if(response.data.length > 0) {
                    $scope.files = response.data;
                    $scope.total = response.meta.pagination.total;
                    $scope.nodata = false;
                }
                else {
                    $scope.statusText = "No files to display";
                    $scope.nodata = true;
                }
            })
        }

        $scope.filterFiles = function() {

            files.all({type: $scope.filter})
            .success(function (response) {
                $scope.files = response.data;
                $scope.total = response.meta.pagination.total;
            });
        }

        $scope.switchPage = function(event, args) {
            $scope.currentPage = args.page;

            files.all({page: $scope.currentPage})
            .success(function (response) {
                $scope.files = response.data;
                $scope.total = response.meta.pagination.total;
            });
        }

        $scope.deleteFile = function(event, args) {
            $log.info('Event: file:deleted', arguments);
            var files = $scope.files.filter(function(file) {
                return file.id !== args.file.id;
            })

            $scope.files = files;
        } 

        $rootScope.$on('page:change', $scope.switchPage);
        $rootScope.$on('file:deleted', $scope.deleteFile);
        $scope.$on('files:fetch', $scope.fetch);
        $scope.$on('files:filter', $scope.filterFiles);

        $scope.$emit('files:fetch');
}])