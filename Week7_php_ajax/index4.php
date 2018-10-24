<html>
<head>
<title>Associative Arrays in php</title>
<link rel="stylesheet" type="text/css" href="css/testStyle.css">
</head>

<body>
<?php

// fill the array with the values
//Mary's thekey (instead of index)
$math201grades["Mary"] = "B";
$math201grades["John"] = "A-";
$math201grades["Steve"] = "B+";
$math201grades["Gina"] = "B-";
// output
echo "Mary's MATH 201 final grade: " . $math201grades["Mary"] . "<br />";
echo "John's MATH 201 final grade: " . $math201grades["John"] . "<br />";
echo "Steve's MATH 201 final grade: " . $math201grades["Steve"] . "<br />";
echo "Gina's MATH 201 final grade: ". $math201grades["Gina"] ."<br />";

//dumps keys (people)
$keys = array_keys($math201grades);
// var_dump() function outputs the contents of the array to the screen...
var_dump($keys);
echo "<br />";

//grade values
$values = array_values($math201grades);
var_dump($values);
echo "<br />";

// using a while loop
echo "Same example using a while loop <br \>";
$counter =0;
while($counter < count($shoppingList)){
	echo $shoppingList[$counter]."<br \>";
	$counter=$counter+1;
}

$keysArr = array_keys($math201grades);
for($i=0; $i<count($keys); $i++)
{
  echo" the value at index: ". $i . " is " . $math201grades[$keysArr[$i]]. " for the key: ".$keysArr[$i]. "<br />";
}

foreach($math201grades as $entry)
{
    echo("the value using an associative array:: ".$entry."<br />");
}

// THE MOST USEFUL FORM< BECAUSE for each element (entry)give me key and entry pair
// $key => $entry, pointer
foreach ($math201grades as $key => $entry)
{
    echo "Key: $key; Value: $entry<br />";
}


?>
</body>
</html>
