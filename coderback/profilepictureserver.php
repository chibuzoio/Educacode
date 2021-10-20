<?php                  

require_once("../coderback/utility.php");              
require_once("../coderback/datamanager.php");                                      
require_once("../coderback/databasemanager.php");                                      

Utility::startEducacodeSession();                                                                      

$dataManager = new DataManager();                                              

$dataManager->setMemberId($_SESSION["memberId"]);                                  
$dataManager->setFirstName($_SESSION["firstName"]);                                  
$dataManager->setLastName($_SESSION["lastName"]);                                  

if (isset($_FILES['image'])) {                                           
    $dataManager->setImageName($_FILES['image']['name']);                           
    $dataManager->setImageTempName($_FILES['image']['tmp_name']);                     
    $dataManager->setImageSize($_FILES['image']['size']);                            
}                                               
else {                                           
	// display error page    
}                                         

$databaseManager = new DatabaseManager($dataManager);                                      
        
$databaseManager->doesUserNameExists()->commitProfilePicture();                                                      


