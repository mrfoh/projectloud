// A RESTful factory for accessing comments
app.factory('comments', ['$http', '$window', function ($http, $window) {

	var self = this,
	url = "/api/comments" //API Endpoint

	self.create = function(comment) {
		return $http.post(url, comment);
	}

	self.reply = function(comment, id) {
		return $http.post(url+"/"+id+"/reply", comment);
	}

	self.replies = function(id) {
		return $http.get(url+"/"+id+"/replies");
	}

	self.report = function(id, form) {
		return $http.post(url+"/"+id+"/report", form);
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

