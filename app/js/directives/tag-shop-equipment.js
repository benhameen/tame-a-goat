// shop item directive 

module.exports = function(app) {
  app.directive('tagShopEquipment', [function() {
    var directive = {
      restrict: 'EAC',
      templateUrl: 'views/tag-shop-equipment.html',
      scope: {
        itemname: '=',
        properties: '=',
        count: '=',
        money: '=',
        inventory: '='
      },
      controller: function($scope, $element, $timeout) {
        $scope.purchaseEquipment = function(itemname, amount) {
          var price = $scope.properties.price * (amount || 1);
          if ($scope.canBuyItem(itemname, amount)) {
            $scope.money -= price;
            $scope.properties.price = $scope.properties.price * 1.05;
            $scope.inventory.add(itemname, amount);
          }
        };

        $scope.canBuyItem = function(itemname, amount) {
          amount = amount || 1;
          var item = $scope.properties;
          var sufficientFunds = $scope.money >= item.price * amount;
          var limitReached = $scope.count >= item.limit;
          return sufficientFunds && !limitReached;
        };

        $scope.sufficientFunds = function(itemname, amount) {
          var item = $scope.properties;
          var sufficientFunds = $scope.money >= item.price;
          return sufficientFunds;
        };
      }
    };
    return directive;
  }]);
};
