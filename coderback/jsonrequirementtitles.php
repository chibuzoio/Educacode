<?php                   

require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                 
require_once(realpath(dirname(__FILE__) . "/../coderback/databasemanager.php"));                 

$requirementTableName = isset($_POST['requirementTableName']) ? $_POST['requirementTableName'] : "";                          

$dataManager = new DataManager();                                               

$dataManager->setRequirementTable($requirementTableName);                                               

$databaseManager = new DatabaseManager($dataManager);                                            

print(json_encode($databaseManager->getProjectRequirementTitles()));                                  


