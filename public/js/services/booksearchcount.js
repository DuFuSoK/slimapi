// resource service search pagination
app.factory('BookSearchCount', function ($resource) {
    return $resource('/api/books/searchcount');
});
