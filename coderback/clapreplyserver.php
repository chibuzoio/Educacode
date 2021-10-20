<?php                                    

require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));                                               
require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                                               
require_once(realpath(dirname(__FILE__) . "/../coderback/databasemanager.php"));                                               

Utility::startEducacodeSession();

$replyId = isset($_POST['replyId']) ? $_POST['replyId'] : "";
$clapTable = isset($_POST['clapTableName']) ? $_POST['clapTableName'] : "";
$replyTable = isset($_POST['replyTableName']) ? $_POST['replyTableName'] : "";

$dataManager = new DataManager();                                          

$dataManager->setReplyId($replyId);
$dataManager->setClapTable($clapTable);
$dataManager->setReplyTable($replyTable);
$dataManager->setMemberId($_SESSION["memberId"]);

$databaseManager = new DatabaseManager($dataManager);

$returnedComposite = $databaseManager->clapForReply()->createClapReplyTable()->updateReplyClaps();

print(json_encode($returnedComposite));                       


