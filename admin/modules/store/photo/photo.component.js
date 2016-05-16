(function() {
	'use strict';

	angular
	  	.module('BigBoomApp.Store')
	  	.controller('PhotoController', PhotoController);


	function PhotoController(Core) {

		var vm = this;

        function __construct(){
            vm.albums = [];
            vm.photos = [];
            vm.moduleApiUrl = Core.$rootScope.serverApiUrl + 'store/photo';
        }
        __construct();

        vm.index = function(){
            Core.apiRequest('GET', vm.moduleApiUrl,'','').then(function(response){
                if(response.data.status){
                    vm.albums = response.data.data.albums;
                    vm.photos = response.data.data.photos;
                } else {

                }
            });
        };

		/*
          |--------------------------------------------------------------------------
          | GET CREATE NEW ALBUM (OPEN MODAL)
          |--------------------------------------------------------------------------
        */

		vm.createAlbum = function(){
            var modalInstance = Core.$uibModal.open({
                animation: true,
                templateUrl		: 'modules/store/photo/album/create.view.html',
                controller 		: 'AlbumModalController as vm',
                windowClass 	: 'app-modal-full-width',
                resolve: {
                        AlbumInstance: function () {
                            return null;
                        }
                    }
                });
                modalInstance.result.then(function (album) {
                    if(album){
                        vm.albums.push(album);
                    }
                }, function () {
                  
            }); 
        };

        vm.editAlbum = function(album){
            var index = vm.albums.indexOf(album);
            var modalInstance = Core.$uibModal.open({
                animation: true,
                templateUrl     : 'modules/store/photo/album/edit.view.html',
                controller      : 'AlbumModalController as vm',
                windowClass     : 'app-modal-full-width',
                resolve: {
                        AlbumInstance: function () {
                            return album;
                        }
                    }
                });
                modalInstance.result.then(function (album) {
                    if(album){
                        vm.albums[index] = album;
                    }
                }, function () {
                  
            }); 
        },

        vm.detailAlbum = function(album){
            var index = vm.albums.indexOf(album);
            var modalInstance = Core.$uibModal.open({
                animation: true,
                templateUrl     : 'modules/store/photo/album/detail.view.html',
                controller      : 'AlbumModalController as vm',
                windowClass     : 'app-modal-full-width',
                resolve: {
                        AlbumInstance: function () {
                            return album;
                        }
                    }
                });
                modalInstance.result.then(function (album) {
                    if(album){
                        vm.albums[index] = album;
                    }
                }, function () {
                  
            }); 
        }
	}
})();