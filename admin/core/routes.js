(function() {

    'use strict';

    angular.module('BigBoomApp').config(function($stateProvider, $urlRouterProvider) {
        // Redirect any unmatched url
        $urlRouterProvider.otherwise('/auth/login');

        $stateProvider
            .state('auth', {
                url: '/auth',
                template: '<div ui-view></div>'
            })
            .state('auth.login', {
                url: '/login',
                templateUrl: 'modules/auth/login.view.html'
            })
            .state('app', {
                url: '/app',
                templateUrl: 'modules/app/app.view.html',
            })
            .state('app.dashboard', {
                url: '/dashboard',
                templateUrl: 'modules/dashboard/dashboard.view.html',
            })
            .state('app.user', {
                url: '/user',
                template: '<div ui-view></div>',
            })
            .state('app.user.all', {
                url: '/all',
                templateUrl: 'modules/user/all.view.html',
            })
            .state('app.user.create', {
                url: '/create',
                templateUrl: 'modules/user/create.view.html',
            })
            .state('app.user.profile', {
                url: '/profile',
                templateUrl: 'modules/user/profile.view.html',
            })

            .state('app.store', {
                url: '/store',
                template: '<div ui-view></div>',
            })
            .state('app.store.index', {
                url: '/index',
                templateUrl: 'modules/store/index.view.html',
            })
            .state('app.store.article', {
                url: '/article',
                template: '<div ui-view></div>',
            })
            .state('app.store.article.index', {
                url: '/index',
                templateUrl: 'modules/store/article/index.view.html',
            })
            .state('app.store.article.create', {
                url: '/create',
                templateUrl: 'modules/store/article/create.view.html',
            })
            .state('app.store.article.show', {
                url: '/show/:article_id',
                templateUrl: 'modules/store/article/detail.view.html',
            })
            .state('app.store.article.edit', {
                url: '/update/:article_id',
                templateUrl: 'modules/store/article/edit.view.html',
            })
            .state('app.store.menu', {
                url: '/menu',
                template: '<div ui-view></div>'
            })
            .state('app.store.menu.index', {
                url: '/index',
                templateUrl: 'modules/store/menu/index.view.html',
            })
            .state('app.store.menu.create', {
                url: '/create',
                templateUrl: 'menu/store/menu/create.view.html',
            })
            .state('app.store.menu.show_food', {
                url: '/show/food/:food_id',
                templateUrl: 'modules/store/menu/food/detail.view.html',
            })
            .state('app.store.menu.edit', {
                url: '/update/:product_id',
                templateUrl: 'modules/store/menu/edit.view.html',
            })
            .state('app.store.photo', {
                url: '/photo',
                template: '<div ui-view></div>',
            })
            .state('app.store.photo.index', {
                url: '/index',
                templateUrl: 'modules/store/photo/index.view.html',
            });

    });
}());
