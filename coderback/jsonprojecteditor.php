<?php                          

require_once(realpath(dirname(__FILE__) . "/../coderback/datastore.php"));                           

$educacodeProjects = array();                             
$query = "select * from educacodeprojects";                         

try {                                  
    $pdo = DataStore::getConnection();                 

	$result = $pdo->query($query);

	while ($row = $result->fetch()) {                            
	 	$tempArray = array();                              
	 	$tempArray[] = $row["title"];                     
	 	$tempArray[] = $row["category"];                     
	 	$tempArray[] = $row["objective"];                     
	 	$tempArray[] = $row["developer"];                     
	 	$tempArray[] = $row["languages"];                     
	 	$tempArray[] = $row["library"];                     
	 	$tempArray[] = $row["usedTools"];                        
	 	$tempArray[] = $row["subtitles"];                     
	 	$educacodeProjects[] = $tempArray;                        
	}                                    

	print(json_encode($educacodeProjects));                 
}                                
catch(PDOException $e){                 
    $error = $e->getMessage();                  
    die($error);                 
}                    


