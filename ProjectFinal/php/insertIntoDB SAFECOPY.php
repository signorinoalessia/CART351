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
        $queryInsert ="INSERT INTO usersTable(username)VALUES ('$user_es')";
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
          echo ($user_es);
          exit;
        } //if entry
        else {
          echo ($user_es);
          //echo "User already in the database";
        }
    }
  }//end while
  exit;
}//POST
?>

<!DOCTYPE html>
<!-- Ok – so this is very similar to the previous example EXCEPT:
We left the action attribute of the form empty
We took out the method attribute of the form
We added an id called “insertGallery” to the form
We added a div with id called “result” in order to hold the results…. -->

<!-- php at top! -->
<html>
<head>
<title>Sample Insert into Gallery Form USING JQUERY AND AJAX </title>
<!-- get JQUERY -->
  <script src = "../libs/jquery-3.3.1.min.js"></script>
  <!-- //css goes here -->
<!--set some style properties::: -->
</head>
<body>

<div class= "formContainer">
<!--form done using more current tags... -->
<form id="insertUser" action="" enctype ="multipart/form-data">
<!-- group the related elements in a form -->
<h3> SUBMIT AN ART WORK :::</h3>
<fieldset>
<p><label>Username</label><input type="text" size="24" maxlength = "40" name = "u_name" required></p>

<p class = "sub"><input type = "submit" name = "submit" value = "submit my info" id ="buttonS" /></p>
 </fieldset>
</form>
</div>

<script>
let user = ""; //you will insert that user
  $(document).ready (function(){
    $("#insertUser").submit(function(event) {
      //stop submit the form, we will post it manually. PREVENT THE DEFAULT behaviour ...
      event.preventDefault(); // to ensure that it doesnt send anything, just click
      console.log("button clicked");
      let form = $('#insertUser')[0]; //get form data, put into right format
      let data = new FormData(form); //it will turn it into an html form, will make key values for me automatically

      // NEW::::: .ajax, like get json function, .ajax, more general, but more options!
      $.ajax({
              type: "POST",
              enctype: 'multipart/form-data',
              url: "insertIntoDB.php",
              data: data,
              processData: false,//prevents from converting into a query string
              contentType: false,
              cache: false,
              timeout: 600000,
              success: function (response) {
              console.log(response);
              user = response;
             },
             error:function(){
            console.log("error occurred");
          }
        });

          }); //insert gallery submit end

    // validate and process form here
        function displayResponse(theResult){
          let container = $('<div>').addClass("outer");
          let title = $('<h3>');
          $(title).text("Results from user");
          $(title).appendTo(container);
          let contentContainer = $('<div>').addClass("content");
          for (let property in theResult) {
            console.log(property);
            if(property ==="fileName"){
              let img = $("<img>");
              $(img).attr('src','images/'+theResult[property]);

              $(img).appendTo(contentContainer);
            }
            else{
              let para = $('<p>');
              $(para).text(property+"::" +theResult[property]);
                $(para).appendTo(contentContainer);
            }

          }
          $(contentContainer).appendTo(container);
          $(container).appendTo("#result");
        }

  }); //document ready end
</script>
</body>
</html>
