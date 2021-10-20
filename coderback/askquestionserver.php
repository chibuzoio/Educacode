<?php                                                

require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));                                                     
require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                          
require_once(realpath(dirname(__FILE__) . "/../coderback/databasemanager.php"));                          
require_once(realpath(dirname(__FILE__) . "/../coderback/communitygeneralmanager.php"));                          

Utility::startEducacodeSession();                                                         

$questionTitle = isset($_POST['questionTitle']) ? Utility::makeInputSafe($_POST['questionTitle']) : "";                     
$questionCategories = isset($_POST['questionCategory']) ? Utility::makeInputSafe($_POST['questionCategory']) : "";
$questionContent = isset($_POST['questionContent']) ? Utility::makeInputSafe($_POST['questionContent']) : "";

$dataManager = new DataManager();                                         

$dataManager->setMemberId($_SESSION["memberId"]);                                                          
$dataManager->setQuestionTitle($questionTitle);                                       
$dataManager->setQuestionCategories($questionCategories);                                          
$dataManager->setQuestionContent($questionContent);                                        

$databaseManager = new DatabaseManager($dataManager);                                                                 

$dataManager->setDatabaseManager($databaseManager);                                                               

$communityManager = new CommunityGeneralManager($dataManager);                                                              

$returnedValues = $communityManager->generateQuestionTablesName()->commitCommunityQuestion()->insertSearchQuestionTitle()->getQuestionValues();

print(json_encode($returnedValues));


