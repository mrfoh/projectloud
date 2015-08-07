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

    .state('site.help', {
        url: '/help',
        templateUrl: '/assets/views/help.html',
         resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                 return $ocLazyLoad.load(['/assets/js/frontend/controllers/help.js'])
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
    .state('site.auth', {
        url: '/auth/{token)',
        templateUrl: '/assets/views/auth.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['/assets/js/frontend/controllers/auth.js'])
            }]
        }
    })

    .state('site.profile',  {
        url: '/profile',
        templateUrl: '/assets/views/profile.html',
        restricted: true,
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['/assets/js/frontend/controllers/profile.js', '/assets/js/frontend/services/posts.js'])
            }]
        }
    })

    .state('site.settings', {
        url: '/profile/settings',
        templateUrl: '/assets/views/settings.html',
        restricted: true,
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['/assets/js/frontend/controllers/settings.js', '/assets/js/frontend/services/account.js'])
            }]
        }
    })

    .state('site.password', {
        url: '/profile/settings/password',
        templateUrl: '/assets/views/password.html',
        restricted: true,
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['/assets/js/frontend/controllers/password.js', '/assets/js/frontend/services/account.js'])
            }]
        }
    })

    .state('posts', {
        abstract: true,
        url: '/posts',
        templateUrl: '/assets/views/creator.html',
        resolve: ['$ocLazyLoad', function($ocLazyLoad) {
            return $ocLazyLoad.load(['/assets/js/frontend/services/page.js']);
        }]
    })

    .state('posts.create', {
        url: '/write',
        restricted: true,
        templateUrl: '/assets/views/editor.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['ui.select','toaster','textAngular']).then(function() {
                    return $ocLazyLoad.load([
                        '/assets/js/frontend/controllers/editor.js','/assets/js/frontend/services/posts.js',
                        '/assets/js/admin/services/tags.js', '/assets/js/admin/services/files.js'])
                })
            }]
        }
    })

    .state('posts.edit', {
        url: '/write/{id}',
        restricted: true,
        templateUrl: '/assets/views/editor.html',
        resolve: {
            deps: ['$ocLazyLoad', function( $ocLazyLoad ) {
                return $ocLazyLoad.load(['ui.select','toaster','textAngular']).then(function() {
                    return $ocLazyLoad.load([
                        '/assets/js/frontend/controllers/editor.js','/assets/js/frontend/services/posts.js',
                        '/assets/js/admin/services/tags.js', '/assets/js/admin/services/files.js'])
                })
            }]
        }
    })
}])
.run(function ($rootScope, $state, $auth) {
  $rootScope.$on('$stateChangeSuccess', function (event, toState, toParams, fromState, fromParams) {
    $state.previous = fromState;
    $state.previous.params = fromParams;

  });

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    if(typeof toState.restricted !== "undefined") {
        if(toState.restricted) {
            if($auth.check() == false) {
                event.preventDefault();
                $state.go('site.signin');
            }
        }
    }
  })
})
