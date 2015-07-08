/*	
	GLOBAL CONTROLLER FOR THE ROOT LEVEL OF THE APPLICATION
*/

module.exports = function(app) {

	app.controller('ApplicationCtrl', ['$scope', '$routeParams', 'farmModel',
		function($scope, $routeParams, farmModel) {
      console.log('[APPLICATIONCTRL]');

			// init farm
		}
	 ]);
};
