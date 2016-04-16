'use strict';
angular.module('BigBoomApp').run(function($rootScope) {
    $rootScope.serverApiUrl = 'http://localhost:1337/api/v1/';
    $rootScope.serverApiCommonUrl = 'http://localhost:1337/api/v1/common/';
    $rootScope.serverUrl = 'http://localhost:1337/';
    $rootScope.singleUploadUrl = 'http://localhost:1337/api/v1/common/upload/single';
});
