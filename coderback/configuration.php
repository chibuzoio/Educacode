<?php                          

/**
 * Database login details
 */  
define("HOST", "localhost");     // The host you want to connect to.
define("USER", "root");    // The database username. 
define("PASSWORD", "");    // The database password. 
define("DATABASE", "educacode");    // The database name.
define("CHARSET", "utf8");         
define("DEFAULT_ROLE", "member");            
define("DSN", "mysql:host=localhost;dbname=educacode;charset=utf8");         
define("DSNIE", "mysql:host=localhost;charset=utf8");         
define("CAN_REGISTER", "any");             
define("SECURE", FALSE);    // FOR DEVELOPMENT ONLY!!!!                                
define ("SITE_ROOT", realpath(dirname(__FILE__)));                               
                              
$options = [                                        
    PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
    PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
    PDO::ATTR_EMULATE_PREPARES   => false                     
];                                    
                              
define("OPTIONS", $options);                             
                                  
                    
         