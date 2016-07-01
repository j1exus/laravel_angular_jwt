(function () {

    'use strict';

    angular.module('app.controllers').controller('VerifyController', VerifyController);
    function VerifyController($scope, $state, $stateParams, Restangular) {

        Restangular.all('api/auth/verify').post({confirmationcode: $stateParams.code}).then(function (response) {

                $state.go('login', {message: 'Thank you! You account has been activated!'});

            })
            .catch(function (response) {
                switch (response.status) {
                    case 400:
                        $scope.error = "Invalid confirmation code.";
                        break;
                    default:
                        $scope.error = "Something went wrong. Please, try again latter.";
                }
            });
    }

})();