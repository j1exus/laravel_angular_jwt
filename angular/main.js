(function () {
    "use strict";

    var app = angular.module('app',
        [
            'app.controllers',
            'app.filters',
            'app.services',
            'app.directives',
            'app.routes',
            'app.config',
            'app.run'
        ]);

    angular.module('app.routes', ['ui.router', 'satellizer']);
    angular.module('app.controllers', ['ngMaterial', 'ui.router', 'restangular', 'satellizer', 'ngMessages']);
    angular.module('app.filters', []);
    angular.module('app.services', []);
    angular.module('app.directives', []);
    angular.module('app.config', ['ngMaterial']);
    angular.module('app.run', ['ui.router', 'satellizer']);

})(); 