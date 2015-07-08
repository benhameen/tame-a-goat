require('angular/angular.min');
require('angular-route/angular-route.min');
require('angular-uuid4/angular-uuid4.min');
require('jquery-ui/jquery-ui.min');
require('angular-ui-sortable/sortable.min');
// require('angular-bootstrap/ui-bootstrap.min');
require('angular-bootstrap/ui-bootstrap-tpls.min');
require('angular-prompt/dist/angular-prompt.min');
require('angular-ui-select/dist/select.min');
require('angular-sanitize/angular-sanitize.min');


var TameAGoat = angular.module('TameAGoat', ['ngRoute', 'uuid4', 'ui.sortable', 'ui.select', 'ui.bootstrap', 'cgPrompt', 'ngSanitize']);

// controller(s) 
require('./controllers/application-controller')(TameAGoat);
require('./controllers/main-controller')(TameAGoat);


// models
require('./services/models/farm-model-service')(TameAGoat);
require('./services/models/goat-model-service')(TameAGoat);
require('./services/models/inventory-model-service')(TameAGoat);
require('./services/models/world-model-service')(TameAGoat);

// services
// require('./services/')(TameAGoat);

// directive(s) 
require('./directives/scale-box')(TameAGoat);
require('./directives/tag-shop-equipment')(TameAGoat);
require('./directives/tag-shop-food')(TameAGoat);
require('./directives/tag-active-food')(TameAGoat);
require('./directives/tag-active-goad')(TameAGoat);

//config
require('./app_config/config')(TameAGoat);

//filters
require('./app_config/filters')(TameAGoat);
