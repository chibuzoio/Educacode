<?php                            

session_start();                         

$numberOfCartItems = 0;                                  
$allJSONData = array();                                                   
$cartProductsArray = isset($_SESSION['cartProductsArray']) ? $_SESSION['cartProductsArray'] : array();                                 

if (is_array($cartProductsArray)) {                                                      
	for ($i = 0; $i < count($cartProductsArray); $i++) {
		$numberOfCartItems += $cartProductsArray[$i]["collectionSize"];                       
	}                                                   

	$_SESSION["cartProductsArray"] = $cartProductsArray;                                              

	$allJSONData["cartProductsArray"] = $_SESSION['cartProductsArray'];                               
	$allJSONData["productArrayCount"] = $numberOfCartItems;                                     
	$allJSONData["productTotalPrice"] = $_SESSION["productTotalPrice"];                                             

	print(json_encode($allJSONData));                                       
}                                                


