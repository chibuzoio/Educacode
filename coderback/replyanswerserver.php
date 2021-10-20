<?php                

require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));
require_once(realpath(dirname(__FILE__) . "/../coderback/datamanager.php"));                          
require_once(realpath(dirname(__FILE__) . "/../coderback/databasemanager.php"));                          
require_once(realpath(dirname(__FILE__) . "/../coderback/communitygeneralmanager.php"));

Utility::startEducacodeSession(); 

$answerId = isset($_POST['answerId']) ? $_POST['answerId'] : "";
$replyTable = isset($_POST['replyTableName']) ? $_POST['replyTableName'] : "";
$answerTable = isset($_POST['answerTableName']) ? $_POST['answerTableName'] : "";
$reply = isset($_POST['reply']) ? Utility::makeInputSafe($_POST['reply']) : "";

$dataManager = new DataManager();   

$dataManager->setReply($reply);
$dataManager->setAnswerId($answerId);
$dataManager->setReplyTable($replyTable);
$dataManager->setAnswerTable($answerTable);
$dataManager->setMemberId($_SESSION["memberId"]);

$databaseManager = new DatabaseManager($dataManager);

$dataManager->setDatabaseManager($databaseManager);

$communityManager = new CommunityGeneralManager($dataManager);

$returnedComposite = $communityManager->generateReplyTablesName()->commitCommunityReply()->createReplyTable()->updateAnswerReplies()->getAllReplyComponents();

print(json_encode($returnedComposite));


