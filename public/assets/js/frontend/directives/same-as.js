angular.module('app')
.directive('sameAs', [function() {
  return {
    require: 'ngModel',
    restrict: 'A',
    link: function(scope, element, attrs, ctrl) {
      var modelToMatch = attrs.toMatch;
      console.log(modelToMatch)
      ctrl.$validators.match = function(modelValue, viewValue) {
        return viewValue == scope.$eval(modelToMatch);
      };
    }
  };
}])