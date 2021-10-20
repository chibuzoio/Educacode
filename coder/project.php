<?php                     

    require_once("../coderback/store.php");                        
    require_once("../coderback/utility.php");                        

    Utility::startEducacodeSession();                                                         

    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("Project");                         

    require_once("../coderback/includeheader.php");                                

?>                          

<div id="scrollDiv" class="col-xs-12 theBody whiteBody">                       

	<div id="showProjectMetadata" class="showProjectMetadata hideComponent">
		<div class="projectMetadataInternal">
				
			<!-- Project Title -->
			<div class="projectMetadataBody headerColor">
				<div class="projectMetadataHeader">Project Title</div>
				<div id="titleMetadataBody"></div>
			</div>                                         

			<!-- Project Category -->
			<div class="projectMetadataBody headerColor">
				<div class="projectMetadataHeader">Project Category</div>
				<div id="categoryMetadataBody"></div>
			</div>                                   

			<!-- Project Objective -->
			<div class="projectMetadataBody headerColor">
				<div class="projectMetadataHeader">Project Objective</div>
				<div id="objectiveMetadataBody"></div>
			</div>

			<!-- Project Developers -->
			<div class="projectMetadataBody headerColor">
				<div class="projectMetadataHeader">Project Developers</div>
				<div id="developersMetadataBody"></div>
			</div>

			<!-- Programming Languages Used -->
			<div class="projectMetadataBody headerColor">
				<div class="projectMetadataHeader">Programming Languages Used</div>
				<div id="languagesMetadataBody"></div>
			</div>

			<!-- Utility Software Used -->
			<div class="projectMetadataBody headerColor">
				<div class="projectMetadataHeader">Utility Software Used</div>
				<div id="utilitySoftwareMetadataBody"></div>
			</div>

			<!-- Number Of Subtitles -->
			<div class="projectMetadataBody headerColor">
				<div class="projectMetadataHeader">Number Of Subtitles</div>
				<div id="subtitlesMetadataBody"></div>
			</div>

			<!-- Date Modified -->
			<div class="projectMetadataBody headerColor">
				<div class="projectMetadataHeader">Date Modified</div>
				<div id="dateModifiedMetadataBody"></div>
			</div>

			<!-- Third Party Libraries Used -->
			<div class="projectMetadataBody headerColor">
				<div class="projectMetadataHeader">Third Party Libraries Used</div>
				<div id="librariesMetadataBody"></div>
			</div>

		</div>                                              
		<div id="projectMetadataChevronUp" class="projectMetadataChevronUp headerColor icon fa-chevron-up"></div>                                       
	</div>                            
	<div id="hideProjectMetadata" class="hideProjectMetadata">
		<div id="projectSubtitlesAdjuster" title="Collapse All Subtitles" class="projectSubtitlesAdjuster headerColor icon fa-compress"></div>                                       
		<div id="projectRequirementDisplay" title="Open Project Requirements" class="projectRequirementDisplay headerColor icon fa-book"></div>                                                   
		<div id="projectMetadataChevronDown" class="projectMetadataChevronDown headerColor icon fa-chevron-down"></div>                                       
	</div>                                                   
	<div id="projectRequirementSection" class="projectRequirementSection hideComponent">
		<div id="projectRequirementChild" class="projectRequirementChild baseColor"></div>
	</div>
	<div id="projectGeneralComposite" class="projectArticleComposite baseColor">                                     
		<div id="projectTitleHeader" class="projectTitleHeader"></div>                                                 
		<div id="projectGeneralArticle" class="projectGeneralArticle"></div>                                                                 
	</div>                                                                     
	<div id="educacodeEncyclopediaUp" class="educacodeEncyclopedia-up hideComponent">
		<div id="encyclopediaHeaderUp" class="encyclopediaHeader headerColor"><span class="icon fa-book"></span>&nbsp;Educacode Encyclopedia</div>
		<div id="searchEncyclopediaCoverUp" class="searchEncyclopediaCover-up hideComponent">
			<input type="text" id="searchEncyclopediaUp" name="search" placeholder="Search" class="searchEncyclopedia">            
			<span class="searchEncyclopediaIcon icon fa-search"></span>                       
		</div>                             
		<hr class="encyclopediaHeaderDivider">                       
		<div id="encyclopediaChevronHeaderDown" class="encyclopediaChevronHeaderUp headerColor icon fa-chevron-down"></div>  
		<div id="encyclopediaChevronSearchDown" class="encyclopediaChevronSearchDown headerColor hideComponent icon fa-chevron-down"></div>  
		<div id="searchEncyclopediaResultUp" class="searchEncyclopediaResultUp-stretch headerColor hideComponent"></div>                        
		<div id="educacodeEncyclopediaBody" class="educacodeEncyclopediaBody headerColor"></div>
	</div>
	
	<div id="educacodeEncyclopediaDown" class="educacodeEncyclopedia-down">
		<div id="searchEncyclopediaResultDown" class="searchEncyclopediaResultDown-one headerColor hideComponent"></div>                 
		<div id="encyclopediaHeaderDown" class="encyclopediaHeader headerColor "><span class="icon fa-book"></span>&nbsp;Educacode Encyclopedia</div>
		<div id="searchEncyclopediaCoverDown" class="searchEncyclopediaCover-down hideComponent">
			<input type="text" id="searchEncyclopediaDown" name="search" placeholder="Search" class="searchEncyclopedia">            
			<span class="searchEncyclopediaIcon icon fa-search"></span>                       
		</div>                             
		<div id="encyclopediaChevronHeaderUp" class="encyclopediaChevronHeaderDown headerColor icon fa-chevron-up"></div>  
		<div id="encyclopediaChevronSearchUp" class="encyclopediaChevronSearchUp headerColor hideComponent icon fa-chevron-up"></div>                   
	</div>
	
<?php 

    require_once("../coderback/floatfooter.php");                                

?>                                     

    </div>                             

<?php                         

    require_once("../coderback/includefooter.php");                  


