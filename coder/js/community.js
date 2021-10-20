
(function($) {                  

	var community = {};

	community.replyInterface = {};
	community.answerInterface = {};
	community.questionInterface = {};                                            

	community.questionInterface.clapTableName = "";                                
	community.questionInterface.answerTableName = "";                                
	community.questionInterface.questionTitle = "";                                                
	community.questionInterface.questionCategory = "";                                                 
	community.questionInterface.questionContent = "";                                         

	var temporaryString = "";
	var appendBuiltString = "";                                               
	var builtQuestionString = "";                                        
	var isEditControlClicked = false;                                             
	var isEditQuestionProcess = false;
	var isControlButtonActive = false;                                    
	var canSubmitPreparedReply = false;                                         
	var canSubmitPreparedAnswer = false;                                         
	var canSubmitPreparedQuestion = false;                                         
	var answeredQuestionJustNow = false;
	var underlineControlClicked = false;                              
	var paragraphControlClicked = false;                         
	var boldControlClicked = false;                              
	var codeControlClicked = false;                              

	var authenticatedUser = [];                                                
	var checkedQuestionCategories = [];                                                 
	var questionCategoryArray = [];

	var inputTrackerArray = [];                                               
	var inputControlArray = ["title", "category", "content"];                                        

/**********************************************************************************
* ALWAYS USE $_SESSION["memberId"] SESSION MEMBERID TO AUTHENTICATE USER IN THE   *
* SERVER SIDE AND authenticatedUserId MEMBERID FOR THE CLIENT SIDE                *
***********************************************************************************/

    $.getJSON("../coderback/jsonauthenticateduser.php").done(function(theResponse) {                                                        
    	authenticatedUser = theResponse.slice();                                                      

    	if (authenticatedUser[0] === "true") {                                         
    		$("#askQuestionButton").show();                                       
    	}                                                        
    });                                                                           

    $.getJSON("../coderback/jsoneducacodequestion.php").done(function(theResponse) {                                                
		for (var i = 0; i < theResponse.length; i++) {                                                     
			builtQuestionString += "<div class=\"communityQuestionDivision\"><div "                                
				+ "class=\"communityQuestion baseColor\">" + theResponse[i][5] + "</div>"                             
                + "<div class=\"questionCategory\">" + theResponse[i][4] + "</div><div "                                           
                + "class=\"questionAsker semiBlurColor\">" + theResponse[i][1] + " "                                               
                + theResponse[i][2] + "</div><div class=\"questionClaps semiBlurColor\">"                                              
                + theResponse[i][8] + " claps</div><div class=\"questionAnswers semiBlurColor\">"                                   
                + theResponse[i][7] + "&nbsp;answers</div><div class=\"askedTime semiBlurColor\">"                                       
                + theResponse[i][11].substring(0, theResponse[i][11].indexOf(" ")) + "</div>"                                                  
                + "<div class=\"questionId hideComponent\">" + theResponse[i][0] + "</div>"                                              			
                + "<div class=\"askerProfilePicture hideComponent\">" + theResponse[i][3] + "</div>"                                              			
                + "<div class=\"questionContent hideComponent\">" + theResponse[i][6] + "</div>"                                              			
                + "<div class=\"numberOfAnswers hideComponent\">" + theResponse[i][7] + "</div>"                                              			
                + "<div class=\"numberOfClaps hideComponent\">" + theResponse[i][8] + "</div>"                                              			
                + "<div class=\"answerTableName hideComponent\">" + theResponse[i][9] + "</div>"
                + "<div class=\"clapTableName hideComponent\">" + theResponse[i][10] + "</div>"
                + "<div class=\"autheUserQuestion hideComponent\">" + theResponse[i][12] + "</div></div>";                                              			
		}                                                                     

		$("#educacodeCommunityQuestions").html(builtQuestionString);                                                     
    });                                                                                                         

    $("#showQuestions").click(function() {
    	location.reload();
    });

    $("#questionAnswerSection").keyup(function(event) {
    	if ($(event.target).is(".prepareReplyTextarea")) {
    		alterPostReplyButtonClass($(event.target).parent(".replyAnswerDivision").find(".prepareReplyLayout").html() 
    			+ $(event.target).val(), $(event.target).parent(".replyAnswerDivision").find(".postReplyNow"));
    	}
    });

   	$("#postAnswerNow").click(function() {
   		if (canSubmitPreparedAnswer) {
			community.answerInterface.questionId = community.questionInterface.questionId;
			community.answerInterface.answerTableName = community.questionInterface.answerTableName;

			$.post("../coderback/answerquestionserver.php", community.answerInterface).done(function(theResponse) {
				var useResponse = getResponseObject(theResponse); 

				community.questionInterface.numberOfAnswers = useResponse[0];
				community.answerInterface.answerId = useResponse[1];
				community.answerInterface.answererProfilePicture = useResponse[2];
				community.answerInterface.questionAnswerer = useResponse[3];
				community.answerInterface.answerTime = useResponse[4].substring(0, useResponse[4].indexOf(" "));
				community.answerInterface.answer = useResponse[5];
				community.answerInterface.numberOfClaps = useResponse[6];
				community.answerInterface.numberOfReplies = useResponse[7];
				community.answerInterface.authenticatedUserAnswer = useResponse[11];

				community.answerInterface.answerTableName = useResponse[8];  
				community.answerInterface.clapTableName = useResponse[10];
				answeredQuestionJustNow = true;
			/*Falsify answeredQuestionJustNow on clicking view all button*/

				community.replyInterface.answerTableName = community.answerInterface.answerTableName;
				community.replyInterface.answerId = community.answerInterface.answerId;
			    community.replyInterface.replyTableName = useResponse[9];

				var viewAllButton = "<div class=\"viewAllQuestionsButton col-xs-2\">View All</div>";

				$("#questionAnswerSection").html(buildQuestionInterface() + buildAnswerInterface() + viewAllButton);
				$("#questionAnswerSection").scrollTop($("#questionAnswerSection")[0].scrollHeight);
				$("#prepareQuestionHeader").fadeOut(353);                                          
				$("#prepareQuestionComponents").fadeOut(353);                                          
				$("#askQuestionButton").fadeIn(353);                                                  
				$("#postAnswerNow").hide(); 
    			$("#postQuestionNow").hide();
				$("#prepareQuestionDivision").slideUp(353);                                                 
				$("#educacodeCommunityQuestions").slideUp(353);                                                 
				$("#majorAdvertLayout").slideUp(353);                                             
			});
   		}
   	});

    $("#postAnswerNow").hover(function() {
		var answer = $.trim($("#questionProcessedOutput").html() + $("#askQuestionTextarea").val());

		if (answer.length < 10 && answer.length > 1) {
			$("#postAnswerError").html("Your Answer Is Too Short. Thanks For Trying To Contribute. Please Try Again.");                                                    
			$("#postAnswerError").fadeIn(353);                                            			
		}
		else if (answer.length < 1) {
			$("#postAnswerError").html("Answer Field Is Empty. Thanks For Trying To Contribute. Please Try Again.");                                                    
			$("#postAnswerError").fadeIn(353);                                            			
		}
		else {
			$("#postAnswerError").fadeOut(353);
			community.answerInterface.answer = answer;
			canSubmitPreparedAnswer = true;
		}
    });

/*
	On edit of question, answer or reply, remove it from the user interface and 
	place it in the textarea layout of post builder for editing. Carefully make 
	update changes in the database on edit submission. If peraventure the edit 
	was unsuccessful or alterred by network, make sure you do not commit changes 
	to the database. So, always effect change on confirmation and submission of 
	edited content by user.....................................................

	On delete of question, answer or reply by user, make sure user confirmed the 
	process before making changes in the database..............................

	On edit, place question to be edited in question preparatory textarea, 
	answer in answer preparatory textarea and reply in reply preparatory 
	textarea...................................................................
*/

    $("#questionAnswerSection").click(function(event) {                                              
    	if ($(event.target).is(".confirmReplyEdit") && authenticatedUser[0] === "true") {  

// Requirements: reply content, replyId, replyTableName

/*    		$.post("../coderback/editreplyserver.php", community.replyInterface).done(function(theResponse) {
  				$(event.target).parent(".answerReplyLayout").parent(".allReplyComposite").fadeOut(353);  
  				$(event.target).parent(".answerReplyLayout").parent(".allReplyComposite").parent(".builtAnswerReplies").parent(".questionSection").find(".answerInformation").find(".replyInfo").find(".answerRepliesMarker").html(theResponse + "&nbsp;replies");  
    		});*/
   		}

    	if ($(event.target).is(".confirmAnswerEdit") && authenticatedUser[0] === "true") {  
			if (answeredQuestionJustNow === false) {
				community.answerInterface.answerId = $(event.target).parent(".questionSection").find(".answerId").html();
				community.answerInterface.answer = $(event.target).parent(".questionSection").find(".questionContent").html();	
			}

			$(event.target).parent(".questionSection").fadeOut(353);

			$("#questionAnswerSection").html(buildQuestionInterface());                                       
			$("#prepareQuestionHeader").fadeOut(353);                                          
			$("#prepareQuestionComponents").fadeOut(353);                                          
			$("#askQuestionButton").fadeOut(353);                                                  
			$("#postAnswerNow").show(); 
			$("#postQuestionNow").hide();

			if ($("#prepareQuestionDivision").is(":visible")) {
				$("#prepareQuestionDivision").slideUp(353);                                                 
				$("#majorAdvertLayout").slideDown(353);                                             
				createCommunalInterface();
			}
			else {
				$("#questionProcessedOutput").html(community.answerInterface.answer);
				$("#prepareQuestionDivision").slideDown(353);                                                 
				$("#majorAdvertLayout").slideUp(353);                                             
			}

			$("#educacodeCommunityQuestions").slideUp(353);
			$("#askQuestionTextarea").focus();

// Requirements: answer content, answerId, answerTableName

/* Response before reload: {"answerTableName":"answer150494556900027",
"answerId":"7","answer":"ureiwuirjlksj asjflkajslkf jaslkfdj lkaj flkajf lkajfl kajdflkjalk fdjaskl jflaksjf lkaj fdlkajfd lksajl",
"questionId":"8","answererProfilePicture":"SC150128810300027.jpg",
"questionAnswerer":"Smith Chibuzo","answerTime":"2017-09-11",
"numberOfClaps":0,"numberOfReplies":0,"authenticatedUserAnswer":"true",
"clapTableName":"clap150511672100027","clapStatusImage":"notclapped.png"} */

/* Response after reload: {"answerTableName":"answer150494556900027",
"answerId":"1","answer":"uouofdaui ufaoufodauif uaif iuaodf uiafu ioasfu idafu afu sauf au fiaufsufosfu"}*/

/*    		$.post("../coderback/editanswerserver.php", community.replyInterface).done(function(theResponse) {
  				$(event.target).parent(".answerReplyLayout").parent(".allReplyComposite").fadeOut(353);  
  				$(event.target).parent(".answerReplyLayout").parent(".allReplyComposite").parent(".builtAnswerReplies").parent(".questionSection").find(".answerInformation").find(".replyInfo").find(".answerRepliesMarker").html(theResponse + "&nbsp;replies");  
    		});*/
   		}

    	if ($(event.target).is(".confirmQuestionEdit") && authenticatedUser[0] === "true") {  
			isEditQuestionProcess = true;
			var gottenCategoryArray = getQuestionCategoryArray();

			for (var i = 0; i < gottenCategoryArray.length; i++) {
				$("#id" + gottenCategoryArray[i]).prop("checked", true);
			}

			$("#memberQuestionTitle").prop("disabled", true);                       
			$("#memberQuestionTitle").val(community.questionInterface.questionTitle);                       			
			$("#questionProcessedOutput").html(community.questionInterface.questionContent);
			$("#prepareQuestionHeader").fadeIn(353);                                          
			$("#prepareQuestionComponents").fadeIn(353);                                          
			$("#askQuestionButton").fadeOut(353);                                                  
			$("#prepareQuestionDivision").slideDown(353);                                                 
			$("#educacodeCommunityQuestions").slideUp(353);                                                 
			$("#questionAnswerSection").slideUp(353);                                        
			$("#majorAdvertLayout").slideUp(353);                                                 
			$("#postQuestionNow").show();
			$("#postAnswerNow").hide();
			$("#askQuestionTextarea").focus();
			checkMemberQuestionTitleField();
   		}

    	if ($(event.target).is(".answerInformation")) {
    		hideConfirmationButtons();
		}

    	if ($(event.target).is(".questionTitle")) {
    		hideConfirmationButtons();
		}

    	if ($(event.target).is(".questionContent")) {
    		hideConfirmationButtons();
		}

    	if ($(event.target).is(".questionInformation")) {
    		hideConfirmationButtons();
		}

    	if ($(event.target).is(".confirmReplyDelete") && authenticatedUser[0] === "true") { 
  		  	community.replyInterface.replyId = $(event.target).parent(".answerReplyLayout").find(".replyAnswerId").html();  

    		$.post("../coderback/deletereplyserver.php", community.replyInterface).done(function(theResponse) {
  				$(event.target).parent(".answerReplyLayout").parent(".allReplyComposite").fadeOut(353);  
  				$(event.target).parent(".answerReplyLayout").parent(".allReplyComposite").parent(".builtAnswerReplies").parent(".questionSection").find(".answerInformation").find(".replyInfo").find(".answerRepliesMarker").html(theResponse + "&nbsp;replies");  
    		});
   		}

    	if ($(event.target).is(".confirmAnswerDelete") && authenticatedUser[0] === "true") {
    		community.answerInterface.questionId = community.questionInterface.questionId;

    		if (answeredQuestionJustNow === false) {
	    		community.answerInterface.answerId = $(event.target).parent(".questionSection").find(".answerId").html();
    		}

    		$.post("../coderback/deleteanswerserver.php", community.answerInterface).done(function(theResponse) { 
	    		var questionAnswers = theResponse + "&nbsp;answers";

	    		$(event.target).parent(".questionSection").parent("#questionAnswerSection").find(".questionSection").find(".questionInformation").find(".commentInfo").find(".allTheAnswersMarker").html(questionAnswers);
    			$(event.target).parent(".questionSection").find(".replyAnswerDivision").slideUp(353);
    			$(event.target).parent(".questionSection").prev(".col-xs-1").fadeOut(353);
    			$(event.target).parent(".questionSection").fadeOut(353);
    		});
   		}

    	if ($(event.target).is(".confirmQuestionDelete") && authenticatedUser[0] === "true") {
    		$.post("../coderback/deletequestionserver.php", community.questionInterface).done(function(theResponse) {
	    		location.reload(true);
    		});
   		}

    	if ($(event.target).is(".editReplyControl") && authenticatedUser[0] === "true") {
    		hideConfirmationButtons();

    	 	if ($(event.target).parent(".editControlDivision").parent(".controlDivision").parent(".answerInformation").parent(".answerReplyLayout").find(".confirmReplyEdit").is(":visible")) {
	    		$(event.target).parent(".editControlDivision").parent(".controlDivision").parent(".answerInformation").parent(".answerReplyLayout").find(".confirmReplyEdit").slideUp(353);
			}
			else {
	    		$(event.target).parent(".editControlDivision").parent(".controlDivision").parent(".answerInformation").parent(".answerReplyLayout").find(".confirmReplyEdit").slideDown(353);
			}
    	}

    	if ($(event.target).is(".editAnswerControl") && authenticatedUser[0] === "true") {
    		hideConfirmationButtons();

    	 	if ($(event.target).parent(".editControlDivision").parent(".controlDivision").parent(".answerInformation").parent(".questionSection").find(".confirmAnswerEdit").is(":visible")) {
	    		$(event.target).parent(".editControlDivision").parent(".controlDivision").parent(".answerInformation").parent(".questionSection").find(".confirmAnswerEdit").slideUp(353);
			}
			else {
	    		$(event.target).parent(".editControlDivision").parent(".controlDivision").parent(".answerInformation").parent(".questionSection").find(".confirmAnswerEdit").slideDown(353);
			}
    	}

    	if ($(event.target).is(".editQuestionControl") && authenticatedUser[0] === "true") {
    		hideConfirmationButtons();

    	 	if ($(event.target).parent(".editControlDivision").parent(".controlDivision").parent(".questionInformation").parent(".questionSection").find(".confirmQuestionEdit").is(":visible")) {
	    		$(event.target).parent(".editControlDivision").parent(".controlDivision").parent(".questionInformation").parent(".questionSection").find(".confirmQuestionEdit").slideUp(353);
			}
			else {
	    		$(event.target).parent(".editControlDivision").parent(".controlDivision").parent(".questionInformation").parent(".questionSection").find(".confirmQuestionEdit").slideDown(353);
			}
    	}

    	if ($(event.target).is(".deleteReplyControl") && authenticatedUser[0] === "true") {
    		hideConfirmationButtons();

    	 	if ($(event.target).parent(".deleteControlDivision").parent(".controlDivision").parent(".answerInformation").prev(".confirmReplyDelete").is(":visible")) {
	    		$(event.target).parent(".deleteControlDivision").parent(".controlDivision").parent(".answerInformation").prev(".confirmReplyDelete").slideUp(353);
			}
			else {
	    		$(event.target).parent(".deleteControlDivision").parent(".controlDivision").parent(".answerInformation").prev(".confirmReplyDelete").slideDown(353);
			}
    	}

    	if ($(event.target).is(".deleteAnswerControl") && authenticatedUser[0] === "true") {
    		hideConfirmationButtons();

    	 	if ($(event.target).parent(".deleteControlDivision").parent(".controlDivision").parent(".answerInformation").prev(".confirmAnswerDelete").is(":visible")) {
	    		$(event.target).parent(".deleteControlDivision").parent(".controlDivision").parent(".answerInformation").prev(".confirmAnswerDelete").slideUp(353);
			}
			else {
	    		$(event.target).parent(".deleteControlDivision").parent(".controlDivision").parent(".answerInformation").prev(".confirmAnswerDelete").slideDown(353);
			}
    	}

    	if ($(event.target).is(".deleteQuestionControl") && authenticatedUser[0] === "true") {
    		hideConfirmationButtons();

    	 	if ($(event.target).parent(".deleteControlDivision").parent(".controlDivision").parent(".questionInformation").prev(".confirmQuestionDelete").is(":visible")) {
	    		$(event.target).parent(".deleteControlDivision").parent(".controlDivision").parent(".questionInformation").prev(".confirmQuestionDelete").slideUp(353);
			}
			else {
	    		$(event.target).parent(".deleteControlDivision").parent(".controlDivision").parent(".questionInformation").prev(".confirmQuestionDelete").slideDown(353);
			}
    	}

    	if ($(event.target).is(".replyClapperImage") && authenticatedUser[0] === "true") {
    		community.replyInterface.replyId = $(event.target).parent(".clapperDivision").parent(".answerInformation").parent(".answerReplyLayout").find(".replyAnswerId").html();
    		community.replyInterface.clapTableName = $(event.target).parent(".clapperDivision").parent(".answerInformation").parent(".answerReplyLayout").find(".replyClapperTable").html();
    		community.replyInterface.replyTableName = $(event.target).parent(".clapperDivision").parent(".answerInformation").parent(".answerReplyLayout").find(".replyAnswerTable").html();

    		$.post("../coderback/clapreplyserver.php", community.replyInterface).done(function(theResponse) {
				var useResponse = getResponseObject(theResponse);

				if (useResponse[1] > 0
					&& authenticatedUser[0] === "true"
		      		&& useResponse[0] === "true") {
		    		community.replyInterface.clapStatusImage = "<img class=\"replyClapperImage\" src=\"image/clapped.png\">";
		       	}
		       	else if (useResponse[1] > 0
		       		&& authenticatedUser[0] === "true"                                                
		    		&& useResponse[0] === "false") {
		     		community.replyInterface.clapStatusImage = "<img class=\"replyClapperImage\" src=\"image/notclapped.png\">";
		       	}
		    	else if (useResponse[1] > 0
			  		&& authenticatedUser[0] === "false") {
		      		community.replyInterface.clapStatusImage = "<img class=\"replyClapperImage\" src=\"image/clapped.png\">";
		       	}
		       	else {
		      		community.replyInterface.clapStatusImage = "<img class=\"replyClapperImage\" src=\"image/notclapped.png\">";
		       	}

		    	var replyClaps = useResponse[1] > 0 ? "answerClaps-on" : "answerClaps-off";

			 	$(event.target).parent(".clapperDivision").parent(".answerInformation").find(".answerClapperInfo")
			 		.html("<div class=\"replyClapsMarker " + replyClaps + "\">" + useResponse[1] + "&nbsp;claps</div>");
		       	$(event.target).parent(".clapperDivision").html(community.replyInterface.clapStatusImage);				
    		});
    	}
    
    	if ($(event.target).is(".answerRepliesMarker")) {
    		if ($(event.target).parent(".replyInfo").parent(".answerInformation").parent(".questionSection").find(".builtAnswerReplies").is(":visible")) {
    			$(event.target).parent(".replyInfo").parent(".answerInformation").parent(".questionSection").find(".builtAnswerReplies").fadeOut(353);
    		}
    		else {
    			community.replyInterface.numberOfReplies = $(event.target).html().substring(0, $(event.target).html().indexOf("&nbsp"));	    			
    			community.replyInterface.answerId = $(event.target).parent(".replyInfo").parent(".answerInformation").parent(".questionSection").find(".answerId").html();	
    			community.replyInterface.replyTableName = $(event.target).parent(".replyInfo").parent(".answerInformation").parent(".questionSection").find(".answerReplyTable").html();	

    			$.post("../coderback/jsonanswerreplies.php", community.replyInterface).done(function(theResponse) {  
    				useResponse = getResponseObject(theResponse);

    				$(event.target).parent(".replyInfo").parent(".answerInformation").parent(".questionSection").find(".builtAnswerReplies").html(buildReplyInterface(useResponse[1]));
    				$(event.target).parent(".replyInfo").parent(".answerInformation").parent(".questionSection").find(".builtAnswerReplies").fadeIn(353);
    			});
			}
		}

    	if ($(event.target).is(".postReplyNow") && authenticatedUser[0] === "true") {
    		if (canSubmitPreparedReply) {  
    			alterPostReplyButtonClass($(event.target).parent(".replyAnswerDivision").find(".prepareReplyLayout").html() 
    				+ $(event.target).parent(".replyAnswerDivision").find(".prepareReplyTextarea").val(), $(event.target));
	  			
    			community.replyInterface.reply = $(event.target).parent(".replyAnswerDivision").find(".prepareReplyLayout").html() 
    				+ $(event.target).parent(".replyAnswerDivision").find(".prepareReplyTextarea").val();

	  			if (answeredQuestionJustNow === false) {
	    			community.replyInterface.answerId = $(event.target).parent(".replyAnswerDivision").parent(".questionSection").find(".answerId").html();
	    			community.replyInterface.replyTableName = $(event.target).parent(".replyAnswerDivision").parent(".questionSection").find(".answerReplyTable").html();
				}

    			$.post("../coderback/replyanswerserver.php", community.replyInterface).done(function(theResponse) {
    				var useResponse = getResponseObject(theResponse);

					$(event.target).parent(".replyAnswerDivision").find(".prepareReplyLayout").html(""); 
    				$(event.target).parent(".replyAnswerDivision").find(".prepareReplyTextarea").val("");
    				$(event.target).parent(".replyAnswerDivision").slideUp(555);

    				$(".replyAnswerDivision").slideUp(353);
    				$(event.target).parent(".replyAnswerDivision").parent(".questionSection").find(".answerInformation").find(".replyInfo").html("<div class=\"answerRepliesMarker answerReplies-on\">" + useResponse[0] + "&nbsp;replies</div>");
    				$(event.target).parent(".replyAnswerDivision").parent(".questionSection").find(".builtAnswerReplies").html(buildReplyInterface(useResponse[1]));
    				$(event.target).parent(".replyAnswerDivision").parent(".questionSection").find(".builtAnswerReplies").fadeIn(353);
    			});
    		}
    		else {
    			alterPostReplyButtonClass($(event.target).parent(".replyAnswerDivision").find(".prepareReplyLayout").html() 
    				+ $(event.target).parent(".replyAnswerDivision").find(".prepareReplyTextarea").val(), $(event.target));
    			$(event.target).prev(".postReplyError").fadeIn(353);
    		}
    	}
    	
    	if ($(event.target).is(".clapQuestionImage") && authenticatedUser[0] === "true") {                                                
    		$.post("../coderback/clapquestionserver.php", community.questionInterface).done(function(theResponse) {                                                 
    			var fieldResponse = getResponseObject(theResponse);

    			community.questionInterface.userClapped = fieldResponse[0];                                         
    			community.questionInterface.numberOfClaps = fieldResponse[1];                                         

		    	if (community.questionInterface.numberOfClaps > 0                                           
		    		&& authenticatedUser[0] === "true"                                                
		    		&& community.questionInterface.userClapped === "true") {                                          
		    		community.questionInterface.clapStatusImage = "<img class=\"clapQuestionImage\" src=\"image/clapped.png\">";                                                
		    	}                                                                        
		    	else if (community.questionInterface.numberOfClaps > 0                                                  
		    		&& authenticatedUser[0] === "true"                                                
		    		&& community.questionInterface.userClapped === "false") {                                                
		    		community.questionInterface.clapStatusImage = "<img class=\"clapQuestionImage\" src=\"image/notclapped.png\">";                                               
		    	}                                                                                
				else if (community.questionInterface.numberOfClaps > 0                                                  
		    		&& authenticatedUser[0] === "false") {                                                
		    		community.questionInterface.clapStatusImage = "<img class=\"clapQuestionImage\" src=\"image/clapped.png\">";                                               
		    	}                                                                                
		    	else {                                                                           
		    		community.questionInterface.clapStatusImage = "<img class=\"clapQuestionImage\" src=\"image/notclapped.png\">";                                     
		    	}                                                                            

		    	var allTheClaps = community.questionInterface.numberOfClaps > 0 ? "allTheClaps-on" : "allTheClaps-off";
		    	var allTheAnswers = community.questionInterface.numberOfAnswers > 0 ? "allTheAnswers-on" : "allTheAnswers-off";

			 	$(event.target).parent(".clapperDivision").parent(".questionInformation").find(".questionClapperInfo")
			 		.html("<div class=\"allTheClapsMarker " + allTheClaps + "\">" + community.questionInterface.numberOfClaps + "&nbsp;claps</div>");
		 		$(event.target).parent(".clapperDivision").html(community.questionInterface.clapStatusImage);
    		});                                                                  
    	}                                                        

    	if ($(event.target).is(".questionAnswerImage") && authenticatedUser[0] === "true") { 
	    	if (community.questionInterface.numberOfClaps > 0                                           
	    		&& authenticatedUser[0] === "true"                                                
	    		&& community.questionInterface.userClapped === "true") {                                          
	    		community.questionInterface.clapStatusImage = "clapped.png";                                                
	    	}                                                                        
	    	else if (community.questionInterface.numberOfClaps > 0                                                  
	    		&& authenticatedUser[0] === "true"                                                
	    		&& community.questionInterface.userClapped === "false") {                                                
	    		community.questionInterface.clapStatusImage = "notclapped.png";                                               
	    	}                                                                                
			else if (community.questionInterface.numberOfClaps > 0                                                  
	    		&& authenticatedUser[0] === "false") {                                                
	    		community.questionInterface.clapStatusImage = "clapped.png";                                               
	    	}                                                                                
	    	else {                                                                           
	    		community.questionInterface.clapStatusImage = "notclapped.png";                                     
	    	}                                                                            

	    	var allTheClaps = community.questionInterface.numberOfClaps > 0 ? "allTheClaps-on" : "allTheClaps-off";
	    	var allTheAnswers = community.questionInterface.numberOfAnswers > 0 ? "allTheAnswers-on" : "allTheAnswers-off";

			$("#questionAnswerSection").html(buildQuestionInterface());                                       
			$("#prepareQuestionHeader").fadeOut(353);                                          
			$("#prepareQuestionComponents").fadeOut(353);                                          
			$("#askQuestionButton").fadeOut(353);                                                  
			$("#postAnswerNow").show(); 
			$("#postQuestionNow").hide();

			if ($("#prepareQuestionDivision").is(":visible")) {
				$("#prepareQuestionDivision").slideUp(353);                                                 
				$("#majorAdvertLayout").slideDown(353);                                             
				createCommunalInterface();
			}
			else {
				$("#prepareQuestionDivision").slideDown(353);                                                 
				$("#majorAdvertLayout").slideUp(353);                                             
			}

			$("#educacodeCommunityQuestions").slideUp(353);
			$("#askQuestionTextarea").focus();
    	}                                                                    

    	if ($(event.target).is(".clapAnswerImage") && authenticatedUser[0] === "true") {
    		if (answeredQuestionJustNow === false) {
	    		community.answerInterface.answerTableName = community.questionInterface.answerTableName;
    			community.answerInterface.answerId = $(event.target).parent(".clapperDivision").parent(".answerInformation").parent(".questionSection").find(".answerId").html();
    			community.answerInterface.clapTableName = $(event.target).parent(".clapperDivision").parent(".answerInformation").parent(".questionSection").find(".answerClapTable").html();
			}

    		$.post("../coderback/clapanswerserver.php", community.answerInterface).done(function(theResponse) { 
    			var useResponse = getResponseObject(theResponse);

				if (useResponse[1] > 0
					&& authenticatedUser[0] === "true"
		      		&& useResponse[0] === "true") {
		    		community.answerInterface.clapStatusImage = "<img class=\"clapAnswerImage\" src=\"image/clapped.png\">";
		       	}
		       	else if (useResponse[1] > 0
		       		&& authenticatedUser[0] === "true"                                                
		    		&& useResponse[0] === "false") {
		     		community.answerInterface.clapStatusImage = "<img class=\"clapAnswerImage\" src=\"image/notclapped.png\">";
		       	}
		    	else if (useResponse[1] > 0
			  		&& authenticatedUser[0] === "false") {
		      		community.answerInterface.clapStatusImage = "<img class=\"clapAnswerImage\" src=\"image/clapped.png\">";
		       	}
		       	else {
		      		community.answerInterface.clapStatusImage = "<img class=\"clapAnswerImage\" src=\"image/notclapped.png\">";
		       	}

		    	var answerClaps = useResponse[1] > 0 ? "answerClaps-on" : "answerClaps-off";

			 	$(event.target).parent(".clapperDivision").parent(".answerInformation").find(".answerClapperInfo")
			 		.html("<div class=\"answerClapsMarker " + answerClaps + "\">" + useResponse[1] + "&nbsp;claps</div>");
		       	$(event.target).parent(".clapperDivision").html(community.answerInterface.clapStatusImage);
    		});
		}

    	if ($(event.target).is(".answerReplyImage") && authenticatedUser[0] === "true") {
    		$(".replyAnswerDivision").slideUp(353);

			if ($(event.target).parent(".clapperDivision").parent(".answerInformation").parent(".questionSection").find(".replyAnswerDivision").is(":visible")) {
				$(event.target).parent(".clapperDivision").parent(".answerInformation").parent(".questionSection").find(".replyAnswerDivision").slideUp(555);
			}
			else {
				$(event.target).parent(".clapperDivision").parent(".answerInformation").parent(".questionSection").find(".replyAnswerDivision").slideDown(555);
				$(event.target).parent(".clapperDivision").parent(".answerInformation").parent(".questionSection").find(".replyAnswerDivision").find(".prepareReplyTextarea").focus();
			}
		}
		
		if ($(event.target).is(".codeControlButton") && authenticatedUser[0] === "true") {
    		if (codeControlButton && isControlButtonActive) {
	 			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").append(			
					appendBuiltString + $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val() + "</code></pre></div>");
    			alterPostReplyButtonClass($(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").html() 
    				+ $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val(), 
    				$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".postReplyNow"));
    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").removeClass("error");
    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val("");
    			$(event.target).removeClass("activeCodeControl");
    			isControlButtonActive = false;
    			alterClickedControls();
    		}
    		else if (isControlButtonActive === false) {
    			appendBuiltString = $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val() + "<div class=\"coder\"><pre><code>";
    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val("");
    			$(event.target).addClass("activeCodeControl");
    			isControlButtonActive = true;
    			isEditControlClicked = false;
    			alterClickedControls("code");
    		}
		}

		if ($(event.target).is(".breakControlButton") && authenticatedUser[0] === "true") {
    		if (isControlButtonActive === false) {
    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout")
    				.append($(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val() + "<br>");
    			alterPostReplyButtonClass($(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").html() 
    				+ $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val(), 
    				$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".postReplyNow"));

    			if ($(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").html().length > 10) {
	    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").removeClass("error");
    			}

    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val("");
    			isEditControlClicked = false;
    		}
		}

		if ($(event.target).is(".underlineControlButton") && authenticatedUser[0] === "true") { 
    		if (underlineControlClicked && isControlButtonActive) {
	 			$(event.target).parent(".replyFormatControls").parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").append(			
					appendBuiltString + $(event.target).parent(".replyFormatControls").parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val() + "</u>");
    			alterPostReplyButtonClass($(event.target).parent(".replyFormatControls").parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").html() 
    				+ $(event.target).parent(".replyFormatControls").parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val(), 
    				$(event.target).parent(".replyFormatControls").parent(".postReplyControl").parent(".replyAnswerDivision").find(".postReplyNow"));
    			$(event.target).parent(".replyFormatControls").parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").removeClass("error");
    			$(event.target).parent(".replyFormatControls").parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val("");
    			$(event.target).parent(".replyFormatControls").removeClass("activeUnderlineControl");
    			isControlButtonActive = false;
    			alterClickedControls();
    		}
    		else if (isControlButtonActive === false) {
    			appendBuiltString = $(event.target).parent(".replyFormatControls").parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val() + "<u>";
    			$(event.target).parent(".replyFormatControls").parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val("");
    			$(event.target).parent(".replyFormatControls").addClass("activeUnderlineControl");
    			isControlButtonActive = true;
    			isEditControlClicked = false;
    			alterClickedControls("underline");
    		}
		}

		if ($(event.target).is(".paragraphControlButton") && authenticatedUser[0] === "true") { 
    		if (paragraphControlClicked && isControlButtonActive) {
	 			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").append(			
					appendBuiltString + $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val() + "</p>");
    			alterPostReplyButtonClass($(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").html() 
    				+ $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val(), 
    				$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".postReplyNow"));
    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").removeClass("error");
    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val("");
    			$(event.target).removeClass("activeParagraphControl");
    			isControlButtonActive = false;
    			alterClickedControls();
    		}
    		else if (isControlButtonActive === false) {
    			appendBuiltString = $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val() + "<p>";
    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val("");
    			$(event.target).addClass("activeParagraphControl");
    			isControlButtonActive = true;
    			isEditControlClicked = false;
    			alterClickedControls("paragraph");
    		}
		}

		if ($(event.target).is(".boldControlButton") && authenticatedUser[0] === "true") {
    		if (boldControlClicked && isControlButtonActive) {
	 			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").append(			
					appendBuiltString + $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val() + "</b>");
    			alterPostReplyButtonClass($(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").html() 
    				+ $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val(), 
    				$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".postReplyNow"));
    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").removeClass("error");
    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val("");
    			$(event.target).removeClass("activeBoldControl");
    			isControlButtonActive = false;
    			alterClickedControls();
    		}
    		else if (isControlButtonActive === false) {
    			appendBuiltString = $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val() + "<b>";
    			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val("");
    			$(event.target).addClass("activeBoldControl");
    			isControlButtonActive = true;
    			isEditControlClicked = false;
    			alterClickedControls("bold");
    		}
		}
    	
		if ($(event.target).is(".editControlButton") && authenticatedUser[0] === "true") {
			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val(			
				$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").html()
				+ $(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyTextarea").val());
		
			$(event.target).parent(".postReplyControl").parent(".replyAnswerDivision").find(".prepareReplyLayout").html("");
		}

    	if ($(event.target).is(".replyAnswerDivision") && authenticatedUser[0] === "true") {
    		$(event.target).find(".prepareReplyTextarea").focus();
    	}

    	if ($(event.target).is(".prepareReplyLayout") && authenticatedUser[0] === "true") {
    		$(event.target).parent(".replyAnswerDivision").find(".prepareReplyTextarea").focus();
    	}
    });                                                             

    $("#educacodeCommunityQuestions").click(function(event) {
       	community.questionInterface.authenticatedUserId = authenticatedUser[1];
    	community.questionInterface.questionId = $(event.target).parent(".communityQuestionDivision").find(".questionId").html();                                            
    	community.questionInterface.questionTitle = $(event.target).parent(".communityQuestionDivision").find(".communityQuestion").html();                                            
    	community.questionInterface.questionCategory = $(event.target).parent(".communityQuestionDivision").find(".questionCategory").html();                                            
    	community.questionInterface.questionAsker = $(event.target).parent(".communityQuestionDivision").find(".questionAsker").html();                                            
    	community.questionInterface.questionClaps = $(event.target).parent(".communityQuestionDivision").find(".questionClaps").html();                                            
    	community.questionInterface.questionAnswers = $(event.target).parent(".communityQuestionDivision").find(".questionAnswers").html();                                            
    	community.questionInterface.askedTime = $(event.target).parent(".communityQuestionDivision").find(".askedTime").html();                                            
    	community.questionInterface.askerProfilePicture = $(event.target).parent(".communityQuestionDivision").find(".askerProfilePicture").html();                                            
    	community.questionInterface.questionContent = $(event.target).parent(".communityQuestionDivision").find(".questionContent").html();                                            
    	community.questionInterface.numberOfAnswers = $(event.target).parent(".communityQuestionDivision").find(".numberOfAnswers").html();                                            
    	community.questionInterface.numberOfClaps = $(event.target).parent(".communityQuestionDivision").find(".numberOfClaps").html();                                            
    	community.questionInterface.authenticatedUserQuestion = $(event.target).parent(".communityQuestionDivision").find(".autheUserQuestion").html();                                            
    	community.questionInterface.questionContent = $("<div/>").html(community.questionInterface.questionContent).text();                                              
    	community.questionInterface.answerTableName = $(event.target).parent(".communityQuestionDivision").find(".answerTableName").html();                                            
    	community.questionInterface.clapTableName = $(event.target).parent(".communityQuestionDivision").find(".clapTableName").html();                                            

    	community.answerInterface.answerTableName = community.questionInterface.answerTableName;

    	community.replyInterface.answerTableName = community.questionInterface.answerTableName;

   		createCommunalInterface();                                                    
    });                                                                  

	$("#postQuestionNow").click(function() {                                                   
		if (canSubmitPreparedQuestion) {                                             
			if (isEditQuestionProcess) {
				$.post("../coderback/editquestionserver.php", community.questionInterface).done(function(theResponse) {                                         
					var useResponse = getResponseObject(theResponse);
					postQuestionResponseProcessor(useResponse);
				});                                              
			}
			else {
				$.post("../coderback/askquestionserver.php", community.questionInterface).done(function(theResponse) {                                         
					var useResponse = getResponseObject(theResponse);
					postQuestionResponseProcessor(useResponse);
				});                                              
			}
		}		                                    
	});                                               

	$("input:checkbox").click(function() {                                                     
		$("#questionCategoryError").slideUp(353);                                           
		$("#postQuestionError").fadeOut(353);                                            
	});                                                        

	$("#postQuestionNow").hover(function() {                                          
		var questionErrorType = "";
		var question = $.trim($("#questionProcessedOutput").html() + $("#askQuestionTextarea").val());

		if (question.length < 33 && question.length > 1) {                                                  
			removeFromInputTrackerArray("content");                                            
			community.questionInterface.questionContent = "";                                                 
			questionErrorType = "SHORT INPUT";
		}                                                              
		else if (question.length < 1) {
			removeFromInputTrackerArray("content");                                            
			questionErrorType = "EMPTY INPUT";
		}
		else {                                                          
			community.questionInterface.questionContent = question;                                            
			addToInputTrackerArray("content");                                             
		}                                               

		if (inputTrackerArray.length !== inputControlArray.length) {                                          
			var builtTemporaryString = "";                                       
			var onlyQuestionFieldError = false;
			var numberOfErrorFields = inputControlArray.length - inputTrackerArray.length;                                          
			var useNumberOfErrorFields = numberOfErrorFields;                                        
			
			for (var i = 0; i < inputControlArray.length; i++) {                                            
				if (!inArray(inputTrackerArray, inputControlArray[i])) {                                         
					switch (inputControlArray[i]) {                                              
						case "title":                                              
							numberOfErrorFields--;                                      

							if (numberOfErrorFields > 1) {                                            
								builtTemporaryString += "Title, ";                                                  
							}                                                   
							else if (numberOfErrorFields === 1) {                                               
								builtTemporaryString += "Title and ";                                                  
							}                                         
							else if (numberOfErrorFields < 1) {                                      
								builtTemporaryString += "Title ";                                                  
							}                                              

							break;                                         
						case "category":                                              
							numberOfErrorFields--;                                      

							if (numberOfErrorFields > 1) {                                            
								builtTemporaryString += "Categories, ";                                                  
							}                                                   
							else if (numberOfErrorFields === 1) {                                               
								builtTemporaryString += "Categories and ";                                                  
							}                                         
							else if (numberOfErrorFields < 1) {                                      
								builtTemporaryString += "Categories ";                                                  
							}                                              

							break;                                         
						case "content":                                              
							numberOfErrorFields--;                                      

							if (numberOfErrorFields > 1) {                                            
								builtTemporaryString += "Question, ";                                                  
							}                                                   
							else if (numberOfErrorFields === 1) {                                               
								builtTemporaryString += "Question and ";                                                  
							}                                         
							else if (numberOfErrorFields < 1) {                                      
								builtTemporaryString += "Question ";                                                  
								onlyQuestionFieldError = true;
							}                                              

							break;                                         
					}                                                   
				}                                                    
			}			                                         

			if (useNumberOfErrorFields > 1) {                                             
				builtTemporaryString += "fields are not ready!";                                               
			}                                                                
			else {                                                             
				if (onlyQuestionFieldError) {
					builtTemporaryString = questionErrorType === "EMPTY INPUT" 
						? "Your Question Field Is Empty!" : "Your Question Is Too Short!";
				}
				else {
					builtTemporaryString += "field is not ready!";                                               
				}
			}                                                           

			$("#postQuestionError").html(builtTemporaryString);                                                    
			$("#postQuestionError").fadeIn(353);                                            			
			canSubmitPreparedQuestion = false;                                                     
		}                                                             
		else {                                                       
			$("#postQuestionError").fadeOut(353);                                                        
			canSubmitPreparedQuestion = true;                                                     
		}                                                      
	});                                              

	$("#memberQuestionTitle").focus(function() {                                                  
		$("#memberQuestionTitle").removeClass("error");                                               
		$("#shortQuestionError").slideUp(353);                                               
		$("#emptyQuestionError").slideUp(353);                                             
		$("#postQuestionError").fadeOut(353);                                            
	});                                                                        	

	$("#memberQuestionTitle").blur(function() {                                                  
		community.questionInterface.questionTitle = $.trim($("#memberQuestionTitle").val());                                             
		checkMemberQuestionTitleField();                                                     
	});                                                                   

	$("#editControlButton").click(function() {                                           
		if (isEditControlClicked === false && isControlButtonActive === false) {                                              
			appendBuiltString = $("#questionProcessedOutput").html();                                        
			$("#askQuestionTextarea").val(appendBuiltString);                                                     
			$("#questionProcessedOutput").html("");                                          
			isEditControlClicked = true;                                       
		}                                                           
		
		$("#postQuestionError").fadeOut(353);                                            
	});                                                      

	$("#askQuestionDivision").click(function() {                                         
		$("#postQuestionError").fadeOut(353);                                            
		$("#askQuestionTextarea").focus();                                            
		checkMemberQuestionTitleField();                                                       
	});                                                      

	$("#askQuestionButton").click(function() {                                       
		$("#prepareQuestionHeader").fadeIn(353);                                          
		$("#prepareQuestionComponents").fadeIn(353);                                          
		$("#askQuestionButton").fadeOut(353);                                                  
		$("#prepareQuestionDivision").slideDown(353);                                                 
		$("#educacodeCommunityQuestions").slideUp(353);                                                 
		$("#questionAnswerSection").slideUp(353);                                        
		$("#majorAdvertLayout").slideUp(353);                                                 
		$("#postQuestionNow").show();
		$("#postAnswerNow").hide();
	});                                                      

    $("#codeControlButton").click(function() {                                           
    	if (codeControlClicked && isControlButtonActive) {                                                  
    		$("#questionProcessedOutput").append(appendBuiltString + $("#askQuestionTextarea").val() + "</code></pre></div>");                                          
    		$("#questionProcessedOutput").scrollTop($("#questionProcessedOutput")[0].scrollHeight);                                                
    		$("#codeControlButton").removeClass("activeCodeControl");                                                      
			$("#questionProcessedOutput").removeClass("error");                                          
    		$("#askQuestionTextarea").val("");                                               
    		isControlButtonActive = false;                                          
    		alterClickedControls();                                        
    	}                                                                 
    	else if (isControlButtonActive === false) {                                                      
    		appendBuiltString = $("#askQuestionTextarea").val() + "<div class=\"coder\"><pre><code>";                                                   
    		$("#codeControlButton").addClass("activeCodeControl");                                
    		$("#askQuestionTextarea").val("");                                                    
    		isControlButtonActive = true;                                                
    		isEditControlClicked = false;                                                
    		alterClickedControls("code");                                      
    	}                                                       
    });                                                       

    $("#breakControlButton").click(function() {                                           
    	if (isControlButtonActive === false) {                                                             
   			$("#questionProcessedOutput").append($("#askQuestionTextarea").val() + "<br>");                                        
   			$("#questionProcessedOutput").scrollTop($("#questionProcessedOutput")[0].scrollHeight);                                                
			$("#questionProcessedOutput").removeClass("error");                                          
    		$("#askQuestionTextarea").val("");                                                    
    		isEditControlClicked = false;                                   
    	}                                                                             
    });                                                       

    $("#underlineControlButton").click(function() {                                           
    	if (underlineControlClicked && isControlButtonActive) {                                                  
    		$("#questionProcessedOutput").append(appendBuiltString + $("#askQuestionTextarea").val() + "</u>");                                          
    		$("#questionProcessedOutput").scrollTop($("#questionProcessedOutput")[0].scrollHeight);                                                
    		$("#underlineControlButton").removeClass("activeUnderlineControl");                                
			$("#questionProcessedOutput").removeClass("error");                                          
    		$("#askQuestionTextarea").val("");                                               
    		isControlButtonActive = false;                                          
    		alterClickedControls();                                        
    	}                                                                 
    	else if (isControlButtonActive === false) {                                                      
    		appendBuiltString = $("#askQuestionTextarea").val() + "<u>";                                                   
    		$("#underlineControlButton").addClass("activeUnderlineControl");                                
    		$("#askQuestionTextarea").val("");                                                    
    		isControlButtonActive = true;                                          
    		isEditControlClicked = false;                                                
    		alterClickedControls("underline");                                        
    	}                                                       
    });                                                       

    $("#paragraphControlButton").click(function() {                                           
    	if (paragraphControlClicked && isControlButtonActive) {                                                  
    		$("#questionProcessedOutput").append(appendBuiltString + $("#askQuestionTextarea").val() + "</p>");                                          
    		$("#questionProcessedOutput").scrollTop($("#questionProcessedOutput")[0].scrollHeight);                                                
    		$("#paragraphControlButton").removeClass("activeParagraphControl");                                
			$("#questionProcessedOutput").removeClass("error");                                          
    		$("#askQuestionTextarea").val("");                                               
    		isControlButtonActive = false;                                          
    		alterClickedControls();                                        
    	}                                                                 
    	else if (isControlButtonActive === false) {                                                      
    		appendBuiltString = $("#askQuestionTextarea").val() + "<p>";                                                   
    		$("#paragraphControlButton").addClass("activeParagraphControl");                                
    		$("#askQuestionTextarea").val("");                                                    
    		isControlButtonActive = true;                                                 
    		isEditControlClicked = false;                                                
    		alterClickedControls("paragraph");                                        
    	}                                                       
    });                                                       

    $("#boldControlButton").click(function() {                                           
    	if (boldControlClicked && isControlButtonActive) {                                                  
    		$("#questionProcessedOutput").append(appendBuiltString + $("#askQuestionTextarea").val() + "</b>");                                          
    		$("#questionProcessedOutput").scrollTop($("#questionProcessedOutput")[0].scrollHeight);                                                
    		$("#boldControlButton").removeClass("activeBoldControl");                                
			$("#questionProcessedOutput").removeClass("error");                                          
    		$("#askQuestionTextarea").val("");                                               
    		isControlButtonActive = false;                                          
    		alterClickedControls();                                        
    	}                                                                 
    	else if (isControlButtonActive === false) {                                                      
    		appendBuiltString = $("#askQuestionTextarea").val() + "<b>";                                                   
    		$("#boldControlButton").addClass("activeBoldControl");                                
    		$("#askQuestionTextarea").val("");                                                    
    		isControlButtonActive = true;                                          
    		isEditControlClicked = false;                                                
    		alterClickedControls("bold");                                        
    	}                                                       
    });                                                       

	$("#askQuestionTextarea").focus(function() {                                                     
		community.questionInterface.questionCategory = "";                                                        

		$("#communityDivision").scrollTop($("#communityDivision")[0].scrollHeight);                                                   

		checkedQuestionCategories = $("input:checkbox:checked").map(function() {                                           
			return this.value;                                                   
		}).get();                                                     

		if (checkedQuestionCategories.length > 0) {                                   
			for (var i = 0; i < checkedQuestionCategories.length; i++) {                                                  
				community.questionInterface.questionCategory += checkedQuestionCategories[i].toUpperCase() + " ";                                                
			}                                                         

			community.questionInterface.questionCategory = $.trim(community.questionInterface.questionCategory);                                                     

			$("#questionCategoryError").slideUp(353);                                           	
			addToInputTrackerArray("category");                                             
		}                                                           
		else {                                                        
			$("#questionCategoryError").slideDown(353);                                   
			removeFromInputTrackerArray("category");                                       
			community.questionInterface.questionCategory = "";                                                 
		}                                                          
		
		$("#postQuestionError").fadeOut(353);                                            
		$("#postAnswerError").fadeOut(353);                                            
	});                                                                      

	$("#askQuestionTextarea").keydown(function(event) {                                                     
		if (event.keyCode === 33 || event.keyCode === 34) {                                              
			event.preventDefault();                                                           
		}                                                              
	});                                                                      

	var postQuestionResponseProcessor = function(useResponse) {
		$("input:checkbox").prop("checked", false);                                                       
		$("#questionProcessedOutput").html("");                               
		$("#askQuestionTextarea").val("");                          
		$("#memberQuestionTitle").val("");                       
		community.questionInterface.questionCategory = "";                   
		community.questionInterface.questionContent = "";                   
		community.questionInterface.questionTitle = "";                   
		inputTrackerArray = [];                                                    

		community.questionInterface.questionId = useResponse[0];
		community.questionInterface.userClapped = "false";
		community.questionInterface.askerProfilePicture = useResponse[1];
		community.questionInterface.numberOfClaps = 0;
		community.questionInterface.numberOfAnswers = 0;
		community.questionInterface.authenticatedUserQuestion = "true";
		community.questionInterface.questionTitle = useResponse[4];
		community.questionInterface.questionAsker = useResponse[2];
		community.questionInterface.questionContent = useResponse[5];
		community.questionInterface.askedTime = useResponse[8];
		community.questionInterface.clapTableName = useResponse[7];                                            
		community.questionInterface.answerTableName = useResponse[6];                                            
		community.questionInterface.questionCategory = useResponse[3];
		community.questionInterface.numberOfAnswers = useResponse[9];
		community.questionInterface.numberOfClaps = useResponse[10];
		community.questionInterface.userClapped = useResponse[11];

		$("#askQuestionButton").fadeIn(353);                                                  
		$("#prepareQuestionHeader").slideUp(353);                                          
		$("#prepareQuestionComponents").slideUp(353);                                          
		$("#prepareQuestionDivision").slideUp(353);                                                 
		$("#majorAdvertLayout").slideDown(353);                                                 
		isEditQuestionProcess = false;
		$("#postQuestionNow").hide();
		$("#postAnswerNow").hide();

		createCommunalInterface();				
	} 

	var getQuestionCategoryArray = function() {
		questionCategoryArray = [];
		temporaryString = community.questionInterface.questionCategory;
		fillQuestionCategoryArray(); 

		return questionCategoryArray;
	}

	var fillQuestionCategoryArray = function() {
		var getString = "";
		temporaryString = $.trim(temporaryString);

		if (temporaryString.indexOf(" ") > 0) {
			questionCategoryArray.push(temporaryString.substring(0, temporaryString.indexOf(" ")));
			temporaryString = temporaryString.substring(temporaryString.indexOf(" "));
			
			return fillQuestionCategoryArray();
		}
		else if (temporaryString.indexOf(" ") < 0 && temporaryString.length > 0) {
			questionCategoryArray.push(temporaryString);
		}
	}

	var hideConfirmationButtons = function() {
		$(".confirmQuestionDelete").slideUp(353);
		$(".confirmAnswerDelete").slideUp(353);
		$(".confirmReplyDelete").slideUp(353);
		$(".confirmQuestionEdit").slideUp(353);
		$(".confirmAnswerEdit").slideUp(353);
		$(".confirmReplyEdit").slideUp(353);
	}

	var buildReplyInterface = function(replyInterfaceComposite) {
		var answerReplyBuilder = "";

		for (var i = 0; i < replyInterfaceComposite.length; i++) {
			var clapStatusImage = "";
			var showReplyControls = "";

	    	if (replyInterfaceComposite[i][4] > 0                                           
	    		&& authenticatedUser[0] === "true"                                                
	    		&& replyInterfaceComposite[i][7] === "true") {                                          
	    		clapStatusImage = "clapped.png";                                                
	    	}                                                                        
	    	else if (replyInterfaceComposite[i][4] > 0                                                  
	    		&& authenticatedUser[0] === "true"                                                
	    		&& replyInterfaceComposite[i][7] === "false") {                                                
	    		clapStatusImage = "notclapped.png";                                               
	    	}                                                                                
			else if (replyInterfaceComposite[i][4] > 0                                                  
	    		&& authenticatedUser[0] === "false") {                                                
	    		clapStatusImage = "clapped.png";                                               
	    	}                                                                                
	    	else {                                                                           
	    		clapStatusImage = "notclapped.png";                                     
	    	}                                                                            

	    	var replyClaps = replyInterfaceComposite[i][4] > 0 ? "answerClaps-on" : "answerClaps-off";

	    	if (authenticatedUser[0] === "false" || replyInterfaceComposite[i][9] === "false") {
	    		showReplyControls = "hideComponent";
	    	}

			answerReplyBuilder += "<div class=\"allReplyComposite col-xs-12\"><div class=\"col-xs-1\">"
				+ "<img class=\"replyProfilePicture\" src=\"image/"	+ replyInterfaceComposite[i][2] + "\">"
				+ "</div><div class=\"answerReplyLayout col-xs-11\"><div class=\"answerReplier blurColor "
				+ "col-xs-6\">Reply By " + replyInterfaceComposite[i][1] + "</div><div class=\"askAnswerTime "
				+ "blurColor col-xs-6\">" + replyInterfaceComposite[i][5].substring(0, replyInterfaceComposite[i][5]
					.indexOf(" ")) + "</div><div class=\"questionContent baseColor\">" + replyInterfaceComposite[i][3] 
				+ "</div><div class=\"confirmReplyEdit confirmDelete confirmEdit hideComponent\">Edit Reply</div><div class=\""
				+ "confirmReplyDelete confirmDelete hideComponent\">Delete Reply</div><div class=\"answerInformation\"><div "
				+ "title=\"clap\" class=\"clapperDivision col-xs-1\"><img class=\"replyClapperImage\" src=\"image/" + clapStatusImage 
				+ "\"></div><div class=\"answerClapperInfo col-xs-2 semiBlurColor\"><div class=\"replyClapsMarker " + replyClaps + "\">" 
				+ replyInterfaceComposite[i][4] + "&nbsp;claps</div></div><div class=\"controlDivision " + showReplyControls + "\">"
				+ "<div title=\"Edit Reply\" class=\"editControlDivision\"><img class=\"editReplyImage editReplyControl\" src=\""
				+ "image/edit.png\"></div><div title=\"Delete Reply\" class=\"deleteControlDivision\"><img class=\"deleteReplyImage "
				+ "deleteReplyControl\" src=\"image/delete.png\"></div></div></div><div class=\"replyClapperTable hideComponent\">" 
				+ replyInterfaceComposite[i][6] + "</div><div class=\"replyAnswerTable hideComponent\">" + replyInterfaceComposite[i][8] 
				+ "</div><div class=\"replyAnswerId hideComponent\">" + replyInterfaceComposite[i][0] + "</div></div></div>";
		}

		return answerReplyBuilder;
	}

	var alterPostReplyButtonClass = function(replyLayoutTextarea, postReplyNowButton) {
		if (replyLayoutTextarea.length > 10) {
    		postReplyNowButton.prev(".postReplyError").fadeOut(353);
			postReplyNowButton.removeClass("postReplyNow-off");
			postReplyNowButton.addClass("postReplyNow-on");
			canSubmitPreparedReply = true;
		}
		else if (replyLayoutTextarea.length < 10 && replyLayoutTextarea.length > 0) {
			postReplyNowButton.prev(".postReplyError").html("Your Reply Is Too Short. Thanks For Trying To Contribute. Please Try Again.");
    		postReplyNowButton.prev(".postReplyError").fadeOut(353);
			postReplyNowButton.removeClass("postReplyNow-on");
			postReplyNowButton.addClass("postReplyNow-off");	
			canSubmitPreparedReply = false;
		}
		else {
			postReplyNowButton.prev(".postReplyError").html("Reply Field Is Empty. Thanks For Trying To Contribute. Please Try Again.");
    		postReplyNowButton.prev(".postReplyError").fadeOut(353);
			postReplyNowButton.removeClass("postReplyNow-on");
			postReplyNowButton.addClass("postReplyNow-off");	
			canSubmitPreparedReply = false;
		}
	}

	var buildAnswerInterface = function() {
		$("#educacodeCommunityQuestions").slideUp(353);                                   

    	if (community.answerInterface.numberOfClaps > 0                                           
    		&& authenticatedUser[0] === "true"                                                
    		&& community.answerInterface.userClapped === "true") {                                          
    		community.answerInterface.clapStatusImage = "clapped.png";                                                
    	}                                                                        
    	else if (community.answerInterface.numberOfClaps > 0                                                  
    		&& authenticatedUser[0] === "true"                                                
    		&& community.answerInterface.userClapped === "false") {                                                
    		community.answerInterface.clapStatusImage = "notclapped.png";                                               
    	}                                                                                
		else if (community.answerInterface.numberOfClaps > 0                                                  
    		&& authenticatedUser[0] === "false") {                                                
    		community.answerInterface.clapStatusImage = "clapped.png";                                               
    	}                                                                                
    	else {                                                                           
    		community.answerInterface.clapStatusImage = "notclapped.png";                                     
    	}                                                                            

    	var showAnswerControls = "";
    	var answerClaps = community.answerInterface.numberOfClaps > 0 ? "answerClaps-on" : "answerClaps-off";
		var answerReplies = community.answerInterface.numberOfReplies > 0 ? "answerReplies-on" : "answerReplies-off";

    	if (authenticatedUser[0] === "false" || community.answerInterface.authenticatedUserAnswer === "false") {
    		showAnswerControls = "hideComponent";
    	}

    	var questionAnswerBuilder = "<div class=\"col-xs-1\"><img class=\"memberAnswerPicture\" "
	    	+ "src=\"image/" + community.answerInterface.answererProfilePicture + "\"></div><div class=\"" 
	    	+ "questionSection col-xs-11\"><div class=\"questionAnswererAsker blurColor col-xs-6\">"
	    	+ "Answer By " + community.answerInterface.questionAnswerer + "</div><div class=\"askAnswerTime " 
	    	+ "blurColor col-xs-6\">" + community.answerInterface.answerTime + "</div><div class=\"questionContent "
	    	+ "baseColor\">" + community.answerInterface.answer + "</div><div class=\"confirmAnswerEdit confirmDelete "
	    	+ "confirmEdit hideComponent\">Edit Answer</div><div class=\"confirmAnswerDelete confirmDelete hideComponent\">"
	    	+ "Delete Answer</div><div class=\"answerInformation\"><div title=\"clap\" class=\"clapperDivision col-xs-1\">"
	    	+ "<img class=\"clapAnswerImage\" src=\"image/"	+ community.answerInterface.clapStatusImage + "\"></div><div "
	    	+ "class=\"answerClapperInfo col-xs-2 semiBlurColor\"><div class=\"" + answerClaps + "\">" 
	    	+ community.answerInterface.numberOfClaps + "&nbsp;claps</div></div><div title=\"reply\" class=\"clapperDivision "
	    	+ "col-xs-1\"><img class=\"answerReplyImage\" src=\"image/comment.png\"></div><div class=\"replyInfo semiBlurColor "
	    	+ "col-xs-2\"><div class=\"" + answerReplies + "\">" + community.answerInterface.numberOfReplies + "&nbsp;replies"
	    	+ "</div></div><div class=\"controlDivision\"><div title=\"Edit Answer\" class=\"editControlDivision\">"
            + "<img class=\"editReplyImage editAnswerControl" + showAnswerControls + "\" src=\"image/"
            + "edit.png\"></div><div title=\"Delete Answer\" class=\"deleteControlDivision\"><img class=\""
            + "deleteReplyImage deleteAnswerControl\" src=\"image/delete.png\"></div></div></div>" 
            + buildResponseTextarea() + "<div class=\"builtAnswerReplies hideComponent\"></div></div>";

    	return questionAnswerBuilder;
	}

	var buildQuestionInterface = function() {
		$("#educacodeCommunityQuestions").slideUp(353);                                   

    	if (community.questionInterface.numberOfClaps > 0                                           
    		&& authenticatedUser[0] === "true"                                                
    		&& community.questionInterface.userClapped === "true") {                                          
    		community.questionInterface.clapStatusImage = "clapped.png";                                                
    	}                                                                        
    	else if (community.questionInterface.numberOfClaps > 0                                                  
    		&& authenticatedUser[0] === "true"                                                
    		&& community.questionInterface.userClapped === "false") {                                                
    		community.questionInterface.clapStatusImage = "notclapped.png";                                               
    	}                                                                                
		else if (community.questionInterface.numberOfClaps > 0                                                  
    		&& authenticatedUser[0] === "false") {                                                
    		community.questionInterface.clapStatusImage = "clapped.png";                                               
    	}                                                                                
    	else {                                                                           
    		community.questionInterface.clapStatusImage = "notclapped.png";                                     
    	}                                                                            

    	var showQuestionControls = "";
    	var allTheClaps = community.questionInterface.numberOfClaps > 0 ? "allTheClaps-on" : "allTheClaps-off";
    	var allTheAnswers = community.questionInterface.numberOfAnswers > 0 ? "allTheAnswers-on" : "allTheAnswers-off";

    	if (authenticatedUser[0] === "false" || community.questionInterface.authenticatedUserQuestion === "false") {
    		showQuestionControls = "hideComponent";
    	}

		var questionAnswerBuilder = "<div class=\"col-xs-1\"><img class=\"memberQuestionPicture\" src=\"image/" 
			+ community.questionInterface.askerProfilePicture + "\"></div><div class=\"questionSection col-xs-11\"><div "
			+ "class=\"questionTitle headerColor\">" + community.questionInterface.questionTitle + "</div><div class=\""
			+ "questionAnswererAsker blurColor col-xs-6\">Question By " + community.questionInterface.questionAsker + "</div>"
			+ "<div class=\"askAnswerTime blurColor col-xs-6\">" + community.questionInterface.askedTime + "</div><div "
			+ "class=\"questionContent baseColor\">" + community.questionInterface.questionContent + "</div><div class=\"confirmQuestionEdit "
			+ "confirmDelete confirmEdit hideComponent\">Edit Question</div><div class=\"confirmQuestionDelete confirmDelete hideComponent\">Delete "
			+ "Question</div><div class=\"questionInformation\"><div title=\"clap\" class=\"clapperDivision col-xs-1\"><img class=\"clapQuestionImage\" "
			+ "src=\"image/" + community.questionInterface.clapStatusImage + "\"></div><div class=\"questionClapperInfo col-xs-2 semiBlurColor\"><div "
			+ "class=\"allTheClapsMarker " + allTheClaps + "\">" + community.questionInterface.numberOfClaps + "&nbsp;claps</div></div><div title=\""
			+ "answer\" class=\"answerDivision col-xs-1\"><img class=\"questionAnswerImage\" src=\"image/comment.png\"></div><div class=\"commentInfo "
			+ "semiBlurColor col-xs-2\"><div class=\"allTheAnswersMarker " + allTheAnswers + "\">" + community.questionInterface.numberOfAnswers 
			+ "&nbsp;answers</div></div><div class=\"controlDivision " + showQuestionControls + "\"><div title=\"Edit Question\" class=\""
			+ "editControlDivision\"><img class=\"editReplyImage editQuestionControl\" src=\"image/edit.png\"></div><div title=\"Delete "
			+ "Question\" class=\"deleteControlDivision\"><img class=\"deleteReplyImage deleteQuestionControl\" src=\"image/delete.png\">"
			+ "</div></div></div></div><div class=\"separateQuestion col-xs-12\"></div>";                                              

    	return questionAnswerBuilder;
	}

    var createCommunalInterface = function() {                                
    	$.post("../coderback/jsonquestioncomponents.php", community.questionInterface).done(function(theResponse) {                                             
    		var useResponse = getResponseObject(theResponse);
			$("#educacodeCommunityQuestions").slideUp(353);
			community.questionInterface.userClapped = useResponse[0];

			if (typeof community.questionInterface.askerProfilePicture === "undefined") {
				location.reload(true);
			}

	    	if (community.questionInterface.numberOfClaps > 0                                           
	    		&& authenticatedUser[0] === "true"                                                
	    		&& community.questionInterface.userClapped === "true") {                                          
	    		community.questionInterface.clapStatusImage = "clapped.png";                                                
	    	}                                                                        
	    	else if (community.questionInterface.numberOfClaps > 0                                                  
	    		&& authenticatedUser[0] === "true"                                                
	    		&& community.questionInterface.userClapped === "false") {                                                
	    		community.questionInterface.clapStatusImage = "notclapped.png";                                               
	    	}                                                                                
			else if (community.questionInterface.numberOfClaps > 0                                                  
	    		&& authenticatedUser[0] === "false") {                                                
	    		community.questionInterface.clapStatusImage = "clapped.png";                                               
	    	}                                                                                
	    	else {                                                                           
	    		community.questionInterface.clapStatusImage = "notclapped.png";                                     
	    	}                                                                            

	    	var showQuestionControls = "";
    		var allTheClaps = community.questionInterface.numberOfClaps > 0 ? "allTheClaps-on" : "allTheClaps-off";
	    	var allTheAnswers = community.questionInterface.numberOfAnswers > 0 ? "allTheAnswers-on" : "allTheAnswers-off";

	    	if (authenticatedUser[0] === "false" || community.questionInterface.authenticatedUserQuestion === "false") {
	    		showQuestionControls = "hideComponent";
	    	}

			var questionAnswerBuilder = "<div class=\"col-xs-1\"><img class=\"memberQuestionPicture\" "                                                 
				+ "src=\"image/" + community.questionInterface.askerProfilePicture + "\"></div><div class=\"questionSection col-xs-11\">"
				+ "<div class=\"questionTitle headerColor\">" + community.questionInterface.questionTitle + "</div><div class=\"questionAnswererAsker "
				+ "blurColor col-xs-6\">Question By " + community.questionInterface.questionAsker + "</div><div class=\"askAnswerTime blurColor col-xs-6\">" 
				+ community.questionInterface.askedTime + "</div><div class=\"questionContent baseColor\">" + community.questionInterface.questionContent 
				+ "</div><div class=\"confirmQuestionEdit confirmDelete confirmEdit hideComponent\">Edit Question</div><div class=\"confirmQuestionDelete "
				+ "confirmDelete hideComponent\">Delete Question</div><div class=\"questionInformation\"><div title=\"clap\" class=\"clapperDivision col-xs-1\">"
				+ "<img class=\"clapQuestionImage\" src=\"image/" + community.questionInterface.clapStatusImage + "\"></div><div class=\"questionClapperInfo "
				+ "col-xs-2 semiBlurColor\"><div class=\"allTheClapsMarker " + allTheClaps + "\">" + community.questionInterface.numberOfClaps + "&nbsp;claps"
				+ "</div></div><div title=\"answer\" class=\"answerDivision col-xs-1\"><img class=\"questionAnswerImage\"src=\"image/comment.png\"></div><div "
				+ "class=\"commentInfo semiBlurColor col-xs-2\"><div class=\"allTheAnswersMarker "	+ allTheAnswers + "\">" + community.questionInterface.numberOfAnswers 
				+ "&nbsp;answers</div></div><div class=\"controlDivision " + showQuestionControls + "\"><div title=\"Edit Question\" class=\"editControlDivision\">"
				+ "<img class=\"editReplyImage editQuestionControl\" src=\"image/edit.png\"></div><div title=\"Delete Question\" class=\"deleteControlDivision\">"
				+ "<img class=\"deleteReplyImage deleteQuestionControl\" src=\"image/delete.png\"></div></div></div></div><div class=\"separateQuestion col-xs-12\"></div>";                                              

    	    if (typeof useResponse[1] !== "undefined") {
		    	for (var i = 0; i < useResponse[1].length; i++) { 
		    		var clapStatusImage = "";

			    	if (useResponse[1][i][5] > 0                                           
			    		&& authenticatedUser[0] === "true"                                                
			    		&& useResponse[1][i][6] === "true") {                                          
			    		clapStatusImage = "clapped.png";                                                
			    	}                                                                        
			    	else if (useResponse[1][i][5] > 0                                                  
			    		&& authenticatedUser[0] === "true"                                                
			    		&& useResponse[1][i][6] === "false") {                                                
			    		clapStatusImage = "notclapped.png";                                               
			    	}                                                                                
					else if (useResponse[1][i][5] > 0                                                  
			    		&& authenticatedUser[0] === "false") {                                                
			    		clapStatusImage = "clapped.png";                                               
			    	}                                                                                
			    	else {                                                                           
			    		clapStatusImage = "notclapped.png";                                     
			    	}                                                                            

			    	var showAnswerControls = "";
			    	var answerClaps = useResponse[1][i][5] > 0 ? "answerClaps-on" : "answerClaps-off";
					var answerReplies = useResponse[1][i][4] > 0 ? "answerReplies-on" : "answerReplies-off";

			    	if (authenticatedUser[0] === "false" || useResponse[1][i][10] === "false") {
			    		showAnswerControls = "hideComponent";
			    	}

		    		questionAnswerBuilder += "<div class=\"col-xs-1\"><img class=\"memberAnswerPicture\" "
				    	+ "src=\"image/" + useResponse[1][i][2] + "\"></div><div class=\"questionSection "
				    	+ "col-xs-11\"><div class=\"questionAnswererAsker blurColor col-xs-6\">Answer By " 
				    	+ useResponse[1][i][1] + "</div><div class=\"askAnswerTime blurColor col-xs-6\">" 
				    	+ useResponse[1][i][7].substring(0, useResponse[1][i][7].indexOf(" ")) + "</div>" 
				    	+ "<div class=\"questionContent baseColor\">" + useResponse[1][i][3] + "</div><div class=\""
				    	+ "confirmAnswerEdit confirmDelete confirmEdit hideComponent\">Edit Answer</div><div "
				    	+ "class=\"confirmAnswerDelete confirmDelete hideComponent\">Delete Answer</div><div "
				    	+ "class=\"answerInformation\"><div title=\"clap\" class=\"clapperDivision col-xs-1\">"
				    	+ "<img class=\"clapAnswerImage\" src=\"image/" + clapStatusImage + "\"></div><div class=\""
				    	+ "answerClapperInfo col-xs-2 semiBlurColor\"><div class=\"answerClapsMarker "	+ answerClaps 
				    	+ "\">" + useResponse[1][i][5] + "&nbsp;claps</div></div><div title=\"reply\" class=\""
				    	+ "clapperDivision col-xs-1\"><img class=\"answerReplyImage\" src=\"image/comment.png\">"
				    	+ "</div><div class=\"replyInfo semiBlurColor col-xs-2\"><div class=\"answerRepliesMarker " 
				    	+ answerReplies + "\">" + useResponse[1][i][4] + "&nbsp;replies</div></div><div class=\""
				    	+ "controlDivision " + showAnswerControls + "\"><div title=\"Edit Answer\" class=\"editControlDivision\">"
				    	+ "<img class=\"editReplyImage editAnswerControl\" src=\"image/edit.png\"></div><div "
				    	+ "title=\"Delete Answer\" class=\"deleteControlDivision\"><img class=\"deleteReplyImage "
				    	+ "deleteAnswerControl\" src=\"image/delete.png\"></div></div></div><div class=\""
				    	+ "answerClapTable hideComponent\">" + useResponse[1][i][8] + "</div><div class=\""
				    	+ "answerReplyTable hideComponent\">" + useResponse[1][i][9] + "</div><div class=\""
				    	+ "answerId hideComponent\">" + useResponse[1][i][0] + "</div>" + buildResponseTextarea() 
				    	+ "<div class=\"builtAnswerReplies hideComponent\"></div></div>";
		    	}
		    }

			$("#questionAnswerSection").html(questionAnswerBuilder);                                       
			$("#questionAnswerSection").slideDown(353);                                       
	    });
    }                                                                       

    var buildResponseTextarea = function() {
    	return "<div class=\"replyAnswerDivision hideComponent col-xs-12\"><div class=\""
    		+ "prepareReplyLayout prepareQuestionLayoutBottom baseColor\"></div><div class=\""
    		+ "postReplyControl\"><div class=\"editControlButton\">Edit</div><div class=\"boldControlButton "
    		+ "replyFormatControls col-xs-2 baseColor\">B</div><div class=\"paragraphControlButton replyFormatControls "
    		+ "col-xs-2 baseColor\">P</div><div class=\"replyFormatControls col-xs-2 baseColor\"><u class=\"underlineControlButton\">"
    		+ "U</u></div><div class=\"breakControlButton replyBreakerControl col-xs-2 baseColor\">BR</div><div class=\""
    		+ "codeControlButton replyCoderControl col-xs-2 baseColor\">{&nbsp;}</div><div class=\"controlButtonStop\"></div>"
    		+ "</div><textarea class=\"prepareReplyTextarea baseColor\" spellcheck=\"false\"></textarea><div class=\""
    		+ "postReplyError hideComponent\"></div><div class=\"postReplyNow postReplyNow-off\">Post Reply</div></div>";
    }

	var getResponseObject = function(response) {                                 
		var responseObject = {};                                   

		if (response.constructor === Object) {                            
			responseObject = response;                          
		} else if (response.constructor === String) {                           
			responseObject = JSON.parse(response);                                 
		}                                

		return responseObject;                   
	}                   

	var checkMemberQuestionTitleField = function() {                                                    
		if (community.questionInterface.questionTitle.length < 10 && community.questionInterface.questionTitle.length > 0) {                                              
			$("#memberQuestionTitle").addClass("error");                                                      
			$("#shortQuestionError").slideDown(353);                                               
			$("#emptyQuestionError").slideUp(353);                                             
			removeFromInputTrackerArray("title");                                               
			community.questionInterface.questionTitle = "";                                                
		}                                                            
		else if (community.questionInterface.questionTitle === "") {                                                
			$("#memberQuestionTitle").addClass("error");                                                      
			$("#emptyQuestionError").slideDown(353);                                             
			$("#shortQuestionError").slideUp(353);                                               
			removeFromInputTrackerArray("title");                                               
			community.questionInterface.questionTitle = "";                                                
		}                                                                
		else {                                                         
			community.questionInterface.questionTitle = toTitleCase(community.questionInterface.questionTitle);                                             
			addToInputTrackerArray("title");                                            
		}                                                    
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
 				
	var upperCaseFirstLetter = function(theWord) {                            
		return theWord.charAt(0).toUpperCase() + theWord.slice(1);                   
	}                           

	var removeMultipleSpaces = function(theString) {                   
		return theString.replace(/\s\s+/g, " ");                      
	}                        

	var toTitleCase = function(theString) {                     
		return theString.replace(/\w\S*/g, function(anotherString) {                     
			return anotherString.charAt(0).toUpperCase() + anotherString.substr(1).toLowerCase();                            
		});                            
	}                            

	var inArray = function(array, value) {                         
		return array.indexOf(value) > -1;                                 
	}                           

	var alterClickedControls = function(control) {                                                  
		switch (control) {                                          
			case "code":                                                
				codeControlClicked = true;                              
				underlineControlClicked = false;                              
				paragraphControlClicked = false;                              
				boldControlClicked = false;                              
				break;                                      
			case "underline":                                                
				codeControlClicked = false;                              
				underlineControlClicked = true;                              
				paragraphControlClicked = false;                              
				boldControlClicked = false;                              
				break;                                      
			case "paragraph":                                                
				codeControlClicked = false;                              
				underlineControlClicked = false;                              
				paragraphControlClicked = true;                              
				boldControlClicked = false;                              
				break;                                      
			case "bold":                                                
				codeControlClicked = false;                              
				underlineControlClicked = false;                              
				paragraphControlClicked = false;                              
				boldControlClicked = true;                              
				break;                                      
			default:                                     
				codeControlClicked = false;                              
				underlineControlClicked = false;                              
				paragraphControlClicked = false;                              
				boldControlClicked = false;                              
		}                                                    
	}                                                             

	$.each($("textarea[customshiftheight]"), function() {                           
		var offset = this.offsetHeight - this.clientHeight;                   

		var shiftTextarea = function(element) {                                         
			$(element).css("height", "auto").css("height",                                             
				element.scrollHeight + offset);                                                    
		}                                 

		if ($(this).val().length < 2100) {                                                     
			$(this).on("keyup input", function() {                                         
				shiftTextarea(this);                                          
			}).removeAttr("customshiftheight");                                
		}                                                      
		else {                                                                
			$(this).removeAttr("customshiftheight");                                              
		}                                                              
	});                                  

}(jQuery));                                   


