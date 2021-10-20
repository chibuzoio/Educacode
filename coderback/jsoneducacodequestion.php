<?php           

require_once("../Educacode/coderback/utility.php");                 
require_once("../Educacode/coderback/datamanager.php");                 
require_once("../Educacode/coderback/databasemanager.php");                 

Utility::startEducacodeSession();                                         

$dataManager = new DataManager();                                               

$dataManager->setMemberId($_SESSION["memberId"]);

$databaseManager = new DatabaseManager($dataManager);                                            

print(json_encode($databaseManager->getEducacodeQuestions()));                                            


