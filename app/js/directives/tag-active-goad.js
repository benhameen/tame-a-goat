// shop item directive 

module.exports = function(app) {
  app.directive('tagActiveGoad', ['GOAD_PROPS', function(GOAD_PROPS) {
    var directive = {
      restrict: 'EAC',
      scope: {
        world: '=',
        goat: '=',
        goading: '=',
        total: '='
      },
      controller: function($scope, $element, $timeout) {

        $scope.$watch('goading', function() {
          if (!$scope.goading) return;

          $scope.pickGoad();
        });
        
        //- onClick add money in world.bank and piss the goat off (happiness drop, hungry goes up)
        //- also animate goad to attack goat
        $scope.pickGoad = function () {

          if ( $scope.annoy )
            return;

          $scope.annoy = true;

          $element
          .show()
          .animate({
            top: '200px',
            left: '200px',

          }, {
            duration: 800,
            easing: 'easeInCirc',
            complete: function(){
                $element
                .animate({
                  top: '100px',
                  left: '25px',
                }, {
                  complete: function(){
                    $scope.annoy = false;
                    $scope.goading = false;
                  }
                });

                $scope.world.bank += GOAD_PROPS[0];
                $scope.total += GOAD_PROPS[0];
                $scope.goat.moodMeter.happiness += GOAD_PROPS[1];
                $scope.goat.moodMeter.hunger += GOAD_PROPS[2];
                if ($scope.goat.moodMeter.hunger > 100)
                {
                  $scope.goat.moodMeter.hunger = 100;
                }

            }
          });

        };

      }

    };
    return directive;
  }]);
};
