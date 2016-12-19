<?php
// get all books
  $app->get('/api/books', function(){
    require_once('dbconnect.php');
    $query = "SELECT * FROM bookcase ORDER BY id ASC";
    $result = $db->query($query);

    while($row = $result->fetch_assoc()){
      $data[] = $row;
    }
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
