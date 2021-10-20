<?php                                    

require_once("../Educacode/coderback/utility.php");                                               
require_once("../Educacode/coderback/datamanager.php");                                               
require_once("../Educacode/coderback/databasemanager.php");                                               

Utility::startEducacodeSession();                                                         

$questionId = isset($_POST['questionId']) ? $_POST['questionId'] : "";                 
$questionContent = isset($_POST['questionContent']) ? Utility::makeInputSafe($_POST['questionContent']) : "";
$questionCategories = isset($_POST['questionCategory']) ? Utility::makeInputSafe($_POST['questionCategory']) : "";

$dataManager = new DataManager();                                          

$dataManager->setQuestionId($questionId);                                    
$dataManager->setMemberId($_SESSION["memberId"]);                                         
$dataManager->setQuestionContent($questionContent);
$dataManager->setQuestionCategories($questionCategories);

$databaseManager = new DatabaseManager($dataManager);                                          

$returnedComposite = $databaseManager->editCommunityQuestion()->getQuestionValues();

print(json_encode($returnedComposite));                                                           


