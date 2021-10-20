<?php           

require_once("../coderback/utility.php");                 
require_once("../coderback/datastore.php");                 

// $now = new DateTime();         

// $date = $now->format('Y-m-d H:i:s');                 

// echo strtotime($date);          

$allControlCosts = array();                     

$businessControlCost = array();                 
$churchControlCost = array();                         
$companyControlCost = array();                         
$commerceControlCost = array();                      
$schoolControlCost = array();                  

$query1 = "select * from businesscontrolcost";                   
$query2 = "select * from churchcontrolcost";                         
$query3 = "select * from companycontrolcost";                   
$query4 = "select * from commercecontrolcost";                   
$query5 = "select * from schoolcontrolcost";                   

try {                          
    $pdo = DataStore::getConnection();                 

	$result = $pdo->query($query1);                        

	$businessControlCost = Utility::businessControlCostWhile($result, $businessControlCost);                               

	if (count($businessControlCost) === 0) {                             
		$query = "insert into businesscontrolcost (businessControlCost, searchEngineOptimizationCost, productDescriptionCost, emailClientCost, customersFeedbackCost, financialTransactionsCost, employeeManagementCost, realTimeServicesCost, projectMaintenanceCost, twoWeeksDuration, oneMonthDuration, twoMonthsDuration, fiveMonthsDuration) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";                        

        $stmt = $pdo->prepare($query);                    

        $stmt->execute(array(25000.00000, 5.000, 10.000, 10.000, 10.000, 20.000, 10.000, 20.000, 15.000, 150.000, 100.000, 80.000, 50.000));                             
    
		$result = $pdo->query($query1);                        

		$businessControlCost = Utility::businessControlCostWhile($result, $businessControlCost);                               
	}                      

	$result = $pdo->query($query2);                     

	$churchControlCost = Utility::churchControlCostWhile($result, $churchControlCost);                              

	if (count($churchControlCost) === 0) {                                             
		$query = "insert into churchcontrolcost (churchControlCost, searchEngineOptimizationCost, descriptiveUserInterfaceCost, emailClientCost, financialTransactionsCost, officialsManagementCost, realTimeServicesCost, projectMaintenanceCost, twoWeeksDuration, oneMonthDuration, twoMonthsDuration, fiveMonthsDuration) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";                        

        $stmt = $pdo->prepare($query);                    

        $stmt->execute(array(25000.00000, 10.000, 10.000, 10.000, 20.000, 15.000, 20.000, 15.000, 150.000, 100.000, 80.000, 50.000));                                   
    
		$result = $pdo->query($query2);                        

		$churchControlCost = Utility::churchControlCostWhile($result, $churchControlCost);                               
	}                                 

	$result = $pdo->query($query3);                     

	$companyControlCost = Utility::companyControlCostWhile($result, $companyControlCost);                              

	if (count($companyControlCost) === 0) {                                                    
		$query = "insert into companycontrolcost (companyControlCost, searchEngineOptimizationCost, servicesDescriptionCost, emailClientCost, quotationPreparationCost, financialTransactionsCost, employeeManagementCost, realTimeServicesCost, projectMaintenanceCost, twoWeeksDuration, oneMonthDuration, twoMonthsDuration, fiveMonthsDuration) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";                        

        $stmt = $pdo->prepare($query);                    

        $stmt->execute(array(25000.00000, 5.000, 10.000, 10.000, 15.000, 20.000, 10.000, 20.000, 10.000, 150.000, 100.000, 80.000, 50.000));                             
    
		$result = $pdo->query($query3);                        

		$companyControlCost = Utility::companyControlCostWhile($result, $companyControlCost);                               
	}                                 

	$result = $pdo->query($query4);                            

	$commerceControlCost = Utility::commerceControlCostWhile($result, $commerceControlCost);                           

	if (count($commerceControlCost) === 0) {                                                      
		$query = "insert into commercecontrolcost (commerceControlCost, searchEngineOptimizationCost, productDescriptionCost, emailClientCost, customersFeedbackCost, financialTransactionsCost, employeeManagementCost, realTimeServicesCost, projectMaintenanceCost, twoWeeksDuration, oneMonthDuration, twoMonthsDuration, fiveMonthsDuration) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";                        

        $stmt = $pdo->prepare($query);                    

        $stmt->execute(array(25000.00000, 5.000, 10.000, 10.000, 10.000, 20.000, 10.000, 20.000, 15.000, 150.000, 100.000, 80.000, 50.000));                             
    
		$result = $pdo->query($query4);                        

		$commerceControlCost = Utility::commerceControlCostWhile($result, $commerceControlCost);                               
	}                                 

	$result = $pdo->query($query5);                    

	$schoolControlCost = Utility::schoolControlCostWhile($result, $schoolControlCost);                                  

	if (count($schoolControlCost) === 0) {                                                
		$query = "insert into schoolcontrolcost (schoolControlCost, searchEngineOptimizationCost, descriptiveUserInterfaceCost, emailClientCost, studentsTeachersManagementCost, financialTransactionsCost, computerBasedExaminationCost, resultComputationCost, realTimeServicesCost, projectMaintenanceCost, twoWeeksDuration, oneMonthDuration, twoMonthsDuration, fiveMonthsDuration) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";                             

        $stmt = $pdo->prepare($query);                    

        $stmt->execute(array(25000.00000, 5.000, 5.000, 10.000, 10.000, 15.000, 15.000, 10.000, 20.000, 10.000, 150.000, 100.000, 80.000, 50.000));                             
    
		$result = $pdo->query($query5);                        

		$schoolControlCost = Utility::schoolControlCostWhile($result, $schoolControlCost);                               
	}                                 

	$allControlCosts[] = $businessControlCost;                
	$allControlCosts[] = $churchControlCost;                   
	$allControlCosts[] = $companyControlCost;                   
	$allControlCosts[] = $commerceControlCost;              
	$allControlCosts[] = $schoolControlCost;                    

	print(json_encode($allControlCosts));                     
} 
catch(PDOException $e){                 
    $error = $e->getMessage();                  
    die($error);                 
}                    


