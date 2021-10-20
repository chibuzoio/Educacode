<?php              

require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                 
require_once(realpath(dirname(__FILE__) . "/../coderback/projectresourcesinitializer.php"));                 

$dataManager = new DataManager();                                  

$resourceInitializer = new ProjectResourcesInitializer($dataManager);                                   

$resourceInitializer->createProjectDatabase()->createProjectTables();                                  

print("Successfully created database!");                       


