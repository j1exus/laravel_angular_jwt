(function () {

    'use strict';

    angular.module('app.controllers').controller('RegisterController', RegisterController);
    function RegisterController($scope, $auth, $state) { //, ToastService

        $scope.newUser = {};
        $scope.error = null;

        $scope.register = function () {
            $scope.error = null;
            $auth.signup($scope.newUser).then(function (response) {

                    $state.go('verificationsent', {'email': $scope.newUser.email});
                })
                .catch(function (response) {
                    switch (response.status) {
                        case 409:
                            $scope.error = "User with given email already exists.";
                            break;
                        case 500:
                            $scope.error = "Internal server error.";
                            break;
                        default:
                            $scope.error = "Something went wrong. Please, try again latter.";
                    }
                });
        }
    }

})();