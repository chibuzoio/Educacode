<?php          

require_once("../Educacode/coderback/datastore.php");                 
require_once("../Educacode/coderback/utility.php");              

$exists = "";                        

$submitQuotation = isset($_POST['submitQuotation']) ? Utility::makeInputSafe($_POST['submitQuotation']) : "";                      
$webAppChoice = isset($_POST['webAppChoice']) ? Utility::makeInputSafe($_POST['webAppChoice']) : "false";             
$mobileAppChoice = isset($_POST['mobileAppChoice']) ? Utility::makeInputSafe($_POST['mobileAppChoice']) : "false";          
$desktopAppChoice = isset($_POST['desktopAppChoice']) ? Utility::makeInputSafe($_POST['desktopAppChoice']) : "false";    
$selectProjectType = isset($_POST['selectProjectType']) ? Utility::makeInputSafe($_POST['selectProjectType']) : "";               
$searchEOAmount = isset($_POST['searchEOAmount']) ? Utility::makeInputSafe($_POST['searchEOAmount']) : 0.00;             
$businessPDAmount = isset($_POST['businessPDAmount']) ? Utility::makeInputSafe($_POST['businessPDAmount']) : 0.00;            
$emailCAmount = isset($_POST['emailCAmount']) ? Utility::makeInputSafe($_POST['emailCAmount']) : 0.00;            
$customersFAmount = isset($_POST['customersFAmount']) ? Utility::makeInputSafe($_POST['customersFAmount']) : 0.00;            
$quotationPAmount = isset($_POST['quotationPAmount']) ? Utility::makeInputSafe($_POST['quotationPAmount']) : 0.00;            
$financialTAmount = isset($_POST['financialTAmount']) ? Utility::makeInputSafe($_POST['financialTAmount']) : 0.00;            
$employeeMAmount = isset($_POST['employeeMAmount']) ? Utility::makeInputSafe($_POST['employeeMAmount']) : 0.00;            
$officialsMAmount = isset($_POST['officialsMAmount']) ? Utility::makeInputSafe($_POST['officialsMAmount']) : 0.00;            
$realTSAmount = isset($_POST['realTSAmount']) ? Utility::makeInputSafe($_POST['realTSAmount']) : 0.00;            
$projectMAmount = isset($_POST['projectMAmount']) ? Utility::makeInputSafe($_POST['projectMAmount']) : 0.00;            
$servicesDAmount = isset($_POST['servicesDAmount']) ? Utility::makeInputSafe($_POST['servicesDAmount']) : 0.00;            
$descriptiveUIAmount = isset($_POST['descriptiveUIAmount']) ? Utility::makeInputSafe($_POST['descriptiveUIAmount']) : 0.00;            
$studentsTMAmount = isset($_POST['studentsTMAmount']) ? Utility::makeInputSafe($_POST['studentsTMAmount']) : 0.00;            
$computerBEAmount = isset($_POST['computerBEAmount']) ? Utility::makeInputSafe($_POST['computerBEAmount']) : 0.00;            
$resultCAmount = isset($_POST['resultCAmount']) ? Utility::makeInputSafe($_POST['resultCAmount']) : 0.00;            
$totalAmountValue = isset($_POST['totalAmountValue']) ? Utility::makeInputSafe($_POST['totalAmountValue']) : 0.00;            
$additionalOption = isset($_POST['additionalOption']) ? Utility::makeInputSafe($_POST['additionalOption']) : "";            
$projectDuration = isset($_POST['projectDuration']) ? Utility::makeInputSafe($_POST['projectDuration']) : "one month";            
$paymentChoice = isset($_POST['paymentChoice']) ? Utility::makeInputSafe($_POST['paymentChoice']) : "outright";            
$companyNameInput = isset($_POST['companyNameInput']) ? Utility::makeInputSafe($_POST['companyNameInput']) : "";            
$companyNameSuggestion = isset($_POST['companyNameSuggestion']) ? Utility::makeInputSafe($_POST['companyNameSuggestion']) : "";            
$companyAddressInput = isset($_POST['companyAddressInput']) ? Utility::makeInputSafe($_POST['companyAddressInput']) : "";            
$companyCountryInput = isset($_POST['companyCountryInput']) ? Utility::makeInputSafe($_POST['companyCountryInput']) : "";            
$companyStateInput = isset($_POST['companyStateInput']) ? Utility::makeInputSafe($_POST['companyStateInput']) : "";            
$companyTownInput = isset($_POST['companyTownInput']) ? Utility::makeInputSafe($_POST['companyTownInput']) : "";            
$companyCustomersInput = isset($_POST['companyCustomersInput']) ? Utility::makeInputSafe($_POST['companyCustomersInput']) : "";            
$companyFurtherDescription = isset($_POST['companyFurtherDescription']) ? Utility::makeInputSafe($_POST['companyFurtherDescription']) : "";                           
$clientFirstName = isset($_POST['clientFirstName']) ? Utility::makeInputSafe($_POST['clientFirstName']) : "";                           
$clientLastName = isset($_POST['clientLastName']) ? Utility::makeInputSafe($_POST['clientLastName']) : "";                           
$clientMaleGender = isset($_POST['clientMaleGender']) ? Utility::makeInputSafe($_POST['clientMaleGender']) : "";                           
$clientFemaleGender = isset($_POST['clientFemaleGender']) ? Utility::makeInputSafe($_POST['clientFemaleGender']) : "";                           
$clientEmailAddress = isset($_POST['clientEmailAddress']) ? Utility::makeInputSafe($_POST['clientEmailAddress']) : "";                           
$clientCountry = isset($_POST['clientCountry']) ? Utility::makeInputSafe($_POST['clientCountry']) : "";                           
$clientState = isset($_POST['clientState']) ? Utility::makeInputSafe($_POST['clientState']) : "";                           
$registerGuestClient = isset($_POST['registerGuestClient']) ? Utility::makeInputSafe($_POST['registerGuestClient']) : "";                           
$clientPassword = isset($_POST['clientPassword']) ? Utility::makeInputSafe($_POST['clientPassword']) : "";                           

if ($registerGuestClient === "true") {                            
	// REGISTER PERSONAL INFORMATION TO EDUCACODE TABLE              
	if ($clientEmailAddress !== "") {                      
        $query = "select emailAddress from educacode where emailAddress = ?";                   

        try {                    
            $pdo = DataStore::getConnection();                 

            $stmt = $pdo->prepare($query);              

            $stmt->execute(array($clientEmailAddress));              

            while ($row = $stmt->fetch()) {                
                $exists = $row["emailAddress"];          
            }               
                 
            if ($exists === "") {              
            	$lastMemberId = 0;                         

                $now = new DateTime();              

                $theDate = $now->format('Y-m-d H:i:s');               

                $theTime = strtotime($theDate);               

                $firstSalt = substr($email, 0, 5);                   

                $thePassword = $firstSalt . $password . $theTime;             

                $passwordHash = password_hash($thePassword, PASSWORD_DEFAULT);                 

                try {
                    $query = "insert into educacode (memberId, firstName, lastName, sex, "            
                        . "emailAddress, memberCountry, memberState, password, regDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";                
                    
                    $stmt = $pdo->prepare($query);                         

                    $stmt->execute(array(0, $clientFirstName, $clientLastName, Utility::getClientGender($clientMaleGender, $clientFemaleGender), $clientEmailAddress, $clientCountry, $clientState, $passwordHash, $theDate));                                      

                    $lastMemberId = $pdo->lastInsertId();                           

                    // header('Location: http://' . $_SERVER['HTTP_HOST'] . "/coder/welcome.php");               
                }                 
                catch(PDOException $e){                 
                    $error = $e->getMessage();                  
                    die($error);                 
                }                           

                try {                              
                    $query = "insert into quotation (quotationId, memberId, clientId, webApplication, mobileApplication, desktopApplication, projectType, searchEngineOptimization, productDescription, servicesDescription, descriptiveUserInterface, emailClient, customersFeedback, quotationPreparation, financialTransactions, employeeManagement, studentsTeachersManagement, realTimeServices, projectMaintenance, computerBasedExamination, resultComputation, additionalOption, companyName, companyAddress, companyCountry, companyState, companytown, companyDescription, numberOfCustomers, projectTotalAmount, quotationDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";                           

                    $stmt = $pdo->prepare($query);                         

                    $stmt->execute(array(0, $lastMemberId, 0, Utility::getWebAppChoice($webAppChoice), Utility::getMobileAppChoice($mobileAppChoice), Utility::getDesktopAppChoice($desktopAppChoice), $selectProjectType, $searchEOAmount, $businessPDAmount, $servicesDAmount, $descriptiveUIAmount, $emailCAmount, $customersFAmount, $quotationPAmount, $financialTAmount, $employeeMAmount, $studentsTMAmount, $realTSAmount, $projectMAmount, $computerBEAmount, $resultCAmount, $additionalOption, $companyNameInput, $companyAddressInput, $companyCountryInput, $companyStateInput, $companyTownInput, $companyFurtherDescription, $companyCustomersInput, $totalAmountValue, $theDate));                                

                		header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . "/coder/welcome.php");                           
                }                               
                catch(PDOException $e){                 
                    $error = $e->getMessage();                  
                    die($error);                 
                }                           
            }              
            else {                     
                print("Email address already exists!");           

                header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . "/coder/signup.php");                           
                // header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);            
            }                                     
        }                    
        catch(PDOException $e){                                
            $error = $e->getMessage();                  
            die($error);                 
        }                    
    }                       
}                          
else {                              
	// REGISTER PERSONAL INFORMATION TO NONMEMBERCLIENT TABLE                
	
	if ($clientEmailAddress !== "") {                      
    	$pdo = DataStore::getConnection();                 

    	$lastClientId = 0;                         

        $now = new DateTime();                    

  		$theDate = $now->format('Y-m-d H:i:s');               

        try {                           
            $query = "insert into nonmemberclient (clientId, firstName, lastName, sex, "                            
                . "emailAddress, memberCountry, memberState, contractDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?)";                              
            
            $stmt = $pdo->prepare($query);                         

            $stmt->execute(array(0, $clientFirstName, $clientLastName, Utility::getClientGender($clientMaleGender, $clientFemaleGender), $clientEmailAddress, $clientCountry, $clientState, $theDate));                                      

            $lastClientId = $pdo->lastInsertId();                           

            // header('Location: http://' . $_SERVER['HTTP_HOST'] . "/coder/welcome.php");               
        }                 
        catch(PDOException $e){                 
            $error = $e->getMessage();                  
            die($error);                 
        }                           

        try {                              
            $query = "insert into quotation (quotationId, memberId, clientId, webApplication, mobileApplication, desktopApplication, projectType, searchEngineOptimization, productDescription, servicesDescription, descriptiveUserInterface, emailClient, customersFeedback, quotationPreparation, financialTransactions, employeeManagement, studentsTeachersManagement, realTimeServices, projectMaintenance, computerBasedExamination, resultComputation, additionalOption, companyName, companyAddress, companyCountry, companyState, companytown, companyDescription, numberOfCustomers, projectTotalAmount, quotationDate) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";                           

            $stmt = $pdo->prepare($query);                         

            $stmt->execute(array(0, 0, $lastClientId, Utility::getWebAppChoice($webAppChoice), Utility::getMobileAppChoice($mobileAppChoice), Utility::getDesktopAppChoice($desktopAppChoice), $selectProjectType, $searchEOAmount, $businessPDAmount, $servicesDAmount, $descriptiveUIAmount, $emailCAmount, $customersFAmount, $quotationPAmount, $financialTAmount, $employeeMAmount, $studentsTMAmount, $realTSAmount, $projectMAmount, $computerBEAmount, $resultCAmount, $additionalOption, $companyNameInput, $companyAddressInput, $companyCountryInput, $companyStateInput, $companyTownInput, $companyFurtherDescription, $companyCustomersInput, $totalAmountValue, $theDate));                                
                header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . "/coder/welcome.php");                           
        }                               
        catch(PDOException $e){                 
            $error = $e->getMessage();                  
            die($error);                 
        }                           
    }                  

        // print("Email address already exists!");           

        // header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . "/coder/signup.php");            
        // header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);            
}                            































$checkValues = array();                             

$checkValues[] = $submitQuotation;                   
$checkValues[] = $selectProjectType;                   
$checkValues[] = $webAppChoice;                   
$checkValues[] = $mobileAppChoice;                   
$checkValues[] = $desktopAppChoice;                   
$checkValues[] = $searchEOAmount;                   
$checkValues[] = $descriptiveUIAmount;                   
$checkValues[] = $emailCAmount;                   
$checkValues[] = $quotationPAmount;                   
$checkValues[] = $totalAmountValue;                   
$checkValues[] = $customersFAmount;                   
$checkValues[] = $financialTAmount;                   
$checkValues[] = $servicesDAmount;                   
$checkValues[] = $realTSAmount;                   
$checkValues[] = $employeeMAmount;                   

$checkValues[] = $paymentChoice;                   
$checkValues[] = $companyTownInput;                   
$checkValues[] = $companyStateInput;                   
$checkValues[] = $companyCustomersInput;                   
$checkValues[] = $companyAddressInput;                   
$checkValues[] = $clientPassword;                   
$checkValues[] = $clientCountry;                   
$checkValues[] = $clientMaleGender;                   
$checkValues[] = $clientFemaleGender;                   
$checkValues[] = $clientState;                   
$checkValues[] = $registerGuestClient;                   

print(json_encode($checkValues));                 

/*
if ($submit != null) {              
    if ($email != "") {                      
        $query = "select * from businesscontrolcost";                   

        try {               
            $pdo = DataStore::getConnection();                 

            // $stmt = $pdo->prepare($query);              

            // $stmt->execute(array($email));                           

			$result = $pdo->query($query);                  

			while ($row = $result->fetch()) {                   
			 	$bizControlCost = $row["businessControlCost"];                     
			}                    
			 	
			print("Gotten Value bizControlCost Value Is " . $bizControlCost);                     

	        // header("Location: " . "http://" . $_SERVER['HTTP_HOST'] . "/Educacode/coderback/quotationserver.php");                 
	        // header('Location: http://' . $_SERVER['HTTP_HOST'] . $_SERVER['REQUEST_URI']);            
        } 
        catch(PDOException $e){                                
            $error = $e->getMessage();                  
            die($error);                 
        }                    
   }                   
}            
*/


