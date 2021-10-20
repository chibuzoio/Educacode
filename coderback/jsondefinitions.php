<?php                          

require_once("../Educacode/coderback/datastore.php");                           

$query = "select coderWord from educacodedictionary";                   

try {               
    $pdo = DataStore::getConnection();                 

	$result = $pdo->query($query);

	$coderWord = array();                  

	while ($row = $result->fetch()) {               
	 	$coderWord[] = $row["coderWord"];                     
	}                    

	print(json_encode($coderWord));                 
} 
catch(PDOException $e){                 
    $error = $e->getMessage();                  
    die($error);                 
}                    


