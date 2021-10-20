<?php                                    

require_once("../Educacode/coderback/utility.php");                                               
require_once("../Educacode/coderback/datamanager.php");                                               
require_once("../Educacode/coderback/databasemanager.php");                                               

Utility::startEducacodeSession();                                                         

$answerId = isset($_POST['answerId']) ? $_POST['answerId'] : "";                 
$questionId = isset($_POST['questionId']) ? $_POST['questionId'] : "";                 
$answerTableName = isset($_POST['answerTableName']) ? $_POST['answerTableName'] : "";                 

$dataManager = new DataManager();                                          

$dataManager->setAnswerId($answerId);                                    
$dataManager->setQuestionId($questionId);                                    
$dataManager->setAnswerTable($answerTableName);
$dataManager->setMemberId($_SESSION["memberId"]);                                         

$databaseManager = new DatabaseManager($dataManager);                                          

$returnedComposite = $databaseManager->getAnswerClapReplyTableNames()->getClapOnlyTableNames()->concatenateArrayTables()->dropArrayTables()->deleteAnswer()->updateQuestionAnswers()->getAnswersCount();

print(json_encode($returnedComposite));                                                           


