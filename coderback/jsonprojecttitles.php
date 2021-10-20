<?php           

require_once("../Educacode/coderback/datamanager.php");                 
require_once("../Educacode/coderback/databasemanager.php");                 

$dataManager = new DataManager();                                               
$databaseManager = new DatabaseManager($dataManager);                                            

print(json_encode($databaseManager->getProjectTitleMetadata()));                                  


