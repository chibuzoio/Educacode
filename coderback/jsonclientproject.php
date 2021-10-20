<?php                          

require_once("../Educacode/coderback/datastore.php");                           

$projectTable = "";                             
$educacodeProjectArray = array();                             
$query = "select * from educacodeprojects where title = ?";                         
$projectTitle = isset($_POST["title"]) ? Utility::makeInputSafe($_POST["title"]) : "";                            

try {                                  
    $pdo = DataStore::getConnection();                 

    $stmt = $pdo->prepare($query);              

    $stmt->execute(array($projectTitle));              

	while ($row = $stmt->fetch()) {                            
	 	$tempArray = array();                              
	 	$tempArray[] = $row["projectId"];                     
	 	$tempArray[] = $row["title"];                     
	 	$tempArray[] = $row["category"];                     
	 	$tempArray[] = $row["objective"];                     
	 	$tempArray[] = $row["developer"];                     
	 	$tempArray[] = $row["languages"];                     
	 	$tempArray[] = $row["library"];                     
	 	$tempArray[] = $row["usedTools"];                        
	 	$tempArray[] = $row["subtitles"];                     
	 	$tempArray[] = $row["projectTable"];                             
	 	$tempArray[] = $row["dateModified"];                             
	}                                    

 	$educacodeProjectArray[] = $tempArray;                        

 	$projectSubtitleArray = [];                               
 	$query = "select * from " . $projectTable;                                  

	$result = $pdo->query($query);                                 

	while ($row = $result->fetch()) {                            
	 	$tempArray = array();                              
	 	$tempArray[] = $row["projectArticlesId"];                     
	 	$tempArray[] = $row["projectId"];                     
	 	$tempArray[] = $row["subtitle"];                     
	 	$tempArray[] = $row["article"];                     
	 	$tempArray[] = $row["articleImage"];                     
	 	$tempArray[] = $row["dateModified"];                     
	 	$projectSubtitleArray[] = $tempArray;                            
	}                                    

	$educacodeProjectArray[] = $projectSubtitleArray;                                 

	print(json_encode($educacodeProjectArray));                 
}                                
catch(PDOException $e){                 
    $error = $e->getMessage();                  
    // die($error);                 
}                    


