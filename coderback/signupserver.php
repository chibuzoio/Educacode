<?php          

require_once("../coderback/utility.php");              
require_once("../coderback/datamanager.php");              
require_once("../coderback/databasemanager.php");              

Utility::startEducacodeSession();                                                                   

$submit = isset($_POST['submit']) ? Utility::makeInputSafe($_POST['submit']) : "";       
$firstName = isset($_POST['firstName']) ? Utility::makeInputSafe($_POST['firstName']) : "";             
$lastName = isset($_POST['lastName']) ? Utility::makeInputSafe($_POST['lastName']) : "";          
$gender = isset($_POST['gender']) ? Utility::makeInputSafe($_POST['gender']) : "";    
$email = isset($_POST['email']) ? Utility::makeInputSafe($_POST['email']) : "";                       
$memberCountry = isset($_POST['memberCountry']) ? Utility::makeInputSafe($_POST['memberCountry']) : "";                       
$memberState = isset($_POST['memberState']) ? Utility::makeInputSafe($_POST['memberState']) : "";                       
$password = isset($_POST['password']) ? Utility::makeInputSafe($_POST['password']) : "";             

$dataManager = new DataManager();                                      

$dataManager->setSubmit($submit);                                        
$dataManager->setFirstName($firstName);                                        
$dataManager->setLastName($lastName);                                  
$dataManager->setGender($gender);                                     
$dataManager->setEmailAddress($email);                                   
$dataManager->setMemberCountry($memberCountry);                                
$dataManager->setMemberState($memberState);                                     
$dataManager->setPassword($password);                                       

$databaseManager = new DatabaseManager($dataManager);                                                    
$databaseManager->doesEmailAddressExists()->newMemberRegistration();                                              

if ($dataManager->isCommitted() === "true") {                                                  
	$_SESSION["memberId"] = $dataManager->getMemberId();                                             
	$_SESSION["firstName"] = $dataManager->getFirstName();                                             
	$_SESSION["lastName"] = $dataManager->getLastName();                                             
	$_SESSION["emailAddress"] = $dataManager->getEmailAddress();                                                
	$_SESSION["authenticated"] = "true";                                                
	
	header('Location: http://' . $_SERVER['HTTP_HOST'] . "/coder/welcome.php");                                            
}                                                       
else {                                                             
	$_SESSION["authenticated"] = "false";                                      
	
	header('Location: http://' . $_SERVER['HTTP_HOST'] . "/coder/signup.php");                                            
}                                           


