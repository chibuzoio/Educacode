<?php                     

require_once("../coderback/utility.php");                                     
require_once("../coderback/datamanager.php");                                     
require_once("../coderback/databasemanager.php");                                      
require_once("../coderback/communitygeneralmanager.php");

Utility::startEducacodeSession();                                                         

$questionId = isset($_POST['questionId']) ? $_POST['questionId'] : "";
$questionAnswerTable = isset($_POST['answerTableName']) ? $_POST['answerTableName'] : "";
$theAnswer = isset($_POST["answer"]) ? Utility::makeInputSafe($_POST["answer"]) : "";

$dataManager = new DataManager();

$dataManager->setAnswer($theAnswer);
$dataManager->setQuestionId($questionId);
$dataManager->setMemberId($_SESSION["memberId"]);
$dataManager->setAnswerTable($questionAnswerTable);

$databaseManager = new DatabaseManager($dataManager);

$dataManager->setDatabaseManager($databaseManager);

$communityManager = new CommunityGeneralManager($dataManager);

$answerComposite = $communityManager->generateAnswerTablesName()->commitQuestionAnswer()->createAnswerTable()->updateQuestionAnswers()->getAnswerValues();

print(json_encode($answerComposite));


