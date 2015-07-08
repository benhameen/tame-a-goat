module.exports = function(app) {
	app.filter('reverse', function() {
		return function(items) {
			if (items) return items.slice().reverse();
		};
	});
};
