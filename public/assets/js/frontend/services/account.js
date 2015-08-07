app.factory('$account', ['$http', '$window', '$localStorage', function ($http, $window, $localStorage) {

	var self = this;

    self.profile = function(form) {
        return $http.put('/account/profile', form);
    }

     self.settings = function(form) {
        return $http.put('/account/settings', form);
    }

    self.password = function(form) {
    	return $http.post('/account/change-password', form);
    }
	return self;
}]);

