// A RESTful factory for accessing posts
app.factory('$auth', ['$http', '$window', '$localStorage', function ($http, $window, $localStorage) {

	var self = this;
    self.url = Bps.Config.url+"/admin/auth";

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

    self.signin = function(form) {
        return $http.post(self.url, form);
    }

    self.signout = function() {
        delete $localStorage.token;
    }

	self.check = function() {
		var token = $localStorage.token;
		if(typeof token == "undefined")
			return false;
		else
			return true;
	}

	return self;
}]);

