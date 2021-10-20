<?php                                                                            

require_once("../Educacode/coderback/utility.php");                                     
require_once("../Educacode/coderback/datamanager.php");                                     
require_once("../Educacode/coderback/databasemanager.php");                                      

Utility::startEducacodeSession();                                                         

$answerReplyTable = isset($_POST['replyTableName']) ? $_POST['replyTableName'] : "";                     
$numberOfReplies = isset($_POST['numberOfReplies']) ? $_POST['numberOfReplies'] : "";                            

$dataManager = new DataManager();                               

$dataManager->setReplyTable($answerReplyTable);                              
$dataManager->setMemberId($_SESSION["memberId"]);
$dataManager->setNumberOfReplies($numberOfReplies);                              

$databaseManager = new DatabaseManager($dataManager);                                            

print(json_encode($databaseManager->getAllReplyComponents()));                                                     


