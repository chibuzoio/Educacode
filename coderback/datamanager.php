<?php                            

class DataManager {                                                
	private $pdo;                                      
	private $options;                                    
	private $committed;                              
	private $existence;                                
	private $projectTitle;                              
	private $projectLibrary;                              
	private $projectCategory;                              
	private $projectObjective;                              
	private $projectDevelopers;                              
	private $utilityToolsUsed;                              
	private $projectLanguages;                              
	private $stringTokensArray;                                  
	private $databaseManager;                                   
	private $stringToTokenize;                                       
	private $imageName;                                             
	private $imageTempName;                                             
	private $imageSize;                                             
	private $projectCompositeArray;                                      
	private $projectTable;                                      
	private $projectSubtitle;                                 
	private $projectArticle;                                       
	private $numberOfSubtitles;                                      
	private $projectId;                                                  
	private $available;                                          
	private $errorType;                                                 
	private $unixTime;                                                           
	private $requirementTable;                                          
	private $connection;                                                           
	private $dateTime;                                                         
	private $requirementTitle;                                   
	private $requirementContent;                                  
	private $userName;                                                    
	private $emailAddress;                                             
	private $submit;                                            
	private $firstName;                                   
	private $lastName;                                   
	private $gender;                                   
	private $memberCountry;                                   
	private $memberState;                                   
	private $password;                                   
	private $memberId;                                          
	private $testValue;                                                   
	private $answerTable;                                       
	private $clapTable;                            
	private $questionTitle;                                
	private $questionCategories;                                      
	private $questionContent;                                     
	private $hashedPassword;                                            
	private $userNameExists;                                                   
	private $questionId;                                                     
	private $numberOfClaps;                                         
	private $numberOfAnswers;                                         
	private $authenticatedUserId;                                           
	private $answer;
	private $replyTable;
	private $answerId;
	private $reply;
	private $numberOfReplies;
	private $replyId;
	private $dropTablesArray;
	private $temporaryTables;
	private $allDropTables;

	public function getAllDropTables() {
		return $this->allDropTables;
	}

	public function setAllDropTables($allDropTables) {
		$this->allDropTables = $allDropTables;
	}

	public function getTemporaryTables() {
		return $this->temporaryTables;
	}

	public function setTemporaryTables($temporaryTables) {
		$this->temporaryTables = $temporaryTables;
	}

	public function getDropTablesArray() {
		return $this->dropTablesArray;
	}

	public function setDropTablesArray($dropTablesArray) {
		$this->dropTablesArray[] = $dropTablesArray;
	}

	public function getReplyId() {
		return $this->replyId;
	}

	public function setReplyId($replyId) {
		$this->replyId = $replyId;
	}

	public function getNumberOfReplies() {
		return $this->numberOfReplies;
	}

	public function setNumberOfReplies($numberOfReplies) {
		$this->numberOfReplies = $numberOfReplies;
	}

	public function getReply() {
		return $this->reply;
	}

	public function setReply($reply) {
		$this->reply = $reply;
	}

	public function getAnswerId() {
		return $this->answerId;
	}

	public function setAnswerId($answerId) {
		$this->answerId = $answerId;
	}

	public function getReplyTable() {
		return $this->replyTable;
	}

	public function setReplyTable($replyTable) {
		$this->replyTable = $replyTable;
	}

	public function getAnswer() {
		return $this->answer;
	}

	public function setAnswer($answer) {
		$this->answer = $answer;
	}

	public function getAuthenticatedUserId() {
		return $this->authenticatedUserId;                                            
	}

	public function setAuthenticatedUserId($authenticatedUserId) {
		$this->authenticatedUserId = $authenticatedUserId;                                                    
	}

	public function getNumberOfAnswers() {
		return $this->numberOfAnswers;                                               
	}

	public function setNumberOfAnswers($numberOfAnswers) {
		$this->numberOfAnswers = $numberOfAnswers;                                                   
	}

	public function getNumberOfClaps() {
		return $this->numberOfClaps;                                               
	}

	public function setNumberOfClaps($numberOfClaps) {
		$this->numberOfClaps = $numberOfClaps;                                                   
	}

	public function getQuestionId() {
		return $this->questionId;                                     
	}

	public function setQuestionId($questionId) {
		$this->questionId = $questionId;                                             
	}

	public function isUserNameExists() {
		return $this->userNameExists;                                     
	}

	public function setUserNameExists($userNameExists) {
		$this->userNameExists = $userNameExists;                                          
	}

	public function getHashedPassword() {
		return $this->hashedPassword;                                                       
	}

	public function setHashedPassword($hashedPassword) {
		$this->hashedPassword = $hashedPassword;                                                
	}

	public function getQuestionContent() {
		return $this->questionContent;                               
	}

	public function setQuestionContent($questionContent) {
		$this->questionContent = $questionContent;                                                   
	}

	public function getQuestionCategories() {
		return $this->questionCategories;                                
	}

	public function setQuestionCategories($questionCategories) {
		$this->questionCategories = $questionCategories;                         
	}

	public function getQuestionTitle() {
		return $this->questionTitle;                                  
	}	

	public function setQuestionTitle($questionTitle) {
		$this->questionTitle = $questionTitle;                                
	}

	public function getClapTable() {
		return $this->clapTable;                             
	}

	public function setClapTable($clapTable) {
		$this->clapTable = $clapTable;                               
	}

	public function getAnswerTable() {
		return $this->answerTable;                                     
	}

	public function setAnswerTable($answerTable) {
		$this->answerTable = $answerTable;                                
	}

	public function getTestValue() {
		return $this->testValue;                                    
	}

	public function setTestValue($testValue) {
		$this->testValue = $testValue;                                   
	}

	public function getMemberId() {
		return $this->memberId;                                           
	}

	public function setMemberId($memberId) {
		$this->memberId = $memberId;                                        
	}

	public function getPassword() {
		return $this->password;                            
	}

	public function setPassword($password) {
		$this->password = $password;                              
	}

	public function getMemberState() {
		return $this->memberState;                            
	}

	public function setMemberState($memberState) {
		$this->memberState = $memberState;                              
	}

	public function getMemberCountry() {
		return $this->memberCountry;                            
	}

	public function setMemberCountry($memberCountry) {
		$this->memberCountry = $memberCountry;                              
	}

	public function getGender() {
		return $this->gender;                            
	}

	public function setGender($gender) {
		$this->gender = $gender;                              
	}

	public function getLastName() {
		return $this->lastName;                            
	}

	public function setLastName($lastName) {
		$this->lastName = $lastName;                              
	}

	public function getFirstName() {
		return $this->firstName;                            
	}

	public function setFirstName($firstName) {
		$this->firstName = $firstName;                              
	}

	public function getSubmit() {
		return $this->submit;                                       
	}

	public function setSubmit($submit) {
		$this->submit = $submit;                                         
	}

	public function getEmailAddress() {
		return $this->emailAddress;                                                   
	}

	public function setEmailAddress($emailAddress) {
		$this->emailAddress = $emailAddress;                                                
	}

	public function getUserName() {
		return $this->userName;                                              
	}

	public function setUserName($userName) {
		$this->userName = $userName;                                               
	}

	public function getRequirementContent() {
		return $this->requirementContent;                           
	}

	public function setRequirementContent($requirementContent) {
		$this->requirementContent = $requirementContent;                              
	}

	public function getRequirementTitle() {
		return $this->requirementTitle;                      
	}

	public function setRequirementTitle($requirementTitle) {
		$this->requirementTitle = $requirementTitle;                                
	}

	public function getDateTime() {                                    
		return $this->dateTime;                                                       
	}                                            

	public function setDateTime($dateTime) {                                               
		$this->dateTime = $dateTime;                                                  
	}                                                            

	public function getConnection() {                                                          
		return $this->connection;                                                
	}                                                             

	public function setConnection($connection) {                                                       
		$this->connection = $connection;                                                             
	}                                                                        

	public function getRequirementTable() {                                                 
		return $this->requirementTable;                                                           
	}                                                             

	public function setRequirementTable($requirementTable) {                                                  
		$this->requirementTable = $requirementTable;                                             
	}                                                                     

	public function getUnixTime() {                                                
		return $this->unixTime;                                                           
	}                                                             

	public function setUnixTime($unixTime) {                                               
		$this->unixTime = $unixTime;                                                    
	}                                                                      

	public function getErrorType() {
		return $this->errorType;                               
	}

	public function setErrorType($errorType) {
		$this->errorType = $errorType;                                               
	}
	
	public function isAvailable() {
		return $this->available;                                           
	}

	public function setAvailable($available) {
		$this->available = $available;                                     
	}

	public function getProjectId() {
		return $this->projectId;                                           
	}

	public function setProjectId($projectId) {
		$this->projectId = $projectId;                                    
	}

	public function getNumberOfSubtitles() {                                           
		return $this->numberOfSubtitles;                                                      
	}                                                   

	public function setNumberOfSubtitles($numberOfSubtitles) {                                                   
		$this->numberOfSubtitles = $numberOfSubtitles;                                          
	}                                                                    

	public function getProjectArticle() {
		return $this->projectArticle;                                
	}

	public function setProjectArticle($projectArticle) {
		$this->projectArticle = $projectArticle;                              
	}

	public function getProjectSubtitle() {
		return $this->projectSubtitle;                                
	}

	public function setProjectSubtitle($projectSubtitle) {
		$this->projectSubtitle = $projectSubtitle;                              
	}

	public function getProjectTable() {
		return $this->projectTable;                                
	}

	public function setProjectTable($projectTable) {
		$this->projectTable = $projectTable;                              
	}

	public function getProjectCompositeArray() {
		return $this->projectCompositeArray;                    
	}

	public function setProjectCompositeArray($projectCompositeArray) {
		$this->projectCompositeArray[] = $projectCompositeArray;                                 
	}

	public function getImageSize() {
		return $this->imageSize;                         
	}

	public function setImageSize($imageSize) {
		$this->imageSize = $imageSize;                           
	}

	public function getImageTempName() {
		return $this->imageTempName;                        
	}

	public function setImageTempName($imageTempName) {
		$this->imageTempName = $imageTempName;                         
	}

	public function getImageName() {
		return $this->imageName;                         
	}

	public function setImageName($imageName) {
		$this->imageName = $imageName;                      
	}

	public function getStringToTokenize() {
		return $this->stringToTokenize;                                     
	}

	public function setStringToTokenize($stringToTokenize) {
		$this->stringToTokenize = $stringToTokenize;                                       
	}

	public function getDatabaseManager() {
		return $this->databaseManager;                                          
	}

	public function setDatabaseManager($databaseManager) {
		$this->databaseManager = $databaseManager;                                              
	}

	public function getOPtions() {
		return $this->options;                             
	}

	public function setOPtions($options) {
		$this->options = $options;                                
	}

	public function getStringTokensArray() {
		return $this->stringTokensArray;                              
	}

	public function setStringTokensArray($stringTokensArray) {
		$this->stringTokensArray[] = $stringTokensArray;                                
	}

	public function isCommitted() {
		return $this->committed;                      
	}

	public function setCommitted($committed) {
		$this->committed = $committed;                             
	}

	public function getExistence() {
		return $this->existence;                     
	}

	public function setExistence($existence) {
		$this->existence = $existence;                
	}

	public function getProjectLanguages() {                                     
		return $this->projectLanguages;                                       
	}	                                            

	public function setProjectLanguages($projectLanguages) {                                
		$this->projectLanguages = $projectLanguages;                                               
	}                                            

	public function getUtilityToolsUsed() {                                     
		return $this->utilityToolsUsed;                                       
	}	                                            

	public function setUtilityToolsUsed($utilityToolsUsed) {                                
		$this->utilityToolsUsed = $utilityToolsUsed;                                               
	}                                            

	public function getProjectDevelopers() {                                     
		return $this->projectDevelopers;                                       
	}	                                            

	public function setProjectDevelopers($projectDevelopers) {                                
		$this->projectDevelopers = $projectDevelopers;                                               
	}                                            

	public function getProjectObjective() {                                     
		return $this->projectObjective;                                       
	}	                                            

	public function setProjectObjective($projectObjective) {                                
		$this->projectObjective = $projectObjective;                                               
	}                                            

	public function getProjectCategory() {                                     
		return $this->projectCategory;                                       
	}	                                            

	public function setProjectCategory($projectCategory) {                                
		$this->projectCategory = $projectCategory;                                               
	}                                            

	public function getProjectLibrary() {                                     
		return $this->projectLibrary;                                       
	}	                                            

	public function setProjectLibrary($projectLibrary) {                                
		$this->projectLibrary = $projectLibrary;                                               
	}                                            

	public function getProjectTitle() {                                     
		return $this->projectTitle;                                       
	}	                                            

	public function setProjectTitle($projectTitle) {                                
		$this->projectTitle = $projectTitle;                                               
	}                                            

	public function getDataObject() {                                     
		return $this->pdo;                                       
	}	                                            

	public function setDataObject($pdo) {                                
		$this->pdo = $pdo;                                               
	}                                            
}                                               


