'use strict';
angular.module('BigBoomApp').factory('CommonApiRequest',function($http) {
    return {
        handle: function(method,url,data,params){
            return $http({
              method: method,
              url: url,
              data: data,
              params: params
            });
        }
    };
});
