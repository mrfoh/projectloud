// config

var app =  
angular.module('app')
.config(['$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$httpProvider', '$interpolateProvider',
    function ($controllerProvider,   $compileProvider,   $filterProvider,   $provide, $httpProvider, $interpolateProvider) {
        
        // lazy controller, directive and service
        app.controller = $controllerProvider.register;
        app.directive  = $compileProvider.directive;
        app.filter     = $filterProvider.register;
        app.factory    = $provide.factory;
        app.service    = $provide.service;
        app.constant   = $provide.constant;
        app.value      = $provide.value;

        $interpolateProvider.startSymbol('<%');
        $interpolateProvider.endSymbol('%>');

        OAuth.initialize('VMKOEZFOZAMWpFuyZ8TGJS0u3mA');

        $httpProvider.interceptors.push('requestInterceptor');
    }
]);