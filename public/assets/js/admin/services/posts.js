// A RESTful factory for accessing posts
app.factory('posts', ['$http', '$window', function ($http, $window) {

	var self = this,
	url = $window.Bps.Config.apiUrl+"posts"; //API Endpoint

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

	self.create = function(form) {
		return $http.post(url, form);
	};

	self.update = function(id, form) {
		return $http.put(url+"/"+id, form);
	};

	self.feature = function(id) {
		return $http.get(url+"/"+id+"/feature");
	}

	self.unfeature = function(id) {
		return $http.get(url+"/"+id+"/unfeature");
	}

	self.delete = function(id) {
		return $http.delete(url+"/"+id);
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

