// A RESTful factory for accessing posts
app.factory('tags', ['$http', '$window', function ($http, $window) {

	var self = this,
	url = "/api/tags"; //API Endpoint

	self.all = function() {
		return $http.get(url);
	};

	self.get = function(id) {
		return $http.get(url+"/"+id);
	};

	self.create = function(form) {
		return $http.post(url, form);
	};

	self.update = function(id, form) {
		return $http.put(url+"/"+id, form);
	};

	self.delete = function(id) {
		return $http.delete(url+"/"+id);
	};

	return self;
}]);

