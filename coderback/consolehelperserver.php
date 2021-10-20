<?php                  

require_once("../Educacode/coderback/utility.php");              
require_once("../Educacode/coderback/datastore.php");                 

$exists = "";                          
$wordInserted = false;                             

$helperTitle = isset($_POST['title']) ? Utility::makeInputSafe($_POST['title']) : "";                     
$helperCategory = isset($_POST['category']) ? Utility::makeInputSafe($_POST['category']) : "";                 
$helperDescription = isset($_POST['meaning']) ? Utility::makeInputSafe($_POST['meaning']) : "";                 

/*
$helperTitle = "Computer programme";             
$helperDescription = "Software written by computer programmer.";          
*/                                  

if ($helperTitle !== "") {                          
    try {                                       
        $query = "select command from consolesistance where command = ?";                              

        $pdo = DataStore::getConnection();                 

        $stmt = $pdo->prepare($query);              

        $stmt->execute(array($helperTitle));              

        while ($row = $stmt->fetch()) {                
            $exists = $row["command"];                 
        }                             
                 
        if ($exists === "") {                        
            try {                        
                $query = "insert into consolesistance (commandId, command, description, category) values (?, ?, ?, ?)";                                

                $stmt = $pdo->prepare($query);              

                $stmt->execute(array(0, $helperTitle, $helperDescription, $helperCategory));                                  

                $wordInserted = true;                                                  
                print(json_encode("true"));                          
            }                                   
            catch(PDOException $e){                 
                $error = $e->getMessage();                  
                die($error);                 
            }                           
        }                            
        else {                                
            $wordInserted = false;                                          
            print(json_encode("false"));                          
        }                              
    }                                      
    catch(PDOException $e) {                        
        $error = $e->getMessage();                  
        die($error);                 
    }                                
}                                   
else {                     
    $wordInserted = false;                                          
    print(json_encode("false"));                          

    // header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . "/coder/signup.php");                           
    // header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);            
}                                           


