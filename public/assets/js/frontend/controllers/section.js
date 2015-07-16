app.controller('SectionCtrl', ['$scope', '$log', '$document', '$page', '$stateParams',
	function($scope, $log, $document, $page, $stateParams) {
		
		$categories = JSON.parse(window.Data.categories);
		$category = $categories.filter(function(category) {
			return category.slug === $stateParams.category
		});

		//set page title
		$page.setPageTitle($category[0].name+" - The Bayelsa Public Square")
	}
]);