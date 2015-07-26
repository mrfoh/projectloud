app.factory('$page', ['$window', '$localStorage', '$document', function ($window, $localStorage, $document) {

	var self = this;

	self.setPageTitle = function (title) {
		$document[0].title = title;
	}

	self.addMetaTag = function (name, content) {
		var head = $document[0].getElementsByTagName('head')[0];
		var tag = $document[0].createElement("meta");
			tag.setAttribute('property', name);
			tag.setAttribute('content', content);

		head.appendChild(tag);
	}

	return self;
}]);
