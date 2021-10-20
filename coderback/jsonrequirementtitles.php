<?php                   

require_once("../Educacode/coderback/datamanager.php");                 
require_once("../Educacode/coderback/databasemanager.php");                 

$requirementTableName = isset($_POST['requirementTableName']) ? $_POST['requirementTableName'] : "";                          

$dataManager = new DataManager();                                               

$dataManager->setRequirementTable($requirementTableName);                                               

$databaseManager = new DatabaseManager($dataManager);                                            

print(json_encode($databaseManager->getProjectRequirementTitles()));                                  


