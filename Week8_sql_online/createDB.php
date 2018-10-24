<?php

class MyDB extends SQLite3
   {
      function __construct()
      {
         $this->open('../Week8_db/graffitiGallery.db');
      }
   }

try
{
   $db = new MyDB();
   echo ("Opened or created graffiti gallery data base successfully<br \>");
   //storing table as a variable
   $theQuery = 'CREATE TABLE artCollection (pieceID INTEGER PRIMARY KEY NOT NULL, artist TEXT, title TEXT,geoLoc TEXT, creationDate TEXT,descript ,image TEXT)';
   // the db variable is going to hold reference to database, in-built SQL command, exec
   $ok = $db ->exec($theQuery);
	 // make sure the query executed (return a boolean)
	 if (!$ok)
	  die($db->lastErrorMsg());
	 // if everything executed error less we will arrive at this statement
   echo "Table artCollection created successfully<br \>";

}
catch(Exception $e)
{
   die($e);
}

?>
