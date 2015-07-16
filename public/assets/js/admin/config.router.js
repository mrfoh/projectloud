'use strict';

/**
 * Config for the router
 */
angular.module('app')
.config(['$stateProvider', '$urlRouterProvider','$locationProvider', function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $urlRouterProvider.otherwise('/dashboard');

    $stateProvider.state('app', {
        abstract: true,
        url: '',
        templateUrl: '/assets/tpl/app.html'
    })

    .state('app.dashboard', {
    	url: '/dashboard',
    	templateUrl: '/assets/tpl/dashboard.html'
    })

    .state('auth', {
        abstract: true,
        url: '/auth',
        template: '<div ui-view class="fade-in-right-big smooth"></div>'
    })
    .state('auth.login', {
        url: '/login',
        templateUrl: '/assets/tpl/auth.login.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                 return $ocLazyLoad.load(['/assets/js/admin/controllers/auth/index.js'])
            }]
        }
    })

    .state('posts', {
    	abstract: true,
    	url: '/posts',
    	templateUrl: '/assets/tpl/posts.html'
        /*resolve: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(['ui.select','toaster']);
        }]*/
    })
    .state('posts.index', {
    	url: '/',
    	templateUrl: '/assets/tpl/posts.index.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['ui.select','toaster']).then(function() {
                    return $ocLazyLoad.load(['/assets/js/admin/controllers/posts/index.js', '/assets/js/admin/services/posts.js'])
                })
            }]
        }
    })
    .state('posts.create', {
    	url: '/new',
    	templateUrl: '/assets/tpl/posts.editor.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['ui.select','toaster','textAngular']).then(function() {
                    return $ocLazyLoad.load(['/assets/js/admin/controllers/posts/editor.js','/assets/js/admin/services/posts.js',
                        '/assets/js/admin/services/categories.js', '/assets/js/admin/services/tags.js', '/assets/js/admin/services/files.js'])
                })
            }]
        }
    })
    .state('posts.edit', {
        url: '/{post:[0-9]{1,4}}/edit',
        templateUrl: '/assets/tpl/posts.editor.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['ui.select','toaster','textAngular']).then(function() {
                    return $ocLazyLoad.load(['/assets/js/admin/controllers/posts/editor.js','/assets/js/admin/services/posts.js',
                        '/assets/js/admin/services/categories.js', '/assets/js/admin/services/tags.js', '/assets/js/admin/services/files.js'])
                })
            }]
        }
    })
    .state('posts.categories', {
    	url: '/categories',
    	templateUrl: '/assets/tpl/posts.categories.html',
         resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['toaster']).then(function() {
                    return $ocLazyLoad.load(['/assets/js/admin/controllers/posts/categories.js','/assets/js/admin/services/categories.js'])
                })
            }]
        }
    })
    .state('posts.tags', {
    	url: '/tags',
    	templateUrl: '/assets/tpl/posts.tags.html'
    })

    .state('comments', {
        abstract: true,
        url: '/comments',
        templateUrl: '/assets/tpl/comments.html',
        resolve: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(['ui.select','toaster']);
        }]
    })
    .state('comments.index', {
        url: '/',
        templateUrl: '/assets/tpl/comments.index.html'
    })

    .state('media', {
        abstract: true,
        url: '/media',
        templateUrl: '/assets/tpl/media.html'
    })
    .state('media.library', {
        url: '/',
        templateUrl: '/assets/tpl/media.library.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['toaster']).then(function() {
                    return $ocLazyLoad.load(['/assets/js/admin/controllers/media/index.js','/assets/js/admin/services/files.js'])
                })
            }]
        }
    })
    .state('media.create', {
        url: '/new',
        templateUrl: '/assets/tpl/media.uploader.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['toaster']).then(function() {
                    return $ocLazyLoad.load(['/assets/js/admin/controllers/media/uploader.js'])
                })
            }]
        }
    })
}])
.run(['$rootScope', '$state', '$stateParams', '$auth', '$location', '$window',
    function ($rootScope,   $state, $stateParams, $auth, $window) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;    

    $rootScope.$on('$stateChangeSuccess', function (ev, to, toParams, from, fromParams) {
       if($auth.check() === false) {
            console.log(window.location)
            ev.preventDefault();
            window.location.hash = "#/auth/login";
       }
    }); 
}])