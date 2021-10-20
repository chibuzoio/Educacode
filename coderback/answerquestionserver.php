<?php                     

require_once("../Educacode/coderback/utility.php");                                     
require_once("../Educacode/coderback/datamanager.php");                                     
require_once("../Educacode/coderback/databasemanager.php");                                      
require_once("../Educacode/coderback/communitygeneralmanager.php");

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


