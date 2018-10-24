<html>
<head>
<title>Arrays in php</title>
<link rel="stylesheet" type="text/css" href="css/testStyle.css">
</head>

<body>
<?php

$shoppingList=array('Milk', 'Bread', 'Beans');
echo "I need " . $shoppingList[0] . ", " . $shoppingList[1] . " and " . $shoppingList[2] . ".";
$shoppingList[1] ="Crackers";
echo "<br /> I need now: " . $shoppingList[0] . ", " . $shoppingList[1] . " and " . $shoppingList[2] . ".";

//cant do array.length, you need to count it!
echo "<br /> Current Array length: ". count($shoppingList);
$shoppingList[3] ="Oranges";
echo "<br /> Final Shopping list: " . $shoppingList[0] . ", " . $shoppingList[1] . " and " . $shoppingList[2] ." and ".$shoppingList[3] .".";
echo "<br /> New Array length: ". count($shoppingList);


?>
</body>
</html>
