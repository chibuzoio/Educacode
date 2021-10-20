
(function($) {
	var password = "";                       
	var emailExists = true;                         
	var userNameExists = true;                                         
	var genderChecked = false;                             
	var continueRegistration = {};                                             
	var inputConfirmationArray = [];                          
	continueRegistration.image = {};                                                        
	var profileImageSelected = false;                              
	var doesPasswordHaveSpace = false;                                        
	continueRegistration.userName = "";                                                    
	var twoDimensionalArraySubarray = [];                                             
	var isShortPasswordErrorVisible = false;                                                
	var isPasswordRequiredErrorVisible = false;                                          
	var getJSONMembers = $.getJSON('../coderback/jsonregister.php');                                          
	var inputControlArray = ["firstName", "lastName", "gender", "email",                                            
		"country", "state", "password", "passwordConfirm"];                                                         

	$.getJSON("../coderback/jsonauthenticateduser.php").done(function(theResponse) {                                               
		if (theResponse[0] === "true") {                                                        
			if (theResponse[10] !== "") {                                              
				$("#welcomeProfilePicture").html("<img class=\"welcomeProfilePicture\" src=\"image/" + theResponse[10] + "\">");                                                         
			}                                                              
			else {                                                      
				$("#welcomeProfilePicture").html("<img class=\"welcomeProfilePicture\" src=\"image/profile.png\">");                                                         
			}                                                               
		}                                                     
	});                                                                     

	$(document).ready(function() {                                       
		if (isBrowserStorageAvailable()) {                                              
			var userName = sessionStorage.getItem("userName");                              

			if (userName !== "") {                                            
				continueRegistration.userName = userName;                                                
				$("#continueSkipButton").hide();                                                      
				$("#continueNextButton").show();                                      					
			}                                                      

			$("#memberUserNameInput").val(userName);                                                       
		}                                               
	});                                                       
	
	$("#continueNextButton").click(function() {                                       
		$.post("../coderback/commitusernameserver.php", continueRegistration).done(function(theResponse) {                            
			$("#memberUserNameInput").val("");                                          
			continueRegistration.userName = "";                                                     

			if (isBrowserStorageAvailable()) {                                               
				sessionStorage.removeItem("userName");                                                   
			}                                                               

			location.href = "/coder/community.php";                                       
		});                                              
	});                                   

	$("#memberUserNameInput").blur(function() {                                          
		if (userNameExists === false) {                                                  
			continueRegistration.userName = $.trim($("#memberUserNameInput").val());                                          
			changeContinueButton();                                                    
		}                                                      
	})                                                                       

	$("#memberUserNameInput").keyup(function() {                                           
		if (inJSONTwoDimensionalArray(getJSONMembers, $("#memberUserNameInput").val())) {                                               
			$("#memberUserNameInput").addClass("error");                                                     
			$("#usernameError").slideDown(353);                                               
			userNameExists = true;                                                 
			changeContinueButton();                                          
		}                                                                         
		else {                                                                
			$("#memberUserNameInput").removeClass("error");                                          
			$("#usernameError").slideUp(353);                                               
			userNameExists = false;                                           
			changeContinueButton();                                           
		}                                                               
	});                                                    

	$("#chooseProfilePicture").blur(function() {                                        
		if (0 in $("#chooseProfilePicture").prop("files")) {                                           
			// Save persistent data in PHP session                                         

			if (isBrowserStorageAvailable()) {                                           
				sessionStorage.setItem("userName", $.trim($("#memberUserNameInput").val()));                                                        
			}                                                                           
			
			continueRegistration.image = $("#chooseProfilePicture").prop("files")[0];                                       

			var theFormData = new FormData();                                    
			theFormData.append("image", continueRegistration.image);                            
			theFormData.append("userName", continueRegistration.userName);                                  

			$.ajax({                                       
				type : "POST",                                           
				url : "../coderback/profilepictureserver.php",                                    
				data : theFormData,                                          
				processData : false,                                    
				contentType : false                                              
			}).done(function(theResponse) {                                             
				$("#chooseProfilePicture").val("");                                     
				continueRegistration.image = {};                             
				profileImageSelected = true;                                              
				changeContinueButton();                                      
				// console.log(theResponse);                                      
				location.reload(true);                                                    
			});                                              
		}                                              
		else {                                                
			continueRegistration.image = {};                                                 
			profileImageSelected = false;                                                   
			changeContinueButton();                                                
		}                                     
	});             

	$("#inactiveSubmit").click(function() {                               
		if (!inArray(inputConfirmationArray, "firstName")) {                         
			$("#firstName").addClass("error");                  
			$(".firstNameError").slideDown(353);                
		}                                  

		if (!inArray(inputConfirmationArray, "lastName")) {                         
			$("#lastName").addClass("error");                  
			$(".lastNameError").slideDown(353);                
		}                                  

		if (!inArray(inputConfirmationArray, "gender")) {                         
			$(".genderRequired").slideDown(353);                    			
		}                                  

		if (!inArray(inputConfirmationArray, "email")) {                         
			$("#checkEmailAddress").slideUp(353);                 
			$("#emailAlreadyUsed").slideUp(353);                     
			$("#emailFieldEmpty").slideUp(353);                   

			if ($("#emailAddress").val().length > 0) {                      
				if (inJSONTwoDimensionalArray(getJSONMembers, $("#emailAddress").val())) {                
					emailExists = true;                         
				}                            
				else {                           
					emailExists = false;                    
				}                                              

				if (!(isEmail($("#emailAddress").val()))) {                      
					$("#emailAddress").addClass("error");                       
					$("#checkEmailAddress").slideDown(353);                       
					$("#emailAlreadyUsed").slideUp(353);                   
					$("#emailFieldEmpty").slideUp(353);                   
				}                                 
				else if (emailExists === true) {                     
					$("#emailAddress").addClass("error");                   
					$("#emailAlreadyUsed").slideDown(353);                      
					$("#checkEmailAddress").slideUp(353);                       
					$("#emailFieldEmpty").slideUp(353);                   
				}                                 
				else {                              
					$("#emailAddress").removeClass("error");                   
					$("#checkEmailAddress").slideUp(353);             
					$("#emailAlreadyUsed").slideUp(353);                 
					$("#emailFieldEmpty").slideUp(353);                   
				}
			}                      
			else {                               
				$("#emailAddress").addClass("error");                   
				$("#emailFieldEmpty").slideDown(353);                    
				$("#checkEmailAddress").slideUp(353);             
				$("#emailAlreadyUsed").slideUp(353);                 
			}                        			
		}                                  

		if (!inArray(inputConfirmationArray, "country")) {                         
			$("#memberCountry").addClass("error");           
			$(".memberCountryError").slideDown(353);               			
		}                                  

		if (!inArray(inputConfirmationArray, "state")) {                         
			$("#memberState").addClass("error");           
			$(".memberStateError").slideDown(353);               				
		}                                  

		if (!inArray(inputConfirmationArray, "password")) {                         
			if ($("#password").val().length === 0) {
				$("#password").addClass("error");                  
				$(".passwordRequiredError").slideDown(353);                
				isPasswordRequiredErrorVisible = true;              
				removeFromInputConfirmationArray("password");                    
				isConfirmationArrayFilled();                      
			}                                      
			else if (($("#password").val().length < 4)                                   
				&& ($("#password").val().length > 0)) {                           
				$("#password").addClass("error");                  
				$(".shortPasswordError").slideDown(353);                  
				isShortPasswordErrorVisible = true;                      
				removeFromInputConfirmationArray("password");                   
				isConfirmationArrayFilled();                      
			}                                 
			else if (hasWhiteSpace($("#password").val())) {                         
				$("#password").addClass("error");                  
				$(".passwordSpaceError").slideDown(353);                  
				removeFromInputConfirmationArray("password");                        
				isConfirmationArrayFilled();                  
				doesPasswordHaveSpace = true;                            
			}                                 
			else {                                       
				$("#password").removeClass("error");                  
				$(".passwordRequiredError").slideUp(353);                  
				isPasswordRequiredErrorVisible = false;              
				$(".shortPasswordError").slideUp(353);                
				isShortPasswordErrorVisible = false;                      
				addToConfirmationArray("password");                        
				doesPasswordHaveSpace = false;                            
				isConfirmationArrayFilled();                  
			}                                   			
		}                                  

		if (!inArray(inputConfirmationArray, "passwordConfirm")) {                         
			if (($("#passwordConfirm").val() !== password)                                    
				&& ($("#passwordConfirm").val().length > 0)) {                  
				if ((isShortPasswordErrorVisible === false)                   
					&& (isPasswordRequiredErrorVisible === false)                     
					&& (doesPasswordHaveSpace === false)) {                                                 
					$("#passwordConfirm").addClass("error");                  
					$(".passwordMismatchError").slideDown(353);                
					removeFromInputConfirmationArray("passwordConfirm");                       
				}                                      
				else {                            
					$("#passwordConfirm").removeClass("error");                  
					$(".passwordMismatchError").slideUp(353);                
					addToConfirmationArray("passwordConfirm");                   
				}                     

				isConfirmationArrayFilled();                      
			}                                 
			else if ($("#passwordConfirm").val().length < 1) {                       
				$("#passwordConfirm").addClass("error");                               
				$(".passwordRepeatError").slideDown(353);                       
				removeFromInputConfirmationArray("passwordConfirm");                       
			}                           
			else {                                
				$("#passwordConfirm").removeClass("error");                             
				addToConfirmationArray("passwordConfirm");                        
				$(".passwordMismatchError").slideUp(353);                        
				isConfirmationArrayFilled();                      
			}                                   
		}                                       
	});                                                

	getJSONMembers.done(function(theResponse) {                                           
		$("#passwordConfirm").focus(function() {                          
			$("#passwordConfirm").removeClass("error");                  
			$(".passwordMismatchError").slideUp(353);                
		});                     

		$("#passwordConfirm").blur(function() {                      
			if (($("#passwordConfirm").val() !== $("#password").val())                                    
				&& ($("#passwordConfirm").val().length > 0)) {                  
				if ((isShortPasswordErrorVisible === false)                   
					&& (isPasswordRequiredErrorVisible === false)                     
					&& (doesPasswordHaveSpace === false)) {                                                 
					$("#passwordConfirm").addClass("error");                  
					$(".passwordMismatchError").slideDown(353);                
					removeFromInputConfirmationArray("passwordConfirm");                       
				}                                      
				else {                            
					$("#passwordConfirm").removeClass("error");                  
					$(".passwordMismatchError").slideUp(353);                
					addToConfirmationArray("passwordConfirm");                   
				}                     

				isConfirmationArrayFilled();                      
			}                                 
			else if ($("#passwordConfirm").val().length < 1) {                       
				$("#passwordConfirm").addClass("error");                               
				$(".passwordRepeatError").slideDown(353);                       
				removeFromInputConfirmationArray("passwordConfirm");                       
			}                           
			else {                                
				$("#passwordConfirm").removeClass("error");                             
				addToConfirmationArray("passwordConfirm");                        
				$(".passwordMismatchError").slideUp(353);                        
				isConfirmationArrayFilled();                      
			}                                   
		});                    

		$("#passwordConfirm").keydown(function() {
			$("#passwordConfirm").removeClass("error");                  
			$(".passwordMismatchError").slideUp(353);                      
			$(".passwordRepeatError").slideUp(353);                    
		});                      

		$("#password").blur(function() {                         
			if ($("#password").val().length === 0) {
				$("#password").addClass("error");                  
				$(".passwordRequiredError").slideDown(353);                
				isPasswordRequiredErrorVisible = true;              
				removeFromInputConfirmationArray("password");                    
				isConfirmationArrayFilled();                      
			}                                      
			else if (($("#password").val().length < 4)                                   
				&& ($("#password").val().length > 0)) {                           
				$("#password").addClass("error");                  
				$(".shortPasswordError").slideDown(353);                  
				isShortPasswordErrorVisible = true;                      
				removeFromInputConfirmationArray("password");                   
				isConfirmationArrayFilled();                      
			}                                 
			else if (hasWhiteSpace($("#password").val())) {                         
				$("#password").addClass("error");                  
				$(".passwordSpaceError").slideDown(353);                  
				removeFromInputConfirmationArray("password");                        
				doesPasswordHaveSpace = true;                            
				isConfirmationArrayFilled();                  
			}                                 
			else {                                       
				$("#password").removeClass("error");                  
				$(".passwordRequiredError").slideUp(353);                  
				isPasswordRequiredErrorVisible = false;              
				$(".shortPasswordError").slideUp(353);                
				isShortPasswordErrorVisible = false;                      
				addToConfirmationArray("password");                        
				doesPasswordHaveSpace = false;                            
				isConfirmationArrayFilled();                  
			}                                   
		});                    

		$("#password").keydown(function() {
			$("#password").removeClass("error");                    
			$(".passwordRequiredError").slideUp(353);                   
			isPasswordRequiredErrorVisible = false;              
			$(".shortPasswordError").slideUp(353);                   
			isShortPasswordErrorVisible = false;                      
		});                      

		$("#femaleGender").change(function() {
			addToConfirmationArray("gender");                   
			$(".genderRequired").slideUp(353);                
			isConfirmationArrayFilled();                      
			genderChecked = true;                              
		});                    

		$("#maleGender").change(function() {
			addToConfirmationArray("gender");                 
			$(".genderRequired").slideUp(353);                
			isConfirmationArrayFilled();                      
			genderChecked = true;                     
		});                    

		$("#memberState").keydown(function() {
			$("#memberState").removeClass("error");                  
			$(".memberStateError").slideUp(353);                
		});                      

		$("#memberState").blur(function() {
			if ($("#memberState").val().length < 1) {
				$("#memberState").addClass("error");           
				$(".memberStateError").slideDown(353);               
				removeFromInputConfirmationArray("state");            
				isConfirmationArrayFilled();                   
			}                             
			else {
				$("#memberState").removeClass("error");           
				$(".memberStateError").slideUp(353);               
				addToConfirmationArray("state");            
				isConfirmationArrayFilled();                   
			}
		});                

		$("#memberCountry").keydown(function() {
			$("#memberCountry").removeClass("error");                  
			$(".memberCountryError").slideUp(353);                
		});                      

		$("#memberCountry").blur(function() {
			if ($("#memberCountry").val().length < 1) {
				$("#memberCountry").addClass("error");           
				$(".memberCountryError").slideDown(353);               
				removeFromInputConfirmationArray("country");            
				isConfirmationArrayFilled();                   
			}                             
			else {
				$("#memberCountry").removeClass("error");           
				$(".memberCountryError").slideUp(353);               
				addToConfirmationArray("country");            
				isConfirmationArrayFilled();                   
			}                       
		});                

		$("#lastName").blur(function() {
			if ($("#lastName").val().length === 0) {
				$("#lastName").addClass("error");                  
				$(".lastNameError").slideDown(353);                
				removeFromInputConfirmationArray("lastName");                    
				isConfirmationArrayFilled();                      
			}                                 
			else {                              
				$("#lastName").removeClass("error");                  
				addToConfirmationArray("lastName");              
				$(".lastNameError").slideUp(353);                
				isConfirmationArrayFilled();                 
			}                                   
		});                    

		$("#lastName").keydown(function() {
			$("#lastName").removeClass("error");                  
			$(".lastNameError").slideUp(353);                
		});                      

		$("#firstName").blur(function() {
			if ($("#firstName").val().length === 0) {
				$("#firstName").addClass("error");                  
				$(".firstNameError").slideDown(353);                
				removeFromInputConfirmationArray("firstName");              
				isConfirmationArrayFilled();                      
			}                                 
			else {                                   
				$("#firstName").removeClass("error");                  
				addToConfirmationArray("firstName");                  
				$(".firstNameError").slideUp(353);                
				isConfirmationArrayFilled();                
			}                                   
		});                    

		$("#firstName").keydown(function() {
			$("#firstName").removeClass("error");                  
			$(".firstNameError").slideUp(353);                
		});                      

		$("#emailAddress").blur(function() {                 
			$("#checkEmailAddress").slideUp(353);                 
			$("#emailAlreadyUsed").slideUp(353);                     
			$("#emailFieldEmpty").slideUp(353);                   

			if ($("#emailAddress").val().length > 0) {                      
				emailExists = inJSONTwoDimensionalArray(getJSONMembers, $("#emailAddress").val()) ? true : false;                                                            

				if (!(isEmail($("#emailAddress").val()))) {                      
					emailExists = false;                     
					removeFromInputConfirmationArray("email");                   
					$("#emailAddress").addClass("error");                       
					$("#checkEmailAddress").slideDown(353);                       
					$("#emailAlreadyUsed").slideUp(353);                   
					$("#emailFieldEmpty").slideUp(353);                   
					isConfirmationArrayFilled();                      
				}                                 
				else if (emailExists === true) {                     
					removeFromInputConfirmationArray("email");                  
					$("#emailAddress").addClass("error");                   
					$("#emailAlreadyUsed").slideDown(353);                      
					$("#checkEmailAddress").slideUp(353);                       
					$("#emailFieldEmpty").slideUp(353);                   
					isConfirmationArrayFilled();                      
				}                                 
				else {                              
					emailExists = false;                     
					$("#emailAddress").removeClass("error");                   
					$("#checkEmailAddress").slideUp(353);             
					$("#emailAlreadyUsed").slideUp(353);                 
					$("#emailFieldEmpty").slideUp(353);                   
					addToConfirmationArray("email");                      
					isConfirmationArrayFilled();                     
				}
			}                      
			else {                               
				removeFromInputConfirmationArray("email");              
				$("#emailAddress").addClass("error");                   
				$("#emailFieldEmpty").slideDown(353);                    
				$("#checkEmailAddress").slideUp(353);             
				$("#emailAlreadyUsed").slideUp(353);                 
				isConfirmationArrayFilled();                      
			}                        
		});                    

		$("#emailAddress").focus(function() {                    
			if ($("#emailAddress").val().length > 0) {                      
				if (!(isEmail($("#emailAddress").val()))) {                
					emailExists = false;                     
					removeFromInputConfirmationArray("email");                 
					$("#emailAddress").addClass("error");                   
					$("#checkEmailAddress").slideDown(353);                    
					$("#emailAlreadyUsed").slideUp(353);                 
					$("#emailFieldEmpty").slideUp(353);                   
					isConfirmationArrayFilled();                      
				}                            
				else if (emailExists === true) {                   
					removeFromInputConfirmationArray("email");                    
					$("#emailAddress").addClass("error");                   
					$("#emailAlreadyUsed").slideDown(353);                 
					$("#checkEmailAddress").slideUp(353);               
					$("#emailFieldEmpty").slideUp(353);                   
					isConfirmationArrayFilled();                      
				}                                                 
				else {                            
					emailExists = false;                     
					$("#emailAddress").removeClass("error");                   
					$("#checkEmailAddress").slideUp(353);             
					$("#emailAlreadyUsed").slideUp(353);                 
					$("#emailFieldEmpty").slideUp(353);                   
					addToConfirmationArray("email");                        
					isConfirmationArrayFilled();                     
				}                      

				$("#emailAddress").keydown(function() {
					$("#emailAddress").removeClass("error");                   
					$("#checkEmailAddress").slideUp(353);             
					$("#emailAlreadyUsed").slideUp(353);                 
					$("#emailFieldEmpty").slideUp(353);                   
				});                        
			}                                     	
			else {                                 
				$("#emailAddress").keydown(function() {
					$("#emailAddress").removeClass("error");                   
					$("#checkEmailAddress").slideUp(353);             
					$("#emailAlreadyUsed").slideUp(353);                 
					$("#emailFieldEmpty").slideUp(353);                   
				});                        
			}                           

			if (genderChecked === false) {                            
				removeFromInputConfirmationArray("gender");                         
				$(".genderRequired").slideDown(353);                    
				isConfirmationArrayFilled();                        
			}                                            
			else {                                       
				addToConfirmationArray("gender");                       
				$(".genderRequired").slideUp(353);                       
				isConfirmationArrayFilled();                        
			}                                  
		});                                 
	});           

	var isBrowserStorageAvailable = function() {                                   
		var testString = "Test Browser Storage Availability";                            

		try {                                                     
			sessionStorage.setItem("storage", testString);                               
			sessionStorage.removeItem("storage");                                   

			return true;                                        
		}                                                              
		catch (exception) {                                              
			return false;                                         
		}                                            
	}                                              

	var changeContinueButton = function() {                                          
		if (continueRegistration.userName !== "" || profileImageSelected === true) {                                                
			$("#continueSkipButton").hide();                                                      
			$("#continueNextButton").show();                                      		
		}                                                                      
		else {                                                               
			$("#continueSkipButton").show();                                                      
			$("#continueNextButton").hide();                                      		
		}                                                        
	}                                                           
 				
	var inJSONTwoDimensionalArray = function(myJSONTwoDimensionalArray, value) {                                 
		var available = false;                                         

		myJSONTwoDimensionalArray.done(function(theResponse) {                                   
			available = inTwoDimensionalArray(theResponse, value);                                   
		});				                                  

		return available;                                    
	}                                                 

	var inTwoDimensionalArray = function(twoDimensionalArray, value) {                                    
		for (var i = 0; i < twoDimensionalArray.length; i++) {                                  
			if (inArray(twoDimensionalArray[i], value)) {                                     
				twoDimensionalArraySubarray = twoDimensionalArray[i];                                                
				return true;                                  
			}                                            
		}                                             

		return false;                                   
	}                                                   

	var hasWhiteSpace = function(value) {                             
		var regex = /\s/g;                                        
		return regex.test(value);                      
	}                        

	var inArray = function(array, value) {                         
		return array.indexOf(value) > -1;                                 
	}                           

	var isConfirmationArrayFilled = function() {                     
		if (inputConfirmationArray.length === inputControlArray.length) {                   
			$("#inactiveSubmit").hide();                        
			$("#submit").show();                     
			return true;                        
		}                             
		else {                                  
			$("#submit").hide();                     
			$("#inactiveSubmit").show();                     
			return false;                       
		}
	}                          

	var doesInputExists = function(checkData) {                
		var exists = false;                       

		for (var i = 0; i < inputConfirmationArray.length; i++) {
			if (inputConfirmationArray[i] === checkData) {
				exists = true;                         
			}                                     
		}                          

		return exists;                     
	}                    

	var addToConfirmationArray = function(checkData) {                       
		if (doesInputExists(checkData)) {
			return;                            
		}                                       
		else {                                 
			inputConfirmationArray.push(checkData);                       
		}                            
	}                     

	var removeFromInputConfirmationArray = function(removeData) {                       
		var index = inputConfirmationArray.indexOf(removeData);                    

		if (index > -1) {                                 
			inputConfirmationArray.splice(index, 1);                     
		}                                  
	}                        
 					
	var isEmail = function(email) {                          
  		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;                                 
  		return regex.test(email);                                    
	}                            

}(jQuery));                   

/*
		setTimeout(function() {              			
			console.log($("#email").text());        

			if ($.inArray($("#email").text(), allEmails)) {              
				$("#email").text("Email Is Already In Use By Another Customer!");      
			}			                
		}, 5000);                
*/

/*
	$("#emailInputParent").on("keydown", "#email", function(e) {
		var keyCode = e.keyCode || e.which;                   

		if (keyCode === 9) {
			e.preventDefault();                           
console.log("Tab was pressed!");                
			for (var i = allEmails.length - 1; i >= 0; i--) {             
				if (allEmails[i] == ($("#email").val())) {                
					emailExists = true;             
				}                            
			};                           

			if ($("#email").val().length > 0) {                      
				$("#submit").prop("disabled", false);                   
				
				if (!(isEmail($("#email").val()))) {                      
					$("#email").removeClass("emailInput");                
					$("#email").addClass("error");                   
					$("#submit").prop("disabled", true);                    
				}                                 
				else if (emailExists === true) {                     
					$("#email").removeClass("emailInput");                
					$("#email").addClass("error");                   
					$("#submit").prop("disabled", true);                    
				}                                 
			}                      
			else {                               
				$("#submit").prop("disabled", true);                   
			}                        
		}
	});                       
*/

/*
	$("#email").keydown(function() {                    
		if ($("#email").val().length > 5) {                      
			$("#submit").prop("disabled", false);                   

			if (!(isEmail($("#email").val()))) {                
				$("#email").removeClass("emailInput");                
				$("#email").addClass("error");                   
				$("#submit").prop("disabled", true);                 
				$("#checkEmailAddress").fadeIn(353);                    
				$("#emailAlreadyUsed").fadeOut(353);                 
			}                            

			if (emailExists === true) {
				$("#email").removeClass("emailInput");                
				$("#email").addClass("error");                   
				$("#submit").prop("disabled", true);                 
				$("#emailAlreadyUsed").fadeIn(353);                 
				$("#checkEmailAddress").fadeOut(353);             
			}                                                 
		}                                     	
		else {
			$("#submit").prop("disabled", true);                   
		}
	});                                 
*/                       

/*
	$("#password").keydown(function() {                 
		for (var i = allEmails.length - 1; i >= 0; i--) {             
			if (allEmails[i] == ($("#email").val())) {                
				emailExists = true;             
			}                            
		};                           

		if ($("#email").val().length > 0) {                      
			$("#submit").prop("disabled", false);                   
			
			if (!(isEmail($("#email").val()))) {                      
				$("#email").removeClass("emailInput");                
				$("#email").addClass("error");                   
				$("#submit").prop("disabled", true);                    
			}                                 
			else if (emailExists === true) {                     
				$("#email").removeClass("emailInput");                
				$("#email").addClass("error");                   
				$("#submit").prop("disabled", true);                    
			}                                 
		}                      
		else {                               
			$("#submit").prop("disabled", true);                   
		}                        
	});                    
*/


