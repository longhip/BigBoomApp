'use strict';
angular.module('BigBoomApp.User').factory('UserFactory', function($injector){
  return {
      validator: function(form){
        var status;
        var $validationProvider = $injector.get('$validation');
        $validationProvider.validate(form).success(function(){
          status = true;
        }).error(function(){
          status = false;
        });
        return status;
      }
  };
});


