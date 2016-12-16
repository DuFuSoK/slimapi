/*global angular */
var app = angular.module("myApp", ['ngResource']);
app.controller("myCtrl", ["$scope", "$resource", function ($scope, $resource) {
    'use strict';
    // resource object
    var Book = $resource('/api/books/:id', {id: '@id'}, {update: {method: 'PUT'}});

    // fetch all books
    $scope.list = function () {
        $scope.books = Book.query();
    };

    $scope.viewBook = function (bookId) {
        $scope.currentBook = Book.get({id: bookId});
    };

    $scope.deletBook = function (bookId) {
        Book['delete']({id: bookId}, function () {
            $scope.books = null;
            $scope.list();
        });
    };

    $scope.addBook = function (newname) {
      // user input

        // creating new book
        var newBook = new Book();
        newBook.name = newname;
        newBook.$save({}, function () {
            $scope.list();
        });
        $scope.newname = null;
    };

    $scope.updateBook = function (bookId) {
        Book.update({id: bookId}, {name: $scope.updateName});
        $scope.list();
    };

    $scope.list();
}]);
