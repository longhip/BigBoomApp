'use strict';
angular.module('BigBoomApp').factory('Toasty',function(toasty,$translate) {
    return {
        popSuccess : function(message) {
            toasty.success({
                title: $translate.instant('MESSAGE.SUCCESS'),
                msg: $translate.instant(message),
                showClose: true,
                clickToClose: false,
                timeout: 5000,
                sound: true,
                html: false,
                shake: false,
                theme: "default"
            });
        },
        popErrors : function(message) {
            toasty.error({
                title: $translate.instant('MESSAGE.FAILED'),
                msg: $translate.instant(message),
                showClose: true,
                clickToClose: false,
                timeout: 5000,
                sound: true,
                html: false,
                shake: false,
                theme: "default"
            });
        }
    };
});
