<?php         

require_once(realpath(dirname(__FILE__) . "/../coderback/configuration.php"));                 

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


