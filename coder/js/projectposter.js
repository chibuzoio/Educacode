
(function($) {                  

	var stringPart = "";                     
	var	builtString = "";                                  
	var definitions = {};                          
	var searchArrayLength = 0;                                 
	var stringTokensArray = [];                                      
	var isCodeInserted = false;                             
	var newProjectCreator = {};                                   
	var inputTrackerArray = [];                              
	var newProjectSubtitle = {};                                 
	var	foundProjectTitles = [];                                
	var	searchIndexPosition = -1;                                 
	var projectSubtitleArray = [];                                   
	var newProjectRequirement = {};                                 
	var	previousIndexPosition = -1;                                    
	var	isUpArrowKeyPressed = false;                                        
	var projectRequirementArray = [];                                
	var	isDownArrowKeyPressed = false;                                                
	var twoDimensionalArraySubarray = [];                              
	var projectInputControlArray = ["title", "category",                                              
	"objective", "developer", "languages", "toolsUsed", "image"];                                       
	var projectSubtitleInputControlArray = ["title", "subtitle", "article"];                                          
	var projectRequirementInputControlArray = ["projectTitle", "requirementTitle", "requirementBody"];                                          

	definitions.title = "";                  
	definitions.meaning = "";                      

	newProjectCreator.image = {};                                        
	newProjectCreator.title = "";                          
	newProjectCreator.library = "";                         
	newProjectCreator.category = "";                          
	newProjectCreator.objective = "";                          
	newProjectCreator.developer = "";                          
	newProjectCreator.toolsUsed = "";                          
	newProjectCreator.languages = "";                           

	newProjectSubtitle.title = "";                               
	newProjectSubtitle.article = "";                                   
	newProjectSubtitle.subtitle = "";                                  

	newProjectRequirement.projectTitle = "";                                               
	newProjectRequirement.requirementTitle = "";                                               
	newProjectRequirement.requirementBody = "";                                               

	var getJSONWords = $.getJSON('../Educacode/coderback/jsondefinitions.php');                       
	var getJSONProjectTitles = $.getJSON('../Educacode/coderback/jsonprojecttitles.php');                       
	var getJSONRequirementTitles = $.getJSON('../Educacode/coderback/jsonrequirementtitles.php');                       
	
	$("#addProjectRequirementButton").click(function() {                                               
		if (inputTrackerArray.length === projectSubtitleInputControlArray.length) {                                         
			$.post("../Educacode/coderback/createrequirementserver.php", newProjectRequirement).done(function(theResponse) {                            
				$("#parentProjectTitleForRequirement").val("");                               
				$("#addProjectRequirementTitle").val("");                       
				$("#addProjectRequirementBody").val("");                       
				newProjectRequirement.requirementTitle = "";                   
				newProjectRequirement.requirementBody = "";                   
				newProjectRequirement.projectTitle = "";                   
				inputTrackerArray = [];                                                    
				console.log(theResponse);                                              
			});                                              
		}                                                 
	});                                           

	$("#addProjectRequirementBody").blur(function() {                                
		newProjectRequirement.requirementBody = $.trim($("#addProjectRequirementBody").val());                                     
		
		if (newProjectRequirement.requirementBody !== "") {                                      
			newProjectRequirement.requirementBody = upperCaseFirstLetter(newProjectRequirement.requirementBody);                                   
			$("#addProjectRequirementBody").removeClass("error");                               
			addToInputTrackerArray("requirementBody");                                    
		}                                                 
		else {                                           
			$("#addProjectRequirementBody").val("Where Is The requirementBody???");                                     
			$("#addProjectRequirementBody").addClass("error");                               
			removeFromInputTrackerArray("requirementBody");                                 
		}                                        
	});                                        

	$("#addProjectRequirementBody").focus(function() {                                
		if ($("#addProjectRequirementBody").val().indexOf("Where Is The Requirement???") > -1) {                                
			$("#addProjectRequirementBody").val("");                                      
		}                                                               

		$("#addProjectRequirementBody").removeClass("error");                                     
		removeFromInputTrackerArray("requirementBody");                             
	});                                        

	$("#addProjectRequirementTitle").blur(function() {                                              
		newProjectRequirement.requirementTitle = $.trim($("#addProjectRequirementTitle").val());                                          
	 	newProjectRequirement.requirementTitle = removeMultipleSpaces(newProjectRequirement.requirementTitle);                                    
	 	newProjectRequirement.requirementTitle = toTitleCase(newProjectRequirement.requirementTitle);                                     

	 	if (newProjectRequirement.requirementTitle === "") {                                
			$("#addProjectRequirementTitle").val("Idiot! Fill This Field!!!");                               
			$("#addProjectRequirementTitle").addClass("error");                    
			removeFromInputTrackerArray("requirementTitle");                                     
	 	}                                               
	 	else {                                                           
	 		if (inArray(projectRequirementArray, newProjectRequirement.requirementTitle)) {                                    
	 			$("#addProjectRequirementTitle").addClass("error");                                         
	 			$("#addProjectRequirementTitle").val("Idiot! This Project Already Has This requirementTitle!!!");                               
	 			removeFromInputTrackerArray("requirementTitle");                                 
	 		}                                                            
	 		else {                                             
				$("#addProjectRequirementTitle").removeClass("error");                               
				addToInputTrackerArray("requirementTitle");                               	
	 		}                                                               
	 	}                                   		
	});                                                                  

	$("#addProjectRequirementTitle").focus(function() {                                              
		$("#addProjectRequirementTitle").removeClass("error");                    
		removeFromInputTrackerArray("requirementTitle");                                     

		var chosenProject = $.trim($("#parentProjectTitleForRequirement").val());                                  
		chosenProject = removeMultipleSpaces(chosenProject);                              
		chosenProject = toTitleCase(chosenProject);                                

		if (chosenProject === "") {                              
			$("#parentProjectTitleForRequirement").addClass("error");                   
			$("#parentProjectTitleForRequirement").val("Do You Want To Write subtitle For An Imaginary Project???");                             
		}                                                
		else if (newProjectRequirement.projectTitle !== "" && chosenProject !== newProjectRequirement.projectTitle) {                               
			$("#parentProjectTitleForRequirement").addClass("error");                   
			$("#parentProjectTitleForRequirement").val("Hmmmmm Are You The Developer Of This Project???");                         
			removeFromInputTrackerArray("projectTitle");                                      
			newProjectRequirement.projectTitle = "";                                    
		}                                                   
		else if (newProjectRequirement.projectTitle === "" && chosenProject !== "") {                                       
			checkChosenProjectTitleForRequirement(chosenProject);                                                  
		}                                                        
		else if (newProjectRequirement.projectTitle !== "" && chosenProject !== "") {                                       
			checkChosenProjectTitleForRequirement(chosenProject);                                                  
		}                                                          
		else if (chosenProject !== "") {                                                             
			checkChosenProjectTitleForRequirement(chosenProject);                                      
		}                                                               

		var requirementRequestObject = {};                                   
		requirementRequestObject.requirementTableName = twoDimensionalArraySubarray[3];                                       

		$.post("../Educacode/coderback/jsonrequirementtitles.php", requirementRequestObject).done(function(theResponse) {                                  
			projectRequirementArray = theResponse;                                           
			console.log("gotten projectRequirementArray is " + JSON.stringify(projectRequirementArray));
		});                                                                         
	});                                                           

	$("#parentProjectTitleForRequirement").focus(function() {                                    
		$("#parentProjectTitleForRequirement").removeClass("error");                                    
	});                                             
				
	$("#parentProjectTitleForRequirement").blur(function() {                                    
		$("#existingProjectDropdownForRequirement").fadeOut(353);                            
	});                                           

	$("#existingProjectDropdownForRequirement").click(function(event) {                         
		var clicked = $(event.target);                           

		if (clicked.is("b")) {                          
			$("#parentProjectTitleForRequirement").val(clicked.text());                   
			newProjectRequirement.projectTitle = clicked.text();                                          
			addToInputTrackerArray("projectTitle");                               
		}                             
		else if (clicked.is("div")) {                         
			$("#parentProjectTitleForRequirement").val(clicked.find("b").text());                   
			newProjectRequirement.projectTitle = clicked.text();                                          
			addToInputTrackerArray("projectTitle");                               
		}                                
	});                       

	$("#parentProjectTitleForRequirement").keyup(function(event) {                              
		switch (event.keyCode) {                                
			case 38:                                          
				isUpArrowKeyPressed = true;                                   
			
				if (isDownArrowKeyPressed === true) {                              
					searchIndexPosition = searchIndexPosition - 2;                             
					requirementProjectTitleSearchKeyup();                                      
				}                                            
				else {                                         
					requirementProjectTitleSearchKeyup();                              
				}                                  

				isDownArrowKeyPressed = false;                                

				break;                         
			case 40:                                        
				isDownArrowKeyPressed = true;                                       

				if (isUpArrowKeyPressed === true) {                          
					searchIndexPosition = searchIndexPosition + 2;                            
					requirementDownKeyPressForProjectTitleSearch();                                      
				}                                            
				else {                                         
					requirementDownKeyPressForProjectTitleSearch();                        
				}                                  
				
				isUpArrowKeyPressed = false;                                 
	
				break;                          
			case 13:                           
				event.preventDefault();                           			

				if (isUpArrowKeyPressed === true || isDownArrowKeyPressed === true) {                                            
					$("#existingProjectDropdownForRequirement").fadeOut(353);                                                                                                
					$("#parentProjectTitleForRequirement").val(newProjectRequirement.projectTitle);                          
					twoDimensionalArraySubarray = getSubarrayContainingThisElement(getJSONProjectTitles, newProjectRequirement.projectTitle);                                                
					addToInputTrackerArray("projectTitle");                                   
				}                                                         

				builtString = "";                                     
				searchArrayLength = 0;                            
				foundProjectTitles = [];                            
				searchIndexPosition = -1;                              
				previousIndexPosition = -1;                                         
				isUpArrowKeyPressed = false;                                      
				isDownArrowKeyPressed = false;                               

				break;                                        
			default:                                    
				requirementProjectTitleSearchResultKeyup();                                                 
		}                                     
	});                             

	$("#editProjectLanguage").keydown(function(event) {                                  
		processProjectLanguageInputEvent(event);                                  
	});                                                    

	$("#addProjectSubtitleButton").click(function() {                                               
		if (inputTrackerArray.length === projectSubtitleInputControlArray.length) {                                         
			$.post("../Educacode/coderback/createsubtitleserver.php", newProjectSubtitle).done(function(theResponse) {                            
				$("#parentProjectTitleForSubtitle").val("");                               
				$("#addProjectSubtitleBody").val("");                       
				$("#addProjectSubtitle").val("");                       
				newProjectSubtitle.subtitle = "";                   
				newProjectSubtitle.article = "";                   
				newProjectSubtitle.title = "";                   
				inputTrackerArray = [];                                                    
				console.log(theResponse);                                              
			});                                              
		}                                                 
	});                                           

	$("#addProjectSubtitleBody").blur(function() {                                
		newProjectSubtitle.article = $.trim($("#addProjectSubtitleBody").val());                                     
		
		if (newProjectSubtitle.article !== "") {                                      
			newProjectSubtitle.article = upperCaseFirstLetter(newProjectSubtitle.article);                                   
			$("#addProjectSubtitleBody").removeClass("error");                               
			addToInputTrackerArray("article");                                    
		}                                                 
		else {                                           
			$("#addProjectSubtitleBody").val("Where Is The Article???");                                     
			$("#addProjectSubtitleBody").addClass("error");                               
			removeFromInputTrackerArray("article");                                 
		}                                        
	});                                        

	$("#addProjectSubtitleBody").focus(function() {                                
		if ($("#addProjectSubtitleBody").val().indexOf("Where Is The Article???") > -1) {                                
			$("#addProjectSubtitleBody").val("");                                      
		}                                                               

		$("#addProjectSubtitleBody").removeClass("error");                                     
		removeFromInputTrackerArray("article");                             
	});                                        

	$("#addProjectSubtitle").blur(function() {                                
	 	newProjectSubtitle.subtitle = $.trim($("#addProjectSubtitle").val());                                          
	 	newProjectSubtitle.subtitle = removeMultipleSpaces(newProjectSubtitle.subtitle);                                    
	 	newProjectSubtitle.subtitle = toTitleCase(newProjectSubtitle.subtitle);                                     

	 	if (newProjectSubtitle.subtitle === "") {                                
			$("#addProjectSubtitle").val("Idiot! Fill This Field!!!");                               
			$("#addProjectSubtitle").addClass("error");                    
			removeFromInputTrackerArray("subtitle");                                     
	 	}                                               
	 	else {                                                           
	 		if (inArray(projectSubtitleArray, newProjectSubtitle.subtitle)) {                                    
	 			$("#addProjectSubtitle").addClass("error");                                         
	 			$("#addProjectSubtitle").val("Idiot! This Project Already Has This Subtitle!!!");                               
	 			removeFromInputTrackerArray("subtitle");                                 
	 		}                                                            
	 		else {                                             
				$("#addProjectSubtitle").removeClass("error");                               
				addToInputTrackerArray("subtitle");                               	
	 		}                                      
	 	}                                   
	});                                                

	$("#addProjectSubtitle").focus(function() {                                
		$("#addProjectSubtitle").removeClass("error");                    
		removeFromInputTrackerArray("subtitle");                                     
	});                                                

	$("#parentProjectTitleForSubtitle").keydown(function(event) {                              
		if (event.keyCode === 9) {                                     
			if (newProjectSubtitle.title === "") {                               
				newProjectSubtitle.title = $.trim($("#parentProjectTitleForSubtitle").val());                              
				newProjectSubtitle.title = removeMultipleSpaces(newProjectSubtitle.title);                                     
				newProjectSubtitle.title = toTitleCase(newProjectSubtitle.title);                                     

				if (inJSONTwoDimensionalArray(getJSONProjectTitles, newProjectSubtitle.title)) {                                   
					$("#parentProjectTitleForSubtitle").val(newProjectSubtitle.title);                                
					addToInputTrackerArray("title");                                          
				}                                                        
				else {                                                         
					newProjectSubtitle.title = "";                              
					removeFromInputTrackerArray("title");                              
				}                                                
			}                                                        
			else {                                              
				$("#parentProjectTitleForSubtitle").val(newProjectSubtitle.title);                               
				addToInputTrackerArray("title");                              
			}                                         
		}                                  
	});                                      

	$("#parentProjectTitleForSubtitle").focus(function() {                                    
		$("#parentProjectTitleForSubtitle").removeClass("error");                                    

		if (newProjectSubtitle.title === "") {                                       
			$("#parentProjectTitleForSubtitle").val("");                                     
			removeFromInputTrackerArray("title");                                    
		}                                            
		else {                                              
			$("#parentProjectTitleForSubtitle").val(newProjectSubtitle.title);                                     
			newProjectSubtitle.title = "";                                            
		}                                      
	});                                             
				
	$("#parentProjectTitleForSubtitle").blur(function() {                                    
		$("#existingProjectDropdown").fadeOut(353);                            
		var chosenProject = $.trim($("#parentProjectTitleForSubtitle").val());                                  
		chosenProject = removeMultipleSpaces(chosenProject);                              
		chosenProject = toTitleCase(chosenProject);                                

		if (chosenProject === "") {                              
			$("#parentProjectTitleForSubtitle").addClass("error");                   
			$("#parentProjectTitleForSubtitle").val("Do You Want To Write subtitle For An Imaginary Project???");                             
		}                                                
		else if (newProjectSubtitle.title !== "" && chosenProject !== newProjectSubtitle.title) {                               
			$("#parentProjectTitleForSubtitle").addClass("error");                   
			$("#parentProjectTitleForSubtitle").val("Hmmmmm Are You The Developer Of This Project???");                         
			removeFromInputTrackerArray("title");                                      
			newProjectSubtitle.title = "";                                    
		}                                                   
		else if (newProjectSubtitle.title === "" && chosenProject !== "") {                                       
			checkChosenProjectTitle(chosenProject);                                                  
		}                                                        
		else if (newProjectSubtitle.title !== "" && chosenProject !== "") {                                       
			checkChosenProjectTitle(chosenProject);                                                  
		}                                                          

		var subtitlesRequestObject = {};                                   
		subtitlesRequestObject.projectTableName = twoDimensionalArraySubarray[2];                                       

		$.post("../Educacode/coderback/jsonprojectsubtitles.php", subtitlesRequestObject).done(function(theResponse) {                                  
			projectSubtitleArray = theResponse;                                           
		});                                                                        
	});                                           

	$("#existingProjectDropdown").click(function(event) {                         
		var clicked = $(event.target);                           

		if (clicked.is("b")) {                          
			$("#parentProjectTitleForSubtitle").val(clicked.text());                   
		}                             
		else if (clicked.is("div")) {                         
			$("#parentProjectTitleForSubtitle").val(clicked.find("b").text());                   
		}                                
	});                       

	$("#parentProjectTitleForSubtitle").keyup(function(event) {                              
		switch (event.keyCode) {                                
			case 38:                                          
				isUpArrowKeyPressed = true;                                   
			
				if (isDownArrowKeyPressed === true) {                              
					searchIndexPosition = searchIndexPosition - 2;                             
					processUpKeyPressForProjectTitleSearch();                                      
				}                                            
				else {                                         
					processUpKeyPressForProjectTitleSearch();                              
				}                                  

				isDownArrowKeyPressed = false;                                

				break;                         
			case 40:                                        
				isDownArrowKeyPressed = true;                                       

				if (isUpArrowKeyPressed === true) {                          
					searchIndexPosition = searchIndexPosition + 2;                            
					processDownKeyPressForProjectTitleSearch();                                      
				}                                            
				else {                                         
					processDownKeyPressForProjectTitleSearch();                        
				}                                  
				
				isUpArrowKeyPressed = false;                                 
	
				break;                          
			case 13:                           
				event.preventDefault();                           			

				if (isUpArrowKeyPressed === true || isDownArrowKeyPressed === true) {                                            
					$("#existingProjectDropdown").fadeOut(353);                                                                                                
					$("#parentProjectTitleForSubtitle").val(newProjectSubtitle.title);                          
					twoDimensionalArraySubarray = getSubarrayContainingThisElement(getJSONProjectTitles, newProjectSubtitle.title);                                                
					addToInputTrackerArray("title");                                   
				}                                                         

				builtString = "";                                     
				searchArrayLength = 0;                            
				foundProjectTitles = [];                            
				searchIndexPosition = -1;                              
				previousIndexPosition = -1;                                         
				isUpArrowKeyPressed = false;                                      
				isDownArrowKeyPressed = false;                               

				break;                                        
			default:                                    
				projectTitleSearchResultKeyup();                                        
		}                                     
	});                             

	$("#insertSubtitleCode").click(function() {                                   
		if (isCodeInserted === false) {                                        
			$("#subtitleWarningFlag").fadeIn(353);                                       
			$("#addProjectSubtitleBody").val($("#addProjectSubtitleBody").val() + "<div class=\"coder\"><pre><code>");                                     
			isCodeInserted = true;                                           	
		}                                           
	});                                                      

	$("#insertSubtitleParagraph").click(function() {                                        
		if (isCodeInserted === true) {                                            
			$("#addProjectSubtitleBody").val($("#addProjectSubtitleBody").val() + "</code></pre></div>");                               
		}                                                       
		else {                                                             
			$("#addProjectSubtitleBody").val($("#addProjectSubtitleBody").val() + "<p>");                               			
		}                                                  

		$("#subtitleWarningFlag").fadeOut(353);                                       
		isCodeInserted = false;                              
	});                                            

	$("#addProjectSubtitleBody").focus(function() {                                      
		$("#addProjectSubtitleBody").addClass("addProjectSubtitleBody-focus");                                        
		$("#addProjectSubtitleBody").removeClass("addProjectSubtitleBody-blur");                                        
		$("#scrollDiv").scrollTop($("#scrollDiv")[0].scrollHeight);                                      	   
	});                                                  

	$("#newProjectRequirementRadio").change(function() {                           
		$("#newProjectCreator").slideUp(353);                            
		$("#batchEditorChoice").fadeOut(353);                          
		$("#adminProjectChoice").fadeOut(353);                       
		$("#projectEditorChoice").fadeIn(353);                        
		$("#batchEditorDivision").slideUp(353);                        
    	$("#adminSourceDivision").slideUp(353);                        
    	$("#consoleHelperDivision").slideUp(353);                                
		$("#existingProjectEditor").slideUp(353);                            
		$("#addProjectRequirementEditor").slideDown(353);                            
		$("#addProjectSubtitleEditor").slideUp(353);                            
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideDown(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
	});                                      

	$("#newProjectSubtitleRadio").change(function() {                           
		$("#newProjectCreator").slideUp(353);                            
		$("#batchEditorChoice").fadeOut(353);                          
		$("#adminProjectChoice").fadeOut(353);                       
		$("#projectEditorChoice").fadeIn(353);                        
		$("#batchEditorDivision").slideUp(353);                        
    	$("#adminSourceDivision").slideUp(353);                        
    	$("#consoleHelperDivision").slideUp(353);                   
		$("#existingProjectEditor").slideUp(353);                            
		$("#addProjectRequirementEditor").slideUp(353);                            
		$("#addProjectSubtitleEditor").slideDown(353);                            
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideDown(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
	});                                      

	$("#createProjectImage").blur(function() {                       
		if (0 in $("#createProjectImage").prop("files")) {                              
			newProjectCreator.image = $("#createProjectImage").prop("files")[0];                                       
			$("#projectImageWarning").fadeOut(353);                               
			addToInputTrackerArray("image");                             
		}                                              
		else {                                                
			newProjectCreator.image = {};                                        
			$("#projectImageWarning").fadeIn(353);                                
			removeFromInputTrackerArray("image");                        
		}                                     
	});             

	$("#createProjectButton").click(function() {                                       
		if (inputTrackerArray.length === projectInputControlArray.length) {                               
			var theFormData = new FormData();                                    
			theFormData.append("title", newProjectCreator.title);                            
			theFormData.append("category", newProjectCreator.category);                            
			theFormData.append("objective", newProjectCreator.objective);                            
			theFormData.append("developer", newProjectCreator.developer);                            
			theFormData.append("languages", newProjectCreator.languages);                            
			theFormData.append("library", newProjectCreator.library);                            
			theFormData.append("toolsUsed", newProjectCreator.toolsUsed);                            
			theFormData.append("image", newProjectCreator.image);                            

			$.ajax({                                       
				type : "POST",                                           
				url : "../Educacode/coderback/createprojectserver.php",                                    
				data : theFormData,                              
				processData : false,                                    
				contentType : false                                              
			}).done(function(theResponse) {                                             
				$("#createProjectToolsUsed").val("");                               
				$("#createProjectObjective").val("");                       
				$("#createProjectDevelopers").val("");                       
				$("#createProjectLibraries").val("");                           
				$("#createProjectLanguage").val("");                           
				$("#createProjectCategory").val("");                           
				$("#createProjectTitle").val("");                          
				$("#createProjectImage").val("");                          
				newProjectCreator.languages = "";                      
				newProjectCreator.toolsUsed = "";                      
				newProjectCreator.objective = "";                   
				newProjectCreator.category = "";                   
				newProjectCreator.developer = "";                   
				newProjectCreator.library = "";                      
				newProjectCreator.title = "";                   
				newProjectCreator.image = {};                             
				inputTrackerArray = [];                          
			});                                              
		}                                                  
	});                                   

	$("#createProjectLibraries").blur(function() {                              
		newProjectCreator.library = $.trim($("#createProjectLibraries").val());                                 

		if (newProjectCreator.library !== "") {                                   
			newProjectCreator.library = removeMultipleSpaces(newProjectCreator.library);                          
			newProjectCreator.library = upperCaseFirstLetter(newProjectCreator.library);                         
		}                                               
	});                                          

	$("#createProjectLanguage").blur(function() {                              
		$("#projectCreatorNeverCommaSeparate").fadeOut(353);                                   
		newProjectCreator.languages = getFinishedServerObjectData(newProjectCreator.languages,                                        
			$("#createProjectLanguage").val(), "languages");                                               
		newProjectCreator.languages = newProjectCreator.languages.toUpperCase();                           
		
		if (newProjectCreator.languages === "") {                                                          
			$("#createProjectLanguage").addClass("error");                                         
		}                                                               
	});                                          

	$("#createProjectLanguage").keydown(function(event) {                              
		processProjectLanguageInputEvent(event);                                  
	});                                               

	$("#createProjectLanguage").focus(function(event) {                                  
		$("#projectCreatorNeverCommaSeparate").fadeIn(353);                                   
		$("#createProjectLanguage").removeClass("error");                                         
		removeFromInputTrackerArray("languages");                             
	});                                              

	$("#createProjectToolsUsed").blur(function() {                              
		newProjectCreator.toolsUsed = getFinishedServerObjectData(newProjectCreator.toolsUsed,                                        
			$("#createProjectToolsUsed").val(), "toolsUsed");                                        

		if (newProjectCreator.toolsUsed === "") {                                                          
			$("#createProjectToolsUsed").addClass("error");                                         
		}                                                               
	});                                          

	$("#createProjectToolsUsed").focus(function() {                              
		$("#createProjectToolsUsed").removeClass("error");                                         
		removeFromInputTrackerArray("toolsUsed");                             
	});                                              

	$("#createProjectDevelopers").blur(function() {                              
		newProjectCreator.developer = getFinishedServerObjectData(newProjectCreator.developer,                                        
			$("#createProjectDevelopers").val(), "developer");                                        

		if (newProjectCreator.developer === "") {                                                          
			$("#createProjectDevelopers").addClass("error");                                         
		}                                                               
	});                                          

	$("#createProjectDevelopers").focus(function() {                              
		$("#createProjectDevelopers").removeClass("error");                                         
		removeFromInputTrackerArray("developer");                             
	});                                              

	$("#createProjectObjective").blur(function() {                              
		newProjectCreator.objective = getFinishedServerObjectData(newProjectCreator.objective,                                        
			$("#createProjectObjective").val(), "objective");                                          

		if (newProjectCreator.objective === "") {                                                          
			$("#createProjectObjective").addClass("error");                                         
		}                                                               
	});                                          

	$("#createProjectObjective").focus(function() {                              
		$("#createProjectObjective").removeClass("error");                                         
		removeFromInputTrackerArray("objective");                             
	});                                              

	$("#createProjectCategory").focus(function() {                            
		$("#createProjectCategory").removeClass("error");                                
	});                                          

	$("#createProjectCategory").blur(function() {                            
		if ($("#createProjectCategory").val() === "") {                             
			$("#createProjectCategory").addClass("error");                                
			removeFromInputTrackerArray("category");                                  
			newProjectCreator.category = "";                                       
		}                                                
		else {                                               
			newProjectCreator.category = $("#createProjectCategory").val();                                       
			addToInputTrackerArray("category");                                   
		}                                         
	});                                        

	$("#createProjectTitle").focus(function() {                                  
		$("#createProjectTitle").removeClass("error");                              
		removeFromInputTrackerArray("title");                              
	});                                  

	$("#createProjectTitle").blur(function() {                            
		var title = $.trim($("#createProjectTitle").val());                             

		if (title === "") {                                
			$("#createProjectTitle").addClass("error");                           
		}                                       
		else {                                            
			getJSONProjectTitles.done(function(theResponse) {                                                          
				newProjectCreator.title = $.trim($("#createProjectTitle").val());                         
				newProjectCreator.title = removeMultipleSpaces(newProjectCreator.title);                               
				newProjectCreator.title = toTitleCase(newProjectCreator.title);                          

				if (inTwoDimensionalArray(theResponse, newProjectCreator.title)) {                                      
					$("#createProjectTitle").val("Project Already Exists!!!");                             
					$("#createProjectTitle").addClass("error");                            
				}                                                   
				else {                                      
					addToInputTrackerArray("title");                                
				}                                                  
			});                                           
		}                                     
	});                             

	$("#editProjectRadio").change(function() {                          
		$("#newProjectCreator").slideUp(353);                            
		$("#batchEditorChoice").fadeOut(353);                          
		$("#adminProjectChoice").fadeOut(353);                       
		$("#projectEditorChoice").fadeIn(353);                        
		$("#batchEditorDivision").slideUp(353);                        
    	$("#adminSourceDivision").slideUp(353);                        
    	$("#consoleHelperDivision").slideUp(353);                   
		$("#addProjectRequirementEditor").slideUp(353);                            
		$("#addProjectSubtitleEditor").slideUp(353);                            
		$("#existingProjectEditor").slideDown(353);                            
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideDown(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
	});                        

	$("#newProjectRadio").change(function() {                          
		$("#batchEditorChoice").fadeOut(353);                          
		$("#projectEditorChoice").fadeIn(353);                        
		$("#adminProjectChoice").fadeOut(353);                       
		$("#newProjectCreator").slideDown(353);                            
    	$("#adminSourceDivision").slideUp(353);                   
		$("#batchEditorDivision").slideUp(353);               
    	$("#consoleHelperDivision").slideUp(353);                   
		$("#existingProjectEditor").slideUp(353);                            
		$("#addProjectRequirementEditor").slideUp(353);                            
		$("#addProjectSubtitleEditor").slideUp(353);                            
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideDown(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
	});                        

	$("#adminProjects").change(function() {                          
		$("#batchEditorChoice").fadeOut(353);                          
		$("#projectEditorChoice").fadeIn(353);                        
		$("#adminProjectChoice").fadeOut(353);                       
		$("#batchEditorDivision").slideUp(353);               
    	$("#adminSourceDivision").slideUp(353);                   
    	$("#consoleHelperDivision").slideUp(353);                   
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideUp(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
	});                        

    $("#adminSource").change(function() {                   
    	$("#adminSourceDivision").slideDown(353);                   
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideUp(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
		$("#batchEditorDivision").slideUp(353);               
    });                              

    $("#adminSnippets").change(function() {                   
    	$("#adminSnippetsDivision").slideDown(353);                   
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideUp(353);                   
    	$("#adminSourceDivision").slideUp(353);                   
		$("#batchEditorDivision").slideUp(353);               
    });                              

    $("#adminDictionary").change(function() {                   
    	$("#adminDictionaryDivision").slideDown(353);                   
    	$("#adminProjectsDivision").slideUp(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
    	$("#adminSourceDivision").slideUp(353);                   
		$("#batchEditorDivision").slideUp(353);               
    });                              

	$("#wordInput").blur(function() {                          
		var title = $.trim($("#wordInput").val());                        
		title = removeMultipleSpaces(title);                         
		title = toTitleCase(title);                               

		getJSONWords.done(function(theResponse) {                     
			if (inArray(theResponse, title)) {                     
				$("wordInput").addClass("error");                  
				$("#definitionExistsError").slideDown(353);                  
				definitions.title = "";                        
			}                           
			else {                              
				$("wordInput").removeClass("error");                         
				$("#definitionExistsError").slideUp(353);                  			
				definitions.title = title;                              
			}                                
		});                     
	});                         

	$("#loadDictionaryData").click(function() {                  
		$.getJSON('../Educacode/coderback/jsonstoredata.php').done(function(theResponse) {                   
			for (var i = 0; i < theResponse.length; i++) {
				definitions.title = removeMultipleSpaces(theResponse[i][0]);                        
				definitions.title = toTitleCase(definitions.title);                        
				definitions.meaning = $.trim(theResponse[i][1]);                                     
				definitions.meaning = upperCaseFirstLetter(definitions.meaning);                                
 				definitions.meaning = insertBoldElement(definitions.meaning);                                 

				$.post("../Educacode/coderback/definitionserver.php", definitions).done(function(response) {                            
					$("#wordInput").val("");                     
					$("#definitionInput").val("");                     
					definitions.meaning = "";                 
					definitions.title = "";               
				});                           
			}                           
		});                    
	});                     

	$("#submitDefinition").click(function() {                           
		if (definitions.title !== "") {                       
			definitions.meaning = $.trim($("#definitionInput").val());                                  
			definitions.meaning = upperCaseFirstLetter(definitions.meaning);                                  
			definitions.meaning = insertBoldElement(definitions.meaning);                                           
			var postDefinition = $.post("../Educacode/coderback/definitionserver.php", definitions);                                 

			postDefinition.done(function(response) {                            
				$("#wordInput").val("");                     
				$("#definitionInput").val("");                     
				definitions.meaning = "";                 
				definitions.title = "";               
			});                           
		}                     
	});                             

	// Always Empty stringPart And stringTokensArray                                    
	// Before Calling This Function Because It's Recursive                                       
	var getStringTokensArray = function(theString) {                               
		theString = $.trim(theString);                                    

		if (theString.indexOf(" ") > -1) {                                   
			stringTokensArray.push(theString.substring(0, theString.indexOf(" ")));                                
			stringPart = theString.substring(theString.indexOf(" "));                                    
			stringPart = $.trim(stringPart);                                  

			if (stringPart.length > 0) {                                    
				if (stringPart.indexOf(" ") > -1) {                                       
					return getStringTokensArray(stringPart);                                      
				}                                               
				else {                                                   
					stringTokensArray.push(stringPart);                                     
					return stringTokensArray;                                
				}                                               
			}                                             
			else {                                              
				return stringTokensArray;                                
			}                                       
		}                                             
	}                                              

	var processProjectLanguageInputEvent = function(event) {                                  
		if (event.keyCode === 192                                    
			|| event.keyCode === 49                                        
			|| event.keyCode === 50                                        
			|| event.keyCode === 51                                        
			|| event.keyCode === 52                                        
			|| event.keyCode === 52                                       
			|| event.keyCode === 53                                       
			|| event.keyCode === 54                                       
			|| event.keyCode === 55                                       
			|| event.keyCode === 56                                       
			|| event.keyCode === 57                                       
			|| event.keyCode === 48                                       
			|| event.keyCode === 189                                       
			|| event.keyCode === 226                                        
			|| event.keyCode === 188                                        
			|| event.keyCode === 190                                        
			|| event.keyCode === 186                                        
			|| event.keyCode === 222                                        
			|| event.keyCode === 220                                        
			|| event.keyCode === 219                                        
			|| event.keyCode === 221) {                                                     
			event.preventDefault();                                            
			console.log("Default Prevented");                              
		}                                                           
	}                                           

	var checkChosenProjectTitleForRequirement = function(chosenProject) {                                      
		if (inJSONTwoDimensionalArray(getJSONProjectTitles, chosenProject)) {                                   
			$("#parentProjectTitleForRequirement").val(chosenProject);                                
			newProjectRequirement.projectTitle = chosenProject;                                  
			addToInputTrackerArray("projectTitle");                                 
		}                                                        
		else {                                                         
			$("#parentProjectTitleForRequirement").addClass("error");                   
			$("#parentProjectTitleForRequirement").val("Idiot! When Did You Develop This Project???");                         
			removeFromInputTrackerArray("projectTitle");                                       
			newProjectRequirement.projectTitle = "";                                
		}                                        		
	}                                          

	var checkChosenProjectTitle = function(chosenProject) {                                      
		if (inJSONTwoDimensionalArray(getJSONProjectTitles, chosenProject)) {                                   
			$("#parentProjectTitleForSubtitle").val(chosenProject);                                
			newProjectSubtitle.title = chosenProject;                                  
			addToInputTrackerArray("title");                                 

			return true;                                                    
		}                                                        
		else {                                                         
			$("#parentProjectTitleForSubtitle").addClass("error");                   
			$("#parentProjectTitleForSubtitle").val("Idiot! When Did You Develop This Project???");                         
			removeFromInputTrackerArray("title");                                       
			newProjectSubtitle.title = "";                                

			return false;                                     
		}                                        		
	}                                          

	var getSubarrayContainingThisElement = function(jsonSearchComposite, value) {                                 
		jsonSearchComposite.done(function(theResponse) {                                        
			inTwoDimensionalArray(theResponse, value);                                      
		});                                            

		return twoDimensionalArraySubarray;                                           
	}                                                            

	var twoDimensionalArraySearcher = function(jsonSearchComposite, prefix, index) {                              
		var foundStrings = [];                            
		prefix = $.trim(prefix);                               
		prefix = toTitleCase(prefix);                            

		for (var i = 0; i < jsonSearchComposite.length; i++) {                          
			if (prefix !== "") {                                            
				if (jsonSearchComposite[i][index].startsWith(prefix)) {                                         
					foundStrings.push(jsonSearchComposite[i][index]);                             
				}                                                     
			}                                         
		}                            

		return foundStrings;                           
	}                               

	var theSearcher = function(jsonSearchComposite, prefix) {                              
		var foundStrings = [];                            
		prefix = $.trim(prefix);                               
		prefix = toTitleCase(prefix);                            

		for (var i = 0; i < jsonSearchComposite.length; i++) {                
			if (prefix !== "") {                                            
				if (jsonSearchComposite[i].startsWith(prefix)) {                                         
					foundStrings.push(jsonSearchComposite[i]);                             
				}                                      
			}                                         
		}                            

		return foundStrings;                           
	}                               

	var requirementDownKeyPressForProjectTitleSearch = function() {                               
		if (searchIndexPosition < 0 || searchIndexPosition > searchArrayLength - 1) {                              
			searchIndexPosition = 0;                                                                           
			$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			newProjectSubtitle.title = $("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition).text();                                    

			if (searchIndexPosition > 0) {                                                            
				$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			}                                                            
			
			$("#parentProjectTitleForRequirement").setCursorPosition($("#parentProjectTitleForRequirement").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition++;                                                    
		}                                                
		else {                                                                                         
			$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			newProjectSubtitle.title = $("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition).text();                                    

			if (searchIndexPosition > 0) {                                                            
				$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			}                                                            
			
			$("#parentProjectTitleForRequirement").setCursorPosition($("#parentProjectTitleForRequirement").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                                
			searchIndexPosition++;                                                    
		}                                                   
	}                                       

	var processDownKeyPressForProjectTitleSearch = function() {                               
		if (searchIndexPosition < 0 || searchIndexPosition > searchArrayLength - 1) {                              
			searchIndexPosition = 0;                                                                           
			$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			newProjectSubtitle.title = $("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition).text();                                    

			if (searchIndexPosition > 0) {                                                            
				$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			}                                                            
			
			$("#parentProjectTitleForSubtitle").setCursorPosition($("#parentProjectTitleForSubtitle").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition++;                                                    
		}                                                
		else {                                                                                         
			$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			newProjectSubtitle.title = $("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition).text();                                    

			if (searchIndexPosition > 0) {                                                            
				$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			}                                                            
			
			$("#parentProjectTitleForSubtitle").setCursorPosition($("#parentProjectTitleForSubtitle").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition++;                                                    
		}                                                   
	}                                       

	var requirementProjectTitleSearchKeyup = function() {                                      
		if (searchIndexPosition < 0 || searchIndexPosition > searchArrayLength - 1) {                              
			searchIndexPosition = searchArrayLength - 1;                                                
			$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			newProjectSubtitle.title = $("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition).text();                                    

			if (searchIndexPosition > 0) {                                                            
				$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			}                                                            
			
			$("#parentProjectTitleForRequirement").setCursorPosition($("#parentProjectTitleForRequirement").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition--;                                                    
		}                                                
		else {                                            
			$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			newProjectSubtitle.title = $("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition).text();                                    
			
			if (searchIndexPosition > 0) {                                                            
				$("#existingProjectDropdownForRequirement").find(".searchProjectTitleResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			}                                                            
			
			$("#parentProjectTitleForRequirement").setCursorPosition($("#parentProjectTitleForRequirement").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition--;                                                    
		}                                                     
	}                                             

	var processUpKeyPressForProjectTitleSearch = function() {                                      
		if (searchIndexPosition < 0 || searchIndexPosition > searchArrayLength - 1) {                              
			searchIndexPosition = searchArrayLength - 1;                         
			$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			newProjectSubtitle.title = $("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition).text();                                    
			
			if (searchIndexPosition > 0) {                                                            
				$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			}                                                            
			
			$("#parentProjectTitleForSubtitle").setCursorPosition($("#parentProjectTitleForSubtitle").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition--;                                                    
		}                                                
		else {                                            
			$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			newProjectSubtitle.title = $("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition).text();                                    
			
			if (searchIndexPosition > 0) {                                                            
				$("#existingProjectDropdown").find(".searchProjectTitleResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			}                                                            
			
			$("#parentProjectTitleForSubtitle").setCursorPosition($("#parentProjectTitleForSubtitle").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition--;                                                    
		}                                                     
	}                                             

	var requirementProjectTitleSearchResultKeyup = function() {                               
		processDefaultPressedKey($("#parentProjectTitleForRequirement").val());                                    

		if (searchArrayLength <= 0) {                              
			$("#existingProjectDropdownForRequirement").removeClass("existingProjectDropdown-stretch");                          
			$("#existingProjectDropdownForRequirement").removeClass("existingProjectDropdown-static");                          
		}                                                
		else if (searchArrayLength > 0 && searchArrayLength < 5) {                            
			$("#existingProjectDropdownForRequirement").addClass("existingProjectDropdown-stretch");                          
			$("#existingProjectDropdownForRequirement").removeClass("existingProjectDropdown-static");                          
		}                                       
		else {                                    
			$("#existingProjectDropdownForRequirement").removeClass("existingProjectDropdown-stretch");                          
			$("#existingProjectDropdownForRequirement").addClass("existingProjectDropdown-static");                          
		}                                      

		$("#existingProjectDropdownForRequirement").html(builtString);                             
		$("#existingProjectDropdownForRequirement").fadeIn(353);                        
	}                                         

	var projectTitleSearchResultKeyup = function() {                               
		processDefaultPressedKey($("#parentProjectTitleForSubtitle").val());                                    

		if (searchArrayLength <= 0) {                              
			$("#existingProjectDropdown").removeClass("existingProjectDropdown-stretch");                          
			$("#existingProjectDropdown").removeClass("existingProjectDropdown-static");                          
		}                                                
		else if (searchArrayLength > 0 && searchArrayLength < 5) {                            
			$("#existingProjectDropdown").addClass("existingProjectDropdown-stretch");                          
			$("#existingProjectDropdown").removeClass("existingProjectDropdown-static");                          
		}                                       
		else {                                    
			$("#existingProjectDropdown").removeClass("existingProjectDropdown-stretch");                          
			$("#existingProjectDropdown").addClass("existingProjectDropdown-static");                          
		}                                      

		$("#existingProjectDropdown").html(builtString);                             
		$("#existingProjectDropdown").fadeIn(353);                        
	}                                         

	var processDefaultPressedKey = function(userInput) {                                          
		builtString = "";                                  
		foundProjectTitles = [];                          
		searchIndexPosition = -1;                                 
		previousIndexPosition = -1;                                    
		isUpArrowKeyPressed = false;                                        
		isDownArrowKeyPressed = false;                                 
		newProjectSubtitle.title = "";                                
		removeFromInputTrackerArray("title");                                      
		removeFromInputTrackerArray("projectTitle");                                      

		getJSONProjectTitles.done(function(theResponse) {                                               
			foundProjectTitles = twoDimensionalArraySearcher(theResponse, userInput, 1);                            
		});                                      

		searchArrayLength = foundProjectTitles.length;                                         

		for (var i = 0; i < searchArrayLength; i++) {                                        
			builtString = builtString + "<div class=\"searchProjectTitleResultInner\"><b>" + foundProjectTitles[i] + "</b></div>";                         
		}                                                                  
	}                                                

	var getFinishedServerObjectData = function(toSetObject, clientInput, arrayMarker) {                                    
		toSetObject = $.trim(clientInput);                            

		if (toSetObject !== "") {                                   
			toSetObject = removeMultipleSpaces(toSetObject);                          
			toSetObject = upperCaseFirstLetter(toSetObject);                         
			addToInputTrackerArray(arrayMarker);                             
		}                                               
		else {                                              
			removeFromInputTrackerArray(arrayMarker);                              
			toSetObject = "";                                   
		}                                           

		return toSetObject;                                            
	}                                                 

	var addToInputTrackerArray = function(addData) {                                    
		if (!inArray(inputTrackerArray, addData)) {                                   
			inputTrackerArray.push(addData);                                 
		}                                                     
	}                                         

	var removeFromInputTrackerArray = function(removeData) {                       
		var index = inputTrackerArray.indexOf(removeData);                    

		if (index > -1) {                                 
			inputTrackerArray.splice(index, 1);                         
		}                                          
	}                        
 				
	var toTitleCase = function(theString) {                     
		return theString.replace(/\w\S*/g, function(anotherString) {                     
			return anotherString.charAt(0).toUpperCase() + anotherString.substr(1).toLowerCase();                            
		});                            
	}                            

	var insertBoldElement = function(theDefinition) {                             
		var result = "";                         
		var indices = [];                        
		var firstValue = "<b>";                           
		var secondValue = "</b>";                          

		if (theDefinition !== "") {                            
			getJSONWords.done(function(theResponse) {                          
				for (var i = 0; i < theResponse.length; i++) {                              
					var regex = new RegExp(theResponse[i], "gi");                                      
					while (result = regex.exec(theDefinition)) {                            
						if ((theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + secondValue.length) !== "</b>")                                                 
							&& ((theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === " ")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === ";")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === ":")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === ",")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === "\"")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === "'")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === ".")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === "/")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === "?")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === "!")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === "-")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === "(")                                               
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === ")")                                             
							|| (theDefinition.substring(result.index + theResponse[i].length, result.index + theResponse[i].length + 1) === ""))) {                                              
							indices.push(result.index);                                             

							theDefinition = [theDefinition.slice(0, result.index), firstValue, theDefinition.slice(result.index)].join("");               

							theDefinition = [theDefinition.slice(0, result.index + theResponse[i].length + 3), secondValue, theDefinition.slice(result.index + theResponse[i].length + 3)].join("");               
						}                                        
						else {                                       
							console.log("Gerara here!!!");                      
						}                                                      
					}                                          
				}                         
			});                          

			return theDefinition;                       
		}                            
		else {                              
			return theDefinition;                       
		}                     
	}                          

	var upperCaseFirstLetter = function(theWord) {                            
		return theWord.charAt(0).toUpperCase() + theWord.slice(1);                   
	}                           

	var removeMultipleSpaces = function(theString) {                   
		return theString.replace(/\s\s+/g, " ");                      
	}                        

	var createWordId = function(theWord) {                 
		theWord = theWord.toLowerCase().replace(/\b[a-z]/g, function(letter) {
			return letter.toUpperCase();                          
		});                         

		return theWord.charAt(0).toLowerCase() + theWord.slice(1);                   
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

	var inJSONArray = function(myJSONArray, value) {                                 
		var available = false;                                         

		myJSONArray.done(function(theResponse) {                                   
			available = inArray(theResponse, value);                                   
		});				                                  

		return available;                                    
	}                                                 

	var inArray = function(array, value) {                         
		return array.indexOf(value) > -1;                                 
	}                           

}(jQuery));                   

/*               
	$.fn.getCursorPosition = function() {
        var thePosition = 0;                               
        var element = $(this).get(0);                           
        
        if ('selectionStart' in element) {                      
            thePosition = element.selectionStart;                              
        }                                            
        else if ('selection' in document) {                              
            element.focus();                            

            var selection = document.selection.createRange();                            
            var selectionLength = document.selection.createRange().text.length;                        
            
            selection.moveStart('character', -element.value.length);                          
            thePosition = selection.text.length - selectionLength;                         
        }                             

        return thePosition;                             
    }                                 
*/                  


