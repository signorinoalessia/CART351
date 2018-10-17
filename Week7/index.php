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
echo "<div> Hello World in div tags </div>";
echo "<div id ='divWithSpecificStyle'> Hello World in div tags using a <strong>specific</strong> style </div>";
echo "<div id ='divWithExtStyle'> Hello World in div tags using an <strong>external</strong> style </div>";
?>
</body>
</html>
