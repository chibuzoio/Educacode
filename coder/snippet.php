<?php                     

    require_once("../coderback/store.php");                        
    require_once("../coderback/utility.php");                        

    Utility::startEducacodeSession();                                                                      

    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("Snippet");                         

    require_once("../coderback/includeheader.php");                                

?>          

<?php 

    require_once("../coderback/floatfooter.php");                                
?>                                     

    </div>                             

<?php                         

    require_once("../coderback/includefooter.php");                  


