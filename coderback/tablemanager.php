<?php        

class TableManager {                                          

	private $dataManager;                                                       

	function __construct($dataManager) {                                              
		$this->dataManager = $dataManager;                                                    
	}                                                         

	public function createClapTable() {                                             
		$pdo = $this->dataManager->getDataObject();                                     
		$tableName = $this->dataManager->getClapTable();                                   

		$query = 'create table if not exists ' . $tableName . ' ('                 
			. 'clapId bigint(15) unsigned not null auto_increment, '
			. 'memberId bigint(20) unsigned not null, '
			. 'primary key(clapId) '                     
			. ') engine = InnoDB default charset = utf8';                      

		try {			                                     
			$pdo->query($query);                                       
		}                                                               
        catch (PDOException $error) {                                      
            $message = $error->getMessage();                                  
            // die($message); // display error page                                       
        }                                                                   
	}                                                                 

	public function createReplyTable() {                                                       
		$pdo = $this->dataManager->getDataObject();                                     
		$tableName = $this->dataManager->getReplyTable();                                   

		$query = 'create table if not exists ' . $tableName . ' ('                 
			. 'replyId int(7) unsigned not null auto_increment, '
			. 'memberId bigint(20) unsigned not null, '
			. 'replyContent text, '                              
			. 'numberOfClaps int(7), '                       
			. 'replyDate varchar(23) not null, '                    
			. 'clapTableName varchar(33), '                        
			. 'primary key(replyId) '                     
			. ') engine = InnoDB default charset = utf8';                      

		try {			                                     
			$pdo->query($query);                                       
		}                                                               
        catch (PDOException $error) {                                      
            $message = $error->getMessage();                                  
            // die($message); // display error page                                       
        }                                                                   
	}                                                        

	public function createAnswerTable() {                                                       
		$pdo = $this->dataManager->getDataObject();                                     
		$tableName = $this->dataManager->getAnswerTable();                                   

		$query = 'create table if not exists ' . $tableName . ' ('                
			. 'answerId int(7) unsigned not null auto_increment, '
			. 'memberId bigint(20) unsigned not null, '
			. 'answerContent text, '                              
			. 'numberOfReplies int(7), '                        
			. 'numberOfClaps int(7), '                       
			. 'answerDate varchar(23) not null, '                    
			. 'replyTableName varchar(33), '                        
			. 'clapTableName varchar(33), '                        
			. 'primary key(answerId) '                     
			. ') engine = InnoDB default charset = utf8';                      

/*
"     foreign key(questionId) references " +       
"     questionstore(questionId) on update cascade on delete cascade\n" +      */

		try {			                                     
			$pdo->query($query);                                       
		}                                                               
        catch (PDOException $error) {                                      
            $message = $error->getMessage();                                  
            // die($message); // display error page                                       
        }                                                                   
	}                                                        

	public function createRequirementTable() {                                                       
		$pdo = $this->dataManager->getDataObject();                                     
		$tableName = $this->dataManager->getRequirementTable();                                   

		$query = 'create table if not exists ' . $tableName . ' ('    
			. 'requirementId int(7) unsigned not null auto_increment, '
			. 'title varchar(111) not null, '
			. 'content varchar(777) not null, '         
			. 'primary key(requirementId), '                     
			. 'key(title) '                                                                    
			. ') engine = InnoDB default charset = utf8';                      

		try {			                                     
			$pdo->query($query);                                       
		}                                                               
        catch (PDOException $error) {                                      
            $message = $error->getMessage();                                  
            // die($message); // display error page                                       
        }                                                                   
	}                                                        

	public function createProjectTable() {                                                       
		$pdo = $this->dataManager->getDataObject();                                                  
		$tableName = $this->dataManager->getProjectTable();                                               

		$query = 'create table if not exists ' . $tableName . ' ('                        
			. 'projectArticlesId int(7) unsigned not null auto_increment, '                         
			. 'subtitle varchar(333) not null, '                               
			. 'article text, '                                     
			. 'articleImage varchar(111), '                           
			. 'dateWritten varchar(23) not null, '                    
			. 'dateModified varchar(23) not null, '                    
			. 'primary key(projectArticlesId) '                     
			. ') engine = InnoDB default charset = utf8';                      

		try {			                                     
			$pdo->query($query);                                       
		}                                                               
        catch (PDOException $error) {                                                            
            $message = $error->getMessage();                                                  
            // die($message); // display error page                                       
        }                                                                   

        return $this;                                                    
	}                                                        
}                                                    


