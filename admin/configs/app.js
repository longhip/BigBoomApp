'use strict';
angular.module('BigBoomApp').run(function($rootScope) {
    $rootScope.serverApiUrl = 'http://localhost:1337/api/v1/';
    $rootScope.serverUrl = 'http://localhost:1337/';
    $rootScope.singleUploadUrl = 'http://localhost:1337/api/v1/common/upload/single';
    $rootScope.singleRemoveUrl = 'http://localhost:1337/api/v1/common/file/remove/single';
});
