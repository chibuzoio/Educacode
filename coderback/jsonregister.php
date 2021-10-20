<?php           

require_once("../coderback/utility.php");                 
require_once("../coderback/datamanager.php");                 
require_once("../coderback/databasemanager.php");                 

Utility::startEducacodeSession();                                         

$dataManager = new DataManager();                                               
$databaseManager = new DatabaseManager($dataManager);                                            

print(json_encode($databaseManager->getEducacodeMembers()));                                  


