<?php                     

    require_once("../coderback/store.php");                        
    require_once("../coderback/utility.php");                        

    Utility::startEducacodeSession();                                                                  

    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("About Us");                         

    require_once("../coderback/includeheader.php");                                

?>                          
    
    <div id="scrollDiv" class="col-xs-12 theBody whiteBody">                       
        <div class="aboutUsPage baseColor">


    <div id="communityDivision" class="communityDivision col-xs-9">
            <div id="majorAdvertLayout" class="majorAdvertLayout" style="display: none;">
                <img class="advertisement" src="image/advertise.jpg">
            </div>                                     

            <!-- ========================================================== -->

            <div id="educacodeCommunityQuestions" class="educacodeCommunityQuestions" style="display: none;">
                <div class="communityQuestionDivision">
                    <div class="communityQuestion baseColor">Kelejdlasjf Affkal Fjksafjlajf Ajf Kajf Klaj Flkajfsalkja Lksfj Klsajf Klajf Lkjaflk Ajsfk Jsal Kffsdaf</div>
                    <div class="questionCategory">ANDROID CCPP JAVA JAVASCRIPT QT</div>
                    <div class="questionAsker semiBlurColor">Smith Chibuzo</div>
                    <div class="questionClaps semiBlurColor">0 claps</div>
                    <div class="questionAnswers semiBlurColor">3&nbsp;answers</div>
                    <div class="askedTime semiBlurColor">2017-09-09</div>
                    <div class="questionId hideComponent">8</div>
                    <div class="askerProfilePicture hideComponent">SC150128810300027.jpg</div>
                    <div class="questionContent hideComponent">kldsadsusafdsafdkla jlksd jfalksj faklsjf klajskl fjsklfj kalsj fklajflkajf klsaj lkasjflk jaslkfjasklf jalkjf lkjf klajklfjaklfj lakjflkajl fkjakjfkajf lkajf ksjafkljfkasjlf</div>
                    <div class="numberOfAnswers hideComponent">3</div>
                    <div class="numberOfClaps hideComponent">0</div>
                    <div class="answerTableName hideComponent">answer150494556900027</div>
                    <div class="clapTableName hideComponent">clap150494556900027</div>
                    <div class="autheUserQuestion hideComponent">true</div>
                </div>
            </div>

            <!-- ============================================================ -->

            <div id="questionAnswerSection" class="questionAnswerSection hideComponent" style="display: block;">
                <div class="col-xs-1"><img class="memberQuestionPicture" src="image/SC150128810300027.jpg"></div>
                <div class="questionSection col-xs-11">
                    <div class="questionTitle headerColor">Kelejdlasjf Affkal Fjksafjlajf Ajf Kajf Klaj Flkajfsalkja Lksfj Klsajf Klajf Lkjaflk Ajsfk Jsal Kffsdaf</div>
                    <div class="questionAnswererAsker blurColor col-xs-6">Question By Smith Chibuzo</div>
                    <div class="askAnswerTime blurColor col-xs-6">2017-09-09</div>
                    <div class="questionContent baseColor">kldsadsusafdsafdkla jlksd jfalksj faklsjf klajskl fjsklfj kalsj fklajflkajf klsaj lkasjflk jaslkfjasklf jalkjf lkjf klajklfjaklfj lakjflkajl fkjakjfkajf lkajf ksjafkljfkasjlf</div>
                    <div class="confirmQuestionEdit confirmDelete confirmEdit hideComponent">Edit Question</div>
                    <div class="confirmQuestionDelete confirmDelete hideComponent">Delete Question</div>
                    <div class="questionInformation">
                        <div title="clap" class="clapperDivision col-xs-1"><img class="clapQuestionImage" src="image/notclapped.png"></div>
                        <div class="questionClapperInfo col-xs-2 semiBlurColor">
                            <div class="allTheClapsMarker allTheClaps-off">0&nbsp;claps</div>
                        </div>
                        <div title="answer" class="answerDivision col-xs-1"><img class="questionAnswerImage" src="image/comment.png"></div>
                        <div class="commentInfo semiBlurColor col-xs-2">
                            <div class="allTheAnswersMarker allTheAnswers-on">3&nbsp;answers</div>
                        </div>
                        <div class="controlDivision ">
                            <div title="Edit Question" class="editControlDivision"><img class="editReplyImage editQuestionControl" src="image/edit.png"></div>
                            <div title="Delete Question" class="deleteControlDivision"><img class="deleteReplyImage deleteQuestionControl" src="image/delete.png"></div>
                        </div>
                    </div>
                </div>
            <div class="separateQuestion col-xs-12"></div>
        </div>                                          






            <!-- =========================================================== -->

            <div id="prepareQuestionDivision" class="hideComponent" style="display: block;">                                                 
                <div id="prepareQuestionComponents" class="hideComponent">                                                         
                    <div class="questionInputHeader baseColor">The Title Of Your Question:</div>
                    <input id="memberQuestionTitle" class="memberQuestionTitle" type="text" name="">                                     
                    <div id="shortQuestionError" class="questionDialogError hideComponent">Your Question Must Be At Least Ten (10) Characters!</div>
                    <div id="emptyQuestionError" class="questionDialogError hideComponent">Question Field Must Not Be Empty!</div>
                    <div class="questionInputHeader baseColor">Select Categories Of Your Question:</div>                                             

                    <input id="idANDROID" type="checkbox" name="questionCategory" value="ANDROID">                                
                    <label class="categoryLabel" for="idANDROID">Android</label>
                    <input id="idANGULAR" type="checkbox" name="questionCategory" value="ANGULAR">                                
                    <label class="categoryLabel" for="idANGULAR">Angular</label>
                    <input id="idARDUINO" type="checkbox" name="questionCategory" value="ARDUINO">                                
                    <label class="categoryLabel" for="idARDUINO">Arduino</label>
                    <input id="idCCPP" type="checkbox" name="questionCategory" value="CCPP">                                
                    <label class="categoryLabel" for="idCCPP">C/C++</label>
                    <input id="idCSHARP" type="checkbox" name="questionCategory" value="CSHARP">                                
                    <label class="categoryLabel" for="idCSHARP">C#</label>
                    <input id="idJAVA" type="checkbox" name="questionCategory" value="JAVA">                                
                    <label class="categoryLabel" for="idJAVA">Java</label>
                    <input id="idJAVASCRIPT" type="checkbox" name="questionCategory" value="JAVASCRIPT">                                
                    <label class="categoryLabel" for="idJAVASCRIPT">JavaScript</label>
                    <input id="idPHP" type="checkbox" name="questionCategory" value="PHP">                                
                    <label class="categoryLabel" for="idPHP">PHP</label>
                    <input id="idQT" type="checkbox" name="questionCategory" value="QT">                                
                    <label class="categoryLabel" for="idQT">Qt</label>
                    <input id="idHTML" type="checkbox" name="questionCategory" value="HTML">                                
                    <label class="categoryLabel" for="idHTML">HTML</label>
                    <input id="idIONIC" type="checkbox" name="questionCategory" value="IONIC">                                
                    <label class="categoryLabel" for="idIONIC">Ionic</label>
                    <input id="idPYTHON" type="checkbox" name="questionCategory" value="PYTHON">                                
                    <label class="categoryLabel" for="idPYTHON">Python</label>
                    <input id="idRUBY" type="checkbox" name="questionCategory" value="RUBY">                                
                    <label class="categoryLabel" for="idRUBY">Ruby</label>
                    <input id="idMYSQL" type="checkbox" name="questionCategory" value="MYSQL">                                
                    <label class="categoryLabel" for="idMYSQL">MySQL</label>
                    <input id="idORACLEDB" type="checkbox" name="questionCategory" value="ORACLEDB">                                
                    <label class="categoryLabel" for="idORACLEDB">OracleDB</label>
                    <input id="idDJANGO" type="checkbox" name="questionCategory" value="DJANGO">                                
                    <label class="categoryLabel" for="idDJANGO">Django</label>
                    <div id="questionCategoryError" class="questionCategoryError hideComponent" style="display: block;">Please Check Your Question Categories!</div>                                        
                </div>                                            
                <div id="prepareQuestionHeader" class="questionInputHeader baseColor hideComponent">Prepare Your Question For Posting:</div>                                        
                <div id="prepareAnswerHeader" class="questionInputHeader baseColor hideComponent">Prepare Your Answer For Posting:</div>                                        
                <div id="prepareReplyHeader" class="questionInputHeader baseColor hideComponent">Prepare Your Reply For Posting:</div>                                        
                <div id="askQuestionDivision" class="askQuestionDivision col-xs-12">
                    <div id="questionProcessedOutput" class="prepareQuestionLayout prepareQuestionLayoutBottom baseColor"></div>                                                    
                    <div class="postQuestionControl">
                        <div id="editControlButton" class="editControlButton">Edit</div>
                        <div id="boldControlButton" class="controlButton col-xs-2 baseColor">B</div>
                        <div id="paragraphControlButton" class="controlButton col-xs-2 baseColor">P</div>
                        <div id="underlineControlButton" class="controlButton col-xs-2 baseColor"><u>U</u></div>
                        <div id="breakControlButton" class="controlButton shiftLeft col-xs-2 baseColor">BR</div>
                        <div id="codeControlButton" class="controlButton col-xs-2 shiftCodeLeft baseColor">{&nbsp;}</div>
                        <div id="" class="controlButtonStop"></div>
                    </div>
                    <textarea id="askQuestionTextarea" class="prepareQuestionLayout baseColor" spellcheck="false"></textarea>                                                     
                    <div id="postQuestionError" class="postQuestionError hideComponent"></div>
                    <div id="postAnswerError" class="postAnswerError hideComponent"></div>
                    <div id="postQuestionNow" class="postQuestionNow" style="display: none;">Post Question</div>
                    <div id="postAnswerNow" class="postQuestionNow">Post Answer</div>
                </div>                                            
            </div>                                                





            <!-- =========================================================== -->

        </div>
        <div class="informationDivision col-xs-3">
            <div id="askQuestionButton" class="askQuestionButton hideComponent" style="display: none;">Ask Question</div>
            <div id="showQuestions" class="showQuestions">Questions</div>
        </div>





<div class="col-xs-1"><img class="memberQuestionPicture" src="image/SC150128810300027.jpg"></div>
<div class="questionSection col-xs-11">
    <div class="questionTitle headerColor">Who Are Wai To I Don't Know</div>
    <div class="questionAnswererAsker blurColor col-xs-6">Question By Smith Chibuzo</div>
    <div class="askAnswerTime blurColor col-xs-6">2017-08-29</div>
    <div class="questionContent baseColor">kfjdlkasjlkf jklsjflkjsaljf lksajfkl afsaflksjfslkfk sf klaskldf ksllkfdslk fkls</div>
    <div class="confirmQuestionEdit confirmDelete confirmEdit hideComponent">Edit Question</div>
    <div class="confirmQuestionDelete confirmDelete">Delete&nbsp;Question</div>
    <div class="questionInformation">
        <div title="clap" class="clapperDivision col-xs-1"><img class="clapQuestionImage" src="image/clapped.png"></div>
        <div class="questionClapperInfo col-xs-2 semiBlurColor">
            <div class="allTheClapsMarker allTheClaps-on">1&nbsp;claps</div>
        </div>
        <div title="answer" class="answerDivision col-xs-1"><img class="questionAnswerImage" src="image/comment.png"></div>
        <div class="commentInfo semiBlurColor col-xs-2">
            <div class="allTheAnswersMarker allTheAnswers-on">3&nbsp;answers</div>
        </div>
        <div class="controlDivision ">
            <div title="Edit Question" class="editControlDivision"><img class="editReplyImage editQuestionControl" src="image/edit.png"></div>
            <div title="Delete Question" class="deleteControlDivision"><img class="deleteReplyImage deleteQuestionControl" src="image/delete.png"></div>
        </div>
    </div>
</div>

<div class="separateQuestion col-xs-12"></div>

<div class="col-xs-1"><img class="memberAnswerPicture" src="image/SC150128810300027.jpg"></div>
<div class="questionSection col-xs-11">
    <div class="questionAnswererAsker blurColor col-xs-6">Answer By Smith Chibuzo</div>
    <div class="askAnswerTime blurColor col-xs-6">2017-08-29</div>
    <div class="questionContent baseColor">uoifdsa foisfisaf asfj asljf ksajlkfsakljflk sflk jaslkfjlkaf lksafdlkjsalkf jlaksjf lkasfj lksaj</div>
    <div class="confirmAnswerEdit confirmDelete confirmEdit hideComponent">Edit Answer</div>
    <div class="confirmAnswerDelete confirmDelete">Delete&nbsp;Answer</div>
    <div class="answerInformation">
        <div title="clap" class="clapperDivision col-xs-1"><img class="clapAnswerImage" src="image/clapped.png"></div>
        <div class="answerClapperInfo col-xs-2 semiBlurColor">
            <div class="answerClapsMarker answerClaps-on">1&nbsp;claps</div>
        </div>
        <div title="reply" class="clapperDivision col-xs-1"><img class="answerReplyImage" src="image/comment.png"></div>
        <div class="replyInfo semiBlurColor col-xs-2">
            <div class="answerRepliesMarker answerReplies-on">1&nbsp;replies</div>
        </div>
        <div class="controlDivision ">
            <div title="Edit Answer" class="editControlDivision"><img class="editReplyImage editAnswerControl" src="image/edit.png"></div>
            <div title="Delete Answer" class="deleteControlDivision"><img class="deleteReplyImage deleteAnswerControl" src="image/delete.png"></div>
        </div>
    </div>
    <div class="answerClapTable hideComponent">clap150403716600027</div>
    <div class="answerReplyTable hideComponent">reply150403716600027</div>
    <div class="answerId hideComponent">1</div>
    <div class="replyAnswerDivision hideComponent col-xs-12">
        <div class="prepareReplyLayout prepareQuestionLayoutBottom baseColor"></div>
        <div class="postReplyControl">
            <div class="editControlButton">Edit</div>
            <div class="boldControlButton replyFormatControls col-xs-2 baseColor">B</div>
            <div class="paragraphControlButton replyFormatControls col-xs-2 baseColor">P</div>
            <div class="replyFormatControls col-xs-2 baseColor"><u class="underlineControlButton">U</u></div>
            <div class="breakControlButton replyBreakerControl col-xs-2 baseColor">BR</div>
            <div class="codeControlButton replyCoderControl col-xs-2 baseColor">{&nbsp;}</div>
            <div class="controlButtonStop">
        </div>
    </div>
    <textarea class="prepareReplyTextarea baseColor" spellcheck="false"></textarea>
    <div class="postReplyError hideComponent"></div>
    <div class="postReplyNow postReplyNow-off">Post Reply</div>
</div>

<div class="builtAnswerReplies hideComponent" style="display: block;">
    <div class="allReplyComposite col-xs-12">
        <div class="col-xs-1"><img class="replyProfilePicture" src="image/SC150128810300027.jpg"></div>
        <div class="answerReplyLayout col-xs-11">
            <div class="answerReplier blurColor col-xs-6">Reply By Smith Chibuzo</div>
            <div class="askAnswerTime blurColor col-xs-6">2017-08-29</div>
            <div class="questionContent baseColor">ufsd lajflkajlk jlkajf lkasjflk sajklf jkasljf lkasj flkajslfk asjlkf jslkfdjs akljfdkl</div>
            <div class="confirmReplyEdit confirmDelete confirmEdit hideComponent">Edit Reply</div>
            <div class="confirmReplyDelete confirmDelete">Delete&nbsp;Reply</div>
            <div class="answerInformation">
                <div title="clap" class="clapperDivision col-xs-1"><img class="replyClapperImage" src="image/clapped.png"></div>
                <div class="answerClapperInfo col-xs-2 semiBlurColor">
                    <div class="replyClapsMarker answerClaps-on">1&nbsp;claps</div>
                </div>
                <div class="controlDivision ">
                    <div title="Edit Reply" class="editControlDivision"><img class="editReplyImage editReplyControl" src="image/edit.png"></div>
                    <div title="Delete Reply" class="deleteControlDivision"><img class="deleteReplyImage deleteReplyControl" src="image/delete.png"></div>
                </div>
            </div>
            <div class="replyClapperTable hideComponent">clap150403725800027</div>
            <div class="replyAnswerTable hideComponent">reply150403716600027</div>
            <div class="replyAnswerId hideComponent">1</div>
        </div>
    </div>
</div>

</div><div class="col-xs-1"><img class="memberAnswerPicture" src="image/SC150128810300027.jpg"></div><div class="questionSection col-xs-11"><div class="questionAnswererAsker blurColor col-xs-6">Answer By Smith Chibuzo</div><div class="askAnswerTime blurColor col-xs-6">2017-08-29</div><div class="questionContent baseColor">ufdsklfaskjflk asjlkfjalksfjalksj kljflk dsjadflk jslkdfj lksjflk jsakldfj lkasdjflks</div><div class="answerInformation"><div title="clap" class="clapperDivision col-xs-1"><img class="clapAnswerImage" src="image/clapped.png"></div><div class="answerClapperInfo col-xs-2 semiBlurColor"><div class="answerClapsMarker answerClaps-on">1&nbsp;claps</div></div><div title="reply" class="clapperDivision col-xs-1"><img class="answerReplyImage" src="image/comment.png"></div><div class="replyInfo semiBlurColor col-xs-2"><div class="answerRepliesMarker answerReplies-on">2&nbsp;replies</div></div><div class="controlDivision "><div title="Edit Answer" class="editControlDivision"><img class="editReplyImage editAnswerControl" src="image/edit.png"></div><div title="Delete Answer" class="deleteControlDivision"><img class="deleteReplyImage deleteAnswerControl" src="image/delete.png"></div></div></div><div class="answerClapTable hideComponent">clap150403718100027</div><div class="answerReplyTable hideComponent">reply150403718100027</div><div class="answerId hideComponent">2</div><div class="replyAnswerDivision hideComponent col-xs-12"><div class="prepareReplyLayout prepareQuestionLayoutBottom baseColor"></div><div class="postReplyControl"><div class="editControlButton">Edit</div><div class="boldControlButton replyFormatControls col-xs-2 baseColor">B</div><div class="paragraphControlButton replyFormatControls col-xs-2 baseColor">P</div><div class="replyFormatControls col-xs-2 baseColor"><u class="underlineControlButton">U</u></div><div class="breakControlButton replyBreakerControl col-xs-2 baseColor">BR</div><div class="codeControlButton replyCoderControl col-xs-2 baseColor">{&nbsp;}</div><div class="controlButtonStop"></div></div><textarea class="prepareReplyTextarea baseColor" spellcheck="false"></textarea><div class="postReplyError hideComponent"></div><div class="postReplyNow postReplyNow-off">Post Reply</div></div><div class="builtAnswerReplies hideComponent" style="display: block;"><div class="allReplyComposite col-xs-12"><div class="col-xs-1"><img class="replyProfilePicture" src="image/SC150128810300027.jpg"></div><div class="answerReplyLayout col-xs-11"><div class="answerReplier blurColor col-xs-6">Reply By Smith Chibuzo</div><div class="askAnswerTime blurColor col-xs-6">2017-08-29</div><div class="questionContent baseColor">uiosdfau oifuoaslfk jsalkf jlkajf lkajlkf jalksjf lksajfl ksajlkf jlksaljlk</div><div class="answerInformation"><div title="clap" class="clapperDivision col-xs-1"><img class="replyClapperImage" src="image/clapped.png"></div><div class="answerClapperInfo col-xs-2 semiBlurColor"><div class="replyClapsMarker answerClaps-on">1&nbsp;claps</div></div><div class="controlDivision "><div title="Edit Reply" class="editControlDivision"><img class="editReplyImage editReplyControl" src="image/edit.png"></div><div title="Delete Reply" class="deleteControlDivision"><img class="deleteReplyImage deleteReplyControl" src="image/delete.png"></div></div></div><div class="replyClapperTable hideComponent">clap150403728700027</div><div class="replyAnswerTable hideComponent">reply150403718100027</div><div class="replyAnswerId hideComponent">1</div></div></div><div class="allReplyComposite col-xs-12"><div class="col-xs-1"><img class="replyProfilePicture" src="image/SC150128810300027.jpg"></div><div class="answerReplyLayout col-xs-11"><div class="answerReplier blurColor col-xs-6">Reply By Smith Chibuzo</div><div class="askAnswerTime blurColor col-xs-6">2017-08-29</div><div class="questionContent baseColor">ufsd udfa aslk fjlkajklf jkalsjf lasjf lkjaslkf jlakjf lkajlk dfjaksjf lksa</div><div class="answerInformation"><div title="clap" class="clapperDivision col-xs-1"><img class="replyClapperImage" src="image/clapped.png"></div><div class="answerClapperInfo col-xs-2 semiBlurColor"><div class="replyClapsMarker answerClaps-on">1&nbsp;claps</div></div><div class="controlDivision "><div title="Edit Reply" class="editControlDivision"><img class="editReplyImage editReplyControl" src="image/edit.png"></div><div title="Delete Reply" class="deleteControlDivision"><img class="deleteReplyImage deleteReplyControl" src="image/delete.png"></div></div></div><div class="replyClapperTable hideComponent">clap150403729700027</div><div class="replyAnswerTable hideComponent">reply150403718100027</div><div class="replyAnswerId hideComponent">2</div></div></div></div></div><div class="col-xs-1"><img class="memberAnswerPicture" src="image/SC150128810300027.jpg"></div><div class="questionSection col-xs-11"><div class="questionAnswererAsker blurColor col-xs-6">Answer By Smith Chibuzo</div><div class="askAnswerTime blurColor col-xs-6">2017-08-29</div><div class="questionContent baseColor">yuier w fasdlkfjlkaslkfj lkasjf lkasjlf kjaslk fjlkasjf lkasjflk ajslk fjlks</div><div class="answerInformation"><div title="clap" class="clapperDivision col-xs-1"><img class="clapAnswerImage" src="image/clapped.png"></div><div class="answerClapperInfo col-xs-2 semiBlurColor"><div class="answerClapsMarker answerClaps-on">1&nbsp;claps</div></div><div title="reply" class="clapperDivision col-xs-1"><img class="answerReplyImage" src="image/comment.png"></div><div class="replyInfo semiBlurColor col-xs-2"><div class="answerRepliesMarker answerReplies-on">2&nbsp;replies</div></div><div class="controlDivision "><div title="Edit Answer" class="editControlDivision"><img class="editReplyImage editAnswerControl" src="image/edit.png"></div><div title="Delete Answer" class="deleteControlDivision"><img class="deleteReplyImage deleteAnswerControl" src="image/delete.png"></div></div></div><div class="answerClapTable hideComponent">clap150403720400027</div><div class="answerReplyTable hideComponent">reply150403720400027</div><div class="answerId hideComponent">3</div><div class="replyAnswerDivision hideComponent col-xs-12"><div class="prepareReplyLayout prepareQuestionLayoutBottom baseColor"></div><div class="postReplyControl"><div class="editControlButton">Edit</div><div class="boldControlButton replyFormatControls col-xs-2 baseColor">B</div><div class="paragraphControlButton replyFormatControls col-xs-2 baseColor">P</div><div class="replyFormatControls col-xs-2 baseColor"><u class="underlineControlButton">U</u></div><div class="breakControlButton replyBreakerControl col-xs-2 baseColor">BR</div><div class="codeControlButton replyCoderControl col-xs-2 baseColor">{&nbsp;}</div><div class="controlButtonStop"></div></div><textarea class="prepareReplyTextarea baseColor" spellcheck="false"></textarea><div class="postReplyError hideComponent"></div><div class="postReplyNow postReplyNow-off">Post Reply</div></div><div class="builtAnswerReplies hideComponent" style="display: block;"><div class="allReplyComposite col-xs-12"><div class="col-xs-1"><img class="replyProfilePicture" src="image/SC150128810300027.jpg"></div><div class="answerReplyLayout col-xs-11"><div class="answerReplier blurColor col-xs-6">Reply By Smith Chibuzo</div><div class="askAnswerTime blurColor col-xs-6">2017-08-29</div><div class="questionContent baseColor">udsfalksjf lkajsklfj klsajklf ajsklfj klasjf klsajlf jslkajf lkasjflk sj lflksjafklajl aa ff fsafasf sfsaf</div><div class="answerInformation"><div title="clap" class="clapperDivision col-xs-1"><img class="replyClapperImage" src="image/clapped.png"></div><div class="answerClapperInfo col-xs-2 semiBlurColor"><div class="replyClapsMarker answerClaps-on">1&nbsp;claps</div></div><div class="controlDivision "><div title="Edit Reply" class="editControlDivision"><img class="editReplyImage editReplyControl" src="image/edit.png"></div><div title="Delete Reply" class="deleteControlDivision"><img class="deleteReplyImage deleteReplyControl" src="image/delete.png"></div></div></div><div class="replyClapperTable hideComponent">clap150403722100027</div><div class="replyAnswerTable hideComponent">reply150403720400027</div><div class="replyAnswerId hideComponent">1</div></div></div><div class="allReplyComposite col-xs-12"><div class="col-xs-1"><img class="replyProfilePicture" src="image/SC150128810300027.jpg"></div><div class="answerReplyLayout col-xs-11"><div class="answerReplier blurColor col-xs-6">Reply By Smith Chibuzo</div><div class="askAnswerTime blurColor col-xs-6">2017-08-29</div><div class="questionContent baseColor">ufoisdauf adlskfj lkjsaflkajslkf jlksaj lkjasflkjlksalk jaks jlkfjf ksjak</div><div class="answerInformation"><div title="clap" class="clapperDivision col-xs-1"><img class="replyClapperImage" src="image/clapped.png"></div><div class="answerClapperInfo col-xs-2 semiBlurColor"><div class="replyClapsMarker answerClaps-on">1&nbsp;claps</div></div><div class="controlDivision "><div title="Edit Reply" class="editControlDivision"><img class="editReplyImage editReplyControl" src="image/edit.png"></div><div title="Delete Reply" class="deleteControlDivision"><img class="deleteReplyImage deleteReplyControl" src="image/delete.png"></div></div></div><div class="replyClapperTable hideComponent">clap150403723300027</div><div class="replyAnswerTable hideComponent">reply150403720400027</div><div class="replyAnswerId hideComponent">2</div></div></div></div></div>



























<div class="questionTitle headerColor">Ufosa Odoif Oias Foiausiof Uaosf Oiasufoi Ausoifu Oiasuif Uosiufoia Ufoiaufoi</div>
<div class="questionAnswererAsker blurColor col-xs-6">Question By Smith Chibuzo</div>
<div class="askAnswerTime blurColor col-xs-6">2017-08-27</div>
<div class="questionContent baseColor">uoifisadksjksfh ksaf kjahskfjhaksjfh kasjfhkjsh kfjahfskj sdhak jfhsakj hfkjshafkjak jhskjafh</div>
<div class="confirmQuestionDelete">Click To Confirm</div>
<div class="questionInformation">
    <div id="clapQuestionImage" title="clap" class="clapperDivision col-xs-1">
        <img class="clapQuestionImage" src="image/notclapped.png">
    </div>
    <div class="questionClapperInfo col-xs-2 semiBlurColor">
        <div class="allTheClapsMarker allTheClaps-off">0&nbsp;claps</div>
    </div>
    <div id="answerQuestionImage" title="answer" class="answerDivision col-xs-1">
        <img class="questionAnswerImage" src="image/comment.png">
    </div>
    <div class="commentInfo semiBlurColor col-xs-2">
        <div class="allTheAnswersMarker allTheAnswers-on">5&nbsp;answers</div>
    </div>
    <div class="controlDivision ">
        <div title="Edit Question" class="editControlDivision">
            <img class="editReplyImage editQuestionControl" src="image/edit.png">
        </div>
        <div title="Delete Question" class="deleteControlDivision">
            <img class="deleteReplyImage deleteQuestionControl" src="image/delete.png">
        </div>
    </div>
</div>

<div class="col-xs-1"><img class="memberQuestionPicture" src="image/SC150273267400029.jpg"></div>
<div id="questionSection" class="questionSection col-xs-11">
    <div class="questionTitle headerColor">Who Wrote The C Programming Language?</div>
    <div class="questionAnswererAsker blurColor col-xs-6">Question By Smith Chibuzo</div>
    <div class="askAnswerTime blurColor col-xs-6">2017-08-14</div>
    <div class="questionContent baseColor">Who wrote the C programming language? <br>
        <div class="coder">
            <pre>
                <code>#include <stdio.h>

    int main() {
          printf("Hello World!");
          return 0;
    }</stdio.h>
                </code>
            </pre>
        </div>
    </div>

    <div class="questionInformation">
        <div id="clapQuestionImage" title="clap" class="clapperDivision col-xs-1"><img class="clapQuestionImage" src="image/notclapped.png"></div>
        <div class="questionClapperInfo col-xs-2 semiBlurColor">
            <div class="allTheClapsMarker allTheClaps-on">1&nbsp;claps</div>
        </div>
        <div id="answerQuestionImage" title="answer" class="answerDivision col-xs-1"><img class="questionAnswerImage"src="image/comment.png"></div>
        <div class="commentInfo semiBlurColor col-xs-2">
            <div class="allTheAnswersMarker allTheAnswers-on">1&nbsp;answers</div>
        </div>
        <div class="controlDivision">
            <div title="Edit Reply" class="editControlDivision">
                <img class="editReplyImage" src="image/edit.png">
            </div>
            <div title="Delete Reply" class="deleteControlDivision">
                <img class="deleteReplyImage" src="image/delete.png">
            </div>
        </div>
    </div>
</div>
<div class="separateQuestion col-xs-12"></div>
<div class="col-xs-1"><img class="memberAnswerPicture" src="image/SC150273267400029.jpg"></div>
<div class="questionSection col-xs-11">
    <div class="questionAnswererAsker blurColor col-xs-6">Answer By Smith Chibuzo</div>
    <div class="askAnswerTime blurColor col-xs-6">2017-08-14</div>
    <div class="questionContent baseColor">The author of C programming language is Dennis Ritchie. :-)</div>
    <div class="answerInformation">
        <div title="clap" class="clapperDivision col-xs-1"><img class="clapAnswerImage" src="image/notclapped.png"></div>
        <div class="answerClapperInfo col-xs-2 semiBlurColor">
            <div class="answerClapsMarker answerClaps-on">1&nbsp;claps</div>
        </div>
        <div title="reply" class="clapperDivision col-xs-1"><img class="answerReplyImage" src="image/comment.png"></div>
        <div class="replyInfo semiBlurColor col-xs-2">
            <div class="answerRepliesMarker answerReplies-on">1&nbsp;replies</div>
        </div>
        <div class="controlDivision">
            <div title="Edit Reply" class="editControlDivision">
                <img class="editReplyImage" src="image/edit.png">
            </div>
            <div title="Delete Reply" class="deleteControlDivision">
                <img class="deleteReplyImage" src="image/delete.png">
            </div>
        </div>
    </div>
    <div class="answerClapTable hideComponent">clap150273297200029</div>
    <div class="answerReplyTable hideComponent">reply150273297200029</div>
    <div class="answerId hideComponent">1</div>
    <div class="replyAnswerDivision hideComponent col-xs-12">
        <div class="prepareReplyLayout prepareQuestionLayoutBottom baseColor"></div>
        <div class="postReplyControl">
            <div class="editControlButton">Edit</div>
            <div class="boldControlButton replyFormatControls col-xs-2 baseColor">B</div>
            <div class="paragraphControlButton replyFormatControls col-xs-2 baseColor">P</div>
            <div class="replyFormatControls col-xs-2 baseColor"><u class="underlineControlButton">U</u></div>
            <div class="breakControlButton replyBreakerControl col-xs-2 baseColor">BR</div>
            <div class="codeControlButton replyCoderControl col-xs-2 baseColor">{&nbsp;}</div>
            <div class="controlButtonStop"></div>
        </div>
        <textarea class="prepareReplyTextarea baseColor" spellcheck="false"></textarea>
        <div class="postReplyError hideComponent"></div>
        <div class="postReplyNow postReplyNow-off">Post Reply</div>
    </div>
    <div class="builtAnswerReplies hideComponent"></div>
</div>











            <div class="replyMargin col-xs-1"></div>
            <div class="col-xs-1">
                <img class="replyProfilePicture" src="image/SC150128810300027.jpg">
            </div>
            <div class="answerReplyLayout col-xs-10">
                <div class="answerReplier blurColor col-xs-6">Reply By Smith Chibuzo</div>
                <div class="askAnswerTime blurColor col-xs-6">2017-08-11</div>
                <div class="questionContent baseColor">gasdkjaljflsj asjfasjdfksa ajkf jakl fjlafjk lsjfklsjdklsjkl jasl jflksdfjsl</div>
                <div class="answerInformation">
                    <div title="clap" class="clapperDivision col-xs-1">
                        <img class="replyClapperImage" src="image/notclapped.png">
                    </div>
                    <div class="answerClapperInfo col-xs-2 semiBlurColor">
                        <div class="answerClaps-off">0&nbsp;claps</div>
                    </div>
                    <div class="controlDivision">
                        <div title="Edit Reply" class="editControlDivision">
                            <img class="editReplyImage" src="image/edit.png">
                        </div>
                        <div title="Delete Reply" class="deleteControlDivision">
                            <img class="deleteReplyImage" src="image/delete.png">
                        </div>
                    </div>
                </div>
                <div class="replyClapperTable hideComponent">clap150243672800027</div>
                <div class="replyAnswerId hideComponent">1</div>
            </div>






            <div class="replyMargin col-xs-1"></div><div class="col-xs-1"><img class="replyProfilePicture" src="image/SC150128810300027.jpg"></div><div class="answerReplyLayout col-xs-10"><div class="answerReplier blurColor col-xs-6">Reply By Smith Chibuzo</div><div class="askAnswerTime blurColor col-xs-6">2017-08-11</div><div class="questionContent baseColor">gasdkjaljflsj asjfasjdfksa ajkf jakl fjlafjk lsjfklsjdklsjkl jasl jflksdfjsl</div><div class="answerInformation"><div title="clap" class="clapperDivision col-xs-1"><img class="replyClapperImage" src="image/notclapped.png"></div><div class="answerClapperInfo col-xs-2 semiBlurColor"><div class="answerClaps-off">0&nbsp;claps</div></div></div><div class="replyClapperTable hideComponent">clap150243672800027</div><div class="replyAnswerId hideComponent">1</div></div><div class="replyMargin col-xs-1"></div><div class="col-xs-1"><img class="replyProfilePicture" src="image/SC150128810300027.jpg"></div><div class="answerReplyLayout col-xs-10"><div class="answerReplier blurColor col-xs-6">Reply By Smith Chibuzo</div><div class="askAnswerTime blurColor col-xs-6">2017-08-11</div><div class="questionContent baseColor">gasdkjaljflsj asjfasjdfksa ajkf jakl fjlafjk lsjfklsjdklsjkl jasl jflksdfjsl</div><div class="answerInformation"><div title="clap" class="clapperDivision col-xs-1"><img class="replyClapperImage" src="image/notclapped.png"></div><div class="answerClapperInfo col-xs-2 semiBlurColor"><div class="answerClaps-off">0&nbsp;claps</div></div></div><div class="replyClapperTable hideComponent">clap150243672800027</div><div class="replyAnswerId hideComponent">1</div></div><div class="replyMargin col-xs-1"></div><div class="col-xs-1"><img class="replyProfilePicture" src="image/SC150128810300027.jpg"></div><div class="answerReplyLayout col-xs-10"><div class="answerReplier blurColor col-xs-6">Reply By Smith Chibuzo</div><div class="askAnswerTime blurColor col-xs-6">2017-08-11</div><div class="questionContent baseColor">gasdkjaljflsj asjfasjdfksa ajkf jakl fjlafjk lsjfklsjdklsjkl jasl jflksdfjsl</div><div class="answerInformation"><div title="clap" class="clapperDivision col-xs-1"><img class="replyClapperImage" src="image/notclapped.png"></div><div class="answerClapperInfo col-xs-2 semiBlurColor"><div class="answerClaps-off">0&nbsp;claps</div></div></div><div class="replyClapperTable hideComponent">clap150243672800027</div><div class="replyAnswerId hideComponent">1</div></div><div class="replyMargin col-xs-1"></div><div class="col-xs-1"><img class="replyProfilePicture" src="image/SC150128810300027.jpg"></div><div class="answerReplyLayout col-xs-10"><div class="answerReplier blurColor col-xs-6">Reply By Smith Chibuzo</div><div class="askAnswerTime blurColor col-xs-6">2017-08-11</div><div class="questionContent baseColor">gasdkjaljflsj asjfasjdfksa ajkf jakl fjlafjk lsjfklsjdklsjkl jasl jflksdfjsl</div><div class="answerInformation"><div title="clap" class="clapperDivision col-xs-1"><img class="replyClapperImage" src="image/notclapped.png"></div><div class="answerClapperInfo col-xs-2 semiBlurColor"><div class="answerClaps-off">0&nbsp;claps</div></div></div><div class="replyClapperTable hideComponent">clap150243672800027</div><div class="replyAnswerId hideComponent">1</div></div>

        </div>
    </div>
            <!-- 
    <div id="scrollDiv" class="col-xs-12 theBody whiteBody">                       
        <div class="aboutUsPage baseColor">
            <p class="aboutUsHeader headerColor">ABOUT US</p>
            <div class="coverAboutContents">
                <div class="whoWeAre">
                    <p class="subAboutMenu whoWeAreHeader headerColor">WHO WE ARE</p>
                    We are two friends from Africa hated by neighbours for loving computer programming.            
                </div>            
                <div class="ourVision">
                    <p class="subAboutMenu ourVisionHeader headerColor">OUR VISION</p>             
                    To advance technology in Africa.                
                </div>            
                <div class="ourMission">
                    <p class="subAboutMenu ourMissionHeader headerColor">OUR MISSION</p>               
                    To make self-education (mostly related to technology) simple for those who are not within the reach of quality teachers.         
<pre>
<code>String name = "solution";        
                        </code>
                    </pre>
                </div>            
            </div>
        </div>                               
         -->
<?php 

    require_once("../coderback/floatfooter.php");                                
?>                                     

    </div>                             

<?php                         

    require_once("../coderback/includefooter.php");                  


