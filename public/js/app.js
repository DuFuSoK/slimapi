/*global angular*/
var app = angular.module("myApp", ['ngResource', 'ngRoute', 'ui.bootstrap']);

(function () {
    'use strict';
  // routing
    app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
        $routeProvider.when('/book', {
            templateUrl: '/templates/book_list.html',
            controller: 'myCtrl'
        })
            .when('/detail', {
                templateUrl: '/templates/book_detail.html',
                controller: 'myCtrl'
            })
            .otherwise({redirectTo: '/'});

        $locationProvider.html5Mode({enabled: true, requireBase: false});

    }]);

  // resource service
    app.factory('Book', function ($resource) {
        return $resource('/api/books/:id', {id: '@id'}, {update: {method: 'PUT'}});
    });

  // controller
    app.controller("myCtrl", function ($scope, Book) {
        $scope.pageSize = 5;
        $scope.currentPage = 1;

        // fetch all books
        $scope.list = function () {
            $scope.books = Book.query();
        };

        // view a specific book
        $scope.viewBook = function (bookId) {
            $scope.currentBook = Book.get({id: bookId});
        };
        // delete a specific book
        $scope.deletBook = function (bookId) {
            Book['delete']({id: bookId}, function () {
                $scope.books = null;
                $scope.list();
            });
        };

        // add a new book
        $scope.addBook = function (newname) {

            // creating new book
            var newBook = new Book();
            newBook.name = newname;
            newBook.$save({}, function () {
                $scope.list();
            });
            $scope.newname = null;
        };

        $scope.updateBook = function (bookId) {
            Book.update({id: bookId}, {name: $scope.updateName}, function () {$scope.list(); });
        };

        $scope.list();
    });

    // filter for pagination
    app.filter('startFrom', function () {
        return function (data, start) {
            return data.slice(start);
        };
    });
}());
