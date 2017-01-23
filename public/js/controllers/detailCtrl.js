app.controller("detailCtrl", function ($scope, Book, $routeParams, $location) {
    $scope.currentBook = Book.get({id: $routeParams.id});
    $scope.backToList = function () {
        $location.path('/book');
    };
});
