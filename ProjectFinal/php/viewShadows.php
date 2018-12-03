<?php
// // put required html mark up
// echo"<html>\n";
// echo"<head>\n";
// echo"<title> Output from the Grafitti Gallery Database </title> \n";
// //include CSS Style Sheet
// echo "<link rel='stylesheet' type='text/css' href='css/master.css'>";
// echo"</head>\n";
// // start the body ...
// echo"<body>\n";
// // place body content here ...

class MyDB extends SQLite3
   {
      function __construct()
      {
          $this->open('../db/users.db');
      }
   }
   try
   {
      $db = new MyDB();
   }
   catch(Exception $e)
   {
      die($e);
   }

//check if something has been posted to server
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
$activeCell = $_POST['activeCell'];
$sql_select = "SELECT activeCell FROM usersTable WHERE activeCell >=0"; //select column (activeCell)
//$sql_select = "SELECT activeCell FROM userTable";
echo $sql_select;
//$sql_select = "SELECT * FROM usersTable WHERE activeCell >= 0";
//$sql_select = "SELECT COUNT(*) FROM usersTable WHERE activeCell >=0";

$result = $db->query($sql_select);

if (!$result) die("Cannot execute query.");
}

$res = array();
$i=0; //counter

// associative because I want column names
while($row = $result->fetchArray(SQLITE3_ASSOC))
{
  // note the result from SQL is ALREADY ASSOCIATIVE
 $res[$i] = $row;
 $i++;
}
// encode the resulting array as JSON (JAVASCRIPT DOES NOT UNDERSTAND PHP, JSON YES)
$myJSONObj = json_encode($res);
echo $myJSONObj;
exit;
}//POST
