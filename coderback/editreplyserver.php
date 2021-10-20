<?php                                    

require_once("../Educacode/coderback/utility.php");                                               
require_once("../Educacode/coderback/datamanager.php");                                               
require_once("../Educacode/coderback/databasemanager.php");                                               

Utility::startEducacodeSession();                                                         

$replyId = isset($_POST['replyId']) ? $_POST['replyId'] : "";                 
$answerId = isset($_POST['answerId']) ? $_POST['answerId'] : "";                 
$replyTableName = isset($_POST['replyTableName']) ? $_POST['replyTableName'] : "";                 
$answerTableName = isset($_POST['answerTableName']) ? $_POST['answerTableName'] : "";                 

$dataManager = new DataManager();                                          

$dataManager->setReplyId($replyId);                                    
$dataManager->setAnswerId($answerId);                                    
$dataManager->setReplyTable($replyTableName);
$dataManager->setAnswerTable($answerTableName);
$dataManager->setMemberId($_SESSION["memberId"]);                                         
$dataManager->setTemporaryTables(array($replyTableName));

$databaseManager = new DatabaseManager($dataManager);                                          

$returnedComposite = $databaseManager->getClapOnlyTableNames()->concatenateArrayTables()->dropArrayTables()->deleteReply()->updateAnswerReplies()->getRepliesCount();

print(json_encode($returnedComposite));                                                           


