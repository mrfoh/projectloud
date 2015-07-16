app.controller('CategoriesCtrl', ['$scope', 'categories', '$filter', 'toaster', '$log', '$document',
	function($scope, categories , $filter, toaster, $log, $document) {
	//set view title
	$document[0].title = "Categories - BPS Admin";
	//query
	$scope.query;
	//categories
	$scope.categories = [];
	//show status
	$scope.statusShow = true;
	//status text
  	$scope.statusText = "";

  	$scope.selectItem = function(item){    

      angular.forEach($scope.categories, function(item) {
         item.selected = false;
         item.editing = false;
      });

      $scope.item = item;
      $scope.item.selected = true;
    };

    $scope.editItem = function(item){
      $scope.mode = "edit";
      if(item && item.selected){
         item.editing = true;
      }
    };

    $scope.createItem = function() {
      $scope.item = { name: '', description:'', keywords: ''};
      $scope.item.editing = true;
      $scope.mode = "create";
  	};


  	$scope.doneEditing = function(item){
      //Show wait toast
      toaster.clear();
      toaster.pop('wait','Status','Saving', 0);

      //form data
      var form = { name: $scope.item.name, description: $scope.item.description, keywords: $scope.item.keywords };
   
      if($scope.mode == "edit")
      {
         //ajax request
         categories.update(item.id, form)
         .success(function (response) {
            //clear toast
            toaster.clear()

            if(response.data) {
               $scope.item = response.data;

               toaster.pop('success', "Success", "Category updated successfully", 3000);
            }

            item.editing = false;
         });
      }
      else if($scope.mode == "create")
      {
         //ajax request
         categories.create(form)
         .success(function (response) {
            //clear toast
            toaster.clear()

            if(response.data) {
               $scope.categories.push(response.data);

               toaster.pop('success',"Success", "Category saved successfully", 3000);
            }

            $scope.item.editing = false;
            $scope.selectItem(response.data);
         });
      }
    };
	
	$scope.fetch = function() {
      $scope.statusText = "Loading..."

      categories.all()
      .success(function (response) {
         if(response.data.length > 0) {
            $scope.categories = response.data
            $scope.statusShow = false;

            $scope.item = $filter('orderBy')($scope.categories, 'name')[0];
            $scope.item.selected = true;
         }
         else {

            $scope.statusShow = true;
            $scope.statusText = "No categories to display";
         }
      });
    };

	$scope.$on('fetch:categories', $scope.fetch);
	$scope.$broadcast('fetch:categories');
}]);