// main controller
app.controller("mainCtrl", function ($scope, Book, BookCount, BookSearchCount) {

    $scope.bookPerPage = 5; // how many books shoul be display at one page
    $scope.currentPage = 1; // index of current page
    $scope.bookCountOrigin = 0; // original count of books

    $scope.bookCount = BookCount.get({}, function () { // how many books are store in DB
        $scope.bookCountOrigin = $scope.bookCount.count;
    });

    // fetch all books
    $scope.list = function () {
        $scope.books = Book.query({searchstr: '', bookPerPage: $scope.bookPerPage, currentPage: $scope.currentPage, scroll: false});
    };

    $scope.mysearch = function () {
        if ($scope.searchString === undefined) { // check if searchstr is undefined and if yes than set it to blank string
            $scope.searchString = '';
        }
        if ($scope.searchString.length >= 3) {
            $scope.BookSearchCount = BookSearchCount.get({searchstr: $scope.searchString}, function () {
                $scope.bookCount.count = $scope.BookSearchCount.searchcount;
            });
            $scope.books = Book.query({searchstr: $scope.searchString, bookPerPage: $scope.bookPerPage, currentPage: $scope.currentPage, scroll: false});
        } else if ($scope.searchString.length === 2 || $scope.searchString.length === 0) {
            $scope.bookCount.count = $scope.bookCountOrigin;
            $scope.list();
        }
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
