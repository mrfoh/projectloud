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

	self.by = function(id) {
		return $http.get(url+"/by/"+id);
	}

	self.related = function(id) {
		return $http.get(url+"/"+id+"/related");
	}

	self.create = function(form) {
		return $http.post(url, form);
	};

	self.update = function(id, form) {
		return $http.put(url+"/"+id, form);
	};

	self.delete = function(id) {
		return $http.delete(url+"/"+id);
	};

	self.featured = function() {
		return $http.get(url+"/featured");
	}

	self.tagged = function(slug) {
		return $http.get(url+"/tagged/"+slug);
	}

	self.featuredInCategory = function(category) {
		return $http.get(url+"/featured?category_id="+category);
	}

	self.recent = function() {
		return $http.get(url+"/recent");
	}

	self.recentInCategory = function(category) {
		return $http.get(url+"/recent?category_id="+category);
	}

	self.comments = function(id) {
		return $http.get(url+"/"+id+"/comments");
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

