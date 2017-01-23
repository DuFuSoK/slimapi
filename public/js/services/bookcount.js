// resource service pagination
app.factory('BookCount', function ($resource) {
    return $resource('/api/books/count');
});
