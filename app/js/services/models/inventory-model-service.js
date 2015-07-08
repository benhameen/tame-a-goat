/*
  Global Model, 
  This holds all of our top level data for the inventory.
*/


module.exports = function(app) {
  app.factory('inventoryModel', function(uuid4) {

    /*
    Constructor, with class name
    */
    function Inventory(data) {
      this.tractor = data.tractor || 0;
      this.barn = data.barn || 0;
      this.rake = data.rake || 0;
      this.shovel = data.shovel || 0;
      this.silo = data.silo || 0;
      this.harvester = data.harvester || 0;
      this.coop = data.coop || 0;
    }

    Inventory.prototype.add = function(key, amount) {
        this[key] = this[key] || 0;
        this[key] += amount || 1;
    };

    /*
    PROTOTYPE METHODS
    refer to inventory as 'this'
    */
  

    // returns fresh inventory object
    Inventory.build = function (data) {
      var d = data || {};
      return new Inventory(d);
    };

    /**
    * Return the constructor function
    */
    return Inventory;

 });
};
