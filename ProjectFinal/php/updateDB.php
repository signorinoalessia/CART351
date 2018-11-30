<?php

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

// http://clab.concordia.ca/intro-to-sql-lite/
//timer on client side

if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// need to process
 $user = $_POST['user'];
 $activeCell = $_POST['activeCell'];
 $user_es =$db->escapeString($user);
 $activeCell_es =$db->escapeString($activeCell);

$sql_update="UPDATE usersTable SET activeCell = '$activeCell_es' WHERE username='$user_es'"; //*** unsure of SET activeCell
   // again we do error checking when we try to execute our SQL statements on the db
   $ok1 = $db ->exec($sql_update);
   if (!$ok1) die("Cannot execute statement.");
   // if we reach this point then all the data has been updated successfully.
   echo "UPDATE OF table called usersTable successful";
 }

?>
