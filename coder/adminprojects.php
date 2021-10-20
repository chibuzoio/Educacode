<?php                     

    require_once(realpath(dirname(__FILE__) . "/../coderback/store.php"));                        
    require_once(realpath(dirname(__FILE__) . "/../coderback/utility.php"));                        

    Utility::startEducacodeSession();                                                                       

    $store = new Store();                                        
            
    $store->setBodyID("");                     
    $store->setPageTitle("Project Poster");                         

    require_once(realpath(dirname(__FILE__) . "/../coderback/includeheader.php"));                                

?>                         

    <div id="scrollDiv" class="col-xs-12 theBody whiteBody">                       
	    <div id="adminProjectChoice" class="adminProjectChoice">                               
	        <input type="radio" id="adminDictionary" name="projectType" class="quoteRadio"><label for="adminDictionary" class="adminProjectTypeLabel">Dictionary</label>                          
	        <input type="radio" id="adminProjects" name="projectType" class="quoteRadio"><label for="adminProjects" class="adminProjectTypeLabel">Projects</label>                      
	        <input type="radio" id="adminSnippets" name="projectType" class="quoteRadio"><label for="adminSnippets" class="adminProjectTypeLabel">Snippets</label>                      
	        <input type="radio" id="adminSource" name="projectType" class="quoteRadio"><label for="adminSource" class="adminProjectTypeLabel">Source Code</label>                      
	        <input type="radio" id="batchEditor" name="projectType" class="quoteRadio"><label for="batchEditor" class="adminProjectTypeLabel">Batch Editor</label>                      
	    </div>                          
	    <div id="projectEditorChoice" class="projectEditorChoice hideComponent">                               
	        <input type="radio" id="newProjectRadio" name="projectType" class="quoteRadio"><label for="newProjectRadio" class="adminProjectTypeLabel">Create New Project</label>                      
	        <input type="radio" id="editProjectRadio" name="projectType" class="quoteRadio"><label for="editProjectRadio" class="adminProjectTypeLabel">Edit Existing Project</label>                      
	        <input type="radio" id="newProjectSubtitleRadio" name="projectType" class="quoteRadio"><label for="newProjectSubtitleRadio" class="adminProjectTypeLabel">Add Project Subtitle</label>                      
	        <input type="radio" id="editProjectSubtitleRadio" name="projectType" class="quoteRadio"><label for="editProjectSubtitleRadio" class="adminProjectTypeLabel">Edit Project Subtitle</label>                      
	        <input type="radio" id="newProjectRequirementRadio" name="projectType" class="quoteRadio"><label for="newProjectRequirementRadio" class="adminProjectTypeLabel">Add Project Requirement</label>                      
	        <input type="radio" id="editProjectRequirementRadio" name="projectType" class="quoteRadio"><label for="editProjectRequirementRadio" class="adminProjectTypeLabel">Edit Project Requirement</label>                      
	    </div>                          
	    <div id="batchEditorChoice" class="batchEditorChoice hideComponent">                               
	        <input type="radio" id="batchEditorRadio" name="projectType" class="quoteRadio"><label for="batchEditorRadio" class="adminProjectTypeLabel">Batch Editor Window</label>                      
	        <input type="radio" id="consoleHelperRadio" name="projectType" class="quoteRadio"><label for="consoleHelperRadio" class="adminProjectTypeLabel">Update Console Helper</label>                      
	    </div>                          
		<div id="adminDictionaryDivision" class="adminBasicValue hideComponent">
			<div class="wordInputTitle headerColor">Word</div>
			<input id="wordInput" class="wordInput textInput" type="text">
			<div id="definitionExistsError" class="definitionExistsError hideComponent">Definition Is Already In Dictionary!</div>        
			<div class="wordDefinitionTitle headerColor">Definition</div>
			<textarea id="definitionInput" class="definitionInput headerColor"></textarea>
			<input type="submit" id="submitDefinition" value="Submit Definition" class="submitDefinition" name="">
			<input type="submit" id="loadDictionaryData" value="Load Definitions" class="batchEditorButton">
		</div>                                        
		<div id="adminProjectsDivision" class="adminBasicValue hideComponent">                                 
			<div id="newProjectCreator" class="hideComponent">                          
				<input id="createProjectTitle" class="wordInput textInput" type="text" placeholder="Project Title">			               
				<div class="projectCategoryInput">                            
	        		<select id="createProjectCategory" class="createProjectCategory headerColor">    	                	
	            		<option value="">Project Category</option>
	            		<option value="WEB">Web Application Project</option>
	            		<option value="MOBILE">Mobile Application Project</option>
	            		<option value="DESKTOP">Desktop Application Project</option>
	            		<option value="MICROCONTROLLER">Microcontroller Project</option>
	        		</select>           
				</div>                             
				<div class="projectObjectiveContent headerColor">Project Objective</div>                                            
				<textarea id="createProjectObjective" class="definitionInput headerColor"></textarea>                           
				<div class="projectObjectiveContent headerColor">Project Developers</div>                                            
				<textarea id="createProjectDevelopers" class="definitionInput headerColor"></textarea>                           
				<div class="">
					<div class="distinctProjectObjectiveContent headerColor col-xs-6">Project Languages</div>                                            					
					<div id="projectCreatorNeverCommaSeparate" class="neverCommaSeparate hideComponent col-xs-6">Separate Languages With Spaces Only</div>
				</div>
				<textarea id="createProjectLanguage" class="definitionInput headerColor"></textarea>                           
				<div class="projectObjectiveContent headerColor">Project Libraries</div>                                            
				<textarea id="createProjectLibraries" class="definitionInput headerColor"></textarea>                           
				<div class="projectObjectiveContent headerColor">Utility Tools Used</div>                                            
				<textarea id="createProjectToolsUsed" class="definitionInput headerColor"></textarea>                           
				<input class="input-group" type="file" class="projectImage" id="createProjectImage" accept="image/*"/>                                  
				<div id="projectImageWarning" class="projectImageWarning hideComponent">Who Do You Expect To Load The Image For You???</div>                                  
				<input type="submit" id="createProjectButton" value="Submit Project" class="submitDefinition" name="">                            
			</div>                                
			<div id="existingProjectEditor" class="hideComponent">                     
				<input id="editProjectTitle" class="wordInput textInput" type="text" placeholder="Project Title">			               
				<div class="projectCategoryInput">                            
	        		<select id="editProjectCategory" class="createProjectCategory headerColor">    	                	
	            		<option value="">Project Category</option>
	            		<option value="WEB">Web Application Project</option>
	            		<option value="MOBILE">Mobile Application Project</option>
	            		<option value="DESKTOP">Desktop Application Project</option>
	            		<option value="MICROCONTROLLER">Microcontroller Project</option>
	        		</select>           
				</div>                             
				<div class="projectObjectiveContent headerColor">Project Objective</div>                                            
				<textarea id="editProjectObjective" class="definitionInput headerColor"></textarea>                           
				<div class="projectObjectiveContent headerColor">Project Developers</div>                                            
				<textarea id="editProjectDevelopers" class="definitionInput headerColor"></textarea>                           
				<div class="">
					<div class="distinctProjectObjectiveContent headerColor col-xs-6">Project Languages</div>                                            					
					<div id="projectEditorNeverCommaSeparate" class="neverCommaSeparate hideComponent col-xs-6">Separate Languages With Spaces Only</div>
				</div>
				<textarea id="editProjectLanguage" class="definitionInput headerColor"></textarea>                           
				<div class="projectObjectiveContent headerColor">Project Libraries</div>                                            
				<textarea id="editProjectLibraries" class="definitionInput headerColor"></textarea>                           
				<div class="projectObjectiveContent headerColor">Utility Tools Used</div>                                            
				<textarea id="editProjectToolsUsed" class="definitionInput headerColor"></textarea>                           
				<input type="submit" id="editProjectButton" value="Submit Project" class="submitDefinition" name="">                            
			</div>                     
			<div id="addProjectSubtitleEditor" class="hideComponent">                          
				<input id="parentProjectTitleForSubtitle" class="wordInput textInput" type="text" placeholder="Project Title">			                                 
				<div id="existingProjectDropdown" class="existingProjectDropdown-stretch headerColor hideComponent"></div>
				<input type="text" id="addProjectSubtitle" class="addProjectSubtitle wordInput textInput" placeholder="Project Subtitle">                            
				<div class="marginProjectSubtitleBody">                  
					<div class="projectSubtitleBodyHeader col-xs-6 headerColor">Project Subtitle Body</div>                                            
					<div class="col-xs-6 insertHTMLComponent">                                      
						<div id="subtitleWarningFlag" class="subtitleWarningFlag hideComponent">Remember&nbsp;Paragraph!!!</div>                                             
						<input type="submit" id="insertSubtitleParagraph" value="Paragraph" class="padHTMLInsertButton">                                                                   
						<input type="submit" id="insertSubtitleCode" value="Code" class="padHTMLInsertButton">                               
					</div>                                        
					<textarea id="addProjectSubtitleBody" class="addProjectSubtitleBody-blur headerColor"></textarea>                           
				</div>
				<input type="submit" id="addProjectSubtitleButton" value="Submit Project Article" class="submitDefinition" name="">                            				
			</div>                     
			<div id="editProjectSubtitleEditor" class="hideComponent">                     
				
			</div>                                 
			<div id="addProjectRequirementEditor" class="hideComponent">                          
				<input id="parentProjectTitleForRequirement" class="wordInput textInput" type="text" placeholder="Project Title">			                                 
				<div id="existingProjectDropdownForRequirement" class="existingProjectDropdown-stretch headerColor hideComponent"></div>
				<input type="text" id="addProjectRequirementTitle" class="addProjectSubtitle wordInput textInput" placeholder="Project Requirement Title">                            
				<div class="marginProjectSubtitleBody">                  
					<div class="projectRequirementBodyHeader headerColor">Project Requirement Body</div>                                                                         
					<textarea id="addProjectRequirementBody" class="addProjectSubtitleBody-blur headerColor"></textarea>                                                                  
				</div>
				<input type="submit" id="addProjectRequirementButton" value="Submit Project Requirement" class="submitDefinition" name="">                            				                                   
			</div>                     
			<div id="editProjectRequirementEditor" class="hideComponent">                     
				
			</div>                                                                 
		</div>                                               
		<div id="adminSnippetsDivision" class="adminBasicValue hideComponent">
			<div class="wordInputTitle headerColor">Snippet Title</div>
			<input id="snippetTitle" class="wordInput textInput" type="text">
			<!-- <div id="definitionExistsError" class="definitionExistsError hideComponent">Definition Is Already In Dictionary!</div>         -->
			<div class="wordDefinitionTitle headerColor">Snippet Body</div>
			<textarea id="snippetBody" class="definitionInput headerColor"></textarea>
			<input type="submit" id="submitSnippet" value="Submit Snippet" class="submitDefinition" name="">
		</div>
		<div id="adminSourceDivision" class="adminBasicValue hideComponent">
			<div class="wordInputTitle headerColor">Source Code Title</div>
			<input id="soureCodeTitle" class="wordInput textInput" type="text">
			<!-- <div id="definitionExistsError" class="definitionExistsError hideComponent">Definition Is Already In Dictionary!</div>         -->
			<div class="wordDefinitionTitle headerColor">Source Code Body</div>
			<textarea id="soureCodeBody" class="definitionInput headerColor"></textarea>
			<input type="submit" id="submitSourceCode" value="Submit Source Code" class="submitDefinition" name="">
		</div>
		<div id="consoleHelperDivision" class="adminBasicValue hideComponent">
			<div class="wordInputTitle headerColor">Console Helper Title</div>
			<input id="consoleHelperTitle" class="wordInput textInput" type="text">
			<div id="helperExistsError" class="definitionExistsError hideComponent">Console Helper Already Exists!</div>        
			<div class="wordDefinitionTitle headerColor">Console Helper Body</div>
			<textarea id="consoleHelperBody" class="definitionInput headerColor"></textarea>
			<input type="submit" id="submitConsoleHelper" value="Submit Console Help" class="submitDefinition" name="">
		</div>
		<!-- <div id="batchEditorDivision" class="batchEditorCover hideComponent">                                  
			<div class="wordInputTitle headerColor">Batch Editor</div>                     
			<div id="batchEditorDivisionBody" class="batchEditorDivision">
				<div id="batchEditorResult" class="batchEditorResult"></div>
				<textarea id="batchEditorTextarea" class="batchEditorTextarea batchEditorTextareaHeight" shiftheight spellcheck="false">educacode>&nbsp;</textarea>                             
			</div>
		</div> -->

<?php 

    require_once(realpath(dirname(__FILE__) . "/../coderback/floatfooter.php"));                                

?>                                     

    </div>                             

<?php                         

    require_once(realpath(dirname(__FILE__) . "/../coderback/includefooter.php"));                  


