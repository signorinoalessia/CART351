<!DOCTYPE html>
<html>
<head>
<title>Sample Insert into Gallery Form </title>
<!--set some style properties::: -->
<link rel="stylesheet" type="text/css" href="css/galleryStyle.css">
</head>
<body>

<!--Importance of location php code for WHEN you want to echo data  -->
<?php
//check if there has been something posted to the server to be processed
if($_SERVER['REQUEST_METHOD'] == 'POST')
{
// need to process
//links names: takes name of labels inside fieldset and uses it as key!!
 $artist = $_POST['a_name'];
 $title = $_POST['a_title'];
 $loc = $_POST['a_geo_loc'];
 $description = $_POST['a_descript'];
 $creationDate = $_POST['a_date'];

 // check that there is a FILES ARRAY
 	if($_FILES)
 	{
    // say file name and temporary storage location
   	echo "file name: ".$_FILES['filename']['name'] . "<br />";
   	echo "path to file uploaded: ".$_FILES['filename']['tmp_name']. "<br />";

    // store uploaded info and image
    // say where its not stored
    $fname = $_FILES['filename']['name'];
    move_uploaded_file($_FILES['filename']['tmp_name'], "images/".$fname);
    echo "<br \>Stored in: " . "images/" .$fname."<br \>";

    // display uploaded info and image
    echo "<div class = 'outer'>";
    echo "<h3> Results from user </h3>";
    echo "<div class ='content'>";
    echo "<p> Artist:: ".$artist."</p>";
    echo "<p> Title:: ".$title."</p>";
    echo "<p> Location:: ".$loc."</p>";
    echo "<p> Description:: ".$description."</p>";
    echo "<p> Creation Date:: ".$creationDate."</p>";
    echo "<img src ='images/".$fname."'\>";
    echo "</div>";
    echo "</div>";
 	}

}
?>

<div class= "formContainer">
<!--form done using more current tags... -->
<!--ACTION: where is it submitted, not get, using post, string and also image, ensure form takes pics  -->
<form action="insertForm.php" method="post" enctype ="multipart/form-data">
<!-- group the related elements in a form -->
<h3> SUBMIT AN ART WORK :::</h3>
<fieldset>
<!--required is one form of validating info, find jquery libraries for that! (make sure valid email etc)  -->
<label>Artist:</label><input type="text" size="24" maxlength = "40" name = "a_name" required>
<p><label>Title:</label><input type = "text" size="24" maxlength = "40"  name = "a_title" required></p>
<p><label>Geographic Location:</label><input type = "text" size="24" maxlength = "40" name = "a_geo_loc" required></p>
<p><label>Creation Date (DD-MM-YYYY):</label><input type="date" name="a_date" required></p>
<p><label>Description:</label><textarea type = "text" rows="4" cols="50" name = "a_descript" required></textarea></p>
<p><label>Upload Image:</label> <input type ="file" name = 'filename' size=10 required/></p>
<p class = "sub"><input type = "submit" name = "submit" value = "submit my info" id =buttonS /></p>
 </fieldset>
</form>
</div>

</body>
</html>
