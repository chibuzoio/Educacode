
(function($) {                  

	var educacode = {};                      
	var allConsoleHelp = [];                       
	var commandArrayIndex = 0;                                
	var isHistoryChecked = false;                      
	var commandHistoryArray = [];                                 
	var batchEditorText = "educacode> ";                      

	educacode.title = "";                  
	educacode.meaning = "";                      
	educacode.category = "console";                           

	var getDefinition = $.getJSON('../Educacode/coderback/jsondefinitions.php');                         
	var getAllConsoleHelp = $.getJSON('../Educacode/coderback/jsonconsolehelper.php');                         
	var getGeneralSearchWords = $.getJSON('../Educacode/coderback/jsongeneralsearch.php');                         

	getAllConsoleHelp.done(function(theJson) {                    
		for (var i = 0; i < theJson.length; i++) {                            
			allConsoleHelp.push(theJson[i][0]);                              
		}                                       
	});                           

	$("#consoleHelperTitle").blur(function() {                          
		var title = $.trim($("#consoleHelperTitle").val());                        
		title = removeMultipleSpaces(title);                         
		setCommandCategory(title);                              

		if (inArray(allConsoleHelp, title)) {                           
			$("consoleHelperTitle").addClass("error");                  
			$("#helperExistsError").slideDown(353);                  
			educacode.title = "";                        
		}                           
		else {                            
			$("consoleHelperTitle").removeClass("error");                  
			$("#helperExistsError").slideUp(353);                  			
			educacode.title = title;                              
		}                                
	});                         

	$("#submitConsoleHelper").click(function() {                           
		if (educacode.title !== "") {                            
			educacode.meaning = $.trim($("#consoleHelperBody").val());                         
			educacode.meaning = upperCaseFirstLetter(educacode.meaning);                            
			var postDefinition = $.post("../Educacode/coderback/consolehelperserver.php", educacode);                                 

			postDefinition.done(function(response) {                            
				$("#consoleHelperTitle").val("");                     
				$("#consoleHelperBody").val("");                     
				educacode.meaning = "";                 
				educacode.title = "";               
			});                           
		}                     
	});                 

	$("#educacodeTerminalDivision").click(function() {                       
		$("#batchEditorTextarea").focusToEnd();                        
	});                               

	$("#batchEditorTextarea").mouseup(function() {                    
		checkCursorPosition();                          
	});                        

	$("#batchEditorTextarea").mousedown(function() {                    
		checkCursorPosition();                          
	});                        

	$("#batchEditorTextarea").dblclick(function() {                    
		checkCursorPosition();                          
	});                        

	$("#batchEditorTextarea").click(function() {                    
		checkCursorPosition();                          
	});                        

	$("#batchEditorTextarea").keydown(function(event) {                                   
		switch (event.keyCode) {                           
			case 8:                       
				alterKeyDefaultFunction();                           
				isHistoryChecked = false;                      
				commandArrayIndex = 0;                                

				break;                        
			case 37:                       
				alterKeyDefaultFunction();                             
				isHistoryChecked = false;                      
				commandArrayIndex = 0;                                

				break;                        
			case 38: // fetch history from last                                              
				event.preventDefault();                       			
				getCommandsFromLast();                              
				
				break;                        
			case 39: // complete command from history                                     
				completeHistoryCommand(getConsoleInput());                          
				isHistoryChecked = false;                      
				commandArrayIndex = 0;                                
			
				break;                        
			case 40: // fetch history from first                                        
				getCommandsFromFirst();                           
			
				break;                        
			case 13:                       
				commandArrayIndex = 0;                                
				event.preventDefault();                                       
				isHistoryChecked = false;                      

				if ($("#batchEditorTextarea").getCursorPosition() <= batchEditorText.length) {                                  
					commandResponseOrigin();                             
					initializeBatchTextarea();                      
				}                                           
				else {                                          
					var commandString = getConsoleInput();                          			

					if (inArray(commandHistoryArray, commandString) === false) {                                    
						commandHistoryArray.push(commandString);                                								
					}                                        
					else {                                          
						removeFromCommandHistoryArray(commandString);                          
						commandHistoryArray.push(commandString);                                								
					}                                         

					if (commandString.indexOf(" ") === -1) {                                    
						commandEducacodeConsole(commandString);                                    
					}                                   
					else {                                       
						getFirstSubstring(commandString);                                   
						commandEducacodeConsole(getPrincipalCommand(commandString));                          
					}                                        
				}                                      

				break;                        
			default:                                
				checkCursorPosition();                           
				commandArrayIndex = 0;                                
		}                                   
	});                         	

	$("#consoleHelperRadio").change(function() {                          
		$("#batchEditorChoice").fadeIn(353);                          
		$("#adminProjectChoice").fadeOut(353);                       
		$("#educacodeTerminalDivision").slideUp(353);               
    	$("#adminSourceDivision").slideUp(353);                   
    	$("#consoleHelperDivision").slideDown(353);                   
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideUp(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
	});                        

	$("#batchEditorRadio").change(function() {                          
		$("#batchEditorChoice").fadeOut(353);                          
		$("#adminProjectChoice").fadeOut(353);                       
    	$("#adminSourceDivision").slideUp(353);                   
		$("#educacodeTerminalDivision").slideDown(353);               
    	$("#consoleHelperDivision").slideUp(353);                   
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideUp(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
	});                        

	$("#batchEditor").change(function() {                          
		$("#batchEditorChoice").fadeIn(353);                          
		$("#adminProjectChoice").fadeOut(353);                       
		$("#educacodeTerminalDivision").slideUp(353);               
    	$("#adminSourceDivision").slideUp(353);                   
    	$("#consoleHelperDivision").slideUp(353);                   
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideUp(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
	});                        

	var findWordsThatStartWith = function(commandString) {                              
		var firstSubstring = getFirstSubstring(commandString);                                    
		firstSubstring = toTitleCase(firstSubstring);                                    
		
		getGeneralSearchWords.done(function(theJson) {                                    
			for (var i = 0; i < theJson.length; i++) {                
				if (firstSubstring !== "") {                           
					if (theJson[i].startsWith(firstSubstring)) {                                         
						$("#batchEditorResult").append("<div>" + theJson[i] + "</div>");                            
					}                                                    
				}                                          
			}                            
		});                                 
	}                                          

	var displayCurrentConsoleDate = function() {                           
		$("#batchEditorResult").append("<div>" + new Date().toString() + "</div>");                            
	}                                             

	var exitEducacodeConsole = function() {                                
		$("#bodyCover").fadeOut(353);                                               
		$("#batchEditorChoice").fadeOut(353);                          
		$("#adminProjectChoice").fadeIn(353);                       
    	$("#adminSourceDivision").slideUp(353);                   
		$("#educacodeTerminalDivision").slideUp(353);               
    	$("#consoleHelperDivision").slideUp(353);                   
    	$("#adminDictionaryDivision").slideUp(353);                   
    	$("#adminProjectsDivision").slideUp(353);                   
    	$("#adminSnippetsDivision").slideUp(353);                   
	}                                   
 
	var removeFromCommandHistoryArray = function(commandString) {                       
		var index = commandHistoryArray.indexOf(commandString);                    

		if (index > -1) {                                 
			commandHistoryArray.splice(index, 1);                     
		}                                  
	}                        
 					
	var clearConsoleHIstory = function() {                          
		commandHistoryArray = [];                             
	}                                      

	var historyConsoleCommand = function(commandString) {                           
		var firstSubstring = getFirstSubstring(commandString);                                  

		if (firstSubstring === "") {                             
			showHistory();                                          
		}                                         
		else {                               
			switch (firstSubstring) {                                   
				case "-c":                             
					clearConsoleHIstory();                                   
					$("#batchEditorResult").append("<div>History Has Been Cleared!</div>");                              		

					break;                              
				default:                                           
					$("#batchEditorResult").append("<div>"                                          
						+ firstSubstring + " history command option is not supported by "                                       
						+ "history command. Run \"help\" command for help.</div>");                              		
			}                                                  
		}                                            
	}                                        

	var clearConsoleScreen = function() {                           
		$("#batchEditorResult").html("");                                 
	}                                      

	var scrollConsoleDown = function() {                                     
		$("#educacodeTerminalDivision").scrollTop($("#educacodeTerminalDivision")[0].scrollHeight); // Add to all command function                                     	
	}                                                            

	var showHistory = function() {                                
		for (var i = 0; i < commandHistoryArray.length; i++) {                          
			if (commandHistoryArray[i] !== "history") {                                
				$("#batchEditorResult").append("<div>" + commandHistoryArray[i] + "</div>");                            
			}                                         

			scrollConsoleDown();                                    
		}                                           
	}                                                

	var helpConsoleCommander = function() {                              
		getAllConsoleHelp.done(function(theJson) {                                
			for (var i = 0; i < theJson.length; i++) {                               
				if (theJson[i][2] === "console") {                          
					$("#batchEditorResult").append("<div class=\"col-xs-2 helpResultTitle\">" + theJson[i][0]                                        
						+ "</div><div class=\"col-xs-10 helpResultDescription\">" + theJson[i][1] + "</div>");                                   
				}                               
			}                                       
		});                           		
	}                               

	var alterKeyDefaultFunction = function() {                              
		if ($("#batchEditorTextarea").val().length <= batchEditorText.length                                    
			|| $("#batchEditorTextarea").getCursorPosition() <= batchEditorText.length) {                         
			event.preventDefault();                                      
		}                                     

		checkCursorPosition();                                               
	}                               

	var getCommandsFromFirst = function() {                         
		if (commandHistoryArray.length <= 0) {                               
			return false;                                   			
		}                                                  

		if (commandArrayIndex < 0                                       
			|| commandArrayIndex >= commandHistoryArray.length) {                              
			commandArrayIndex = 0;                                           
		}                                                      

		$("#batchEditorTextarea").val(batchEditorText                                                    
			+ commandHistoryArray[commandArrayIndex]);                            
		isHistoryChecked = true;                      
		commandArrayIndex++;                                   			
	}                                 

	var completeHistoryCommand = function(thePrefix) {                             
		for (var i = 0; i < commandHistoryArray.length; i++) {                          
			if (thePrefix !== "") {                                       
				if (commandHistoryArray[i].startsWith(thePrefix)) {                                         
					$("#batchEditorTextarea").val(batchEditorText                                               
						+ commandHistoryArray[i]);                        
				}                                      
			}                                 
		}                            
	}                                 

	var getCommandsFromLast = function() {                         
		if (commandHistoryArray.length <= 0) {                               
			return false;                                   			
		}                                                  

		if (commandArrayIndex < 0                                              
			|| commandArrayIndex >= commandHistoryArray.length) {                                     
			commandArrayIndex = commandHistoryArray.length - 1;                                  
		}                                                  
		else if (commandArrayIndex === 0 && isHistoryChecked === false) {                                        
			commandArrayIndex = commandHistoryArray.length - 1;                                       
		}                                                      

		$("#batchEditorTextarea").val(batchEditorText                                                    
			+ commandHistoryArray[commandArrayIndex]);                            
		isHistoryChecked = true;                      
		commandArrayIndex--;                                   				
	}                                 

	var setCommandCategory = function(commandString) {                       
		if (commandString.indexOf(" ") > -1) {                          
			educacode.category = commandString.substring(0, commandString.indexOf(" "));                          
		}                                            
		else {                                              
			educacode.category = "console";                             
		}                                            
	}                                   

	var getPrincipalCommand = function(commandString) {                           
		commandString = $.trim(commandString);                                         

		if (commandString.indexOf(" ") > -1) {                                
			return commandString.substring(0, commandString.indexOf(" "));                             
		}                                                     
		else {                                         
			return commandString;                             
		}                                           
	}                                     

	var getThirdSubstring = function() {                          
		var thirdSubstring = "";                               
	}                                       

	var getSecondSubstring = function(commandString) {                      
		var secondSubstring = "";                              
	}                                             

	var getFirstSubstring = function(commandString) {                    
		var firstSubstring = "";                                 

		if (containsSpace(commandString)) {                           
			var stringPart = commandString.substring(commandString.indexOf(" "));                          
			stringPart = $.trim(stringPart);                             

			if (containsSpace(stringPart)) {                      
				firstSubstring = stringPart.substring(0, stringPart.indexOf(" "));                        
			}                                
			else {                          
				firstSubstring = stringPart;                       
			}                      
		}                                		

		return firstSubstring;                           
	}                                  

	var containsSpace = function(theString) {                         
		if (theString.indexOf(" ") !== -1) {                        
			return true;                       
		}                             
		else {                              
			return false;                
		}                        
	}                                  

	var getConsoleInput = function() {                                   
		var commandString = removeMultipleSpaces($("#batchEditorTextarea").val());                            
		commandString = commandString.substring(11);                                   
		commandString = $.trim(commandString);                                           
		return commandString;                             
	}                                     

	var batchEditEncyclopedia = function() {                                 
		var getDefinition = $.getJSON('../Educacode/coderback/jsonfetchdefinition.php');                                

		getDefinition.done(function(theResponse) {                      
			for (var i = 0; i < theResponse.length; i++) {                     
				educacode.title = theResponse[i][0];                             
				educacode.meaning = $("<div/>").html(theResponse[i][1]).text();                        
				educacode.meaning = insertBoldElement(educacode.meaning);                          

				$.post("../Educacode/coderback/batcheditor.php", educacode);                           

				$("#batchEditorResult").append("<div>" + educacode.title                                        
					+ "</div><div>" + educacode.meaning + "</div>");                            

				$("#educacodeTerminalDivision").scrollTop($("#educacodeTerminalDivision")[0].scrollHeight); // Add to all command function                                     
			}                                                               
		});                                                 
	}                               

	var commandEducacodeConsole = function(command) {                              
		switch (command) {                            
			case "help":                          
				commandResponseOrigin();                                 
				helpConsoleCommander();                               
				initializeBatchTextarea();                           
				break;                          
			case "update":                          
				commandResponseOrigin();                                 	
				batchEditEncyclopedia();                       
				initializeBatchTextarea();                           
				break;                          
			case "edit":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "repro":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "get":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "goto":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "read":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "def":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "explain":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "login":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "logout":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "del":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "check":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "whoami":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "date":                          
				commandResponseOrigin();                                 
				displayCurrentConsoleDate();                                  
				initializeBatchTextarea();                           
				break;                          
			case "find":                          
				commandResponseOrigin();                                 
				findWordsThatStartWith(getConsoleInput());                                          
				initializeBatchTextarea();                           
				break;                          
			case "cls":                          
				commandResponseOrigin();                                 
				clearConsoleScreen();                                
				initializeBatchTextarea();                           
				break;                          
			case "exit":                          
				commandResponseOrigin();                                 
				clearConsoleHIstory();                                          
				clearConsoleScreen();                                   
				exitEducacodeConsole();                                 
				initializeBatchTextarea();                           
				break;                          
			case "supro":                          
				commandResponseOrigin();                                 
				initializeBatchTextarea();                           
				break;                          
			case "history":                          
				commandResponseOrigin();                                 
				historyConsoleCommand(getConsoleInput());                            
				initializeBatchTextarea();                           
				break;                          
			default:                      
				commandResponseOrigin();                             
				defaultEducacodeResponse();                        
				initializeBatchTextarea();                      
		}                                
	}                                

	var commandResponseOrigin = function() {                             
		$("#batchEditorResult").append("<div>"                                          
			+ $("#batchEditorTextarea").val() + "</div>");                              
		$("#educacodeTerminalDivision").scrollTop($("#educacodeTerminalDivision")[0].scrollHeight);                                    
	}                                            

	var defaultEducacodeResponse = function() {                          
		$("#batchEditorResult").append("<div>"                                          
			+ getConsoleInput() + " is not a recognized command "                                 
			+ "or batch process. Run \"help\" command for help or \"repro\" to report a problem.</div>");                              
		$("#educacodeTerminalDivision").scrollTop($("#educacodeTerminalDivision")[0].scrollHeight);                                    
	}                                   

	var initializeBatchTextarea = function() {                         
		$("#batchEditorTextarea").val(batchEditorText);                           
		$("#educacodeTerminalDivision").scrollTop($("#educacodeTerminalDivision")[0].scrollHeight);                                    
	}                                  

	var checkCursorPosition = function() {                      
		if ($("#batchEditorTextarea").getCursorPosition() < batchEditorText.length) {                       
			$("#batchEditorTextarea").setCursorPosition(batchEditorText.length);                              
		}                                           
	}                                

	$.each($("textarea[shiftheight]"), function() {                           
		var offset = this.offsetHeight - this.clientHeight;                   

		var shiftTextarea = function(element) {                          
			$(element).css("height", "auto").css("height",                                             
				element.scrollHeight + offset);                        
		}                                 

		$(this).on("keyup input", function() {                          
			shiftTextarea(this);                                          
		}).removeAttr("shiftheight");                                
	});                                  

	$.fn.focusToEnd = function() {                
		return this.each(function() {                       
			var value = $(this).val();                   
			$(this).focus().val("").val(value);                 
		});                               
	}                  

	$.fn.setCursorPosition = function(thePosition) {                          
	  	this.each(function(index, element) {                        
	    	if (element.setSelectionRange) {                      
	      		element.setSelectionRange(thePosition, thePosition);                
	    	}                           
	    	else if (element.createTextRange) {                      
	      		var range = element.createTextRange();                  
		
			    range.collapse(true);                 
			    range.moveEnd('character', thePosition);                
			    range.moveStart('character', thePosition);              
			    range.select();                  
	    	}                                    
	  	});                          
	 	
	 	return this;                            
	};                                   

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
			getDefinition.done(function(theJson) {                          
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


