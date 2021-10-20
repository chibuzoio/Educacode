<?php                  

require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));                                                     
require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                          
require_once(realpath(dirname(__FILE__) . "/../coderback/databasemanager.php"));                          

$projectTitle = isset($_POST['title']) ? Utility::makeInputSafe($_POST['title']) : "";                     
$projectSubtitle = isset($_POST['subtitle']) ? Utility::makeInputSafe($_POST['subtitle']) : "";                 
$projectArticle = isset($_POST['article']) ? Utility::makeInputSafe($_POST['article']) : "";                 

/*
$projectTitle = "Smith Chibuzo Experimental Web Application";             
$projectSubtitle = "Software written by computer programmer.";                 
$projectArticle = "fsdafsjklf asjl kafjakls jfjakdhkjh akfhas";                       
*/                                 
       
$dataManager = new DataManager();                                          

$dataManager->setProjectTitle($projectTitle);                                   
$dataManager->setProjectSubtitle($projectSubtitle);                                   
$dataManager->setProjectArticle($projectArticle);                                                

$databaseManager = new DatabaseManager($dataManager);                                                             

$databaseManager->getParentProjectProperties()->commitProjectSubtitle()->createProjectTables()->updateProjectComponents();                                                     

// Always modify number of subtitles on every subtitle creation                              

// fetch required components
// commit subtitle to search
// commit subtitle to database
// create database if error was encountered during committing to database also call the previous step from this one after creating database
// increment subtitles and update the date modified for parent project and update them


