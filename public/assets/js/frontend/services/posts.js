// A RESTful factory for accessing posts
app.factory('posts', ['$http', '$window', function ($http, $window) {

	var self = this,
	url = "/api/posts" //API Endpoint

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

	self.featured = function() {
		return $http.get(url+"/featured");
	}

	self.recent = function() {
		return $http.get(url+"/recent");
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

