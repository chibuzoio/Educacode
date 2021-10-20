<?php              

require_once("../Educacode/coderback/datamanager.php");                 
require_once("../Educacode/coderback/projectresourcesinitializer.php");                 

$dataManager = new DataManager();                                  

$resourceInitializer = new ProjectResourcesInitializer($dataManager);                                   

$resourceInitializer->createProjectDatabase()->createProjectTables();                                  

print("Successfully created database!");                       


