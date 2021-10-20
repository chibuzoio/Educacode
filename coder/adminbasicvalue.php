<?php                     

    require_once("../Educacode/coderback/store.php");                        
    require_once("../Educacode/coderback/utility.php");                        

    Utility::startEducacodeSession();                                                               

    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("Admin Basic Value");                         

    require_once("../Educacode/coderback/includeheader.php");                                

?>                          

    <div id="scrollDiv" class="col-xs-12 theBody">                       
        <div class="adminBasicValue">
            <div class="businessControlCost">
                <div class="headerColor businessControlCostHeader">Business Control Cost</div>                          
                <form action="../Educacode/coderback/businesscontrolcserver.php" method="post">                      
                    <input type="number" name="businessControlCost" placeholder="businessControlCost" class="padLeftOnly baseInput">
                    <input type="number" name="businessSearchEOCost" placeholder="businessSearchEOCost" class="padLeftOnly baseInput">
                    <input type="number" name="businessProductDCost" placeholder="businessProductDCost" class="padLeftOnly extremeRightInput">
                    <input type="number" name="businessEmailCCost" placeholder="businessEmailCCost" class="padLeftOnly baseInput">
                    <input type="number" name="businessCustomersFCost" placeholder="businessCustomersFCost" class="padLeftOnly baseInput">
                    <input type="number" name="businessFinancialTCost" placeholder="businessFinancialTCost" class="padLeftOnly extremeRightInput">
                    <input type="number" name="businessEmployeeMCost" placeholder="businessEmployeeMCost" class="padLeftOnly baseInput">
                    <input type="number" name="businessRealTSCost" placeholder="businessRealTSCost" class="padLeftOnly baseInput">
                    <input type="number" name="businessProjectMCost" placeholder="businessProjectMCost" class="padLeftOnly extremeRightInput">               
                    <input type="submit" name="businessControlCostSubmit" class="businessControlCostSubmit" value="Submit Business Control Costs">
                </form>
            </div>                            
            <div class="commerceControlCost">
                <div class="headerColor businessControlCostHeader">Commerce Control Cost</div>                          
                <form action="../Educacode/coderback/commercecontrolcserver.php" method="post">                      
                    <input type="number" name="commerceControlCost" placeholder="commerceControlCost" class="padLeftOnly baseInput">
                    <input type="number" name="commerceSearchEOCost" placeholder="commerceSearchEOCost" class="padLeftOnly baseInput">
                    <input type="number" name="commerceProductDCost" placeholder="commerceProductDCost" class="padLeftOnly extremeRightInput">
                    <input type="number" name="commerceEmailCCost" placeholder="commerceEmailCCost" class="padLeftOnly baseInput">
                    <input type="number" name="commerceCustomersFCost" placeholder="commerceCustomersFCost" class="padLeftOnly baseInput">
                    <input type="number" name="commerceFinancialTCost" placeholder="commerceFinancialTCost" class="padLeftOnly extremeRightInput">
                    <input type="number" name="commerceEmployeeMCost" placeholder="commerceEmployeeMCost" class="padLeftOnly baseInput">
                    <input type="number" name="commerceRealTSCost" placeholder="commerceRealTSCost" class="padLeftOnly baseInput">
                    <input type="number" name="commerceProjectMCost" placeholder="commerceProjectMCost" class="padLeftOnly extremeRightInput">               
                    <input type="submit" name="commerceControlCostSubmit" class="businessControlCostSubmit" value="Submit Commerce Control Costs">
                </form>
            </div>                            
            <div class="commerceControlCost">
                <div class="headerColor businessControlCostHeader">Office Control Cost</div>                          
                <form action="../Educacode/coderback/officecontrolcserver.php" method="post">                      
                    <input type="number" name="officeControlCost" placeholder="officeControlCost" class="padLeftOnly baseInput">
                    <input type="number" name="officeSearchEOCost" placeholder="officeSearchEOCost" class="padLeftOnly baseInput">
                    <input type="number" name="officeServicesDCost" placeholder="officeServicesDCost" class="padLeftOnly extremeRightInput">
                    <input type="number" name="officeEmailCCost" placeholder="officeEmailCCost" class="padLeftOnly baseInput">
                    <input type="number" name="officeFinancialTCost" placeholder="officeFinancialTCost" class="padLeftOnly baseInput">
                    <input type="number" name="officeEmployeeMCost" placeholder="officeEmployeeMCost" class="padLeftOnly extremeRightInput">
                    <input type="number" name="officeRealTSCost" placeholder="officeRealTSCost" class="padLeftOnly baseInput">
                    <input type="number" name="officeProjectMCost" placeholder="officeProjectMCost" class="padLeftOnly baseInput">               
                    <input type="submit" name="officeControlCostSubmit" class="businessControlCostSubmit" value="Submit Office Control Costs">
                </form>
            </div>                            
             <div class="commerceControlCost">
                <div class="headerColor businessControlCostHeader">Office Control Cost</div>                          
                <form action="../Educacode/coderback/schoolcontrolcserver.php" method="post">                      
                    <input type="number" name="schoolControlCost" placeholder="schoolControlCost" class="padLeftOnly baseInput">
                    <input type="number" name="schoolSearchEOCost" placeholder="schoolSearchEOCost" class="padLeftOnly baseInput">
                    <input type="number" name="schoolDescriptiveUICost" placeholder="schoolDescriptiveUICost" class="padLeftOnly extremeRightInput">
                    <input type="number" name="schoolEmailCCost" placeholder="schoolEmailCCost" class="padLeftOnly baseInput">
                    <input type="number" name="schoolStudentsTMCost" placeholder="schoolStudentsTMCost" class="padLeftOnly baseInput">
                    <input type="number" name="schoolFinancialTCost" placeholder="schoolFinancialTCost" class="padLeftOnly extremeRightInput">
                    <input type="number" name="schoolComputerBECost" placeholder="schoolComputerBECost" class="padLeftOnly baseInput">
                    <input type="number" name="schoolResultCCost" placeholder="schoolResultCCost" class="padLeftOnly baseInput">
                    <input type="number" name="schoolRealTSCost" placeholder="schoolRealTSCost" class="padLeftOnly extremeRightInput">               
                    <input type="number" name="schoolProjectMCost" placeholder="schoolProjectMCost" class="padLeftOnly baseInput">             
                    <input type="submit" name="officeControlCostSubmit" class="businessControlCostSubmit" value="Submit Office Control Costs">
                </form>
            </div>                            
        </div>
<?php 

    require_once("../Educacode/coderback/floatfooter.php");                                
?>                                     

    </div>                             

<?php                         

    require_once("../Educacode/coderback/includefooter.php");                  


