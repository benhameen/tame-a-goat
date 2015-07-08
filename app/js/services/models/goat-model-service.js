/*
  Global Model, 
  This holds all of our top level data for the goat.
*/

function clamp( data, min, max )
{
    if ( data > max )
    {
         data = max;
    }
    
    if ( data < min )
    {
         data = min;
    }

    return data;
}

module.exports = function(app) {
  app.factory('goatModel', ['FOOD_PROPERTIES', function(FOOD_PROPERTIES) {

    var goatStates = {

        SKINNY :    'skinny',
        FAT :       'fat',
        FIT :       'fit',

        SAD :       'sad',
        NORMAL :    'normal',
        ANGRY :     'angry',
        HAPPY :     'happy',
        ILL :       'ill',
        CONTENT :   'content',
        HUNGRY :    'hungry'

    };

    /*
    Constructor, with class name
    */
    function Goat(data) {
      this.name = data.name || "Frank";
      this.moodMeter = {
         'happiness': 50,
         'hunger': 50,
         'weight': 50,
         'health': 50
      };

      this.apparel = {
        'head': 'top',
        'body': 'leathercoat',
        'legs': 'cufflings',
        'tail': 'flaming',
        'face': 'thegreenmask'
      };

      this.currFeed = false;
    }

    /*
    PROTOTYPE METHODS
    refer to goat as 'this'
    */
    
    Goat.prototype.feed = function (foodname) {
        var food = FOOD_PROPERTIES[foodname];

        this.foodToEat = food;
        this.currFeed = true;
    };

    Goat.prototype.feeding = function () {
        return this.currFeed;
    };

    Goat.prototype.onEatenFood = function(food) {
        this.moodMeter.happiness += food.happiness;
        this.moodMeter.hunger += food.hunger;
        this.moodMeter.weight += food.weight;
        this.moodMeter.health += food.health;

        this.currFeed = false;
        this.foodToEat = undefined;
    };

    Goat.prototype.damage = function ( ) {

        var totalDamage = 0;

        for( var i = 0; i < 5; ++i )
        {
    	    totalDamage += this.moodMeter[i];
        }

        return totalDamage;

    };

    Goat.prototype.getHeadState = function () {

        var currentState = 0;

        var mood = this.moodMeter;

        // Priority of states:
        // Ill
        // Angry
        // Sad
        // Happy
         
        if (mood.health < 20) {
            currentState = goatStates.ILL;
        } else if (mood.happiness < 40 && mood.hunger > 75) {
            currentState = goatStates.ANGRY;
        } else if (mood.happiness < 40) {
            currentState = goatStates.SAD;
        } else if (mood.happiness > 70) {
            currentState = goatStates.HAPPY;
        } else {
            currentState = goatStates.CONTENT;
        }

        return currentState;

    };

    Goat.prototype.getBodyState = function () {

        var currentState = 0;

        if ( this.moodMeter.weight > 75 )
        {
            currentState = goatStates.FAT;
        }
        else if ( this.moodMeter.weight < 25 )
        {
            currentState = goatStates.SKINNY;
        }
        else
        {
            currentState = goatStates.FIT;
        }

        return currentState;
    };

    Goat.prototype.updateState = function () {

        var weightRate = 0;
        var happinessRate = 0;
        var hungryRate = 0;
        var healthRate = 0;
        var universalFactor = 0.001;

        // Gains weight when full, loses weight when hungry
        weightRate = -this.moodMeter.hunger;

        // Gains happiness when fat
        happinessRate += this.moodMeter.weight * this.moodMeter.weight / 2;

        // Loses happiness when hungry
        if (this.moodMeter.hunger > 40) {
            var damagingHunger = this.moodMeter.hunger - 40;

            happinessRate -= damagingHunger * damagingHunger;
        }

        // Becomes happy when healthy, or sad when unhealthy
        var healthDifference = 50 - this.moodMeter.health;
        if (this.moodMeter.health < 50) {
            happinessRate -= healthDifference * healthDifference;
        } else {
            happinessRate += healthDifference * healthDifference;
        }
        
        // Becomes more hungry over time
        hungryRate = 300;

        // Becomes more healthy when happy
        healthRate += this.moodMeter.happiness / 2;

        // Becomes less healthy if skinny or fat
        healthRate -= (this.moodMeter.weight - 50) * (this.moodMeter.weight - 50) / 2;

        this.moodMeter.weight += weightRate * universalFactor;
        this.moodMeter.happiness += happinessRate * universalFactor;
        this.moodMeter.hunger += hungryRate * universalFactor;
        this.moodMeter.health += healthRate * universalFactor;

        this.moodMeter.weight = clamp( this.moodMeter.weight, 0 , 100 );
        this.moodMeter.happiness = clamp( this.moodMeter.happiness, 0 , 100 );
        this.moodMeter.hunger = clamp( this.moodMeter.hunger, 0 , 100 );
        this.moodMeter.health = clamp( this.moodMeter.health, 0 , 100 );
    };

    // returns fresh goat object
    Goat.build = function (data) {
      var d = data || {};
      return new Goat(d);
    };

    /**
    * Return the constructor function
    */
    return Goat;

 }]);
};


