// A RESTful factory for accessing posts
app.factory('files', ['$http', '$window', function ($http, $window) {

	var self = this,
	url = "/api/media"; //API Endpoint

	self.all = function(params) {

		if(params !== undefined) {
			console.log(params)
			var $params = this.serialize(params);
			return $http.get(url+"?"+$params);
		}
		else {
			return $http.get(url);
		}
	};

	self.get = function(id) {
		return $http.get(url+"/"+id);
	};

	self.delete = function(id) {
		return $http.delete(url+"/"+id);
	};

	self.byUser = function(params) {
		if(params !== undefined) {
			console.log(params)
			var $params = this.serialize(params);
			return $http.get(url+"/user?"+$params);
		}
		else {
			return $http.get(url+'/user');
		}
	};

	self.bulkAction = function(action, items) {
        return $http.post(url+'/bulk/'+action, items);
    }

	self.serialize = function(obj) {
		var str = [];
		for(var p in obj) {
		  if (obj.hasOwnProperty(p)) 
		    str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
		}
		return str.join("&");
	}

	return self;
}]);

