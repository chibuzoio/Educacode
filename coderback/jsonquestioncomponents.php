<?php                                                                            

require_once("../Educacode/coderback/utility.php");                                     
require_once("../Educacode/coderback/datamanager.php");                                     
require_once("../Educacode/coderback/databasemanager.php");                                      

Utility::startEducacodeSession();                                                         

$questionClapTable = isset($_POST['clapTableName']) ? $_POST['clapTableName'] : "";                     
$questionAnswerTable = isset($_POST['answerTableName']) ? $_POST['answerTableName'] : "";                            

$dataManager = new DataManager();                               

$dataManager->setClapTable($questionClapTable);                              
$dataManager->setMemberId($_SESSION["memberId"]);                                              
$dataManager->setAnswerTable($questionAnswerTable);                              

$databaseManager = new DatabaseManager($dataManager);                                            

print(json_encode($databaseManager->getQuestionComponents()));                                                     


