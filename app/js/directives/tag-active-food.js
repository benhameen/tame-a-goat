// shop item directive 

module.exports = function(app) {
  app.directive('tagActiveFood', ['FOOD_PROPERTIES', function(FOOD_PROPERTIES) {
    var directive = {
      restrict: 'EAC',
      template: '<div class="active-food"/>',
      scope: {
        food: '=',
        goat: '='
      },
      controller: function($scope, $element, $timeout) {
        
        $scope.$watch( 'food', function() {

          if (!$scope.food)
            return;

          $element.find('.active-food')
          .show()
          .css({
            top: '100px'
          })
          .removeClass().addClass('active-food').addClass($scope.food.name)
          .animate({
            top: '500px',

          }, {
            duration: 1500,
            easing: 'easeInCirc',
            complete: function(){
              $scope.goat.onEatenFood( $scope.food );
              $element.find('.active-food').hide();
              $scope.food = undefined;
            }
          });
        });

      }

    };
    return directive;
  }]);
};
