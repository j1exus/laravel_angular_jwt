(function () {

    'use strict';

    angular.module('app.controllers').controller('RestoreController', RestoreController);
    function RestoreController($scope, $state, ToastService, Restangular) {

        $scope.restoredUser = {};
        var toast = {};

        $scope.restore = function () {
            Restangular.all('api/auth/reset').post({email: $scope.restoredUser.email}).then(function (response) {

                    $state.go('login', {message: 'Message have been send. Please, check your email.'});

                })
                .catch(function (response) {
                    switch (response.status) {
                        case 400:
                            $scope.error = "Email not found.";
                            break;
                        default:
                            $scope.error = "Something went wrong. Please, try again latter.";
                    }
                });
        }
    }
})();