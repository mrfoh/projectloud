'use strict';

/* Main Controllers */

angular.module('app')
.controller('MainCtrl', ['$rootScope','$scope', '$localStorage', '$window', '$modal', '$auth', '$state',
  function($rootScope, $scope, $localStorage, $window, $modal, $auth, $state) {
    // add 'ie' classes to html
    var isIE = !!navigator.userAgent.match(/MSIE/i);
    isIE && angular.element($window.document.body).addClass('ie');

    isSmartDevice( $window ) && angular.element($window.document.body).addClass('smart');

    $scope.disabled;

    $scope.categories = [];

    $scope.mobileMenuVisible = false;

    $scope.app = {
      name: 'Bps',
      version: '1.0.0',
      user: null
    }

    $scope.boot = function() {
      var $categories = JSON.parse(window.Data.categories);
      angular.forEach($categories, function(category) { $scope.categories.push(category) });

      if($auth.check()) {
         $scope.app.user = $auth.getClaimsFromToken();
         
         angular.forEach($scope.app.user.roles, function(role) {
          if(role.name == "Admin") {
            $scope.app.user.isadmin = true;
          }
          else {
            $scope.app.user.isadmin = false;
          }
         })
      }
    }

    $scope.logout = function() {
      $auth.logout();
      $rootScope.$broadcast('user:loggedout');
      $state.go('site.siginin');
    }

    $scope.toggleMobileMenu = function() {
      if($scope.mobileMenuVisible)
        $scope.mobileMenuVisible = false;
      else
        $scope.mobileMenuVisible = true;
    }

    $scope.openAuthModal = function(closeMobileMenu) {
      if(closeMobileMenu) $scope.mobileMenuVisible = false;

      var modalInstance = $modal.open({
        animation: true,
        controller: 'AuthModalCtrl',
        templateUrl: '/assets/views/blocks/ui/authmodal.html',
        windowClass: 'auth-modal',
        size: 'md',
      });
    }

    function isSmartDevice( $window )
    {
      // Adapted from http://www.detectmobilebrowsers.com
      var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
      // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
      return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams){ 
      $scope.mobileMenuVisible = false;
  })

    $rootScope.$on('user:authed', function(event) {
      $scope.app.user = $auth.getClaimsFromToken();
  })

    $rootScope.$on('user:loggedout', function(event) {
        $scope.app.user = null;
  })
}]);