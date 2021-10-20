<?php                     

require_once("../coderback/datastore.php");                         
require_once("../coderback/tablemanager.php");                         
require_once("../coderback/projectmanager.php");                          
require_once("../coderback/communitygeneralmanager.php");                          

class DatabaseManager {                          
	private $pdo;                                         
	private $dataManager;                                           
	private $projectManager;                                                  

	function __construct($dataManager) {
		$this->dataManager = $dataManager;
		$this->pdo = DataStore::getConnection();
		$this->projectManager = new ProjectManager($this->dataManager);
	}                                                     

	/**********************************************************************************
	* ALWAYS USE $_SESSION["memberId"] SESSION MEMBERID TO AUTHENTICATE USER IN THE   *
	* SERVER SIDE AND authenticatedUserId MEMBERID FOR THE CLIENT SIDE                *
	***********************************************************************************/

	public function editQuestionAnswer() {
		$theAnswer = $this->dataManager->getAnswer();
		$answerId = $this->dataManager->getAnswerId();
		$answerTableName = $this->dataManager->getAnswerTable();
		$query = "update " . $answerTableName . " set answer = " . $theAnswer . " where answerId = " . $answerId; 

		try {
			$this->pdo->query($query);

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			// display error page
		}
	}

	public function editCommunityQuestion() { 
		$questionId = $this->dataManager->getQuestionId();
		$questionContent = $this->dataManager->getQuestionContent();
		$questionCategories = $this->dataManager->getQuestionCategories();
		$query = "update educacodecommunityquestions set questionCategory = ?, questionContent = ? where questionId = ?";

		try {
			$stmt = $this->pdo->prepare($query);

			$stmt->execute(array($questionCategories, $questionContent, $questionId));

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			// display error page
		}
	}

	public function getRepliesCount() {
		return $this->dataManager->getNumberOfReplies();
	}

	public function deleteReply() {
		$query = "delete from " . $this->dataManager->getReplyTable() . " where replyId = " . $this->dataManager->getReplyId();

		try {
			$this->pdo->query($query);

			$this->dataManager->setNumberOfReplies($this->countAnswerReplies());

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			print("message at deleteReply is " . $message);

			return $this;
		}
	}

	public function getAnswersCount() {
		return $this->dataManager->getNumberOfAnswers();
	}

	public function deleteAnswer() {
		$query = "delete from " . $this->dataManager->getAnswerTable() . " where answerId = " . $this->dataManager->getAnswerId();

		try {
			$this->pdo->query($query);

			$this->dataManager->setNumberOfAnswers($this->countQuestionAnswers());

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			print("message at deleteAnswer is " . $message);

			return $this;
		}
	}

	public function getAnswerClapReplyTableNames() {
		$tempArray = array();
		$answerTableName = $this->dataManager->getAnswerTable();
		$query = "select replyTableName, clapTableName from " . $answerTableName;

		try {
			$result = $this->pdo->query($query);

			while ($row = $result->fetch()) {
				$tempArray[] = $row["replyTableName"];
				$this->dataManager->setDropTablesArray($row["replyTableName"]);
				$this->dataManager->setDropTablesArray($row["clapTableName"]);
			}            

			$this->dataManager->setTemporaryTables($tempArray);

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			print("message at getAnswerClapReplyTableNames is " . $message);	

			return $this;
		}		
	}

	public function deleteSearchQuestion() {
		$query = "delete from parentsearchtable where searchWord = \"" . $this->dataManager->getQuestionTitle() . "\"";

		try {
			$this->pdo->query($query);
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			print("message at deleteSearchQuestion is " . $message);
		}		
	}

	public function deleteQuestion() {
		$query = "delete from educacodecommunityquestions where questionId = " . $this->dataManager->getQuestionId();

		try {
			$this->pdo->query($query);

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			print("message at deleteQuestion is " . $message);

			return $this;
		}
	}

	public function dropArrayTables() {
		$query = "drop table if exists " . $this->dataManager->getAllDropTables();

		try {
			$this->pdo->query($query);

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			print("message at dropArrayTables is " . $message);	

			return $this;
		}
	}

	public function getClapOnlyTableNames() {
		$replyTableName = $this->dataManager->getTemporaryTables();

		if ($replyTableName != "") {
			try {
				for ($i = 0; $i < count($replyTableName); $i++) { 
					$query = "select clapTableName from " . $replyTableName[$i];

					$result = $this->pdo->query($query);

					while ($row = $result->fetch()) {
						$this->dataManager->setDropTablesArray($row["clapTableName"]);
					}            
				}

				$this->dataManager->setDatabaseManager($this);

				return count($this->dataManager->getDropTablesArray()) > 0 ? new CommunityGeneralManager($this->dataManager) : $this;
			} 
			catch (PDOException $error) {
				$message = $error->getMessage(); 

				$this->dataManager->setDatabaseManager($this);

				return count($this->dataManager->getDropTablesArray()) > 0 ? new CommunityGeneralManager($this->dataManager) : $this;
			}		
		}

		$this->dataManager->setDatabaseManager($this);

		return count($this->dataManager->getDropTablesArray()) > 0 ? new CommunityGeneralManager($this->dataManager) : $this;
	}

	public function getClapReplyTableNames() {
		$tempArray = array();
		$answerTableName = $this->dataManager->getTemporaryTables();
		$this->dataManager->setTemporaryTables("");
		$query = "select replyTableName, clapTableName from " . $answerTableName;

		try {
			$result = $this->pdo->query($query);

			while ($row = $result->fetch()) {
				$tempArray[] = $row["replyTableName"];
				$this->dataManager->setDropTablesArray($row["replyTableName"]);
				$this->dataManager->setDropTablesArray($row["clapTableName"]);
			}            

			$this->dataManager->setTemporaryTables($tempArray);

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			print("message at getClapReplyTableNames is " . $message);	

			return $this;
		}
	}

	public function getClapAnswerTableNames() {
		$questionId = $this->dataManager->getQuestionId();
		$query = "select questionId, answerTableName, clapTableName from educacodecommunityquestions where questionId = " . $questionId;

		try {
			$result = $this->pdo->query($query);

			while ($row = $result->fetch()) {
				$this->dataManager->setTemporaryTables($row["answerTableName"]);
				$this->dataManager->setDropTablesArray($row["answerTableName"]);
				$this->dataManager->setDropTablesArray($row["clapTableName"]);
			}            

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			print("message at getClapAnswerTableNames is " . $message);

			return $this;
		}
	}

	public function updateReplyClaps() {
		$clapArray = array();
		$replyId = $this->dataManager->getReplyId();
		$replyTableName = $this->dataManager->getReplyTable();
		$numberOfClaps = $this->dataManager->getNumberOfClaps();

		try {
			$query = "update " . $replyTableName . " set numberOfClaps = ? where replyId = ?";

			$stmt = $this->pdo->prepare($query);

			$stmt->execute(array($numberOfClaps, $replyId));

			$clapArray[] = $this->isAuthenticatedUserClap();
			$clapArray[] = $numberOfClaps; 

			return $clapArray;
	    }
	    catch(PDOException $error) {
	    	$message = $error->getMessage();
	    	// display error page                   
	    }
	}

	public function createClapReplyTable() {
		if ($this->dataManager->isCommitted() === "false"
			&& $this->dataManager->getErrorType() === "TABLE NOT FOUND") {
			$tableManager = new TableManager($this->dataManager);
		 	$this->dataManager->setDataObject($this->pdo);
	       	$tableManager->createClapTable();

	       	return $this->clapForAnswer();
		}                                                            
		else {
			return $this;
		}
	}

	public function clapForReply() {
		return $this->clapForResponse();
	}

	public function getAllReplyComponents() {
		$allReplyComposite = array();
		$replyTableName = $this->dataManager->getReplyTable();
		$numberOfReplies = $this->dataManager->getNumberOfReplies();

		$query = "select * from " . $replyTableName;

		$allReplyComposite[] = $numberOfReplies;

		try {
			$allReplyArray = array();

			$result = $this->pdo->query($query);

			while ($row = $result->fetch()) {
				$tempArray = array();
				$tempArray[] = $row["replyId"];  

				$this->dataManager->setReplyId($row["replyId"]);

				$firstQuery = "select firstName, lastName, profilePicture from educacode where memberId = " . $row["memberId"];
				
				$firstResult = $this->pdo->query($firstQuery);

				while ($firstRow = $firstResult->fetch()) {
					$tempArray[] = $firstRow["firstName"] . " " . $firstRow["lastName"];
					$tempArray[] = $firstRow["profilePicture"];
				}				

				$tempArray[] = $row["replyContent"];
				$tempArray[] = $row["numberOfClaps"];
				$tempArray[] = $row["replyDate"];
				$clapTableName = $row["clapTableName"];
				$tempArray[] = $clapTableName;

				$this->dataManager->setClapTable($clapTableName);

				$tempArray[] = $this->isAuthenticatedUserClap(); 

				$tempArray[] = $replyTableName;

				$tempArray[] = $this->isAuthenticatedUserReply(); 

				$allReplyArray[] = $tempArray;
			}

			$allReplyComposite[] = $allReplyArray;

			return $allReplyComposite;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			// display error page	
		}
	}

	public function updateAnswerReplies() {
		$answerId = $this->dataManager->getAnswerId();
		$answerTableName = $this->dataManager->getAnswerTable();
		$numberOfReplies = $this->dataManager->getNumberOfReplies();

		$query = "update " . $answerTableName . " set numberOfReplies = ? where answerId = ?";

		try {
		    $stmt = $this->pdo->prepare($query);

		    $stmt->execute(array($numberOfReplies, $answerId));

			$this->dataManager->setCommitted("true");

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			// display error page	
		}
	}

	public function createReplyTable() {
		if ($this->dataManager->isCommitted() === "false"
			&& $this->dataManager->getErrorType() === "TABLE NOT FOUND") {
			$tableManager = new TableManager($this->dataManager);
		 	$this->dataManager->setDataObject($this->pdo);
	       	$tableManager->createReplyTable();

	       	return $this->commitCommunityReply();
		}                                                            
		else {
			return $this;
		}
	}

	public function commitCommunityReply() { 
		$reply = $this->dataManager->getReply();
		$memberId = $this->dataManager->getMemberId();
		$replyTableName = $this->dataManager->getReplyTable();

		$query = "insert into " . $replyTableName . " (replyId, memberId, replyContent, numberOfClaps, replyDate, clapTableName) values (?, ?, ?, ?, ?, ?)";

		try {
		    $stmt = $this->pdo->prepare($query);

		    $stmt->execute(array(0, $memberId, $reply, 0, $this->getDate(), $this->dataManager->getClapTable()));

		    $this->dataManager->setReplyId($this->pdo->lastInsertId());

			$this->dataManager->setCommitted("true");
			
			if ($this->dataManager->isCommitted() === "true") {
				$numberOfReplies = 0;
				$query = "select replyId from " . $replyTableName;

				$result = $this->pdo->query($query);

				while ($row = $result->fetch()) {
					$numberOfReplies++;
				}

				$this->dataManager->setNumberOfReplies($numberOfReplies);
			}

			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();

            if (strpos($message, $replyTableName) > -1 && strpos($message, "not found") > -1) {
               	$this->dataManager->setErrorType("TABLE NOT FOUND");
               	$this->dataManager->setCommitted("false");
            }      

          	return $this;
		}
	}

	public function updateAnswerClaps() {
		$clapArray = array();
		$answerId = $this->dataManager->getAnswerId();
		$answerTableName = $this->dataManager->getAnswerTable();
		$numberOfClaps = $this->dataManager->getNumberOfClaps();

		try {
			$query = "update " . $answerTableName . " set numberOfClaps = ? where answerId = ?";

			$stmt = $this->pdo->prepare($query);

			$stmt->execute(array($numberOfClaps, $answerId));

			$clapArray[] = $this->isAuthenticatedUserClap();
			$clapArray[] = $numberOfClaps; 

			return $clapArray;
	    }
	    catch(PDOException $error) {
	    	$message = $error->getMessage();
	    	// display error page                   
	    }
	}

	public function createClapAnswerTable() {
		if ($this->dataManager->isCommitted() === "false"
			&& $this->dataManager->getErrorType() === "TABLE NOT FOUND") {
			$tableManager = new TableManager($this->dataManager);
		 	$this->dataManager->setDataObject($this->pdo);
	       	$tableManager->createClapTable();

	       	return $this->clapForAnswer();
		}                                                            
		else {
			return $this;
		}
	}

	public function clapForAnswer() {
		return $this->clapForResponse();
	}

	private function getDate() {
		$now = new DateTime();              

	    return $now->format('Y-m-d H:i:s');               
	}

	public function getAnswerValues() {
		$answerComposite = array();

		$answerComposite[] = $this->dataManager->getNumberOfAnswers();
		$answerComposite[] = $this->dataManager->getAnswerId();

		$query = "select memberId, firstName, lastName, profilePicture from educacode where memberId = " . $this->dataManager->getMemberId();

		try {
			$result = $this->pdo->query($query);

			while ($row = $result->fetch()) {
				$answerComposite[] = $row["profilePicture"];
				$answerComposite[] = $row["firstName"] . " " . $row["lastName"];
			}
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			// display error page	
		}

		$answerComposite[] = $this->dataManager->getDateTime();
		$answerComposite[] = $this->dataManager->getAnswer();
		$answerComposite[] = 0;
		$answerComposite[] = 0;
		$answerComposite[] = $this->dataManager->getAnswerTable();
		$answerComposite[] = $this->dataManager->getReplyTable();
		$answerComposite[] = $this->dataManager->getClapTable();
		$answerComposite[] = $this->isAuthenticatedUserAnswer();

		return $answerComposite;
	}

	public function updateQuestionAnswers() {
		$questionId = $this->dataManager->getQuestionId();
		$numberOfAnswers = $this->dataManager->getNumberOfAnswers();

		try {                                                        
			$query = "update educacodecommunityquestions set numberOfAnswers = ? where questionId = ?";

			$stmt = $this->pdo->prepare($query);

			$stmt->execute(array($numberOfAnswers, $questionId));

			return $this;
	    }                                                  
	    catch (PDOException $error) {
	       	$message = $error->getMessage();
	       	// display error page                   
	    }
	}

	public function createAnswerTable() {
		if ($this->dataManager->isCommitted() === "false"                       
			&& $this->dataManager->getErrorType() === "TABLE NOT FOUND") {                                                     
	       	$tableManager = new TableManager($this->dataManager);                                        
	       	$this->dataManager->setDataObject($this->pdo);                                  
	       	$tableManager->createAnswerTable();                                              
	       	return $this->commitQuestionAnswer();                                                 
		}                                                            
		else {                                                   
			return $this;                                        
		}                                                   
	}

	public function commitQuestionAnswer() {
		$theAnswer = $this->dataManager->getAnswer();
		$memberId = $this->dataManager->getMemberId();
		$clapTableName = $this->dataManager->getClapTable();
		$replyTableName = $this->dataManager->getReplyTable();
		$answerTableName = $this->dataManager->getAnswerTable();

		$query = "insert into " . $answerTableName . " (answerId, memberId, answerContent, numberOfReplies, numberOfClaps, answerDate, replyTableName, clapTableName) values (?, ?, ?, ?, ?, ?, ?, ?)";

		try {
			$theDate = $this->getDate();
			$this->dataManager->setDateTime($theDate);
			
			$stmt = $this->pdo->prepare($query);                           

			$stmt->execute(array(0, $memberId, $theAnswer, 0, 0, $theDate, $replyTableName, $clapTableName)); 

			$this->dataManager->setAnswerId($this->pdo->lastInsertId());

			$this->dataManager->setCommitted("true");

			if ($this->dataManager->isCommitted() === "true") {
				$this->dataManager->setNumberOfAnswers($this->countQuestionAnswers());
			}
			
			return $this;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();

            if (strpos($message, $answerTableName) > -1 && strpos($message, "not found") > -1) {
               	$this->dataManager->setErrorType("TABLE NOT FOUND");
               	$this->dataManager->setCommitted("false");
               	return $this;                                           
            }                                                             
		}
	}

	private function countAnswerReplies() {
		$numberOfReplies = 0;                                       
		$query = "select replyId from " . $this->dataManager->getReplyTable();

		try {
			$result = $this->pdo->query($query);

			while ($row = $result->fetch()) {
				$numberOfReplies++;
			}                                                       

			return $numberOfReplies;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();

			return $numberOfReplies;	
		}		
	}

	private function countQuestionAnswers() {
		$numberOfAnswers = 0;                                       
		$query = "select answerId from " . $this->dataManager->getAnswerTable();

		try {
			$result = $this->pdo->query($query);

			while ($row = $result->fetch()) {
				$numberOfAnswers++;
			}                                                       

			return $numberOfAnswers;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();

			return $numberOfAnswers;	
		}
	}

	public function updateQuestionClaps() {
		$clapArray = array();
		$questionId = $this->dataManager->getQuestionId();
		$numberOfClaps = $this->dataManager->getNumberOfClaps();

		try {                                                        
			$query = "update educacodecommunityquestions set numberOfClaps = ? where questionId = ?";

			$stmt = $this->pdo->prepare($query);

			$stmt->execute(array($numberOfClaps, $questionId));

			$clapArray[] = $this->isAuthenticatedUserClap();
			$clapArray[] = $numberOfClaps; 

			return $clapArray;                                          
	    }                                                  
	    catch(PDOException $error) {
	    	$message = $error->getMessage();
	    	// display error page                   
	    }
	}                                                            

	public function createClapQuestionTable() {
		if ($this->dataManager->isCommitted() === "false"
			&& $this->dataManager->getErrorType() === "TABLE NOT FOUND") {
			$tableManager = new TableManager($this->dataManager);
		 	$this->dataManager->setDataObject($this->pdo);
	       	$tableManager->createClapTable();

	       	return $this->clapForQuestion();
		}                                                            
		else {
			return $this;
		}
	}                                                                

	public function clapForQuestion() {
		return $this->clapForResponse();
	}

	private function clapForResponse() {
		$memberId = $this->dataManager->getMemberId();
		$clapTableName = $this->dataManager->getClapTable();

		try {
			$clapperId = 0;
			$query = "select memberId from " . $clapTableName . " where memberId = ?";

			$stmt = $this->pdo->prepare($query);

		    $stmt->execute(array($memberId));

		    while ($row = $stmt->fetch()) {
		       	$clapperId = $row["memberId"];
			}

			if ($clapperId > 0) {
				$query = "delete from " . $clapTableName . " where memberId = ?";

				$stmt = $this->pdo->prepare($query);

			    $stmt->execute(array($memberId));
			}                                                               
			else {                                                         
				$query = "insert into " . $clapTableName . " (clapId, memberId) values (?, ?)";

				$stmt = $this->pdo->prepare($query);

				$stmt->execute(array(0, $memberId));
			}                                                   

			$numberOfClaps = 0;                                       
			$query = "select clapId from " . $clapTableName;

			$result = $this->pdo->query($query);

			while ($row = $result->fetch()) {
				$numberOfClaps++;
			}                                                       

			$this->dataManager->setNumberOfClaps($numberOfClaps);

			return $this;                                                 
		}                                                           
		catch (PDOException $error) {
			$message = $error->getMessage();

            if (strpos($message, $clapTableName) > -1 && strpos($message, "not found") > -1) {
               	$this->dataManager->setErrorType("TABLE NOT FOUND");
               	$this->dataManager->setCommitted("false");

               	return $this;
            }                                                             
		}                                                     
	}                                                     

	public function getQuestionComponents() {
		$answerComposite = array(); 
		$clapTableName = $this->dataManager->getClapTable();
		$answerTableName = $this->dataManager->getAnswerTable();

		$answerComposite[] = $this->isAuthenticatedUserClap();

		try {
			$childAnswerComposite = array();
			$query = "select * from " . $answerTableName;

		    $result = $this->pdo->query($query);

		    while ($row = $result->fetch()) {
		    	$tempArray = array();

		    	$answerId = $row["answerId"];
				$tempArray[] = $answerId;
		    	$this->dataManager->setAnswerId($answerId);

				$firstQuery = "select firstName, lastName, profilePicture from educacode where memberId = " . $row["memberId"];

			    $firstResult = $this->pdo->query($firstQuery);

			    while ($firstRow = $firstResult->fetch()) {			    	
			    	$tempArray[] = $firstRow["firstName"] . " " . $firstRow["lastName"];
			    	$tempArray[] = $firstRow["profilePicture"];
			    }

				$tempArray[] = $row["answerContent"];
				$tempArray[] = $row["numberOfReplies"];
				$tempArray[] = $row["numberOfClaps"];
				$clapTableName = $row["clapTableName"];
				$this->dataManager->setClapTable($clapTableName);
				$tempArray[] = $this->isAuthenticatedUserClap();
				$tempArray[] = $row["answerDate"];
				$tempArray[] = $clapTableName;
				$tempArray[] = $row["replyTableName"]; 
				$tempArray[] = $this->isAuthenticatedUserAnswer();

			    $childAnswerComposite[] = $tempArray;
		    }                                                 			

		    $answerComposite[] = $childAnswerComposite; 
		   	$answerComposite[] = $this->isAuthenticatedUserQuestion();
		}                                                             
		catch (PDOException $error) {
			$message = $error->getMessage();
			// display error page    
		}                                               

	    return $answerComposite;                                
	}                                                           

	private function isAuthenticatedUserReply() {  
		$replyId = $this->dataManager->getReplyId();
		$memberId = $this->dataManager->getMemberId();
		$replyTableName = $this->dataManager->getReplyTable();

		try {
			$query = "select replyId, memberId from " . $replyTableName . " where replyId = ? and memberId = ?";
			
			$stmt = $this->pdo->prepare($query);

			$stmt->execute(array($replyId, $memberId));

			$row = $stmt->fetch();

			return $row["replyId"] < 1 ? "false" : "true";
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			// display error page	
		}
	}

	private function isAuthenticatedUserAnswer() {
		$memberId = $this->dataManager->getMemberId();
		$answerId = $this->dataManager->getAnswerId();
		$answerTableName = $this->dataManager->getAnswerTable();

		try {
			$query = "select answerId, memberId from " . $answerTableName . " where answerId = ? and memberId = ?";
			
			$stmt = $this->pdo->prepare($query);

			$stmt->execute(array($answerId, $memberId));

			$row = $stmt->fetch();

			return $row["answerId"] < 1 ? "false" : "true";
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			// display error page	
		}
	}

	private function isAuthenticatedUserQuestion() {
		$memberId = $this->dataManager->getMemberId();
		$questionId = $this->dataManager->getQuestionId();

		try {
			$query = "select questionId, memberId from educacodecommunityquestions where questionId = ? and memberId = ?";
			
			$stmt = $this->pdo->prepare($query);

			$stmt->execute(array($questionId, $memberId));

			$row = $stmt->fetch();

			return $row["questionId"] < 1 ? "false" : "true";
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			// display error page	
		}
	}

	private function isAuthenticatedUserClap() {
		$memberId = $this->dataManager->getMemberId();
		$clapTableName = $this->dataManager->getClapTable();

		try {
		    $query = "select clapId, memberId from " . $clapTableName . " where memberId = " . $memberId;

		    $result = $this->pdo->query($query);

		    $row = $result->fetch();

		   	$clapStatus = $row["clapId"] > 0 ? "true" : "false";    

	    	return $clapStatus;
		}                                                   
		catch (Exception $error) {
			$message = $error->getMessage();

			return "false";
		}                                   
	}

	public function getEducacodeQuestions() {                                                      
		$questionComposite = array();                                                  
		$query = "select * from educacodecommunityquestions order by questionId desc";

		try {                                                 
		    $result = $this->pdo->query($query);

		    while ($row = $result->fetch()) {
		      	$tempArray = array();

		    	$questionId = $row["questionId"];

				$this->dataManager->setQuestionId($questionId);

				$tempArray[] = $questionId;

				$firstQuery = "select firstName, lastName, profilePicture from educacode where memberId = " . $row["memberId"];

			    $firstResult = $this->pdo->query($firstQuery);

			    while ($firstRow = $firstResult->fetch()) {                                                  
			    	$tempArray[] = $firstRow["firstName"];                                          
			    	$tempArray[] = $firstRow["lastName"];                                          
			    	$tempArray[] = $firstRow["profilePicture"];
			   	}
			   	
				$tempArray[] = $row["questionCategory"];                                
				$tempArray[] = $row["questionTitle"];                                
				$tempArray[] = $row["questionContent"];                                               
				$tempArray[] = $row["numberOfAnswers"];                                
				$tempArray[] = $row["numberOfClaps"];                                
				$tempArray[] = $row["answerTableName"];                                
				$tempArray[] = $row["clapTableName"];                                
				$tempArray[] = $row["questionDate"];
				$tempArray[] = $this->isAuthenticatedUserQuestion();

				$questionComposite[] = $tempArray;
		    }                                                 

		    return $questionComposite;                                                 
		}                                                            
		catch (PDOException $error) {                                              
			$message = $error->getMessage();                                                  
			// display error page                              
		}                                                        		
	}                                             

	public function verifyLoginPassword() {                                                       
		$hashedPassword = $this->dataManager->getHashedPassword();                                               

	    if ($hashedPassword != "") {                                         
	    	$theDate = $this->dataManager->getDateTime();                                       
	    	$password = $this->dataManager->getPassword();                                                        
	    	$email = $this->dataManager->getEmailAddress();                                                           

	        $theTime = strtotime($theDate);                                                          

	        $firstSalt = substr($email, 0, 5);                                                         

	        $thePassword = $firstSalt . $password . $theTime;                                                                      
	        
			if (password_verify($thePassword, $hashedPassword)) {                                                                                
	            $_SESSION["authenticated"] = "true";                                                                      

			    header('Location: http://' . $_SERVER['HTTP_HOST'] . "/coder/community.php");                                                                                            
			} else {                                                                                     
			    header('Location: http://' . $_SERVER['HTTP_HOST'] . "/coder/signup.php");                                                                                
			}                                                                      
		}                                                        
	}                                                                   

	public function getUserDataForLogin() {                                                     
		$password = $this->dataManager->getPassword();                                       
		$emailAddress = $this->dataManager->getEmailAddress();                                             

		$query = "select * from educacode where emailAddress = ?";                                                   

		try {                                                 
		    $stmt = $this->pdo->prepare($query);                                              

		    $stmt->execute(array($emailAddress));                                                     

		    while ($row = $stmt->fetch()) {                                                  
		        $this->dataManager->setHashedPassword($row["password"]);                                             
		        $this->dataManager->setDateTime($row["regDate"]);                                                 

				$_SESSION["memberId"] = $row["memberId"];                                
				$_SESSION["userName"] = $row["userName"];                                
				$_SESSION["firstName"] = $row["firstName"];                                
				$_SESSION["lastName"] = $row["lastName"];                                
				$_SESSION["sex"] = $row["sex"];                                               
				$_SESSION["emailAddress"] = $row["emailAddress"];                                
				$_SESSION["memberCountry"] = $row["memberCountry"];                                
				$_SESSION["memberState"] = $row["memberState"];                                
				$_SESSION["registrationDate"] = $this->dataManager->getDateTime();                                
				$_SESSION["profilePicture"] = $row["profilePicture"];                                          
				$this->dataManager->setEmailAddress($_SESSION["emailAddress"]);                                                     
		    }                                                 
		}                                                            
		catch (PDOException $error) {                                              
			$message = $error->getMessage();                                                  
			// display error page                              
		}                                                        

	    if ($this->dataManager->getEmailAddress() !== "") {                                                             
		    return $this;                                                                    
	    }                                                               
	    else {                                                   
	    	session_destroy();                                             

		    header('Location: http://' . $_SERVER['HTTP_HOST'] . "/coder/signup.php");                                            
	    }                                                    
	}                                                                    

	public function getQuestionValues() {
		$questionComposite = array();
		$theQuestionId = $this->dataManager->getQuestionId();
		$query = "select * from educacodecommunityquestions where questionId = " . $theQuestionId;

		try {
			$result = $this->pdo->query($query);

			while ($row = $result->fetch()) {
				$questionComposite[] = $row["questionId"];

				$firstQuery = "select memberId, firstName, lastName, profilePicture from educacode where memberId = " . $row["memberId"];

				$firstResult = $this->pdo->query($firstQuery);

				while ($firstRow = $firstResult->fetch()) {
					$questionComposite[] = $firstRow["profilePicture"];
					$questionComposite[] = $firstRow["firstName"] . " " . $firstRow["lastName"];
				}

				$questionComposite[] = $row["questionCategory"];
				$questionComposite[] = $row["questionTitle"];
				$questionComposite[] = $row["questionContent"];
				$questionComposite[] = $row["answerTableName"];
				$clapTableName = $row["clapTableName"];
				$questionComposite[] = $clapTableName;
				$questionComposite[] = $row["questionDate"];
				$questionComposite[] = $row["numberOfAnswers"];
				$questionComposite[] = $row["numberOfClaps"];
				$this->dataManager->setClapTable($clapTableName);
				$questionComposite[] = $this->isAuthenticatedUserClap($clapTableName);
			}

			return $questionComposite;
		} 
		catch (PDOException $error) {
			$message = $error->getMessage();
			// display error page	
		}
	}

	public function insertSearchQuestionTitle() {
	    $category = "QUESTION";                                            
	    $questionTitle = $this->dataManager->getQuestionTitle();

	    if ($this->dataManager->isCommitted() === "true") {
	        try {                        
		        $query = "insert into parentsearchtable (searchWordId, searchWord, category) values (?, ?, ?)";

		        $stmt = $this->pdo->prepare($query);              

		        $stmt->execute(array(0, $questionTitle, $category));

			    $this->dataManager->setCommitted("true");

			    return $this;
		    }                                   
		    catch (PDOException $error) {                                        
				$this->dataManager->setCommitted("false");                                  
		        $message = $error->getMessage();                           
		        // display error page                                             
		    }                                                  
		}                                               
	}                                                         

	public function commitCommunityQuestion() {                                             
		$memberId = $this->dataManager->getMemberId();                                          
		$questionTitle = $this->dataManager->getQuestionTitle();                                         
		$questionCategories = $this->dataManager->getQuestionCategories();                                         
		$questionContent = $this->dataManager->getQuestionContent();                                         

		$query = "insert into educacodecommunityquestions (questionId, memberId, questionCategory, questionTitle, questionContent, numberOfAnswers, numberOfClaps, answerTableName, clapTableName, questionDate) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";                                                                  

		try {                                                                                                               
			$stmt = $this->pdo->prepare($query);                                            
			$stmt->execute(array(0, $memberId, $questionCategories, $questionTitle, $questionContent, 0, 0, $this->dataManager->getAnswerTable(), $this->dataManager->getClapTable(), $this->dataManager->getDateTime()));                                                 
			$this->dataManager->setQuestionId($this->pdo->lastInsertId());
			$this->dataManager->setCommitted("true");
		}                                                                 
		catch (PDOException $error) {                                                      
			$this->dataManager->setCommitted("false");                                    
			$message = $error->getMessage();                                               
			// display error message                           
		}                                                         

		return $this;                                        
	}                                                                

	public function commitUserName() {                                                           
		try {                                                       
			$query = "update educacode set userName = ? where memberId = ?";                                                       

			$stmt = $this->pdo->prepare($query);                                            
			$stmt->execute(array($this->dataManager->getUserName(), $this->dataManager->getMemberId()));                                                                    

			$this->dataManager->setCommitted("true");                                                 
	    }                                                 
	    catch(PDOException $error) {                                                                      
	    	$message = $error->getMessage();                                                        
	    	$this->dataManager->setCommitted("false");                                           
	    	// display error page                   
	    }                                                                      
	}                                                                   

	public function commitProfilePicture() {                                                            
		$profilePicture = "";                                                                   
		$memberId = $this->dataManager->getMemberId();                                                         
    	$imageName = $this->dataManager->getImageName();                                             
    	$imageTempName = $this->dataManager->getImageTempName();                                          
    	$imageSize = $this->dataManager->getImageSize();                                        
		$userName = $this->dataManager->getUserName();                                          
		$firstName = $this->dataManager->getFirstName();                                         
		$lastName = $this->dataManager->getLastName();                                        
		
		if ($imageName !== "") {                                                 
			if ($_SESSION["profilePicture"] !== "") {                                                      
				unlink("../coder/image/" . $_SESSION["profilePicture"]);                                                                         
			}                                                                         

			$imagePrefix = "";                                                   
			$imagePrefix .= substr($firstName, 0, 1);                                                      
			$imagePrefix .= substr($lastName, 0, 1);                                                       

			$memberIdPart = sprintf("%05d", substr($memberId, -5));                                              

		    $validExtensions = array('jpeg', 'jpg', 'png', 'gif'); // valid extensions
		    $imageExtension = strtolower(pathinfo($imageName, PATHINFO_EXTENSION)); // get image extension

		    $profilePicture = $imagePrefix . time() . $memberIdPart . "." . $imageExtension;                                 

		    if (in_array($imageExtension, $validExtensions)) {                                       
		        if ($imageSize < 5000000) {                                              
		            move_uploaded_file($imageTempName, "../coder/image/" . $profilePicture);                                        
		        }                                               
		        else {                  
		            $errorMessage = "Sorry, your file is too large.";                                    
		        }                                        
		    }                           
		    else {                                       
		        $errorMessage = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";                                           
		    }                                                            

			try {                                                       
				$query = "update educacode set profilePicture = ? where memberId = ?";                                                       

				$stmt = $this->pdo->prepare($query);                                            
				$stmt->execute(array($profilePicture, $memberId));                                                 

				$this->dataManager->setCommitted("true");                                                 
		    }                                                                    
		    catch(PDOException $error) {                                         
		    	$message = $error->getMessage();                                              
		    	$this->dataManager->setCommitted("false");                                           
		    	// display error page                   
		    }                                                                      
		}                                                   		  
		else {                                                              
			$this->dataManager->setCommitted("false");                                           
		}                                                               
	}                                                

	public function doesUserNameExists() {                                     
	    $checkUserName = "";                                 
		$userName = $this->dataManager->getUserName();                                
	    $query = "select userName, profilePicture from educacode where userName = ?";                                          

	    if ($userName != "") {                                                   
			try {                                             
		        $stmt = $this->pdo->prepare($query);                                                 
		        $stmt->execute(array($userName));                                                         

		        while ($row = $stmt->fetch()) {                                     
		            $checkUserName = $row["userName"];                                  
		            $_SESSION["profilePicture"] = $row["profilePicture"];                                              
		        }                                          
		             
		        if ($checkUserName === "") {                                       
		        	$this->dataManager->setUserNameExists("false");                                              
		        	$_SESSION["userName"] = $userName;                                                 
		        	return $this;                                                   
		        }                                                         
		        else {                                                        
		        	$this->dataManager->setUserNameExists("true");                                              
		        	return $this;                                                     
		        }                                                  
			}                                                      
			catch (PDOException $error) {                                           
				$message = $error->getMessage();                                              
				// display error page                
			}                                           
		}                                                              
		else {                                                        
			return $this;                                                     
		}                                                        
	}                                                

	public function newMemberRegistration() {                                                          
		$firstName = $this->dataManager->getFirstName();                                
		$lastName = $this->dataManager->getLastName();                                
		$gender = $this->dataManager->getGender();                                
		$emailAddress = $this->dataManager->getEmailAddress();                                
		$memberCountry = $this->dataManager->getMemberCountry();                                
		$memberState = $this->dataManager->getMemberState();                                
		$password = $this->dataManager->getPassword();                                

		$now = new DateTime();              

	    $theDate = $now->format('Y-m-d H:i:s');               

	    $theTime = strtotime($theDate);               

	    $firstSalt = substr($emailAddress, 0, 5);                   

	    $thePassword = $firstSalt . $password . $theTime;             

	    $passwordHash = password_hash($thePassword, PASSWORD_DEFAULT);                 

	    try {
	        $query = "insert into educacode (memberId, userName, firstName, lastName, sex, "                      
	            . "emailAddress, memberCountry, memberState, password, regDate, profilePicture) "                       
	            . "values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";                          
	        
	        $stmt = $this->pdo->prepare($query);                    

	        $stmt->execute(array(0, "", $firstName, $lastName, $gender, $emailAddress, $memberCountry, $memberState, $passwordHash, $theDate, ""));                                            

	        $this->dataManager->setMemberId($this->pdo->lastInsertId());                                             
	        $this->dataManager->setCommitted("true");                                              
	    }                 
	    catch (PDOException $error) {                                                         
	        $message = $error->getMessage();                                                
	        $this->dataManager->setCommitted("false");                                         
	        // display error page
	    }                                                   
	}                                                                 

	public function doesEmailAddressExists() {                                                 
		if ($this->dataManager->getSubmit() != null) {                                        
		    $checkEmailAddress = "";                                 
			$emailAddress = $this->dataManager->getEmailAddress();                                
	        $query = "select emailAddress from educacode where emailAddress = ?";                                          

			try {                                             
	            $stmt = $this->pdo->prepare($query);              
	            $stmt->execute(array($emailAddress));              

	            while ($row = $stmt->fetch()) {                
	                $checkEmailAddress = $row["emailAddress"];                         
	            }                                          
	                 
	            if ($checkEmailAddress == "") {                                       
	            	return $this;                                                   
	            }                                                         
	            else {                                                        
	            	// display error page                 
	            }                                                  
			}                                                      
			catch (PDOException $error) {                                           
				$message = $error->getMessage();                                 

				// display error page                
			}                                           
		}                                                    
		else {                                               

		}                                                
	}                                                          

	public function getAuthenticatedUser() {                                                        
		$email = $this->dataManager->getEmailAddress();                                               
		$query = "select * from educacode where emailAddress = ?";                                                   

		try {                                                 
		    $stmt = $this->pdo->prepare($query);                                                    

		    $stmt->execute(array($email));                                                         

		    while ($row = $stmt->fetch()) {                                                  
				$_SESSION["memberId"] = $row["memberId"];                                
				$_SESSION["userName"] = $row["userName"];                                                                 
				$_SESSION["firstName"] = $row["firstName"];                                
				$_SESSION["lastName"] = $row["lastName"];                                
				$_SESSION["sex"] = $row["sex"];                                
				$_SESSION["emailAddress"] = $row["emailAddress"];                                
				$_SESSION["memberCountry"] = $row["memberCountry"];                                
				$_SESSION["memberState"] = $row["memberState"];                                
				$_SESSION["registrationDate"] = $row["regDate"];                                
				$_SESSION["profilePicture"] = $row["profilePicture"];                                          
		    }                                                 
		}                                                            
		catch (PDOException $error) {                                              
			$message = $error->getMessage();                                                  
			// display error page                              
		}                                                        

		$membersData = array(                                        
			$_SESSION["authenticated"],                                
			$_SESSION["memberId"],                                
			$_SESSION["userName"],                                
			$_SESSION["firstName"],                                
			$_SESSION["lastName"],                                
			$_SESSION["sex"],                                
			$_SESSION["emailAddress"],                                
			$_SESSION["memberCountry"],                                
			$_SESSION["memberState"],                                
			$_SESSION["registrationDate"],                                
			$_SESSION["profilePicture"]                                
		);                                                    

		return $membersData;                                         
	}                                                       

	public function getEducacodeMembers() {                                                             
		$membersData = array();                                               
		$query = "select userName, emailAddress from educacode";                                                 

		try {                                                   
			$result = $this->pdo->query($query);

			while ($row = $result->fetch()) {                                       
				$tempArray = array();                                                  
				$tempArray[] = $row["userName"];                             
			 	$tempArray[] = $row["emailAddress"];                              
			 	$membersData[] = $tempArray;                                             
			}                                                           
		}                                                        
		catch (PDOException $error) {                                      
		    $message = $error->getMessage();                               
		    // Display error page
		}                                             

		return $membersData;                                                 
	}                                                                    

	public function getProjectRequirementTitles() {                                                 
		$requirementTitles = array();                                                    
		$query = "select title from " . $this->dataManager->getRequirementTable();                                  

		try {               
			$result = $this->pdo->query($query);                        

			while ($row = $result->fetch()) {                                    
				$requirementTitles[] = $row["title"];                             
			}                                                       
		}                                         
		catch (PDOException $error) {                                      
		    $message = $error->getMessage();                                     
		    // Display error page
		}                                               

		return $requirementTitles;                                         
	}                                                                

	public function getProjectTitleMetadata() {                                                 
		$query = "select projectId, title, projectTable, requirementTable from educacodeprojects";                   

		try {               
			$result = $this->pdo->query($query);                        

			$projectTitles = array();                     

			while ($row = $result->fetch()) {                                    
				$tempArray = array();                                          
				$tempArray[] = $row["projectId"];                            
				$tempArray[] = $row["title"];                             
				$tempArray[] = $row["projectTable"];                               
				$tempArray[] = $row["requirementTable"];                               
			 	$projectTitles[] = $tempArray;                     
			}                                                       
		}                                         
		catch(PDOException $error){                            
		    $message = $error->getMessage();                  
		    // Display error page
		}                                               

		return $projectTitles;                                         
	}                                                                

	public function updateProjectModifiedDate() {                                               
        $now = new DateTime();                                  

        $dateModified = $now->format('Y-m-d H:i:s');                                           
		$projectId = $this->dataManager->getProjectId();                                                     
		$query = "update educacodeprojects set dateModified = ? where projectId = ?";                                                        
		try {                                                           
		    $stmt = $this->pdo->prepare($query);                                               

		    $stmt->execute(array($dateModified, $projectId));                                                          
		}                                                                  
		catch (PDOException $error) {                                                  
			$message = $error->getMessage();                                      
			// display error page                    
		}                                                         
	}                                                                  

	public function updateProjectComponents() {                                                           
		$dateModified = $this->dataManager->getDateTime();                                                     
		$projectId = $this->dataManager->getProjectId();                                                     
		$numberOfSubtitles = $this->dataManager->getNumberOfSubtitles();                                                  
		$query = "update educacodeprojects set subtitles = ?, dateModified = ? where projectId = ?";                                                           
		try {                                                           
			$numberOfSubtitles++;                                            

		    $stmt = $this->pdo->prepare($query);                                               

		    $stmt->execute(array($numberOfSubtitles, $dateModified, $projectId));                                                          
		}                                                                  
		catch (PDOException $error) {                                                  
			$message = $error->getMessage();                                      
			// display error page                    
		}                                                         
	}                                                       


	public function createRequirementsTable() {                                                              
		if ($this->dataManager->isCommitted() === "false"                       
			&& $this->dataManager->getErrorType() === "TABLE NOT FOUND") {                                                     
	       	$tableManager = new TableManager($this->dataManager);                                 
	       	$this->dataManager->setDataObject($this->pdo);                                  
	       	$tableManager->createRequirementTable();                                              
	       	return $this->commitProjectRequirement();                                                       
		}                                                            
		else {                                                   
			return $this;                                        
		}                                                   
	}                                                                   

	public function commitProjectRequirement() {                                          
		if ($this->dataManager->isAvailable() === "true") {                                                                
			$theDate = $this->dataManager->getDateTime();                                                 
			$requirementTableName = $this->dataManager->getRequirementTable();                                                  

            try {                                                                               
                $query = "insert into " . $requirementTableName . " (requirementId, title, content) values (?, ?, ?)";                                      

			    $stmt = $this->pdo->prepare($query);                                                            

			    $stmt->execute(array(0, $this->dataManager->getRequirementTitle(), $this->dataManager->getRequirementContent()));                                                                           
            }                                         
            catch (PDOException $error) {                                      
                $message = $error->getMessage();                              
                
                if (strpos($message, $requirementTableName) > -1 && strpos($message, "not found") > -1) {                                                             
                	$this->dataManager->setErrorType("TABLE NOT FOUND");                                           
                	$this->dataManager->setCommitted("false");                                  
                	return $this;                                           
                }                                                                     
            }                                                      

            $this->dataManager->setCommitted("true");                                                      

            return $this;                                                
		}                                                       
		else {                                                    
			// display error page                        
		}                                                    
	}                                                        

	public function createProjectTables() {                                      
		if ($this->dataManager->isCommitted() === "false"                       
			&& $this->dataManager->getErrorType() === "TABLE NOT FOUND") {                                                     
	       	$tableManager = new TableManager($this->dataManager);                                 
	       	$this->dataManager->setDataObject($this->pdo);                                  
	       	$tableManager->createProjectTable()->createRequirementTable();                                              
	       	return $this->commitProjectSubtitle();                                                       
		}                                                            
		else {                                                   
			return $this;                                        
		}                                                   
	}                                                                   

	public function commitProjectSubtitle() {                                          
		if ($this->dataManager->isAvailable() === "true") {                                                                
			$theDate = $this->dataManager->getDateTime();                                                 
			$subtitleTableName = $this->dataManager->getProjectTable();                                                  

            try {                                           
                $query = "insert into " . $subtitleTableName . " (projectArticlesId, subtitle, article, articleImage, dateWritten, dateModified) values (?, ?, ?, ?, ?, ?)";                                          

			    $stmt = $this->pdo->prepare($query);                                              

			    $stmt->execute(array(0, $this->dataManager->getProjectSubtitle(), $this->dataManager->getProjectArticle(), "", $theDate, $theDate));                                                           
            }                                         
            catch (PDOException $error) {                                      
                $message = $error->getMessage();                              
                
                if (strpos($message, $subtitleTableName) > -1 && strpos($message, "not found") > -1) {                                                             
                	$this->dataManager->setErrorType("TABLE NOT FOUND");                                           
                	$this->dataManager->setCommitted("false");                                  
                	return $this;                                           
                }                                                                     
            }                                                      

            $this->dataManager->setCommitted("true");                                                      

            return $this;                                                
		}                                                       
		else {                                                    
			// display error page                        
		}                                                    
	}                                                        

	public function getParentProjectProperties() {                                                     
		$projectTable = "";                                          
		$projectTitle = $this->dataManager->getProjectTitle();                                             

        $now = new DateTime();                                  

        $theDate = $now->format('Y-m-d H:i:s');                             

        $this->dataManager->setDateTime($theDate);                                           

		try {                                                             
	        $query = "select projectId, title, subtitles, projectTable, requirementTable from educacodeprojects where title = ?";                                               

	        $stmt = $this->pdo->prepare($query);                                               

	        $stmt->execute(array($projectTitle));                                              

	        while ($row = $stmt->fetch()) {                               
	        	$projectTable = $row["projectTable"];                                    
	            $this->dataManager->setProjectTitle($row["title"]);                                          
	            $this->dataManager->setProjectId($row["projectId"]);                                 
	            $this->dataManager->setNumberOfSubtitles($row["subtitles"]);                              
	            $this->dataManager->setRequirementTable($row["requirementTable"]);                                           
	            $this->dataManager->setProjectTable($projectTable);                                           
	        }                                           
		}                                           
		catch (PDOException $error) {                                                   
			$message = $error->getMessage();                                   
		}                                                         

		if ($projectTable !== "") {                                           
			$this->dataManager->setAvailable("true");                                  
		}                                                          
		else {                                                      
			$this->dataManager->setAvailable("false");                                  
		}                                                 

		return $this;                                       
	}                                                  
	
	public function getProjectRequirement() {                                                      
		$projectRequirementArray = array();                                                
		$requirementTable = $this->dataManager->getRequirementTable();                                        

		if ($requirementTable !== "") {                                          
			$query = "select * from " . $requirementTable;                                        

			try {                                                 
				$result = $this->pdo->query($query);                        

				while ($row = $result->fetch()) {                                           
					$tempArray = array();                                             
					$tempArray[] = $row["requirementId"];                                       
					$tempArray[] = $row["title"];                                       
					$tempArray[] = $row["content"];                                       
					$projectRequirementArray[] = $tempArray;                               
				}                                                                 
			}                                                             
			catch (PDOException $error) {                                             
				$message = $error->getMessage();                                        
			}                                                       
		}                                                           

		$this->dataManager->setProjectCompositeArray($projectRequirementArray);                                          

		return $this->dataManager->getProjectCompositeArray();                                       
	}                                                                        

	public function getProjectTitleArticles() {                                          
		$projectArticleArray = array();                                                
		$projectTable = $this->dataManager->getProjectTable();                                        
		
		if ($projectTable !== "") {                                          
			$query = "select * from " . $projectTable;                                        

			try {                                                 
				$result = $this->pdo->query($query);                        

				while ($row = $result->fetch()) {                                           
					$tempArray = array();                                             
					$tempArray[] = $row["subtitle"];                                       
					$tempArray[] = $row["article"];                                       
					$tempArray[] = $row["articleImage"];                                       
					$tempArray[] = $row["dateModified"];                                       
					$projectArticleArray[] = $tempArray;                               
				}                                                                 
			}                                                             
			catch (PDOException $error) {                                             
				$message = $error->getMessage();                                        
			}                                                       
		}                                                           

		$this->dataManager->setProjectCompositeArray($projectArticleArray);                                          

		return $this;                                       
	}                                                 

	public function getProjectComposite() {                                                  
		$projectCompositeArray = [];                                        
		$projectTitle = $this->dataManager->getProjectTitle();                                  
		$query = "select * from educacodeprojects where title = ?";                                       

		try {                                          
	        $stmt = $this->pdo->prepare($query);                            
	        $stmt->execute(array($projectTitle));                            

	        while ($row = $stmt->fetch()) {                                     
	            $this->dataManager->setProjectCompositeArray($row["title"]);                                   
	            $this->dataManager->setProjectCompositeArray($row["category"]);                                 
	            $this->dataManager->setProjectCompositeArray($row["objective"]);                                 
	            $this->dataManager->setProjectCompositeArray($row["developer"]);                                 
	            $this->dataManager->setProjectCompositeArray($row["languages"]);                                 
	            $this->dataManager->setProjectCompositeArray($row["library"]);                                 
	            $this->dataManager->setProjectCompositeArray($row["usedTools"]);                                 
	            $this->dataManager->setProjectCompositeArray($row["subtitles"]);                                 
	            $this->dataManager->setProjectTable($row["projectTable"]);                                 
	            $this->dataManager->setRequirementTable($row["requirementTable"]);                                 
	            $this->dataManager->setProjectCompositeArray($row["dateModified"]);                                 
	        }                             
		}                                          
		catch (PDOException $error) {                              
			$message = $error->getMessage();                           
		}                                           

		return $this;                                    
	}                                                    

	public function insertSearchProjectSubtitle() {                                    
		$exists = "";                                            
	    $category = "PROJECT";                                     
	    $subtitle = $this->dataManager->getProjectSubtitle();                                  
	    $query = "select searchWord from parentsearchtable where searchWord = ?";                   

	    try {                                            

	        $stmt = $this->pdo->prepare($query);              
	        $stmt->execute(array($subtitle));              

	        while ($row = $stmt->fetch()) {                               
	            $exists = $row["searchWord"];                 
	        }                             
	                 
	        if ($exists === "") {                        
	            try {                        
	                $query = "insert into parentsearchtable (searchWordId, searchWord, category) values (?, ?, ?)";                                

	                $stmt = $this->pdo->prepare($query);              

	                $stmt->execute(array(0, $subtitle, $category));                                  
				    $this->dataManager->setCommitted("true");                                  
	            }                                   
	            catch(PDOException $error){                 
	    			$this->dataManager->setCommitted("false");                                  
	                $message = $error->getMessage();                           
			        // display error page                                             
	            }                                                  
	        }                                        
	    }                                              
	    catch (PDOException $error) {                               
	    	$this->dataManager->setCommitted("false");                                  
	        $message = $error->getMessage();                              
	        // display error page                                     
	    }                                           

	    return $this;                                              
	}                                    

	public function insertSearchProjectTitleWord() {                                    
		if ($this->dataManager->isCommitted() === "true") {                                   
			$exists = "";                                            
		    $category = "PROJECT";                                     
		    $wordTitle = $this->dataManager->getProjectTitle();                                  
		    $query = "select searchWord from parentsearchtable where searchWord = ?";                   

		    try {                                            

		        $stmt = $this->pdo->prepare($query);              
		        $stmt->execute(array($wordTitle));              

		        while ($row = $stmt->fetch()) {                               
		            $exists = $row["searchWord"];                 
		        }                             
		                 
		        if ($exists === "") {                        
		            try {                        
		                $query = "insert into parentsearchtable (searchWordId, searchWord, category) values (?, ?, ?)";                                

		                $stmt = $this->pdo->prepare($query);              

		                $stmt->execute(array(0, $wordTitle, $category));                                  
		            }                                   
		            catch(PDOException $error){                 
		                $message = $error->getMessage();                           
		            }                                                  
		        }                                        
		    }                                              
		    catch (PDOException $error) {                               
		        $message = $error->getMessage();                  
		    }                                           
		}                                    
	}                                       

	public function registerProjectToMenuData() {                                          
    	$imageName = $this->dataManager->getImageName();                              
    	$imageTempName = $this->dataManager->getImageTempName();                             
    	$imageSize = $this->dataManager->getImageSize();                                       
		$projectTitle = $this->dataManager->getProjectTitle();                                      
		$stringTokensArray = $this->dataManager->getStringTokensArray();                            
		$stringTokensArraySize = count($stringTokensArray);                                         
		
		if ($stringTokensArraySize > 0) {                                                
		    $validExtensions = array('jpeg', 'jpg', 'png', 'gif'); // valid extensions
		    $imageExtension = strtolower(pathinfo($imageName, PATHINFO_EXTENSION)); // get image extension

		    $projectImage = mt_rand(10000, 99999) . time() . "." . $imageExtension;                                 

		    if (in_array($imageExtension, $validExtensions)) {           
		        if ($imageSize < 5000000) {                                   
		            move_uploaded_file($imageTempName, "../coder/image/" . $projectImage);                     
		        }                                               
		        else {                  
		            $errorMessage = "Sorry, your file is too large.";                                    
		        }                                        
		    }                           
		    else {                                       
		        $errorMessage = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";                         
		    }        
		      		  
			if (!isset($errorMessage)) {                                                        
				for ($i = 0; $i < $stringTokensArraySize; $i++) {                                              
					$testProjectTitle = "";                                      
					$testProjectLanguage = "";                                             
				    $query = "select projectTitle, language from projectmenudata where projectTitle = ? and language = ?";                                              

			   		try {                                            
				        $stmt = $this->pdo->prepare($query);                                    
				        $stmt->execute(array($projectTitle, $stringTokensArray[$i]));                                      

				        while ($row = $stmt->fetch()) {                               
				            $testProjectTitle = $row["projectTitle"];                            
				            $testProjectLanguage = $row["language"];                            
				        }                                                     

						if ($testProjectTitle == "" && $testProjectLanguage == "") {                                 
							$query = "insert into projectmenudata (menuDataId, projectTitle, language, projectImage) values (?, ?, ?, ?)";                                                       
							$stmt = $this->pdo->prepare($query);                                            
							$stmt->execute(array(0, $projectTitle, $stringTokensArray[$i], $projectImage));                                                 

							$this->dataManager->setCommitted("true");                                      
						}                                                     
				    }                                           
				    catch(PDOException $error) {                                 
				    	$message = $error->getMessage();                                              
				    	$this->dataManager->setCommitted("false");                                           
				    }                                                        
				}                                                                   
			}                                              
		}                                               

		return $this;                                        
	}                                                

	public function commitProjectToDatabase() {                                     
		$projectTitle = $this->dataManager->getProjectTitle();                              
		$projectCategory = $this->dataManager->getProjectCategory();                              
		$projectObjective = $this->dataManager->getProjectObjective();                              
		$projectDevelopers = $this->dataManager->getProjectDevelopers();                              
		$projectLanguages = $this->dataManager->getProjectLanguages();                              
		$projectLibrary = $this->dataManager->getProjectLibrary();                              
		$utilityToolsUsed = $this->dataManager->getUtilityToolsUsed();                              
		$projectTable = $this->dataManager->getProjectTable();                                                      
		$requirementTable = $this->dataManager->getRequirementTable();                                            

		if ($this->dataManager->getExistence() === "false") {                                    
			$theDate = $this->dataManager->getDateTime();                                                                        

            try {                                                                                    
                $query = "insert into educacodeprojects (projectId, title, category, objective, developer, languages, library, usedTools, subtitles, projectTable, requirementTable, dateStarted, dateModified) values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";                                                        

                $stmt = $this->pdo->prepare($query);                                                           

                $stmt->execute(array(0, $projectTitle, $projectCategory, $projectObjective, $projectDevelopers, $projectLanguages, $projectLibrary, $utilityToolsUsed, 0, $projectTable, $requirementTable, $theDate, $theDate));                                  

                $this->dataManager->setCommitted("true");                                      
            }                                   
            catch(PDOException $error) {                           
                $message = $error->getMessage();                      
                $this->dataManager->setCommitted("false");                             
            }                                       
		}                                                

		$this->dataManager->setStringToTokenize($projectLanguages);                                                 
		$this->dataManager->setDatabaseManager($this);                                            

		return $this->projectManager;                                             
	}                                           

	public function doesProjectExists() {                                      
		$testProjectTitle = "";                                         
		$projectTitle = $this->dataManager->getProjectTitle();                                  
	
		$now = new DateTime();                                  

	    $theDate = $now->format('Y-m-d H:i:s');                                                       

	    $this->dataManager->setDateTime($theDate);                                                                
	    $this->dataManager->setUnixTime(strtotime($theDate));                                                             

		if ($projectTitle !== "") {                                        
			try {                                    
		        $query = "select title from educacodeprojects where title = ?";                              

		        $stmt = $this->pdo->prepare($query);              

		        $stmt->execute(array($projectTitle));              

		        while ($row = $stmt->fetch()) {                
		            $testProjectTitle = $row["title"];                 
		        }                                        

		        if ($testProjectTitle === "") {                                    
					$this->dataManager->setExistence("false");           		        	
		        }                                           
		        else {                                         
		        	$this->dataManager->setExistence("true");                             
		        }                                 
			}	                                 
			catch (PDOException $error) {                                        
				$message = $error->getMessage();                              
			}                                    
		}                                                

		$this->dataManager->setDatabaseManager($this);                                                    

		return $this->projectManager;                                  
	}                                                
}                                             


