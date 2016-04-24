'use strict';
BigBoomApp.config(function($stateProvider, $urlRouterProvider) {
    // Redirect any unmatched url
    $urlRouterProvider.otherwise('/auth/login');

    $stateProvider
        .state('auth', {
            url: '/auth',
            template: '<div ui-view></div>',
            resolve: {
                load: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BigBoomApp',
                        files: [
                            'modules/auth/auth.component.js',
                        ]
                    });
                }]
            },
        })
        .state('auth.login', {
            url: '/login',
            templateUrl: 'modules/auth/login.view.html'
        })
        .state('app', {
            url: '/app',
            templateUrl: 'modules/app/app.view.html',
            resolve: {
                load: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BigBoomApp.User',
                        files: [
                            'modules/user/user.ctrl.js',
                            'modules/user/user.srv.js',
                            'modules/user/user.factory.js',
                            'modules/user/user.const.js',
                        ]
                    });
                }]
            }
        })
        .state('app.dashboard', {
            url: '/dashboard',
            templateUrl: 'modules/dashboard/dashboard.view.html',
            resolve: {
                load: ['$ocLazyLoad', function($ocLazyLoad) {
                    return $ocLazyLoad.load({
                        name: 'BigBoomApp.Dashboard',
                        files: [
                            'modules/dashboard/dashboard.ctrl.js',
                        ]
                    });
                }]
            },
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

    // Store
    .state('app.store',{
      url:'/store',
      template: '<div ui-view></div>',
    })
    .state('app.store.index', {
        url: '/index',
        templateUrl: 'modules/store/index.view.html',
        resolve: {
            load: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'BigBoomApp.Store',
                    files: [
                        'modules/store/store.ctrl.js',
                        'modules/store/store.factory.js',
                        'modules/store/store.const.js'
                    ]
                },
                {
                    name: 'ngImgCrop',
                    files: [
                        'assets/angular/plugins/ngImgCrop/compile/unminified/ng-img-crop.js',
                        'assets/angular/plugins/ngImgCrop/compile/unminified/ng-img-crop.css',
                    ]
                },
                {
                    name: 'summernote',
                    files: [
                        'node_modules/angular-summernote/dist/angular-summernote.min.js',
                        'node_modules/summernote/dist/summernote.js',
                        'node_modules/summernote/dist/summernote.css',
                    ]
                }]);
            }]
        },
    })
    .state('app.store.article', {
        url: '/article',
        template: '<div ui-view></div>',
        resolve: {
            load: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'BigBoomApp.Store',
                    files: [
                        'modules/store/article/article.ctrl.js',
                        'modules/store/article/article.const.js',
                    ]
                },
                {
                    name: 'ngTagsInput',
                    files: [
                        'node_modules/ng-tags-input/build/ng-tags-input.min.js',
                        'node_modules/ng-tags-input/build/ng-tags-input.min.css',
                    ]
                },
                {
                    name: 'summernote',
                    files: [
                        'node_modules/angular-summernote/dist/angular-summernote.min.js',
                        'node_modules/summernote/dist/summernote.js',
                        'node_modules/summernote/dist/summernote.css',
                    ]
                }]);
            }]
        },
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
        template: '<div ui-view></div>',
        resolve: {
            load: ['$ocLazyLoad', function($ocLazyLoad) {
                return $ocLazyLoad.load([{
                    name: 'BigBoomApp.Store',
                    files: [
                        'modules/store/menu/menu.ctrl.js',
                        'modules/store/menu/menu.factory.js',
                        'modules/store/menu/menu.const.js',
                    ]
                },
                {
                    name: 'ngTagsInput',
                    files: [
                        'node_modules/ng-tags-input/build/ng-tags-input.min.js',
                        'node_modules/ng-tags-input/build/ng-tags-input.min.css',
                    ]
                },
                {
                    name: 'summernote',
                    files: [
                        'node_modules/angular-summernote/dist/angular-summernote.min.js',
                        'node_modules/summernote/dist/summernote.js',
                        'node_modules/summernote/dist/summernote.css',
                    ]
                }]);
            }]
        },
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
    });



});
