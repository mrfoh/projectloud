(function(){
	angular.module('requestHandler', [])
	.factory('requestHandlerInterceptor', ['$q', '$log', '$localStorage', '$window', function ($q, $log, $localStorage, $window) {
	
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

			'responseError': function (rejection) {
				if(rejection.status == "401") {
					$window.location.hash = "#/auth/login";
				}
				
				return $q.reject(rejection);
			}
		};

		return interceptor;
	}]);
	
})();