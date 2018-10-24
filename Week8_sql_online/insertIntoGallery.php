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
   echo ("Opened or created graffitiGallery data base successfully<br \>");

  //get the time using the php function time() and format as the string Y-m-d:
  $time = date("Y-m-d",time());
  // add a new column + default value where we use the php variable
  $sql_alter = "ALTER TABLE artCollection ADD COLUMN current_time TEXT NOT NULL DEFAULT '$time'";
  $ok1 = $db ->exec($sql_alter);
  if (!$ok1) die("Cannot execute statement.");
  echo "ADDITION of time column in table artCollection successful";

   // $queryArray = array(
   //   "INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript, image) VALUES ('Martha', 'Elephants','1998-03-04','Montreal','Description for the arts','images/alternative-paris-tours.jpg')",
	 //   "INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript, image) VALUES ('Sarah', 'Hippos','2002-06-12','Montreal','Description for the arts','images/Artists-Lane-2.jpg')",
	 //   "INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript, image) VALUES ('Harold', 'Untitled', '2012-10-21','New York','Description for the arts','images/gorod-stena-grafiti-4927.jpg')",
 	 //   "INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript, image) VALUES ('Stephen', 'Scotland','1999-07-18','Edinborough','Description for the arts','images/graffiti-artist-scotland.jpg')",
 	 //   "INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript, image) VALUES ('Martha', 'Tigers','2017-08-21','Paris','Description for the arts','images/maxresdefault.jpg')",
	 //   "INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript, image) VALUES ('Sarah', 'WIndow','2005-06-13','Toronto','Description for the arts','images/windows.jpg')",
	 //   "INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript, image) VALUES ('Sarah', 'Untitled', '2003-03-19','Halifax','Description for the arts','images/work-50.jpg')",
 	 //   "INSERT INTO artCollection (artist, title, creationDate, geoLoc, descript, image) VALUES ('Stephen', 'Zoo','2000-05-06','London','Description for the arts','images/multi.jpg')"
 	 //  );
   //  // go through each entry in the array and execute the INSERT query statement....
   //  for($i =0; $i< count($queryArray); $i++)
   //  {
	 //     $ok1 = $db->exec($queryArray[$i]);
	 //      if (!$ok1)
	 //      {
		//          die($db->lastErrorMsg());
	 //       }
   //  }
   //  // if we reach this point then all the data has been inserted successfully.
   //  echo "INSERTION OF ".count($queryArray)." entries into artCollection Table successful";

}
catch(Exception $e)
{
   die($e);
}
?>
