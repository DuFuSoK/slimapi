app.controller("scrollCtrl", function ($scope, Book, BookCount, BookSearchCount) {
    $scope.bookPerPage = 15; // how many books shoul be display at one page
    $scope.currentPage = 1; // index of current page

    $scope.list = function (cPage) {
        $scope.currentPage = cPage || 1;
        $scope.books = Book.query({searchstr: '', bookPerPage: $scope.bookPerPage, currentPage: $scope.currentPage, scroll: true});
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

    $scope.bookCount = BookCount.get({}, function () { // how many books are store in DB
        $scope.bookCountOrigin = $scope.bookCount.count;
    });

    $scope.mysearch = function () {
        $scope.currentPage = 1;
        if ($scope.searchString === undefined) { // check if searchstr is undefined and if yes than set it to blank string
            $scope.searchString = '';
        }
        if ($scope.searchString.length >= 3) {
            $scope.BookSearchCount = BookSearchCount.get({searchstr: $scope.searchString}, function () {
                $scope.bookCount.count = $scope.BookSearchCount.searchcount;
            });
            $scope.books = Book.query({searchstr: $scope.searchString, bookPerPage: $scope.bookPerPage, currentPage: $scope.currentPage, scroll: true});
        } else if ($scope.searchString.length === 2 || $scope.searchString.length === 0) {
            $scope.bookCount.count = $scope.bookCountOrigin;
            $scope.books = Book.query({searchstr: '', bookPerPage: $scope.bookPerPage, currentPage: $scope.currentPage, scroll: true});
        }
    };

    $scope.list();
    $scope.currentPage += 1;

    $scope.addon = Book.query({searchstr: '', bookPerPage: $scope.bookPerPage, currentPage: $scope.currentPage, scroll: true});

    $scope.getMoreData = function () {
        if ($scope.searchString === undefined) { // check if searchstr is undefined and if yes than set it to blank string
            $scope.searchString = '';
        }
        if ($scope.currentPage <= Math.ceil($scope.bookCountOrigin / $scope.bookPerPage)) {
            $scope.currentPage += 1;
            $scope.books = $scope.books.concat($scope.addon);
            $scope.addon = Book.query({searchstr: $scope.searchString, bookPerPage: $scope.bookPerPage, currentPage: $scope.currentPage, scroll: true});
        }
    };
});
