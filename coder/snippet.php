<?php                     

    require_once(realpath(dirname(__FILE__) . "/../coderback/store.php"));                        
    require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));                        

    Utility::startEducacodeSession();                                                                      

    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("Snippet");                         

    require_once(realpath(dirname(__FILE__) . "/../coderback/includeheader.php"));                                

?>          

<?php 

    require_once(realpath(dirname(__FILE__) . "/../coderback/floatfooter.php"));                                
?>                                     

    </div>                             

<?php                         

    require_once(realpath(dirname(__FILE__) . "/../coderback/includefooter.php"));                  


