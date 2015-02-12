'use strict';

// Require dependencies after angular and before all the aother modules
require('angular');
require('angular-ui-router');


angular.module('test', [])
    .config(function ($urlRouterProvider, $locationProvider) {
        $urlRouterProvider.otherwise('/test');
        $locationProvider.html5Mode(true);
    });

