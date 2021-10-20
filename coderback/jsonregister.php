<?php           

require_once("../Educacode/coderback/utility.php");                 
require_once("../Educacode/coderback/datamanager.php");                 
require_once("../Educacode/coderback/databasemanager.php");                 

Utility::startEducacodeSession();                                         

$dataManager = new DataManager();                                               
$databaseManager = new DatabaseManager($dataManager);                                            

print(json_encode($databaseManager->getEducacodeMembers()));                                  


