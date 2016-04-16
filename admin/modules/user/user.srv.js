angular.module('BigBoomApp.User').service('UserService',function($http){
	var baseUrl = API_PATH + 'user';

	this.getIndex = function(){
		return $http.get(baseUrl);
	}

	this.postStore = function(userData){
		return $http.post(baseUrl,userData);
	}

	this.getRoles = function(){
		return $http.get(baseUrl + '/roles/' + 1);
	}

	this.postChangeAvatar = function(userData){
		return $http.post(baseUrl + '/change-avatar',userData);
	}

	this.getProfile = function(){
		return $http.get(baseUrl + '/profile/' + 1);
	}

	this.postChangeInformation = function(userData){
		return $http.post(baseUrl + '/change-information',userData);
	}

	this.postChangePassword = function(userData){
		return $http.post(baseUrl + '/change-password',userData);
	}
});