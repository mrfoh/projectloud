'use strict';

/**
 * Config for the router
 */
angular.module('app')
.config(['$stateProvider', '$urlRouterProvider','$locationProvider',
    function ($stateProvider, $urlRouterProvider, $locationProvider) {

    $locationProvider.hashPrefix('!');

    $urlRouterProvider.otherwise('/');

    $stateProvider.state('site', {
        abstract: true,
        url: '',
        templateUrl: '/assets/views/site.html',
        resolve: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(['/assets/js/frontend/services/page.js']);
        }]
    })
    .state('site.home', {
        url: '/',
        templateUrl: '/assets/views/home.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                 return $ocLazyLoad.load(['/assets/js/frontend/controllers/home.js', '/assets/js/frontend/services/posts.js'])
            }]
        }
    })

    .state('site.section', {
        url: '/section/{category}',
        templateUrl: '/assets/views/section.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                 return $ocLazyLoad.load(['/assets/js/frontend/controllers/section.js', '/assets/js/frontend/services/posts.js'])
            }]
        }
    })
    .state('site.post', {
        url: '/article/{slug}',
        templateUrl: '/assets/views/post.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                 return $ocLazyLoad.load(['/assets/js/frontend/controllers/post.js', '/assets/js/frontend/services/posts.js',
                    '/assets/js/frontend/services/comments.js'])
            }]
        }
    })
   
}])
