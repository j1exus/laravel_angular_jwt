(function () {

    'use strict';

    angular.module('app.controllers').controller('PasswordResetController', PasswordResetController);
    function PasswordResetController($scope, $state, $stateParams, Restangular) {

        $scope.passwordReset = function () {
            $scope.User.token = $stateParams.code;
            console.log($scope.User);
            Restangular.all('api/auth/resetconfirm').post($scope.User).then(function (response) {

                    $state.go('login', {message: 'Your password has been changed!'});

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

    }

})();