'use strict';

/**
 * Config for the router
 */
angular.module('app').run(['$rootScope', '$state', '$stateParams', function ($rootScope,   $state,   $stateParams) {
      $rootScope.$state = $state;
      $rootScope.$stateParams = $stateParams;        
}])
.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider,   $urlRouterProvider) {

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

    .state('posts', {
    	abstract: true,
    	url: '/posts',
    	templateUrl: '/assets/tpl/posts.html',
        resolve: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(['ui.select','toaster']);
        }]
    })
    .state('posts.index', {
    	url: '/',
    	templateUrl: '/assets/tpl/posts.index.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                 return $ocLazyLoad.load(['/assets/js/admin/controllers/posts/index.js', '/assets/js/admin/services/posts.js'])
            }]
        }
    })
    .state('posts.create', {
    	url: '/new',
    	templateUrl: '/assets/tpl/posts.editor.html'
    })
    .state('posts.categories', {
    	url: '/categories',
    	templateUrl: '/assets/tpl/posts.categories.html'
    })
    .state('posts.tags', {
    	url: '/tags',
    	templateUrl: '/assets/tpl/posts.tags.html'
    })
}]);