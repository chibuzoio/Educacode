
(function($) {                                 

	var	builtString = "";                                  
	var searchArrayLength = 0;                                 
	var	foundWordsComposite = [];                                
	var jsonSearchComposite = [];                                
	var	searchIndexPosition = -1;                                 
	var projectSubmenuArray = {};                                           
	var projectTitleArticle = {};                        
	var	previousIndexPosition = -1;                                    
	var	isUpArrowKeyPressed = false;                                        
	var	isDownArrowKeyPressed = false;                                                
	var allProjectsPathName = "/coder/project.php";                                    

	projectSubmenuArray.android = [];                                        
	projectSubmenuArray.angularjs = [];                                        
	projectSubmenuArray.cscpp = [];                                        
	projectSubmenuArray.csharp = [];                                        
	projectSubmenuArray.java = [];                                        
	projectSubmenuArray.php = [];                                        
	projectSubmenuArray.qt = [];                                        
	projectSubmenuArray.html = [];                                        
	projectSubmenuArray.ionic = [];                                        
	projectSubmenuArray.python = [];                                        
	projectSubmenuArray.ruby = [];                                        

	projectTitleArticle.title = "";                                     

	$.getJSON("../Educacode/coderback/jsongeneralsearch.php").done(function(theJson) {                           
		for (var i = 0; i < theJson.length; i++) {                                 
			jsonSearchComposite.push(theJson[i]);                      			
		}                                  
	});                            

	var getJSONProjectSubmenus = $.getJSON('../Educacode/coderback/jsonprojectsubmenus.php').done(function(theResponse) {                                          
		for (var i = 0; i < theResponse.length; i++) {                                       
			switch (theResponse[i][1]) {                                    
				case "ANDROID":                                         
					projectSubmenuArray.android.push(theResponse[i]);                                		    
					break;                                              
				case "ANGULARJS":                                         
					projectSubmenuArray.angularjs.push(theResponse[i]);                                		    
					break;                                              
				case "C/C++":                                         
					projectSubmenuArray.cscpp.push(theResponse[i]);                                		    
					break;                                              
				case "CSHARP":                                         
					projectSubmenuArray.csharp.push(theResponse[i]);                                		    
					break;                                              
				case "JAVA":                                         
					projectSubmenuArray.java.push(theResponse[i]);                                		    
					break;                                              
				case "PHP":                                         
					projectSubmenuArray.php.push(theResponse[i]);                                		    
					break;                                              
				case "QT":                                         
					projectSubmenuArray.qt.push(theResponse[i]);                                		    
					break;                                              
				case "HTML":                                         
					projectSubmenuArray.html.push(theResponse[i]);                                		    
					break;                                              
				case "IONIC":                                         
					projectSubmenuArray.ionic.push(theResponse[i]);                                		    
					break;                                              
				case "PYTHON":                                         
					projectSubmenuArray.python.push(theResponse[i]);                                		    
					break;                                              
				case "RUBY":                                         
					projectSubmenuArray.ruby.push(theResponse[i]);                                		    
					break;                                              
			}                                                               
		}                                                            
	});                                                               

	$.getJSON("../Educacode/coderback/jsonauthenticateduser.php").done(function(theResponse) {                                                 
		if (theResponse[0] === "true") {                                                        
			if (theResponse[10] !== "") {                                              
				$("#profilePictureComposite").html("<img class=\"profileButton\" src=\"image/" + theResponse[10] + "\">");                                                         
			}                                                              
			else {                                                      
				$("#profilePictureComposite").html("<img class=\"profileButton\" src=\"image/profile.png\">");                                                         
			}                                                     

			$("#profilePictureComposite").show();                                      
			$("#educacodeEntrance").hide();                                           
		}                                                       
		else {                                                      
			$("#profilePictureComposite").hide();                                      
			$("#educacodeEntrance").show();                                           
		}                                                 
	});                                                                     

	var getJSONProjectTitles = $.getJSON('../Educacode/coderback/jsonprojecttitles.php');                       

	$("#profilePictureComposite").click(function() {                                                     
		if ($("#accountDropdownInfo").is(":visible")) {                                                
			$("#accountDropdownInfo").slideUp(353);                                                       
		}                                                                   
		else {                                                        
			$("#accountDropdownInfo").slideDown(353);                                                       
		}                                                         
	});                                                                                

	$("#educacodeTerminalButton").click(function() {                                               
		if ($("#educacodeTerminalDivision").is(":visible")) {                                                     
			$("#educacodeTerminalDivision").slideUp(353);                                                 
			$("#bodyCover").fadeOut(353);                                            
		}                                                                                    
		else {                                                                          
			$("#educacodeTerminalDivision").slideDown(353);                                                 
			$("#bodyCover").fadeIn(353);                                            
		}                                                          
	});                                                                       

	$(document).ready(function() {                                     
		if (location.pathname === "/coder/project.php") {                                     
			if (isBrowserStorageAvailable()) {                                              
				$("#titleMetadataBody").html(localStorage.getItem("title"));                                      
				$("#categoryMetadataBody").html(localStorage.getItem("category") + " APPLICATION");                                      
				$("#objectiveMetadataBody").html(localStorage.getItem("objective"));                                      
				$("#developersMetadataBody").html(localStorage.getItem("developers"));                                      
				$("#languagesMetadataBody").html(localStorage.getItem("languages"));                                      
				$("#utilitySoftwareMetadataBody").html(localStorage.getItem("utilityTools"));                                      
				$("#subtitlesMetadataBody").html(localStorage.getItem("subtitilesSize"));                                      
				$("#dateModifiedMetadataBody").html(localStorage.getItem("dateModified"));                                      
				$("#librariesMetadataBody").html(localStorage.getItem("libraries"));                                      
				$("#projectTitleHeader").html(localStorage.getItem("title"));                                          
				$("#projectGeneralArticle").html(localStorage.getItem("projectBuiltArticle"));                                                  
				$("#projectRequirementChild").html(localStorage.getItem("projectBuiltRequirement"));                                                  
			}                                                            
			else {                                                       
				location.href = "/coder/index.php";                                        
			}                                                       
		}                                                    
	});                                                  
	
	$("#secondMenuCoverRight").click(function(event) {                                             
		if (location.pathname === allProjectsPathName) {                                                    
			processSubmenuClick(event);                                                                        
		}                                                                        
		else { // redirect to project path after loading project resources                              
			processSubmenuClick(event);                                                                        
			location.href = allProjectsPathName;                                                       
		}                                                                       
	});                                                

	$("#secondDropDownMenuImage").click(function(event) {                        
		var targetId = $(event.target).attr("id");                                   

		if (targetId === "sideMenuImage" || targetId === "sideMenuTitle") {                                   
			$("#secondDropDownMenu").slideUp(353);                             
			$("#dropDownMenu").slideDown(353);                             
			$("#bodyCover").fadeIn(353);                               
		}                                                  
	});                                               

	$("#eleventhMenuCover").click(function() {                            
		var menuTitle = $("#eleventhMenuTitle").html();                           
		var imageSource = $("#eleventhMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.ruby);                                  
	});                                       

	$("#tenthMenuCover").click(function() {                            
		var menuTitle = $("#tenthMenuTitle").html();                           
		var imageSource = $("#tenthMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.python);                                  
	});                                       

	$("#ninthMenuCover").click(function() {                            
		var menuTitle = $("#ninthMenuTitle").html();                           
		var imageSource = $("#ninthMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.ionic);                                  
	});                                       

	$("#eighthMenuCover").click(function() {                            
		var menuTitle = $("#eighthMenuTitle").html();                           
		var imageSource = $("#eighthMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.html);                                  
	});                                       

	$("#seventhMenuCover").click(function() {                            
		var menuTitle = $("#seventhMenuTitle").html();                           
		var imageSource = $("#seventhMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.qt);                                  
	});                                       

	$("#sixthMenuCover").click(function() {                            
		var menuTitle = $("#sixthMenuTitle").html();                           
		var imageSource = $("#sixthMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.php);                                  
	});                                       

	$("#fifthMenuCover").click(function() {                            
		var menuTitle = $("#fifthMenuTitle").html();                           
		var imageSource = $("#fifthMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.java);                                  
	});                                       

	$("#fourthMenuCover").click(function() {                            
		var menuTitle = $("#fourthMenuTitle").html();                           
		var imageSource = $("#fourthMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.csharp);                                  
	});                                       

	$("#thirdMenuCover").click(function() {                            
		var menuTitle = $("#thirdMenuTitle").html();                           
		var imageSource = $("#thirdMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.cscpp);                                  
	});                                       

	$("#secondMenuCover").click(function() {                            
		var menuTitle = $("#secondMenuTitle").html();                           
		var imageSource = $("#secondMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.angularjs);                                  
	});                                       

	$("#firstMenuCover").click(function() {                            
		var menuTitle = $("#firstMenuTitle").html();                           
		var imageSource = $("#firstMenuCover").find("img").attr("src");                           

		slideDownSecondMenuCover(imageSource, menuTitle, projectSubmenuArray.android);                                  
	});                                       

	$("#secondMenuCoverRight").mouseleave(function() {                                               
		$("#secondMenuCoverRight").find(".menuTable").find(".menuImage").next(".submenuCover").addClass("submenuCover-short");                                          
		$("#secondMenuCoverRight").find(".menuTable").find(".menuImage").next(".submenuCover").removeClass("submenuCover-high");                                          
	});                                                         

	$("#secondMenuCoverRight").mousemove(function(event) {                                 
		if ($(event.target).is(".menuTable")) {                                             
			$("#secondMenuCoverRight").find(".menuTable").find(".menuImage").next(".submenuCover").addClass("submenuCover-short");                                               
			$("#secondMenuCoverRight").find(".menuTable").find(".menuImage").next(".submenuCover").removeClass("submenuCover-high");                                         
		}                                            
		else if ($(event.target).is(".menuImage")) {                                       
			$(event.target).next(".submenuCover").removeClass("submenuCover-short");                          
			$(event.target).next(".submenuCover").addClass("submenuCover-high");                          
		}                                         
		else if ($(event.target).is(".submenuCover")) {                                       
			$(event.target).removeClass("submenuCover-short");                          
			$(event.target).addClass("submenuCover-high");                          
		}                                         
		else {                                       
			$("#secondMenuCoverRight").find(".menuTable").find(".menuImage").next(".submenuCover").addClass("submenuCover-short");                                          
			$("#secondMenuCoverRight").find(".menuTable").find(".menuImage").next(".submenuCover").removeClass("submenuCover-high");                                          
		}                                                 
	});                                   

	$("#educacodeSearchMaster").blur(function() {                            
		$("#educacodeSearchResult").fadeOut(353);                            
		$("#educacodeSearchMaster").val("");                           
	});                                   

	$("#educacodeSearchResult").click(function(event) {                         
		var clicked = $(event.target);                           

		if (clicked.is("b")) {                          
			console.log(clicked.text());                   
		}                             
		else if (clicked.is("div")) {                         
			console.log(clicked.find("b").text());                   
		}                                
	});                       

	$("#educacodeSearchMaster").keyup(function(event) {                              
		switch (event.keyCode) {                                
			case 38:                                          
				isUpArrowKeyPressed = true;                                   
			
				if (isDownArrowKeyPressed === true) {                              
					searchIndexPosition = searchIndexPosition - 2;                             
					processUpKeyPressForMasterSearch();                                      
				}                                            
				else {                                         
					processUpKeyPressForMasterSearch();                              
				}                                  

				isDownArrowKeyPressed = false;                                

				break;                         
			case 40:                                        
				isDownArrowKeyPressed = true;                                       

				if (isUpArrowKeyPressed === true) {                          
					searchIndexPosition = searchIndexPosition + 2;                            
					processDownKeyPressForMasterSearch();                                      
				}                                            
				else {                                         
					processDownKeyPressForMasterSearch();                        
				}                                  
				
				isUpArrowKeyPressed = false;                                 
	
				break;                          
			case 13:                           
				event.preventDefault();                           			

				if (isUpArrowKeyPressed === true || isDownArrowKeyPressed === true) {                                  
					console.log($("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).text());                                  
					$("#educacodeSearchResult").fadeOut(353);                        
					$("#educacodeSearchMaster").val("");                          
				}                                           

				builtString = "";                                     
				searchArrayLength = 0;                            
				foundWordsComposite = [];                            
				searchIndexPosition = -1;                              
				previousIndexPosition = -1;                                         
				isUpArrowKeyPressed = false;                                      
				isDownArrowKeyPressed = false;                               

				break;                                        
			default:                                    
				educacodeSearchResultKeyup();                                        
		}                                     
	});                             

	$("#sliderDiv").hover(function() {              
		$("#sliderCover").slideDown(353);                
		$("#sliderCoverNote").slideDown(353);               
	},                 

	function() {                 
		$("#sliderCover").slideUp(353);                
		$("#sliderCoverNote").slideUp(353);               
	});                       

	$("#bodyCover").click(function() {                                                   
		$("#educacodeTerminalDivision").slideUp(353);                                            
		$("#secondDropDownMenu").slideUp(353);                           
		$("#dropDownMenu").slideUp(353);                                              
		$("#bodyCover").fadeOut(353);                               
	});                                        

	$("#codeProjects").click(function() {
		$("#dropDownMenu").slideDown(353);               
		$("#secondDropDownMenu").slideUp(353);                         
		$("#bodyCover").fadeIn(353);               
	});                      

	$("#firstMenuCover").hover(function() {              
		$("#firstImageCover").slideDown(353);                
		$("#firstMenuTitle").slideDown(353);               
	},                 

	function() {                 
		$("#firstImageCover").slideUp(353);                
		$("#firstMenuTitle").slideUp(353);               
	});                       

	$("#secondMenuCover").hover(function() {                  
		$("#secondImageCover").slideDown(353);                
		$("#secondMenuTitle").slideDown(353);               
	},                 

	function() {                 
		$("#secondImageCover").slideUp(353);                
		$("#secondMenuTitle").slideUp(353);                
	});                       

	$("#thirdMenuCover").hover(function() {              
		$("#thirdImageCover").slideDown(353);                
		$("#thirdMenuTitle").slideDown(353);               
	},                 

	function() {                 
		$("#thirdImageCover").slideUp(353);                
		$("#thirdMenuTitle").slideUp(353);               
	});                       

	$("#fourthMenuCover").hover(function() {                
		$("#fourthImageCover").slideDown(353);                
		$("#fourthMenuTitle").slideDown(353);               
	},                 

	function() {                 
		$("#fourthImageCover").slideUp(353);                
		$("#fourthMenuTitle").slideUp(353);               
	});                       

	$("#fifthMenuCover").hover(function() {              
		$("#fifthImageCover").slideDown(353);                
		$("#fifthMenuTitle").slideDown(353);               
	},                 

	function() {                 
		$("#fifthImageCover").slideUp(353);                
		$("#fifthMenuTitle").slideUp(353);               
	});                       

	$("#sixthMenuCover").hover(function() {              
		$("#sixthImageCover").slideDown(353);                
		$("#sixthMenuTitle").slideDown(353);               
	},                 

	function() {                   
		$("#sixthImageCover").slideUp(353);                
		$("#sixthMenuTitle").slideUp(353);               
	});                       

	$("#seventhMenuCover").hover(function() {              
		$("#seventhImageCover").slideDown(353);                
		$("#seventhMenuTitle").slideDown(353);               
	},                 

	function() {                 
		$("#seventhImageCover").slideUp(353);                
		$("#seventhMenuTitle").slideUp(353);               
	});                       

	$("#eighthMenuCover").hover(function() {              
		$("#eighthImageCover").slideDown(353);                
		$("#eighthMenuTitle").slideDown(353);               
	},                 

	function() {                 
		$("#eighthImageCover").slideUp(353);                
		$("#eighthMenuTitle").slideUp(353);               
	});                       

	$("#ninthMenuCover").hover(function() {              
		$("#ninthImageCover").slideDown(353);                
		$("#ninthMenuTitle").slideDown(353);               
	},                 

	function() {                 
		$("#ninthImageCover").slideUp(353);                
		$("#ninthMenuTitle").slideUp(353);               
	});                       

	$("#tenthMenuCover").hover(function() {              
		$("#tenthImageCover").slideDown(353);                
		$("#tenthMenuTitle").slideDown(353);               
	},                 

	function() {                 
		$("#tenthImageCover").slideUp(353);                
		$("#tenthMenuTitle").slideUp(353);               
	});                       

	$("#eleventhMenuCover").hover(function() {              
		$("#eleventhImageCover").slideDown(353);                
		$("#eleventhMenuTitle").slideDown(353);               
	},                 

	function() {                 
		$("#eleventhImageCover").slideUp(353);                
		$("#eleventhMenuTitle").slideUp(353);               
	});                       

	var processSubmenuClick = function(event) {                                                                 
		if ($(event.target).is(".menuImage")) {                                                 
			projectTitleArticle.title = $(event.target).next(".submenuCover").text();                                          
			processSubmenuMouseClickEvent();                                                   
		}                                                                                
		else if ($(event.target).is(".submenuCover")) {                                             
			projectTitleArticle.title = $(event.target).text();                                        
			processSubmenuMouseClickEvent();                                            
		}                                                 
	}                                                                               

	var processSubmenuMouseClickEvent = function() {                                                                                 
		$.post("../Educacode/coderback/jsonprojectarticles.php", projectTitleArticle).done(function(theResponse) {                                      
			var builtArticleSection = "";                                                 
			var builtRequirementSection = "";                                                 
			var projectCompositeArray = getResponseObject(theResponse);                                           

			$("#titleMetadataBody").html(projectCompositeArray[0]);                                      
			$("#categoryMetadataBody").html(projectCompositeArray[1] + " APPLICATION");                                      
			$("#objectiveMetadataBody").html(projectCompositeArray[2]);                                      
			$("#developersMetadataBody").html(projectCompositeArray[3]);                                      
			$("#languagesMetadataBody").html(projectCompositeArray[4]);                                      
			$("#utilitySoftwareMetadataBody").html(projectCompositeArray[6]);                                      
			$("#subtitlesMetadataBody").html(projectCompositeArray[7]);                                      
			$("#dateModifiedMetadataBody").html(projectCompositeArray[8]);                                      
			$("#librariesMetadataBody").html(projectCompositeArray[5]);                                      
			$("#projectTitleHeader").html(projectCompositeArray[0]);                                          

			for (var i = 0; i < projectCompositeArray[9].length; i++) {                                                  
				builtArticleSection += "<div class=\"projectSubtitleHeader\">" + projectCompositeArray[9][i][0]                                                       
					+ "<div class=\"projectSubtitlePager headerColor icon fa-compress\"></div></div><div class=\""                                                       
					+ "projectSubtitleArticle\">" + $("<div/>").html(projectCompositeArray[9][i][1]).text() + "</div>";                                                            
			}                                                                 
			
			builtRequirementSection += "<div class=\"requirementParentHeader headerColor\">"                                            
				+ "Requirements For " + projectCompositeArray[0] + "</div>";                                           

			for (var i = 0; i < projectCompositeArray[10].length; i++) {                                        
				builtRequirementSection += "<div class=\"requirementSerialHeader headerColor\">"                                  
					+ "(" + projectCompositeArray[10][i][0] + ")" + projectCompositeArray[10][i][1]                                  
					+ "</div><div class=\"requirementHeaderBody\">" + projectCompositeArray[10][i][2]                                            
					+ "</div>";                             
			}                                                                            

			$("#projectGeneralArticle").html(builtArticleSection);                                                  
			$("#projectRequirementChild").html(builtRequirementSection);                                    
			$("#secondDropDownMenu").slideUp(353);                                      
			$("#bodyCover").fadeOut(353);                                        

			if (isBrowserStorageAvailable()) {                                                  
				localStorage.setItem("title", projectCompositeArray[0]);                                            
				localStorage.setItem("category", projectCompositeArray[1]);                                            
				localStorage.setItem("objective", projectCompositeArray[2]);                                            
				localStorage.setItem("developers", projectCompositeArray[3]);                                            
				localStorage.setItem("languages", projectCompositeArray[4]);                                            
				localStorage.setItem("utilityTools", projectCompositeArray[6]);                                            
				localStorage.setItem("subtitilesSize", projectCompositeArray[7]);                                            
				localStorage.setItem("dateModified", projectCompositeArray[8]);                                            
				localStorage.setItem("libraries", projectCompositeArray[5]);                                            
				localStorage.setItem("projectBuiltArticle", builtArticleSection);                                            
				localStorage.setItem("projectBuiltRequirement", builtRequirementSection);                                            
			}                                              
		});                                                
	}                                                                                                

	var isBrowserStorageAvailable = function() {                                   
		var testString = "Test Browser Storage Availability";                            

		try {                                                     
			localStorage.setItem("storage", testString);                               
			localStorage.removeItem("storage");                                   

			return true;                                        
		}                                                              
		catch (exception) {                                              
			return false;                                         
		}                                            
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

	var slideDownSecondMenuCover = function(imageSource, menuTitle, theSubmenuArray) {                               
		var builtUserInterface = "";                                                                    

		getJSONProjectSubmenus.done(function() {                                        
			for (var i = 0; i < theSubmenuArray.length; i++) {                                     
				builtUserInterface += "<div class=\"menuTable baseColor col-xs-2\"><img src=\"image/"                                                                                
					+ theSubmenuArray[i][2] + "\" class=\"menuImage\"/><div class=\"submenuCover submenuCover-short baseColor\">"                                                                                         
					+ theSubmenuArray[i][0] + "</div></div>";                                       	
			}                                                         
		});                                                

		$("#secondDropDownMenuImage").html("<div id=\"sideMenuCover\" class=\"secondMenuCover\"><img src=\""                                    
			+ imageSource + "\" id=\"sideMenuImage\" class=\"menuImage\"/><div id=\"sideMenuTitle\" class=\"secondMenuImageTitle\">"                                  
			+ menuTitle + "</div></div>");                                             

		$("#secondMenuCoverRight").html(builtUserInterface);                                                          

		$("#secondDropDownMenu").slideDown(353);                                            
		$("#dropDownMenu").slideUp(353);                                        
		$("#bodyCover").fadeIn(353);                               
	}                                                           

	var toTitleCase = function(theString) {                     
		return theString.replace(/\w\S*/g, function(anotherString) {                     
			return anotherString.charAt(0).toUpperCase() + anotherString.substr(1).toLowerCase();                            
		});                            
	}                            

	var theSearcher = function(prefix) {                              
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

	var processDownKeyPressForMasterSearch = function() {                               
		if (searchIndexPosition < 0 || searchIndexPosition > searchArrayLength - 1) {                              
			searchIndexPosition = 0;                                          
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#educacodeSearchMaster").setCursorPosition($("#educacodeSearchMaster").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition++;                                                    
		}                                                
		else {                                            
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#educacodeSearchMaster").setCursorPosition($("#educacodeSearchMaster").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition++;                                                    
		}                                                   
	}                                       

	var processUpKeyPressForMasterSearch = function() {                                      
		if (searchIndexPosition < 0 || searchIndexPosition > searchArrayLength - 1) {                              
			searchIndexPosition = searchArrayLength - 1;                         
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#educacodeSearchMaster").setCursorPosition($("#educacodeSearchMaster").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition--;                                                    
		}                                                
		else {                                            
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#educacodeSearchResult").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#educacodeSearchMaster").setCursorPosition($("#educacodeSearchMaster").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition--;                                                    
		}                                                     
	}                                             

	var educacodeSearchResultKeyup = function() {                               
		processDefaultPressedKey();                                    

		if (searchArrayLength <= 0) {                              
			$("#educacodeSearchResult").removeClass("educacodeSearchResult-stretch");                          
			$("#educacodeSearchResult").removeClass("educacodeSearchResult-static");                          
		}                                                
		else if (searchArrayLength > 0 && searchArrayLength < 5) {                            
			$("#educacodeSearchResult").addClass("educacodeSearchResult-stretch");                          
			$("#educacodeSearchResult").removeClass("educacodeSearchResult-static");                          
		}                                       
		else {                                    
			$("#educacodeSearchResult").removeClass("educacodeSearchResult-stretch");                          
			$("#educacodeSearchResult").addClass("educacodeSearchResult-static");                          
		}                                      

		$("#educacodeSearchResult").html(builtString);                             
		$("#educacodeSearchResult").fadeIn(353);                        
	}                                         

	var processDefaultPressedKey = function() {                                 
		builtString = "";                                  
		foundWordsComposite = [];                          
		searchIndexPosition = -1;                                 
		previousIndexPosition = -1;                                    
		isUpArrowKeyPressed = false;                                        
		isDownArrowKeyPressed = false;                                 
		foundWordsComposite = theSearcher($("#educacodeSearchMaster").val());                           
		searchArrayLength = foundWordsComposite.length;                                         

		for (var i = 0; i < searchArrayLength; i++) {                                        
			builtString = builtString + "<div class=\"searchEncyclopediaResultInner\"><b>" + foundWordsComposite[i] + "</b></div>";                         
		}                                                                  
	}                                                

}(jQuery));                     

















/*
$(document).ready(function() {                          

	var isBodyCoverOpen = false;                       

	$.get( "../fragments/slide.html", function( data ) {                   
	  	$( "#sliderDiv" ).html( data );                                   
  	});                

	var sessionCartProducts = $.getJSON('../include/jsonbasicsession.php');                                                               

	$("#cartCheckoutButton").click(function() {                   
		isBodyCoverOpen = true;                         
		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#loginCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                   
		$("#whiteLoginDropDown").slideUp(353);                
		$("#loginDropDown").slideUp(353);                         
		$("#bodyCover").fadeIn(353);                                 
		$("#checkoutOptionsInclude").fadeIn(353);             
	});                

	$("#whiteDropDownCheckoutButton").click(function() {                   
		isBodyCoverOpen = true;                         
		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#loginCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                   
		$("#whiteLoginDropDown").slideUp(353);                
		$("#loginDropDown").slideUp(353);                         
		$("#bodyCover").fadeIn(353);                                 
		$("#checkoutOptionsInclude").fadeIn(353);             
	});                

	$("#purpleDropDownCheckoutButton").click(function() {                   
		isBodyCoverOpen = true;                         
		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#loginCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                   
		$("#whiteLoginDropDown").slideUp(353);                
		$("#loginDropDown").slideUp(353);                         
		$("#bodyCover").fadeIn(353);                                 
		$("#checkoutOptionsInclude").fadeIn(353);             
	});                

	$("#loginSignUpHeader").click(function() {                   
		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#loginCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
		$("#whiteLoginDropDown").slideUp(353);                     
		$("#loginDropDown").slideUp(353);                     
	});                       

	$("#whiteLoginSignUpHeader").click(function() {                
		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#loginCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                   
		$("#whiteLoginDropDown").slideUp(353);                
		$("#loginDropDown").slideUp(353);                         
	});                       

	$("#logoutHeader").click(function() {                
		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#loginCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
		$("#whiteLoginDropDown").slideUp(353);                
		$("#loginDropDown").slideUp(353);                      
	});                       

	$("#whiteLogoutHeader").click(function() {                
		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#loginCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
		$("#whiteLoginDropDown").slideUp(353);                
		$("#loginDropDown").slideUp(353);                            
	});                       

	$("#scrollDiv").scroll(function() {                      
		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#loginCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
		$("#whiteLoginDropDown").slideUp(353);                
		$("#loginDropDown").slideUp(353);                             
	});                     

	$("#loginSideMenuAnchor").hover(function() {             
		$("#sideMenuTitleLogo").slideUp(353);                 
		$("#sideMenuLoginForm").slideDown(353);                  
	});                   

	$("#animationsContainer").hover(function() {            
		$("#sideMenuTitleLogo").slideDown(353);                 
		$("#sideMenuLoginForm").slideUp(353);                  
	});                    

	$("#navigator").hover(function() {            
		$("#sideMenuTitleLogo").slideDown(353);                 
		$("#sideMenuLoginForm").slideUp(353);                  
	});                    

	$("#productsDiv").hover(function() {            
		$("#sideMenuTitleLogo").slideDown(353);                 
		$("#sideMenuLoginForm").slideUp(353);                  
	});                    

	$("#bodyCover").hover(function() {                                   
		$("#sideMenuTitleLogo").slideDown(353);                 
		$("#sideMenuLoginForm").slideUp(353);                    
	});                               

	$("#signUpDiv").hover(function() {            
		$("#sideMenuTitleLogo").slideDown(353);                 
		$("#sideMenuLoginForm").slideUp(353);                  
	});                    

	$("#cartGeneralBody").hover(function() {            
		$("#sideMenuTitleLogo").slideDown(353);                 
		$("#sideMenuLoginForm").slideUp(353);                  
	});                    

	sessionCartProducts.done(function(response) {                                
		if (response.cartProductsArray.length > 5) {
			$("#whiteLoginCartItemsDropDown").removeClass("whiteCartItemsDropDown-static");                     
			$("#whiteLoginCartItemsDropDown").addClass("whiteCartItemsDropDown-flow");                     
			$("#loginCartItemsDropDown").removeClass("cartItemsDropDown-static");                     
			$("#loginCartItemsDropDown").addClass("cartItemsDropDown-flow");                     
		}                                               
		else {                                      
			$("#whiteLoginCartItemsDropDown").removeClass("whiteCartItemsDropDown-flow");                     
			$("#whiteLoginCartItemsDropDown").addClass("whiteCartItemsDropDown-static");                     
			$("#loginCartItemsDropDown").removeClass("cartItemsDropDown-flow");                     
			$("#loginCartItemsDropDown").addClass("cartItemsDropDown-static");                     
		}                         
	});                                    

	$("#whiteLogoutCartItemsIcon").hover(function() {                         
		if (isBodyCoverOpen === false) {                                    
			$("#bodyCover").fadeIn(353);                                 
			$("#whiteLogoutCartItemsDropDownBody").slideDown(353);                          
			$("#whiteLoginDropDown").slideUp(353);                
			$("#loginDropDown").slideUp(353);                  
		}                           
	});                      

	$("#logoutCartItemsIcon").hover(function() {                  
		if (isBodyCoverOpen === false) {                              
			$("#bodyCover").fadeIn(353);                                 
			$("#logoutCartItemsDropDownBody").slideDown(353);                   
			$("#whiteLoginDropDown").slideUp(353);                
			$("#loginDropDown").slideUp(353);                  
		}                         
	});              

	$("#whiteLoginCartItemsIcon").hover(function() {                   
		if (isBodyCoverOpen === false) {                                   
			$("#bodyCover").fadeIn(353);                                 
			$("#whiteLoginCartItemsDropDownBody").slideDown(353);                          
			$("#whiteLoginDropDown").slideUp(353);                
			$("#loginDropDown").slideUp(353);                  
		}                           
	});                      

	$("#loginCartItemsIcon").hover(function() {                             
		if (isBodyCoverOpen === false) {                              
			$("#bodyCover").fadeIn(353);                                 
			$("#loginCartItemsDropDownBody").slideDown(353);                   
			$("#whiteLoginDropDown").slideUp(353);                
			$("#loginDropDown").slideUp(353);                       
		}                         
	});              

	$("#whiteHeaderLoginIcon").hover(function() {               
		if (isBodyCoverOpen === false) {                              
			$("#bodyCover").fadeIn(353);                                 
			$("#logoutCartItemsDropDownBody").slideUp(353);                 
			$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
			$("#loginCartItemsDropDownBody").slideUp(353);                 
			$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
			$("#whiteLoginDropDown").slideDown(353);                          
		}                           
	});                      

	$("#headerLoginIcon").hover(function() {                   
		if (isBodyCoverOpen === false) {                              
			$("#bodyCover").fadeIn(353);                                 
			$("#logoutCartItemsDropDownBody").slideUp(353);                 
			$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
			$("#loginCartItemsDropDownBody").slideUp(353);                 
			$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
			$("#loginDropDown").slideDown(353);                   
		}                         
	});              

	$("#scrollDiv").scroll(function() {                  
		if ($("#scrollDiv").scrollTop() > 0) {                    
			$("#logoutCartItemsDropDownBody").slideUp(353);                 
			$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
			$("#loginCartItemsDropDownBody").slideUp(353);                 
			$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
			$("#whiteLoginSignUpHeader").slideDown(353);            
			$("#whiteLogoutHeader").slideDown(353);                
			$("#loginSignUpHeader").slideUp(353);                 
			$("#logoutHeader").slideUp(353);               
		}                             
		else {                             
			$("#logoutCartItemsDropDownBody").slideUp(353);                 
			$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
			$("#loginCartItemsDropDownBody").slideUp(353);                 
			$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
			$("#whiteLoginSignUpHeader").slideUp(353);           
			$("#whiteLogoutHeader").slideUp(353);               
			$("#loginSignUpHeader").slideDown(353);                
			$("#logoutHeader").slideDown(353);               
		}                 

		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
		$("#loginCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLoginDropDown").slideUp(353);                          
		$("#loginDropDown").slideUp(353);                              
	});                     

	$("#whiteCloseNavicon").click(function() {                       
		isBodyCoverOpen = false;                           
		
		$("#openNavicon").show();              
		$("#whiteOpenNavicon").show();              

		$("#whiteCloseNavicon").hide();               
		$("#closeNavicon").hide();                       

		$("#checkoutOptionsInclude").fadeOut(353);                 
		$("#bodyCover").fadeOut(353);                         

		$("#sideMenuTitleLogo").slideDown(353);                 
		$("#sideMenuLoginForm").slideUp(353);                  

		if (($("#logoutSideMenu").is(":visible")) || ($("#loginSideMenu").is(":visible"))) {                               
			$("#logoutSideMenu").animate({width : "toggle"}, 353);                            
			$("#loginSideMenu").animate({width : "toggle"}, 353);                                    
		}                                             
	});                    

	$("#openNavicon").click(function() {                      
		isBodyCoverOpen = true;                           
		
		$("#openNavicon").hide();                
		$("#whiteOpenNavicon").hide();                

		$("#closeNavicon").show();                 
		$("#whiteCloseNavicon").show();                 

		$("#checkoutOptionsInclude").fadeOut(353);                   
		$("#bodyCover").fadeIn(353);                
	
		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
		$("#loginCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLoginDropDown").slideUp(353);                    
		$("#loginDropDown").slideUp(353);                            

		if (($("#logoutSideMenu").not(":visible")) || ($("#loginSideMenu").not(":visible"))) {                               
			$("#logoutSideMenu").animate({width : "toggle"}, 353);                            
			$("#loginSideMenu").animate({width : "toggle"}, 353);                                    
		}                                                   
	});                

	$("#closeNavicon").click(function() {                          
		isBodyCoverOpen = false;                           

		$("#closeNavicon").hide();                 
		$("#whiteCloseNavicon").hide();                 

		$("#openNavicon").show();                
		$("#whiteOpenNavicon").show();                

		$("#checkoutOptionsInclude").fadeOut(353);                    
		$("#bodyCover").fadeOut(353);         

		$("#sideMenuTitleLogo").slideDown(353);                 
		$("#sideMenuLoginForm").slideUp(353);                  

		if (($("#logoutSideMenu").is(":visible")) || ($("#loginSideMenu").is(":visible"))) {                               
			$("#logoutSideMenu").animate({width : "toggle"}, 353);                            
			$("#loginSideMenu").animate({width : "toggle"}, 353);                                    
		}                                                 
	});                   

	$("#bodyCover").click(function() {                           
		isBodyCoverOpen = false;                         

		$("#closeNavicon").hide();                     
		$("#whiteCloseNavicon").hide();                    

		$("#openNavicon").show();                
		$("#whiteOpenNavicon").show();                

		$("#checkoutOptionsInclude").fadeOut(353);                   
		$("#bodyCover").fadeOut(353);                    

		$("#sideMenuTitleLogo").slideDown(353);                 
		$("#sideMenuLoginForm").slideUp(353);                  

		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
		$("#loginCartItemsDropDownBody").slideUp(353);                        
		$("#whiteLoginDropDown").slideUp(353);                      
		$("#loginDropDown").slideUp(353);                      

		if (($("#logoutSideMenu").is(":visible")) || ($("#loginSideMenu").is(":visible"))) {                               
			$("#logoutSideMenu").animate({width : "toggle"}, 353);                                               
			$("#loginSideMenu").animate({width : "toggle"}, 353);                                    
		}                                                   
	});                   

	$("#whiteOpenNavicon").click(function() {                      
		isBodyCoverOpen = true;                           
		
		$("#openNavicon").hide();                 
		$("#whiteOpenNavicon").hide();                      

		$("#closeNavicon").show();            
		$("#whiteCloseNavicon").show();            

		$("#checkoutOptionsInclude").fadeOut(353);                 
		$("#bodyCover").fadeIn(353);          

		$("#logoutCartItemsDropDownBody").slideUp(353);                 
		$("#whiteLogoutCartItemsDropDownBody").slideUp(353);                   
		$("#whiteLoginCartItemsDropDownBody").slideUp(353);                    
		$("#loginCartItemsDropDownBody").slideUp(353);                        
		$("#whiteLoginDropDown").slideUp(353);                      
		$("#loginDropDown").slideUp(353);                      

		if (($("#logoutSideMenu").not(":visible")) || ($("#loginSideMenu").not(":visible"))) {                               
			$("#logoutSideMenu").animate({width : "toggle"}, 353);                            
			$("#loginSideMenu").animate({width : "toggle"}, 353);                                    
		}                                           
	});                                              
});             



		/* // if ($("#scrollDiv").height() - $(window).height() - $(window).scrollTop()) {                    
		if ($(window).scrollTop() + $(window).height()) {                    
			if ($("#contactUsFooter").not(":visible")) {                               
				$("#contactUsFooter").animate({width : "toggle"}, 353);                                    
			}                                             
		}                             
		else {                                  
			// if ($("#contactUsFooter").is(":visible")) {                               
				$("#contactUsFooter").animate({width : "toggle"}, 353);                                    
			// }                                             
		}                            

	/*
	location.reload(true); // cleans the cache before reloading the page                     
	location.reload(false); OR location.reload(); // reloads the page from cache                      
	                     

	/* addClass(), removeClass() and removeAttr() methods are of great importance here!                  

	/*$("#headerLoginButton").removeAttr("type");        
	/*$("#headerLoginForm").removeAttr("action", "method");        

/*

text() - Sets or returns the text content of selected elements
html() - Sets or returns the content of selected elements (including HTML markup)
val() - Sets or returns the value of form fields



$("button").click(function(){
    $("img").attr("width","500");
});                     



$("#btn1").click(function(){
    alert("Text: " + $("#test").text());
});
$("#btn2").click(function(){
    alert("HTML: " + $("#test").html());
});



$("#btn1").click(function(){
    $("#test1").text("Hello world!");
});
$("#btn2").click(function(){
    $("#test2").html("<b>Hello world!</b>");
});
$("#btn3").click(function(){
    $("#test3").val("Dolly Duck");
});



$("#btn1").click(function(){
    alert("Value: " + $("#test").val());
});



$("#btn1").click(function(){
    $("#test1").text(function(i, origText){
        return "Old text: " + origText + " New text: Hello world!
        (index: " + i + ")"; 
    });
});

$("#btn2").click(function(){
    $("#test2").html(function(i, origText){
        return "Old html: " + origText + " New html: Hello <b>world!</b>
        (index: " + i + ")"; 
    });
});



$("button").click(function(){
    $("#w3s").attr("href", "https://www.w3schools.com/jquery");
});



$("button").click(function(){
    $("#w3s").attr({
        "href" : "https://www.w3schools.com/jquery",
        "title" : "W3Schools jQuery Tutorial"
    });
});           



$("button").click(function(){
    $("#w3s").attr("href", function(i, origValue){
        return origValue + "/jquery"; 
    });
});



$("button").click(function(){
    alert($("#w3s").attr("href"));
});               



	// $("#sliderDiv").load("../fragments/slide.html");             

/*
	$("#animationsContainer").click(function() {            
		if (isAnySideMenuOpen === true) {                    
			isAnySideMenuOpen = false;                       

			$("#logoutSideMenu").animate({width:"toggle"}, 353);               
			$("#loginSideMenu").animate({width:"toggle"}, 353);               
	
			$("#openNavicon").show();              
			$("#whiteOpenNavicon").show();              

			$("#whiteCloseNavicon").hide();               
			$("#closeNavicon").hide();                       
		}                             
	});                    

	$("#navigator").click(function() {            
		if (isAnySideMenuOpen === true) {                    
			isAnySideMenuOpen = false;                       

			$("#logoutSideMenu").animate({width:"toggle"}, 353);               
			$("#loginSideMenu").animate({width:"toggle"}, 353);               
	
			$("#openNavicon").show();              
			$("#whiteOpenNavicon").show();              

			$("#whiteCloseNavicon").hide();               
			$("#closeNavicon").hide();                       
		}                             
	});                    

	$("#productsDiv").click(function() {            
		if (isAnySideMenuOpen === true) {                    
			isAnySideMenuOpen = false;                       

			$("#logoutSideMenu").animate({width:"toggle"}, 353);               
			$("#loginSideMenu").animate({width:"toggle"}, 353);               
	
			$("#openNavicon").show();              
			$("#whiteOpenNavicon").show();              

			$("#whiteCloseNavicon").hide();               
			$("#closeNavicon").hide();                       
		}                             
	});                    

	$("#signUpDiv").click(function() {            
		if (isAnySideMenuOpen === true) {                    
			isAnySideMenuOpen = false;                       

			$("#logoutSideMenu").animate({width:"toggle"}, 353);               
			$("#loginSideMenu").animate({width:"toggle"}, 353);               
	
			$("#openNavicon").show();              
			$("#whiteOpenNavicon").show();              

			$("#whiteCloseNavicon").hide();               
			$("#closeNavicon").hide();                       
		}                             
	});                    

	$("#cartGeneralBody").click(function() {                    
		if (isAnySideMenuOpen === true) {                    
			isAnySideMenuOpen = false;                       

			$("#logoutSideMenu").animate({width:"toggle"}, 353);               
			$("#loginSideMenu").animate({width:"toggle"}, 353);               
	
			$("#openNavicon").show();              
			$("#whiteOpenNavicon").show();              

			$("#whiteCloseNavicon").hide();               
			$("#closeNavicon").hide();                       
		}                             
	});                         



*/