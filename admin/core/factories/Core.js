(function() {
	'use strict';

	angular
	  	.module('BigBoomApp')
	  	.factory('Core', Core);

	function Core($rootScope,$timeout,$q,$http,$state,$injector,SweetAlert,$uibModal,$translate,toasty,Upload,$cookieStore) {
		return {
            // bundle these so util clients don't have to get them
           	$q      					: $q,
            $rootScope      			: $rootScope,
            $timeout                    : $timeout,
            $cookieStore                : $cookieStore,
            $translate                  : $translate,
            $uibModal                   : $uibModal,
            $state 				        : $state,
            apiRequest                  : apiRequest,
            Upload 			            : Upload,
            isNumber                    : isNumber,
            textContains                : textContains,
            validateHandle              : validateHandle,
            sweetAlertHandle            : sweetAlertHandle,
            removeSingleFile            : removeSingleFile,
            uploadSingleFile            : uploadSingleFile,
            toastyPopSuccess            : toastyPopSuccess,
            toastyPopErrors             : toastyPopErrors,
            sweetAlert                  : SweetAlert,
            // actual utilities
            $broadcast: $broadcast,
	    };
		function $broadcast() {
            return $rootScope.$broadcast.apply($rootScope, arguments);
        }

        function isNumber(val) {
            return (/^[-]?\d+$/).test(val);
        }

        function textContains(text, searchText) {
            return text && -1 !== text.toLowerCase().indexOf(searchText.toLowerCase());
        }

        function apiRequest(method,url,data,params){
            return $http({
              method: method,
              url: url,
              data: data,
              params: params
            });
        }

        function validateHandle(form) {
            var $validationProvider = $injector.get('$validation');
            return $validationProvider.validate(form);
        }
        function sweetAlertHandle(content) {
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
        }
        function removeSingleFile(path) {
            var deferred = $q.defer();
            apiRequest('POST', $rootScope.singleRemoveUrl, { path: path }, '').then(function(response) {
                if (response.data.status) {
                    deferred.resolve(true);
                } else {
                    deferred.reject(false);
                }
            });
            return deferred.promise;
        }
        function uploadSingleFile(file){
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
        function toastyPopSuccess(message){
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
        }
        function toastyPopErrors(message){
            toasty.error({
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
        }
	}
    
})();