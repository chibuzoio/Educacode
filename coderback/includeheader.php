<!DOCTYPE html>

<html>
	<head>
		<title><?php print($store->getPageTitle()); ?></title>
		<meta charset="utf-8"/><meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1"/>
		<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
		<link rel="stylesheet" type="text/css" href="coder/css/mycss/style.css">
		<link rel="stylesheet" type="text/css" href="coder/css/mycss/bootstrap.min.css">
		<link rel="stylesheet" type="text/css" href="coder/css/font-awesome.min.css">
		<link rel="stylesheet" type="text/css" href="coder/css/main.css">
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
					<img src="coder/image/01.png" class="menuImage"/>
					<div id="firstImageCover" class="imageCover"></div>           
					<div id="firstMenuTitle" class="menuTitle">Android<br>Projects</div>
				</div>              					 
				<div id="secondMenuCover" class="menuCover absoluteMenu secondSpace">          
			        <img src="coder/image/02.png" class="menuImage"/>
					<div id="secondImageCover" class="imageCover"></div>
					<div id="secondMenuTitle" class="menuTitle">AngularJS<br>Projects</div>
				</div>              					 
				<div id="thirdMenuCover" class="menuCover absoluteMenu thirdSpace">          
			        <img src="coder/image/03.png" class="menuImage"/>
					<div id="thirdImageCover" class="imageCover"></div>
					<div id="thirdMenuTitle" class="menuTitle">C/C++<br>Projects</div>
				</div>              					 
				<div id="fourthMenuCover" class="menuCover absoluteMenu fourthSpace">          
			        <img src="coder/image/04.png" class="menuImage"/>
					<div id="fourthImageCover" class="imageCover"></div>
					<div id="fourthMenuTitle" class="menuTitle">C Sharp<br>Projects</div>
				</div>              					 
				<div id="fifthMenuCover" class="menuCover absoluteMenu fifthSpace">          
			        <img src="coder/image/05.png" class="menuImage"/>
					<div id="fifthImageCover" class="imageCover"></div>
					<div id="fifthMenuTitle" class="menuTitle">Java<br>Projects</div>
				</div>              					 
				<div id="sixthMenuCover" class="menuCover absoluteMenu sixthSpace">          
			        <img src="coder/image/06.png" class="menuImage"/>
					<div id="sixthImageCover" class="imageCover"></div>
					<div id="sixthMenuTitle" class="menuTitle">PHP<br>Projects</div>
				</div>              					 
				<div id="seventhMenuCover" class="menuCover absoluteMenu seventhSpace">          
			        <img src="coder/image/07.png" class="menuImage"/>
					<div id="seventhImageCover" class="imageCover"></div>
					<div id="seventhMenuTitle" class="menuTitle">Qt<br>Projects</div>
				</div>              					
				<div id="eighthMenuCover" class="menuCover absoluteMenu eighthSpace">          
			        <img src="coder/image/08.png" class="menuImage"/>
					<div id="eighthImageCover" class="imageCover"></div>
					<div id="eighthMenuTitle" class="menuTitle">HTML<br>Projects</div>
				</div>              					
				<div id="ninthMenuCover" class="menuCover absoluteMenu ninthSpace">          
			        <img src="coder/image/09.png" class="menuImage"/>
					<div id="ninthImageCover" class="imageCover"></div>
					<div id="ninthMenuTitle" class="menuTitle">Ionic<br>Projects</div>
				</div>              					
				<div id="tenthMenuCover" class="menuCover absoluteMenu tenthSpace">          
			        <img src="coder/image/10.png" class="menuImage"/>
					<div id="tenthImageCover" class="imageCover"></div>
					<div id="tenthMenuTitle" class="menuTitle">Python<br>Projects</div>
				</div>              					 
				<div id="eleventhMenuCover" class="menuCover absoluteMenu eleventhSpace">          
			        <img src="coder/image/11.png" class="menuImage"/>
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


