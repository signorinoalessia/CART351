<html>
<head>
<title>Hello world example in php</title>
<link rel="stylesheet" type="text/css" href="css/testStyle.css">
<style>

div
{
  width: 200px;
  height: 200px;
  margin: 2px;
  padding: 4px;
  border-width:2px;
  border-style:solid;
  border-color:#ccc;
  background-color:#98bf21;
  font-size:14px;
  color:#111111;
  font-family:arial;

}

#divWithSpecificStyle
{
  width: 200px;
  height: 200px;
  margin: 2px;
  padding: 4px;
  border-width:2px;
  border-style:solid;
  border-color:#ccc;
  background-color:#3ad7ff;
  font-size:14px;
  color:#333333;
  font-family:arial;
 }
</style>
</head>
<body>
<?php
//double quotes on the outside, single quotes on the inside

// declare some variables ...
$firstName = "Maria";
$lastName = "Smith";
$age =22;
$occupation ="Receptionist";

// use them by writing them to the browser using the echo command.
echo"<h3> the original assignments to our variables::</h3>";
//the dot is like plus operator (concatenation)
echo $firstName."<br \>";
echo $lastName."<br \>";
echo $age."<br \>";
echo $occupation."<br \>";

// now change the variables and echo again::
$firstName = "Sarah";
$lastName = "Keene";
$age =24;
$occupation ="Graphic Designer";

// use them again by writing them to the browser using the echo command.
echo"<h3> the variables reassigned::</h3>";
echo $firstName."<br \>";
echo $lastName."<br \>";
echo $age."<br \>";
echo $occupation."<br \>";

//switch example
// select a random number between 1 and 10
 $myRandomNum = rand(1,10);
 switch($myRandomNum){
  case 1:
    echo "the value is 1 <br />";
    break;
  case 2:
    echo "the value is 2 <br />";
    break;
  case 3:
    echo "the value is 3 <br />";
   break;
  case 4:
    echo "the value is 4 <br />";
    break;
  case 5:
    echo "the value is 5 <br />";
    break;
  case 6:
    echo "the value is 6 <br />";
    break;
  case 7:
    echo "the value is 7 <br />";
    break;
  case 8:
    echo "the value is 8 <br />";
    break;
  case 9:
    echo "the value is 9 <br />";
   break;
  case 10:
    echo "the value is 10 <br />";
    break;
  default:
  echo " the value is not between 1 and 10 ...";
}



?>
</body>
</html>
