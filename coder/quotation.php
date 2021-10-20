<?php                     

    require_once("../coderback/store.php");                        
    require_once("../coderback/utility.php");                        

    Utility::startEducacodeSession();                                                            

    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("Request Quotation");                         

    require_once("../coderback/includeheader.php");                                

?>                          
            
    <div id="scrollDiv" class="col-xs-12 theBody">                       
        <div class="quotationFormDiv baseColor">                      

            <div id="coverLevelTracker" class="coverLevelTracker hideComponent">              
                <div class="lineTrackerDiv">                
                    <div class="firstLineTracker"></div>                     
                    <div id="secondLineTracker" class="secondLineTracker-off"></div>             
                    <div id="thirdLineTracker" class="thirdLineTracker-off"></div>             
                    <div id="fourthLineTracker" class="fourthLineTracker-off"></div>             
                    <div id="firstCircle" class="firstCircle"></div>
                    <div id="secondCircle" class="secondCircle-off"></div>
                    <div id="thirdCircle" class="thirdCircle-first-off"></div>
                    <div id="fourthCircle" class="fourthCircle-first-off"></div>
                </div>
                <div class="firstTitle">
                    <div>Project</div><div class="closeTopMargin">Choice</div>
                </div>
                <div id="secondTitle" class="secondTitle-off">
                    <div>Project</div><div class="closeTopMargin">Form</div>
                </div>
                <div id="thirdTitle" class="thirdTitle-off">
                    <div>Company</div><div class="closeTopMargin">Information</div>
                </div>               
                <div id="fourthTitle" class="fourthTitle-off">
                    <div>Personal</div><div class="closeTopMargin">Information</div>
                </div>               
            </div>

            <div class="baseColor quotationHelp">
                You Can Call This Number For Help: <a href="callto:+2347057179401" class="helpLine">+2347057179401</a>
            </div>                           
            <div id="quotationForm" class="quotationForm">                        
                <div class="headerColor categoryHeader">Project Category</div>
                <input type="checkbox" name="projectCategory" id="webAppChoice" value="Web Application" class="allCheckbox">                       
                <label for="webAppChoice" class="shiftCheckbox">Web&nbsp;Application</label>                  
                <input type="checkbox" name="projectCategory" id="mobileAppChoice" value="Mobile Application" class="allCheckbox">                       
                <label for="mobileAppChoice" class="shiftCheckbox">Mobile&nbsp;Application</label>                  
                <input type="checkbox" name="projectCategory" id="desktopAppChoice" value="Desktop Application" class="allCheckbox">                  
                <label for="desktopAppChoice" class="">Desktop&nbsp;Application</label>                  
                <div id="projectType" class="hideComponent">                                  
                    <div class="headerColor typeHeader">Project Type</div>                  
                    <select id="selectProjectType" class="selectProjectType baseColor" name="sex">                          
                        <option id="nothingSelected" value="">Select The Type Of Project For Your Chosen Category</option>
                        <option  id="businessOption" value="business">Business Management Application</option>                
                        <option id="churchOption" value="church">Church Management Application</option>
                        <option id="companyOption" value="company">Company Management Application</option>
                        <option id="ecommerceOption" value="ecommerce">Electronic Commerce (E-Commerce) Application</option>
                        <option id="schoolOption" value="school">School Management Application</option>
                        <option id="notInListOption" value="not available">Not In This List</option>
                    </select>                 
                    <input type="text" name="" id="typeProjectText" class="typeProject hideComponent" placeholder="Type The Type Of Project Here If It's Not In The List">                               
                </div>
                    
                <?php                           

                    require_once("../Educacode/coderback/businessquoteform.php");                    
                    require_once("../Educacode/coderback/churchquoteform.php");                
                    require_once("../Educacode/coderback/companyquoteform.php");                
                    require_once("../Educacode/coderback/ecommercequoteform.php");                
                    require_once("../Educacode/coderback/schoolquoteform.php");                

                ?>                           

            <div id="personalInfoDiv" class="hideComponent">                
                <div class="demacateForm"></div>                   
                <div class="personalInfoHeader headerColor">Your Personal Information</div>
                <input id="clientFirstName" type="text" name="clientFirstName" class="firstNameInputForQuote" placeholder="First Name"/>
                <input id="clientLastName" type="text" name="clientLastName" class="lastNameInputForQuote" placeholder="Last Name"/>                  
                <div id="clientFirstNameError" class="clientFirstNameError hideComponent">Please Enter Your First Name</div>        
                <div id="clientLastNameError" class="clientLastNameError hideComponent">Please Enter Your Last Name</div>              
                <div class="quoteGenderDiv">                               
                    <input type="radio" name="clientGender" id="clientMaleGender" class="quoteRadio"><label for="clientMaleGender" class="maleQuoteGenderLabel">Male</label>                          
                    <input type="radio" name="clientGender" id="clientFemaleGender" class="quoteRadio"><label for="clientFemaleGender" class="femaleQuoteGenderLabel">Female</label>                      
                </div>                          
                <div id="clientEmailAddressDiv" class="quoteEmailDiv">
                    <input type="text" id="clientEmailAddress" name="email" class="emailInputForQuote textInput" placeholder="E-mail"/> 
                </div>                         
                <div id="clientGenderError" class="clientGenderError hideComponent">Gender Required!</div>                          
                <div id="clientEmailAddressError" class="clientEmailAddressError hideComponent">The E-mail Address You Entered Is Wrong</div>
                <div id="clientEmailAlreadyUsed" class="clientEmailAddressError hideComponent">E-mail Address Is Already In Use</div>
                <div id="clientEmailFieldEmpty" class="clientEmailAddressError hideComponent">E-mail Address Field Cannot Be Empty</div>                     
                <input type="text" id="clientCountry" placeholder="Country" class="countryForQuote textInput" name="clientCountry">                     
                <input type="text" id="clientState" placeholder="State/Province" class="stateForQuote textInput" name="clientState">                       
                <div id="clientCountryError" class="clientFirstNameError hideComponent">Country Name Is Required!</div>        
                <div id="clientStateError" class="clientLastNameError hideComponent">State/Province Name Is Required!</div>           
                <div class="">                                        
                    <input type="checkbox" id="registerGuestClient" class="placeCheckboxMargin allCheckbox" name="registerGuestClient"><label for="registerGuestClient" class="shiftCreateAccount">Create&nbsp;Account&nbsp;With&nbsp;This&nbsp;Information</label>                          
                </div>                         
                <div id="clientPasswordDivision" class="passwordDivForQuoteMargin form-group hideComponent">
                    <input type="password" id="clientPassword" name="clientPassword" class="passwordForQuote textInput" placeholder="Password"/>                         
                    <input type="password" id="clientConfirmPassword" name="clientConfirmPassword" class="passwordForQuoteConfirm textInput" placeholder="Confirm Password"/>
                    <div id="clientShortPasswordError" class="clientFirstNameError hideComponent">Your Password Is Too Short</div>                     
                    <div id="clientPasswordSpaceError" class="clientFirstNameError hideComponent">Password Cannot Contain Space</div>                      
                    <div id="clientRequirePaswordError" class="clientFirstNameError hideComponent">Sorry! You Need Password</div>                        
                    <div id="clientDifferentPasswordError" class="clientDifferentPasswordError hideComponent">Your First And Second Passwords Must Be Same</div>
                </div>                
            </div>                   

            <div id="submitQuotationFailed" class="submitRequestFailed centerAlignText headerColor hideComponent">Get Quotation</div>           

            <input type="submit" id="submitQuotation" name="submitQuotation" value="Get Quotation" class="submitRequest hideComponent">

                <!-- ECOMMERCE MANAGEMENT APPLICATION FORM -->

                <!-- church MANAGEMENT APPLICATION FORM -->

                <!-- SCHOOL MANAGEMENT APPLICATION FORM -->
                












            </div>                
        </div>                     

        <div class="quotationCalculator headerColor">
            <div class="calculatorHeader">Project Budget Calculator</div>      
            <div class="demacateCalculatorHeader"></div>                 
            <div class="budgetSolutionDiv baseColor">
                <div class="searchEOAmountDiv">
                    <div id="searchEOTitle" class="col-xs-6 amountTitle hideComponent">SEO</div>
                    <div id="searchEOAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="businessPDTitle" class="col-xs-6 amountTitle hideComponent">B/PD</div>
                    <div id="businessPDAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="servicesDTitle" class="col-xs-6 amountTitle hideComponent">SD</div>
                    <div id="servicesDAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="descriptiveUITitle" class="col-xs-6 amountTitle hideComponent">DUI</div>
                    <div id="descriptiveUIAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="emailCTitle" class="col-xs-6 amountTitle hideComponent">EC</div>
                    <div id="emailCAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="quotationPTitle" class="col-xs-6 amountTitle hideComponent">QP</div>
                    <div id="quotationPAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="customersFTitle" class="col-xs-6 amountTitle hideComponent">CF</div>
                    <div id="customersFAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="employeeMTitle" class="col-xs-6 amountTitle hideComponent">EM</div>
                    <div id="employeeMAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="studentsTMTitle" class="col-xs-6 amountTitle hideComponent">S/TM</div>
                    <div id="studentsTMAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="financialTTitle" class="col-xs-6 amountTitle hideComponent">FT</div>
                    <div id="financialTAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="officialsMTitle" class="col-xs-6 amountTitle hideComponent">OM</div>
                    <div id="officialsMAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="computerBETitle" class="col-xs-6 amountTitle hideComponent">CBE</div>
                    <div id="computerBEAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="resultCTitle" class="col-xs-6 amountTitle hideComponent">RC</div>
                    <div id="resultCAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="realTSTitle" class="col-xs-6 amountTitle hideComponent">RTS</div>
                    <div id="realTSAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="projectMTitle" class="col-xs-6 amountTitle hideComponent">PM</div>
                    <div id="projectMAmount" class="col-xs-6 amountValue hideComponent">US$</div>
                    <div id="totalDemacator" class="totalDemacator col-xs-12 hideComponent"></div>                
                    <div id="totalTitle" class="col-xs-4 totalTitle hideComponent">Total</div>
                    <div id="totalAmount" class="col-xs-8 totalValue hideComponent">US$</div>
                </div>
            </div>
        </div>

<?php 

    require_once("../Educacode/coderback/floatfooter.php");                                
?>                                     

    </div>                             

<?php                         

    require_once("../Educacode/coderback/includefooter.php");                  


