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

    .state('site.about' , {
        url: '/about',
        templateUrl: '/assets/views/about.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                 return $ocLazyLoad.load(['/assets/js/frontend/controllers/about.js'])
            }]
        }
    })

    .state('site.commentpolicy', {
        url: '/comment-policy',
        templateUrl: '/assets/views/commentpolicy.html',
         resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                 return $ocLazyLoad.load(['/assets/js/frontend/controllers/commentpolicy.js'])
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

    .state('site.tag', {
        url: '/tag/{tag}',
        templateUrl: '/assets/views/tag.html',
         resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                 return $ocLazyLoad.load(['/assets/js/frontend/controllers/tag.js', '/assets/js/frontend/services/posts.js'])
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
    .state('site.signin', {
        url: '/signin',
        templateUrl: '/assets/views/signin.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['/assets/js/frontend/controllers/signin.js'])
            }]
        }
    })
    .state('site.signup', {
        url: '/signup',
        templateUrl: '/assets/views/signup.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['/assets/js/frontend/controllers/signup.js'])
            }]
        }
    })
}])
.run(function ($rootScope, $state) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $state.previous = fromState;
    $state.previous.params = fromParams;
  });
})
