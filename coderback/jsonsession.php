<?php                 

session_start();                    

require_once("../include/utility.php");                      
require_once("../include/datamanager.php");                      

$tempIndex = 0;                         
$collectionSize = 0;                                   
$allJSONData = array();                                                
$collectionPrice = 0.00;                                       
$cartProductsArray = isset($_SESSION['cartProductsArray']) ? $_SESSION['cartProductsArray'] : array();                                 
$collectionName = isset($_POST['collectionName']) ? $_POST['collectionName'] : "";       
$collectionImage = isset($_POST['collectionImage']) ? $_POST['collectionImage'] : "";       
$collectionOldPrice = isset($_POST['collectionOldPrice']) ? $_POST['collectionOldPrice'] : "";       
$collectionNewPrice = isset($_POST['collectionNewPrice']) ? $_POST['collectionNewPrice'] : "";              

if (isset($_POST['collectionName'])) {                          
	for ($i = 0; $i < count($cartProductsArray); $i++) {
		if ($cartProductsArray[$i]["collectionName"] === $collectionName) {                       
			$collectionSize = isset($cartProductsArray[$i]["collectionSize"]) ? $cartProductsArray[$i]["collectionSize"] : 0;                         
			$collectionSize++;                                                                
			$tempIndex = $i;                                   
		}                                             
	}                                       

	if ($collectionSize > 0) {                                  
		$cartProductsArray[$tempIndex]["collectionSize"] = $collectionSize;                                         

		$collectionPrice = doubleval(substr($cartProductsArray[$tempIndex]["collectionNewPrice"], 1)) * $cartProductsArray[$tempIndex]["collectionSize"];                              

		$cartProductsArray[$tempIndex]["collectionTotalPrice"] = "$" . number_format($collectionPrice, 2);                                             
	}                                      
	else {
		$tempIndex = count($cartProductsArray);                             
		$cartProductsArray[$tempIndex]["collectionName"] = $collectionName;                       
		$cartProductsArray[$tempIndex]["collectionImage"] = $collectionImage;                          
		$cartProductsArray[$tempIndex]["collectionOldPrice"] = $collectionOldPrice;                 
		$cartProductsArray[$tempIndex]["collectionNewPrice"] = $collectionNewPrice;                       
		$cartProductsArray[$tempIndex]["collectionSize"] = 1;                             
		$cartProductsArray[$tempIndex]["collectionTotalPrice"] = $collectionNewPrice;                             
	}

	$numberOfCartItems = 0;                                  
	$cartProductsPrice = 0.00;                                            

	for ($i = 0; $i < count($cartProductsArray); $i++) {
		$numberOfCartItems += $cartProductsArray[$i]["collectionSize"];                                  
		$cartProductsPrice += doubleval(substr($cartProductsArray[$i]["collectionTotalPrice"], 1));                           
	}

	DataManager::setNumberOfCartItems($numberOfCartItems);                  

	$_SESSION["cartProductsArray"] = $cartProductsArray;                                   
	$_SESSION["productTotalPrice"] = "$" . number_format($cartProductsPrice, 2);                                             
	
	$allJSONData["cartProductsArray"] = $_SESSION['cartProductsArray'];                    
	$allJSONData["productArrayCount"] = $numberOfCartItems;                             
	$allJSONData["productTotalPrice"] = $_SESSION["productTotalPrice"];                                             

	print(json_encode($allJSONData));                          
}                                                          


