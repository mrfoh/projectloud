app.controller('UploaderCtrl', ['$scope', 'Upload', '$filter', 'toaster', '$log', '$auth','$document',
    function($scope, Upload, $filter, toaster, $log, $auth, $document) {

    //set document title
    $document[0].title = "Upload Media - BPS Admin";

    //Store files
    $scope.files = [];
    //Queue empty flag
    $scope.queueEmpty = true;


    $scope.removeFile = function(file) {
        var update = $scope.files.filter(function ($file) {
            return $file.name !== file.name;
        })

        $scope.files = update;
    }

    $scope.startUpload = function() {
        angular.forEach($scope.files, function(file) {
            $scope.upload(file);
        }); 
    }

    $scope.upload = function($file) {
        Upload.upload({
            url: '/api/media/upload',
            method: 'POST',
            file: $file,
            fileFormDataName: 'upload',
            headers: {'Authorization': "Bearer "+$auth.token() }
        }).progress(function (evt) {
            var progress = parseInt(100.0 * evt.loaded / evt.total);
            evt.config.file.progress = progress;
        }).success(function(data, status, headers, config) {
            $scope.removeFile(config.file);
        })
    }

    $scope.$watch('files', function() {
      $log.info('File Queue:', $scope.files);  
      if($scope.files.length > 0) {
        $scope.queueEmpty = false;
      }
      else {
        $scope.queueEmpty = true;
      }
    })
}]);