<?php                              

class ProjectManager {                                     
	private $dataManager;                                

	function __construct($dataManager) {                                   
		$this->dataManager = $dataManager;                                           
	}                                                 

	public function generateProjectTablesName() {                                           
		$theUnixTime = $this->dataManager->getUnixTime();                                                 
		
		$this->dataManager->setProjectTable("project" . $theUnixTime);                                               
		$this->dataManager->setRequirementTable("requirement" . $theUnixTime);                                            

		return $this->dataManager->getDatabaseManager();                                                
	}                                                                

	public function getSplitStringArray() {                                           
		$toSplitString = trim($this->dataManager->getStringToTokenize());                                     

		if ($this->dataManager->isCommitted() === "true") {                                               
			if (strpos($toSplitString, " ") > -1) {                                     
				$this->dataManager->setStringTokensArray(substr($toSplitString, 0, strpos($toSplitString, " ")));                                                
				$this->dataManager->setStringToTokenize(trim(substr($toSplitString, strpos($toSplitString, " "))));                                           

				if (strlen($this->dataManager->getStringToTokenize()) > 0) {                                         
					if (strpos($this->dataManager->getStringToTokenize(), " ") > -1) {                                     
						$this->getSplitStringArray();                                                                           
					}                                                 
					else {                                                  
						$this->dataManager->setStringTokensArray($this->dataManager->getStringToTokenize());                                                      
					}                                             
				}                                                    
			}                                                    
			else {                                                      
				$this->dataManager->setStringTokensArray($toSplitString);                                                      
			}                                                

			return $this->dataManager->getDatabaseManager();                                            
		}                                                               
		else {                                                                   
			// Display Error Page!!!                                           
		}                                                           

		return $this->dataManager->getDatabaseManager();                                            
	}                                                          
}                                       


