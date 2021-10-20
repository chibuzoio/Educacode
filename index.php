<?php                     

    require_once(realpath(dirname(__FILE__) . "/../Educacode/coderback/store.php"));                        
    require_once(realpath(dirname(__FILE__) . "/../Educacode/coderback/utility.php"));                        

    Utility::startEducacodeSession();                                                      

    // if (Authentication::isAuthenticated()) {                                        
    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("Coder");                         

?>      
                    
<!DOCTYPE html>

<html>
    <head>
        <title><?php print($store->getPageTitle()); ?></title>
        <meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
        <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
        <link rel="stylesheet" type="text/css" href="css/mycss/style.css">
        <link rel="stylesheet" type="text/css" href="css/mycss/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="css/font-awesome.min.css">
        <link rel="stylesheet" type="text/css" href="css/main.css">
    </head>                  
    <body id="educacode">                                           
        <div id="educacodeHeader" class="header col-xs-12">
            <div class="headerTitleDiv">
                <a href="index.php" class="headerColor headerTitle">Educacode</a>                        
            </div>
            <input type="text" id="educacodeSearchMaster" placeholder="Search" class="search">            
            <span class="searchIcon icon fa-search"></span>                          
            <div id="educacodeSearchResult" class="educacodeSearchResult-stretch headerColor hideComponent"></div>                                                 
            <div id="educacodeTerminalButton" class="consoleButton baseColor"><span class="icon fa-terminal"></span>&nbsp;Console</a></div>                                   
            <div id="educacodeEntrance" class="loginButton baseColor hideComponent"><a href="coder/signup.php" class="signUpAnchor"><span class="icon fa-sign-in"></span>&nbsp;Sign&nbsp;In</a></div>                                   
            <div id="profilePictureComposite" class="profilePictureComposite hideComponent"></div>
        </div>                                           
        <div id="accountDropdownInfo" class="accountDropdownInfo whiteBody hideComponent"></div>
        <div id="dropDownMenu" class="dropDownMenu">                  
            <div class="menuImageDiv">
                <div id="firstMenuCover" class="menuCover">          
                    <img src="image/01.png" class="menuImage"/>
                    <div id="firstImageCover" class="imageCover"></div>           
                    <div id="firstMenuTitle" class="menuTitle">Android<br>Projects</div>
                </div>                                   
                <div id="secondMenuCover" class="menuCover absoluteMenu secondSpace">          
                    <img src="image/02.png" class="menuImage"/>
                    <div id="secondImageCover" class="imageCover"></div>
                    <div id="secondMenuTitle" class="menuTitle">AngularJS<br>Projects</div>
                </div>                                   
                <div id="thirdMenuCover" class="menuCover absoluteMenu thirdSpace">          
                    <img src="image/03.png" class="menuImage"/>
                    <div id="thirdImageCover" class="imageCover"></div>
                    <div id="thirdMenuTitle" class="menuTitle">C/C++<br>Projects</div>
                </div>                                   
                <div id="fourthMenuCover" class="menuCover absoluteMenu fourthSpace">          
                    <img src="image/04.png" class="menuImage"/>
                    <div id="fourthImageCover" class="imageCover"></div>
                    <div id="fourthMenuTitle" class="menuTitle">C Sharp<br>Projects</div>
                </div>                                   
                <div id="fifthMenuCover" class="menuCover absoluteMenu fifthSpace">          
                    <img src="image/05.png" class="menuImage"/>
                    <div id="fifthImageCover" class="imageCover"></div>
                    <div id="fifthMenuTitle" class="menuTitle">Java<br>Projects</div>
                </div>                                   
                <div id="sixthMenuCover" class="menuCover absoluteMenu sixthSpace">          
                    <img src="image/06.png" class="menuImage"/>
                    <div id="sixthImageCover" class="imageCover"></div>
                    <div id="sixthMenuTitle" class="menuTitle">PHP<br>Projects</div>
                </div>                                   
                <div id="seventhMenuCover" class="menuCover absoluteMenu seventhSpace">          
                    <img src="image/07.png" class="menuImage"/>
                    <div id="seventhImageCover" class="imageCover"></div>
                    <div id="seventhMenuTitle" class="menuTitle">Qt<br>Projects</div>
                </div>                                  
                <div id="eighthMenuCover" class="menuCover absoluteMenu eighthSpace">          
                    <img src="image/08.png" class="menuImage"/>
                    <div id="eighthImageCover" class="imageCover"></div>
                    <div id="eighthMenuTitle" class="menuTitle">HTML<br>Projects</div>
                </div>                                  
                <div id="ninthMenuCover" class="menuCover absoluteMenu ninthSpace">          
                    <img src="image/09.png" class="menuImage"/>
                    <div id="ninthImageCover" class="imageCover"></div>
                    <div id="ninthMenuTitle" class="menuTitle">Ionic<br>Projects</div>
                </div>                                  
                <div id="tenthMenuCover" class="menuCover absoluteMenu tenthSpace">          
                    <img src="image/10.png" class="menuImage"/>
                    <div id="tenthImageCover" class="imageCover"></div>
                    <div id="tenthMenuTitle" class="menuTitle">Python<br>Projects</div>
                </div>                                   
                <div id="eleventhMenuCover" class="menuCover absoluteMenu eleventhSpace">          
                    <img src="image/11.png" class="menuImage"/>
                    <div id="eleventhImageCover" class="imageCover"></div>
                    <div id="eleventhMenuTitle" class="menuTitle">Ruby<br>Projects</div>
                </div>                                   
            </div>                             
        </div>                    
        <div id="secondDropDownMenu" class="secondDropDownMenu hideComponent">
            <div id="secondDropDownMenuImage" class="secondDropDownMenuImage col-xs-2"></div>
            <div id="secondMenuCoverRight" class="secondMenuCoverRight col-xs-10"></div>
        </div>
        <div id="bodyCover" class="bodyCover"></div>               
        <div id="educacodeSideMenu" class="sideMenu baseColor">               
            <div class="topSideMenuDiv"></div>          
            <div class="firstSideMenu baseColor">
                <a class="menuAnchor" href="index.php">               
                    <span class="iconSize icon fa-home"></span>&nbsp;&nbsp;Educacode                          
                </a>                         
            </div>            
            <div id="codeProjects" class="otherSideMenu">
                <span class="iconSize icon fa-code"></span>&nbsp;&nbsp;Code&nbsp;Projects                           
            </div>
            <div class="otherSideMenu">
                <span class="iconSize icon fa-code"></span>&nbsp;&nbsp;Code&nbsp;Snippets                         
            </div>              
            <div class="otherSideMenu">
                <span class="iconSize icon fa-code"></span>&nbsp;&nbsp;Source&nbsp;Code                         
            </div>                    
            <div class="otherSideMenu">
                <span class="iconSize icon fa-envelope"></span>&nbsp;&nbsp;Suggested&nbsp;Projects                  
            </div>                    
            <div class="otherSideMenu">
                <a class="menuAnchor" href="coder/community.php">
                    <span class="iconSize icon fa-group"></span>&nbsp;&nbsp;Community                      
                </a>
            </div>
            <div class="otherSideMenu">
                <a class="menuAnchor" href="coder/quotation.php">               
                    <span class="iconSize icon fa-handshake-o"></span>&nbsp;&nbsp;Request&nbsp;Quotation                       
                </a>                     
            </div>
            <div class="otherSideMenu">
                <a class="menuAnchor" href="coder/aboutus.php">               
                    <span class="iconSize icon fa-newspaper-o"></span>&nbsp;&nbsp;About&nbsp;Us                           
                </a>                         
            </div>
            <div class="otherSideMenu">
                <span class="iconSize icon fa-umbrella"></span>&nbsp;&nbsp;Support                          
            </div>
        </div>               
        <div id="educacodeTerminalDivision" class="educacodeTerminalDivision hideComponent">
            <div id="batchEditorResult" class="batchEditorResult"></div>
            <textarea id="batchEditorTextarea" class="batchEditorTextarea batchEditorTextareaHeight" shiftheight spellcheck="false">educacode>&nbsp;</textarea>                             
        </div>                                              

        <div id="scrollDiv" class="col-xs-12 theBody whiteBody">                       

    <div class="codingImage">
        <img src="coder/image/01.png" class="codeImageWidth firstCodeImage"/>
        <img src="coder/image/02.png" class="codeImageWidth secondCodeImage"/>
        <img src="coder/image/03.png" class="codeImageWidth thirdCodeImage"/>
        <img src="coder/image/04.png" class="codeImageWidth fourthCodeImage"/>
        <img src="coder/image/05.png" class="codeImageWidth fifthCodeImage"/>
        <img src="coder/image/06.png" class="codeImageWidth sixthCodeImage"/>
        <img src="coder/image/07.png" class="codeImageWidth seventhCodeImage"/>              
    </div>

<div id="sliderDiv" class="sliderDiv">
    
    <script type="text/javascript" src="coder/js/jssor.slider.min.js"></script>
    <!-- use jssor.slider.debug.js instead for debug -->
    <script>
        jssor_1_slider_init = function() {
            
            var jssor_1_SlideshowTransitions = [
              {$Duration:1200,$Opacity:2}
            ];
            
            var jssor_1_options = {
              $AutoPlay: true,
              $SlideshowOptions: {
                $Class: $JssorSlideshowRunner$,
                $Transitions: jssor_1_SlideshowTransitions,
                $TransitionsOrder: 1
              },
              $ArrowNavigatorOptions: {
                $Class: $JssorArrowNavigator$
              },
              $BulletNavigatorOptions: {
                $Class: $JssorBulletNavigator$
              }
            };
            
            var jssor_1_slider = new $JssorSlider$("jssor_1", jssor_1_options);
            
            //responsive code begin
            //you can remove responsive code if you don't want the slider scales while window resizing
            function ScaleSlider() {
                var refSize = jssor_1_slider.$Elmt.parentNode.clientWidth;
                if (refSize) {
                    refSize = Math.min(refSize, 900);
                    jssor_1_slider.$ScaleWidth(refSize);
                }
                else {
                    window.setTimeout(ScaleSlider, 30);
                }
            }
            ScaleSlider();
            $Jssor$.$AddEvent(window, "load", ScaleSlider);
            $Jssor$.$AddEvent(window, "resize", ScaleSlider);
            $Jssor$.$AddEvent(window, "orientationchange", ScaleSlider);
            //responsive code end
        };
    </script>
    <style>
        /* jssor slider bullet navigator skin 05 css */
        /*
        .jssorb05 div           (normal)
        .jssorb05 div:hover     (normal mouseover)
        .jssorb05 .av           (active)
        .jssorb05 .av:hover     (active mouseover)
        .jssorb05 .dn           (mousedown)
        */
        .jssorb05 {
            position: absolute;
        }
        .jssorb05 div, .jssorb05 div:hover, .jssorb05 .av {
            position: absolute;
            /* size of bullet elment */
            width: 16px;
            height: 16px;
            background: url('img/b05.png') no-repeat;
            overflow: hidden;
            cursor: pointer;
        }
        .jssorb05 div { background-position: -7px -7px; }
        .jssorb05 div:hover, .jssorb05 .av:hover { background-position: -37px -7px; }
        .jssorb05 .av { background-position: -67px -7px; }
        .jssorb05 .dn, .jssorb05 .dn:hover { background-position: -97px -7px; }

        /* jssor slider arrow navigator skin 12 css */
        /*
        .jssora12l                  (normal)
        .jssora12r                  (normal)
        .jssora12l:hover            (normal mouseover)
        .jssora12r:hover            (normal mouseover)
        .jssora12l.jssora12ldn      (mousedown)
        .jssora12r.jssora12rdn      (mousedown)
        */
        .jssora12l, .jssora12r {
            display: block;
            position: absolute;
            /* size of arrow element */
            width: 30px;
            height: 46px;
            cursor: pointer;
            background: url('img/a12.png') no-repeat;
            overflow: hidden;
        }
        .jssora12l { background-position: -16px -37px; }
        .jssora12r { background-position: -75px -37px; }
        .jssora12l:hover { background-position: -136px -37px; }
        .jssora12r:hover { background-position: -195px -37px; }
        .jssora12l.jssora12ldn { background-position: -256px -37px; }
        .jssora12r.jssora12rdn { background-position: -315px -37px; }
    </style>
    <div id="jssor_1" style="position: relative; margin: 0 auto; top: 0px; left: 0px; width: 600px; height: 300px; overflow: hidden; visibility: hidden;">
        <!-- Loading Screen -->
        <div data-u="loading" style="position: absolute; top: 0px; left: 0px;">
            <div style="filter: alpha(opacity=70); opacity: 0.7; position: absolute; display: block; top: 0px; left: 0px; width: 100%; height: 100%;"></div>
            <div style="position:absolute;display:block;background:url('img/loading.gif') no-repeat center center;top:0px;left:0px;width:100%;height:100%;"></div>
        </div>
        <div data-u="slides" style="cursor: default; position: relative; top: 0px; left: 0px; width: 600px; height: 300px; overflow: hidden;">
            <div data-p="112.50" style="display: none;">
                <img data-u="image" src="coder/image/11.jpg" />
            </div>
            <div data-p="112.50" style="display: none;">
                <img data-u="image" src="coder/image/12.jpg" />
            </div>
            <div data-p="112.50" style="display: none;">
                <img data-u="image" src="coder/image/13.jpg" />
            </div>
            <div data-p="112.50" style="display: none;">
                <img data-u="image" src="coder/image/14.jpg" />
            </div>
            <div data-p="112.50" style="display: none;">
                <img data-u="image" src="coder/image/15.jpg" />
            </div>
            <div data-p="112.50" style="display: none;">
                <img data-u="image" src="coder/image/16.jpg" />
            </div>
            <div data-p="112.50" style="display: none;">
                <img data-u="image" src="coder/image/17.jpg" />
            </div>
            <a data-u="add" href="http://www.jssor.com" style="display:none">Jssor Slider</a>
        </div>
        <!-- Bullet Navigator -->
        <div data-u="navigator" class="jssorb05" style="bottom:16px;right:16px;" data-autocenter="1">
            <!-- bullet navigator item prototype -->
            <div data-u="prototype" style="width:16px;height:16px;"></div>
        </div>
        <!-- Arrow Navigator -->
        <span data-u="arrowleft" class="jssora12l" style="top:0px;left:0px;width:30px;height:46px;" data-autocenter="2"></span>
        <span data-u="arrowright" class="jssora12r" style="top:0px;right:0px;width:30px;height:46px;" data-autocenter="2"></span>
    </div>
    <script>
        jssor_1_slider_init();                 
    </script>                    

    <div id="sliderCover" class="sliderCover"></div>            
    <div id="sliderCoverNote" class="sliderCoverNote">            
        <div class="nameOverSlide">Educacode</div>&nbsp;With Passion For Technology    
    </div>            
</div>              

<?php 
// session_destroy();
    require_once(realpath(dirname(__FILE__) . "/../Educacode/coderback/floatfooter.php"));                                

?>                                     

    </div>                             

<?php                         

    require_once(realpath(dirname(__FILE__) . "/../Educacode/coderback/includefooter.php"));                  


