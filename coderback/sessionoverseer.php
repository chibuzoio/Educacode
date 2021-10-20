<?php     

require_once("../include/utility.php");              

/**
* 
*/
class SessionOverseer {                              
	
	private $memberId;                             
  	private $dataStore;                                  

  	function __construct($dataStore, $memberId) {                                
     	$this->dataStore = $dataStore;               
     	$this->memberId = $memberId;           

	    // set handler to overide SESSION
    	@session_set_save_handler(                                  
	        array($this, "openSession"),                              
	        array($this, "closeSession"),                               
	        array($this, "readSession"),                                   
	        array($this, "writeSession"),                                  
	        array($this, "destroySession"),                            
	        array($this, "cleanSession")                                 
	    );                                    
    
	    // start the session
	    session_start();                
	}                       

	public function isSessionOpen() {                    
    	// if database connection exists
    	if ($this->dataStore) {         
        	return true;              
    	}             
    
    	return false;                 
	}                    

	public function closeSession() {            
	    // if database connection is closed      
    	$this->dataStore = null;                
    	@session_write_close();           
    }               

    public function isNewSession($sessionId) {
    	$memId = 0;                     
    	$query = "select memberId from usersession where sessionId = ?";             

    	$preparation = $this->dataStore->prepare($query);         

    	if ($preparation->execute([$sessionId])) {
    		while ($row = $preparation->fetch()) {
    			$memId = $row["memberId"];             
    		}
    	}

    	if ($memId != null && $memId != 0) {
    		return false;                
    	}               
    	else {
    		$this->deactivateOtherSessions();                     

    		return true;          
    	}
    }

    public function generateSessionId() {
    	$sessionId = "";              
    	$query = "select sessionId, expiration from usersession where memberId = ? "                                  
            . "and sessionStatus = 0 order by expiration desc limit 1";          

    	$preparation = $this->dataStore->prepare($query);              

    	if ($preparation->execute([$this->memberId])) {
    		while ($row = $preparation->fetch()) {
    			$sessionId = $row["sessionId"];             
    		}
    	}

    	if ($sessionId != "" && $sessionId != null) {
    		if ($this->getSessionStatus($sessionId)) {                
    			$sessionId = Utility::generateKey();               

    			$this->deactivateOtherSessions();                     

    			return $sessionId;                
    		}                  
    		else {
    			$sessionId = Utility::generateKey();               

				$query = "update usersession set sessionId = ? where memberId = ? and sessionStatus = 0";    			 

				$preparation = $this->dataStore->prepare($query);                 

				if ($preparation->execute([$sessionId, $this->memberId])) {
					return $sessionId;                  
				}
    		}
    	}
    	else {
			$sessionId = Utility::generateKey();               

			$this->deactivateOtherSessions();                     

			return $sessionId;                
    	}

    	return $sessionId;               
    }

    private function getLastSessionId() {                
    	$lastSessionId = "";               
    	$query = "select sessionId, expiration from usersession where memberId = ? order by expiration desc limit 1";            

    	$preparation = $this->dataStore->prepare($query);         

    	if ($preparation->execute([$this->memberId])) {
            // die("The value of sessionId \$preparation->execute([\$this->memberId]) is " . $preparation->execute([$this->memberId]));      
    		while ($row = $preparation->fetch()) {
    			$lastSessionId = $row["sessionId"];      
    		}
    	}

    	return $lastSessionId;         
    }

    private function getSessionStatus($sessionId) {
        $query = "select sessionStatus from usersession where sessionId = ?";           

        $preparation = $this->dataStore->prepare($query);

        if ($preparation->execute([$sessionId])) {
            while ($row = $preparation->fetch()) {
                return $row["sessionStatus"];          
            }
        }
        else {
            return null;
        }

        return null;       
    }

    private function getLastSessionStatus() {
    	$query = "select expiration, sessionStatus from usersession where memberId = ? order by expiration desc limit 1";           

    	$preparation = $this->dataStore->prepare($query);

    	if ($preparation->execute([$this->memberId])) {
    		while ($row = $preparation->fetch()) {
    			return $row["sessionStatus"];          
    		}
    	}
    	else {
    		return null;
    	}

    	return null;       
    }

    private function getActiveSessionsId() {
    	$query = "select sessionId from usersession where memberId = ? and sessionStatus = 0";             

    	$sessionIdArray = array();

    	$preparation = $this->dataStore->prepare($query);          

    	if ($preparation->execute([$this->memberId])) {
    		while ($row = $preparation->fetch()) {
    			$sessionIdArray[] = $row["sessionId"];          
    		}
    	}                      

       /* die(print_r($sessionIdArray));    */

    	return $sessionIdArray;                 
    }

    private function deactivateOtherSessions() {      
    	$sessionIdArray = $this->getActiveSessionsId();       

    	$query = "update usersession set sessionStatus = ? where sessionId = ?";           

    	$preparation = $this->dataStore->prepare($query);        

    	for ($i = 0; $i < count($sessionIdArray); $i++) {             
    		$preparation->execute([1, $sessionIdArray[$i]]);                 
    	}
    }

    public function readSession($sessionId) {                 
    	$gottenSession = "";                  
		$preparation = $this->dataStore->prepare("SELECT sessionData FROM usersession WHERE sessionId = ?");       

		if($preparation->execute(array($sessionId))) {            
			while ($row = $preparation->fetch()) {                          
				$gottenSession = session_decode($row["sessionData"]);                     
			}                             

			return $gottenSession;                     
		}                    
		else {
		    return "";                
		}                    

		/*               
		The data from this method is passed to the Global usersession array that can be accessed like this:                 
		
		echo "<pre>";
		print_r($_SESSION);
		echo "</pre>";           
		*/
	}                 

	public function writeSession($sessionData, $sessionStatus = null) {               		
  		$expiration = time();                       
  		$saveSession = session_encode();                  
        $sessionId = Utility::generateKey();                       
        $lastSessionId = $this->getLastSessionId();                   
  		$lastSessionStatus = $this->getLastSessionStatus();               

  		if ($lastSessionStatus === false && $sessionStatus === false) {                      
        	$preparation = $this->dataStore->prepare("update usersession set expiration = ?, sessionData = ? where sessionId = ?");               

	  		if ($preparation->execute(array($expiration, $saveSession, $lastSessionId))) {     
		        return true;                        
       		}                                
    	}                     
        elseif ($lastSessionStatus === true && $sessionStatus === false) {
            $this->deactivateOtherSessions();                   
            $preparation = $this->dataStore->prepare("insert into usersession (memberId, sessionId, "            
                . "expiration, sessionData, sessionStatus) values (?, ?, ?, ?, ?)");               

            if ($preparation->execute(array($this->memberId, $sessionId, $expiration, $saveSession, $sessionStatus))) {       
                return true;                   
            }                                
        }
        elseif ($lastSessionStatus === false && $sessionStatus === true) {
            $preparation = $this->dataStore->prepare("update usersession set expiration = ?, "                         
                . "sessionData = ?, sessionStatus = ? where sessionId = ?");               

            if ($preparation->execute(array($expiration, $saveSession, $sessionStatus, $lastSessionId))) {     
                return true;                        
            }                                
        }
        elseif ($lastSessionStatus === null && $sessionStatus === null) {
            $this->deactivateOtherSessions();                   
            $preparation = $this->dataStore->prepare("insert into usersession (memberId, sessionId, "            
                . "expiration, sessionData, sessionStatus) values (?, ?, ?, ?, ?)");               

            if ($preparation->execute(array($this->memberId, $sessionId, $expiration, $saveSession, 0))) {       
                return true;                   
            }                                
        }
        elseif ($lastSessionStatus === null || $sessionStatus === null) {
            if ($sessionStatus === null) {                   
                $this->deactivateOtherSessions();                   
                $preparation = $this->dataStore->prepare("insert into usersession (memberId, sessionId, "            
                    . "expiration, sessionData, sessionStatus) values (?, ?, ?, ?, ?)");               

                if ($preparation->execute(array($this->memberId, $sessionId, $expiration, $saveSession, 0))) {       
                    return true;                   
                }                                
            }
            else {
                $this->deactivateOtherSessions();                   
                $preparation = $this->dataStore->prepare("insert into usersession (memberId, sessionId, "            
                    . "expiration, sessionData, sessionStatus) values (?, ?, ?, ?, ?)");               

                if ($preparation->execute(array($this->memberId, $sessionId, $expiration, $saveSession, $sessionStatus))) {       
                    return true;                   
                }                                
            }
        }
    	else {
            $this->deactivateOtherSessions();               
    		$preparation = $this->dataStore->prepare("insert into usersession (memberId, sessionId, "            
        		. "expiration, sessionData, sessionStatus) values (?, ?, ?, ?, ?)");               

	        if ($preparation->execute(array($this->memberId, $sessionId, $expiration, $saveSession, $sessionStatus))) {       
    	        return true;                   
        	}                                
    	}

    	return false;               
	}                           

    public function destroySession($memberId) {           
  		$preparation = $this->dataStore->prepare("delete from usersession where sessionId = ?");       

  		if ($preparation->execute(array($memberId))) {            
  			return true;                   
       	}                     
    }                         

	public function cleanSession($maxLifetime) {            
  		$old = time() - $maxLifetime;                 

  		$preparation = $this->dataStore->prepare("delete from usersession where expiration < ?");           

  		if ($preparation->execute(array($old))) {                
  			return true;                   
       	}                     

	    return false;                 
	}                    
}                


/*
	public function isSessionOpen() {                    
	public function closeSession() {            
    public function isNewSession($sessionId) {
    public function getSessionId() {
    public function readSession($sessionId) {                 
	public function writeSession($sessionId, $sessionData) {               		
    public function destroySession($id) {           
	public function cleanSession($maxLifetime) {            
*/


