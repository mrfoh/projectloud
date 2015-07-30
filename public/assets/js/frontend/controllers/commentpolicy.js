app.controller('CommentPolicyCtrl', ['$rootScope','$scope', '$log', '$document', '$page', '$auth', '$timeout', '$state',
	function($rootScope, $scope, $log, $document, $page, $auth, $timeout, $state) {

		$page.setPageTitle('Comment Policy - Bayelsa Public Square');
		$page.addMetaTag('description', 'Learn about the Bayelsa Public Square\'s comment policy and commenting guidelines');
		//Open graph meta tags
		$page.addMetaTag('og:title', 'Comment Policy - Bayelsa Public Square');
		$page.addMetaTag('og:description', 'Learn about the Bayelsa Public Square\'s comment policy and commenting guidelines');
	}
]);