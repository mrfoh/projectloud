'use strict';

/* Main Controllers */

angular.module('app')
.controller('MainCtrl', ['$rootScope','$scope', '$localStorage', '$window', function($rootScope, $scope, $localStorage, $window) {
    // add 'ie' classes to html
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    isIE && angular.element($window.document.body).addClass('ie');

    isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

    $scope.disabled;

    $scope.categories = [];

    $scope.boot = function() {
      var $categories = JSON.parse($window.Data.categories);
      angular.forEach($categories, function(category) { $scope.categories.push(category) });
    }

    function isSmartDevice( $window )
    {
      // Adapted from http://www.detectmobilebrowsers.com
      var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
      // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
      return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }
}]);