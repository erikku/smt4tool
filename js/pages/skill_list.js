function PageSkillList() {
	// Call the parent constructor.
	Page.call(this);
}

// Inherit from the parent class.
PageSkillList.prototype = new Page();

// Correct the constructor.
PageSkillList.prototype.constructor = PageSkillList;

/**
 * Return the tab this page belongs to.
 */
PageSkillList.prototype.tab = function() {
	return "skill";
}

/**
 * Initialize the page (populate it with static data, hide it).
 */
PageSkillList.prototype.initialize = function() {
	// Hide the page data until the page is "loaded".
	$("#skillList").hide();
	$("#showAllSkillsBtn").show();

	// Populate the list with the buttons.
	$("#skillList").html(skillList);
}

/**
 * Show or load the page.
 * @arg data Page specific data used to populate the page.
 */
PageSkillList.prototype.enter = function(data) {
	// Show the page data since the page is being "loaded".
	$("#skillList").show();
	$("#showAllSkillsBtn").hide();

	// Create the table header.
	var skillList = this._tableHeader();

	// Copy this.
	var obj = this;

	// Add each skill to the table.
	$.each(Database.allSkillsByName(), function(index, data) {
		skillList.append(obj._tableEntry(data));
	});

	// Create the table footer.
	skillList.append(this._tableFooter());

	// Add the data to the div.
	$("#skillList").empty().append(skillList);
}

/**
 * Hide or unload the page.
 * @arg data Page specific data used to populate the page.
 */
PageSkillList.prototype.leave = function(data) {
	// Show the page data since the page is being "replaced".
	$("#skillList").hide();
	$("#showAllSkillsBtn").show();
}

/**
 * The beginning of the table.
 * @returns HTML for the beginning of the table.
 */
PageSkillList.prototype._tableHeader = function() {
	var table = $.create("table");

	// Create each table header: <th><a>{name}</a></th>
	$.each(["Name", "MP", "Type", "Effect"], function(index, name) {
		table.append($.create("th").append($.create("a").text(name)));
	});

	return table;
}

/**
 * A skill entry in the table.
 * @returns HTML for a skill entry in the table.
 */
PageSkillList.prototype._tableEntry = function(data) {
	var row = $.create("tr");

	// Skill name (with link to the details page).
	row.append($.create("td").append($.create("a").text(data.nameEN
		).addClass("skillLink").click(function() {
			Application.showPage("skill_details", { "nameEN": data.nameEN });
	})));

	// Details for the skill.
	row.append($.create("td").text(data.cost < 0 ? "-" : data.cost));
	row.append($.create("td").text(data.attribute));
	row.append($.create("td").text(data.effect));

	return row;
}

/**
 * The end of the table.
 * @returns HTML for the end of the table.
 */
PageSkillList.prototype._tableFooter = function() {
	return undefined;
}

// Add the page to the application.
Application.registerPage("skill_list", new PageSkillList());
