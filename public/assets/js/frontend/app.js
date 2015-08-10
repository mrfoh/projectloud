'use strict';


angular.module('app', [
    'ngAnimate',
    'ngSanitize',
    'ngTouch',
    'ngStorage',
    'ui.router',
    'ui.bootstrap',
    'ngFileUpload',
    'ngOnboarding',
    'requestHandler',
    'ui.load',
    'ui.jq',
    'oc.lazyLoad',
    'angulartics',
    'angulartics.google.analytics'
])
.config(function($analyticsProvider) {
    if(window.BPS.Config.env != "production") $analyticsProvider.virtualPageviews(false);
})