<?php           

require_once("../coderback/datastore.php");                 

$projectTableName = isset($_POST['projectTableName']) ? $_POST['projectTableName'] : "";                          

$query = "select subtitle from " . $projectTableName;                                       

try {               
    $pdo = DataStore::getConnection();                 
 
	$result = $pdo->query($query);                        

	$projectSubtitles = array();                     

	while ($row = $result->fetch()) {                                    
		$projectSubtitles[] = $row["subtitle"];                               
	}                           

	print(json_encode($projectSubtitles));                     
} 
catch(PDOException $e){                 
    $error = $e->getMessage();                  
    die($error);                 
}                    


