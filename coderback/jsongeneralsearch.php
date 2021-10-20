<?php                          

require_once(realpath(dirname(__FILE__) . "/../coderback/datastore.php"));                           

$query = "select searchWord from parentsearchtable";                   

try {               
    $pdo = DataStore::getConnection();                 

	$result = $pdo->query($query);

	$coderWord = array();                  

	while ($row = $result->fetch()) {               
	 	$coderWord[] = $row["searchWord"];                     
	}                    

	print(json_encode($coderWord));                 
} 
catch(PDOException $e){                 
    $error = $e->getMessage();                  
    die($error);                 
}                    


