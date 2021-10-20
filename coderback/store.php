<?php                          

require_once("../Educacode/coderback/utility.php");                    
require_once("../Educacode/coderback/datamanager.php");                    
      
class Store {                      
	
	private $title;                      
	private $bodyID;                      
	private $checkoutOPtionsClassArray;                    

	public function getBodyID() {
		return $this->bodyID;                     
	}

	public function setBodyID($bodyID) {
		Utility::isString($bodyID);                     
		$this->bodyID = $bodyID;                   
	}

	public function getPageTitle() {
		return $this->title;                   
	}

	public function setPageTitle($title) {                    
		Utility::isString($title);                     
		$this->title = $title;                                          
	}

	public function getCheckoutOptionsClass() {
		return $this->myClass;               
	}                              

	public function setCheckoutOptionsClass($myClass) {
		$this->myClass = $myClass;                    
	}                                     
	
	public static function getNumberOfCartItems() {
		return DataManager::getNumberOfCartItems();                      
	}

	public static function getCartItemsClass() {                            
		$cartItemsNumberClass = "";                  

		if (DataManager::getNumberOfCartItems() > 0) {
			$cartItemsNumberClass = "cartItemsNumber-on";              
		}                           
		else {
			$cartItemsNumberClass = "cartItemsNumber-off";              
		}                

		return $cartItemsNumberClass;           
	}                 

	public static function getSideMenuCartItemsClass() {               
		$sideMenuCartItemsNumberClass = "";                  

		if (DataManager::getNumberOfCartItems() > 0) {
			$sideMenuCartItemsNumberClass = "sideMenuCartItemsNumber-on";              
		}                           
		else {
			$sideMenuCartItemsNumberClass = "sideMenuCartItemsNumber-off";              
		}                

		return $sideMenuCartItemsNumberClass;           
	}                 
}                  


