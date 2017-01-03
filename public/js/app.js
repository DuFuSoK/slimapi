/*global angular*/
var app = angular.module("myApp", ['ngResource', 'ngRoute', 'ui.bootstrap']);

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
            .otherwise({redirectTo: '/book'});

        $locationProvider.html5Mode({enabled: true, requireBase: false});

    }]);

    // resource service
    app.factory('Book', function ($resource) {
        return $resource('/api/books/:id', {id: '@id'}, {update: {method: 'PUT'}});
    });

    app.factory('BookSearch', function ($resource) {
        return $resource('/api/booksearch/:search', {search: '@search'});
    });

    // controller
    app.controller("mainCtrl", function ($scope, Book, BookSearch) {
        $scope.pageSize = 5;
        $scope.currentPage = 1;
        $scope.searchString = '';

        $scope.mysearch = function (event) {
            if ($scope.searchString.length >= 3) {
                $scope.books = BookSearch.query({search: $scope.searchString});
            } else if ($scope.searchString.length === 2 && event.keyCode === 8) {
                $scope.books = Book.query();
            }
        };

        // fetch all books
        $scope.list = function () {
            $scope.books = Book.query();
        };

        // get json for specific book
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

    app.controller("detailCtrl", function ($scope, Book, $routeParams) {
        $scope.currentBook = Book.get({id: $routeParams.id});
    });

    // filter for pagination
    app.filter('startFrom', function () {
        return function (data, start) {
            return data.slice(start);
        };
    });
}());
