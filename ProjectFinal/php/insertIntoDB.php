<?php

//OPEN UP database
//create an instance of my database
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

//POST, user clicked submit
//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// need to process
 $user = $_POST['u_name'];

  //A: escapeString "cleans" the data
	$user_es =$db->escapeString($user);
  //echo($user_es); //cleaned version, echo back to html

  //how many entries?
  //B: is there a user name in the db (table)? is it same from user that was entered
  //count ALL entries with that username
  //QUERYING *** (ask)
  $sql_select="SELECT COUNT(username) FROM usersTable WHERE username='$user_es'";
  $result = $db->query($sql_select);
  // if no query, die
  if (!$result) die("Cannot execute query.");

  //unpack number from table
  while($row = $result->fetchArray(SQLITE3_ASSOC))
  {
    foreach ($row as $entry) {
      // $entry COUNTS how many times it has been entered
      //echo($entry);
      if ($entry == 0) {
        // insert user into database SQL execute (INSERT) -- modifying table!
        $queryInsert ="INSERT INTO usersTable(username,activeCell)VALUES ('$user_es',0)";
        // again we do error checking when we try to execute our SQL statement on the db
        //execute, changing statment ()
        $ok1 = $db->exec($queryInsert);
        // Note:: error messages WILL be sent back to JQUERY success function .....
        if (!$ok1) {
          die("Cannot execute statement.");
          exit;
          }
          //send back success...
          //echo "success";
          //echo ($user_es);
          session_start();
          $_SESSION["user"] = $user_es;
        //  exit;
        } //if entry
        else {
        //  echo ($user_es);
          session_start();
          $_SESSION["user"] = $user_es;
          //echo "User already in the database";
        }
    }
  }//end while
  $sql_select='SELECT activeCell FROM usersTable';
  $result = $db->query($sql_select);
  // if no query, die
  if (!$result) die("Cannot execute query.");
  // get a row... (a 2D array back!)
  // MAKE AN ARRAY::
  $res = array();
  // counter
  $i=0;
  // associative because I want column names
  while($row = $result->fetchArray(SQLITE3_ASSOC))
  {
    // note the result from SQL is ALREADy ASSOCIATIVE
   $res[$i] = $row;
   $i++;
  }//end while
  // encode the resulting array as JSON (JAVASCRIPT DOES NOT UNDERSTAND PHP, JSON YES)
  $myJSONObj = json_encode($res);
  // echo from PHP, ajax is waititng for response, ajax picks it up as soon as smthg is echoed!
  // ECHO happens, go below to .ajax(); !!!
  echo $myJSONObj;
exit;
}//POST
?>
