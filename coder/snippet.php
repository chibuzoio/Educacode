<?php                     

    require_once("../Educacode/coderback/store.php");                        
    require_once("../Educacode/coderback/utility.php");                        

    Utility::startEducacodeSession();                                                                      

    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("Snippet");                         

    require_once("../Educacode/coderback/includeheader.php");                                

?>          

<?php 

    require_once("../Educacode/coderback/floatfooter.php");                                
?>                                     

    </div>                             

<?php                         

    require_once("../Educacode/coderback/includefooter.php");                  


