(function () {
    "use strict";

    angular.module('app.routes').config(function ($stateProvider, $urlRouterProvider, $authProvider, $locationProvider) {

        $authProvider.loginUrl = '/api/auth/login';
        $authProvider.signupUrl = '/api/auth/register';
        $locationProvider.html5Mode(true);
        var getView = function (viewName) {
            return '/views/app/' + viewName + '/' + viewName + '.html';
        };

        $urlRouterProvider.otherwise('/');

        $stateProvider
            .state('main', {
                url: '/',
                views: {
                    header: {
                        templateUrl: getView('header')
                    },
                    main: {
                        templateUrl: getView('main')
                    },
                    footer: {
                        templateUrl: getView('footer')
                    }
                },
                data: {requiredLogin: true}
            })
            .state('login', {
                url: '/login',
                views: {
                    main: {
                        templateUrl: getView('login')
                    }
                },
                params: {
                    message: null //message to display in toast, for example about successfull verification
                },
                data: {
                    requiredLogin: false,
                }
            })
            .state('register', {
                url: '/register',
                views: {
                    main: {
                        templateUrl: getView('register')
                    }
                },
                data: {requiredLogin: false}
            })
            .state('verificationsent', {
                views: {
                    main: {
                        templateUrl: getView('verificationsent')
                    }
                },
                data: {requiredLogin: false}
            })
            .state('verify', {
                url: '/verify/:code',
                views: {
                    main: {
                        templateUrl: getView('verify')
                    }
                },
                data: {requiredLogin: false},
            })
            .state('passwordrestore', {
                url: '/password/restore',
                views: {
                    main: {
                        templateUrl: getView('passwordrestore')
                    }
                },
                data: {requiredLogin: false}
            })
            .state('passwordreset', {
                url: '/password/:code',
                views: {
                    main: {
                        templateUrl: getView('passwordreset')
                    }
                },
                data: {requiredLogin: false},
            });

        $locationProvider.html5Mode(true);

    });
})();