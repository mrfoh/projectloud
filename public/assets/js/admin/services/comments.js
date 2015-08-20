// A RESTful factory for accessing comments
app.factory('comments', ['$http', '$window', function ($http, $window) {

	var self = this,
	url = "/api/comments" //API Endpoint

	self.all = function(params) {
		if(params !== undefined) {
			var $params = this.serialize(params);
			return $http.get(url+"?"+$params);
		}
		else {
			return $http.get(url);
		}
	}

	self.approve = function(id) {
		return $http.get(url+"/"+id+"/approve");
	}

	self.unapprove = function(id) {
		return $http.get(url+"/"+id+"/unapprove");
	}

	self.delete = function(id) {
		return $http.delete(url+"/"+id);
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

