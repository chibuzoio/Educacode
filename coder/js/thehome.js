
$(document).ready(function() {                               

	var allProducts = [];                              
	var sessionValues = [];                               
	var temporaryName = "";                                  
	var fieldResponse = {};                                                   
	var fieldResponseString = "";                                                       
	var isCategoryHeaderVisible = true;                                  
	var isCategorySearchDivVisible = false;                                 

	var prefixArray = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh",                                                             
	 	"eighth", "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth",                                          
	 	"sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth", "twentyFirst"];                                    

	$.getJSON('../include/jsonproducts.php', function(theJson) {              
		for (var i = 0; i < theJson.length; i++) {              
			allProducts[i] = theJson[i];                       
		};                            

		$("#firstCollectionImage").attr("src", "image/" + allProducts[0][2]);            
		$("#firstCollectionName").html(getTextValue(allProducts[0][0]));                     
		$("#firstOldPrice").text("$" + parseFloat(allProducts[0][4]).toFixed(2));          
		$("#firstNewPrice").text("$" + parseFloat(allProducts[0][3]).toFixed(2));                      

		$("#secondCollectionImage").attr("src", "image/" + allProducts[1][2]);            
		$("#secondCollectionName").html(getTextValue(allProducts[1][0]));                     
		$("#secondOldPrice").text("$" + parseFloat(allProducts[1][4]).toFixed(2));          
		$("#secondNewPrice").text("$" + parseFloat(allProducts[1][3]).toFixed(2));                      

		$("#thirdCollectionImage").attr("src", "image/" + allProducts[2][2]);            
		$("#thirdCollectionName").html(getTextValue(allProducts[2][0]));                     
		$("#thirdOldPrice").text("$" + parseFloat(allProducts[2][4]).toFixed(2));          
		$("#thirdNewPrice").text("$" + parseFloat(allProducts[2][3]).toFixed(2));                      

		$("#fourthCollectionImage").attr("src", "image/" + allProducts[3][2]);            
		$("#fourthCollectionName").html(getTextValue(allProducts[3][0]));                     
		$("#fourthOldPrice").text("$" + parseFloat(allProducts[3][4]).toFixed(2));          
		$("#fourthNewPrice").text("$" + parseFloat(allProducts[3][3]).toFixed(2));                      

		$("#fifthCollectionImage").attr("src", "image/" + allProducts[4][2]);            
		$("#fifthCollectionName").html(getTextValue(allProducts[4][0]));                     
		$("#fifthOldPrice").text("$" + parseFloat(allProducts[4][4]).toFixed(2));          
		$("#fifthNewPrice").text("$" + parseFloat(allProducts[4][3]).toFixed(2));                      

		$("#sixthCollectionImage").attr("src", "image/" + allProducts[5][2]);            
		$("#sixthCollectionName").html(getTextValue(allProducts[5][0]));                     
		$("#sixthOldPrice").text("$" + parseFloat(allProducts[5][4]).toFixed(2));          
		$("#sixthNewPrice").text("$" + parseFloat(allProducts[5][3]).toFixed(2));                      

		if ($("#whiteLoginCartItemsDropDown").html() === "") {                                                                
			$("#whiteLoginCartItemsDropDown").html("<div class=\"emptyCartTableDiv\"><img src=\"image/cartempty.jpg\" class=\"emptyCartDropDown\"></div>");                          
			$("#loginCartItemsDropDown").html("<div class=\"emptyCartTableDiv\"><img src=\"image/emptydropdowncart.png\" class=\"emptyCartDropDown\"></div>");                           
			$("#cartProductsTableBody").html("<div class=\"emptyCartTableDiv\"><img src=\"image/emptytablecart.png\" class=\"emptyCartTable\"></div>");                     
			$("#allCartProductsTotalPrice").html("Total&nbsp;:&nbsp;&nbsp;$0.00");                                                       
		}                                                
	});                 

	$.getJSON('../include/jsonbasicsession.php', function(response) {                                         
		fetchCartSessionData(response);                                            
	}).done(function(response) {                                                        			
		var responseObject = getResponseObject(response);                                          

	    $(".cartItemsCancelIcon").each(function(index) {                           
	    	$("#" + $($(".cartItemsCancelIcon").get(index)).attr("id") + "").click(function() {
	    		deleteCartItem($($(".cartItemsCancelIcon").get(index)).attr("id"));                            
	    	});                                                           
	    });                                             

    	$(".cartTableCancelIcon").each(function(index) {
    		$("#" + $($(".cartTableCancelIcon").get(index)).attr("id")).click(function() {
    			deleteTableCartProduct($($(".cartTableCancelIcon").get(index)).attr("id"));                            
    		});                                                
    	});                             

		$("#discardCart").click(function() {                          
			deleteAllCartProducts(responseObject);                                  
		});                                    

		checkEvents(responseObject);                                                    
	});                                                               

	var getTextValue = function(collectionName) {                          
		return collectionName.replace(/ /g, "&nbsp;");                       
	}                             

	var getCartTextValue = function(collectionName) {                          
		if (collectionName.length > 11) {
			collectionName = collectionName.substring(0, 11) + "...";                  
		}                                   

		return collectionName.replace(/ /g, "&nbsp;");                       
	}                             

	$("#firstLoginAddToCartIcon").click(function() {                      
		addCartValuesToSession("first");                              
	});                    

	$("#secondLoginAddToCartIcon").click(function() {
		addCartValuesToSession("second");               
	});                   

	$("#thirdLoginAddToCartIcon").click(function() {
		addCartValuesToSession("third");               
	});                   

	$("#fourthLoginAddToCartIcon").click(function() {
		addCartValuesToSession("fourth");               
	});                   

	$("#fifthLoginAddToCartIcon").click(function() {
		addCartValuesToSession("fifth");               
	});                   

	$("#sixthLoginAddToCartIcon").click(function() {
		addCartValuesToSession("sixth");               
	});                   

	var addCartValuesToSession = function(productPosition) {                         
		if (productPosition.constructor === String) {                                 
			var iconId = "#" + productPosition + "LoginAddToCartIcon";                       
			var prevProps = $(iconId).prev("#" + productPosition + "CollectionProperties");                        

			$.post( "../include/jsonsession.php", {                                        
				collectionImage : $(iconId).parent().find("#" + productPosition + "CollectionImage").attr("src"),                        
				collectionName : prevProps.find("#" + productPosition + "CollectionName").text(),                             
				collectionOldPrice : prevProps.find("#" + productPosition + "OldPrice").text(),                               
				collectionNewPrice : prevProps.find("#" + productPosition + "NewPrice").text()                               
			}, function(response) {                                                                    
				fetchCartSessionData(response);                              
			}).done(function(response) {                                                   		
				var responseObject = getResponseObject(response);                                        
				
			    $(".cartItemsCancelIcon").each(function(index) {    
			    	$("#" + $($(".cartItemsCancelIcon").get(index)).attr("id") + "").click(function() {
			    		deleteCartItem($($(".cartItemsCancelIcon").get(index)).attr("id"));                             
			    	});                                                           
			    });                                             

		    	$(".cartTableCancelIcon").each(function(index) {
		    		$("#" + $($(".cartTableCancelIcon").get(index)).attr("id")).click(function() {
		    			deleteTableCartProduct($($(".cartTableCancelIcon").get(index)).attr("id"));                            
		    		});                                                
		    	});                             

				$("#discardCart").click(function() {                          
					deleteAllCartProducts(responseObject);                                  
				});                                    

				checkEvents(responseObject);                                                    
			});                            
		}
	}                         

	var deleteCartItem = function(elementId) {                        
		var productName = $("#" + elementId + "").find(".hiddenProductName").text();                           

		$.post( "../include/jsonremovecartitem.php", {                                        
			productName : productName                                            
			}, function(response) {                                               
			fetchCartSessionData(response);                                
		}).done(function(response) {                                                   
			var responseObject = getResponseObject(response);                                       
		
		    $(".cartItemsCancelIcon").each(function(index) {                             
		    	$("#" + $($(".cartItemsCancelIcon").get(index)).attr("id") + "").click(function() {
		    		deleteCartItem($($(".cartItemsCancelIcon").get(index)).attr("id"));                            
		    	});                                                           
		    });                                             

	    	$(".cartTableCancelIcon").each(function(index) {
	    		$("#" + $($(".cartTableCancelIcon").get(index)).attr("id")).click(function() {
	    			deleteTableCartProduct($($(".cartTableCancelIcon").get(index)).attr("id"));                            
	    		});                                                
	    	});                             

			$("#discardCart").click(function() {                          
				deleteAllCartProducts(responseObject);                                  
			});                                    

			checkEvents(responseObject);                                                    
		});                             
	}

	var deleteTableCartProduct = function(elementId) {                   
		var productName = $("#" + elementId + "").parent().parent().find(".cartTableProperties").eq(0).text();                           

		$.post( "../include/jsonremovecartitem.php", {                                        
			productName : productName                                            
			}, function(response) {                                               
			fetchCartSessionData(response);                                
		}).done(function(response) {                                                   
			var responseObject = getResponseObject(response);                                            
			
	    	$(".cartTableCancelIcon").each(function(index) {
	    		$("#" + $($(".cartTableCancelIcon").get(index)).attr("id")).click(function() {
	    			deleteTableCartProduct($($(".cartTableCancelIcon").get(index)).attr("id"));                            
	    		});                                                
	    	});                             

		    $(".cartItemsCancelIcon").each(function(index) {                             
		    	$("#" + $($(".cartItemsCancelIcon").get(index)).attr("id") + "").click(function() {
		    		deleteCartItem($($(".cartItemsCancelIcon").get(index)).attr("id"));                            
		    	});                                                           
		    });                                             

			$("#discardCart").click(function() {                          
				deleteAllCartProducts(responseObject);                                  
			});                                    

			checkEvents(responseObject);                                                    
		});                             
	}               

	var deleteAllCartProducts = function(response) {                        
		var responseObject = getResponseObject(response);                             

		if (responseObject.cartProductsArray.length > 0) {
			$.get("../include/jsoncleansession.php").done(function(response) {                         
				fetchCartSessionData(response);                              
			});                          		
		}                                        
	}                         

	var fetchCartSessionData = function(response) {                                     
		var responseObject = getResponseObject(response);                             

		if (responseObject.cartProductsArray.length > 0) {                                     
			$("#whiteLoginCartItemsDropDown").html(fillWhiteLoginCartItemsDropDown(responseObject.cartProductsArray, prefixArray));                          
			$("#loginCartItemsDropDown").html(fillLoginCartItemsDropDown(responseObject.cartProductsArray, prefixArray));                            
			$("#cartProductsTableBody").html(fillCartProductsTable(responseObject.cartProductsArray, prefixArray));                             
			$("#allCartProductsTotalPrice").html(getCartProductsTotalPrice(responseObject.productTotalPrice));                                   
		}                                                           
		else {                                                        
			$("#whiteLoginCartItemsDropDown").html("<div class=\"emptyCartTableDiv\"><img src=\"image/cartempty.jpg\" class=\"emptyCartDropDown\"></div>");                          
			$("#loginCartItemsDropDown").html("<div class=\"emptyCartTableDiv\"><img src=\"image/emptydropdowncart.png\" class=\"emptyCartDropDown\"></div>");                           
			$("#cartProductsTableBody").html("<div class=\"emptyCartTableDiv\"><img src=\"image/emptytablecart.png\" class=\"emptyCartTable\"></div>");                     
			$("#allCartProductsTotalPrice").html("Total&nbsp;:&nbsp;&nbsp;$0.00");                                                       
		}                                     

		if (responseObject.productArrayCount > 0) {
			$("#loginSideMenuCartItemsNumber").removeClass("sideMenuCartItemsNumber-off");           
			$("#loginSideMenuCartItemsNumber").addClass("sideMenuCartItemsNumber-on");              
			$("#whiteLoginCartItemsNumber").removeClass("cartItemsNumber-off");              
			$("#whiteLoginCartItemsNumber").addClass("cartItemsNumber-on");                      
			$("#loginCartItemsNumber").removeClass("cartItemsNumber-off");              
			$("#loginCartItemsNumber").addClass("cartItemsNumber-on");                      
		}                     
		else {                                                        
			$("#loginSideMenuCartItemsNumber").removeClass("sideMenuCartItemsNumber-on");        
			$("#loginSideMenuCartItemsNumber").addClass("sideMenuCartItemsNumber-off");           
			$("#whiteLoginCartItemsNumber").removeClass("cartItemsNumber-on");                      
			$("#whiteLoginCartItemsNumber").addClass("cartItemsNumber-off");              
			$("#loginCartItemsNumber").removeClass("cartItemsNumber-on");                      
			$("#loginCartItemsNumber").addClass("cartItemsNumber-off");              
		}

		$("#logoutCartItemsNumber").text(responseObject.productArrayCount);                            
		$("#whiteLogoutCartItemsNumber").text(responseObject.productArrayCount);                
		$("#whiteLoginCartItemsNumber").text(responseObject.productArrayCount);                 
		$("#loginCartItemsNumber").text(responseObject.productArrayCount);                         
		$("#logoutSideMenuCartItemsNumber").text(responseObject.productArrayCount);                     
		$("#loginSideMenuCartItemsNumber").text(responseObject.productArrayCount);                            
	}                                                    

	var fillWhiteLoginCartItemsDropDown = function(cartProductsArray, prefixArray) {
		var idObject = {};                          
		var classObject = {};                       
		var idObjectArray = [];                              
		var classObjectArray = [];                              

		for (var i = 0; i < cartProductsArray.length; i++) {
			idObject = {
				collectionImage : prefixArray[i] + "WhiteCartCollectionImage",                             
				cartItemsNumber : prefixArray[i] + "WhiteLoginCartItemsNumber",                       
				cartItemsCancelIcon : prefixArray[i] + "WhiteCartItemsCancelIcon"                          
			}                            

			classObject = {
				cartProductDiv : "whiteCartProductDiv",                     
				cartProductChildDiv : "whiteCartProductChildDiv"                        
			}                                   

			idObjectArray.push(idObject);                                 
			classObjectArray.push(classObject);                    
		}                     

		return getCartItemsDropDownComponents(cartProductsArray, idObjectArray, classObjectArray);                                
	}

	var fillLoginCartItemsDropDown = function(cartProductsArray, prefixArray) {
		var idObject = {};                          
		var classObject = {};                       
		var idObjectArray = [];                              
		var classObjectArray = [];                              

		for (var i = 0; i < cartProductsArray.length; i++) {
			idObject = {
				collectionImage : prefixArray[i] + "CartCollectionImage",                             
				cartItemsNumber : prefixArray[i] + "LoginCartItemsNumber",                        
				cartItemsCancelIcon : prefixArray[i] + "CartItemsCancelIcon"                          
			}                            

			classObject = {
				cartProductDiv : "cartProductDiv",                            
				cartProductChildDiv : "cartProductChildDiv"                        
			}                                       

			idObjectArray.push(idObject);                                 
			classObjectArray.push(classObject);                    
		}                             

		return getCartItemsDropDownComponents(cartProductsArray, idObjectArray, classObjectArray);                                
	}

	var fillCartProductsTable = function(cartProductsArray, prefixArray) {                                   
		var idObject = {};                                     
		var idObjectArray = [];                               

		for (var i = 0; i < cartProductsArray.length; i++) {
			idObject = {
				cartProductName : prefixArray[i] + "CartProductName",                             
				editCartProduct : prefixArray[i] + "EditCartProduct",                        
				removeCartProduct : prefixArray[i] + "RemoveCartProduct"                          
			}                                           

			idObjectArray.push(idObject);                                 
		}                                                                     

		return getCartTableComponents(cartProductsArray, idObjectArray);                              
	}                                                 

	var getCartItemsDropDownComponents = function(cartProductsArray, idObjectArray, classObjectArray) {
		var builtString = "";                                    

		for (var i = 0; i < cartProductsArray.length; i++) {                                                   
			builtString += "<div class=\"" + classObjectArray[i].cartProductDiv + "\">"                        
				+ "<div class=\"" + classObjectArray[i].cartProductChildDiv + "\">"                       
				+ "<img id=\"" + idObjectArray[i].collectionImage + "\" src=\""                                           
				+ cartProductsArray[i].collectionImage + "\" class=\"cartDivImage\"/>"                          
				+ "<div class=\"cartComponentsDiv\"><span class=\"cartDivName\">"                                   
				+ getCartTextValue(cartProductsArray[i].collectionName) + "</span></div>"                        
				+ "<div class=\"iconFlagDiv\"><div id=\"" + idObjectArray[i].cartItemsNumber                                         
				+ "\" class=\"cartItemsDivNumber-on\">" + cartProductsArray[i].collectionSize                          
				+ "</div><div id=\"" + idObjectArray[i].cartItemsCancelIcon                                           
				+ "\" class=\"cartItemsCancelIcon icon fa-close\"><div class=\"hiddenProductName\">"                                     
				+ getTextValue(cartProductsArray[i].collectionName) + "</div></div></div></div></div>";                                  
		}                                                         

		return builtString;                                       
	}                              

	var getCartTableComponents = function(cartProductsArray, idObjectArray) {                               
		var builtString = "";                                      

		for (var i = 0; i < cartProductsArray.length; i++) {                                       
			builtString += "<div class=\"cartTableRows col-xs-12\"><div class=\"cell col-xs-2\">"                                  
				+ "<img src=\"" + cartProductsArray[i].collectionImage + "\" title=\""                             
				+ cartProductsArray[i].collectionName + "\" class=\"cartPageTableProductImage\"/>"                              
				+ "</div><div id=\"" + idObjectArray[i].cartProductName + "\" class=\"cell cartTableProperties col-xs-2\">"                                
				+ cartProductsArray[i].collectionName + "</div><div class=\"cell cartTableProperties col-xs-2\">"                        
				+ cartProductsArray[i].collectionTotalPrice + "</div><div class=\"cell cartTableProperties col-xs-2\">"                      
				+ cartProductsArray[i].collectionSize + "</div><div class=\"cell cartTableProperties col-xs-2\">"                                   
				+ "<div id=\"" + idObjectArray[i].editCartProduct + "\" title=\"Edit " + cartProductsArray[i].collectionName                                  
				+ "\" class=\"cartTableEditIcon icon fa-edit col-xs-6\"></div><div id=\""                                                    
				+ idObjectArray[i].removeCartProduct + "\" title=\"Remove " + cartProductsArray[i].collectionName                                         
				+ " From Cart\" class=\"cartTableCancelIcon icon fa-close col-xs-6\"></div></div></div>";                             
		}		                                                     

		return builtString;                            
	}                               

	var getCartProductsTotalPrice = function(cartProductsTotalPrice) {                                      
		return "Total&nbsp;:&nbsp;&nbsp;" + cartProductsTotalPrice;                                  
	}                                  

	var checkEvents = function(response) {		                      
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
	}

	$("#categoryDiv").hover(function() {
		$("#categoryHeader").animate({width : "toggle"}, 353);                
		$("#categorySearchDiv").animate({width : "toggle"}, 353);                
	},                                               
	
	function() {
		$("#categorySearchDiv").animate({width : "toggle"}, 353);                
		$("#categoryHeader").animate({width : "toggle"}, 353);                
	});                                          

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

	var roundUp = function(number, precision) {
		return Math.ceil(number * precision) / precision;                      
	}                         
});           



/*// if you include your scripts at the very bottom, you don't need document ready
    (function($) {

      $("#zack").css("color", "green");
      $("#slator").css("color", "red");

    }(jQuery));                   

(function($) {

  var allStarCast = [
    { firstName: "Zack", lastName: "Morris" },
    { firstName: "Kelly", lastName: "Kapowski" },
    { firstName: "Lisa", lastName: "Turtle" },
    { firstName: "Screech", lastName: "Powers" },
    { firstName: "A.C.", lastName: "Slater" },
    { firstName: "Jessie", lastName: "Spano" },
    { firstName: "Richard", lastName: "Belding" }
  ]

  // iterate through the cast and find zack and kelly
  var worldsCutestCouple = [];
  $.each(allStarCast, function(idx, actor) {
    if (actor.firstName === "Zack" || actor.firstName === "Kelly") {
      worldsCutestCouple.push(actor);
    }
  });

  console.log(worldsCutestCouple);

}(jQuery));                            
*/

/*
	var checkEvents = function(response) {		                      
		if (response.productArrayCount > 0) {                                
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

			$("#whiteLogoutCartItemsIcon").hover(function() {                         
				if (isBodyCoverOpen === false) {                      
					$("#whiteLogoutCartItemsDropDownBody").slideDown(353);                          
					$("#whiteLoginDropDown").slideUp(353);                
					$("#loginDropDown").slideUp(353);                  
				}                           
			});                      

			$("#logoutCartItemsIcon").hover(function() {                  
				if (isBodyCoverOpen === false) {                  
					$("#logoutCartItemsDropDownBody").slideDown(353);                   
					$("#whiteLoginDropDown").slideUp(353);                
					$("#loginDropDown").slideUp(353);                  
				}                         
			});              

			$("#whiteLoginCartItemsIcon").hover(function() {                   
				if (isBodyCoverOpen === false) {                  
					$("#whiteLoginCartItemsDropDownBody").slideDown(353);                          
					$("#whiteLoginDropDown").slideUp(353);                
					$("#loginDropDown").slideUp(353);                  
				}                           
			});                      

			$("#loginCartItemsIcon").hover(function() { 
				if (isBodyCoverOpen === false) {                    
					$("#loginCartItemsDropDownBody").slideDown(353);                   
					$("#whiteLoginDropDown").slideUp(353);                
					$("#loginDropDown").slideUp(353);                       
				}                         
			});              
		}                    
	}
*/
	/*        

	$.ajax({
	  type: "POST",
	  url: url,
	  data: data,
	  success: success,
	  dataType: dataType
	});             

	Below Is The Shorthand Of The Above Ajax Call:                       

	$.post( "ajax/test.html", function( data ) {         
	  $( ".result" ).html( data );                             
	});                        

	*/               

	/*

	var getTextValue = function(collectionName) {
		return collectionName.split(" ").join("&nbsp;");                     
	}                         

	*/

/*
	var getTextValue = function(collectionName) {                    
		var spaceIndex = 0;                    
		var formattedName = "";                         	

		if (collectionName.indexOf(" ") !== -1) {
			spaceIndex = collectionName.indexOf(" ");                

			if (spaceIndex !== 0) {                            
				formattedName += collectionName.substring(0, spaceIndex) + "&nbsp;";                 
				temporaryName = collectionName.substring(spaceIndex + 1);                     

				if (temporaryName.indexOf(" ") !== -1) {                       
					formattedName += temporaryName;                       

					return getTextValue(formattedName);                     
				}                         
				else {
					formattedName += temporaryName;               
				}
			}
		}                              
		else {
			formattedName = collectionName;                    
		}                 

		return formattedName;                     
	}                 
*/                            

/*
	var getTextValue = function(collectionName) {                    
		var spaces = 0;        
		var spaceIndices = [];                        
		var formattedName = "";                         	

		for (var i = 0; i < collectionName.length; i++) {              
			if (collectionName[i] === " ") {
				spaceIndices.push(i);                  
			}                  
		}                      

		if (spaceindices.length > 0) {                
			for (var i = 0; i < spaceindices.length; i++) {          
				formattedName += collectionName.substring(0, spaceindices[i]) + "&nbsp;";                    
				temporaryName = collectionName.substring(spaceindices[i] + 1);              
			}                             
		}                               
		else {
			formattedName = collectionName;           
		}            

		return formattedName;                     
	}                 
*/

/*             
	roundUp(192.168, 10);  // 192.2           
*/

/*

$("button").click(function(){
    $("img").attr("width","500");
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


*/


/*

	for ($i = 0; $i < count($productName); $i++) {
		$allProducts[$i][0] = $productName[$i];                
		$allProducts[$i][1] = $productCategory[$i];                
		$allProducts[$i][2] = $productImage[$i];                
		$allProducts[$i][3] = $newProductPrice[$i];                
		$allProducts[$i][4] = $oldProductPrice[$i];                
		$allProducts[$i][5] = $amountSold[$i];                
		$allProducts[$i][6] = $numberOfReviews[$i];                
	}

*/


/*
                            <img id="firstCollectionImage" src="image/04.jpg" alt="" class="collectionImage"/>
                            <div class="col-xs-8 collectionProperties">
                                <div id="firstCollectionName" class="col-xs-12 collectionName">Purple&nbsp;Scrubshugs</div><br>
                                <div class="col-xs-12 collectionPrice">
                                    <div class="col-xs-5 removeOldPriceMargin">
                                        <del id="firstOldPrice" class="deletedPrice">$20.00</del>
                                    </div>   
                                    <div id="firstNewPrice" class="shiftNewPriceMargin">$12.00</div>         
                                </div><br>
*/


