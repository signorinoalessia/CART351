<?php
// put required html mark up
echo"<html>\n";
echo"<head>\n";
echo"<title> Output from the Grafitti Gallery Database </title> \n";
//include CSS Style Sheet
echo "<link rel='stylesheet' type='text/css' href='css/galleryStyle.css'>";
echo"</head>\n";
// start the body ...
echo"<body>\n";
// place body content here ...

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
   //rows
   $sql_select='SELECT * FROM artCollection';
   $sql_select_one = "SELECT * FROM artCollection WHERE pieceID = 1"; //build new statement
   $sql_select_two = "SELECT * FROM artCollection WHERE creationDate >=Date('2002-01-01')";
   $sql_select_three = "SELECT * FROM artCollection WHERE creationDate >=Date('2002-01-01') AND artist = 'Sarah'";
   $sql_select_four = "SELECT * FROM artCollection WHERE geoLoc = 'Montreal' OR geoLoc = 'London'";
   $sql_select_five = "SELECT * FROM artCollection WHERE (creationDate >=Date('2003-01-01') AND artist = 'Sarah')OR(creationDate <=Date('2000-01-01') AND artist = 'Stephen')";

   //columns

   // $sql_selectA = "SELECT pieceID, title, creationDate FROM artCollection";
   // $sql_selectA = "SELECT artist FROM artCollection";
   // $sql_selectA = "SELECT DISTINCT artist FROM artCollection";
   // $sql_selectA = "SELECT creationDate, artist FROM artCollection WHERE artist = 'Harold' OR artist = 'Sarah' ORDER BY creationDate"; //you can order by one spec thing only!
   // $sql_selectA ="SELECT artist, COUNT(*) FROM artCollection GROUP BY artist";
   $sql_selectA = "SELECT COUNT(*) FROM artCollection WHERE creationDate >=Date('2000-01-01')";


   // the result set, a 2D array encapuslating 8 entries arrays
   // $result = $db->query($sql_select_five); //querying select-one!, query will always send back a result
   $result = $db->query($sql_select);
   if (!$result) die("Cannot execute query.");

   // fetch first row ONLY... my result set and fetch array, associativem print that spec row
   $row = $result->fetchArray(SQLITE3_ASSOC);
   print_r($row);

   // while beause I dont know how mnay there are
   $result->reset();
   echo "<h3> Query Results:::</h3>";
  echo"<div id='back'>";
  // get a row... (as associative arrays)
  while($row = $result->fetchArray(SQLITE3_ASSOC))
  {
    echo "<div class ='outer'>";
    echo "<div class ='content'>";
    // go through each column in this row
    // retrieve key entry pairs, key-value pairs
    foreach ($row as $key=>$entry)
    {
      //if the column name is not 'image'
       if($key!="image")
       {
         // echo the key and entry
           echo "<p>".$key." :: ".$entry."</p>";
       }
    }

   // put image in last
   echo "</div>";
   // access by key
   $imagePath = $row["image"];
   echo "<img src = $imagePath\>";
   echo "</div>";
}//end while
echo"</div>";


}

catch(Exception $e)
{
   die($e);
}

echo"</body>\n";
echo"</html>\n";
?>
