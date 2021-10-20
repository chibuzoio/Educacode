<?php                              

require_once("../coderback/datastore.php");                                                      

$projectTitles = array();                            
$query = "select * from projectmenudata";                                       

try {                       
    $pdo = DataStore::getConnection();                         
 
	$result = $pdo->query($query);                        

	while ($row = $result->fetch()) {                                    
		$tempArray = array();                                          
		$tempArray[] = $row["projectTitle"];                            
		$tempArray[] = $row["language"];                             
		$tempArray[] = $row["projectImage"];                               
	 	$projectTitles[] = $tempArray;                                     
	}                              

	print(json_encode($projectTitles));                                    
}                                   
catch(PDOException $e){                           
    $error = $e->getMessage();                  
    // die($error);                 
}                    


