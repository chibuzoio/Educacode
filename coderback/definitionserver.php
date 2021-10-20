<?php                  

require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));              
require_once(realpath(dirname(__FILE__) . "/../coderback/datastore.php"));                 

$wordInserted = false;                             

$wordTitle = isset($_POST['title']) ? Utility::makeInputSafe($_POST['title']) : "";                     
$wordDefinition = isset($_POST['meaning']) ? Utility::makeInputSafe($_POST['meaning']) : "";                 

/*
$wordTitle = "Computer programme";             
$wordDefinition = "Software written by computer programmer.";          
*/

if ($wordTitle !== "") {                                    
	$exists = "";                                            
    $category = "";                     
    $query = "select searchWord, category from parentsearchtable where searchWord = ?";                   

    try {                        
        $pdo = DataStore::getConnection();                 

        $stmt = $pdo->prepare($query);              

        $stmt->execute(array($wordTitle));              

        while ($row = $stmt->fetch()) {                
            $exists = $row["searchWord"];                 
            $category = $row["category"];                  
        }                             
                 
        if ($exists === "") {                        
            try {                        
                $query = "insert into parentsearchtable (searchWordId, searchWord, category) values (?, ?, ?)";                                

                $stmt = $pdo->prepare($query);              

                $stmt->execute(array(0, $wordTitle, "ENCYCLOPEDIA"));                                  
            }                                   
            catch(PDOException $e){                 
                $error = $e->getMessage();                  
                die($error);                 
            }                           

            Utility::saveEducacodeDefinition($pdo, $wordTitle, $wordDefinition, $wordInserted);                          
        }                                   
        else if ($exists !== "" && $category !== "ENCYCLOPEDIA") {                            

            try {                          
                $query = "update parentsearchtable set category = 'ENCYCLOPEDIA' where searchWord = ?";                        

                $stmt = $pdo->prepare($query);                         

                $stmt->execute(array($wordTitle));                                      
            }                                 
            catch(PDOException $e){                                
                $error = $e->getMessage();                  
                die($error);                 
            }                               

            Utility::saveEducacodeDefinition($pdo, $wordTitle, $wordDefinition, $wordInserted);                          
        }                                        
        else if ($exists !== "" && $category === "ENCYCLOPEDIA") {                        
            Utility::saveEducacodeDefinition($pdo, $wordTitle, $wordDefinition, $wordInserted);                          
        }                                     
        else {                     
            $wordInserted = false;                   
            print(json_encode("false"));                          

            // header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . "/coder/signup.php");                           
            // header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);            
        }                                           
    }                    
    catch(PDOException $e){                                
        $error = $e->getMessage();                  
        die($error);                 
    }                    
}                       


