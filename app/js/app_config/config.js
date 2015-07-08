//routes config

module.exports = function(app) {

	app.config(['$routeProvider','$sceProvider',
		function($routeProvider,$sceProvider) {
			$routeProvider.when('/', {
				templateUrl: 'views/main.html',
				controller: 'MainCtrl'
			}).otherwise({
				redirectTo: '/'
			});
		}
	]);

	app.constant(

    'FOOD_PROPERTIES', {
      'medicine' : {
        'name' : 'medicine',
        'price' : 100,
        'weight' : -0.1,
        'happiness' : -0.2,
        'hunger' : -0.45,
        'health' : 20
      },

      'pizza' : {
      	'name' : 'pizza',
        'price' : 2.5,
        'weight' : 8,
        'happiness' : 4,
        'hunger' : -12,
        'health' : -7
      },

      'oats' : {
        'name' : 'oats',
        'price' : 20,
        'weight' : 5,
        'happiness' : 1.3,
        'hunger' : -10,
        'health' : 5
      },

      'barley' : {
        'name' : 'barley',
        'price' : 10,
        'weight' : 4.3,
        'happiness' : -2,
        'hunger' : -8,
        'health' : 4
      },

      'ice-cream' : {
        'name' : 'ice-cream',
        'price' : 1.5,
        'weight' : 7.6,
        'happiness' : 4.6,
        'hunger' : -3,
        'health' : -5
      },

      'boot' : {
        'name' : 'boot',
        'price' : 0.30,
        'weight' : -2,
        'happiness' : -2.4,
        'hunger' : -4,
        'health' : -0.2
      },

      'can' : {
      	'name' : 'can',
      	'price' : 0.10,
      	'weight' : -5,
      	'happiness' : -1.8,
      	'hunger' : -2,
      	'health' : -0.5
      }
    }
  );

  app.constant(
  	'FOOD_LIST', [
  	  'can', 'boot', 'ice-cream', 'oats', 'barley', 'pizza', 'medicine'
  	]
  );

  app.constant(
    'EQUIPMENT_PROPERTIES', {
      'barn' : {
        'price' : 300000,
        'profit' : 2000,
        'limit' : 200
      },

      'tractor' : {
        'price' : 20000,
        'profit' : 100,
        'limit' : 1000
      },

      'harvester' : {
        'price' : 10000,
        'profit' : 50,
        'limit' : 5000
      },

      'silo' : {
        'price' : 3000,
        'profit' : 10,
        'limit' : 30000
      },

      'coop' : {
        'price' : 500,
        'profit' : 1.5,
        'limit' : 100000
      },

      'shovel' : {
        'price' : 80,
        'profit' : 0.30,
        "limit" : 250000
      },

      'rake' : {
        'price' : 10,
        'profit' : 0.15,
        'limit' : 2000000
      }
    }
  );

  app.constant(
    'EQUIPMENT_LIST', [
      'rake', 'shovel', 'coop', 'silo', 'harvester', 'tractor', 'barn'
    ]
  );

  app.constant(
    'GOAT_MOODS', [
      'happiness', 'hunger', 'weight', 'health'
    ]
  );

  app.constant(
    'GOAD_PROPS', [
      50, -5, 5,
    ]
  );

	//end config
};
