<?php                  

require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));              
require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                                      
require_once(realpath(dirname(__FILE__) . "/../coderback/databasemanager.php"));                                      

/*
$projectTitle = "Solution Web Application";                      
$projectLibrary = "";                          
$projectCategory = "WEB";                          
$projectObjective = "Solution Web Application";                        
$projectDevelopers = "Smith Chibuzo";                               
$utilityToolsUsed = "Sublime Texr, MySQL";                               
$projectLanguages = "PHP JAVA C/C++ JAVASCRIPT RUBY";                          
$projectImage = "";                          
*/

$projectTitle = isset($_POST['title']) ? Utility::makeInputSafe($_POST['title']) : "";                     
$projectLibrary = isset($_POST['library']) ? Utility::makeInputSafe($_POST['library']) : "";                 
$projectCategory = isset($_POST['category']) ? Utility::makeInputSafe($_POST['category']) : "";                 
$projectObjective = isset($_POST['objective']) ? Utility::makeInputSafe($_POST['objective']) : "";                 
$projectDevelopers = isset($_POST['developer']) ? Utility::makeInputSafe($_POST['developer']) : "";                 
$utilityToolsUsed = isset($_POST['toolsUsed']) ? Utility::makeInputSafe($_POST['toolsUsed']) : "";                 
$projectLanguages = isset($_POST['languages']) ? Utility::makeInputSafe($_POST['languages']) : "";                 

$dataManager = new DataManager();                                              

$dataManager->setProjectTitle($projectTitle);                              
$dataManager->setProjectCategory($projectCategory);                              
$dataManager->setProjectObjective($projectObjective);                              
$dataManager->setProjectDevelopers($projectDevelopers);                              
$dataManager->setProjectLanguages($projectLanguages);                              
$dataManager->setProjectLibrary($projectLibrary);                              
$dataManager->setUtilityToolsUsed($utilityToolsUsed);                              

if (isset($_FILES['image'])) {                                           
    $dataManager->setImageName($_FILES['image']['name']);                           
    $dataManager->setImageTempName($_FILES['image']['tmp_name']);                     
    $dataManager->setImageSize($_FILES['image']['size']);                            
}                                               
else {                                           
	// display error page    
}                                         

$databaseManager = new DatabaseManager($dataManager);                                      

$databaseManager->doesProjectExists()->generateProjectTablesName()->commitProjectToDatabase()->getSplitStringArray()->registerProjectToMenuData()->insertSearchProjectTitleWord();                                 


