<?php                

require_once("../include/datastore.php");                 
require_once("../include/utility.php");                            

$productName = isset($_POST['productName']) ? Utility::makeInputSafe($_POST['productName']) : "";               
$productCategory = isset($_POST['productCategory']) ? Utility::makeInputSafe($_POST['productCategory']) : "";               
$newProductPrice = isset($_POST['newProductPrice']) ? Utility::makeInputSafe($_POST['newProductPrice']) : 0.00;                 
$oldProductPrice = isset($_POST['oldProductPrice']) ? Utility::makeInputSafe($_POST['oldProductPrice']) : 0.00;                 

if (isset($_POST['submit']) && isset($_FILES['productImage'])) {                        
    $imgFile = $_FILES['productImage']['name'];                    
    $tmp_dir = $_FILES['productImage']['tmp_name'];                     
    $imgSize = $_FILES['productImage']['size'];                     

    $productName = Utility::upperCaseFirstLetters($productName);                         
    $productCategory = Utility::upperCaseFirstLetters($productCategory);                      

    $upload_dir = 'image/'; // upload directory                      
 
    $imgExt = strtolower(pathinfo($imgFile, PATHINFO_EXTENSION)); // get image extension
  
    // valid image extensions
    $valid_extensions = array('jpeg', 'jpg', 'png', 'gif'); // valid extensions
  
    // rename uploading image
    $userpic = mt_rand(10000, 99999) . time() . "." . $imgExt;               
    
    // allow valid image file formats
    if (in_array($imgExt, $valid_extensions)) {           
        // Check file size '5MB'             
        if ($imgSize < 5000000) {              
            move_uploaded_file($tmp_dir, "../scrubskit/image/" . $userpic);                     
        }                         
        else {                  
            $errMSG = "Sorry, your file is too large.";                     
        }                                        
    }                           
    else {                                       
        $errMSG = "Sorry, only JPG, JPEG, PNG & GIF files are allowed.";                         
    }        
      
    // if no error occured, continue ....
    if (!isset($errMSG)) {                          
        $pdo = DataStore::getConnection();                 

	    try {
	        $query = "insert into store (productId, productName, productCategory, "                
                . "productImage, newProductPrice, oldProductPrice, amountSold, numberOfReviews, "                           
                . "productRating) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)";                                 
	        
	        $stmt = $pdo->prepare($query);                    

	        if ($stmt->execute(array(0, $productName, $productCategory, $userpic, $newProductPrice, $oldProductPrice, 0, 0, 0))) {                   

		        header('Location: http://' . $_SERVER['HTTP_HOST'] . "/scrubskit/uploadimage.php");                 

		        // header("refresh:5; upload_index.php"); // redirects image view page after 5 seconds.              
		    }
	        else {

	        }                     
		}                      
	    catch(PDOException $e) {                 
	        $error = $e->getMessage();                  
	        die($error);                 
	    }                    
    }                      
}                      


