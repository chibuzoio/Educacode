<?php                     

    require_once("../Educacode/coderback/store.php");                        
    require_once("../Educacode/coderback/utility.php");                        

    Utility::startEducacodeSession();                                                      

	// if (Authentication::isAuthenticated()) {                                        
	$store = new Store();                                        
		    
	$store->setBodyID("");                     
	$store->setPageTitle("Coder");                         

	require_once("../Educacode/coderback/includeheader.php");                                

?>                          

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
	require_once("../Educacode/coderback/floatfooter.php");                                

?>                                     

	</div>                             

<?php                         

	require_once("../Educacode/coderback/includefooter.php");                  

