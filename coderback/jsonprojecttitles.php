<?php           

require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                 
require_once(realpath(dirname(__FILE__) . "/../coderback/databasemanager.php"));                 

$dataManager = new DataManager();                                               
$databaseManager = new DatabaseManager($dataManager);                                            

print(json_encode($databaseManager->getProjectTitleMetadata()));                                  


