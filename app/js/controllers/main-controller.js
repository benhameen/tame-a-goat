/*  
  GLOBAL CONTROLLER FOR THE ROOT LEVEL OF THE APPLICATION
*/

module.exports = function(app) {

  app.controller('MainCtrl', ['$scope', '$routeParams', '$timeout', '$interval', 'worldModel', 'GOAT_MOODS', 'EQUIPMENT_PROPERTIES', 'FOOD_PROPERTIES', 'EQUIPMENT_LIST', 'FOOD_LIST',
    function($scope, $routeParams, $timeout, $interval, worldModel, GOAT_MOODS, EQUIPMENT_PROPERTIES, FOOD_PROPERTIES, EQUIPMENT_LIST, FOOD_LIST) {
      console.log('[MAINCTRL]');

      $scope.world = worldModel.build();

      function calculateProfit() {
        var base = 0;

        angular.forEach($scope.world.inventory, function(value, key) {
          base += EQUIPMENT_PROPERTIES[key].profit * value;
        });

        if ($scope.world.goat.getHeadState() === 'angry') {
          base *= 0.6;
        }

        return base;
      }

      function checkGoatLife() {
        var meter = $scope.world.goat.moodMeter;
        return !meter.weight || !meter.happiness || (meter.hunger === 100) || !meter.health;
      }

      $interval(function() {
        $scope.tick();
      }, 500);

      $scope.tick = function() {
        if ($scope.goatIsDead) return;
        $scope.profit = calculateProfit();
        $scope.world.goat.updateState();
        $scope.damage = $scope.world.goat.damage();
        $scope.bodyState = $scope.world.goat.getBodyState();
        $scope.headState = $scope.world.goat.getHeadState();
        $scope.weight = $scope.world.goat.moodMeter.weight;
        $scope.happiness = $scope.world.goat.moodMeter.happiness;
        $scope.hunger = $scope.world.goat.moodMeter.hunger;
        $scope.health = $scope.world.goat.moodMeter.health;
        $scope.world.bank += $scope.profit;
        $scope.totalEarned = $scope.totalEarned || 0;
        $scope.totalEarned += $scope.profit;
        $scope.goatIsDead = checkGoatLife();
      };

      $scope.typeof = function(item) {
        return typeof(item);
      };

      $scope.getMeterWidth = function(mood) {
        var w = $scope.world.goat.moodMeter[mood];
        return {width: w + '%'};
      };

      $scope.getMeterColor = function(mood) {
        return $scope.moodColorMap[mood];
      };

      $scope.sortByPrice = function(key) {
        console.log('key',key);
        return $scope.equipmentProperties[key].price;
      };

      $scope.restart = function() {
        window.location.reload();
      };

      $scope.startGoad = function() {
        $scope.goading = $scope.goading || true;
      };
      
      $scope.goatMoods = GOAT_MOODS;
      $scope.foodProperties = FOOD_PROPERTIES;
      $scope.equipmentProperties = EQUIPMENT_PROPERTIES;
      $scope.equipmentList = EQUIPMENT_LIST;
      $scope.foodList = FOOD_LIST;
      $scope.activePanel = 'food';
      $scope.moodColorMap = {
        'happiness': 'green',
        'hunger': 'yellow',
        'weight': 'blue',
        'health': 'red'
      };
    }
  ]);
};
