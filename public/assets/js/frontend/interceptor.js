angular.module('requestHandler', []).
factory('requestInterceptor', ['$q', '$injector', '$log', '$localStorage', '$window', '$injector',
	function ($q, $injector, $log, $localStorage, $window, $injector) {
		var inFlightAuthRequest = null;
		var $http;
		var notificationChannel;

		var refreshToken = function() {
			var deferred = $q.defer();
	        if(!inFlightAuthRequest) {
	            inflightAuthRequest = $injector.get("$http").post('/auth/refresh');
	       	}
	        inflightAuthRequest.then(function(r) {
		           	inflightAuthRequest = null;
		            if (r.data.token ) {
		               	$localStorage.token = r.data.token;
		                $injector.get("$http")(response.config).then(function(resp) {
		                   deferred.resolve(resp);
		                },function(resp) {
		                    deferred.reject();
		                });
		            } else {
		                deferred.reject();
		            }
	            }, function(response) {
	                inflightAuthRequest = null;
	                deferred.reject();
	                return;
	        });

	        return deferred.promise;
		}
		
		var interceptor = {
			'request': function (config) {
				config.headers = config.headers || {};
		        if ($localStorage.token) {
		            config.headers.Authorization = 'Bearer ' + $localStorage.token;
		        }

				return config;
			},

			'response': function (response) {
				// get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                // don't send notification until all requests are complete
               	if ($http.pendingRequests.length < 1) {
                    // get requestNotificationChannel via $injector because of circular dependency problem
                    notificationChannel = notificationChannel || $injector.get('requestNotificationChannel');
                    // send a notification requests are complete
                    notificationChannel.requestEnded();
                }
				return response;
			},

			'responseError': function (response) {
				var $rootScope = $injector.get('$rootScope');
				// get $http via $injector because of circular dependency problem
                $http = $http || $injector.get('$http');
                // don't send notification until all requests are complete
                if ($http.pendingRequests.length < 1) {
                    // get requestNotificationChannel via $injector because of circular dependency problem
                    notificationChannel = notificationChannel || $injector.get('requestNotificationChannel');
                    // send a notification requests are complete
                    notificationChannel.requestEnded();
                }

				switch (response.status) {
	                case 401:
	                    if($localStorage.token) { 
	                    	refreshToken();
	                    }

	                    if(response.config.url == "/auth/login") {
	                		$rootScope.$broadcast('auth:error', { message: "Email address or password incorrect!"});
	                	}
	                break;

	                case 404:
	                	if(response.config.url == "/auth/login") {
	                		console.log(response)
	                		$rootScope.$broadcast('auth:error', { message: "Email address or password incorrect!"});
	                	}
	                break
	            }

	            return response || $q.when(response);
			}
		};

		return interceptor;
}])
.factory('requestNotificationChannel', ['$rootScope', function($rootScope){
        // private notification messages
        var _START_REQUEST_ = '_START_REQUEST_';
        var _END_REQUEST_ = '_END_REQUEST_';
 
        // publish start request notification
        var requestStarted = function() {
            $rootScope.$broadcast(_START_REQUEST_);
            $rootScope.appLoading = true;
        };
        // publish end request notification
        var requestEnded = function() {
            $rootScope.$broadcast(_END_REQUEST_);
            $rootScope.appLoading = false;

        };
        // subscribe to start request notification
        var onRequestStarted = function($scope, handler){
            $scope.$on(_START_REQUEST_, function(event){
                handler();
            });
        };
        // subscribe to end request notification
        var onRequestEnded = function($scope, handler){
            $scope.$on(_END_REQUEST_, function(event){
                handler();
            });
        };
 
        return {
            requestStarted:  requestStarted,
            requestEnded: requestEnded,
            onRequestStarted: onRequestStarted,
            onRequestEnded: onRequestEnded
        };
    }])