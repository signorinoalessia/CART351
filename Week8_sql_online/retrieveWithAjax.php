<?php
class MyDB extends SQLite3
{
   function __construct()
   {
      $this->open('../Week8_db/graffitiGallery.db');
      //DATA is posted to PHP page
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

//check if there has been something posted to the server to be processed
// if WE made the AJAX REQUEST, get criteria
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// need to process
// input field is a_crit, thats how I know what value is
  $criteria = $_POST['a_crit'];
    if($criteria == "ALL")
    {
      $sql_select='SELECT * FROM artCollection';
      $result = $db->query($sql_select);
      // if no query, die
      if (!$result) die("Cannot execute query.");
    }
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
// echo from PHP, ajax is waiitng for response, ajax picks it up as soon as smthg is echoed!
// ECHO happens, go below to .ajax(); !!!
echo $myJSONObj;
exit;
}//POST
?>
<!DOCTYPE html>
<html>
<head>
<title>Sample Retrieval USING JQUERY AND AJAX </title>
<!-- get JQUERY -->
  <script src = "libs/jquery-3.3.1.min.js"></script>
<!--set some style properties::: -->
<link rel="stylesheet" type="text/css" href="css/galleryStyle.css">
</head>
<body>
<div class= "formContainer">
<!--form done using more current tags... -->
<form id="retrieveFromGallery" action="">
<!-- group the related elements in a form -->
<h3> RETRIEVE STUFF :::</h3>
<fieldset>
  <!--name is important because associative array, key-value, way to link  -->
<p><label>Criteria:</label><input type = "text" size="10" maxlength = "15"  name = "a_crit" value = "ALL" required></p>
<p class = "sub"><input type = "submit" name = "submit" value = "get Results" id ="buttonS" /></p>
 </fieldset>
</form>
</div>
<!-- NEW for the result -->
<!--right now result is empty  -->
<div id = "result"></div>
<!--ajax so javascript is used, jquery because life is easier -->
<script>
$(document).ready (function(){
    $("#retrieveFromGallery").submit(function(event) {
       //stop submit the form, we will post it manually. PREVENT THE DEFAULT behaviour (posting automatically) ...
    event.preventDefault();
     console.log("button clicked");
          // actual form, input field
     let form = $('#retrieveFromGallery')[0];
     // setting up key-value pairs, in a format that can be converted from form into json
     let data = new FormData(form);
     // WELCOME BACK, we got here from echo $myJSONObj();
     // parse into javascript object
     $.ajax({
            type: "POST",
            enctype: 'text/plain',
            // needs to be SAME NAME AS PAGE!
            url: "RetrieveWithAjax.php",
            data: data,
            processData: false,//prevents from converting into a query string
            contentType: false,
            cache: false,
            timeout: 600000,
            // !SUCCESS! When data posted to php. when result is sent back, THIS is the time callback is going to occur (wont be triggered before that)
            success: function (response) {
            console.log(response);
            //use the JSON .parse function to convert the JSON string into a Javascript object
            let parsedJSON = JSON.parse(response);
            console.log(parsedJSON);
            displayResponse(parsedJSON);
           },
           error:function(){
          console.log("error occurred");
        }
      });
   });

   // validate and process form here
    function displayResponse(theResult){
      // theResult is AN ARRAY of objects ...
      for(let i=0; i< theResult.length; i++)
      {
      // get the next object
      let currentObject = theResult[i];
      let container = $('<div>').addClass("outer");
      let contentContainer = $('<div>').addClass("content");
      // go through each property in the current object ....
      for (let property in currentObject) {
        if(property ==="image"){
          let img = $("<img>");
          $(img).attr('src',currentObject[property]);

          $(img).appendTo(contentContainer);
        }
        else{
          let para = $('<p>');
          $(para).text(property+"::" +currentObject[property]);
            $(para).appendTo(contentContainer);
        }

      }
      $(contentContainer).appendTo(container);
      $(container).appendTo("#result");
    }
  }

});
</script>
</body>
</html>
