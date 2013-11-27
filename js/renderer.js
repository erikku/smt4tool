/**
 * Renderer object constructor.
 */
function RendererImpl() {
	//
	// Private Variables
	//

	// Mapping of English names to tribe data.
	this.mTribeByNameEN = { };

	// Mapping of Japanese names to tribe data.
	this.mTribeByNameJP = { };

	// Array of English tribe names.
	this.mTribeNamesEN = [ ];

	// Mapping of English names to demon data.
	this.mDemonByNameEN = { };

	// Mapping of Japanese names to demon data.
	this.mDemonByNameJP = { };

	// Array of English demon names.
	this.mDemonNamesEN = [ ];

	// Mapping of skills to an array of demons who know/learn the skill.
	this.mDemonSkillMapping = { };

	// Mapping of tribes to an array of demons who are part of the tribe.
	this.mDemonTribeMapping = { };

	// Mapping of English names to skill data.
	this.mSkillByNameEN = { };

	// Mapping of Japanese names to skill data.
	this.mSkillByNameJP = { };

	// Array of English skill names.
	this.mSkillNamesEN = [ ];

	// Mapping of English names to app data.
	this.mAppByNameEN = { };

	// Array of English app names.
	this.mAppNamesEN = [ ];
}

//
// Public Methods
//

/**
 * Convert the affinity value to HTML.
 * @arg affinity The value to convert.
 * @returns The equivalent HTML.
 */
RendererImpl.prototype.handleAffinity = function(affinity) {
	// Convert the affinity to colored text with the proper translation.
	if(affinity == "null")
		return $.create("a").addClass("affinityNull").text("Null");
	else if(affinity == "weak")
		return $.create("a").addClass("affinityWeak").text("Weak");
	else if(affinity == "protect")
		return $.create("a").addClass("affinityProtect").text("Resist");
	else if(affinity == "reflect")
		return $.create("a").addClass("affinityReflect").text("Repel");
	else if(affinity == "absorb")
		return $.create("a").addClass("affinityDrain").text("Drain");
	else
		return $.create("a").addClass("affinityNormal").text("N/A");
}

/**
 * Convert the elemental rank data to text.
 * @arg rank Elemental rank data (one of u, d, -).
 * @returns The equivalent text.
 */
RendererImpl.prototype.handleRank = function(rank) {
	if(rank == "u")
		return "Up";
	else if(rank == "d")
		return "Down";
	else
		return "-";
}

/**
 * Convert the requirement to HTML.
 * @arg affinity The value to convert.
 * @returns The equivalent HTML.
 */
RendererImpl.prototype.handleRequirements = function(reqList) {
	var html = $.create("span");

	// Add each requirement.
	$.each(reqList, function(index, req) {
		// Separate the requirements.
		if(html.children().length)
			html.append(", ");

		// If the requirement is an app, create a link.
		if(req.length > 4 && req.substring(0, 4) == "app:") {
			var name = req.substring(4);

			html.append($.create("a").addClass("appLink").click(function() {
				Application.showPage("app_details", { "name": name });
			}).text(name));
		} else {
			// Normal text requirement.
			html.append(req);
		}
	});

	return html;
}

/**
 * Convert the COMP demon to HTML.
 * @arg inded Index in the COMP list for the demon (for actions on the demon).
 * @arg demon The COMP data for the demon to convert.
 * @returns The equivalent HTML.
 */
RendererImpl.prototype.handleCOMPEntry = function(index, demon) {
	// Fetch the demon's data from the database.
	var baseDemon = Database.demonByNameEN(demon.nameEN);

	// Create the entry div element.
	var entry = $.create("div").addClass("compEntry");

	// Add the name and level to the entry.
	entry.append($.create("a").addClass("section").attr(
		"id", "compLevelInfo").text(demon.level)).append("&nbsp;&nbsp;"
		).append($.demonLink(demon.nameEN));

	// Add the skills to the entry.
	entry.append(" (").eachJoin(demon.skills, ", ",
		function(skillIndex, skill) {
			return $.skillLink(skill);
	}).append(")").append($.create("br"));

	// Add the dismiss and level buttons.
	entry.append($.create("a").addClass("button_up").attr("id",
		"compDismissBtn").text("Dismiss").click(function() {
			COMP.dismiss(index);
	}));
	entry.append($.create("a").addClass("button_up").attr("id",
		"compLevelBtn").text("Level").click(function() {
			COMP.level(index);
	}));

	// Add the split button if the demon can be reverse fused/split.
	if(COMP.canReverse(baseDemon)) {
		entry.append($.create("a").addClass("button_up").attr("id",
			"compSplitBtn").text("Split").click(function() {
				COMP.split(index);
		}));
	}

	// If there demon can be mutated, add the button.
	if(baseDemon.mutate) {
		entry.append($.create("a").addClass("button_up").attr("id",
			"compMutateBtn").text("Evolve").click(function() {
				COMP.mutate(index);
		}));
	}

	// If the demon has a history, add the button.
	if(demon.parents && demon["parents"].length) {
		entry.append($.create("a").addClass("button_up").attr("id",
			"compHistoryBtn").text("History").click(function() {
				COMP.mutate(index);
		}));
	}

	return entry;
}

// Singleton for the renderer.
var Renderer = new RendererImpl();
