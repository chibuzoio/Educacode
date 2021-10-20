<?php                                    

require_once("../coderback/utility.php");
require_once("../coderback/datamanager.php");
require_once("../coderback/databasemanager.php");

Utility::startEducacodeSession();

$answerId = isset($_POST['answerId']) ? $_POST['answerId'] : "";
$clapTable = isset($_POST['clapTableName']) ? $_POST['clapTableName'] : "";
$answerTable = isset($_POST['answerTableName']) ? $_POST['answerTableName'] : "";

$dataManager = new DataManager();

$dataManager->setAnswerId($answerId);
$dataManager->setClapTable($clapTable);
$dataManager->setAnswerTable($answerTable);
$dataManager->setMemberId($_SESSION["memberId"]);

$databaseManager = new DatabaseManager($dataManager);

$returnedComposite = $databaseManager->clapForAnswer()->createClapAnswerTable()->updateAnswerClaps();

print(json_encode($returnedComposite));


