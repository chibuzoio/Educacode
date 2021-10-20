<?php                              

require_once("../coderback/datamanager.php");                               
require_once("../coderback/databasemanager.php");                               

$projectTitle = isset($_POST['title']) ? $_POST['title'] : "";                     

$dataManager = new DataManager();                                          

$dataManager->setProjectTitle($projectTitle);                                   

$databaseManager = new DatabaseManager($dataManager);                                                           

$projectArticleArray = $databaseManager->getProjectComposite()->getProjectTitleArticles()->getProjectRequirement();                                                

print(json_encode($projectArticleArray));                                                   


