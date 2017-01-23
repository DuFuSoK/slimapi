// resource service book
app.factory('Book', function ($resource) {
    return $resource('/api/books/:id', {id: '@id', searchstr: ''}, {update: {method: 'PUT'}});
});
