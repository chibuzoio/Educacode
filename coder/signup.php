<?php                     

    require_once(realpath(dirname(__FILE__) . "/../coderback/store.php"));                        
    require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));                        

    Utility::startEducacodeSession();                                                                     

    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("Coder");                         

    require_once(realpath(dirname(__FILE__) . "/../coderback/includeheader.php"));                                

?>                                                                      

    <div id="scrollDiv" class="col-xs-12 theBody">                       
        <div id="signUpDiv" class="col-xs-6 signUpDiv">      
            <div class="col-xs-12">
                <div class="col-xs-12 padLoginDiv headerColor">
                    <span class="loginIcon icon fa-sign-in"></span>
                    <span class="loginTitle">Login</span>
                </div>
                <div class="loginComponents">                                                         
                    <form id="loginForm" action="../coderback/loginserver.php" method="post">                                                                
                        <input id="loginEmail" type="text" name="loginEmail" placeholder="Email" class="col-xs-5 loginEmail">
                        <input id="loginPassword" type="password" name="loginPassword" placeholder="Password" class="col-xs-5 loginPassword">
                        <input id="loginSubmit" type="submit" value="Login" class="loginSubmit">                                                    
                    </form>                                            
                </div>
                <div class="lostPassword"><a href="" class="lostPasswordAnchor">Forgot&nbsp;Password?</a></div>
            </div>
            <div class="demacation"></div>                                   
            <div class="col-xs-12 signUpMargin headerColor">
                <span class="signUpIconClass icon fa-edit"></span>
                <span class="signUpTitle">Sign Up</span>
            </div>
            <form id="signUpForm" action="../coderback/signupserver.php" method="post">
                <input id="firstName" type="text" name="firstName" class="firstInput textInput" placeholder="First Name"/>
                <div class="firstNameError hideComponent">Please Enter Your First Name</div>
                <input id="lastName" type="text" name="lastName" class="lastInput textInput" placeholder="Last Name"/>                  
                <div class="lastNameError hideComponent">Please Enter Your Last Name</div>
                <input type="radio" name="gender" id="maleGender" value="male" class="radioGender maleRadio"><label for="maleGender" class="">Male</label>                          
                <input type="radio" name="gender" id="femaleGender" value="female" class="radioGender femaleRadio"><label for="femaleGender" class="">Female</label>                      
                <div class="genderRequired hideComponent">Gender Required!</div>
                <input type="text" id="emailAddress" name="email" class="emailInput textInput" placeholder="E-mail"/>                        
                <div id="checkEmailAddress" class="emailInputError hideComponent">The E-mail Address You Entered Is Wrong</div>
                <div id="emailAlreadyUsed" class="emailInputError hideComponent">This E-mail Address Is Already In Use</div>
                <div id="emailFieldEmpty" class="emailInputError hideComponent">E-mail Address Field Cannot Be Empty</div>
                <input type="text" id="memberCountry" placeholder="Country" class="memberCountry textInput" name="memberCountry">                     
                <div class="memberCountryError hideComponent">Name Of Your Country Is Required!</div>
                <input type="text" id="memberState" placeholder="State/Province" class="memberState textInput" name="memberState">                       
                <div class="memberStateError hideComponent">Name Of Your State Is Required!</div>
                <input type="password" id="password" name="password" class="password textInput" placeholder="Password"/>
                <input type="password" id="passwordConfirm" name="passwordConfirm" class="confirmPassword textInput" placeholder="Confirm Password"/>
                <div class="passwordMismatchError hideComponent">Your First And Second Password Must Be Same</div>
                <div class="shortPasswordError hideComponent">Your Password Is Too Short</div>
                <div class="passwordRequiredError hideComponent">Sorry! You Need Password</div>
                <div class="passwordSpaceError hideComponent">Password Cannot Contain Space</div>                      
                <div class="passwordRepeatError hideComponent">Write Your Password Again!</div>                      
                <input type="submit" id="submit" name="submit" value="Sign Up" class="signUpButton hideComponent"/>
            </form>
        <div id="inactiveSubmit" class="inactiveSubmit">Sign Up</div>
    </div> 

    <div class="signUpDivRight backColor">
        Frame Will Be Here!                 
    </div>                    

<?php 

    require_once(realpath(dirname(__FILE__) . "/../coderback/floatfooter.php"));                                
?>                                     

    </div>                             

<?php                         

    require_once(realpath(dirname(__FILE__) . "/../coderback/includefooter.php"));                  


