<?php                          

require_once("../coderback/datastore.php");                 

$allContents = array();                  
$query = "select * from educacodedictionary";                       

try {               
    $pdo = DataStore::getConnection();                 

	$result = $pdo->query($query);                  

	while ($row = $result->fetch()) {                     
		$content = array();                           
	 	$content[] = $row["coderWord"];                            
	 	$content[] = $row["definition"];                          
	 	$content[] = $row["dateAdded"];                      
	 	$allContents[] = $content;                         
	}                                 

	print(json_encode($allContents));                                         
}                               
catch(PDOException $e){                 
    $error = $e->getMessage();                  
    die($error);                 
}                    


