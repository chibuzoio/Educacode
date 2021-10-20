<?php              

require_once(realpath(dirname(__FILE__) . "/../coderback/datastore.php"));                                 
require_once(realpath(dirname(__FILE__) . "/../coderback/configuration.php"));                                 

class ProjectResourcesInitializer {                                          
	private $pdo;                                          
	private $dataManager;                                               

	function __construct($dataManager) {                                  
		$this->dataManager = $dataManager;                                      
		$this->pdo = new PDO(DSNIE, USER, PASSWORD, OPTIONS);                               
	}                                     

	public function createProjectDatabase() {                                           
		$query = "create database if not exists educacode";                         

		try {                                 
			$this->pdo->query($query);                              
		}                                                         
		catch (PDOException $error) {                                    
		    $message = $error->getMessage();                  
		}                              

		$this->dataManager->setConnection(DataStore::getConnection());                                          

		return $this;                                  
	}                                                  

	public function createProjectTables() {                                  
		$tableQueries = array(                                                   
			'community' => 'create table if not exists educacodecommunityquestions ('               
				. 'questionId bigint(20) unsigned not null auto_increment, '
				. 'memberId bigint(20) unsigned not null, '                  
				. 'questionCategory varchar(333) not null, '                      
				. 'questionTitle varchar(333) not null, '                      
				. 'questionContent text, '                            
				. 'numberOfAnswers int(7), '                        
				. 'numberOfClaps int(7), '                        
				. 'answerTableName varchar(33) not null, '                        
				. 'clapTableName varchar(33) not null, '                        
				. 'questionDate varchar(23) not null, '              
				. 'primary key(questionId) '                
				. ') engine = InnoDB default charset = utf8',                   

			'projectmenudata' => 'create table if not exists projectmenudata ('    
				. 'menuDataId bigint(20) unsigned not null auto_increment, '
				. 'projectTitle varchar(111) not null, '         
				. 'language varchar(15) not null, '                            
				. 'projectImage varchar(33) not null, '                            
				. 'primary key(menuDataId), '                
				. 'key(projectTitle), '                               
				. 'key(language) '                               
				. ') engine = InnoDB default charset = utf8',                   

			'consolesistance' => 'create table if not exists consolesistance ('    
				. 'commandId int(9) unsigned not null auto_increment, '
				. 'command varchar(111) not null, '         
				. 'description text, '                            
				. 'category varchar(23) not null, '         
				. 'primary key(commandId), '             
				. 'unique key(command) '            
				. ') engine = InnoDB default charset = utf8',                   

			'parentSearchTable' => 'create table if not exists parentsearchtable ('    
				. 'searchWordId bigint(20) unsigned not null auto_increment, '
				. 'searchWord varchar(111) not null, '         
				. 'category varchar(33) not null, '
				. 'primary key(searchWordId) '             
				. ') engine = InnoDB default charset = utf8',                   

			'educacodeprojects' => 'create table if not exists educacodeprojects ('    
				. 'projectId bigint(11) unsigned not null auto_increment, '
				. 'title varchar(111) not null, '         
				. 'category varchar(33) not null, '
				. 'objective varchar(333) not null, '
				. 'developer varchar(333) not null, '
				. 'languages varchar(333) not null, '             
				. 'library varchar(333), '             
				. 'usedTools varchar(333) not null, '            
				. 'subtitles int(5) not null, '          
				. 'projectTable varchar(55) not null, '              
				. 'requirementTable varchar(55) not null, '                      
				. 'dateStarted varchar(23) not null, '              
				. 'dateModified varchar(23) not null, '              
				. 'primary key(projectId), '             
				. 'unique key(title) '            
				. ') engine = InnoDB default charset = utf8',                   

			'educacodeDictionary' => 'create table if not exists educacodedictionary ('    
				. 'wordId bigint(20) unsigned not null auto_increment, '
				. 'coderWord varchar(111) not null, '                    
				. 'definition text, '                   
				. 'dateAdded varchar(23), '                 
				. 'primary key(wordId), '             
				. 'unique key(coderWord) '            
				. ') engine = InnoDB default charset = utf8',                               
				
// Add category to educacode table with these three options: student, taught and self-taught                       
// Add specialty to educacode table to indicate areas of specialization of member 
			'parentTable' => 'create table if not exists educacode (' 
				. 'memberId bigint(20) unsigned not null auto_increment, '              
				. 'userName varchar(33), '
				. 'firstName varchar(15) not null, '
				. 'lastName varchar(15) not null, '
				. 'sex varchar(8) not null, '
				. 'emailAddress varchar(55) not null, '
				. 'memberCountry varchar(55) not null, '
				. 'memberState varchar(55) not null, '
				. 'password varchar(333) not null, '          
				. 'regDate varchar(23) not null, '                               
				. 'profilePicture varchar(33), '                            
				. 'primary key(memberId), '                            
				. 'unique key(emailAddress) '                 
				. ') engine = InnoDB default charset = utf8',    

			'clientTable' => 'create table if not exists nonmemberclient (' 
				. 'clientId bigint(20) unsigned not null auto_increment, '              
				. 'firstName varchar(15) not null, '
				. 'lastName varchar(15) not null, '
				. 'sex varchar(8) not null, '
				. 'emailAddress varchar(55) not null, '
				. 'memberCountry varchar(55) not null, '
				. 'memberState varchar(55) not null, '
				. 'contractDate varchar(23) not null, '   
				. 'primary key(clientId) ' 
				. ') engine = InnoDB default charset = utf8',    

			'quotation' => 'create table if not exists quotation ('     
				. 'quotationId bigint(20) unsigned not null auto_increment, '
				. 'memberId bigint(20) unsigned, '                  
				. 'clientId bigint(20) unsigned, '                  
				. 'webApplication tinyint not null, '                
				. 'mobileApplication tinyint not null, '                
				. 'desktopApplication tinyint not null, '                
				. 'projectType varchar(33) not null, '
				. 'searchEngineOptimization decimal(21, 10) unsigned not null, '                
				. 'productDescription decimal(21, 10) unsigned not null, '                
				. 'servicesDescription decimal(21, 10) unsigned not null, '                
				. 'descriptiveUserInterface decimal(21, 10) unsigned not null, '                
				. 'emailClient decimal(21, 10) unsigned not null, '                
				. 'customersFeedback decimal(21, 10) unsigned not null, '                
				. 'quotationPreparation decimal(21, 10) unsigned not null, '                
				. 'financialTransactions decimal(21, 10) unsigned not null, '                
				. 'employeeManagement decimal(21, 10) unsigned not null, '                
				. 'studentsTeachersManagement decimal(21, 10) unsigned not null, '                
				. 'realTimeServices decimal(21, 10) unsigned not null, '                
				. 'projectMaintenance decimal(21, 10) unsigned not null, '                
				. 'computerBasedExamination decimal(21, 10) unsigned not null, '                
				. 'resultComputation decimal(21, 10) unsigned not null, '                
				. 'additionalOption varchar(333), '             
				. 'companyName varchar(77) not null, '                 
				. 'companyAddress varchar(77), '            
				. 'companyCountry varchar(15), '            
				. 'companyState varchar(15), '            
				. 'companyTown varchar(15), '            
				. 'companyDescription varchar(333) not null, '                 
				. 'numberOfCustomers int(11) unsigned, '            
				. 'projectTotalAmount decimal(21, 10) unsigned not null, '                  
				. 'quotationDate varchar(33) not null, '           
				. 'primary key(quotationId), '                      
				. 'key(memberId) '                    
				. ') engine = InnoDB default charset = utf8',                  

			'usersession' => 'create table if not exists usersession ('                     
				. 'memberId bigint(20) unsigned not null, '                    
				. 'sessionId varchar(55) not null, '                       
				. 'expiration bigint(15) unsigned not null, '                    
				. 'sessionData text, '                                 
				. 'sessionStatus tinyint not null, '                            
				. 'unique key(sessionId), '                              
				. 'key(expiration), '                            
				. 'key(memberId) '                                                 
				. ') engine = InnoDB default charset = utf8',                               
				
			'optionDefinition' => 'create table if not exists optiondefinition ('    
				. 'optionWordId bigint(20) unsigned not null auto_increment, '
				. 'optionWord varchar(111) not null, '
				. 'optionDefinition text, ' 
				. 'primary key(optionWordId), '
				. 'key(optionWord)'             
				. ') engine = InnoDB default charset = utf8',                   

			'businesscontrolcost' => 'create table if not exists businesscontrolcost ('                          
				. 'businessControlCost decimal(21, 10) unsigned not null, '
				. 'searchEngineOptimizationCost decimal(19, 15) unsigned not null, '
				. 'productDescriptionCost decimal(19, 15) unsigned not null, '
				. 'emailClientCost decimal(19, 15) unsigned not null, '
				. 'customersFeedbackCost decimal(19, 15) unsigned not null, '
				. 'financialTransactionsCost decimal(19, 15) unsigned not null, '
				. 'employeeManagementCost decimal(19, 15) unsigned not null, '
				. 'realTimeServicesCost decimal(19, 15) unsigned not null, '
				. 'projectMaintenanceCost decimal(19, 15) unsigned not null, ' 
				. 'twoWeeksDuration decimal(19, 15) unsigned not null, ' 
				. 'oneMonthDuration decimal(19, 15) unsigned not null, ' 
				. 'twoMonthsDuration decimal(19, 15) unsigned not null, ' 
				. 'fiveMonthsDuration decimal(19, 15) unsigned not null ' 
				. ') engine = InnoDB default charset = utf8',               

			'churchcontrolcost' => 'create table if not exists churchcontrolcost ('                          
				. 'churchControlCost decimal(21, 10) unsigned not null, ' 
				. 'searchEngineOptimizationCost decimal(19, 15) unsigned not null, '
				. 'descriptiveUserInterfaceCost decimal(19, 15) unsigned not null, '
				. 'emailClientCost decimal(19, 15) unsigned not null, '
				. 'financialTransactionsCost decimal(19, 15) unsigned not null, '
				. 'officialsManagementCost decimal(19, 15) unsigned not null, '
				. 'realTimeServicesCost decimal(19, 15) unsigned not null, '
				. 'projectMaintenanceCost decimal(19, 15) unsigned not null, ' 
				. 'twoWeeksDuration decimal(19, 15) unsigned not null, ' 
				. 'oneMonthDuration decimal(19, 15) unsigned not null, ' 
				. 'twoMonthsDuration decimal(19, 15) unsigned not null, ' 
				. 'fiveMonthsDuration decimal(19, 15) unsigned not null ' 
				. ') engine = InnoDB default charset = utf8',               

			'companycontrolcost' => 'create table if not exists companycontrolcost ('                          
				. 'companyControlCost decimal(21, 10) unsigned not null, ' 
				. 'searchEngineOptimizationCost decimal(19, 15) unsigned not null, '
				. 'servicesDescriptionCost decimal(19, 15) unsigned not null, '
				. 'emailClientCost decimal(19, 15) unsigned not null, '
				. 'quotationPreparationCost decimal(19, 15) unsigned not null, '
				. 'financialTransactionsCost decimal(19, 15) unsigned not null, '
				. 'employeeManagementCost decimal(19, 15) unsigned not null, '
				. 'realTimeServicesCost decimal(19, 15) unsigned not null, '
				. 'projectMaintenanceCost decimal(19, 15) unsigned not null, ' 
				. 'twoWeeksDuration decimal(19, 15) unsigned not null, ' 
				. 'oneMonthDuration decimal(19, 15) unsigned not null, ' 
				. 'twoMonthsDuration decimal(19, 15) unsigned not null, ' 
				. 'fiveMonthsDuration decimal(19, 15) unsigned not null ' 
				. ') engine = InnoDB default charset = utf8',               

			'commercecontrolcost' => 'create table if not exists commercecontrolcost ('                          
				. 'commerceControlCost decimal(21, 10) unsigned not null, ' 
				. 'searchEngineOptimizationCost decimal(19, 15) unsigned not null, '
				. 'productDescriptionCost decimal(19, 15) unsigned not null, '
				. 'emailClientCost decimal(19, 15) unsigned not null, '
				. 'customersFeedbackCost decimal(19, 15) unsigned not null, '
				. 'financialTransactionsCost decimal(19, 15) unsigned not null, '
				. 'employeeManagementCost decimal(19, 15) unsigned not null, '
				. 'realTimeServicesCost decimal(19, 15) unsigned not null, '
				. 'projectMaintenanceCost decimal(19, 15) unsigned not null, ' 
				. 'twoWeeksDuration decimal(19, 15) unsigned not null, ' 
				. 'oneMonthDuration decimal(19, 15) unsigned not null, ' 
				. 'twoMonthsDuration decimal(19, 15) unsigned not null, ' 
				. 'fiveMonthsDuration decimal(19, 15) unsigned not null ' 
				. ') engine = InnoDB default charset = utf8',               

			'schoolcontrolcost' => 'create table if not exists schoolcontrolcost ('                          
				. 'schoolControlCost decimal(21, 10) unsigned not null, ' 
				. 'searchEngineOptimizationCost decimal(19, 15) unsigned not null, '
				. 'descriptiveUserInterfaceCost decimal(19, 15) unsigned not null, '
				. 'emailClientCost decimal(19, 15) unsigned not null, '
				. 'studentsTeachersManagementCost decimal(19, 15) unsigned not null, '
				. 'financialTransactionsCost decimal(19, 15) unsigned not null, '
				. 'computerBasedExaminationCost decimal(19, 15) unsigned not null, '
				. 'resultComputationCost decimal(19, 15) unsigned not null, '
				. 'realTimeServicesCost decimal(19, 15) unsigned not null, '
				. 'projectMaintenanceCost decimal(19, 15) unsigned not null, ' 
				. 'twoWeeksDuration decimal(19, 15) unsigned not null, ' 
				. 'oneMonthDuration decimal(19, 15) unsigned not null, ' 
				. 'twoMonthsDuration decimal(19, 15) unsigned not null, ' 
				. 'fiveMonthsDuration decimal(19, 15) unsigned not null ' 
				. ') engine = InnoDB default charset = utf8'               
		);                                  

		try {                                                
			$pdo = $this->dataManager->getConnection();                                

			foreach ($tableQueries as $key => $value) {                                 
				$pdo->query($value);                                   
			}                    
		}                     
		catch (PDOException $error) {                                   
		    $message = $error->getMessage();                           
		    // print($message);                          
		}                    
	}                                                
}


