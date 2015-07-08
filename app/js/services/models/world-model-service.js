/*
  Global Model, 
  This holds all of our top level data for the world.
*/


module.exports = function(app) {
  app.factory('worldModel', function(farmModel, goatModel, inventoryModel) {

    /**
    * Constructor, with class name
    */
    function World(data) {
      this.goat = goatModel.build();
      this.farm = farmModel.build();
      this.inventory = inventoryModel.build();
      this.bank = 50;
    }

    // World.prototype.addElevator = function () {
    //   var e = elevatorModel.build();

    //   this.elevators.push(e);
    // };

    /**
    * Static method, assigned to class
    * Instance ('this') is not available in static context
    */

    World.build = function (data) {
      var d = data || {};
      return new World(d);
    };

    /**
    * Return the constructor function
    */
    return World;

 });
};
