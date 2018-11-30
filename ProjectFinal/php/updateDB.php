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

$sql_update="UPDATE usersTable SET activeCell = 'Untitled' WHERE username='$user_es'";
   // again we do error checking when we try to execute our SQL statements on the db
   $ok1 = $db ->exec($sql_update);
   if (!$ok1) die("Cannot execute statement.");
   // if we reach this point then all the data has been updated successfully.
   echo "UPDATE OF table called artCollection successful";

?>
