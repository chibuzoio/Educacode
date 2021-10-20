<?php              

require_once("../coderback/datamanager.php");                 
require_once("../coderback/projectresourcesinitializer.php");                 

$dataManager = new DataManager();                                  

$resourceInitializer = new ProjectResourcesInitializer($dataManager);                                   

$resourceInitializer->createProjectDatabase()->createProjectTables();                                  

print("Successfully created database!");                       


