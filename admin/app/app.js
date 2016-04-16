'use strict';
angular.module('BigBoomApp.Dashboard', []);
angular.module('BigBoomApp.User', []);
angular.module('BigBoomApp.Auth', []);
angular.module('BigBoomApp.Store', []);
var BigBoomApp = angular.module('BigBoomApp', [
    'ui.router',
    'oc.lazyLoad',
    'ngSanitize',
    'pascalprecht.translate',
    'LocalStorageModule',
    'ngCookies',
    'validation',
    'chieffancypants.loadingBar',
    'ngAnimate',
    'angularMoment',
    'ui.bootstrap',
    'duScroll',
    'oitozero.ngSweetAlert',
    'validation.rule',
    'angular-toasty',
    'BigBoomApp.Dashboard',
    'BigBoomApp.User',
    'BigBoomApp.Auth',
    'BigBoomApp.Store',
]);

/* Configure ocLazyLoader(refer: https://github.com/ocombe/ocLazyLoad) */
BigBoomApp.config(['$ocLazyLoadProvider', function($ocLazyLoadProvider) {
    $ocLazyLoadProvider.config({
        // global configs go here
    });
}]);

//AngularJS v1.3.x workaround for old style controller declarition in HTML
BigBoomApp.config(['$controllerProvider', function($controllerProvider) {
    // this option might be handy for migrating old apps, but please don't use it
    // in new ones!
    $controllerProvider.allowGlobals();
}]);

BigBoomApp.run(function(amMoment) {
    amMoment.changeLocale('vi');
});

/********************************************
 END: BREAKING CHANGE in AngularJS v1.3.x:
 *********************************************/

/* Setup connect Nodejs Sever */
// LimitlessApp.factory('socket',function(){
//     var socket = io.connect('http://103.7.40.9:6868');
//     return socket;
// });
/* Init global settings and run the app */

BigBoomApp.config(['$validationProvider', function($validationProvider) {
    $validationProvider.showSuccessMessage = false; // or true(default)
    $validationProvider.showErrorMessage = true; // or true(default)
}]);
BigBoomApp.config(['cfpLoadingBarProvider', function(cfpLoadingBarProvider) {
    cfpLoadingBarProvider.includeSpinner = false;
}]);


BigBoomApp.run(function($rootScope, $state, $cookieStore, $location, $document) {
    $rootScope.$state = $state;
    $rootScope.rootAuth = {};
    $rootScope.rootStore = {};
    $rootScope.$on('$stateChangeSuccess', function(event, toState) {
        $document.scrollTop(0);
        $state.current = toState;
        $rootScope.rootAuth = $cookieStore.get('member');
        $rootScope.rootStore = $cookieStore.get('store');
        if ($rootScope.rootAuth == null) {
            $location.path('auth/login');
        } else {
            $state.current = toState;
            if ($state.current.name == 'auth.login') {
                $location.path('app/dashboard');
            }
        }
    });
});
BigBoomApp.config(function($httpProvider) {
    $httpProvider.interceptors.push(['$q', '$location', '$cookieStore', function($q, $location, $cookieStore) {
        return {
            'request': function(config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token') != null) {
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

BigBoomApp.config(function($translateProvider, localStorageServiceProvider, $translatePartialLoaderProvider) {
    $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: 'languages/{part}/{lang}.json'
    });
    $translateProvider.preferredLanguage('vn');
    $translateProvider.useCookieStorage();
    $translatePartialLoaderProvider.addPart('default');
});
