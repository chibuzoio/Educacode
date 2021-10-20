<?php                     

session_start();                         

$allJSONData = array();                                                   
$cartProductsArray = isset($_SESSION['cartProductsArray']) ? $_SESSION['cartProductsArray'] : array();                                 

if (is_array($cartProductsArray)) {                                                      
	$_SESSION["numberOfCartItems"] = 0;                         
	$_SESSION["productTotalPrice"] = "";                                            
	$_SESSION["cartProductsArray"] = array();                                              

	$allJSONData["cartProductsArray"] = $_SESSION['cartProductsArray'];                               
	$allJSONData["productArrayCount"] = $_SESSION["numberOfCartItems"];                                     
	$allJSONData["productTotalPrice"] = $_SESSION["productTotalPrice"];                                             

	print(json_encode($allJSONData));                                       
}                                                


