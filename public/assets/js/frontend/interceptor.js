angular.module('requestHandler', []).
factory('requestInterceptor', ['$q', '$injector', '$log', '$localStorage', '$window',
	function ($q, $injector, $log, $localStorage, $window) {
		var inFlightAuthRequest = null;
		var interceptor = {
			'request': function (config) {
				config.headers = config.headers || {};
		        if ($localStorage.token) {
		            config.headers.Authorization = 'Bearer ' + $localStorage.token;
		        }

				return config;
			},

			'response': function (response) {
				return response;
			},

			'responseError': function (response) {
				switch (response.status) {
	                case 401:
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
	                       // authService.clear();
	                       // $injector.get("$state").go('guest.login');
	                        return;
	                    });
	                    return deferred.promise;
	                    break;
	                default:
	                    //authService.clear();
	                    //$injector.get("$state").go('guest.login');
	                    break;
	            }
	            return response || $q.when(response);
			}
		};

		return interceptor;
}])