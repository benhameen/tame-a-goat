/*
  Global Model, 
  This holds all of our top level data for the farm.
*/


module.exports = function(app) {
  app.factory('farmModel', function() {

    /**
    * Constructor, with class name
    */
    function Farm(data) {
      this.weather = 'sunny';

    }

    // Farm.prototype.addElevator = function () {
    //   var e = elevatorModel.build();

    //   this.elevators.push(e);
    // };

    /**
    * Static method, assigned to class
    * Instance ('this') is not available in static context
    */

    Farm.build = function (data) {
      var d = data || {};
      return new Farm(d);
    };

    /**
    * Return the constructor function
    */
    return Farm;

 });
};
