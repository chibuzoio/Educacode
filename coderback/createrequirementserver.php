<?php                  

require_once("../Educacode/coderback/utility.php");                                                     
require_once("../Educacode/coderback/datamanager.php");                          
require_once("../Educacode/coderback/databasemanager.php");                          

$projectTitle = isset($_POST['projectTitle']) ? Utility::makeInputSafe($_POST['projectTitle']) : "";                     
$requirementTitle = isset($_POST['requirementTitle']) ? Utility::makeInputSafe($_POST['requirementTitle']) : "";                 
$requirementContent = isset($_POST['requirementBody']) ? Utility::makeInputSafe($_POST['requirementBody']) : "";                 

/*
$projectTitle = "Smith Chibuzo Experimental Web Application";             
$requirementTitle = "Software written by computer programmer.";                 
$requirementContent = "fsdafsjklf asjl kafjakls jfjakdhkjh akfhas";                       
*/                                 
       
$dataManager = new DataManager();                                          

$dataManager->setProjectTitle($projectTitle);                                   
$dataManager->setRequirementTitle($requirementTitle);                                   
$dataManager->setRequirementContent($requirementContent);                                                

$databaseManager = new DatabaseManager($dataManager);                                                             

$databaseManager->getParentProjectProperties()->commitProjectRequirement()->createRequirementsTable()->updateProjectModifiedDate();                                                     

// Always modify number of subtitles on every subtitle creation                              

// fetch required components
// commit subtitle to search
// commit subtitle to database
// create database if error was encountered during committing to database also call the previous step from this one after creating database
// increment subtitles and update the date modified for parent project and update them


