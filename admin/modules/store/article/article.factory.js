'use strict';
angular.module('BigBoomApp.Store').factory('ArticleFactory', function($translate,SweetAlert,$q,CommonApiRequest,$rootScope) {
    var singleRemoveFileUrl = $rootScope.serverApiCommonUrl + 'file/remove/single';
    return {
        sweetAlertHandle: function(content){
            var deferred = $q.defer();
            SweetAlert.swal({
                title: $translate.instant('LABEL.ARE_YOU_SURE'),
                text: $translate.instant(content),
                type: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#DD6B55',
                confirmButtonText: $translate.instant('LABEL.IM_SURE'),
                closeOnConfirm: false
            },
            function(isConfirm) {
                if (isConfirm) {
                    deferred.resolve(true);
                }else{
                    deferred.reject(false);
                }
            });
            return deferred.promise;
        },

        removeSingleFile: function(path){
            var deferred = $q.defer();
            CommonApiRequest.handle('POST', singleRemoveFileUrl, {path:path}, '').then(function(response) {
                if (response.data.status) {
                    deferred.resolve(true);
                } else {
                    deferred.reject(false);
                }
            });
            return deferred.promise;
        }
    };
});
