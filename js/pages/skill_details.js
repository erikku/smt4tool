function PageSkillDetails() {
	// Call the parent constructor.
	Page.call(this);
}

// Inherit from the parent class.
PageSkillDetails.prototype = new Page();

// Correct the constructor.
PageSkillDetails.prototype.constructor = PageSkillDetails;

/**
 * Return the tab this page belongs to.
 */
PageSkillDetails.prototype.tab = function() {
	return "skill";
}

/**
 * Initialize the page (populate it with static data, hide it).
 */
PageSkillDetails.prototype.initialize = function() {
	// Hide the page data until the page is "loaded".
	$("#skillData").hide();
}

/**
 * Show or load the page.
 * @arg data Page specific data used to populate the page.
 */
PageSkillDetails.prototype.enter = function(data) {
	// Show the page data since the page is being "loaded".
	$("#skillData").show();

	// Fetch the data for the skill.
	var skill = Database.skillByNameEN(data.nameEN);

	// Set the current skill.
	PageSkillDetails.currentSkill = skill.nameEN.toLowerCase();

	// Set the skill data.
	$("#skillData_name").text(skill.nameEN);
	$("#skillData_attribute").text(skill.attribute);
	$("#skillData_cost").text(skill.cost);
	$("#skillData_power").text(skill.power);
	$("#skillData_hits").text(skill.hits);
	$("#skillData_hit").text(skill.hit);
	$("#skillData_kuli").text(skill.kuli);
	$("#skillData_target").text(skill.target);
	$("#skillData_strengthen").text(skill.strengthen <= 0 ?
		"-" : skill.strengthen);
	$("#skillData_effect").text(skill.effect);

	// Display the notes if there is any.
	if(skill.notes && skill.notes.length > 1) {
		$("#skillData_notes").text(skill.notes);
		$("#skillData_notesRow").show();
	} else {
		$("#skillData_notesRow").hide();
	}

	this._addDemons(skill);
}

/**
 * Hide or unload the page.
 * @arg data Page specific data used to populate the page.
 */
PageSkillDetails.prototype.leave = function(data) {
	// Show the page data since the page is being "replaced".
	$("#skillData").hide();
}

/**
 * Add the list of demons who have this skill.
 * @arg data Skill data object for the skill.
 */
PageSkillDetails.prototype._addDemons = function(data) {
	// Fetch the list of demon objects.
	var demons = Database.demonSkillMappingJP(data.nameJP);

	// If there is demons, show the list.
	if(demons.length > 0) {
		// Create the table.
		var demonList = PageDemonList.tableHeader();

		// Add each demon to the table.
		$.each(demons, function(index, demon) {
			demonList.append(PageDemonList.tableEntry(demon,
				demon.skills[data.nameJP]));
		});

		// Add the footer.
		demonList.append(PageDemonList.tableFooter());

		// Show the list.
		$("#withSkillSection").show();
		$("#demonMatchList").show().empty().append(demonList);
	} else {
		// Hide the list (it's empty).
		$("#withSkillSection").hide();
		$("#demonMatchList").hide();
	}
}

// Add the page to the application.
Application.registerPage("skill_details", new PageSkillDetails());
