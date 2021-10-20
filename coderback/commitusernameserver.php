<?php                                          

require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));              
require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                                      
require_once(realpath(dirname(__FILE__) . "/../coderback/databasemanager.php"));                                      

Utility::startEducacodeSession();                                                                      

$userName = isset($_POST['userName']) ? Utility::makeInputSafe($_POST['userName']) : "";                     

$dataManager = new DataManager();                                              

$dataManager->setUserName($userName);                                                    
$dataManager->setMemberId($_SESSION["memberId"]);                                                  

$databaseManager = new DatabaseManager($dataManager);                                      

$databaseManager->doesUserNameExists()->commitUserName();                                                      


