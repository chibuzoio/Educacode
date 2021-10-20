<?php                          

require_once("../coderback/utility.php");                           
require_once("../coderback/datamanager.php");                              
require_once("../coderback/databasemanager.php");                              

Utility::startEducacodeSession();                                                                    

$emailAddress = isset($_POST["loginEmail"]) ? Utility::makeInputSafe($_POST["loginEmail"]) : "";          
$password = isset($_POST["loginPassword"]) ? Utility::makeInputSafe($_POST["loginPassword"]) : "";                                                             

$dataManager = new DataManager();                                           

$dataManager->setPassword($password);                                  
$dataManager->setEmailAddress($emailAddress);                                        

$databaseManager = new DatabaseManager($dataManager);                                                                

$databaseManager->getUserDataForLogin()->verifyLoginPassword();                                                                         


