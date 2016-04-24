'use strict';
angular.module('BigBoomApp').factory('CommonFactory', function($injector, $rootScope,$cookieStore, SweetAlert, $q, $translate,Upload, CommonApiRequest) {
    var singleRemoveFileUrl = $rootScope.serverApiCommonUrl + 'file/remove/single';
    return {
        validateHandle: function(form) {
            var $validationProvider = $injector.get('$validation');
            return $validationProvider.validate(form);
        },
        sweetAlertHandle: function(content) {
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
                    } else {
                        deferred.reject(false);
                    }
                });
            return deferred.promise;
        },

        removeSingleFile: function(path) {
            var deferred = $q.defer();
            CommonApiRequest.handle('POST', singleRemoveFileUrl, { path: path }, '').then(function(response) {
                if (response.data.status) {
                    deferred.resolve(true);
                } else {
                    deferred.reject(false);
                }
            });
            return deferred.promise;
        },

        updateSingleFile: function(file){
            var deferred = $q.defer();
            Upload.upload({
                url: $rootScope.singleUploadUrl,
                data: {
                    file: file
                },
                headers: { 'x-access-token': $cookieStore.get('token') }
            }).then(function(response) {
                deferred.resolve(response.data.data);
            }, function() {
                deferred.reject(response.data.message);
            });
            return deferred.promise;
        }
    };
});
