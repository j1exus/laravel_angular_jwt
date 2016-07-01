(function () {

    'use strict';

    angular.module('app.controllers').controller('HeaderController', HeaderController);
    function HeaderController($scope, $auth, $state) {

        $scope.logout = function () {
            $auth.logout();
            $state.go('login');
        }

        var originatorEv;
        $scope.openMenu = function ($mdOpenMenu, ev) {
            originatorEv = ev;
            $mdOpenMenu(ev);
        };
    }

})();