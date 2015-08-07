app.controller('HelpCtrl', ['$rootScope','$scope', '$log', '$window', '$page', '$auth', '$timeout', '$state',
	function($rootScope, $scope, $log, $window, $page, $auth, $timeout, $state) {

		$page.setPageTitle('Help & FAQs - Bayelsa Public Square');
		$page.addMetaTag('description', 'Help information and frequently asked questions');
		$page.addMetaTag('keywords', "bayelsa, niger-delta, south-south, nigeria, policies, projects, news, programmes, politics, ijaw");

		//Open graph meta tags
		$page.addMetaTag('og:title', 'Help & FAQs - Bayelsa Public Square');
		$page.addMetaTag('og:description', 'Help information and frequently asked questions');
		$page.addMetaTag('og:keywords', "bayelsa, niger-delta, south-south, nigeria, policies, projects, news, programmes, politics, ijaw");

		$scope.goToAnswer = function(target) {

			var $target = $("#"+target);
			$("body").animate({scrollTop: $target.offset().top}, "slow");
		}
	}
]);