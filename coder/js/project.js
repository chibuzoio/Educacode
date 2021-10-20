
(function($) {                  

	var defObject = {};                            
	var builtString = "";                          
	var jsonDefinitions = [];                                
	var searchArrayLength = 0;                            
	var searchIndexPosition = -1;                              
	var foundWordsComposite = [];                        
	var previousIndexPosition = -1;                              
	var isUpArrowKeyPressed = false;                         
	var isDownArrowKeyPressed = false;                         

	$.getJSON('../coderback/jsonfetchdefinition.php').done(function(theJson) {                     
		for (var i = 0; i < theJson.length; i++) {                                 
			jsonDefinitions.push(theJson[i]);                      			
		}                                                   
	});                            

	$("#projectRequirementSection").click(function() {                                                  
		$("#educacodeEncyclopediaUp").hide();                                
		$("#educacodeEncyclopediaDown").show();                                      
	});                                                            

	$("#projectRequirementDisplay").click(function() {                                        
		$("#projectRequirementSection").fadeIn(353);                                       
		$("#bodyCover").fadeIn(353);                                          
	});                                                    

	$("#projectSubtitlesAdjuster").click(function() {                                       
		if ($("#projectSubtitlesAdjuster").hasClass("fa-compress")) {                                  
			$(".projectSubtitleArticle").slideUp(353);                                     
	 		$(".projectSubtitleHeader").addClass("shadowSubtitleHeader");                                              
	 		$(".projectSubtitlePager").removeClass("fa-compress");                                
	 		$(".projectSubtitlePager").addClass("fa-expand");                                   
			$("#projectSubtitlesAdjuster").removeClass("fa-compress");                                       
			$("#projectSubtitlesAdjuster").addClass("fa-expand");                                       
			$("#projectSubtitlesAdjuster").attr("title", "Expand All Subtitles");                                   
		}                                                                                
		else {                                                        
			$(".projectSubtitleArticle").slideDown(353);                                     
	 		$(".projectSubtitleHeader").removeClass("shadowSubtitleHeader");                                              
	 		$(".projectSubtitlePager").addClass("fa-compress");                                
	 		$(".projectSubtitlePager").removeClass("fa-expand");                                   
			$("#projectSubtitlesAdjuster").addClass("fa-compress");                                       
			$("#projectSubtitlesAdjuster").removeClass("fa-expand");                                       
			$("#projectSubtitlesAdjuster").attr("title", "Collapse All Subtitles");                                   
		}                                                    
	});                                                            

	$("#projectMetadataChevronUp").click(function() {                                  
		$("#hideProjectMetadata").fadeIn(353);                                  
		$("#showProjectMetadata").slideUp(353);                             
		$("#bodyCover").fadeOut(353);                                        
	});                                            

	$("#projectMetadataChevronDown").click(function() {                                  
		$("#hideProjectMetadata").fadeOut(353);                                  
		$("#projectRequirementSection").fadeOut(353);                                      
		$("#showProjectMetadata").slideDown(353);                             
		$("#educacodeEncyclopediaDown").show();                     
		$("#educacodeEncyclopediaUp").hide();                   
		$("#bodyCover").fadeIn(353);                                        
	});                                            

	$("#projectGeneralArticle").click(function(event) {                                  
		if ($(event.target).is(".projectSubtitlePager")) {                             
		 	if ($(event.target).hasClass("fa-compress")) {                             
		 		$(event.target).parent(".projectSubtitleHeader").next(".projectSubtitleArticle").slideUp(353);                                     
		 		$(event.target).parent(".projectSubtitleHeader").addClass("shadowSubtitleHeader");                                              
		 		$(event.target).removeClass("fa-compress");                                
		 		$(event.target).addClass("fa-expand");                                
		 	}                                                  
		 	else {                                                      
		 		$(event.target).addClass("fa-compress");                                
		 		$(event.target).removeClass("fa-expand");                                
		 		$(event.target).parent(".projectSubtitleHeader").next(".projectSubtitleArticle").slideDown(353);                                     
		 		$(event.target).parent(".projectSubtitleHeader").removeClass("shadowSubtitleHeader");                                              
		 	}                                              
		}	                                               
		else if ($(event.target).is(".shadowSubtitleHeader")) {                                         
	 		$(event.target).next(".projectSubtitleArticle").slideDown(353);                                     
	 		$(event.target).find(".projectSubtitlePager").removeClass("fa-expand");                                                  
	 		$(event.target).find(".projectSubtitlePager").addClass("fa-compress");                                          
	 		$(event.target).removeClass("shadowSubtitleHeader");                                              
	 	}                                                                       
	});                                                 

	$("#searchEncyclopediaUp").keyup(function(event) {                              
		switch (event.keyCode) {                                
			case 38:                                          
				isUpArrowKeyPressed = true;                                   
			
				if (isDownArrowKeyPressed === true) {                              
					searchIndexPosition = searchIndexPosition - 2;                             
					processUpKeyPressForUp();                                      
				}                                            
				else {                                         
					processUpKeyPressForUp();                              
				}                                  

				isDownArrowKeyPressed = false;                                

				break;                         
			case 40:                                        
				isDownArrowKeyPressed = true;                                       

				if (isUpArrowKeyPressed === true) {                          
					searchIndexPosition = searchIndexPosition + 2;                            
					processDownKeyPressForUp();                                      
				}                                            
				else {                                         
					processDownKeyPressForUp();                        
				}                                  
				
				isUpArrowKeyPressed = false;                                 
	
				break;                          
			case 13:                           
				event.preventDefault();                           			

				if (isUpArrowKeyPressed === true || isDownArrowKeyPressed === true) {                                  
					$("#educacodeEncyclopediaBody").html(getDefinition($("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).text(), jsonDefinitions));                                          
					$("#educacodeEncyclopediaUp").show();                   
					$("#educacodeEncyclopediaDown").hide();                            
					$("#hideProjectMetadata").fadeIn(353);                                  
					$("#showProjectMetadata").slideUp(353);                             
					$("#encyclopediaHeaderUp").slideDown(353);                    
					$("#searchEncyclopediaCoverUp").slideUp(353);              
					$("#encyclopediaChevronHeaderUp").slideDown(353);                  
					$("#encyclopediaChevronSearchUp").slideUp(353);                  
					$("#searchEncyclopediaResultUp").fadeOut(353);                        
					$("#searchEncyclopediaUp").val("");                          
					$("#bodyCover").fadeIn(353);                      
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
				searchEncyclopediaUpKeyup();                                        
		}                                     
	});                             

	$("#searchEncyclopediaDown").keyup(function(event) {                              
		switch (event.keyCode) {                                
			case 38:                                          
				isUpArrowKeyPressed = true;                                   
			
				if (isDownArrowKeyPressed === true) {                              
					searchIndexPosition = searchIndexPosition - 2;                             
					processUpKeyPressForDown();                                      
				}                                            
				else {                                         
					processUpKeyPressForDown();                              
				}                                  

				isDownArrowKeyPressed = false;                                

				break;                         
			case 40:                                        
				isDownArrowKeyPressed = true;                                       

				if (isUpArrowKeyPressed === true) {                          
					searchIndexPosition = searchIndexPosition + 2;                            
					processDownKeyPressForDown();                                      
				}                                            
				else {                                         
					processDownKeyPressForDown();                        
				}                                  
				
				isUpArrowKeyPressed = false;                                 

				break;                          
			case 13:                           
				event.preventDefault();                           			

				if (isUpArrowKeyPressed === true || isDownArrowKeyPressed === true) {                                  
					$("#educacodeEncyclopediaBody").html(getDefinition($("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).text(), jsonDefinitions));                                          
					$("#educacodeEncyclopediaUp").show();                   
					$("#educacodeEncyclopediaDown").hide();                            
					$("#hideProjectMetadata").fadeIn(353);                                  
					$("#showProjectMetadata").slideUp(353);                             
					$("#encyclopediaHeaderDown").slideDown(353);                    
					$("#searchEncyclopediaCoverDown").slideUp(353);              
					$("#encyclopediaChevronHeaderUp").slideDown(353);                  
					$("#encyclopediaChevronSearchUp").slideUp(353);                  
					$("#searchEncyclopediaResultDown").fadeOut(353);                        
					$("#searchEncyclopediaResultUp").fadeOut(353);                        
					$("#searchEncyclopediaDown").val("");                          
					$("#searchEncyclopediaUp").val("");                        
					$("#bodyCover").fadeIn(353);                      
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
				searchEncyclopediaDownKeyup();                                        
		}                                     
	});                             

	$("#bodyCover").click(function() {                              
		$("#projectRequirementSection").fadeOut(353);                               
		$("#educacodeEncyclopediaUp").hide();                                
		$("#educacodeEncyclopediaDown").show();                                      
		$("#hideProjectMetadata").fadeIn(353);                                  
		$("#showProjectMetadata").slideUp(353);                             
		$("#bodyCover").fadeOut(353);                      
	});                                

	$("#searchEncyclopediaUp").blur(function() {                   
		$("#encyclopediaHeaderUp").slideDown(353);                    
		$("#searchEncyclopediaCoverUp").slideUp(353);                       
		$("#encyclopediaChevronHeaderDown").slideDown(353);                  
		$("#encyclopediaChevronSearchDown").slideUp(353);                  
		$("#searchEncyclopediaResultDown").fadeOut(353);                        
		$("#searchEncyclopediaResultUp").fadeOut(353);                        
		$("#searchEncyclopediaDown").val("");                          
		$("#searchEncyclopediaUp").val("");                        
	});                               

	$("#searchEncyclopediaDown").blur(function() {                   
		$("#encyclopediaHeaderDown").slideDown(353);                    
		$("#searchEncyclopediaCoverDown").slideUp(353);              
		$("#encyclopediaChevronHeaderUp").slideDown(353);                  
		$("#encyclopediaChevronSearchUp").slideUp(353);                  
		$("#searchEncyclopediaResultDown").fadeOut(353);                        
		$("#searchEncyclopediaResultUp").fadeOut(353);                        
		$("#searchEncyclopediaDown").val("");                          
		$("#searchEncyclopediaUp").val("");                        
	});                               

	$("#encyclopediaChevronSearchDown").click(function() {                   
		$("#educacodeEncyclopediaUp").hide();                   
		$("#educacodeEncyclopediaDown").show();                          

		if ($("#projectRequirementSection").is(":visible")) {                                          
			$("#bodyCover").fadeIn(353);                      
		}                                                                   
		else {                                                    
			$("#bodyCover").fadeOut(353);                      
		}                                            
	});                               

	$("#encyclopediaChevronHeaderDown").click(function() {                   
		$("#educacodeEncyclopediaUp").hide();                   
		$("#educacodeEncyclopediaDown").show();                         

		if ($("#projectRequirementSection").is(":visible")) {                                          
			$("#bodyCover").fadeIn(353);                      
		}                                                                   
		else {                                                    
			$("#bodyCover").fadeOut(353);                      
		}                                            
	});                               

	$("#educacodeEncyclopediaUp").hover(function() {                      
		$("#encyclopediaHeaderUp").slideUp(353);                    
		$("#searchEncyclopediaCoverUp").slideDown(353);              
		$("#encyclopediaChevronHeaderDown").slideUp(353);                  
		$("#encyclopediaChevronSearchDown").slideDown(353);                  
	},                                            

	function() {                             
		if ($("#searchEncyclopediaUp").is(":focus")) {                          
			$("#encyclopediaHeaderUp").slideUp(353);                    
			$("#searchEncyclopediaCoverUp").slideDown(353);              
			$("#encyclopediaChevronHeaderDown").slideUp(353);                  
			$("#encyclopediaChevronSearchDown").slideDown(353);                  
		}                                                  
		else {                                 
			$("#encyclopediaHeaderUp").slideDown(353);                    
			$("#searchEncyclopediaCoverUp").slideUp(353);              
			$("#encyclopediaChevronHeaderDown").slideDown(353);                  
			$("#encyclopediaChevronSearchDown").slideUp(353);                  
			$("#searchEncyclopediaResultDown").fadeOut(353);                        
			$("#searchEncyclopediaResultUp").fadeOut(353);                        
			$("#searchEncyclopediaDown").val("");                          
			$("#searchEncyclopediaUp").val("");                        
		}                              
	});                              

	$("#encyclopediaChevronSearchUp").click(function() {                   
		$("#educacodeEncyclopediaUp").show();                   
		$("#educacodeEncyclopediaDown").hide();                     
		$("#hideProjectMetadata").fadeIn(353);                                  
		$("#showProjectMetadata").slideUp(353);                             
		$("#bodyCover").fadeIn(353);                      
	});                               

	$("#encyclopediaChevronHeaderUp").click(function() {                   
		$("#educacodeEncyclopediaUp").show();                   
		$("#educacodeEncyclopediaDown").hide();                    
		$("#hideProjectMetadata").fadeIn(353);                                  
		$("#showProjectMetadata").slideUp(353);                             
		$("#bodyCover").fadeIn(353);                      
	});                               

	$("#educacodeEncyclopediaDown").hover(function() {                      
		$("#encyclopediaHeaderDown").slideUp(353);                    
		$("#searchEncyclopediaCoverDown").slideDown(353);              
		$("#encyclopediaChevronHeaderUp").slideUp(353);                  
		$("#encyclopediaChevronSearchUp").slideDown(353);                  
	},                                      

	function() {                             
		if ($("#searchEncyclopediaDown").is(":focus")) {                    
			$("#encyclopediaHeaderDown").slideUp(353);                    
			$("#searchEncyclopediaCoverDown").slideDown(353);              
			$("#encyclopediaChevronHeaderUp").slideUp(353);                  
			$("#encyclopediaChevronSearchUp").slideDown(353);                          
			$("#educacodeEncyclopediaDown").fadeIn(353);                                                      
		}                                
		else {                                
			$("#encyclopediaHeaderDown").slideDown(353);                    
			$("#searchEncyclopediaCoverDown").slideUp(353);              
			$("#encyclopediaChevronHeaderUp").slideDown(353);                  
			$("#encyclopediaChevronSearchUp").slideUp(353);                  
			$("#searchEncyclopediaResultDown").fadeOut(353);                        
			$("#searchEncyclopediaResultUp").fadeOut(353);                        
			$("#searchEncyclopediaDown").val("");                          
			$("#searchEncyclopediaUp").val("");                        
		}                                   
	});                              

	$("#educacodeEncyclopediaBody").click(function(event) {             
		var clicked = $(event.target);                           
		
		if (clicked.is("b")) {                                
			$("#educacodeEncyclopediaBody").html(getDefinition(toTitleCase(clicked.text()), jsonDefinitions));                   
		}                             
	});                

	$("#searchEncyclopediaResultUp").click(function(event) {                         
		var clicked = $(event.target);                           

		if (clicked.is("b")) {                          
			$("#educacodeEncyclopediaBody").html(getDefinition(clicked.text(), jsonDefinitions));                   
		}                             
		else if (clicked.is("div")) {                         
			$("#educacodeEncyclopediaBody").html(getDefinition(clicked.find("b").text(), jsonDefinitions));                   
		}                                
	});                       

	$("#searchEncyclopediaResultDown").click(function(event) {                         
		var clicked = $(event.target);                     

		if (clicked.is("b")) {
			$("#educacodeEncyclopediaBody").html(getDefinition(clicked.text(), jsonDefinitions));                                          
			$("#educacodeEncyclopediaUp").show();                   
			$("#educacodeEncyclopediaDown").hide();                       
			$("#hideProjectMetadata").fadeIn(353);                                  
			$("#showProjectMetadata").slideUp(353);                             
			$("#bodyCover").fadeIn(353);                      
		}                             
		else if (clicked.is("div")) {                         
			$("#educacodeEncyclopediaBody").html(getDefinition(clicked.find("b").text(), jsonDefinitions));                                          
			$("#educacodeEncyclopediaUp").show();                                           
			$("#educacodeEncyclopediaDown").hide();                                      
			$("#hideProjectMetadata").fadeIn(353);                                  
			$("#showProjectMetadata").slideUp(353);                             
			$("#bodyCover").fadeIn(353);                      
		}                                                      
	});                                

	var processHangingFlagsVisibility = function() {                                                       
		if (!$("#showProjectMetadata").is(":visible")) {                                                 
			$("#hideProjectMetadata").slideDown(353);                                 
		}                                                                   

		if (!$("#educacodeEncyclopediaUp").is(":visible")) {                                                   
			$("#educacodeEncyclopediaDown").fadeIn(353);                                                  
		}                                                                          

		setTimeout(function() {                                                           
			$("#hideProjectMetadata").slideUp(353);                                  
			$("#educacodeEncyclopediaDown").fadeOut(353);                                      
		}, 3000);                                                       
	}                                                       

	var processDownKeyPressForUp = function() {                               
		if (searchIndexPosition < 0 || searchIndexPosition > searchArrayLength - 1) {                              
			searchIndexPosition = 0;                                         
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#searchEncyclopediaUp").setCursorPosition($("#searchEncyclopediaUp").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition++;                                                    
		}                                                
		else {                                            
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#searchEncyclopediaUp").setCursorPosition($("#searchEncyclopediaUp").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition++;                                                    
		}                                                   
	}                                       

	var processDownKeyPressForDown = function() {                               
		if (searchIndexPosition < 0 || searchIndexPosition > searchArrayLength - 1) {                              
			searchIndexPosition = 0;                         
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#searchEncyclopediaDown").setCursorPosition($("#searchEncyclopediaDown").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition++;                                                    
		}                                                
		else {                                            
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#searchEncyclopediaDown").setCursorPosition($("#searchEncyclopediaDown").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition++;                                                    
		}                                                   
	}                                       

	var processUpKeyPressForUp = function() {                                      
		if (searchIndexPosition < 0 || searchIndexPosition > searchArrayLength - 1) {                              
			searchIndexPosition = searchArrayLength - 1;                         
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#searchEncyclopediaUp").setCursorPosition($("#searchEncyclopediaUp").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition--;                                                    
		}                                                
		else {                                            
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultUp").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#searchEncyclopediaUp").setCursorPosition($("#searchEncyclopediaUp").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition--;                                                    
		}                                                     
	}                                             

	var processUpKeyPressForDown = function() {                                      
		if (searchIndexPosition < 0 || searchIndexPosition > searchArrayLength - 1) {                              
			searchIndexPosition = searchArrayLength - 1;                         
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#searchEncyclopediaDown").setCursorPosition($("#searchEncyclopediaDown").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition--;                                                    
		}                                                
		else {                                            
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(previousIndexPosition).removeClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(searchIndexPosition).addClass("hoverSearchEncyclopediaResultInner");                        
			$("#searchEncyclopediaResultDown").find(".searchEncyclopediaResultInner").eq(searchIndexPosition)[0].scrollIntoView();                                
			$("#searchEncyclopediaDown").setCursorPosition($("#searchEncyclopediaDown").val().length);                                                   
			previousIndexPosition = searchIndexPosition;                                         
			searchIndexPosition--;                                                    
		}                                                     
	}                                             

	var processDefaultPressedKey = function(searchRegion) {                                 
		builtString = "";                                  
		foundWordsComposite = [];                          
		searchIndexPosition = -1;                                 
		previousIndexPosition = -1;                                    
		isUpArrowKeyPressed = false;                                        
		isDownArrowKeyPressed = false;                                 
		
		if (searchRegion === "top") {                                     
			foundWordsComposite = theSearcher($("#searchEncyclopediaUp").val());                           
		}                                        
		else if (searchRegion === "down") {                                        
			foundWordsComposite = theSearcher($("#searchEncyclopediaDown").val());                            
		}                                                     

		searchArrayLength = foundWordsComposite.length;                                         

		for (var i = 0; i < searchArrayLength; i++) {                                        
			builtString = builtString + "<div class=\"searchEncyclopediaResultInner\"><b>" + foundWordsComposite[i] + "</b></div>";                         
		}                                                                  
	}                                                

	var searchEncyclopediaUpKeyup = function() {                               
		processDefaultPressedKey("top");                                    

		switch (searchArrayLength) {                                 
			case 0:                          
				$("#searchEncyclopediaResultUp").removeClass("searchEncyclopediaResultUp-stretch");                          
				$("#searchEncyclopediaResultUp").removeClass("searchEncyclopediaResultUp-static");                          

				break;                      
			case 1:                          
				$("#searchEncyclopediaResultUp").addClass("searchEncyclopediaResultUp-stretch");                          
				$("#searchEncyclopediaResultUp").removeClass("searchEncyclopediaResultUp-static");                          

				break;                      
			case 2:                          
				$("#searchEncyclopediaResultUp").addClass("searchEncyclopediaResultUp-stretch");                          
				$("#searchEncyclopediaResultUp").removeClass("searchEncyclopediaResultUp-static");                          

				break;                      
			case 3:                          
				$("#searchEncyclopediaResultUp").addClass("searchEncyclopediaResultUp-stretch");                          
				$("#searchEncyclopediaResultUp").removeClass("searchEncyclopediaResultUp-static");                          

				break;                      
			case 4:                          
				$("#searchEncyclopediaResultUp").addClass("searchEncyclopediaResultUp-stretch");                          
				$("#searchEncyclopediaResultUp").removeClass("searchEncyclopediaResultUp-static");                          

				break;                      
			case 5:                          
				$("#searchEncyclopediaResultUp").removeClass("searchEncyclopediaResultUp-stretch");                          
				$("#searchEncyclopediaResultUp").addClass("searchEncyclopediaResultUp-static");                          

				break;                      
			default:                          
				$("#searchEncyclopediaResultUp").removeClass("searchEncyclopediaResultUp-stretch");                          
				$("#searchEncyclopediaResultUp").addClass("searchEncyclopediaResultUp-static");                          
		}                                                   

		$("#searchEncyclopediaResultUp").html(builtString);                             
		$("#searchEncyclopediaResultUp").fadeIn(353);                        
	}                                         

	var searchEncyclopediaDownKeyup = function() {                               
		processDefaultPressedKey("down");                                    

		switch (searchArrayLength) {                                        
			case 0:                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-one");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-two");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-three");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-four");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-five");                          

				break;                      
			case 1:                          
				$("#searchEncyclopediaResultDown").addClass("searchEncyclopediaResultDown-one");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-two");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-three");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-four");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-five");                          

				break;                      
			case 2:                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-one");                          
				$("#searchEncyclopediaResultDown").addClass("searchEncyclopediaResultDown-two");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-three");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-four");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-five");                          

				break;                      
			case 3:                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-one");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-two");                          
				$("#searchEncyclopediaResultDown").addClass("searchEncyclopediaResultDown-three");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-four");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-five");                          

				break;                      
			case 4:                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-one");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-two");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-three");                          
				$("#searchEncyclopediaResultDown").addClass("searchEncyclopediaResultDown-four");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-five");                          

				break;                      
			case 5:                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-one");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-two");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-three");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-four");                          
				$("#searchEncyclopediaResultDown").addClass("searchEncyclopediaResultDown-five");                          

				break;                      
			default:                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-one");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-two");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-three");                          
				$("#searchEncyclopediaResultDown").removeClass("searchEncyclopediaResultDown-four");                          
				$("#searchEncyclopediaResultDown").addClass("searchEncyclopediaResultDown-five");                          
		}                                                   

		$("#searchEncyclopediaResultDown").html(builtString);                             
		$("#searchEncyclopediaResultDown").fadeIn(353);                        
	}                                         

	var getDefinition = function(theSearch, searchArray) {                     
		var gottenArray = [];                   
		var builtString = "";                        

		for (var i = 0; i < searchArray.length; i++) {                         
			if (searchArray[i][0] === theSearch) {                     
				gottenArray = searchArray[i];                            

				break;                       
			}                             
		}                              

		builtString = builtString + "<div class=\"coverTitleAndLastEdited\"><div id=\"encyclopediaBodyTitle\" class=\"encyclopediaBodyTitle col-xs-9\">"                         
			+ gottenArray[0] + "</div><div id=\"encyclopediaLastEdited\" class=\"encyclopediaLastEdited col-xs-3\">Last Edited<br><div id=\"encyclopediaLastEditedDate\" class=\"encyclopediaLastEditedDate\">"                              
			+ gottenArray[2].substring(0, 10) + "</div></div></div><div id=\"encyclopediaBodyParts\" class=\"encyclopediaBodyParts\">"                                 
			+ $("<div/>").html(gottenArray[1]).text() + "</div>";                                             

		return builtString;                       
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

		for (var i = 0; i < jsonDefinitions.length; i++) {                
			if (prefix !== "") {                           
				if (jsonDefinitions[i][0].startsWith(prefix)) {                                         
					foundStrings.push(jsonDefinitions[i][0]);                             
				}                                      
			}                                         
		}                            

		return foundStrings;                   
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

	var inArray = function(array, value) {                         
		return array.indexOf(value) > -1;                                 
	}                           

}(jQuery));                   

/*                             
	var insertBoldElement = function(theDefinition) {                             
		var result = "";               
		var indices = [];                        
		var firstValue = "<b>";                           
		var secondValue = "</b>";                          

		if (theDefinition !== "") {                            
			getWords.done(function(theJson) {                          
				for (var i = 0; i < theJson.length; i++) {                              
					var regex = new RegExp(theJson[i], "gi");                                      
					while (result = regex.exec(theDefinition)) {                            
						if ((theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + secondValue.length) !== "</b>")                                                 
							&& ((theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === " ")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === ";")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === ":")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === ",")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === "\"")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === "'")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === ".")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === "/")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === "?")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === "!")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === "-")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === "(")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === ")")                                               
							|| (theDefinition.substring(result.index + theJson[i].length, result.index + theJson[i].length + 1) === ""))) {                                    
							indices.push(result.index);                                                

							theDefinition = [theDefinition.slice(0, result.index), firstValue, theDefinition.slice(result.index)].join("");               

							theDefinition = [theDefinition.slice(0, result.index + theJson[i].length + 3), secondValue, theDefinition.slice(result.index + theJson[i].length + 3)].join("");               
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
*/                              

/*
	$("#educacodeEncyclopediaDown").hover(function() {                                         
		$("#educacodeEncyclopediaDown").fadeIn(353);                                           

		setTimeout(function() {                                           
			$("#hideProjectMetadata").slideUp(353);                                  
			$("#educacodeEncyclopediaDown").fadeOut(353);                                      
		}, 3000);                                                       		
	});                                                       

	$("#hideProjectMetadata").hover(function() {                                         
		$("#hideProjectMetadata").slideDown(353);                                           

		setTimeout(function() {                                           
			$("#hideProjectMetadata").slideUp(353);                                  
			$("#educacodeEncyclopediaDown").fadeOut(353);                                      
		}, 3000);                                                       		
	});                                                       

	$("#projectTitleHeader").hover(function() {                                                 
		processHangingFlagsVisibility();                                 
	});                                                                

	$("#projectGeneralArticle").hover(function() {                                                     
		processHangingFlagsVisibility();                                                        
	});                                                                        

	$("#projectRequirementSection").hover(function() {                                                     
		processHangingFlagsVisibility();                                                 
	});                                                                        

	setTimeout(function() {                                           
		$("#hideProjectMetadata").slideUp(353);                                  
		$("#educacodeEncyclopediaDown").fadeOut(353);                                      
	}, 3000);                                                       

	$("#searchEncyclopediaDown").blur(function() {                                                  
		setTimeout(function() {                                           
			$("#hideProjectMetadata").slideUp(353);                                  
			$("#educacodeEncyclopediaDown").fadeOut(353);                                      
		}, 3000);                                                       
	});                                                            

	$("#searchEncyclopediaDown").focus(function() {                                                  
		$("#educacodeEncyclopediaDown").fadeIn(353);                                         
	});                                                            

	$("#educacode").keydown(function() {                                                  
		processHangingFlagsVisibility();                                                       	
	});                                                              

	$("#educacode").mouseleave(function() {                                           
		processHangingFlagsVisibility();                                                       	
	});                                                                 

	$("#projectGeneralComposite").scroll(function() {                                                      
		processHangingFlagsVisibility();                                                       	
	});                                                           

	setTimeout(function() {                                           
		$("#hideProjectMetadata").slideUp(353);                                  
		$("#educacodeEncyclopediaDown").fadeOut(353);                                      
	}, 3000);                                                       
*/


