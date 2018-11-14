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
   echo ("Opened users data base successfully<br \>");
   //storing table as a variable
   $theQuery = 'CREATE TABLE usersTable (userID INTEGER PRIMARY KEY NOT NULL, username TEXT, activeCell INTEGER)';
   // the db variable is going to hold reference to database, in-built SQL command, exec
   $ok = $db ->exec($theQuery);
	 // make sure the query executed (return a boolean)
	 if (!$ok)
	  die($db->lastErrorMsg());
	 // if everything executed error less we will arrive at this statement
   echo "Table usersTable created successfully<br \>";

}
catch(Exception $e)
{
   die($e);
}

?>
