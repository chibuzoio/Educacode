
(function($) {

	var smallestIndex = 0;                                                     
	var startCheckIndex = 0;                                                                   
	var characterIndexType = "";                                                                                 
	var theControlArray = ["function call stack", "function", "call stack", "solution", "programme",                             
		"array intensive data structure", "array", "intensive data structure", "data structure", "structure",                            
		"intensive data", "machine learning", "artificial intelligence act", "silicon valley", "programme solution"];                                        

 	var scopeAwesomeArticle = "Programming in the sense of calling <b><b>function</b> <b>call stack</b></b> is a "                                         
 		+ "tactical practice that requires programme <b>solution</b> for data structure <b>solution</b>. <b>machine "                                                               
 		+ "learning</b> which is also a critical part of computer programming also know as artificial intelligence has "                                                                      
 		+ "being an exciting venture since its inception. With respect to technologically intensive regions of the world "                                                        
 		+ "like <b>silicon valley</b>, <b><b>array</b> <b>intensive data structure</b></b> has being formulated to boost "                                                              
 		+ "the technological ecosystem. <b>call stack</b> has being an overrated part of computer intensive process "                                                                
 		+ "<b>intensive data structure</b>.";                                                

	$(document).ready(function() {                                                           
		console.log("The value gotten after cleanAwesomeArticle modification is now \n\n" + removeAllArrayMatch(scopeAwesomeArticle, theControlArray));                                                            
	});                                                                  

	var removeAllArrayMatch = function(yourArticle, toMatchArray) {                                                       
		var awesomeArticleSubstring = "";                                                                  
		var finalAwesomeArticleResult = "";                                                                                   

		for (var i = 0; i < toMatchArray.length; i++) {                                                       
			var previousIndices = [];                                                                            
			previousIndices.push(toMatchArray[i]);                                                                              
			yourArticle = checkMatchedElements(yourArticle, toMatchArray, previousIndices[previousIndices.length - 1], previousIndices);                                                        
		}                                                               

		return cleanAwesomeArticle(yourArticle);                                                                      
	}                                                                    

	var cleanAwesomeArticle = function(theAwesomeArticle) {                                                                   
		var indexIterator = 0;                                                                                  
		var tagIndexTracker = 0;                                                        
		var tagElementArray = [];                                                                               
		var indexIterationArray = [];                                                                                    
		var finalAwesomeArticleResult = "";                                                                
		var awesomeArticleStorage = theAwesomeArticle;                                                                  

		if (awesomeArticleStorage.length > 0) {                                                                                     
 			while (indexIterator < awesomeArticleStorage.length) {                                                                      
 				if (awesomeArticleStorage.substring(indexIterator, indexIterator + 3) === "<b>") {                                                                              
 					tagIndexTracker++;                                                                                 

 					if (tagIndexTracker === 1) {                                                                              
 						tagElementArray.push(indexIterator + 3);                                                               
 					}                                                                                               
 				}                                                                                                          
 				else if (awesomeArticleStorage.substring(indexIterator, indexIterator + 4) === "</b>") {                                                                              
 					tagIndexTracker--;                                                                                 

 					if (tagIndexTracker <= 0) {                                                                              
 						tagIndexTracker = 0;                                                                            
 						tagElementArray.push(indexIterator);                                                               
 						indexIterationArray.push(tagElementArray);                                                                     
 						tagElementArray = [];                                                       
 					}                                                                                               
 				}                                                                                                          

				indexIterator++;                                                                
			}                                                                               

			var openElementRegex = new RegExp("<b>", "gi");                                                      
			var closeElementRegex = new RegExp("</b>", "gi");                                                                
			finalAwesomeArticleResult = theAwesomeArticle.substring(0, indexIterationArray[0][0]);                                                                                 

			for (var i = 0; i < indexIterationArray.length; i++) {                                                                                 
				var localScopeArticle = theAwesomeArticle.substring(indexIterationArray[i][0], indexIterationArray[i][1]);                                                                   

				localScopeArticle = localScopeArticle.replace(openElementRegex, "");                                                                                  
				localScopeArticle = localScopeArticle.replace(closeElementRegex, "");                                                                                  

				finalAwesomeArticleResult += localScopeArticle;                                                                                      

				var k = i < indexIterationArray.length - 1 ? i + 1 : 0;                                                                       

				if (k !== 0) {                                                                                                    
					finalAwesomeArticleResult += theAwesomeArticle.substring(indexIterationArray[i][1], indexIterationArray[i + 1][0]);                                                                            
				}                                                                                                                       
				else {                                                                                                                                      
					finalAwesomeArticleResult += theAwesomeArticle.substring(indexIterationArray[i][1]);                                                                            
				}                                                                                                                      
			}                                                                                         

			return finalAwesomeArticleResult;                                                                                  
		}                                                                                     
	}                                                                                                                      

	var checkMatchedElements = function(stillTheArticle, searchControllerArray, indexElement, formerIndices) {                                                      
		var regex = new RegExp(indexElement, "gi");                                                      

		if (stillTheArticle.search(regex) > -1) {                                                       
			var articleIndex = stillTheArticle.search(regex);                                                   

			if (inArray(searchControllerArray, indexElement)) {                                                 
				var articleSubstring = $.trim(stillTheArticle.substring(articleIndex + indexElement.length));                                    

				if (articleSubstring.length > 0) {                                                    
					if (setSubstringSmallestIndex(articleSubstring)) {                                                       
						var toConcatenateSubstring = $.trim(articleSubstring.substring(0, articleSubstring.indexOf(characterIndexType)));                                                  

						if (inArray(searchControllerArray, indexElement + " " + toConcatenateSubstring)) {                                                           
							formerIndices.push(indexElement + " " + toConcatenateSubstring);                                                                 

							return checkMatchedElements(stillTheArticle, searchControllerArray, formerIndices[formerIndices.length - 1], formerIndices);                                                     
						}                                                                                                               
						else {                                                                                                     
							stillTheArticle = replaceMatchedStringPartsHere(stillTheArticle, formerIndices);                                                               

							return stillTheArticle;                                                           
						}                                                                                              
					}                                                                
					else {                                                                         
						return stillTheArticle;                                                                
					}                                                                  
				}                                                      
				else {                                                                            
					return stillTheArticle;                                                       
				}                                                               
			}                                                                        
			else {                                                                     
				return stillTheArticle;                                                              
			}                                                             
		}                                                                 
		else {                                                                            
			return stillTheArticle;                                                              
		}                                                                         
	}                                                                      

	var replaceMatchedStringPartsHere = function(theSplitArticle, residualIndices) {                                                           
		if (residualIndices.length > 0) {                                                                  
			var thisRegex = new RegExp(residualIndices[residualIndices.length - 1], "gi");                                                      

			if (theSplitArticle.search(thisRegex) > -1) {                                                           
				var makeBoldSubstring = theSplitArticle.substring(theSplitArticle.search(thisRegex), (residualIndices[residualIndices.length - 1]).length);                                                                                   
				theSplitArticle = theSplitArticle.replace(thisRegex, "<b>" + residualIndices[residualIndices.length - 1] + "</b>"); // replace with empty string                                                        
				residualIndices.pop();                                                                   

				return replaceMatchedStringPartsHere(theSplitArticle, residualIndices);                                                        
			}                                                                               
			else {                                                                                      
				return theSplitArticle;                                                 
			}                                                                     
		}                                                                     
		else {                                                                      
			return theSplitArticle;                                                       
		}                                                                   
	}                                                                      

	var mainMatchedElementRemover = function(toReduceArticle, removeElement) {                                                  
		var toReduceArticleSubstring = "";                                                            

		if (toReduceArticle.indexOf(removeElement) > -1) {                                                           
			toReduceArticleSubstring = $.trim(toReduceArticle.substring(toReduceArticle.indexOf(removeElement) + removeElement.length));                                                      
			toReduceArticle = $.trim(toReduceArticle.substring(0, toReduceArticle.indexOf(removeElement))); // Give the head                                                        
			toReduceArticle = " " + toReduceArticleSubstring; // Give the tail                                                                                     

			if (toReduceArticle.indexOf(removeElement) > -1) {                                                       
				return mainMatchedElementRemover(toReduceArticle, removeElement);                                                        
			}                                                                                            
			else {                                                                                
				return toReduceArticle;                                                       
			}                                                                     
		}                                                                               
		else {                                                                                      
			return toReduceArticle;                                                 
		}                                                                     
	}                                                             

	var encloseImportantWords = function(scopeAwesomeArticle, theControlArray) {                                                                 
		for (var i = 0; i < theControlArray.length; i++) {                                                                  
			insertBoldElement(scopeAwesomeArticle, theControlArray[i]);                                            
		}                                                                             

		return scopeAwesomeArticle;                                                       
	}                                                               

	var insertBoldElement = function(scopeAwesomeArticle, controlArrayValue) {                                                      
		var regexResult = "";                                                         
		var firstValue = "<b>";                                                                  
		var secondValue = "</b>";                                                                               
			
		if (scopeAwesomeArticle.indexOf(controlArrayValue) > -1) {                                                     
			startCheckIndex = scopeAwesomeArticle.indexOf(controlArrayValue);                                                      

			if ((scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + secondValue.length) !== "</b>")                                                 
				&& ((scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === " ")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === ";")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === ":")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === ",")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === "\"")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === "'")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === ".")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === "/")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === "?")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === "!")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === "-")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === "(")                                               
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === ")")                                             
				|| (scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length, startCheckIndex + controlArrayValue.length + 1) === ""))) {                                              

				var scopeAwesomeArticleSubstring = $.trim(scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length));                                       
				
				if (scopeAwesomeArticleSubstring.indexOf(controlArrayValue) > -1) {                                                        
					var substringStartCheckIndex = scopeAwesomeArticleSubstring.indexOf(controlArrayValue);                                              

					if (setSubstringSmallestIndex(scopeAwesomeArticleSubstring)) {                                                               
						var toConcatenateSubstring = scopeAwesomeArticleSubstring.substring(0, smallestIndex);                                                 

						if (inArray(theControlArray, controlArrayValue + " " + toConcatenateSubstring)) {                                                  
							startCheckIndex =  scopeAwesomeArticle.length - scopeAwesomeArticleSubstring.length + substringStartCheckIndex;                                                

							return insertBoldElement(scopeAwesomeArticle, controlArrayValue + " " + toConcatenateSubstring, startCheckIndex);                                                
						}                                                               
						else {                                                                                
							scopeAwesomeArticle = [scopeAwesomeArticle.slice(0, startCheckIndex), firstValue, scopeAwesomeArticle.slice(startCheckIndex)].join("");                                                
							scopeAwesomeArticle = [scopeAwesomeArticle.slice(0, startCheckIndex + controlArrayValue.length + 3), secondValue, scopeAwesomeArticle.slice(startCheckIndex + controlArrayValue.length + 3)].join("");                                      

							scopeAwesomeArticleSubstring = $.trim(scopeAwesomeArticle.substring(startCheckIndex + controlArrayValue.length));                                                 

							if (scopeAwesomeArticleSubstring.indexOf(controlArrayValue) > -1) {                                                         
								substringStartCheckIndex = scopeAwesomeArticleSubstring.indexOf(controlArrayValue);                                                

								startCheckIndex = scopeAwesomeArticle.length - scopeAwesomeArticleSubstring.length + substringStartCheckIndex;                                                         

								return insertBoldElement(scopeAwesomeArticle, controlArrayValue, startCheckIndex);                                                  								
							}                                                                               
							else {                                                                              
								return scopeAwesomeArticle;                                                           
							}                                                                           
						}                                                                          
					}                                                                             
					else {                                                                             
						scopeAwesomeArticleSubstring = $.trim(scopeAwesomeArticleSubstring.substring(smallestIndex + 4));                                          

						if (scopeAwesomeArticleSubstring.indexOf(controlArrayValue) > -1) {                                                              
							substringStartCheckIndex = scopeAwesomeArticleSubstring.indexOf(controlArrayValue);                                             

							startCheckIndex =  scopeAwesomeArticle.length - scopeAwesomeArticleSubstring.length + substringStartCheckIndex;                                                

							return insertBoldElement(scopeAwesomeArticle, controlArrayValue, startCheckIndex);                                                  
						}                                                                             
					}                                                                       
				}                                                                             
				else {                                                                                       
					scopeAwesomeArticle = [scopeAwesomeArticle.slice(0, startCheckIndex), firstValue, scopeAwesomeArticle.slice(startCheckIndex)].join("");                                                
					scopeAwesomeArticle = [scopeAwesomeArticle.slice(0, startCheckIndex + controlArrayValue.length + 3), secondValue, scopeAwesomeArticle.slice(startCheckIndex + controlArrayValue.length + 3)].join("");                                      

					return scopeAwesomeArticle;                                                    
				}                                                                           
			}                                        
			else {                                                                                
				return scopeAwesomeArticle;                                                                                  
			}                                                        
		}                                                                           		

		return scopeAwesomeArticle;                                                        
	}                                                       

	var isBoldElementEnclosedStart = function(scopeAwesomeArticle, startCheckIndex) {                                                     
		awesomeArticleSubstring = $.trim(scopeAwesomeArticle.substring(0, startCheckIndex));                                                          

		var openBoldIndex = (awesomeArticleSubstring.indexOf("<b>") > -1) ? awesomeArticleSubstring.indexOf("<b>") : 0;                                              
		var closeBoldIndex = (awesomeArticleSubstring.indexOf("</b>") > -1) ? awesomeArticleSubstring.indexOf("</b>") : 0;                                              
		
		var insideBoldElement = (closeBoldIndex < openBoldIndex) ? true : false;                                         

		return insideBoldElement;                                                       
	}                                                            

	var isBoldElementEnclosedEnd = function(scopeAwesomeArticle, startCheckIndex) {                                                     
		awesomeArticleSubstring = $.trim(scopeAwesomeArticle.substring(startCheckIndex));                                                          

		var openBoldIndex = (awesomeArticleSubstring.indexOf("<b>") > -1) ? awesomeArticleSubstring.indexOf("<b>") : 0;                                              
		var closeBoldIndex = (awesomeArticleSubstring.indexOf("</b>") > -1) ? awesomeArticleSubstring.indexOf("</b>") : 0;                                              
		
		var insideBoldElement = (closeBoldIndex < openBoldIndex) ? true : false;                                         

		return insideBoldElement;                                                       
	}                                                            

	var isBoldElementEnclosed = function(scopeAwesomeArticle) {                                                     
		awesomeArticleSubstring = $.trim(scopeAwesomeArticle.substring(startCheckIndex));                                                          

		var openBoldIndex = (awesomeArticleSubstring.indexOf("<b>") > -1) ? awesomeArticleSubstring.indexOf("<b>") : 0;                                              
		var closeBoldIndex = (awesomeArticleSubstring.indexOf("</b>") > -1) ? awesomeArticleSubstring.indexOf("</b>") : 0;                                              
		
		var insideBoldElement = (closeBoldIndex < openBoldIndex) ? true : false;                                         

		return insideBoldElement;                                                       
	}                                                            

	var setBoldElementSmallestIndex = function(cleanArticleSubstring) {                                                                       
		characterIndexType  = "";                                                                      
		var openingBoldIndex = (cleanArticleSubstring.indexOf("<b>") > -1) ? cleanArticleSubstring.indexOf("<b>") : 0;                                               
		var closingBoldIndex = (cleanArticleSubstring.indexOf("</b>") > -1) ? cleanArticleSubstring.indexOf("</b>") : 0;                                               		

		if (openingBoldIndex < closingBoldIndex) {                                                             
			smallestIndex = openingBoldIndex;                                                                
			characterIndexType = "<b>";                                                                           
		}                                                                                   
		else if (openingBoldIndex > closingBoldIndex) {                                                                                        
			smallestIndex = closingBoldIndex;                                                              
			characterIndexType = "</b>";                                                                 
		}                                                                                 
		else {                                                                              
			characterIndexType = "";                                                                         
			smallestIndex = 0;                                                              
		}                                                                   

		return characterIndexType;                                                                 
	}                                                                                       

	var setSubstringSmallestIndex = function(awesomeArticleSubstring) {                                                 
		var lastCharacterIndex = awesomeArticleSubstring.length;                                                          
		var spaceIndex = (awesomeArticleSubstring.indexOf(" ") > -1) ? awesomeArticleSubstring.indexOf(" ") : 0;                                               
		var semicolonIndex = (awesomeArticleSubstring.indexOf(";") > -1) ? awesomeArticleSubstring.indexOf(";") : 0;                                               
		var colonIndex = (awesomeArticleSubstring.indexOf(":") > -1) ? awesomeArticleSubstring.indexOf(":") : 0;                                               
		var commaIndex = (awesomeArticleSubstring.indexOf(",") > -1) ? awesomeArticleSubstring.indexOf(",") : 0;                                               
		var doubleQuoteIndex = (awesomeArticleSubstring.indexOf("\"") > -1) ? awesomeArticleSubstring.indexOf("\"") : 0;                                               
		var singleQuoteIndex = (awesomeArticleSubstring.indexOf("'") > -1) ? awesomeArticleSubstring.indexOf("'") : 0;                                               
		var fullStopIndex = (awesomeArticleSubstring.indexOf(".") > -1) ? awesomeArticleSubstring.indexOf(".") : 0;                                               
		var forwardSlashIndex = (awesomeArticleSubstring.indexOf("/") > -1) ? awesomeArticleSubstring.indexOf("/") : 0;                                               
		var questionMarkIndex = (awesomeArticleSubstring.indexOf("?") > -1) ? awesomeArticleSubstring.indexOf("?") : 0;                                               
		var exclamationIndex = (awesomeArticleSubstring.indexOf("!") > -1) ? awesomeArticleSubstring.indexOf("!") : 0;                                               
		var hyphenIndex = (awesomeArticleSubstring.indexOf("-") > -1) ? awesomeArticleSubstring.indexOf("-") : 0;                                               
		var openingBracketIndex = (awesomeArticleSubstring.indexOf("(") > -1) ? awesomeArticleSubstring.indexOf("(") : 0;                                               
		var closingBracketIndex = (awesomeArticleSubstring.indexOf(")") > -1) ? awesomeArticleSubstring.indexOf(")") : 0;                                               
		var openingBoldIndex = (awesomeArticleSubstring.indexOf("<b>") > -1) ? awesomeArticleSubstring.indexOf("<b>") : 0;                                               
		var closingBoldIndex = (awesomeArticleSubstring.indexOf("</b>") > -1) ? awesomeArticleSubstring.indexOf("</b>") : 0;                                               

		characterIndexType = " ";                                                                             
		smallestIndex = spaceIndex;                                                                                     

		if ((semicolonIndex > 0) && (semicolonIndex < smallestIndex)) {                                                         
			smallestIndex = semicolonIndex;                                                                       
			characterIndexType = ";";                                                                           
		}                                                                              

		if ((colonIndex > 0) && (colonIndex < smallestIndex)) {                                                           
			smallestIndex = colonIndex;                                                
			characterIndexType = ":";                                                          
		}                                                                      

		if ((commaIndex > 0) && (commaIndex < smallestIndex)) {                                                            
			smallestIndex = commaIndex;                                                         
			characterIndexType = ",";                                                         
		}                                                                           

		if ((doubleQuoteIndex > 0) && (doubleQuoteIndex < smallestIndex)) {                                                    
			smallestIndex = doubleQuoteIndex;                                                     
			characterIndexType = "\"";                                                            
		}                                                                            

		if ((singleQuoteIndex > 0) && (singleQuoteIndex < smallestIndex)) {                                                         
			smallestIndex = singleQuoteIndex;                                                     
			characterIndexType = "'";                                                             
		}                                                                              

		if ((fullStopIndex > 0) && (fullStopIndex < smallestIndex)) {                                                         
			smallestIndex = fullStopIndex;                                                                   
			characterIndexType = ".";                                                           
		}                                                                             

		if ((forwardSlashIndex > 0) && (forwardSlashIndex < smallestIndex)) {                                                         
			smallestIndex = forwardSlashIndex;                                                   
			characterIndexType = "/";                                                              
		}                                                                                

		if ((questionMarkIndex > 0) && (questionMarkIndex < smallestIndex)) {                                                      
			smallestIndex = questionMarkIndex;                                                                
			characterIndexType = "?";                                                        
		}                                                                             

		if ((exclamationIndex > 0) && (exclamationIndex < smallestIndex)) {                                                        
			smallestIndex = exclamationIndex;                                                       
			characterIndexType = "!";                                                                
		}                                                                              

		if ((hyphenIndex > 0) && (hyphenIndex < smallestIndex)) {                                                        
			smallestIndex = hyphenIndex;                                                
			characterIndexType = "-";                                                                     
		}                                                                        

		if ((openingBracketIndex > 0) && (openingBracketIndex < smallestIndex)) {                                                       
			smallestIndex = openingBracketIndex;                                                           
			characterIndexType = "(";                                                                  
		}                                                                                        

		if ((closingBracketIndex > 0) && (closingBracketIndex < smallestIndex)) {                                                      
			smallestIndex = closingBracketIndex;                                                                     
			characterIndexType = ")";                                                                  
		}                                                                                            

		if ((lastCharacterIndex > 0) && (lastCharacterIndex < smallestIndex)) {                                                              
			smallestIndex = lastCharacterIndex;                                                         
			characterIndexType = "";                                                                         
		}                                                                    

		if ((openingBoldIndex > 0) && (openingBoldIndex < smallestIndex)) {                                                    
			smallestIndex = openingBoldIndex;                                                     
			characterIndexType = "<b>";                                                                
		}                                                                            

		if ((closingBoldIndex > 0) && (closingBoldIndex < smallestIndex)) {                                                    
			smallestIndex = closingBoldIndex;                                                     
			characterIndexType = "</b>";                                                      
		}                                                                            

		var isSmallestIndex = (smallestIndex === closingBoldIndex) ? false : true;                                                                                     

		return isSmallestIndex;                                                    
	}                                                                                            

	var inArray = function(array, value) {                                        
		value = value.toLowerCase();                                                   
		return array.indexOf(value) > -1;                                 
	}                           

	var deleteTableCartProduct = function(elementId) {                   
		var productName = $("#" + elementId + "").find(".hiddenProductName").text();                           

		$.post( "../include/jsonremovecartitem.php", {                                        
			productName : productName                                            
			}, function(response) {                                               
			fetchCartTableData(response);                                
		}).done(function(response) {                                                   
	    	$(".cartTableCancelIcon").each(function(index) {
	    		$("#" + $($(".cartTableCancelIcon").get(index)).attr("id")).click(function() {
	    			deleteTableCartProduct($($(".cartTableCancelIcon").get(index)).attr("id"));                            
	    		});                  
	    	});                       

			checkEvents(response);                                                    
		});                             
	}               

}(jQuery));                   


