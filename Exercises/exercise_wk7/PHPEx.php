<?php
//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
    $sampleDataAsIfInAFile = array("smarties","twix","snickers","maltesers","flake","wunderbar","mars");
    $sampleDataAsIfInAFile2 = array("oranges","apples","peppers","carrots","grapes","grapefruits","kumquats");
    $sampleDataAsIfInAFile3 = array('#00c770','#0c9e9e','#007b6a','#ffbf56','#dfa400','#5493ff','#2d39ec');

// POSTED DATA is the following::
// need to process -> we could save this data ...
 $xPos = $_POST['xpos'];
 $yPos = $_POST['ypos'];
 $action = $_POST['action'];
 //do some silly processing:
 $newPos = $xPos+$yPos;
//circle data
 $xPosC = $_POST['xPosC'];
 $yPosC = $_POST['yPosC'];
 $newPosC = $xPosC+$yPosC;
 //lets choose a word from our "data file" based on the sum of the x and y pos...
 //there are 2 possible actions choose the word depending on action...
 // DATA TO SEND WILL BE PACKAGED INTO A CLASS/OBJECT TO BE SENT TO CLIENT (JSON)*
 if($action =="theButton"){
 $dataToSend =  $sampleDataAsIfInAFile[$newPos%count($sampleDataAsIfInAFile)];
}
else if ($action == "theCircle"){
    $dataToSend = $sampleDataAsIfInAFile3[$newPosC%count($sampleDataAsIfInAFile3)];;
}
else{
  $dataToSend = $sampleDataAsIfInAFile2[$newPos%count($sampleDataAsIfInAFile2)];;
}

//$myPackagedData package for client (javascript)
// same as sendData and ajax package for server (php)

  //DATA TO BE SENT TO CLIENT AS A JSON OBJECT AKA PACKAGED DATA*

    //package the data and echo back...
    $myPackagedData=new stdClass();
    $myPackagedData->word = $dataToSend;
    // what we send : ex:
    //{"word": "snickers"}
     // Now we want to JSON encode these values to send them to $.ajax success. ***
    $myJSONObj = json_encode($myPackagedData);
    //ECHO IS THE
    echo $myJSONObj;
    exit;
}//POST
?>

<!DOCTYPE html>
<html>
<head>
<title>EX7: USING JQUERY AND AJAX AND CANVAS </title>
<!-- get JQUERY -->
  <script src = "libs/jquery-3.3.1.min.js"></script>
<style>
body{
  margin:0;
  padding:0;
}
canvas{
  background:black;
  margin:0;
  padding:0;
}
/* purple button, an html div */
#b{
  background:purple;
  color:white;
  margin:5px;
  text-align: center;
  padding: 5px;
  width:10%;
}
</style>
</head>
<body>
<div id = "b"><p>CLICK BUTTON</p></div>

<canvas id="myCanvas" width=500 height=500></canvas>
<!-- here we put our JQUERY -->
<script>
$(document).ready (function(){
  //declare some global vars ...
  let x =10;
  let y =10;
  let theWord = "";
  let theWord2 = "";
  //start ani
  goAni();
  // when we click on the canvas somewhere and the collision detection returns true ...

  $('#myCanvas').on("mousedown",function(event){
  //  console.log("mouseover on canvas");
    let truth = checkCollision(event);
    if(truth ===true){
      //our function for sending data
      sendData("theCanvas");
    }
  });

  //circle event listener
  $('#myCanvas').on("mousedown",function(event){
    let collided = checkCollisionCircle(event);
    if(collided === true){
      sendData("theCanvas");
    }
  });

  // you can only do this BECAUSE ITS NOT INSIDE THE CANVAS
  // if we click on the purple button other stuff happens ...
    $( "#b" ).click(function( event ) {
      //stop submit the form, we will post it manually. PREVENT THE DEFAULT behaviour ...
       event.preventDefault();
       console.log("button clicked");
       sendData("theButton");
     });

     // sendData and ajax package for server (php)
     // same as $myPackagedData package for client (javascript)

     // apped is a method of the FormData class, *ADDS KEY-VALUE PAIRS*
     // key-value that is taken from php (data.)
     function sendData(typeOfClick){
       let data = new FormData();
       data.append('action', typeOfClick);
       data.append('xpos', x);
       data.append('ypos', y);

       data.append('xPosC',x2);
       data.append('yPosC',y2);

       // a jquery action (dot notation)
       // ajax PARSES (is converting string of php) data into native JavaScript
       $.ajax({
             type: "POST",
             enctype: 'multipart/form-data',
             url: "PHPEx.php",
             data: data,
             processData: false,//prevents from converting into a query string
             contentType: false,
             cache: false,
             timeout: 600000,
             success: function (response) {
             //reponse is a STRING (not a JavaScript object -> so we need to convert)
             console.log(response);
             //use the JSON .parse function to convert the JSON string into a Javascript object
             let parsedJSON = JSON.parse(response);
             console.log(parsedJSON);
             if(typeOfClick ==="theButton"){
             theWord = parsedJSON.word;
           }
           else if(typeOfClick ==="theCircle"){
           //change color of circle
           theColor = parsedJSON.color;
           } else {
              theWord2 = parsedJSON.word;
           }

         },
         error:function(){
           console.log("error occured");
         }
       });
     } //end sendData

    function goAni(){
      let canvas = document.getElementById('myCanvas');
      let canvasContext = canvas.getContext('2d');

      requestAnimationFrame(runAni);

     function runAni(){
     //need to reset the background :)
     // clear the canvas ...
     canvasContext.clearRect(0, 0, canvas.width, canvas.height);
     canvasContext.fillStyle = "#33B2FF";
     canvasContext.fillRect(x,y,20,20);
     canvasContext.fillStyle = "#FFFFFF";
     canvasContext.fillRect(x,y,1,1);
     x+=0.2;
     y+=0.2;

     //rendering the circle
     canvasContext.beginPath();
     context.fillStyle = theColor; //how to link to ajax method?
     context.strokeStyle = "#fff";
     context.lineWidth = 2;
     context.arc(x,y,15,0,2*Math.PI,true);
     context.fill();
     context.stroke();
     context.closePath();
     x+=0.1;
     y+=0.1;

     canvasContext.font = "40px Arial";
     canvasContext.fillStyle = "#B533FF";
     canvasContext.fillText(theWord,canvas.width/2 - (theWord.length/2*20),canvas.height/2);

     canvasContext.fillStyle = "#FF9033";
     canvasContext.fillText(theWord2,canvas.width/2 - (theWord2.length/2*20),canvas.height/4);
     requestAnimationFrame(runAni);
   }
 } //en goAni

  function checkCollision(event){
    let domRect = document.getElementById("myCanvas").getBoundingClientRect();
     if(x>event.clientX-20 && x<event.clientX+20 && y >(event.clientY-domRect.top)-20 && y<((event.clientY-domRect.top)+20))
    {
      return true;
    }
    return false;
  }

  function checkCollisionCircle(event){
    let circleArea = document.getElementById("myCanvas").getBoundingClientRect();
    if(Math.sqrt(Math.pow((event.clientX-circleArea.xPos),2) + Math.pow((event.clientY - circleArea.yPos),2))< circleArea.radius){
      console.log("circle"+ ${circleArea.ellipseID} +"was pressed");
    }
    return true;
  } //end collisionCircle

}); //document ready
</script>
</body>
</html>
