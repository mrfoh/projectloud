app.factory('$auth', ['$http', '$window', '$localStorage', function ($http, $window, $localStorage) {

	var self = this;

	self.urlBase64Decode = function (str) {
        var output = str.replace('-', '+').replace('_', '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
         	case 3:
                output += '=';
                break;
            default:
                throw 'Illegal base64url string!';
        }
        return window.atob(output);
    }

    self.getClaimsFromToken = function() {
        var token = $localStorage.token;
        var user = {};
        if (typeof token !== 'undefined') {
            var encoded = token.split('.')[1];
            user = JSON.parse(self.urlBase64Decode(encoded));
        }
        return user;
    }

    self.token = function() {
        return $localStorage.token;
    }

    self.saveToken = function (token) { 
        $localStorage.token = token;
    }

    self.check = function() {
		var token = $localStorage.token;
		if(typeof token == "undefined")
			return false;
		else
			return true;
	}

    self.saveOauthToken = function(token) {
        $localStorage.OauthToken = token;
    }

    self.OauthToken = function() {
        return $localStorage.OauthToken;
    }

    self.login = function(form) {
        return $http.post("/auth/login", form);
    }

    self.signup = function(form) {
        return $http.post("/auth/signup", form);
    }

    self.oauthlogin = function(form) {
        return $http.post("/auth/fb", form);
    }

    self.logout = function() {
        delete $localStorage.token;
        delete $localStorage.OauthToken;
    }

	return self;
}]);

