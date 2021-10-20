<?php                                    

require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));                                               
require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                                               
require_once(realpath(dirname(__FILE__) . "/../coderback/databasemanager.php"));                                               

Utility::startEducacodeSession();                                                         

$questionId = isset($_POST['questionId']) ? $_POST['questionId'] : "";                 
$questionTitle = isset($_POST['questionTitle']) ? $_POST['questionTitle'] : "";                 

$dataManager = new DataManager();                                          

$dataManager->setQuestionId($questionId);                                    
$dataManager->setQuestionTitle($questionTitle);
$dataManager->setMemberId($_SESSION["memberId"]);                                         

$databaseManager = new DatabaseManager($dataManager);                                          

$returnedComposite = $databaseManager->getClapAnswerTableNames()->getClapReplyTableNames()->getClapOnlyTableNames()->concatenateArrayTables()->dropArrayTables()->deleteQuestion()->deleteSearchQuestion();

print(json_encode($returnedComposite));                                                           


