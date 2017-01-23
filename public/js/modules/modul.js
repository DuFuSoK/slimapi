/*global angular*/
var app = angular.module("myApp", ['ngResource', 'ngRoute', 'ui.bootstrap', 'ngAnimate', 'infinite-scroll']);

(function () {
    'use strict';
    // routing
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/book', {
            templateUrl: '/templates/book_list.html',
            controller: 'mainCtrl'
        })
            .when('/detail/:id', {
                templateUrl: '/templates/book_detail.html',
                controller: 'detailCtrl'
            })
            .when('/scroll', {
                templateUrl: '/templates/book_scroll.html',
                controller: 'scrollCtrl'
            })
            .otherwise({redirectTo: '/book'});

        $locationProvider.html5Mode({enabled: true, requireBase: false});

    }]);
}());
