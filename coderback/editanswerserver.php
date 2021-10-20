<?php                                    

require_once("../Educacode/coderback/utility.php");                                               
require_once("../Educacode/coderback/datamanager.php");                                               
require_once("../Educacode/coderback/databasemanager.php");                                               

Utility::startEducacodeSession();                                                         

$answerId = isset($_POST['answerId']) ? $_POST['answerId'] : "";                 
$answerTableName = isset($_POST['answerTableName']) ? $_POST['answerTableName'] : "";                 
$theAnswer = isset($_POST["answer"]) ? Utility::makeInputSafe($_POST["answer"]) : "";

$dataManager = new DataManager();                                          

$dataManager->setAnswer($theAnswer);
$dataManager->setAnswerId($answerId);                                    
$dataManager->setAnswerTable($answerTableName);
$dataManager->setMemberId($_SESSION["memberId"]);                                         

$databaseManager = new DatabaseManager($dataManager);                                          

$returnedComposite = $databaseManager->editQuestionAnswer()->getAnswerValues();

print(json_encode($returnedComposite));                                                           


