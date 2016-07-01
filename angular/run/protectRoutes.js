(function () {
    "use strict";

    angular.module('app.run').run(function ($rootScope, $state, $auth) {
        $rootScope.$on('$stateChangeStart',
            function (event, toState) {
                var requiredLogin = false;
                // check if this state need login
                if (toState.data && toState.data.requiredLogin)
                    requiredLogin = true;

                // if yes and if this user is not logged in, redirect him to login page
                if (requiredLogin && !$auth.isAuthenticated()) {
                    event.preventDefault();
                    $state.go('login');
                }
                // if no and if this user is logged in, redirect him to main page
                if (!requiredLogin && $auth.isAuthenticated()) {
                    event.preventDefault();
                    $state.go('main');
                }

            });
    });


})();
