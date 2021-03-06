<?php                                    

require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));                                               
require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                                               
require_once(realpath(dirname(__FILE__) . "/../coderback/databasemanager.php"));                                               

Utility::startEducacodeSession();                                                         

$questionId = isset($_POST['questionId']) ? $_POST['questionId'] : "";                 
$clapTable = isset($_POST['clapTableName']) ? $_POST['clapTableName'] : "";                 
$answerTable = isset($_POST['answerTableName']) ? $_POST['answerTableName'] : "";                        

$dataManager = new DataManager();                                          

$dataManager->setClapTable($clapTable);                                    
$dataManager->setQuestionId($questionId);                                    
$dataManager->setAnswerTable($answerTable);                                       
$dataManager->setMemberId($_SESSION["memberId"]);                                         

$databaseManager = new DatabaseManager($dataManager);                                          

$returnedComposite = $databaseManager->clapForQuestion()->createClapQuestionTable()->updateQuestionClaps();

print(json_encode($returnedComposite));                                                           


