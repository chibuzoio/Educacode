<?php                                                   

    require_once(realpath(dirname(__FILE__) . "/../coderback/store.php"));                        
    require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));                                 

    Utility::startEducacodeSession();                                                
   	Utility::isAuthenticated();                                                         

    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("Welcome");                         

    require_once(realpath(dirname(__FILE__) . "/../coderback/includeheader.php"));                                

?>                                                                     

    <div id="scrollDiv" class="col-xs-12 theBody">                       
	    <div class="welcome col-xs-12 whiteBody">
		    <div class="welcomeWindow">                                                      
		    	<div class="welcomeNote semiBlurColor">Welcome To EDUCACODE, Smith Chibuzo! Thanks For Joining Us!</div>                            
		    	<div class="skipMessage semiBlurColor">You Can Choose To Complete This Step Or Skip It. Your Username Is Optional, But Eases Your Authentication As A Super User In The Console.</div>
		    	<div class="addMoreInfo semiBlurColor">Add A Profile Picture</div>
		    	<div id="welcomeProfilePicture" class="profilePictureDivision"></div>                                                    
		    	<div class="chooseProfilePicture">
					<input class="input-group" type="file" id="chooseProfilePicture" accept="image/*"/>                                  	    		            
		    	</div>                     
		    	<div class="addYourUsername">
		    		<div class="addUsername semiBlurColor">Add User Name</div>
		    		<input id="memberUserNameInput" class="usernameInput" type="text" name="username">                                                                
		    		<div id="usernameError" class="usernameError hideComponent">Sorry! User Name Already In Use</div>
		    	</div>                                 
		    	<div id="continueSkipButton" class="skipButton">Skip&nbsp;<span class="icon fa-caret-right"></span></div>
		    	<div id="continueNextButton" class="skipButton hideComponent">Next&nbsp;<span class="icon fa-caret-right"></span></div>
		    </div>
	    </div>

<?php 

    require_once(realpath(dirname(__FILE__) . "/../coderback/floatfooter.php"));                                
?>                                     

    </div>                             

<?php                         

    require_once(realpath(dirname(__FILE__) . "/../coderback/includefooter.php"));                  


