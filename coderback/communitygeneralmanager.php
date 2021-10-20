<?php                              

class CommunityGeneralManager {                                                
	
	function __construct($dataManager) {                                   
		$this->dataManager = $dataManager;                                           
	}                                                 

	public function concatenateArrayTables() {
		$builtTableNames = "";
		$dropTablesArray = $this->dataManager->getDropTablesArray();

		for ($i = 0; $i < count($dropTablesArray); $i++) { 
			$builtTableNames .= $dropTablesArray[$i] . ", ";
		}

		$this->dataManager->setAllDropTables(substr($builtTableNames, 0, -2));

		return $this->dataManager->getDatabaseManager();
	}

	public function generateReplyTablesName() {
		$theDate = $this->getDate();
		$memberIdPart = $this->getMemberIdPart();
				
		$this->dataManager->setClapTable("clap" . strtotime($theDate) . $memberIdPart);

		return $this->dataManager->getDatabaseManager();
	}

	public function generateAnswerTablesName() {
		$theDate = $this->getDate();
		$memberIdPart = $this->getMemberIdPart();

		$this->dataManager->setReplyTable("reply" . strtotime($theDate) . $memberIdPart);
		$this->dataManager->setClapTable("clap" . strtotime($theDate) . $memberIdPart);

		return $this->dataManager->getDatabaseManager();
	}

	public function generateQuestionTablesName() {                                                  
		$theDate = $this->getDate();
		$memberIdPart = $this->getMemberIdPart();
		
		$this->dataManager->setAnswerTable("answer" . strtotime($theDate) . $memberIdPart);
		$this->dataManager->setClapTable("clap" . strtotime($theDate) . $memberIdPart);
		$this->dataManager->setDateTime($theDate);                                                    

		return $this->dataManager->getDatabaseManager();                                                     
	}                                                                          

	private function getMemberIdPart() {
		$theDate = $this->getDate();
		$memberId = $this->dataManager->getMemberId();

		return sprintf("%05d", substr($memberId, -5)); 
	}

	private function getDate() {       
		$now = new DateTime();                                  

	    return $now->format('Y-m-d H:i:s');                                                       
	}
}                                                    


