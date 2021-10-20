<?php          

class Utility {                                                  

	public static function startEducacodeSession() {                                                            
		if (session_start()) {                                                              
			Utility::initializeSessionParameters();                                                        
		}                                                                    
		else {                                                          
			session_start();                                                      
			Utility::initializeSessionParameters();                                                  
		}                                                        
	}                                                                                      

	public static function initializeSessionParameters() {                                            
		$_SESSION["authenticated"] = isset($_SESSION["authenticated"]) ? $_SESSION["authenticated"] : "";                                
		$_SESSION["memberId"] = isset($_SESSION["memberId"]) ? $_SESSION["memberId"] : "";                                
		$_SESSION["userName"] = isset($_SESSION["userName"]) ? $_SESSION["userName"] : "";                                
		$_SESSION["firstName"] = isset($_SESSION["firstName"]) ? $_SESSION["firstName"] : "";                                
		$_SESSION["lastName"] = isset($_SESSION["lastName"]) ? $_SESSION["lastName"] : "";                                
		$_SESSION["sex"] = isset($_SESSION["sex"]) ? $_SESSION["sex"] : "";                                
		$_SESSION["emailAddress"] = isset($_SESSION["emailAddress"]) ? $_SESSION["emailAddress"] : "";                                
		$_SESSION["memberCountry"] = isset($_SESSION["memberCountry"]) ? $_SESSION["memberCountry"] : "";                                
		$_SESSION["memberState"] = isset($_SESSION["memberState"]) ? $_SESSION["memberState"] : "";                                                
		$_SESSION["registrationDate"] = isset($_SESSION["registrationDate"]) ? $_SESSION["registrationDate"] : "";                                                
		$_SESSION["profilePicture"] = isset($_SESSION["profilePicture"]) ? $_SESSION["profilePicture"] : "";                                
	}                                                                 

	public static function isAuthenticated() {                                                   
		if ($_SESSION["authenticated"] === "false") {                                              
		    header('Location: http://' . $_SERVER['HTTP_HOST'] . "/coder/signup.php");                                      
		}                                                                 
	}                                                           

	public static function insertGeneralSearchWord($pdo, $wordTitle, $category) {                                        
		if ($wordTitle !== "") {                                    
			$exists = "";                                            
		    $category = "";                     
		    $query = "select searchWord from parentsearchtable where searchWord = ?";                   

		    try {                                         
		        $stmt = $pdo->prepare($query);                              

		        $stmt->execute(array($wordTitle));                                   

		        while ($row = $stmt->fetch()) {                                         
		            $exists = $row["searchWord"];                 
		        }                             
		                 
		        if ($exists === "") {                        
		            try {                        
		                $query = "insert into parentsearchtable (searchWordId, searchWord, category) values (?, ?, ?)";                                

		                $stmt = $pdo->prepare($query);              

		                $stmt->execute(array(0, $wordTitle, $category));                                  
		            }                                   
		            catch(PDOException $e){                 
		                $error = $e->getMessage();                  
		                // die($error);                 
		            }                                                  
		        }                                        
		    }                                              
		    catch (PDOException $e) {                               
		        $error = $e->getMessage();                  
		        // die($error);                 
		    }                                           
		}                                 
	}                                        

	public static function insertIntoProjectSubtitleTable($pdo, $subtitleTableName, $subtitleComponentArray) {                                                     
		$exists = "";                                                  
		$query = "select subtitle from " . $subtitleTableName . " where subtitle = ?";                                    

        $stmt = $pdo->prepare($query);              

        $stmt->execute(array($subtitleComponentArray[2]));                        

        while ($row = $stmt->fetch()) {                               
            $exists = $row["subtitle"];                                    
        }                                    
                     
	    if ($exists === "") {                                                     
		    $query = "insert into " . $subtitleTableName . " (projectArticlesId, projectId, subtitle, article, articleImage, dateWritten, dateModified) values (?, ?, ?, ?, ?, ?, ?)";                                      

		    $stmt = $pdo->prepare($query);              

		    $stmt->execute($subtitleComponentArray);                                  
		}                                                       
	}                                            

	public static function saveBatchDefinition($pdo, $wordTitle, $wordDefinition, $wordInserted) {                                           
		try {
		    $query = "update educacodedictionary set definition = ? where coderWord = ?";                
		    
		    $stmt = $pdo->prepare($query);                         

		    $stmt->execute(array($wordDefinition, $wordTitle));                                      
		    
		    $wordInserted = true;                                 

		    if ($wordInserted) {                          
				print(json_encode("true"));                          
		    }                                

		    // header('Location: http://' . $_SERVER['HTTP_HOST'] . "/coder/welcome.php");               
		}                 
		catch(PDOException $e){                 
		    $error = $e->getMessage();                  
		    die($error);                 
		}                            
	}                             

	public static function saveEducacodeDefinition($pdo, $wordTitle, $wordDefinition, $wordInserted) {                        
    	$innerExists = "";                            
		 
		try {                                                
		    $query = "select coderWord from educacodedictionary where coderWord = ?";                   

		    $stmt = $pdo->prepare($query);              

		    $stmt->execute(array($wordTitle));                 

		    while ($row = $stmt->fetch()) {                
		        $innerExists = $row["coderWord"];          
		    }               
		         
		    if ($innerExists === "") {              
		        $now = new DateTime();              

		        $theDate = $now->format('Y-m-d H:i:s');                  

		        try {
		            $query = "insert into educacodedictionary (wordId, coderWord, definition, dateAdded) values (?, ?, ?, ?)";                
		            
		            $stmt = $pdo->prepare($query);                         

		            $stmt->execute(array(0, $wordTitle, $wordDefinition, $theDate));                                      
		            
		            $wordInserted = true;                                 

		            if ($wordInserted) {
						print(json_encode("true"));                          
		            }                                

		            // header('Location: http://' . $_SERVER['HTTP_HOST'] . "/coder/welcome.php");                                                
		        }                 
		        catch(PDOException $e){                 
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
		}                                       
		catch(PDOException $e){                 
		    $error = $e->getMessage();                  
		    die($error);                 
		}                           
	}                                     

	public static function getDesktopAppChoice($desktopAppChoice) {                             
		if ($desktopAppChoice === "true") {                    
			return true;                       
		}                             
		else if ($desktopAppChoice === "false") {                        
			return false;                      
		}                      
	}                              

	public static function getMobileAppChoice($mobileAppChoice) {                             
		if ($mobileAppChoice === "true") {                    
			return true;                       
		}                             
		else if ($mobileAppChoice === "false") {                        
			return false;                      
		}                      
	}                              

	public static function getWebAppChoice($webAppChoice) {                             
		if ($webAppChoice === "true") {                    
			return true;                       
		}                             
		else if ($webAppChoice === "false") {                        
			return false;                      
		}                      
	}                              

	public static function getClientGender($clientMaleGender, $clientFemaleGender) {                              
		$clientGender = "";                                

		if ($clientMaleGender === "true") {                           
			$clientGender = "Male";                             
		}                             
		else if ($clientFemaleGender === "true") {                             
			$clientGender = "Female";                             
		}                                

		return $clientGender;                          
	}                             

	public static function schoolControlCostWhile($result, $schoolControlCost) {                                 
		while ($row = $result->fetch()) {               
			$schoolControlCost[] = $row["schoolControlCost"];                  
			$schoolControlCost[] = $row["searchEngineOptimizationCost"];                     
			$schoolControlCost[] = $row["descriptiveUserInterfaceCost"];                     
			$schoolControlCost[] = $row["emailClientCost"];                      
			$schoolControlCost[] = $row["studentsTeachersManagementCost"];                     
			$schoolControlCost[] = $row["financialTransactionsCost"];                    
			$schoolControlCost[] = $row["computerBasedExaminationCost"];                     
			$schoolControlCost[] = $row["resultComputationCost"];                     
			$schoolControlCost[] = $row["realTimeServicesCost"];                     
			$schoolControlCost[] = $row["projectMaintenanceCost"];                     
			$schoolControlCost[] = $row["twoWeeksDuration"];                     
			$schoolControlCost[] = $row["oneMonthDuration"];                     
			$schoolControlCost[] = $row["twoMonthsDuration"];                     
			$schoolControlCost[] = $row["fiveMonthsDuration"];                     
		}                               

		return $schoolControlCost;                       
	}

	public static function commerceControlCostWhile($result, $commerceControlCost) {                         
		while ($row = $result->fetch()) {                             
			$commerceControlCost[] = $row["commerceControlCost"];                  
			$commerceControlCost[] = $row["searchEngineOptimizationCost"];                     
			$commerceControlCost[] = $row["productDescriptionCost"];                     
			$commerceControlCost[] = $row["emailClientCost"];                     
			$commerceControlCost[] = $row["customersFeedbackCost"];                     
			$commerceControlCost[] = $row["financialTransactionsCost"];                     
			$commerceControlCost[] = $row["employeeManagementCost"];                     
			$commerceControlCost[] = $row["realTimeServicesCost"];                     
			$commerceControlCost[] = $row["projectMaintenanceCost"];                     
			$commerceControlCost[] = $row["twoWeeksDuration"];                     
			$commerceControlCost[] = $row["oneMonthDuration"];                     
			$commerceControlCost[] = $row["twoMonthsDuration"];                     
			$commerceControlCost[] = $row["fiveMonthsDuration"];                     
		}                               

		return $commerceControlCost;                   
	}

	public static function companyControlCostWhile($result, $companyControlCost) {                                
		while ($row = $result->fetch()) {                           
			$companyControlCost[] = $row["companyControlCost"];                  
			$companyControlCost[] = $row["searchEngineOptimizationCost"];                     
			$companyControlCost[] = $row["servicesDescriptionCost"];                     
			$companyControlCost[] = $row["emailClientCost"];                                     
			$companyControlCost[] = $row["quotationPreparationCost"];                     
			$companyControlCost[] = $row["financialTransactionsCost"];                     
			$companyControlCost[] = $row["employeeManagementCost"];                     
			$companyControlCost[] = $row["realTimeServicesCost"];                     
			$companyControlCost[] = $row["projectMaintenanceCost"];                     
			$companyControlCost[] = $row["twoWeeksDuration"];                     
			$companyControlCost[] = $row["oneMonthDuration"];                     
			$companyControlCost[] = $row["twoMonthsDuration"];                     
			$companyControlCost[] = $row["fiveMonthsDuration"];                     
		}                                

		return $companyControlCost;                    
	}

	public static function churchControlCostWhile($result, $churchControlCost) {                                
		while ($row = $result->fetch()) {                           
			$churchControlCost[] = $row["churchControlCost"];                  
			$churchControlCost[] = $row["searchEngineOptimizationCost"];                     
			$churchControlCost[] = $row["descriptiveUserInterfaceCost"];                     
			$churchControlCost[] = $row["emailClientCost"];                             
			$churchControlCost[] = $row["financialTransactionsCost"];                     
			$churchControlCost[] = $row["officialsManagementCost"];                     
			$churchControlCost[] = $row["realTimeServicesCost"];                     
			$churchControlCost[] = $row["projectMaintenanceCost"];                     
			$churchControlCost[] = $row["twoWeeksDuration"];                     
			$churchControlCost[] = $row["oneMonthDuration"];                     
			$churchControlCost[] = $row["twoMonthsDuration"];                     
			$churchControlCost[] = $row["fiveMonthsDuration"];                     
		}                                

		return $churchControlCost;                    
	}

	public static function businessControlCostWhile($result, $businessControlCost) {                              
		while ($row = $result->fetch()) {                            
		 	$businessControlCost[] = $row["businessControlCost"];                     
		 	$businessControlCost[] = $row["searchEngineOptimizationCost"];                     
		 	$businessControlCost[] = $row["productDescriptionCost"];                     
		 	$businessControlCost[] = $row["emailClientCost"];                     
		 	$businessControlCost[] = $row["customersFeedbackCost"];                     
		 	$businessControlCost[] = $row["financialTransactionsCost"];                     
		 	$businessControlCost[] = $row["employeeManagementCost"];                     
		 	$businessControlCost[] = $row["realTimeServicesCost"];                     
		 	$businessControlCost[] = $row["projectMaintenanceCost"];                     
			$businessControlCost[] = $row["twoWeeksDuration"];                     
			$businessControlCost[] = $row["oneMonthDuration"];                     
			$businessControlCost[] = $row["twoMonthsDuration"];                     
			$businessControlCost[] = $row["fiveMonthsDuration"];                     
		}                          

		return $businessControlCost;                        
	}

	public static function addGetParamToUrl($url, $key, $value) {                             
		if (strpos($url, "?")) {                        
			$url .= "&" . $key . "=" . $value;                       
		}                                  
		else {                              
			$url .= "?" . $key . "=" . $value;                
		}                                  

		return $url;                        
	}                              

	public static function upperCaseFirstLetters($theString) {		             
		$theString = preg_replace("/\s+/", " ", $theString);                       

		return ucwords($theString);                        
	}

	public static function generatekey() {
		$key = "";                  
		$character = ['1', '2', '3', '4', '5', '6', '7',                      
			'8', '9', '0', 'q', 'w', 'e', 'r', 't', 'y', 'u',               
			'i', 'o', 'p', 'a', 's', 'd', 'f', 'g', 'h', 'j',                 
			'k', 'l', 'z', 'x', 'c', 'v', 'b', 'n', 'm', 'Q',                   
			'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P', 'A',                          
			'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L', 'Z', 'X',                          
			'C', 'V', 'B', 'N', 'M'];                                       

		$strLength = mt_rand(27, 41);                       

		for ($i = 0; $i < $strLength; $i++) {                      
			$position = mt_rand(0, 61);                              
			$key .= $character[$position];                         
		}                               
		
		return $key . time();                  
	}

	public static function makeInputSafe($input) {
		$input = trim($input);    
		$input = stripcslashes($input);
		$input = htmlspecialchars($input);   

		return $input;    
	}

	public static function isString($value) {
		if (!is_string($value)) {
			die("<div style=\"color: red;\">Are you stupid! Only string value is required!!</div>");        
		}      
	}

	public static function getTypicalValue($component) {
		$holder = "";  
		$myComponent = "";

		if (is_array($component)) {
			foreach ($component as $key => $value) {
				$holder .= $value . " ";       
			}

			$myComponent = trim($holder);              
		}
		else {
			$myComponent = $component;               
		}

		return $myComponent;    
	}
}                  


