// shop item directive 

module.exports = function(app) {
  app.directive('tagShopFood', ['FOOD_PROPERTIES', function(FOOD_PROPERTIES) {
    var directive = {
      restrict: 'EAC',
      templateUrl: 'views/tag-shop-food.html',
      scope: {
        itemname: '=',
        properties: '=',
        money: '=',
        goat: '=',
        goateating:'='
      },
      controller: function($scope, $element, $timeout) {
        $scope.purchaseFood = function(foodname, amount) {
          var price = $scope.properties.price * (amount || 1);
          if ($scope.canBuyFood(foodname, amount)) {
            $scope.money -= price;
            $scope.properties.price = $scope.properties.price * 1.15;
            $scope.goat.feed(foodname);
          }
        };

        $scope.canBuyFood = function(foodname, amount) {
          amount = amount || 1;
          var food = $scope.properties;
          return $scope.money >= food.price * amount;
        };

        $scope.getMeterColor = function(mood) {
          return $scope.moodColorMap[mood];
        };


        $scope.sufficientFunds = function(itemname, amount) {
          var item = $scope.properties;
          var sufficientFunds = $scope.money >= item.price;
          return sufficientFunds;
        };

        $scope.moodColorMap = {
          'happiness': 'green',
          'hunger': 'yellow',
          'weight': 'blue',
          'health': 'red'
        };
      }
    };
    return directive;
  }]);
};
