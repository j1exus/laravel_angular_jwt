(function () {

    'use strict';

    angular.module('app.controllers').controller('AuthController', AuthController);
    function AuthController($scope, $auth, $state, $stateParams, ToastService) {

        $scope.user = {};
        $scope.error = null;
        var toast = {};

        if ($stateParams.message) {
            toast.content = $stateParams.message;
            ToastService.show(toast);
        }

        $scope.login = function () {

            $auth.login($scope.user).then(function (data) {
                    $state.go('main');
                })
                .catch(function (response) {
                    switch (response.status) {
                        case 401:
                            $scope.error = "Sorry, we couldn't find an account with provided username or password is wrong.";
                            break;
                        case 403:
                            $scope.error = "You account is not verified. Please, check your email. If you have any troubles - please, contact us.";
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