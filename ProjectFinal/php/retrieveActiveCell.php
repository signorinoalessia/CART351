<!DOCTYPE html>
<html lang="en" dir="ltr">
  <head>
    <meta charset="utf-8">
    <title>Retrieve activeCell for shadow position</title>
    <!-- get JQUERY -->
    <script src = "libs/jquery-3.3.1.min.js"></script>
  </head>
  <body>

    <div class= "formContainer">
      <form id="retrieveFromDB" action="">
        <fieldset>
          <!--name is important because associative array, key-value, way to link  -->
        <p><label>Criteria:</label><input type = "text" size="10" maxlength = "15"  name = "u_name" value = "ALL" required></p>
        <p class = "sub"><input type = "submit" name = "submit" value = "get Results" id ="buttonS" /></p>
         </fieldset>
      </form>
    <div>

    <!--right now result is empty  -->
    <div id = "result"></div>

    <script>
      $(document).ready (function(){
        $("retrieveFromDB").submit(function(event){
            event.preventDefault(); //prevent default posted
            console.log("button clicked");
            let form = $('#retrieveFromDB')[0];
            let data = new FormData(form);

            //from echo $myJSONObj(); going to parse into javascript object:::
            $.ajax({
              type: "POST",
              enctype: 'text/plain',
              url: "retrieveActiveCell.php", //same name as page
              dataL data,
              processData: false,
              contentType: false,
              cache: false,
              timeout: 600000,
              // !SUCCESS! When data posted to php. when result is sent back, callback occurs
              success: function(response){
                console.log(response);
                let parsedJSON = JSON.parse(response); //JSON .parse function to convert JSON string into js obj
                console.log(parsedJSON);
                displayResponse(parsedJSON);
              },
              error:function(){
                console.log("error occured");
              }
            });// end ajax
        }); //end submit

        function displayResponse(userResult){
          for(let i=0;i<userResult.length;i++){ //array of result objects
            let currentObject = userResult[i];
            let container =
          }
        }

      }); //end of documentReady
    </script>
  </body>
</html>
