(function () {
    "use strict";

    angular.module("app.services").factory('ToastService', function ($mdToast) {

        return {
            show: function (data) {
                data.content = data.content || null;
                data.delay = (data.delay === undefined) ? 6000 : data.delay;
                data.position = data.position || 'top right';
                data.action = data.action || null;
                data.templateUrl = data.templateUrl || null;
                data.controller = data.controller || null;

                if (data.templateUrl === null) {
                    return $mdToast.show(
                        $mdToast.simple()
                            .content(data.content)
                            .position(data.position)
                            .action(data.action)
                            .hideDelay(data.delay)
                    );
                } else {
                    return $mdToast.show({
                        hideDelay: data.delay,
                        position: data.position,
                        templateUrl: getToast(data.templateUrl),
                        controller: data.controller,
                        locals: {
                            text: data.content
                        }
                    });
                }
            }
        };
    });
})();