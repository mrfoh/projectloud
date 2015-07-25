'use strict';

/* Main Controllers */

angular.module('app')
.controller('AuthModalCtrl', ['$rootScope','$scope','$auth', '$timeout', '$modalInstance', 
  function ($rootScope, $scope, $auth, $timeout, $modalInstance) {

    $scope.signinForm = true;
    $scope.signupForm = false;
    $scope.valid = true;
    $scope.progress = false;
    $scope.stat;

    $scope.switchToSignup = function() {
      $scope.signinForm = false;
      $scope.signupForm = true;
    }

    $scope.login = function(valid) {
      $scope.valid = valid;
      var form = { email: $scope.email, password: $scope.password };
      if(valid)
      {
        $scope.progress = true;
        $scope.status = "Authenticating..."
         //login user
        $auth.login(form).
        success(function (response) {
          if(response.token) {
            $scope.status = "Authenticated!";
            $auth.saveToken(response.token)

            $rootScope.$broadcast('user:authed');

            $timeout(function() {
              $modalInstance.close();
            }, 2500);
          }
        })
        .error(function (response) {

        })
      }
    }

    $scope.googleLogin = function() {
      OAuth.popup('google')
      .done($scope.googleLoginSuccess)
      .fail(function (err) {
        console.log(err)
      })
    }

    $scope.googleLoginSuccess = function(result) {
      console.log(result);
      //save access token
      $auth.saveOauthToken(result.access_token);
      //call google api
      result.me()
      .done($scope.googleMeSuccess)
      .fail(function (err) {
        console.log(err)
      })
    }

    $scope.googleMeSuccess = function (response) {
      var token = $auth.OauthToken();
      var form = { provider_id: response.id, name: response.name, email: response.email, access_token: token };
      $auth.oauthlogin(form)
      .success(function (response) {
          if(response.token) {
            $scope.status = "Authenticated!";
            $auth.saveToken(response.token)

            $rootScope.$broadcast('user:authed');

            $timeout(function() {
               $modalInstance.close();
            }, 2500);
          }
      });
    }
}])
.controller('MainCtrl', ['$rootScope','$scope', '$localStorage', '$window', '$modal', '$auth',
  function($rootScope, $scope, $localStorage, $window, $modal, $auth) {
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
      //var $categories = JSON.parse(window.Data.categories);
      //angular.forEach($categories, function(category) { $scope.categories.push(category) });

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