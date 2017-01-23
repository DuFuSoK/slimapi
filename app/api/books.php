<?php
  // get all books
  $app->get('/api/books', function() {
    require_once('dbconnect.php');

    $searchstr = $_GET['searchstr'];
    $limit = $_GET['bookPerPage'];
    $index = $_GET['currentPage'];
    $scroll = $_GET['scroll'];
    $offset = ($index - 1) * $limit;

    if($searchstr === '' && $scroll === 'false') {
      $query = "SELECT * FROM bookcase ORDER BY id ASC LIMIT ". $limit . " OFFSET " . $offset;
    } else if ($searchstr != '' && $scroll === 'false') {
      $query = "SELECT * FROM bookcase WHERE name LIKE '%". $searchstr ."%' ORDER BY id ASC LIMIT ". $limit . " OFFSET " . $offset;
    } else if ($searchstr === '' && $scroll === 'true') {
      $query = "SELECT * FROM bookcase ORDER BY id ASC LIMIT ". $limit . " OFFSET " . $offset;
    } else if ($searchstr != '' && $scroll === 'true') {
      $query = "SELECT * FROM bookcase WHERE name LIKE '%". $searchstr ."%' ORDER BY id ASC LIMIT ". $limit . " OFFSET " . $offset;
    }

    $result = $db->query($query);

    while($row = $result->fetch_assoc()){
      $data[] = $row;
    }

    if(isset($data)){
      header('Content-Type: application/json');
      echo json_encode($data);
    }
  });

  // find count
  $app->get('/api/books/count', function() {
    require_once('dbconnect.php');

    $query = "SELECT COUNT(id) AS count FROM bookcase";
    $result = $db->query($query);
    $data = $result->fetch_assoc();

    if(isset($data)){
      header('Content-Type: application/json');
      echo json_encode($data);
    }
  });

  // find search count (if '' reuslt: all)
  $app->get('/api/books/searchcount', function() {
    require_once('dbconnect.php');
    $searchstr = $_GET['searchstr'];

    $query = "SELECT COUNT(id) AS searchcount FROM bookcase WHERE name LIKE '%". $searchstr ."%'";
    $result = $db->query($query);
    $data = $result->fetch_assoc();

    if(isset($data)){
      header('Content-Type: application/json');
      echo json_encode($data);
    }
  });

  // get a specific book
  $app->get('/api/books/{id}', function($request){
    require_once('dbconnect.php');
    $id = $request->getAttribute('id');

    $query = "SELECT * FROM bookcase WHERE id=$id";
    $result = $db->query($query);
    $data = $result->fetch_assoc();

    if(isset($data)){
      header("Content-Type: application/json");
      echo json_encode($data);
    }
  });

  // add new book
  $app->post('/api/books', function($request){
    require_once('dbconnect.php');
    $query = "INSERT INTO bookcase (name) VALUES (?)";

    $stm = $db->prepare($query);
    $stm->bind_param("s", $new_name);

    $new_name = $request->getParsedBody()['name'];
    $stm->execute();
  });

  // update a specific book
  $app->put('/api/books/{id}', function($request){
    require_once('dbconnect.php');
    $id = $request->getAttribute('id');

    $query = "UPDATE bookcase SET name = ? WHERE id=$id";

    $stm = $db->prepare($query);
    $stm->bind_param("s",$update_name);

    $update_name = $request->getParsedBody()['name'];
    $stm->execute();
  });

  // delete a specific book
  $app->delete('/api/books/{id}', function($request){
    require_once('dbconnect.php');
    $id = $request->getAttribute('id');

    $query = "DELETE FROM bookcase WHERE id=$id";
    $result = $db->query($query);
  });
?>
