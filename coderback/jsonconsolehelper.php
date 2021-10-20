<?php                          

require_once(realpath(dirname(__FILE__) . "/../coderback/datastore.php"));                           

$consoleHelpArray = array();                             
$query = "select * from consolesistance order by command";                   

try {               
    $pdo = DataStore::getConnection();                 

	$result = $pdo->query($query);

	while ($row = $result->fetch()) {                            
	 	$tempArray = array();                              
	 	$tempArray[] = $row["command"];                     
	 	$tempArray[] = $row["description"];                     
	 	$tempArray[] = $row["category"];                     
	 	$consoleHelpArray[] = $tempArray;                        
	}                                    

	print(json_encode($consoleHelpArray));                 
} 
catch(PDOException $e){                 
    $error = $e->getMessage();                  
    die($error);                 
}                    


