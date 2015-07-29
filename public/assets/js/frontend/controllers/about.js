app.controller('AboutCtrl', ['$rootScope','$scope', '$log', '$document', '$page', '$auth', '$timeout', '$state',
	function($rootScope, $scope, $log, $document, $page, $auth, $timeout, $state) {

		$page.setPageTitle('About - Bayelsa Public Square');
		$page.addMetaTag('description', 'Learn about The Bayelsa Public Square');
		//Open graph meta tags
		$page.addMetaTag('og:title', 'About - Bayelsa Public Square');
		$page.addMetaTag('og:description', 'Learn about The Bayelsa Public Square');
	}
]);