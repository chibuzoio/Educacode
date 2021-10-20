
(function($) {

	var getAllEmail = $.getJSON('../Educacode/coderback/jsonregister.php');                       
	var getControlCosts = $.getJSON('../Educacode/coderback/jsoncontrolcost.php');                       

	var controlMultiple = 0;                      
	var checkedCategories = [];                            
	var allSelectedOPtions = [];                           
	var allQuotationObjects = {};                        

	var inputConfirmationArray = [];                                
	var inputPasswordConfirmationArray = [];                                
	var inputPasswordControlArray = ["selectProjectType", "companyName",                                
		"companyFurtherDescription", "clientfirstName", "clientLastName",                                  
		"clientGender", "clientEmailAddress", "clientCountry", "clientState",                                         
		"clientPassword", "clientConfirmPassword"];                                
	var inputControlArray = ["selectProjectType", "companyName",                                
		"companyFurtherDescription", "clientfirstName", "clientLastName",                                             
		"clientGender", "clientEmailAddress", "clientCountry", "clientState"];                       

	allQuotationObjects.webAppChoice = "false";                         
	allQuotationObjects.mobileAppChoice = "false";                            
	allQuotationObjects.desktopAppChoice = "false";                                   
	allQuotationObjects.selectProjectType = "";                         
	allQuotationObjects.searchEOAmount = 0.00;                 
	allQuotationObjects.businessPDAmount = 0.00;                    
	allQuotationObjects.emailCAmount = 0.00;                    
	allQuotationObjects.customersFAmount = 0.00;                    
	allQuotationObjects.quotationPAmount = 0.00;                    
	allQuotationObjects.financialTAmount = 0.00;                    
	allQuotationObjects.employeeMAmount = 0.00;                    
	allQuotationObjects.officialsMAmount = 0.00;                    
	allQuotationObjects.realTSAmount = 0.00;                    
	allQuotationObjects.projectMAmount = 0.00;                    
	allQuotationObjects.servicesDAmount = 0.00;                    
	allQuotationObjects.descriptiveUIAmount = 0.00;                    
	allQuotationObjects.studentsTMAmount = 0.00;                    
	allQuotationObjects.computerBEAmount = 0.00;                    
	allQuotationObjects.resultCAmount = 0.00;                    
	allQuotationObjects.totalAmountValue = 0.00;                         
	allQuotationObjects.additionalOption = "";                        	
	allQuotationObjects.projectDuration = "one month";                          
	allQuotationObjects.paymentChoice = "outright";                      

	allQuotationObjects.companyNameInput = "";                          
	allQuotationObjects.companyNameSuggestion = "false";                         
	allQuotationObjects.companyAddressInput = "";                            
	allQuotationObjects.companyCountryInput = "";                           
	allQuotationObjects.companyStateInput = "";                      
	allQuotationObjects.companyTownInput = "";                      
	allQuotationObjects.companyCustomersInput = "";                       
	allQuotationObjects.companyFurtherDescription = "";                      

	allQuotationObjects.clientFirstName = "";                        
	allQuotationObjects.clientLastName = "";                       
	allQuotationObjects.clientMaleGender = "false";                   
	allQuotationObjects.clientFemaleGender = "false";                       
	allQuotationObjects.clientEmailAddress = "";                        
	allQuotationObjects.clientCountry = "";                         
	allQuotationObjects.clientState = "";                        
	allQuotationObjects.registerGuestClient = "false";                      
	allQuotationObjects.clientPassword = "";                           
	allQuotationObjects.clientConfirmPassword = "";                      

	allQuotationObjects.submitQuotation = "";                         

	var emailExists = false;                            
	var chosenProjectType = "";                            
	var checkedDurationIdentity = "";                       

	var basicBusinessAmount = 0.00;                           
	var basicChurchAmount = 0.00;                           
	var basicCompanyAmount = 0.00;                           
	var basicEcommerceAmount = 0.00;                           
	var basicSchoolAmount = 0.00;                           
	var totalAmountValue = 0.00;                          

	var searchEOAmount = 0.00;                     
	var businessPDAmount = 0.00;           
	var emailCAmount = 0.00;                    
	var customersFAmount = 0.00;                    
	var quotationPAmount = 0.00;                            
	var financialTAmount = 0.00;                         
	var employeeMAmount = 0.00;                         
	var officialsMAmount = 0.00;                           
	var realTSAmount = 0.00;                       
	var projectMAmount = 0.00;               
	var servicesDAmount = 0.00;                 
	var descriptiveUIAmount = 0.00;             
	var studentsTMAmount = 0.00;              
	var computerBEAmount = 0.00;           
	var resultCAmount = 0.00;                  

	var searchEORate = 0.00;                     
	var businessPDRate = 0.00;           
	var emailCRate = 0.00;                    
	var customersFRate = 0.00;                    
	var quotationPRate = 0.00;                    
	var financialTRate = 0.00;            
	var employeeMRate = 0.00;            
	var officialsMRate = 0.00;               
	var realTSRate = 0.00;            
	var projectMRate = 0.00;               
	var servicesDRate = 0.00;                 
	var descriptiveUIRate = 0.00;             
	var studentsTMRate = 0.00;              
	var computerBERate = 0.00;           
	var resultCRate = 0.00;                      
	var twoWeeksDRate = 0.00;                   
	var oneMonthDRate = 0.00;                   
	var twoMonthsDRate = 0.00;                  
	var fiveMonthsDRate = 0.00;                

	$("#submitQuotationFailed").click(function() {                                     
		if ($("#registerGuestClient").is(":checked")) {                             
			inputConfirmationArrayValidators();                                     

			if (!inArray(inputPasswordConfirmationArray, "clientPassword")) {                           
				clientPasswordValidator();                           
			}                                 
			
			if (!inArray(inputPasswordConfirmationArray, "clientConfirmPassword")) {                           
				clientConfirmPasswordValidator();                            
			}                                 			
		}                                         
		else {                                             
			inputConfirmationArrayValidators();                              
		}                              
	});                                       

	$("#suggestSchoolName").change(function() {
		suggestSchoolNameValidator();                                
	});                                   

	$("#suggestEcommerceName").change(function() {
		suggestEcommerceNameValidator();                                   
	});                                   

	$("#suggestCompanyName").change(function() {
		suggestCompanyNameValidator();                                  
	});                                   

	$("#suggestChurchName").change(function() {
		suggestChurchNameValidator();                                            
	});                                   

	$("#suggestBusinessName").change(function() {
		suggestBusinessNameValidator();                                   
	});                                   

	$("#clientConfirmPassword").focus(function() {                            
		if ($("#clientRequirePaswordError").is(":visible")                       
			|| $("#clientShortPasswordError").is(":visible")                   
			|| $("#clientPasswordSpaceError").is(":visible")) {                             
			$("#clientPassword").addClass("error");                              
			$("#clientConfirmPassword").addClass("error");                   
			allQuotationObjects.clientConfirmPassword = "";                         
			removeFromArrayForConfirmation("clientConfirmPassword");                           
		}                              
	});                        

	$("#clientConfirmPassword").blur(function() {                      
		clientConfirmPasswordValidator();                             
	});                           

	$("#clientPassword").focus(function() {                               
		$("#clientPassword").removeClass("error");                   
		$("#clientRequirePaswordError").slideUp(353);                
		$("#clientShortPasswordError").slideUp(353);                
		$("#clientPasswordSpaceError").slideUp(353);                
		$("#clientDifferentPasswordError").slideUp(353);                
		allQuotationObjects.clientPassword = "";                         
		removeFromArrayForConfirmation("clientPassword");                        
	});                     

	$("#clientPassword").blur(function() {                      
		clientPasswordValidator();                                       
	});                           

	$("#clientState").focus(function() {                           
		$("#clientStateError").removeClass("shiftClientLastNameError");                      		
		$("#clientState").removeClass("error");                               
		$("#clientStateError").slideUp(353);                      
		allQuotationObjects.clientState = "";                   
		removeFromArrayForConfirmation("clientState");                    
	});                          

	$("#clientState").blur(function() {                  
		clientStateValidator();                                       
	});                           

	$("#clientCountry").focus(function() {                           
		if ($("#clientStateError").is(":visible")) {                      
			$("#clientStateError").removeClass("shiftClientLastNameError");                     
		}                                   

		allQuotationObjects.clientCountry = "";                       
		removeFromArrayForConfirmation("clientSCountry");                    
		$("#clientCountry").removeClass("error");                          
		$("#clientCountryError").slideUp(353);                    
	});                                

	$("#clientCountry").blur(function() {                    
		clientCountryValidator();                                  
	});                           

	$("#clientEmailAddress").focus(function() {                  
		$("#clientEmailAddress").removeClass("error");                       
		$("#clientEmailAddressError").slideUp(353);             
		$("#clientEmailAlreadyUsed").slideUp(353);             
		$("#clientEmailFieldEmpty").slideUp(353);             
		
		clientGenderValidator();                                    
	});              

	$("#clientEmailAddress").blur(function() {                      
		clientEmailAddressValidator();                                
	});                           

	$("#clientFemaleGender").change(function() {                     
		if ($("#clientFemaleGender").is(":checked")) {
			allQuotationObjects.clientFemaleGender = "true";                          
			allQuotationObjects.clientMaleGender = "false";                     
			$("#clientGenderError").slideUp(353);                                           
			$("#clientEmailAddressError").removeClass("shiftClientLastNameError");             
			$("#clientEmailAlreadyUsed").removeClass("shiftClientLastNameError");             
			$("#clientEmailFieldEmpty").removeClass("shiftClientLastNameError");             
			addToArrayForConfirmation("clientGender");                               
		}                            
	});                                      

	$("#clientMaleGender").change(function() {                     
		if ($("#clientMaleGender").is(":checked")) {
			allQuotationObjects.clientMaleGender = "true";                     
			allQuotationObjects.clientFemaleGender = "false";                          
			$("#clientGenderError").slideUp(353);                      
			$("#clientEmailAddressError").removeClass("shiftClientLastNameError");             
			$("#clientEmailAlreadyUsed").removeClass("shiftClientLastNameError");             
			$("#clientEmailFieldEmpty").removeClass("shiftClientLastNameError");             
			addToArrayForConfirmation("clientGender");                               
		}                             
	});                                      

	$("#ecommerceCustomersInput").blur(function() {                  
		allQuotationObjects.companyCustomersInput = $("#ecommerceCustomersInput").val();                           
		isProjectTypeSelected();                          
	});                        

	$("#companyCustomersInput").blur(function() {                  
		allQuotationObjects.companyCustomersInput = $("#companyCustomersInput").val();                           
		isProjectTypeSelected();                          
	});                        

	$("#businessCustomersInput").blur(function() {                  
		allQuotationObjects.companyCustomersInput = $("#businessCustomersInput").val();                           
		isProjectTypeSelected();                          
	});                        

	$("#schoolFurtherDescription").focus(function() {                  
		$("#schoolFurtherDescription").removeClass("error");                  
		$("#schoolFurtherDescriptionError").slideUp(353);                  
	});                        

	$("#schoolFurtherDescription").blur(function() {                  
		schoolFurtherDescriptionValidator();                             
	});                        

	$("#ecommerceFurtherDescription").focus(function() {                  
		$("#ecommerceFurtherDescription").removeClass("error");                  
		$("#ecommerceFurtherDescriptionError").slideUp(353);                  
	});                        

	$("#ecommerceFurtherDescription").blur(function() {                  
		ecommerceFurtherDescriptionValidator();                              
	});                        

	$("#companyFurtherDescription").focus(function() {                  
		$("#companyFurtherDescription").removeClass("error");                  
		$("#companyFurtherDescriptionError").slideUp(353);                  
	});                        

	$("#companyFurtherDescription").blur(function() {                  
		companyFurtherDescriptionValidator();                              
	});                        

	$("#churchFurtherDescription").focus(function() {                  
		$("#churchFurtherDescription").removeClass("error");                  
		$("#churchFurtherDescriptionError").slideUp(353);                  
	});                        

	$("#churchFurtherDescription").blur(function() {                  
		churchFurtherDescriptionValidator();                                
	});                        

	$("#businessFurtherDescription").focus(function() {                  
		$("#businessFurtherDescription").removeClass("error");                  
		$("#businessFurtherDescriptionError").slideUp(353);                  
	});                        

	$("#businessFurtherDescription").blur(function() {                  
		businessFurtherDescriptionValidator();                                   
	});                        

	$("#schoolTownInput").blur(function() {                  
		allQuotationObjects.companyTownInput = $.trim($("#schoolTownInput").val());                                                         
	});                        

	$("#ecommerceTownInput").blur(function() {                  
		allQuotationObjects.companyTownInput = $.trim($("#ecommerceTownInput").val());                                                        
	});                        

	$("#companyTownInput").blur(function() {                  
		allQuotationObjects.companyTownInput = $.trim($("#companyTownInput").val());                                                         
	});                        

	$("#churchTownInput").blur(function() {                  
		allQuotationObjects.companyTownInput = $.trim($("#churchTownInput").val());                           
	});                        

	$("#businessTownInput").blur(function() {                  
		allQuotationObjects.companyTownInput = $.trim($("#businessTownInput").val());                           
	});                        

	$("#schoolStateInput").blur(function() {                  
		allQuotationObjects.companyStateInput = $.trim($("#schoolStateInput").val());                           
	});                        

	$("#ecommerceStateInput").blur(function() {                  
		allQuotationObjects.companyStateInput = $.trim($("#ecommerceStateInput").val());                           
	});                        

	$("#companyStateInput").blur(function() {                  
		allQuotationObjects.companyStateInput = $.trim($("#companyStateInput").val());                           
	});                        

	$("#churchStateInput").blur(function() {                  
		allQuotationObjects.companyStateInput = $.trim($("#churchStateInput").val());                           
	});                        

	$("#businessStateInput").blur(function() {                  
		allQuotationObjects.companyStateInput = $.trim($("#businessStateInput").val());                           
	});                        

	$("#schoolCountryInput").blur(function() {                  
		allQuotationObjects.companyCountryInput = $.trim($("#schoolCountryInput").val());                           
	});                        

	$("#ecommerceCountryInput").blur(function() {                  
		allQuotationObjects.companyCountryInput = $.trim($("#ecommerceCountryInput").val());                           
	});                        

	$("#companyCountryInput").blur(function() {                  
		allQuotationObjects.companyCountryInput = $.trim($("#companyCountryInput").val());                           
	});                        

	$("#churchCountryInput").blur(function() {                  
		allQuotationObjects.companyCountryInput = $.trim($("#churchCountryInput").val());                           
	});                        

	$("#businessCountryInput").blur(function() {                  
		allQuotationObjects.companyCountryInput = $.trim($("#businessCountryInput").val());                           
	});                        

	$("#schoolAddressInput").blur(function() {                  
		allQuotationObjects.companyAddressInput = $.trim($("#schoolAddressInput").val());                           
	});                        

	$("#ecommerceAddressInput").blur(function() {                  
		allQuotationObjects.companyAddressInput = $.trim($("#ecommerceAddressInput").val());                           
	});                        

	$("#companyAddressInput").blur(function() {                  
		allQuotationObjects.companyAddressInput = $.trim($("#companyAddressInput").val());                           
	});                        

	$("#churchAddressInput").blur(function() {                  
		allQuotationObjects.companyAddressInput = $.trim($("#churchAddressInput").val());                           
	});                        

	$("#businessAddressInput").blur(function() {                  
		allQuotationObjects.companyAddressInput = $.trim($("#businessAddressInput").val());                           
	});                        

	$("#submitQuotation").click(function() {                                  
		allQuotationObjects.submitQuotation = "Get Quotation";                          
		var postQuotationData = $.post("../Educacode/coderback/quotationserver.php", allQuotationObjects);                                 

		postQuotationData.done(function(response) {                            

		});                           
	});                                 

	$("#registerGuestClient").change(function() {                     
		registerGuestClientValidator();                                
	});                                  

	$("#clientLastName").focus(function() {                   
		$("#clientLastNameError").slideUp(353);                     
		$("#clientLastName").removeClass("error");                    
	});                    

	$("#clientLastName").blur(function() {                     
		clientLastNameValidator();                               
	});                           

	$("#clientFirstName").focus(function() {                      
		$("#secondLineTracker").removeClass("secondLineTracker-off");              
		$("#secondLineTracker").addClass("secondLineTracker-on");                     
		$("#thirdLineTracker").removeClass("thirdLineTracker-off");              
		$("#thirdLineTracker").addClass("thirdLineTracker-on");                
		$("#fourthLineTracker").removeClass("fourthLineTracker-off");              
		$("#fourthLineTracker").addClass("fourthLineTracker-on");                     
		$("#firstCircle").removeClass("firstCircle");             
		$("#firstCircle").addClass("firstCircle-on-small");                    
		$("#secondCircle").removeClass("secondCircle-off");          
		$("#secondCircle").removeClass("secondCircle-on");                  
		$("#secondCircle").addClass("secondCircle-on-small");                  
		$("#thirdCircle").removeClass("thirdCircle-first-off");                  
		$("#thirdCircle").removeClass("thirdCircle-second-off");                   
		$("#thirdCircle").removeClass("thirdCircle-on");                   
		$("#thirdCircle").addClass("thirdCircle-on-small");                   
		$("#fourthCircle").removeClass("fourthCircle-first-off");                        
		$("#fourthCircle").removeClass("fourthCircle-second-off");                        
		$("#fourthCircle").addClass("fourthCircle-on");                        
		$("#secondTitle").removeClass("secondTitle-off");                     
		$("#secondTitle").addClass("secondTitle-on");                     
		$("#thirdTitle").removeClass("thirdTitle-off");                     
		$("#thirdTitle").addClass("thirdTitle-on");                     
		$("#fourthTitle").removeClass("fourthTitle-off");                     
		$("#fourthTitle").addClass("fourthTitle-on");                     
		$("#coverLevelTracker").slideDown(555);                   
		$("#clientFirstName").removeClass("error");                
		$("#clientFirstNameError").slideUp(353);                 

		if ($("#clientLastNameError").is(":visible")) {
			$("#clientLastNameError").removeClass("shiftClientLastNameError");                 
		}                                                   
	});                              

	$("#clientFirstName").blur(function() {                      
		clientFirstNameValidator();                            
	});                           

	$("#schoolNameInput").focus(function() {                  
		$("#secondLineTracker").removeClass("secondLineTracker-off");              
		$("#secondLineTracker").addClass("secondLineTracker-on");                     
		$("#thirdLineTracker").removeClass("thirdLineTracker-off");              
		$("#thirdLineTracker").addClass("thirdLineTracker-on");                     
		$("#firstCircle").removeClass("firstCircle");             
		$("#firstCircle").addClass("firstCircle-on-small");                    
		$("#secondCircle").removeClass("secondCircle-off");          
		$("#secondCircle").removeClass("secondCircle-on");                  
		$("#secondCircle").addClass("secondCircle-on-small");                  
		$("#thirdCircle").removeClass("thirdCircle-first-off");                  
		$("#thirdCircle").removeClass("thirdCircle-second-off");                   
		$("#thirdCircle").addClass("thirdCircle-on");                   
		$("#fourthCircle").removeClass("fourthCircle-first-off");                        
		$("#fourthCircle").addClass("fourthCircle-second-off");                        
		$("#secondTitle").removeClass("secondTitle-off");                     
		$("#secondTitle").addClass("secondTitle-on");                     
		$("#thirdTitle").removeClass("thirdTitle-off");                     
		$("#thirdTitle").addClass("thirdTitle-on");                     
		$("#coverLevelTracker").slideDown(555);                      
		$("#suggestSchoolName").prop("checked", false);                       
		$("#schoolNameInput").removeClass("error");                     
		$("#suggestSchoolNameError").slideUp(353);                

		isProjectTypeSelected();                          
	});                              

	$("#schoolNameInput").blur(function() {                        
		schoolNameInputValidator();                           
	});                        

	$("#ecommerceNameInput").focus(function() {                  
		$("#secondLineTracker").removeClass("secondLineTracker-off");              
		$("#secondLineTracker").addClass("secondLineTracker-on");                     
		$("#thirdLineTracker").removeClass("thirdLineTracker-off");              
		$("#thirdLineTracker").addClass("thirdLineTracker-on");                     
		$("#firstCircle").removeClass("firstCircle");             
		$("#firstCircle").addClass("firstCircle-on-small");                    
		$("#secondCircle").removeClass("secondCircle-off");          
		$("#secondCircle").removeClass("secondCircle-on");                  
		$("#secondCircle").addClass("secondCircle-on-small");                  
		$("#thirdCircle").removeClass("thirdCircle-first-off");                  
		$("#thirdCircle").removeClass("thirdCircle-second-off");                   
		$("#thirdCircle").addClass("thirdCircle-on");                   
		$("#fourthCircle").removeClass("fourthCircle-first-off");                        
		$("#fourthCircle").addClass("fourthCircle-second-off");                        
		$("#secondTitle").removeClass("secondTitle-off");                     
		$("#secondTitle").addClass("secondTitle-on");                     
		$("#thirdTitle").removeClass("thirdTitle-off");                     
		$("#thirdTitle").addClass("thirdTitle-on");                     
		$("#coverLevelTracker").slideDown(555);                   
		$("#suggestEcommerceName").prop("checked", false);                       
		$("#ecommerceNameInput").removeClass("error");                     
		$("#suggestEcommerceNameError").slideUp(353);                

		isProjectTypeSelected();                          
	});                              

	$("#ecommerceNameInput").blur(function() {                        
		ecommerceNameInputValidator();                             
	});                        

	$("#companyNameInput").focus(function() {                  
		$("#secondLineTracker").removeClass("secondLineTracker-off");              
		$("#secondLineTracker").addClass("secondLineTracker-on");                     
		$("#thirdLineTracker").removeClass("thirdLineTracker-off");              
		$("#thirdLineTracker").addClass("thirdLineTracker-on");                     
		$("#firstCircle").removeClass("firstCircle");             
		$("#firstCircle").addClass("firstCircle-on-small");                    
		$("#secondCircle").removeClass("secondCircle-off");          
		$("#secondCircle").removeClass("secondCircle-on");                  
		$("#secondCircle").addClass("secondCircle-on-small");                  
		$("#thirdCircle").removeClass("thirdCircle-first-off");                  
		$("#thirdCircle").removeClass("thirdCircle-second-off");                   
		$("#thirdCircle").addClass("thirdCircle-on");                   
		$("#fourthCircle").removeClass("fourthCircle-first-off");                        
		$("#fourthCircle").addClass("fourthCircle-second-off");                        
		$("#secondTitle").removeClass("secondTitle-off");                     
		$("#secondTitle").addClass("secondTitle-on");                     
		$("#thirdTitle").removeClass("thirdTitle-off");                     
		$("#thirdTitle").addClass("thirdTitle-on");                     
		$("#coverLevelTracker").slideDown(555);                   
		$("#suggestCompanyName").prop("checked", false);                       
		$("#companyNameInput").removeClass("error");                     
		$("#suggestCompanyNameError").slideUp(353);                

		isProjectTypeSelected();                          
	});                              

	$("#companyNameInput").blur(function() {                        
		companyNameInputValidator();                          
	});                        

	$("#churchNameInput").focus(function() {                  
		$("#secondLineTracker").removeClass("secondLineTracker-off");              
		$("#secondLineTracker").addClass("secondLineTracker-on");                     
		$("#thirdLineTracker").removeClass("thirdLineTracker-off");              
		$("#thirdLineTracker").addClass("thirdLineTracker-on");                     
		$("#firstCircle").removeClass("firstCircle");             
		$("#firstCircle").addClass("firstCircle-on-small");                    
		$("#secondCircle").removeClass("secondCircle-off");          
		$("#secondCircle").removeClass("secondCircle-on");                  
		$("#secondCircle").addClass("secondCircle-on-small");                  
		$("#thirdCircle").removeClass("thirdCircle-first-off");                  
		$("#thirdCircle").removeClass("thirdCircle-second-off");                   
		$("#thirdCircle").addClass("thirdCircle-on");                   
		$("#fourthCircle").removeClass("fourthCircle-first-off");                        
		$("#fourthCircle").addClass("fourthCircle-second-off");                        
		$("#secondTitle").removeClass("secondTitle-off");                     
		$("#secondTitle").addClass("secondTitle-on");                     
		$("#thirdTitle").removeClass("thirdTitle-off");                     
		$("#thirdTitle").addClass("thirdTitle-on");                     
		$("#coverLevelTracker").slideDown(555);                   
		$("#suggestChurchName").prop("checked", false);                       
		$("#churchNameInput").removeClass("error");                     
		$("#suggestChurchNameError").slideUp(353);                

		isProjectTypeSelected();                          
	});                              

	$("#churchNameInput").blur(function() {                        
		churchNameInputValidator();                         		
	});                        

	$("#businessNameInput").focus(function() {                  
		$("#secondLineTracker").removeClass("secondLineTracker-off");              
		$("#secondLineTracker").addClass("secondLineTracker-on");                     
		$("#thirdLineTracker").removeClass("thirdLineTracker-off");              
		$("#thirdLineTracker").addClass("thirdLineTracker-on");                     
		$("#firstCircle").removeClass("firstCircle");             
		$("#firstCircle").addClass("firstCircle-on-small");                    
		$("#secondCircle").removeClass("secondCircle-off");          
		$("#secondCircle").removeClass("secondCircle-on");                  
		$("#secondCircle").addClass("secondCircle-on-small");                  
		$("#thirdCircle").removeClass("thirdCircle-first-off");                  
		$("#thirdCircle").removeClass("thirdCircle-second-off");                   
		$("#thirdCircle").addClass("thirdCircle-on");                   
		$("#fourthCircle").removeClass("fourthCircle-first-off");                        
		$("#fourthCircle").addClass("fourthCircle-second-off");                        
		$("#secondTitle").removeClass("secondTitle-off");                     
		$("#secondTitle").addClass("secondTitle-on");                     
		$("#thirdTitle").removeClass("thirdTitle-off");                     
		$("#thirdTitle").addClass("thirdTitle-on");                     
		$("#coverLevelTracker").slideDown(555);                   
		$("#suggestBusinessName").prop("checked", false);                       
		$("#businessNameInput").removeClass("error");                     
		$("#suggestBusinessNameError").slideUp(353);                

		isProjectTypeSelected();                          
	});                              

	$("#businessNameInput").blur(function() {                        
		businessNameInputValidator();                            
	});                        

	$("#quotationForm").scroll(function() {                      
		$("#coverLevelTracker").slideUp(555);                       
	});                     

	$("#businessOneMonthDuration").prop("checked", true);                      
	$("#churchOneMonthDuration").prop("checked", true);                      
	$("#companyOneMonthDuration").prop("checked", true);                      
	$("#ecommerceOneMonthDuration").prop("checked", true);                      
	$("#schoolOneMonthDuration").prop("checked", true);                      

	$("#businessOutrightPayment").prop("checked", true);                           
	$("#churchOutrightPayment").prop("checked", true);                           
	$("#companyOutrightPayment").prop("checked", true);                           
	$("#ecommerceOutrightPayment").prop("checked", true);                           
	$("#schoolOutrightPayment").prop("checked", true);                           

	$("#schoolInstallmentPayment").change(function() {                     
		if ($("#schoolInstallmentPayment").is(":checked")) {
			allQuotationObjects.paymentChoice = "installment";                      
		}                            
	});                                      

	$("#schoolOutrightPayment").change(function() {                     
		allQuotationObjects.paymentChoice = "outright";                      
	});                                      

	$("#ecommerceInstallmentPayment").change(function() {                     
		if ($("#ecommerceInstallmentPayment").is(":checked")) {
			allQuotationObjects.paymentChoice = "installment";                      
		}                            
	});                                      

	$("#ecommerceOutrightPayment").change(function() {                     
		allQuotationObjects.paymentChoice = "outright";                      
	});                                      

	$("#companyInstallmentPayment").change(function() {                     
		if ($("#companyInstallmentPayment").is(":checked")) {
			allQuotationObjects.paymentChoice = "installment";                      
		}                            
	});                                      

	$("#companyOutrightPayment").change(function() {                     
		allQuotationObjects.paymentChoice = "outright";                      
	});                                      

	$("#churchInstallmentPayment").change(function() {                     
		if ($("#churchInstallmentPayment").is(":checked")) {
			allQuotationObjects.paymentChoice = "installment";                      
		}                            
	});                                      

	$("#churchOutrightPayment").change(function() {                     
		allQuotationObjects.paymentChoice = "outright";                      
	});                                      

	$("#businessInstallmentPayment").change(function() {                     
		if ($("#businessInstallmentPayment").is(":checked")) {
			allQuotationObjects.paymentChoice = "installment";                      
		}                            
	});                                      

	$("#businessOutrightPayment").change(function() {                     
		allQuotationObjects.paymentChoice = "outright";                      
	});                                      

	$("#schoolFiveMonthsDuration").change(function() {               
		if ($("#schoolFiveMonthsDuration").is(":checked")) {                
			allQuotationObjects.projectDuration = "five months";                      
			checkedDurationIdentity = "schoolFiveMonthsDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#schoolTwoMonthsDuration").change(function() {               
		if ($("#schoolTwoMonthsDuration").is(":checked")) {                      
			allQuotationObjects.projectDuration = "two months";                      
			checkedDurationIdentity = "schoolTwoMonthsDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#schoolOneMonthDuration").change(function() {               
		if ($("#schoolOneMonthDuration").is(":checked")) {                     
			allQuotationObjects.projectDuration = "one month";                      
			checkedDurationIdentity = "schoolOneMonthDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#schoolTwoWeeksDuration").change(function() {               
		if ($("#schoolTwoWeeksDuration").is(":checked")) {                      
			allQuotationObjects.projectDuration = "two weeks";                      
			checkedDurationIdentity = "schoolTwoWeeksDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#ecommerceFiveMonthsDuration").change(function() {               
		if ($("#ecommerceFiveMonthsDuration").is(":checked")) {                       
			allQuotationObjects.projectDuration = "five months";                      
			checkedDurationIdentity = "ecommerceFiveMonthsDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#ecommerceTwoMonthsDuration").change(function() {               
		if ($("#ecommerceTwoMonthsDuration").is(":checked")) {                            
			allQuotationObjects.projectDuration = "two months";                      
			checkedDurationIdentity = "ecommerceTwoMonthsDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#ecommerceOneMonthDuration").change(function() {               
		if ($("#ecommerceOneMonthDuration").is(":checked")) {                         
			allQuotationObjects.projectDuration = "one month";                      
			checkedDurationIdentity = "ecommerceOneMonthDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#ecommerceTwoWeeksDuration").change(function() {               
		if ($("#ecommerceTwoWeeksDuration").is(":checked")) {                         
			allQuotationObjects.projectDuration = "two weeks";                      
			checkedDurationIdentity = "ecommerceTwoWeeksDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#companyFiveMonthsDuration").change(function() {               
		if ($("#companyFiveMonthsDuration").is(":checked")) {                           
			allQuotationObjects.projectDuration = "five months";                      
			checkedDurationIdentity = "companyFiveMonthsDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#companyTwoMonthsDuration").change(function() {               
		if ($("#companyTwoMonthsDuration").is(":checked")) {                             
			allQuotationObjects.projectDuration = "two months";                      
			checkedDurationIdentity = "companyTwoMonthsDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#companyOneMonthDuration").change(function() {               
		if ($("#companyOneMonthDuration").is(":checked")) {                         
			allQuotationObjects.projectDuration = "one month";                      
			checkedDurationIdentity = "companyOneMonthDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#companyTwoWeeksDuration").change(function() {               
		if ($("#companyTwoWeeksDuration").is(":checked")) {                             
			allQuotationObjects.projectDuration = "two weeks";                      
			checkedDurationIdentity = "companyTwoWeeksDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#churchFiveMonthsDuration").change(function() {               
		if ($("#churchFiveMonthsDuration").is(":checked")) {                         
			allQuotationObjects.projectDuration = "five months";                      
			checkedDurationIdentity = "churchFiveMonthsDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#churchTwoMonthsDuration").change(function() {               
		if ($("#churchTwoMonthsDuration").is(":checked")) {                             
			allQuotationObjects.projectDuration = "two months";                      
			checkedDurationIdentity = "churchTwoMonthsDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#churchOneMonthDuration").change(function() {               
		if ($("#churchOneMonthDuration").is(":checked")) {                           
			allQuotationObjects.projectDuration = "one month";                      
			checkedDurationIdentity = "churchOneMonthDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#churchTwoWeeksDuration").change(function() {               
		if ($("#churchTwoWeeksDuration").is(":checked")) {                            
			allQuotationObjects.projectDuration = "two weeks";                      
			checkedDurationIdentity = "churchTwoWeeksDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#businessFiveMonthsDuration").change(function() {               
		if ($("#businessFiveMonthsDuration").is(":checked")) {                              
			allQuotationObjects.projectDuration = "five months";                      
			checkedDurationIdentity = "businessFiveMonthsDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#businessTwoMonthsDuration").change(function() {               
		if ($("#businessTwoMonthsDuration").is(":checked")) {                              
			allQuotationObjects.projectDuration = "two months";                      
			checkedDurationIdentity = "businessTwoMonthsDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#businessOneMonthDuration").change(function() {               
		if ($("#businessOneMonthDuration").is(":checked")) {                               
			allQuotationObjects.projectDuration = "one month";                      
			checkedDurationIdentity = "businessOneMonthDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#businessTwoWeeksDuration").change(function() {               
		if ($("#businessTwoWeeksDuration").is(":checked")) {                              
			allQuotationObjects.projectDuration = "two weeks";                      
			checkedDurationIdentity = "businessTwoWeeksDuration";                       
			alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                           
		}                            
	});                              

	$("#desktopAppChoice").change(function() {                       
		isAppChoiceChecked();                    
		checkProjectCategory();                            

		if ($("#desktopAppChoice").is(":checked")) {
			checkedCategories.push("desktopAppChoice");                             
			allQuotationObjects.desktopAppChoice = "true";                        
		}                            
		else {                           
			spliceArrayValue(checkedCategories, "desktopAppChoice");                             
			allQuotationObjects.desktopAppChoice = "false";                        
		}                             

		alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                                
	});                                     

	$("#mobileAppChoice").change(function() {                       
		isAppChoiceChecked();                    
		checkProjectCategory();                       

		if ($("#mobileAppChoice").is(":checked")) {
			checkedCategories.push("mobileAppChoice");                                 
			allQuotationObjects.mobileAppChoice = "true";                        
		}                            
		else {                           
			spliceArrayValue(checkedCategories, "mobileAppChoice");                             
			allQuotationObjects.mobileAppChoice = "false";                        
		}                                 

		alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                                
	});                            

	$("#webAppChoice").change(function() {                       
		isAppChoiceChecked();                             
		checkProjectCategory();                         

		if ($("#webAppChoice").is(":checked")) {
			checkedCategories.push("webAppChoice");                                 
			allQuotationObjects.webAppChoice = "true";                        
		}                            
		else {                           
			spliceArrayValue(checkedCategories, "webAppChoice");                             
			allQuotationObjects.webAppChoice = "false";                        
		}                                             

		alterSelectedOptionsValue(chosenProjectType, checkedDurationIdentity);                                
	});                           

	getControlCosts.done(function(theJson) {                            
		$("#selectProjectType").change(function() {                        
			$("#secondLineTracker").removeClass("secondLineTracker-off");              
			$("#secondLineTracker").addClass("secondLineTracker-on");                     
			$("#firstCircle").removeClass("firstCircle");             
			$("#firstCircle").addClass("firstCircle-on-small");                    
			$("#secondCircle").removeClass("secondCircle-off");          
			$("#secondCircle").addClass("secondCircle-on");                  
			$("#thirdCircle").removeClass("thirdCircle-first-off");                  
			$("#thirdCircle").addClass("thirdCircle-second-off");                   
			$("#secondTitle").removeClass("secondTitle-off");                     
			$("#secondTitle").addClass("secondTitle-on");                     
			$("#coverLevelTracker").slideDown(555);                   
			
			var optionId = $("#selectProjectType").find("option:selected").attr("id");                 

			switch (optionId) {                                                
				case "businessOption":                            
					nullifyValues();                           
					nullifyChurchFields();                          
					nullifyCompanyFields();                        
					nullifyEcommerceFields();                       
					nullifySchoolFields();                        
					initializeCompanyFields();                                  

					chosenProjectType = "businessManagementApplication";                             
					checkedDurationIdentity = "businessOneMonthDuration";                            
					allQuotationObjects.selectProjectType = "businessOption";                         
					allQuotationObjects.projectDuration = "one month";                      
					addToArrayForConfirmation("selectProjectType");                              
					removeFromArrayForConfirmation("companyName");                                 
					removeFromArrayForConfirmation("companyFurtherDescription");                          

					$("#businessQuoteForm").slideDown(353);               
					$("#churchQuoteForm").slideUp(353);             
					$("#companyQuoteForm").slideUp(353);             
					$("#ecommerceQuoteForm").slideUp(353);              
					$("#schoolQuoteForm").slideUp(353);                      

					$("#businessInfoDiv").slideDown(353);                      
					$("#churchInfoDiv").slideUp(353);                      
					$("#companyInfoDiv").slideUp(353);                      
					$("#ecommerceInfoDiv").slideUp(353);                      
					$("#schoolInfoDiv").slideUp(353);                      

					basicBusinessAmount = theJson[0][0];                           

					initializeBusinessRates(theJson[0]);                                 

					searchEOAmount = getPercentageAmount(basicBusinessAmount, checkedDurationIdentity, searchEORate);                     
					businessPDAmount = getPercentageAmount(basicBusinessAmount, checkedDurationIdentity, businessPDRate);           
					emailCAmount = getPercentageAmount(basicBusinessAmount, checkedDurationIdentity, emailCRate);                    
					customersFAmount = getPercentageAmount(basicBusinessAmount, checkedDurationIdentity, emailCRate);            

					controlMultiple = checkedCategories.length;                                    

					searchEOAmountTotal = searchEOAmount * controlMultiple;                 
					businessPDAmountTotal = businessPDAmount * controlMultiple;                
					emailCAmountTotal = emailCAmount * controlMultiple;                
					customersFAmountTotal = customersFAmount * controlMultiple;            

					totalAmountValue = searchEOAmountTotal + businessPDAmountTotal + emailCAmountTotal + customersFAmountTotal;                   

					allQuotationObjects.searchEOAmount = searchEOAmountTotal;                                     
					allQuotationObjects.businessPDAmount = businessPDAmountTotal;                                     
					allQuotationObjects.emailCAmount = emailCAmountTotal;                                     
					allQuotationObjects.customersFAmount = customersFAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     

					$("#searchEOAmount").html("US$" + searchEOAmountTotal);                  
					$("#businessPDAmount").html("US$" + businessPDAmountTotal);            
					$("#emailCAmount").html("US$" + emailCAmountTotal);                  
					$("#customersFAmount").html("US$" + customersFAmountTotal);            
					$("#totalAmount").html("US$" + totalAmountValue);                    

					allSelectedOPtions.push("searchEOAmount");                      
					allSelectedOPtions.push("businessPDAmount");                      
					allSelectedOPtions.push("emailCAmount");                      
					allSelectedOPtions.push("customersFAmount");                      

					$("#searchEOTitle").fadeIn(353);                
					$("#searchEOAmount").fadeIn(353);                  
					$("#businessPDTitle").fadeIn(353);                 
					$("#businessPDAmount").fadeIn(353);            
					$("#emailCTitle").fadeIn(353);                
					$("#emailCAmount").fadeIn(353);                  
					$("#customersFTitle").fadeIn(353);                 
					$("#customersFAmount").fadeIn(353);               
					$("#totalDemacator").fadeIn(353);             
					$("#totalTitle").fadeIn(353);                  
					$("#totalAmount").fadeIn(353);                 

					break;           
				case "churchOption":                              
					nullifyValues();                           
					nullifyBusinessFields();                     
					nullifyCompanyFields();              
					nullifyEcommerceFields();                       
					nullifySchoolFields();                        
					initializeCompanyFields();                                  

					chosenProjectType = "churchManagementApplication";                             
					checkedDurationIdentity = "churchOneMonthDuration";                               
					allQuotationObjects.selectProjectType = "churchOption";                         
					allQuotationObjects.projectDuration = "one month";                      
					addToArrayForConfirmation("selectProjectType");                              
					removeFromArrayForConfirmation("companyName");                                 
					removeFromArrayForConfirmation("companyFurtherDescription");                          

					$("#businessQuoteForm").slideUp(353);               
					$("#churchQuoteForm").slideDown(353);             
					$("#companyQuoteForm").slideUp(353);             
					$("#ecommerceQuoteForm").slideUp(353);              
					$("#schoolQuoteForm").slideUp(353);             

					$("#businessInfoDiv").slideUp(353);                      
					$("#churchInfoDiv").slideDown(353);                      
					$("#companyInfoDiv").slideUp(353);                      
					$("#ecommerceInfoDiv").slideUp(353);                      
					$("#schoolInfoDiv").slideUp(353);                      

					basicChurchAmount = theJson[1][0];                           

					initializeChurchRates(theJson[1]);                               

					searchEOAmount = getPercentageAmount(basicChurchAmount, checkedDurationIdentity, searchEORate);                     
					descriptiveUIAmount = getPercentageAmount(basicChurchAmount, checkedDurationIdentity, descriptiveUIRate);                           
					emailCAmount = getPercentageAmount(basicChurchAmount, checkedDurationIdentity, emailCRate);                    

					controlMultiple = checkedCategories.length;                                    

					searchEOAmountTotal = searchEOAmount * controlMultiple;                    
					descriptiveUIAmountTotal = descriptiveUIAmount * controlMultiple;                 
					emailCAmountTotal = emailCAmount * controlMultiple;                      

					totalAmountValue = searchEOAmountTotal + descriptiveUIAmountTotal + emailCAmountTotal;                   

					allQuotationObjects.searchEOAmount = searchEOAmountTotal;                                     
					allQuotationObjects.descriptiveUIAmount = descriptiveUIAmountTotal;                                     
					allQuotationObjects.emailCAmount = emailCAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     

					$("#searchEOAmount").html("US$" + searchEOAmountTotal);                  
					$("#descriptiveUIAmount").html("US$" + descriptiveUIAmountTotal);            
					$("#emailCAmount").html("US$" + emailCAmountTotal);                  
					$("#totalAmount").html("US$" + totalAmountValue);                   

					allSelectedOPtions.push("searchEOAmount");                   
					allSelectedOPtions.push("descriptiveUIAmount");               
					allSelectedOPtions.push("emailCAmount");                          

					$("#searchEOTitle").fadeIn(353);                
					$("#searchEOAmount").fadeIn(353);                  
					$("#descriptiveUITitle").fadeIn(353);                 
					$("#descriptiveUIAmount").fadeIn(353);            
					$("#emailCTitle").fadeIn(353);                
					$("#emailCAmount").fadeIn(353);                  
					$("#totalDemacator").fadeIn(353);             
					$("#totalTitle").fadeIn(353);                  
					$("#totalAmount").fadeIn(353);                 

					break;           
				case "companyOption":                              
					nullifyValues();                           
					nullifyBusinessFields();                     
					nullifyChurchFields();                       
					nullifyEcommerceFields();                       
					nullifySchoolFields();                        
					initializeCompanyFields();                                  

					chosenProjectType = "companyManagementApplication";                             
					checkedDurationIdentity = "companyOneMonthDuration";                           
					allQuotationObjects.selectProjectType = "companyOption";                         
					allQuotationObjects.projectDuration = "one month";                      
					addToArrayForConfirmation("selectProjectType");                              
					removeFromArrayForConfirmation("companyName");                                 
					removeFromArrayForConfirmation("companyFurtherDescription");                          

					$("#businessQuoteForm").slideUp(353);               
					$("#churchQuoteForm").slideUp(353);             
					$("#companyQuoteForm").slideDown(353);             
					$("#ecommerceQuoteForm").slideUp(353);              
					$("#schoolQuoteForm").slideUp(353);             

					$("#businessInfoDiv").slideUp(353);                      
					$("#churchInfoDiv").slideUp(353);                      
					$("#companyInfoDiv").slideDown(353);                      
					$("#ecommerceInfoDiv").slideUp(353);                      
					$("#schoolInfoDiv").slideUp(353);                      

					basicCompanyAmount = theJson[2][0];                           

					initializeCompanyRates(theJson[2]);                               

					searchEOAmount = getPercentageAmount(basicCompanyAmount, checkedDurationIdentity, searchEORate);                     
					servicesDAmount = getPercentageAmount(basicCompanyAmount, checkedDurationIdentity, servicesDRate);           
					emailCAmount = getPercentageAmount(basicCompanyAmount, checkedDurationIdentity, emailCRate);                    
					quotationPAmount = getPercentageAmount(basicCompanyAmount, checkedDurationIdentity, quotationPRate);                    

					controlMultiple = checkedCategories.length;                                    

					searchEOAmountTotal = searchEOAmount * controlMultiple;                    
					servicesDAmountTotal = servicesDAmount * controlMultiple;                 
					emailCAmountTotal = emailCAmount * controlMultiple;                      
					quotationPAmountTotal = quotationPAmount * controlMultiple;                      

					totalAmountValue = searchEOAmountTotal + servicesDAmountTotal + emailCAmountTotal + quotationPAmountTotal;                   

					allQuotationObjects.searchEOAmount = searchEOAmountTotal;                                     
					allQuotationObjects.servicesDAmount = servicesDAmountTotal;                                     
					allQuotationObjects.emailCAmount = emailCAmountTotal;                                     
					allQuotationObjects.quotationPAmount = quotationPAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     

					$("#searchEOAmount").html("US$" + searchEOAmountTotal);                  
					$("#servicesDAmount").html("US$" + servicesDAmountTotal);            
					$("#emailCAmount").html("US$" + emailCAmountTotal);                  
					$("#quotationPAmount").html("US$" + quotationPAmountTotal);                  
					$("#totalAmount").html("US$" + totalAmountValue);                   

					allSelectedOPtions.push("searchEOAmount");                   
					allSelectedOPtions.push("servicesDAmount");               
					allSelectedOPtions.push("emailCAmount");                          
					allSelectedOPtions.push("quotationPAmount");                          

					$("#searchEOTitle").fadeIn(353);                
					$("#searchEOAmount").fadeIn(353);                  
					$("#servicesDTitle").fadeIn(353);                 
					$("#servicesDAmount").fadeIn(353);            
					$("#emailCTitle").fadeIn(353);                
					$("#emailCAmount").fadeIn(353);                  
					$("#quotationPTitle").fadeIn(353);                
					$("#quotationPAmount").fadeIn(353);                  
					$("#totalDemacator").fadeIn(353);             
					$("#totalTitle").fadeIn(353);                  
					$("#totalAmount").fadeIn(353);                 

					break;           
				case "ecommerceOption":                           
					nullifyValues();                           
					nullifyBusinessFields();                     
					nullifyChurchFields();                
					nullifyCompanyFields();                               
					nullifySchoolFields();                        
					initializeCompanyFields();                                  

					chosenProjectType = "ecommerceManagementApplication";                             
					checkedDurationIdentity = "ecommerceOneMonthDuration";                                   
					allQuotationObjects.selectProjectType = "ecommerceOption";                         
					allQuotationObjects.projectDuration = "one month";                      
					addToArrayForConfirmation("selectProjectType");                              
					removeFromArrayForConfirmation("companyName");                                 
					removeFromArrayForConfirmation("companyFurtherDescription");                          

					$("#businessQuoteForm").slideUp(353);               
					$("#churchQuoteForm").slideUp(353);             
					$("#companyQuoteForm").slideUp(353);             
					$("#ecommerceQuoteForm").slideDown(353);              
					$("#schoolQuoteForm").slideUp(353);             

					$("#businessInfoDiv").slideUp(353);                      
					$("#churchInfoDiv").slideUp(353);                      
					$("#companyInfoDiv").slideUp(353);                      
					$("#ecommerceInfoDiv").slideDown(353);                      
					$("#schoolInfoDiv").slideUp(353);                      

					basicEcommerceAmount = theJson[3][0];                           

					initializeCommerceRates(theJson[3]);                               

					searchEOAmount = getPercentageAmount(basicEcommerceAmount, checkedDurationIdentity, searchEORate);                     
					businessPDAmount = getPercentageAmount(basicEcommerceAmount, checkedDurationIdentity, businessPDRate);                       
					emailCAmount = getPercentageAmount(basicEcommerceAmount, checkedDurationIdentity, emailCRate);                             
					customersFAmount = getPercentageAmount(basicEcommerceAmount, checkedDurationIdentity, customersFRate);                

					controlMultiple = checkedCategories.length;                                    

					searchEOAmountTotal = searchEOAmount * controlMultiple;                 
					businessPDAmountTotal = businessPDAmount * controlMultiple;                
					emailCAmountTotal = emailCAmount * controlMultiple;                
					customersFAmountTotal = customersFAmount * controlMultiple;            

					totalAmountValue = searchEOAmountTotal + businessPDAmountTotal + emailCAmountTotal + customersFAmountTotal;                   

					allQuotationObjects.searchEOAmount = searchEOAmountTotal;                                     
					allQuotationObjects.businessPDAmount = businessPDAmountTotal;                                     
					allQuotationObjects.emailCAmount = emailCAmountTotal;                                     
					allQuotationObjects.customersFAmount = customersFAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     

					$("#searchEOAmount").html("US$" + searchEOAmountTotal);                  
					$("#businessPDAmount").html("US$" + businessPDAmountTotal);            
					$("#emailCAmount").html("US$" + emailCAmountTotal);                  
					$("#customersFAmount").html("US$" + customersFAmountTotal);            
					$("#totalAmount").html("US$" + totalAmountValue);                  

					allSelectedOPtions.push("searchEOAmount");                             
					allSelectedOPtions.push("businessPDAmount");                             
					allSelectedOPtions.push("emailCAmount");                             
					allSelectedOPtions.push("customersFAmount");                             

					$("#searchEOTitle").fadeIn(353);                
					$("#searchEOAmount").fadeIn(353);                  
					$("#businessPDTitle").fadeIn(353);                 
					$("#businessPDAmount").fadeIn(353);            
					$("#emailCTitle").fadeIn(353);                
					$("#emailCAmount").fadeIn(353);                  
					$("#customersFTitle").fadeIn(353);                 
					$("#customersFAmount").fadeIn(353);               
					$("#totalDemacator").fadeIn(353);             
					$("#totalTitle").fadeIn(353);                  
					$("#totalAmount").fadeIn(353);                 

					break;            
				case "schoolOption":                 
					nullifyValues();                           
					nullifyBusinessFields();                     
					nullifyChurchFields();                  
					nullifyCompanyFields();                  
					nullifyEcommerceFields();                      
					initializeCompanyFields();                                  

					chosenProjectType = "schoolManagementApplication";                             
					checkedDurationIdentity = "schoolOneMonthDuration";                             
					allQuotationObjects.selectProjectType = "schoolOption";                         
					allQuotationObjects.projectDuration = "one month";                      
					addToArrayForConfirmation("selectProjectType");                              
					removeFromArrayForConfirmation("companyName");                                 
					removeFromArrayForConfirmation("companyFurtherDescription");                          

					$("#businessQuoteForm").slideUp(353);               
					$("#churchQuoteForm").slideUp(353);             
					$("#companyQuoteForm").slideUp(353);             
					$("#ecommerceQuoteForm").slideUp(353);              
					$("#schoolQuoteForm").slideDown(353);             

					$("#businessInfoDiv").slideUp(353);                      
					$("#churchInfoDiv").slideUp(353);                      
					$("#companyInfoDiv").slideUp(353);                      
					$("#ecommerceInfoDiv").slideUp(353);                      
					$("#schoolInfoDiv").slideDown(353);                      

					basicSchoolAmount = theJson[4][0];                                    

					initializeSchoolRates(theJson[4]);                                       

					searchEOAmount = getPercentageAmount(basicSchoolAmount, checkedDurationIdentity, searchEORate);                     
					descriptiveUIAmount = getPercentageAmount(basicSchoolAmount, checkedDurationIdentity, descriptiveUIRate);           
					emailCAmount = getPercentageAmount(basicSchoolAmount, checkedDurationIdentity, emailCRate);                    
					studentsTMAmount = getPercentageAmount(basicSchoolAmount, checkedDurationIdentity, studentsTMRate);                    

					controlMultiple = checkedCategories.length;                                    

					searchEOAmountTotal = searchEOAmount * controlMultiple;                   
					descriptiveUIAmountTotal = descriptiveUIAmount * controlMultiple;                    
					emailCAmountTotal = emailCAmount * controlMultiple;               
					studentsTMAmountTotal = studentsTMAmount * controlMultiple;                

					totalAmountValue = searchEOAmountTotal + descriptiveUIAmountTotal + emailCAmountTotal + studentsTMAmountTotal;                     

					allQuotationObjects.searchEOAmount = searchEOAmountTotal;                                     
					allQuotationObjects.descriptiveUIAmount = descriptiveUIAmountTotal;                                     
					allQuotationObjects.emailCAmount = emailCAmountTotal;                                     
					allQuotationObjects.studentsTMAmount = studentsTMAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#searchEOAmount").html("US$" + searchEOAmountTotal);                  
					$("#descriptiveUIAmount").html("US$" + descriptiveUIAmountTotal);            
					$("#emailCAmount").html("US$" + emailCAmountTotal);                  
					$("#studentsTMAmount").html("US$" + studentsTMAmountTotal);                     
					$("#totalAmount").html("US$" + totalAmountValue);                 

					allSelectedOPtions.push("searchEOAmount");                            
					allSelectedOPtions.push("descriptiveUIAmount");                             
					allSelectedOPtions.push("emailCAmount");                             
					allSelectedOPtions.push("studentsTMAmount");                             

					$("#searchEOTitle").fadeIn(353);                
					$("#searchEOAmount").fadeIn(353);                  
					$("#descriptiveUITitle").fadeIn(353);                 
					$("#descriptiveUIAmount").fadeIn(353);            
					$("#emailCTitle").fadeIn(353);                
					$("#emailCAmount").fadeIn(353);                  
					$("#studentsTMTitle").fadeIn(353);              
					$("#studentsTMAmount").fadeIn(353);                     
					$("#totalDemacator").fadeIn(353);             
					$("#totalTitle").fadeIn(353);                  
					$("#totalAmount").fadeIn(353);                 
					
					break;                   
				case "notInListOption":                   
					allQuotationObjects.selectProjectType = "notInListOption";                         
					removeFromArrayForConfirmation("selectProjectType");                         
					removeFromArrayForConfirmation("companyName");                                 
					removeFromArrayForConfirmation("companyFurtherDescription");                          
					hideEveryDivision();                   
					nullifyValues();                           

					break;                                      
				case "nothingSelected":                         
					allQuotationObjects.selectProjectType = "nothingSelected";                         
					removeFromArrayForConfirmation("selectProjectType");                         
					removeFromArrayForConfirmation("companyName");                                 
					removeFromArrayForConfirmation("companyFurtherDescription");                          
					hideEveryDivision();                             
					nullifyValues();                           

					break;                                      				
			}                                      
		});                              

		$("#schoolFinancialTransactions").change(function() {
			initializeSchoolRates(theJson[4]);                                     
			setFinancialTAmount("schoolFinancialTransactions", financialTRate, basicSchoolAmount);                         
		});                    

		$("#computerBasedExamination").change(function() {
			initializeSchoolRates(theJson[4]);                                     
			setComputerBEAmount("computerBasedExamination", computerBERate, basicSchoolAmount);                         
		});                    

		$("#schoolResultComputation").change(function() {               
			initializeSchoolRates(theJson[4]);                                     
			setResultCAmount("schoolResultComputation", resultCRate, basicSchoolAmount);                         
		});                       

		$("#schoolRealTimeService").change(function() {
			initializeSchoolRates(theJson[4]);                                     
			setRealTSAmount("schoolRealTimeService", realTSRate, basicSchoolAmount);                    
		});                    

		$("#schoolProjectMaintenance").change(function() {
			initializeSchoolRates(theJson[4]);                                     
			setProjectMAmount("schoolProjectMaintenance", projectMRate, basicSchoolAmount);                     
		});                         

		$("#ecommerceFinancialTransactions").change(function() {
			initializeCommerceRates(theJson[3]);                                  
			setFinancialTAmount("ecommerceFinancialTransactions", financialTRate, basicEcommerceAmount);                         
		});                    

		$("#ecommerceEmployeeManagement").change(function() {
			initializeCommerceRates(theJson[3]);                                  
			setEmployeeMAmount("ecommerceEmployeeManagement", employeeMRate, basicEcommerceAmount);                         
		});                    

		$("#ecommerceRealTimeService").change(function() {
			initializeCommerceRates(theJson[3]);                                  
			setRealTSAmount("ecommerceRealTimeService", realTSRate, basicEcommerceAmount);                    
		});                    

		$("#ecommerceProjectMaintenance").change(function() {
			initializeCommerceRates(theJson[3]);                                  
			setProjectMAmount("ecommerceProjectMaintenance", projectMRate, basicEcommerceAmount);                     
		});                         

		$("#companyFinancialTransactions").change(function() {
			initializeCompanyRates(theJson[2]);                                        
			setFinancialTAmount("companyFinancialTransactions", financialTRate, basicCompanyAmount);                         
		});                    

		$("#companyEmployeeManagement").change(function() {
			initializeCompanyRates(theJson[2]);                                        
			setEmployeeMAmount("companyEmployeeManagement", employeeMRate, basicCompanyAmount);                         
		});                    

		$("#companyRealTimeService").change(function() {
			initializeCompanyRates(theJson[2]);                                        
			setRealTSAmount("companyRealTimeService", realTSRate, basicCompanyAmount);                    
		});                    

		$("#companyProjectMaintenance").change(function() {
			initializeCompanyRates(theJson[2]);                                        
			setProjectMAmount("companyProjectMaintenance", projectMRate, basicCompanyAmount);                     
		});                         

		$("#churchFinancialTransactions").change(function() {
			initializeChurchRates(theJson[1]);                                        
			setFinancialTAmount("churchFinancialTransactions", financialTRate, basicChurchAmount);                         
		});                    

		$("#churchOfficialsManagement").change(function() {
			initializeChurchRates(theJson[1]);                                        
			setOfficialsMAmount("churchOfficialsManagement", officialsMRate, basicChurchAmount);                         
		});                    

		$("#churchRealTimeService").change(function() {
			initializeChurchRates(theJson[1]);                                        
			setRealTSAmount("churchRealTimeService", realTSRate, basicChurchAmount);                    
		});                    

		$("#churchProjectMaintenance").change(function() {
			initializeChurchRates(theJson[1]);                                        
			setProjectMAmount("churchProjectMaintenance", projectMRate, basicChurchAmount);                     
		});                         

		$("#businessFinancialTransactions").change(function() {
			initializeBusinessRates(theJson[0]);                          
			setFinancialTAmount("businessFinancialTransactions", financialTRate, basicBusinessAmount);                         
		});                    

		$("#businessEmployeeManagement").change(function() {
			initializeBusinessRates(theJson[0]);                          
			setEmployeeMAmount("businessEmployeeManagement", employeeMRate, basicBusinessAmount);                         
		});                    

		$("#businessRealTimeService").change(function() {
			initializeBusinessRates(theJson[0]);                          
			setRealTSAmount("businessRealTimeService", realTSRate, basicBusinessAmount);                    
		});                    

		$("#businessProjectMaintenance").change(function() {
			initializeBusinessRates(theJson[0]);                          
			setProjectMAmount("businessProjectMaintenance", projectMRate, basicBusinessAmount);                     
		});                    
	});                                  

	var inputConfirmationArrayValidators = function() {                                       
		if (!inArray(inputPasswordConfirmationArray, "selectProjectType")) {                           

		}                                 

		if (!inArray(inputPasswordConfirmationArray, "companyName")) {                           
			businessNameInputValidator();                       
			churchNameInputValidator();                       
			companyNameInputValidator();                              
			ecommerceNameInputValidator();                       
			schoolNameInputValidator();                         
		}                                 
		
		if (!inArray(inputPasswordConfirmationArray, "companyFurtherDescription")) {                           
			businessFurtherDescriptionValidator();                        
			churchFurtherDescriptionValidator();                        
			companyFurtherDescriptionValidator();                          
			ecommerceFurtherDescriptionValidator();                           
			schoolFurtherDescriptionValidator();                      
		}                                 
		
		if (!inArray(inputPasswordConfirmationArray, "clientFirstName")) {                           
			clientFirstNameValidator();                        
		}                                 
		
		if (!inArray(inputPasswordConfirmationArray, "clientLastName")) {                           
			clientLastNameValidator();                                 
		}                                   
		
		if (!inArray(inputPasswordConfirmationArray, "clientGender")) {                           
			clientGenderValidator();                      
		}                                 
		
		if (!inArray(inputPasswordConfirmationArray, "clientEmailAddress")) {                           
			clientEmailAddressValidator();                           
		}                                 
		
		if (!inArray(inputPasswordConfirmationArray, "clientCountry")) {                           
			clientCountryValidator();                         
		}                                 
		
		if (!inArray(inputPasswordConfirmationArray, "clientState")) {                           
			clientStateValidator();                            
		}                                 
	}                                      

	var inArray = function(array, value) {                         
		return array.indexOf(value) > -1;                                 
	}                           

	var suggestSchoolNameValidator = function() {                                    
		if ($("#suggestSchoolName").is(":checked")) {                      
			allQuotationObjects.companyNameSuggestion = "true";                
			$("#schoolNameInput").removeClass("error");                      
			$("#suggestSchoolNameError").slideUp(353);                     
			$("#schoolNameInput").val("");                        
			addToArrayForConfirmation("companyName");                               
		}                                
		else {
			if ($.trim($("#schoolNameInput").val()) === "") {                   
				$("#schoolNameInput").addClass("error");                      
				$("#suggestSchoolNameError").slideDown(353);                     
			}                                    

			allQuotationObjects.companyNameSuggestion = "false";                        
			removeFromArrayForConfirmation("companyName");                    
		}                                                     
	}                              

	var suggestEcommerceNameValidator = function() {                                          
		if ($("#suggestEcommerceName").is(":checked")) {
			allQuotationObjects.companyNameSuggestion = "true";                
			$("#ecommerceNameInput").removeClass("error");                      
			$("#suggestEcommerceNameError").slideUp(353);                     
			$("#ecommerceNameInput").val("");                        
			addToArrayForConfirmation("companyName");                               
		}                                
		else {
			if ($.trim($("#ecommerceNameInput").val()) === "") {
				$("#ecommerceNameInput").addClass("error");                      
				$("#suggestEcommerceNameError").slideDown(353);                     
			}                                    

			allQuotationObjects.companyNameSuggestion = "false";                       
			removeFromArrayForConfirmation("companyName");                       
		}                                                       
	}                                   

	var suggestCompanyNameValidator = function() {                                     
		if ($("#suggestCompanyName").is(":checked")) {
			allQuotationObjects.companyNameSuggestion = "true";                
			$("#companyNameInput").removeClass("error");                      
			$("#suggestCompanyNameError").slideUp(353);                     
			$("#companyNameInput").val("");                        
			addToArrayForConfirmation("companyName");                               
		}                                
		else {
			if ($.trim($("#companyNameInput").val()) === "") {
				$("#companyNameInput").addClass("error");                      
				$("#suggestCompanyNameError").slideDown(353);                     
			}                                    

			allQuotationObjects.companyNameSuggestion = "false";                
			removeFromArrayForConfirmation("companyName");                      
		}                                                        
	}                            

	var suggestChurchNameValidator = function() {                                    
		if ($("#suggestChurchName").is(":checked")) {
			allQuotationObjects.companyNameSuggestion = "true";                
			$("#churchNameInput").removeClass("error");                      
			$("#suggestChurchNameError").slideUp(353);                     
			$("#churchNameInput").val("");                        
			addToArrayForConfirmation("companyName");                               
		}                                
		else {
			if ($.trim($("#churchNameInput").val()) === "") {
				$("#churchNameInput").addClass("error");                      
				$("#suggestChurchNameError").slideDown(353);                     
			}                                    

			allQuotationObjects.companyNameSuggestion = "false";                
			removeFromArrayForConfirmation("companyName");                        
		}                                                           
	}                          

	var suggestBusinessNameValidator = function() {                                        
		if ($("#suggestBusinessName").is(":checked")) {
			allQuotationObjects.companyNameSuggestion = "true";                
			$("#businessNameInput").removeClass("error");                      
			$("#suggestBusinessNameError").slideUp(353);                     
			$("#businessNameInput").val("");                        
			addToArrayForConfirmation("companyName");                               
		}                                
		else {
			if ($.trim($("#businessNameInput").val()) === "") {
				$("#businessNameInput").addClass("error");                      
				$("#suggestBusinessNameError").slideDown(353);                     
			}                                    

			allQuotationObjects.companyNameSuggestion = "false";                
			removeFromArrayForConfirmation("companyName");                   
		}                                                           
	}                               

	var clientConfirmPasswordValidator = function() {                                        
		var clientConfirmPassword = $("#clientConfirmPassword").val();                          
		isProjectTypeSelected();                          

		if (allQuotationObjects.clientPassword !== clientConfirmPassword                           
			&& $("#clientRequirePaswordError").not(":visible")                                  
			&& $("#clientShortPasswordError").not(":visible")                   
			&& $("#clientPasswordSpaceError").not(":visible")) {                              
			$("#clientConfirmPassword").addClass("error");                   
			$("#clientRequirePaswordError").slideUp(353);                
			$("#clientShortPasswordError").slideUp(353);                
			$("#clientPasswordSpaceError").slideUp(353);                
			$("#clientDifferentPasswordError").slideDown(353);                
			allQuotationObjects.clientConfirmPassword = "";                    
			removeFromArrayForConfirmation("clientConfirmPassword");                      
		}                                 
		else if ($("#clientRequirePaswordError").is(":visible")                                  
			|| $("#clientShortPasswordError").is(":visible")                   
			|| $("#clientPasswordSpaceError").is(":visible")) {                             
			$("#clientPassword").addClass("error");                              
			$("#clientConfirmPassword").addClass("error");                   
			allQuotationObjects.clientConfirmPassword = "";                    
			removeFromArrayForConfirmation("clientConfirmPassword");                       
		}                                   
		else {                                 
			allQuotationObjects.clientConfirmPassword = clientConfirmPassword;                    
			$("#clientPassword").removeClass("error");                     
			$("#clientConfirmPassword").removeClass("error");                   
			$("#clientRequirePaswordError").slideUp(353);                
			$("#clientShortPasswordError").slideUp(353);                    
			$("#clientPasswordSpaceError").slideUp(353);                    
			$("#clientDifferentPasswordError").slideUp(353);                  
			addToArrayForConfirmation("clientConfirmPassword");                               
		}                                                           
	}                              

	var clientPasswordValidator = function() {                                         
		var clientPassword = $("#clientPassword").val();                          
		isProjectTypeSelected();                          

		if (clientPassword === "") {                       
			$("#clientPassword").addClass("error");                   
			$("#clientRequirePaswordError").slideDown(353);                
			$("#clientShortPasswordError").slideUp(353);                
			$("#clientPasswordSpaceError").slideUp(353);                
			$("#clientDifferentPasswordError").slideUp(353);                
			allQuotationObjects.clientPassword = "";                             
			removeFromArrayForConfirmation("clientPassword");                    
		}                             
		else if (clientPassword !== "" && clientPassword.length < 4) {                        
			$("#clientPassword").addClass("error");                   
			$("#clientRequirePaswordError").slideUp(353);                
			$("#clientShortPasswordError").slideDown(353);                
			$("#clientPasswordSpaceError").slideUp(353);                
			$("#clientDifferentPasswordError").slideUp(353);                
			allQuotationObjects.clientPassword = "";                             
			removeFromArrayForConfirmation("clientPassword");                    
		}                       
		else if (clientPassword.length > 4 && hasWhiteSpace(clientPassword)) {                           
			$("#clientPassword").addClass("error");                   
			$("#clientRequirePaswordError").slideUp(353);                
			$("#clientShortPasswordError").slideUp(353);                
			$("#clientPasswordSpaceError").slideDown(353);                
			$("#clientDifferentPasswordError").slideUp(353);                
			allQuotationObjects.clientPassword = "";                             
			removeFromArrayForConfirmation("clientPassword");                    
		}                         
		else {                            
			allQuotationObjects.clientPassword = clientPassword;                             
			$("#clientPassword").removeClass("error");                   
			$("#clientRequirePaswordError").slideUp(353);                
			$("#clientShortPasswordError").slideUp(353);                
			$("#clientPasswordSpaceError").slideUp(353);                
			$("#clientDifferentPasswordError").slideUp(353);                
			addToArrayForConfirmation("clientPassword");                               
		}                                                       
	}                              

	var clientStateValidator = function() {                                     
		var clientState = $.trim($("#clientState").val());                          
		isProjectTypeSelected();                          

		if (clientState === "") {                            
			if ($("#clientCountryError").is(":visible")) {                     
				$("#clientStateError").addClass("shiftClientLastNameError");                      		
			}                       
			else {                                 
				$("#clientStateError").removeClass("shiftClientLastNameError");                      		
			}                             

			$("#clientState").addClass("error");                       
			$("#clientStateError").slideDown(353);                    
			allQuotationObjects.clientState = "";                                     
			removeFromArrayForConfirmation("clientState");                    
		}                            
		else {                        
			$("#clientState").removeClass("error");                       
			allQuotationObjects.clientState = clientState;                                     
			addToArrayForConfirmation("clientState");                               
		}                                                     
	}                             

	var clientCountryValidator = function() {                                    
		var clientCountry = $.trim($("#clientCountry").val());                          
		isProjectTypeSelected();                             

		if (clientCountry === "") {                           
			if ($("#clientStateError").is(":visible")) {                      
				$("#clientStateError").addClass("shiftClientLastNameError");                     
			}                                   
			else {                             
				$("#clientStateError").removeClass("shiftClientLastNameError");               
			}                               

			$("#clientCountry").addClass("error");                          
			$("#clientCountryError").slideDown(353);                    
			allQuotationObjects.clientCountry = "";                       
			removeFromArrayForConfirmation("clientCountry");                    
		}                      
		else {                                
			allQuotationObjects.clientCountry = clientCountry;                       
			$("#clientCountry").removeClass("error");                          
			addToArrayForConfirmation("clientCountry");                               
		}                                                       
	}                               

	var clientEmailAddressValidator = function() {                                          
		var clientEmailAddress = $.trim($("#clientEmailAddress").val());                          
		isProjectTypeSelected();                          

		getAllEmail.done(function(theJson) {                                   
			if (clientEmailAddress === "") {                         
				$("#clientEmailAddress").addClass("error");                       

				if ($("#clientGenderError").is(":visible")) {
					$("#clientEmailAddressError").addClass("shiftClientLastNameError");             
					$("#clientEmailAlreadyUsed").addClass("shiftClientLastNameError");             
					$("#clientEmailFieldEmpty").addClass("shiftClientLastNameError");             
				}                                 
				else {                                  
					$("#clientEmailAddressError").removeClass("shiftClientLastNameError");             
					$("#clientEmailAlreadyUsed").removeClass("shiftClientLastNameError");             
					$("#clientEmailFieldEmpty").removeClass("shiftClientLastNameError");             
				}                           

				allQuotationObjects.clientEmailAddress = "";                     
				removeFromArrayForConfirmation("clientEmailAddress");                    
				$("#clientEmailFieldEmpty").slideDown(353);                      
			}                                  
			else if (!(isEmail(clientEmailAddress))) {                               
				$("#clientEmailAddress").addClass("error");                       

				if ($("#clientGenderError").is(":visible")) {
					$("#clientEmailAddressError").addClass("shiftClientLastNameError");             
					$("#clientEmailAlreadyUsed").addClass("shiftClientLastNameError");             
					$("#clientEmailFieldEmpty").addClass("shiftClientLastNameError");             
				}                                 
				else {                                  
					$("#clientEmailAddressError").removeClass("shiftClientLastNameError");             
					$("#clientEmailAlreadyUsed").removeClass("shiftClientLastNameError");             
					$("#clientEmailFieldEmpty").removeClass("shiftClientLastNameError");             
				}                           

				allQuotationObjects.clientEmailAddress = "";                     
				removeFromArrayForConfirmation("clientEmailAddress");                    
				$("#clientEmailAddressError").slideDown(353);                         
			}                            
			else if ($("#registerGuestClient").is(":checked")) {                                
				if (inArray(theJson, clientEmailAddress)) {                                    
					$("#clientEmailAddress").addClass("error");                      

					if ($("#clientGenderError").is(":visible")) {
						$("#clientEmailAddressError").addClass("shiftClientLastNameError");             
						$("#clientEmailAlreadyUsed").addClass("shiftClientLastNameError");             
						$("#clientEmailFieldEmpty").addClass("shiftClientLastNameError");             
					}                                 
					else {                                  
						$("#clientEmailAddressError").removeClass("shiftClientLastNameError");             
						$("#clientEmailAlreadyUsed").removeClass("shiftClientLastNameError");             
						$("#clientEmailFieldEmpty").removeClass("shiftClientLastNameError");             
					}                           

					allQuotationObjects.clientEmailAddress = "";                     
					removeFromArrayForConfirmation("clientEmailAddress");                    
					$("#clientEmailAlreadyUsed").slideDown(353);                         
				}                                   
				else {                                       
					$("#clientEmailAddress").removeClass("error");                      

					$("#clientEmailAddressError").removeClass("shiftClientLastNameError");             
					$("#clientEmailAlreadyUsed").removeClass("shiftClientLastNameError");             
					$("#clientEmailFieldEmpty").removeClass("shiftClientLastNameError");             

					allQuotationObjects.clientEmailAddress = clientEmailAddress;                     
					addToArrayForConfirmation("clientEmailAddress");                      
					$("#clientEmailAlreadyUsed").slideUp(353);                         
				}                                     
			}                                             
			else {                             
				allQuotationObjects.clientEmailAddress = clientEmailAddress;                     
				$("#clientEmailAddress").removeClass("error");                        

				$("#clientEmailAddressError").slideUp(353);                         
				$("#clientEmailAlreadyUsed").slideUp(353);                      
				$("#clientEmailFieldEmpty").slideUp(353);                      

				$("#clientEmailAddressError").removeClass("shiftClientLastNameError");             
				$("#clientEmailAlreadyUsed").removeClass("shiftClientLastNameError");             
				$("#clientEmailFieldEmpty").removeClass("shiftClientLastNameError");             
				
				addToArrayForConfirmation("clientEmailAddress");                               
			}                                               
		});                                   
	}                              

	var clientGenderValidator = function() {                                          
		if ((allQuotationObjects.clientMaleGender === "false")                         
			&& (allQuotationObjects.clientFemaleGender === "false")) {                       
			$("#clientGenderError").slideDown(353);                      
			$("#clientEmailAddressError").addClass("shiftClientLastNameError");             
			$("#clientEmailAlreadyUsed").addClass("shiftClientLastNameError");             
			$("#clientEmailFieldEmpty").addClass("shiftClientLastNameError");             
		}                                         
		else {                                
			$("#clientGenderError").slideUp(353);                      
			$("#clientEmailAddressError").removeClass("shiftClientLastNameError");             
			$("#clientEmailAlreadyUsed").removeClass("shiftClientLastNameError");             
			$("#clientEmailFieldEmpty").removeClass("shiftClientLastNameError");             
		}                                                             
	}                                     

	var schoolFurtherDescriptionValidator = function() {                                
		var schoolFurtherDescription = $.trim($("#schoolFurtherDescription").val());                             
		isProjectTypeSelected();                          

		if (schoolFurtherDescription === "") {
			$("#schoolFurtherDescription").addClass("error");               
			$("#schoolFurtherDescriptionError").slideDown(353);               
			allQuotationObjects.companyFurtherDescription = "";                            
			removeFromArrayForConfirmation("companyFurtherDescription");                            
		}                                    
		else {                          
			allQuotationObjects.companyFurtherDescription = schoolFurtherDescription;                            
			addToArrayForConfirmation("companyFurtherDescription");                               
		}                                                              
	}                                

	var ecommerceFurtherDescriptionValidator = function() {                               
		var ecommerceFurtherDescription = $.trim($("#ecommerceFurtherDescription").val());                           
		isProjectTypeSelected();                          

		if (ecommerceFurtherDescription === "") {
			$("#ecommerceFurtherDescription").addClass("error");               
			$("#ecommerceFurtherDescriptionError").slideDown(353);               
			allQuotationObjects.companyFurtherDescription = "";                            
			removeFromArrayForConfirmation("companyFurtherDescription");                            
		}                      
		else {                          
			allQuotationObjects.companyFurtherDescription = ecommerceFurtherDescription;                            
			addToArrayForConfirmation("companyFurtherDescription");                               
		}                                                             
	}                                 

	var companyFurtherDescriptionValidator = function() {                                        
		var companyFurtherDescription = $.trim($("#companyFurtherDescription").val());                             
		isProjectTypeSelected();                          

		if (companyFurtherDescription === "") {
			$("#companyFurtherDescription").addClass("error");               
			$("#companyFurtherDescriptionError").slideDown(353);               
			allQuotationObjects.companyFurtherDescription = "";                            
			removeFromArrayForConfirmation("companyFurtherDescription");                            
		}                      
		else {                          
			allQuotationObjects.companyFurtherDescription = companyFurtherDescription;                            
			addToArrayForConfirmation("companyFurtherDescription");                               
		}                                                            
	}                                     

	var churchFurtherDescriptionValidator = function() {                                    
		var churchFurtherDescription = $.trim($("#churchFurtherDescription").val());                             
		isProjectTypeSelected();                          

		if (churchFurtherDescription === "") {
			$("#churchFurtherDescription").addClass("error");               
			$("#churchFurtherDescriptionError").slideDown(353);               
			allQuotationObjects.companyFurtherDescription = "";                            
			removeFromArrayForConfirmation("companyFurtherDescription");                            
		}                         
		else {                          
			allQuotationObjects.companyFurtherDescription = churchFurtherDescription;                            
			addToArrayForConfirmation("companyFurtherDescription");                               
		}                                                            
	}                                    

	var businessFurtherDescriptionValidator = function() {                               
		var businessFurtherDescription = $.trim($("#businessFurtherDescription").val());                             
		isProjectTypeSelected();                          

		if (businessFurtherDescription === "") {
			$("#businessFurtherDescription").addClass("error");                  
			$("#businessFurtherDescriptionError").slideDown(353);                  
			allQuotationObjects.companyFurtherDescription = "";                            
			removeFromArrayForConfirmation("companyFurtherDescription");                            
		}                        
		else {                          
			allQuotationObjects.companyFurtherDescription = businessFurtherDescription;                            
			addToArrayForConfirmation("companyFurtherDescription");                               
		}                                                          
	}                                   

	var registerGuestClientValidator = function() {                                  
		if ($("#registerGuestClient").is(":checked")) {                             
			inputPasswordConfirmationArray = [];                             

			for (var i = 0; i < inputConfirmationArray.length; i++) {                            
				inputPasswordConfirmationArray.push(inputConfirmationArray[i]);                             
			}                                  

			clientEmailAddressValidator();                             

			allQuotationObjects.registerGuestClient = "true";                         
			$("#clientPasswordDivision").slideDown(353);                                                           
			isArrayFilledForConfirmation();                                   
		}                                      
		else {                                   
			$("#clientPassword").val("");                          
			$("#clientConfirmPassword").val("");                            

			clientEmailAddressValidator();                                      

			allQuotationObjects.registerGuestClient = "false";                         
			$("#clientPasswordDivision").slideUp(353);                      
			isArrayFilledForConfirmation();                            
		}                                                  
	}                             

	var clientLastNameValidator = function() {                                     
		var clientLastName = $.trim($("#clientLastName").val());                           
		isProjectTypeSelected();                          

		if (clientLastName === "") {                  
			if ($("#clientFirstNameError").is(":visible")) {
				$("#clientLastNameError").addClass("shiftClientLastNameError");                 
			}                                        
			else {                           
				$("#clientLastNameError").removeClass("shiftClientLastNameError");                 
			}                    

			allQuotationObjects.clientLastName = "";                          
			removeFromArrayForConfirmation("clientLastName");                           
			$("#clientLastNameError").slideDown(353);                              
			$("#clientLastName").addClass("error");                          
		}                                
		else {                              
			allQuotationObjects.clientLastName = clientLastName;                          
			addToArrayForConfirmation("clientLastName");                           
		}                                                  
	}                              

	var clientFirstNameValidator = function() {                                      
		var clientFirstName = $.trim($("#clientFirstName").val());                          
		$("#coverLevelTracker").slideUp(555);                      
		isProjectTypeSelected();                          

		if (clientFirstName === "") {                           
			$("#clientFirstName").addClass("error");             
			$("#clientFirstNameError").slideDown(353);                   
			allQuotationObjects.clientFirstName = "";                          
			removeFromArrayForConfirmation("clientFirstName");                           

			if ($("#clientLastNameError").is(":visible")) {                           
				$("#clientLastNameError").addClass("shiftClientLastNameError");                 
			}                                       
			else {
				$("#clientLastNameError").removeClass("shiftClientLastNameError");                 
			}
		}                                    
		else {                          
			if ($("#clientLastNameError").is(":visible")) {                           
				$("#clientLastNameError").addClass("shiftClientLastNameError");                    
			}                                     
			else {                                 
				$("#clientLastNameError").removeClass("shiftClientLastNameError");                 
			}                                      

			allQuotationObjects.clientFirstName = clientFirstName;                          
			addToArrayForConfirmation("clientFirstName");                               
		}                                              
	}                              

	var schoolNameInputValidator = function() {                                       
		var schoolNameInput = $.trim($("#schoolNameInput").val());                        
		$("#coverLevelTracker").slideUp(555);                      
		$("#personalInfoDiv").slideDown(353);                        
		$("#submitQuotationFailed").slideDown(353);                         

		if (schoolNameInput === "") {
			$("#schoolNameInput").addClass("error");              
			$("#suggestSchoolNameError").slideDown(353);              
			allQuotationObjects.companyNameInput = "";                              
			removeFromArrayForConfirmation("companyName");                                
		}                                 
		else {                                
			allQuotationObjects.companyNameInput = schoolNameInput;                              
			addToArrayForConfirmation("companyName");                               
		}                                                
	}                            

	var ecommerceNameInputValidator = function() {                                   
		var ecommerceNameInput = $.trim( $("#ecommerceNameInput").val());                            
		$("#coverLevelTracker").slideUp(555);                      
		$("#personalInfoDiv").slideDown(353);                        
		$("#submitQuotationFailed").slideDown(353);                         

		if (ecommerceNameInput === "") {                     
			$("#ecommerceNameInput").addClass("error");                 
			$("#suggestEcommerceNameError").slideDown(353);                
			allQuotationObjects.companyNameInput = "";                              
			removeFromArrayForConfirmation("companyName");                                
		}                                 
		else {                                
			allQuotationObjects.companyNameInput = ecommerceNameInput;                              
			addToArrayForConfirmation("companyName");                               
		}                                                     
	}                               

	var companyNameInputValidator = function() {                                    
		var companyNameInput = $.trim($("#companyNameInput").val());                           
		$("#coverLevelTracker").slideUp(555);                      
		$("#personalInfoDiv").slideDown(353);                        
		$("#submitQuotationFailed").slideDown(353);                         

		if (companyNameInput === "") {                       
			$("#companyNameInput").addClass("error");                 
			$("#suggestCompanyNameError").slideDown(353);              
			allQuotationObjects.companyNameInput = "";                              
			removeFromArrayForConfirmation("companyName");                                
		}                                 
		else {                                
			allQuotationObjects.companyNameInput = companyNameInput;                              
			addToArrayForConfirmation("companyName");                               
		}                                                     
	}                               

	var churchNameInputValidator = function() {                                
		var churchNameInput = $.trim($("#churchNameInput").val());                         
		$("#coverLevelTracker").slideUp(555);                      
		$("#personalInfoDiv").slideDown(353);                        
		$("#submitQuotationFailed").slideDown(353);                         

		if (churchNameInput === "") {                 
			$("#churchNameInput").addClass("error");              
			$("#suggestChurchNameError").slideDown(353);             
			allQuotationObjects.companyNameInput = "";                              
			removeFromArrayForConfirmation("companyName");                                
		}                                 
		else {                                
			allQuotationObjects.companyNameInput = churchNameInput;                              
			addToArrayForConfirmation("companyName");                               
		}                                                   
	}                               

	var businessNameInputValidator = function() {                             
		var businessNameInput = $.trim($("#businessNameInput").val());                          
		$("#coverLevelTracker").slideUp(555);                      
		$("#personalInfoDiv").slideDown(353);                        
		$("#submitQuotationFailed").slideDown(353);                         

		if (businessNameInput === "") {                         
			$("#businessNameInput").addClass("error");                       
			$("#suggestBusinessNameError").slideDown(353);                       
			allQuotationObjects.companyNameInput = "";                              
			removeFromArrayForConfirmation("companyName");                                
		}                                 
		else {                                
			allQuotationObjects.companyNameInput = businessNameInput;                              
			addToArrayForConfirmation("companyName");                               
		}                                        
	}                                 

	var nullifyBusinessFields = function() {                             
		$("#businessFinancialTransactions").prop("checked", false);         
		$("#businessEmployeeManagement").prop("checked", false);             
		$("#businessRealTimeService").prop("checked", false);             
		$("#businessProjectMaintenance").prop("checked", false);             
	}                           

	var nullifyChurchFields = function() {                                 
		$("#churchFinancialTransactions").prop("checked", false);             
		$("#churchOfficialsManagement").prop("checked", false);             
		$("#churchRealTimeService").prop("checked", false);             
		$("#churchProjectMaintenance").prop("checked", false);             
	}                                  

	var nullifyCompanyFields = function() {                                      
		$("#companyFinancialTransactions").prop("checked", false);             
		$("#companyEmployeeManagement").prop("checked", false);             
		$("#companyRealTimeService").prop("checked", false);             
		$("#companyProjectMaintenance").prop("checked", false);             
	}                               

	var nullifyEcommerceFields = function() {                           
		$("#ecommerceFinancialTransactions").prop("checked", false);         
		$("#ecommerceEmployeeManagement").prop("checked", false);             
		$("#ecommerceRealTimeService").prop("checked", false);             
		$("#ecommerceProjectMaintenance").prop("checked", false);             
	}                                         

	var nullifySchoolFields = function() {                                 
		$("#schoolFinancialTransactions").prop("checked", false);             
		$("#computerBasedExamination").prop("checked", false);             
		$("#schoolResultComputation").prop("checked", false);             
		$("#schoolRealTimeService").prop("checked", false);             
		$("#schoolProjectMaintenance").prop("checked", false);             
	}                                 
	
	var initializeCompanyFields = function() {                    
		$("#businessNameInput").val("");                        
		$("#suggestBusinessName").prop("checked", false);                        
		$("#businessAddressInput").val("");              
		$("#businessCountryInput").val("");                        
		$("businessStateInput").val("");                     
		$("#businessTownInput").val("");                           
		$("#businessCustomersInput").val("");                     
		$("#businessFurtherDescription").val("");                

		$("#churchNameInput").val("");                        
		$("#suggestChurchName").prop("checked", false);                        
		$("#churchAddressInput").val("");              
		$("#churchCountryInput").val("");                        
		$("churchStateInput").val("");                     
		$("#churchTownInput").val("");                           
		$("#churchFurtherDescription").val("");                  

		$("#companyNameInput").val("");                        
		$("#suggestCompanyName").prop("checked", false);                        
		$("#companyAddressInput").val("");              
		$("#companyCountryInput").val("");                        
		$("companyStateInput").val("");                     
		$("#companyTownInput").val("");                           
		$("#companyCustomersInput").val("");                     
		$("#companyFurtherDescription").val("");                  

		$("#ecommerceNameInput").val("");                        
		$("#suggestEcommerceName").prop("checked", false);                        
		$("#ecommerceAddressInput").val("");              
		$("#ecommerceCountryInput").val("");                        
		$("ecommerceStateInput").val("");                     
		$("#ecommerceTownInput").val("");                           
		$("#ecommerceCustomersInput").val("");                     
		$("#ecommerceFurtherDescription").val("");                

		$("#schoolNameInput").val("");                        
		$("#suggestSchoolName").prop("checked", false);                        
		$("#schoolAddressInput").val("");              
		$("#schoolCountryInput").val("");                        
		$("schoolStateInput").val("");                     
		$("#schoolTownInput").val("");                           
		$("#schoolCustomersInput").val("");                     
		$("#schoolFurtherDescription").val("");             
	}                              

	var isArrayFilledForConfirmation = function() {                           
		if ($("#registerGuestClient").is(":checked")) {
			isPasswordConfirmationArrayFilled();                   
		}                              
		else {                            
			isConfirmationArrayFilled();                   
		}
	}                         

	var isPasswordConfirmationArrayFilled = function() {                     
		if (inputPasswordConfirmationArray.length === inputPasswordControlArray.length) {                   
			if ($("#personalInfoDiv").is(":visible")) {                               
				$("#submitQuotationFailed").hide();                        
				$("#submitQuotation").show();                     
				return true;                        
			}                                  
		}                             
		else {                                  
			if ($("#personalInfoDiv").is(":visible")) {                               
				$("#submitQuotation").hide();                     
				$("#submitQuotationFailed").show();                     
				return false;                       
			}                             
		}                                 
	}                          

	var isConfirmationArrayFilled = function() {                     
		if (inputConfirmationArray.length === inputControlArray.length) {                   
			if ($("#personalInfoDiv").is(":visible")) {                               
				$("#submitQuotationFailed").hide();                        
				$("#submitQuotation").show();                     
				return true;                        
			}                                     
		}                             
		else {                                  
			if ($("#personalInfoDiv").is(":visible")) {                               
				$("#submitQuotation").hide();                     
				$("#submitQuotationFailed").show();                     
				return false;                       
			}                             
		}
	}                          

	var doesPasswordInputExists = function(checkData) {                
		var exists = false;                       

		for (var i = 0; i < inputPasswordConfirmationArray.length; i++) {                       
			if (inputPasswordConfirmationArray[i] === checkData) {
				exists = true;                         
			}                                     
		}                          

		return exists;                     
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

	var addToArrayForConfirmation = function(checkData) {
		if ($("#registerGuestClient").is(":checked")) {                     
			addToPasswordConfirmationArray(checkData);                       
		}                                
		else {                                      
			addToConfirmationArray(checkData);                           
		}                               

		isArrayFilledForConfirmation();                                
	}

	var addToPasswordConfirmationArray = function(checkData) {                       
		if (doesPasswordInputExists(checkData)) {
			return;                            
		}                                       
		else {                                 
			inputPasswordConfirmationArray.push(checkData);                       
		}                            
	}                     

	var addToConfirmationArray = function(checkData) {                       
		if (doesInputExists(checkData)) {
			return;                            
		}                                       
		else {                                 
			inputConfirmationArray.push(checkData);                       
		}                            
	}                     

	var removeFromArrayForConfirmation = function(removeData) {                        
		if ($("#registerGuestClient").is(":checked")) {                               
			removeFromPasswordConfirmationArray(removeData);                          
		}                                    
		else {                               
			removeFromConfirmationArray(removeData);                       
		}                                  

		isArrayFilledForConfirmation();                         
	}                            

	var removeFromPasswordConfirmationArray = function(removeData) {                       
		var index = inputPasswordConfirmationArray.indexOf(removeData);                    

		if (index > -1) {                                 
			inputPasswordConfirmationArray.splice(index, 1);                     
		}                                  
	}                        
 					
	var removeFromConfirmationArray = function(removeData) {                       
		var index = inputConfirmationArray.indexOf(removeData);                    

		if (index > -1) {                                 
			inputConfirmationArray.splice(index, 1);                     
		}                                  
	}                        
 				
	var hasWhiteSpace = function(value) {                             
		var regex = /\s/g;                                        
		return regex.test(value);                      
	}                        

	var isEmail = function(email) {                          
  		var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;                                 
  		return regex.test(email);                                    
	}                            

	var isProjectTypeSelected = function() {                            
		if (allQuotationObjects.selectProjectType === "nothingSelected") {                        

		}                           
	}                                 

	var isAppChoiceChecked = function() {                   
		if ((allQuotationObjects.webAppChoice === "false")		                  
			&& (allQuotationObjects.mobileAppChoice === "false")                         
			&& (allQuotationObjects.desktopAppChoice === "false")) {                      
			$("#selectProjectType").val("");                        
			allQuotationObjects.selectProjectType = "nothingSelected";                            
			removeFromArrayForConfirmation("selectProjectType");                         
		}                                     
	}                         

	var initializeSchoolRates = function(costArray) {                         
		searchEORate = costArray[1];                     
		descriptiveUIRate = costArray[2];             
		emailCRate = costArray[3];                    
		studentsTMRate = costArray[4];              
		financialTRate = costArray[5];            
		computerBERate = costArray[6];           
		resultCRate = costArray[7];                  
		realTSRate = costArray[8];            
		projectMRate = costArray[9];               
		twoWeeksDRate = costArray[10];                    
		oneMonthDRate = costArray[11];                       
		twoMonthsDRate = costArray[12];                 
		fiveMonthsDRate = costArray[13];                    
	}                                

	var initializeCommerceRates = function(costArray) {                         
		searchEORate = costArray[1];                     
		businessPDRate = costArray[2];           
		emailCRate = costArray[3];                    
		customersFRate = costArray[4];                    
		financialTRate = costArray[5];            
		employeeMRate = costArray[6];            
		realTSRate = costArray[7];            
		projectMRate = costArray[8];               			
		twoWeeksDRate = costArray[9];                    
		oneMonthDRate = costArray[10];                       
		twoMonthsDRate = costArray[11];                 
		fiveMonthsDRate = costArray[12];                    
	}                                

	var initializeCompanyRates = function(costArray) {                         
		searchEORate = costArray[1];                     
		servicesDRate = costArray[2];                 
		emailCRate = costArray[3];                    
		quotationPRate = costArray[4];                    
		financialTRate = costArray[5];            
		employeeMRate = costArray[6];            
		realTSRate = costArray[7];            
		projectMRate = costArray[8];               			
		twoWeeksDRate = costArray[9];                    
		oneMonthDRate = costArray[10];                       
		twoMonthsDRate = costArray[11];                 
		fiveMonthsDRate = costArray[12];                    
	}                                

	var initializeChurchRates = function(costArray) {                         
		searchEORate = costArray[1];                     
		descriptiveUIRate = costArray[2];                 
		emailCRate = costArray[3];                    
		financialTRate = costArray[4];            
		officialsMRate = costArray[5];            
		realTSRate = costArray[6];            
		projectMRate = costArray[7];               			
		twoWeeksDRate = costArray[8];                    
		oneMonthDRate = costArray[9];                       
		twoMonthsDRate = costArray[10];                 
		fiveMonthsDRate = costArray[11];                    
	}                                

	var initializeBusinessRates = function(costArray) {                         
		searchEORate = costArray[1];                     
		businessPDRate = costArray[2];           
		emailCRate = costArray[3];                    
		customersFRate = costArray[4];                    
		financialTRate = costArray[5];            
		employeeMRate = costArray[6];            
		realTSRate = costArray[7];            
		projectMRate = costArray[8];               			
		twoWeeksDRate = costArray[9];                    
		oneMonthDRate = costArray[10];                       
		twoMonthsDRate = costArray[11];                 
		fiveMonthsDRate = costArray[12];                    
	}                                

	var alterSelectedOptionsValue = function(projectType, durationIdentity) {                    
		var basicAmount = 0.00;                     
		totalAmountValue = 0.00;                                     
		controlMultiple = checkedCategories.length;                       

		switch (projectType) {                       
			case "businessManagementApplication":                                
				basicAmount = basicBusinessAmount;                         
				break;                         
			case "churchManagementApplication":                                
				basicAmount = basicChurchAmount;                         
				break;                         
			case "companyManagementApplication":                                
				basicAmount = basicCompanyAmount;                         
				break;                         
			case "ecommerceManagementApplication":                                
				basicAmount = basicEcommerceAmount;                         
				break;                         
			case "schoolManagementApplication":                                
				basicAmount = basicSchoolAmount;                         
				break;                         
		}                          

		for (var i = 0; i < allSelectedOPtions.length; i++) {                   
			switch(allSelectedOPtions[i]) {                      
				case "searchEOAmount":                              
					searchEOAmount = getPercentageAmount(basicAmount, durationIdentity, searchEORate);                            

					searchEOAmountTotal = searchEOAmount * controlMultiple;                 

					totalAmountValue = totalAmountValue + searchEOAmountTotal;                        
					
					allQuotationObjects.searchEOAmount = searchEOAmountTotal;                    
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     

					$("#searchEOAmount").html("US$" + searchEOAmountTotal);                  
					
					break;                               
				case "businessPDAmount":                      
					businessPDAmount = getPercentageAmount(basicAmount, durationIdentity, businessPDRate);                            

					businessPDAmountTotal = businessPDAmount * controlMultiple;                

					totalAmountValue = totalAmountValue + businessPDAmountTotal;                        
					
					allQuotationObjects.businessPDAmount = businessPDAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#businessPDAmount").html("US$" + businessPDAmountTotal);            
					
					break;                               
				case "servicesDAmount":                      
					servicesDAmount = getPercentageAmount(basicAmount, durationIdentity, servicesDRate);                            

					servicesDAmountTotal = servicesDAmount * controlMultiple;                 

					totalAmountValue = totalAmountValue + servicesDAmountTotal;                        

					allQuotationObjects.servicesDAmount = servicesDAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#servicesDAmount").html("US$" + servicesDAmountTotal);            

					break;                               
				case "quotationPAmount":                      
					quotationPAmount = getPercentageAmount(basicAmount, durationIdentity, quotationPRate);                            

					quotationPAmountTotal = quotationPAmount * controlMultiple;                 

					totalAmountValue = totalAmountValue + quotationPAmountTotal;                        

					allQuotationObjects.quotationPAmount = quotationPAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#quotationPAmount").html("US$" + quotationPAmountTotal);            

					break;                               
				case "descriptiveUIAmount":                      
					descriptiveUIAmount = getPercentageAmount(basicAmount, durationIdentity, descriptiveUIRate);                            

					descriptiveUIAmountTotal = descriptiveUIAmount * controlMultiple;                    

					totalAmountValue = totalAmountValue + descriptiveUIAmountTotal;                        

					allQuotationObjects.descriptiveUIAmount = descriptiveUIAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#descriptiveUIAmount").html("US$" + descriptiveUIAmountTotal);            

					break;                               
				case "emailCAmount":                      
					emailCAmount = getPercentageAmount(basicAmount, durationIdentity, emailCRate);                            

					emailCAmountTotal = emailCAmount * controlMultiple;                

					totalAmountValue = totalAmountValue + emailCAmountTotal;                        
					
					allQuotationObjects.emailCAmount = emailCAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#emailCAmount").html("US$" + emailCAmountTotal);                  
					
					break;                               
				case "customersFAmount":                      
					customersFAmount = getPercentageAmount(basicAmount, durationIdentity, customersFRate);                            

					customersFAmountTotal = customersFAmount * controlMultiple;            

					totalAmountValue = totalAmountValue + customersFAmountTotal;                        

					allQuotationObjects.customersFAmount = customersFAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#customersFAmount").html("US$" + customersFAmountTotal);            

					break;                               
				case "employeeMAmount":                      
					employeeMAmount = getPercentageAmount(basicAmount, durationIdentity, employeeMRate);                            

					employeeMAmountTotal = employeeMAmount * controlMultiple;                   

					totalAmountValue = totalAmountValue + employeeMAmountTotal;                        

					allQuotationObjects.employeeMAmount = employeeMAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#employeeMAmount").html("US$" + employeeMAmountTotal);                     
			
					break;                               
				case "officialsMAmount":                      
					officialsMAmount = getPercentageAmount(basicAmount, durationIdentity, officialsMRate);                            

					officialsMAmountTotal = officialsMAmount * controlMultiple;                   

					totalAmountValue = totalAmountValue + officialsMAmountTotal;                        

					allQuotationObjects.officialsMAmount = officialsMAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#officialsMAmount").html("US$" + officialsMAmountTotal);                     
			
					break;                               
				case "studentsTMAmount":                      
					studentsTMAmount = getPercentageAmount(basicAmount, durationIdentity, studentsTMRate);                            

					studentsTMAmountTotal = studentsTMAmount * controlMultiple;                

					totalAmountValue = totalAmountValue + studentsTMAmountTotal;                        

					allQuotationObjects.studentsTMAmount = studentsTMAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#studentsTMAmount").html("US$" + studentsTMAmountTotal);                     

					break;                               
				case "financialTAmount":                      
					financialTAmount = getPercentageAmount(basicAmount, durationIdentity, financialTRate);                            

					financialTAmountTotal = financialTAmount * controlMultiple;                  

					totalAmountValue = totalAmountValue + financialTAmountTotal;                        

					allQuotationObjects.financialTAmount = financialTAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#financialTAmount").html("US$" + financialTAmountTotal);                     

					break;                               
				case "computerBEAmount":                      
					computerBEAmount = getPercentageAmount(basicAmount, durationIdentity, computerBERate);                            

					computerBEAmountTotal = computerBEAmount * controlMultiple;                  

					totalAmountValue = totalAmountValue + computerBEAmountTotal;                        

					allQuotationObjects.computerBEAmount = computerBEAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#computerBEAmount").html("US$" + computerBEAmountTotal);                     

					break;                               
				case "resultCAmount":                      
					resultCAmount = getPercentageAmount(basicAmount, durationIdentity, resultCRate);                            

					resultCAmountTotal = resultCAmount * controlMultiple;                  

					totalAmountValue = totalAmountValue + resultCAmountTotal;                        

					allQuotationObjects.resultCAmount = resultCAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#resultCAmount").html("US$" + resultCAmountTotal);                     

					break;                               
				case "realTSAmount":                      
					realTSAmount = getPercentageAmount(basicAmount, durationIdentity, realTSRate);                            

					realTSAmountTotal = realTSAmount * controlMultiple;                     

					totalAmountValue = totalAmountValue + realTSAmountTotal;                        

					allQuotationObjects.realTSAmount = realTSAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#realTSAmount").html("US$" + realTSAmountTotal);                     

					break;                               
				case "projectMAmount":                      
					projectMAmount = getPercentageAmount(basicAmount, durationIdentity, projectMRate);                            

					projectMAmountTotal = projectMAmount *controlMultiple;               

					totalAmountValue = totalAmountValue + projectMAmountTotal;                        

					allQuotationObjects.projectMAmount = projectMAmountTotal;                                     
					allQuotationObjects.totalAmountValue = totalAmountValue;                                     
					
					$("#projectMAmount").html("US$" + projectMAmountTotal);                     

					break;                               
			}                                    
		}		                       

		$("#totalAmount").html("US$" + totalAmountValue);                    
	}                          

	var spliceArrayValue = function(myArray, identity) {                      
		var index = myArray.indexOf(identity);                    

		if (index > -1) {                                 
			myArray.splice(index, 1);                     
		}                                  
	}                     

	var setResultCAmount = function(componentId, theRate, basicAmount) {                       
		if ($("#" + componentId).is(":checked")) {
			resultCAmount = getPercentageAmount(basicAmount, checkedDurationIdentity, theRate);                     

			allSelectedOPtions.push("resultCAmount");                      

			controlMultiple = checkedCategories.length;                                    

			resultCAmountTotal = resultCAmount * controlMultiple;                  

			totalAmountValue = totalAmountValue + resultCAmountTotal;                        

			allQuotationObjects.resultCAmount = resultCAmountTotal;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#resultCAmount").html("US$" + resultCAmountTotal);                     
			$("#totalAmount").html("US$" + totalAmountValue);                    

			$("#resultCTitle").fadeIn(353);                          
			$("#resultCAmount").fadeIn(353);                      	
		}	     		              
		else {                                
			$("#resultCTitle").fadeOut(353);                          
			$("#resultCAmount").fadeOut(353);                      	

			spliceArrayValue(allSelectedOPtions, "resultCAmount");                      

			totalAmountValue = totalAmountValue - resultCAmountTotal;              

			allQuotationObjects.resultCAmount = 0.00;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#totalAmount").html("US$" + totalAmountValue);                   
		}                                       
	}                               

	var setComputerBEAmount = function(componentId, theRate, basicAmount) {                       
		if ($("#" + componentId).is(":checked")) {
			computerBEAmount = getPercentageAmount(basicAmount, checkedDurationIdentity, theRate);                     

			allSelectedOPtions.push("computerBEAmount");                      

			controlMultiple = checkedCategories.length;                                    

			computerBEAmountTotal = computerBEAmount * controlMultiple;                  

			totalAmountValue = totalAmountValue + computerBEAmountTotal;                    

			allQuotationObjects.computerBEAmount = computerBEAmountTotal;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#computerBEAmount").html("US$" + computerBEAmountTotal);                     
			$("#totalAmount").html("US$" + totalAmountValue);                        
			
			$("#computerBETitle").fadeIn(353);                          
			$("#computerBEAmount").fadeIn(353);                      	
		}	     		              
		else {                                
			$("#computerBETitle").fadeOut(353);                          
			$("#computerBEAmount").fadeOut(353);                      	

			spliceArrayValue(allSelectedOPtions, "computerBEAmount");                     

			totalAmountValue = totalAmountValue - computerBEAmountTotal;              

			allQuotationObjects.computerBEAmount = 0.00;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#totalAmount").html("US$" + totalAmountValue);                   
		}                       
	}                         

	var setProjectMAmount = function(componentId, theRate, basicAmount) {                     
		if ($("#" + componentId).is(":checked")) {
			projectMAmount = getPercentageAmount(basicAmount, checkedDurationIdentity, theRate);                     

			allSelectedOPtions.push("projectMAmount");                      

			controlMultiple = checkedCategories.length;                                    

			projectMAmountTotal = projectMAmount *controlMultiple;               

			totalAmountValue = totalAmountValue + projectMAmountTotal;                  

			allQuotationObjects.projectMAmount = projectMAmountTotal;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#projectMAmount").html("US$" + projectMAmountTotal);                     
			$("#totalAmount").html("US$" + totalAmountValue);                      
			
			$("#projectMTitle").fadeIn(353);                          
			$("#projectMAmount").fadeIn(353);                      	
		}	     		              
		else {                                
			$("#projectMTitle").fadeOut(353);                          
			$("#projectMAmount").fadeOut(353);                      	

			spliceArrayValue(allSelectedOPtions, "projectMAmount");                      

			totalAmountValue = totalAmountValue - projectMAmountTotal;              

			allQuotationObjects.projectMAmount = 0.00;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#totalAmount").html("US$" + totalAmountValue);                   
		}                                       
	}                           

	var setRealTSAmount = function(componentId, theRate, basicAmount) {
		if ($("#" + componentId).is(":checked")) {
			realTSAmount = getPercentageAmount(basicAmount, checkedDurationIdentity, theRate);                     

			allSelectedOPtions.push("realTSAmount");                      

			controlMultiple = checkedCategories.length;                                    

			realTSAmountTotal = realTSAmount * controlMultiple;                     

			totalAmountValue = totalAmountValue + realTSAmountTotal;              

			allQuotationObjects.realTSAmount = realTSAmountTotal;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#realTSAmount").html("US$" + realTSAmountTotal);                     
			$("#totalAmount").html("US$" + totalAmountValue);              
			
			$("#realTSTitle").fadeIn(353);                          
			$("#realTSAmount").fadeIn(353);                      	
		}	     		              
		else {                                
			$("#realTSTitle").fadeOut(353);                          
			$("#realTSAmount").fadeOut(353);                      	

			spliceArrayValue(allSelectedOPtions, "realTSAmount");                   

			totalAmountValue = totalAmountValue - realTSAmountTotal;              

			allQuotationObjects.realTSAmount = 0.00;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#totalAmount").html("US$" + totalAmountValue);                   
		}                       
	}

	var setEmployeeMAmount = function(componentId, theRate, basicAmount) {
		if ($("#" + componentId).is(":checked")) {
			employeeMAmount = getPercentageAmount(basicAmount, checkedDurationIdentity, theRate);                     
  
			allSelectedOPtions.push("employeeMAmount");                      

			controlMultiple = checkedCategories.length;                                    

			employeeMAmountTotal = employeeMAmount * controlMultiple;                   

			totalAmountValue = totalAmountValue + employeeMAmountTotal;                   

			allQuotationObjects.employeeMAmount = employeeMAmountTotal;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#employeeMAmount").html("US$" + employeeMAmountTotal);                     
			$("#totalAmount").html("US$" + totalAmountValue);                  
			
			$("#employeeMTitle").fadeIn(353);                          
			$("#employeeMAmount").fadeIn(353);                      	
		}	     		              
		else {                                
			$("#employeeMTitle").fadeOut(353);                          
			$("#employeeMAmount").fadeOut(353);                      	

			spliceArrayValue(allSelectedOPtions, "employeeMAmount");                       

			totalAmountValue = totalAmountValue - employeeMAmountTotal;              

			allQuotationObjects.employeeMAmount = 0.00;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#totalAmount").html("US$" + totalAmountValue);                   
		}                   
	}                          

	var setOfficialsMAmount = function(componentId, theRate, basicAmount) {
		if ($("#" + componentId).is(":checked")) {
			officialsMAmount = getPercentageAmount(basicAmount, checkedDurationIdentity, theRate);                     
  
			allSelectedOPtions.push("officialsMAmount");                      

			controlMultiple = checkedCategories.length;                                    

			officialsMAmountTotal = officialsMAmount * controlMultiple;                   

			totalAmountValue = totalAmountValue + officialsMAmountTotal;                   

			allQuotationObjects.officialsMAmount = officialsMAmountTotal;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#officialsMAmount").html("US$" + officialsMAmountTotal);                     
			$("#totalAmount").html("US$" + totalAmountValue);                  
			
			$("#officialsMTitle").fadeIn(353);                          
			$("#officialsMAmount").fadeIn(353);                      	
		}	     		              
		else {                                
			$("#officialsMTitle").fadeOut(353);                          
			$("#officialsMAmount").fadeOut(353);                      	

			spliceArrayValue(allSelectedOPtions, "officialsMAmount");                       

			totalAmountValue = totalAmountValue - officialsMAmountTotal;              

			allQuotationObjects.officialsMAmount = 0.00;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#totalAmount").html("US$" + totalAmountValue);                   
		}                   
	}                          

	var setFinancialTAmount = function(componentId, theRate, basicAmount) {
		if ($("#" + componentId).is(":checked")) {
			financialTAmount = getPercentageAmount(basicAmount, checkedDurationIdentity, theRate);                     

			allSelectedOPtions.push("financialTAmount");                      

			controlMultiple = checkedCategories.length;                                    

			financialTAmountTotal = financialTAmount * controlMultiple;                  

			totalAmountValue = totalAmountValue + financialTAmountTotal;                    
 
			allQuotationObjects.financialTAmount = financialTAmountTotal;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#financialTAmount").html("US$" + financialTAmountTotal);                     
			$("#totalAmount").html("US$" + totalAmountValue);                      
			
			$("#financialTTitle").fadeIn(353);                          
			$("#financialTAmount").fadeIn(353);                      	
		}	     		              
		else {                                
			$("#financialTTitle").fadeOut(353);                          
			$("#financialTAmount").fadeOut(353);                      	

			spliceArrayValue(allSelectedOPtions, "financialTAmount");                       

			totalAmountValue = totalAmountValue - financialTAmountTotal;              

			allQuotationObjects.financialTAmount = 0.00;                                     
			allQuotationObjects.totalAmountValue = totalAmountValue;                                     
			
			$("#totalAmount").html("US$" + totalAmountValue);                   
		}                     
	}

	var nullifyValues = function() {                     
		chosenProjectType = "";                             
		checkedDurationIdentity = "";                             

		searchEORate = 0.00;                     
		businessPDRate = 0.00;           
		emailCRate = 0.00;                    
		quotationPRate = 0.00;           
		customersFRate = 0.00;                    
		financialTRate = 0.00;            
		employeeMRate = 0.00;            
		officialsMRate = 0.00;                   
		realTSRate = 0.00;            
		projectMRate = 0.00;               
		servicesDRate = 0.00;                 
		descriptiveUIRate = 0.00;             
		studentsTMRate = 0.00;              
		computerBERate = 0.00;           
		resultCRate = 0.00;                  
		twoWeeksDRate = 0.00;                   
		oneMonthDRate = 0.00;                   
		twoMonthsDRate = 0.00;                  
		fiveMonthsDRate = 0.00;                

		searchEOAmount = 0.00;                     
		businessPDAmount = 0.00;           
		emailCAmount = 0.00;                    
		quotationPAmount = 0.00;                    
		customersFAmount = 0.00;                    
		financialTAmount = 0.00;            
		employeeMAmount = 0.00;            
		officialsMAmount = 0.00;                 
		realTSAmount = 0.00;            
		projectMAmount = 0.00;               
		servicesDAmount = 0.00;                 
		descriptiveUIAmount = 0.00;             
		studentsTMAmount = 0.00;              
		computerBEAmount = 0.00;           
		resultCAmount = 0.00;                  
		totalAmountValue = 0.00;                    
		controlMultiple = 0;                       
		allSelectedOPtions = [];                    

		allQuotationObjects.selectProjectType = "";                         
		allQuotationObjects.searchEOAmount = 0.00;                 
		allQuotationObjects.businessPDAmount = 0.00;                    
		allQuotationObjects.emailCAmount = 0.00;                    
		allQuotationObjects.customersFAmount = 0.00;                    
		allQuotationObjects.quotationPAmount = 0.00;                    
		allQuotationObjects.financialTAmount = 0.00;                    
		allQuotationObjects.employeeMAmount = 0.00;                    
		allQuotationObjects.officialsMAmount = 0.00;                    
		allQuotationObjects.realTSAmount = 0.00;                    
		allQuotationObjects.projectMAmount = 0.00;                    
		allQuotationObjects.servicesDAmount = 0.00;                    
		allQuotationObjects.descriptiveUIAmount = 0.00;                    
		allQuotationObjects.studentsTMAmount = 0.00;                    
		allQuotationObjects.computerBEAmount = 0.00;                    
		allQuotationObjects.resultCAmount = 0.00;                    
		allQuotationObjects.totalAmountValue = 0.00;                         	
		allQuotationObjects.additionalOption = "";                        	
		allQuotationObjects.projectDuration = "one month";                          
		allQuotationObjects.paymentChoice = "outright";                      

		$("#searchEOTitle").fadeOut(353);                
		$("#searchEOAmount").fadeOut(353);                  
		$("#businessPDTitle").fadeOut(353);                 
		$("#businessPDAmount").fadeOut(353);            
		$("#emailCTitle").fadeOut(353);                
		$("#emailCAmount").fadeOut(353);                  
		$("#quotationPTitle").fadeOut(353);                
		$("#quotationPAmount").fadeOut(353);                  
		$("#customersFTitle").fadeOut(353);                 
		$("#customersFAmount").fadeOut(353);                
		$("#financialTTitle").fadeOut(353);                          
		$("#financialTAmount").fadeOut(353);                      	
		$("#employeeMTitle").fadeOut(353);                          
		$("#employeeMAmount").fadeOut(353);                      	
		$("#officialsMTitle").fadeOut(353);                          
		$("#officialsMAmount").fadeOut(353);                      	
		$("#realTSTitle").fadeOut(353);                          
		$("#realTSAmount").fadeOut(353);                      	
		$("#projectMTitle").fadeOut(353);                          
		$("#projectMAmount").fadeOut(353);                      	
		$("#servicesDTitle").fadeOut(353);              
		$("#servicesDAmount").fadeOut(353);               
		$("#descriptiveUITitle").fadeOut(353);                 
		$("#descriptiveUIAmount").fadeOut(353);            
		$("#studentsTMTitle").fadeOut(353);              
		$("#studentsTMAmount").fadeOut(353);                     
		$("#computerBETitle").fadeOut(353);                    
		$("#computerBEAmount").fadeOut(353);                    
		$("#resultCTitle").fadeOut(353);                       
		$("#resultCAmount").fadeOut(353);                     
		$("#totalDemacator").fadeOut(353);             
		$("#totalTitle").fadeOut(353);                  
		$("#totalAmount").fadeOut(353);                 
	}                          
	
	var getPercentageAmount = function(amount, durationIdentity, rate) {
		var finalValue = 0.00;                            
		var initialValue = (rate / 100) * amount;                    

		switch (durationIdentity) {                               
			case "businessTwoWeeksDuration":                              
				finalValue = (twoWeeksDRate / 100) * initialValue;                            
				break;                          
			case "businessOneMonthDuration":                              
				finalValue = (oneMonthDRate / 100) * initialValue;                            
				break;                          
			case "businessTwoMonthsDuration":                              
				finalValue = (twoMonthsDRate / 100) * initialValue;                            
				break;                          
			case "businessFiveMonthsDuration":                              
				finalValue = (fiveMonthsDRate / 100) * initialValue;                            
				break;                          
			case "churchTwoWeeksDuration":                              
				finalValue = (twoWeeksDRate / 100) * initialValue;                            
				break;                          
			case "churchOneMonthDuration":                              
				finalValue = (oneMonthDRate / 100) * initialValue;                            
				break;                          
			case "churchTwoMonthsDuration":                              
				finalValue = (twoMonthsDRate / 100) * initialValue;                            
				break;                          
			case "churchFiveMonthsDuration":                              
				finalValue = (fiveMonthsDRate / 100) * initialValue;                            
				break;                          
			case "companyTwoWeeksDuration":                              
				finalValue = (twoWeeksDRate / 100) * initialValue;                            
				break;                          
			case "companyOneMonthDuration":                              
				finalValue = (oneMonthDRate / 100) * initialValue;                            
				break;                          
			case "companyTwoMonthsDuration":                              
				finalValue = (twoMonthsDRate / 100) * initialValue;                            
				break;                          
			case "companyFiveMonthsDuration":                              
				finalValue = (fiveMonthsDRate / 100) * initialValue;                            
				break;                          
			case "ecommerceTwoWeeksDuration":                              
				finalValue = (twoWeeksDRate / 100) * initialValue;                            
				break;                          
			case "ecommerceOneMonthDuration":                              
				finalValue = (oneMonthDRate / 100) * initialValue;                            
				break;                          
			case "ecommerceTwoMonthsDuration":                              
				finalValue = (twoMonthsDRate / 100) * initialValue;                            			
				break;                          
			case "ecommerceFiveMonthsDuration":                              
				finalValue = (fiveMonthsDRate / 100) * initialValue;                            
				break;                          
			case "schoolTwoWeeksDuration":                              
				finalValue = (twoWeeksDRate / 100) * initialValue;                            
				break;                          
			case "schoolOneMonthDuration":                              
				finalValue = (oneMonthDRate / 100) * initialValue;                            
				break;                          
			case "schoolTwoMonthsDuration":                              
				finalValue = (twoMonthsDRate / 100) * initialValue;                            
				break;                          
			case "schoolFiveMonthsDuration":                              
				finalValue = (fiveMonthsDRate / 100) * initialValue;                            			
				break;                          
		}                                 

		return finalValue;                             
	}                              

	var getResponseObject = function(response) {                                 
		var responseObject = {};                                   

		if (response.constructor === Object) {                            
			responseObject = response;                          
		}                               
		else if (response.constructor === String) {                           
			responseObject = JSON.parse(response);                                 
		}                                

		return responseObject;                   
	}                   

	var hideEveryDivision = function() {                        
		$("#businessQuoteForm").slideUp(353);               
		$("#churchQuoteForm").slideUp(353);             
		$("#companyQuoteForm").slideUp(353);             
		$("#ecommerceQuoteForm").slideUp(353);              
		$("#schoolQuoteForm").slideUp(353);              
		$("#projectDurationDiv").slideUp(353);                    

		$("#businessFinancialTransactions").prop("checked", false);         
		$("#businessEmployeeManagement").prop("checked", false);             
		$("#businessRealTimeService").prop("checked", false);             
		$("#businessProjectMaintenance").prop("checked", false);             
		$("#businessFurtherDescription").val("");                

		$("#churchFinancialTransactions").prop("checked", false);             
		$("#churchOfficialsManagement").prop("checked", false);             
		$("#churchRealTimeService").prop("checked", false);             
		$("#churchProjectMaintenance").prop("checked", false);             
		$("#churchFurtherDescription").val("");                  

		$("#companyFinancialTransactions").prop("checked", false);             
		$("#companyEmployeeManagement").prop("checked", false);             
		$("#companyRealTimeService").prop("checked", false);             
		$("#companyProjectMaintenance").prop("checked", false);             
		$("#companyFurtherDescription").val("");                  

		$("#ecommerceFinancialTransactions").prop("checked", false);         
		$("#ecommerceEmployeeManagement").prop("checked", false);             
		$("#ecommerceRealTimeService").prop("checked", false);             
		$("#ecommerceProjectMaintenance").prop("checked", false);             
		$("#ecommerceFurtherDescription").val("");                

		$("#schoolFinancialTransactions").prop("checked", false);             
		$("#computerBasedExamination").prop("checked", false);             
		$("#schoolResultComputation").prop("checked", false);             
		$("#schoolRealTimeService").prop("checked", false);             
		$("#schoolProjectMaintenance").prop("checked", false);             
		$("#schoolFurtherDescription").val("");             
	}                     

	var checkProjectCategory = function() {                        
		if ($("#webAppChoice").is(":checked")                        
			|| $("#mobileAppChoice").is(":checked")                                
			|| $("#desktopAppChoice").is(":checked")) {                       
			$("#coverLevelTracker").slideDown(555);                      
			$("#projectType").fadeIn(353);                         
		}                               
		else {                              
			$("#secondLineTracker").addClass("secondLineTracker-off");              
			$("#secondLineTracker").removeClass("secondLineTracker-on");                     
			$("#thirdLineTracker").addClass("thirdLineTracker-off");              
			$("#thirdLineTracker").removeClass("thirdLineTracker-on");                
			$("#fourthLineTracker").addClass("fourthLineTracker-off");              
			$("#fourthLineTracker").removeClass("fourthLineTracker-on");                     
			$("#firstCircle").addClass("firstCircle");             
			$("#firstCircle").removeClass("firstCircle-on-small");                    
			$("#secondCircle").addClass("secondCircle-off");          
			$("#secondCircle").removeClass("secondCircle-on");                  
			$("#secondCircle").removeClass("secondCircle-on-small");                  
			$("#thirdCircle").addClass("thirdCircle-first-off");                  
			$("#thirdCircle").removeClass("thirdCircle-second-off");                   
			$("#thirdCircle").removeClass("thirdCircle-on");                   
			$("#thirdCircle").removeClass("thirdCircle-on-small");                   
			$("#fourthCircle").addClass("fourthCircle-first-off");                        
			$("#fourthCircle").removeClass("fourthCircle-second-off");                        
			$("#fourthCircle").removeClass("fourthCircle-on");                        
			$("#secondTitle").addClass("secondTitle-off");                     
			$("#secondTitle").removeClass("secondTitle-on");                     
			$("#thirdTitle").addClass("thirdTitle-off");                     
			$("#thirdTitle").removeClass("thirdTitle-on");                     
			$("#fourthTitle").addClass("fourthTitle-off");                     
			$("#fourthTitle").removeClass("fourthTitle-on");                     
			$("#coverLevelTracker").slideUp(555);                   
			$("#projectType").fadeOut(353);                         

			hideEveryDivision();                       
			nullifyValues();                          
		}                                     
	}                           

}(jQuery));                   


