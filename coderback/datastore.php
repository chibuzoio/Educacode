<?php         

require_once("../Educacode/coderback/configuration.php");                 

class DataStore {                                    
	
	public static function getConnection() {                   
		$pdo = null;                      

		try {                               
		    $pdo = new PDO(DSN, USER, PASSWORD, OPTIONS);                      
		}                                   
		catch(PDOException $e) {                                 
			echo $e->getMessage();                     
		}                                 

		return $pdo;                
	}                            
}


