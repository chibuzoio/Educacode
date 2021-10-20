<?php           

require_once("../coderback/datamanager.php");                 
require_once("../coderback/databasemanager.php");                 

$dataManager = new DataManager();                                               
$databaseManager = new DatabaseManager($dataManager);                                            

print(json_encode($databaseManager->getProjectTitleMetadata()));                                  


