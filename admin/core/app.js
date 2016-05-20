(function() {
    'use strict';

    angular.module('BigBoomApp.Dashboard', []);
    angular.module('BigBoomApp.User', []);
    angular.module('BigBoomApp.Auth', []);
    angular.module('BigBoomApp.Store', []);

    var BigBoomApp = angular.module('BigBoomApp', [
        'ui.router',
        'ngSanitize',
        'pascalprecht.translate',
        'ngCookies',
        'validation',
        'chieffancypants.loadingBar',
        'ngAnimate',
        'ngFileUpload',
        'angularMoment',
        'ui.bootstrap',
        'ngTagsInput',
        'duScroll',
        'summernote',
        'ngImgCrop',
        'oitozero.ngSweetAlert',
        'validation.rule',
        'angular-toasty',
        'BigBoomApp.Dashboard',
        'BigBoomApp.User',
        'BigBoomApp.Auth',
        'BigBoomApp.Store'

    ]);

    //AngularJS v1.3.x workaround for old style controller declarition in HTML
    angular.module('BigBoomApp').config(['$controllerProvider', function($controllerProvider) {
        // this option might be handy for migrating old apps, but please don't use it
        // in new ones!
        $controllerProvider.allowGlobals();
    }]);
    
    /********************************************
     END: BREAKING CHANGE in AngularJS v1.3.x:
     *********************************************/


    /* Init global settings and run the app */

    angular.module('BigBoomApp').config(['$validationProvider', function($validationProvider) {
        $validationProvider.showSuccessMessage = false; // or true(default)
        $validationProvider.showErrorMessage = true; // or true(default)
    }]);

    angular.module('BigBoomApp').config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
        cfpLoadingBarProvider.includeSpinner = false;
    }]);


    angular.module('BigBoomApp').run(function($rootScope, $state, $cookieStore, $location, $document, amMoment) {
        $rootScope.$state = $state;
        $rootScope.rootAuth = {};
        $rootScope.rootStore = {};
        $cookieStore.put('_height', $(document).height());
        amMoment.changeLocale('vi');
        $rootScope.$on('$stateChangeSuccess', function(event, toState) {
            $document.scrollTop(0);
            $state.current = toState;
            $rootScope.rootAuth = $cookieStore.get('member');
            $rootScope.rootStore = $cookieStore.get('store');
            if ($rootScope.rootAuth === null || $rootScope.rootAuth === undefined) {
                $location.path('auth/login');
            } else {
                $state.current = toState;
                if ($state.current.name == 'auth.login') {
                    $location.path('app/dashboard');
                }
            }
        });
    });
    
    angular.module('BigBoomApp').config(function($httpProvider) {
        $httpProvider.interceptors.push(['$q', '$location', '$cookieStore', function($q, $location, $cookieStore) {
            return {
                'request': function(config) {
                    config.headers = config.headers || {};
                    if ($cookieStore.get('token') !== null) {
                        config.headers['x-access-token'] = $cookieStore.get('token');
                    }
                    return config;
                },
                'responseError': function(response) {
                    if (response.status === 401) {
                        $cookieStore.remove('member');
                        $location.path('auth/login');
                    }
                    return $q.reject(response);
                }
            };
        }]);
    });

    angular.module('BigBoomApp').config(function($translateProvider, $translatePartialLoaderProvider) {
        $translateProvider.useSanitizeValueStrategy(null);
        $translateProvider.useLoader('$translatePartialLoader', {
            urlTemplate: 'languages/{part}/{lang}.json'
        });
        $translateProvider.preferredLanguage('vn');
        $translateProvider.useCookieStorage();
        $translatePartialLoaderProvider.addPart('default');
    });


}());
