function PageDemonDetails() {
	// Call the parent constructor.
	Page.call(this);
}

// Inherit from the parent class.
PageDemonDetails.prototype = new Page();

// Correct the constructor.
PageDemonDetails.prototype.constructor = PageDemonDetails;

/**
 * Return the tab this page belongs to.
 */
PageDemonDetails.prototype.tab = function() {
	return "demon";
}

/**
 * Initialize the page (populate it with static data, hide it).
 */
PageDemonDetails.prototype.initialize = function() {
	// Hide the page data until the page is "loaded".
	$("#demonData").hide();
}

/**
 * Show or load the page.
 * @arg data Page specific data used to populate the page.
 */
PageDemonDetails.prototype.enter = function(data) {
	// Show the page data since the page is being "loaded".
	$("#demonData").show();

	// Fetch the data for the demon.
	var demon = Database.demonByNameEN(data.nameEN);

	// Set the current demon.
	PageDemonDetails.currentDemon = demon.nameEN.toLowerCase();

	// Set the demon name, tribe, and level.
	$("#demonData_name").text(demon.nameEN);
	$("#demonData_tribe").text(Database.translateTribeJP(demon.tribe));
	$("#demonData_level").text(demon.level);

	// Set the demon stats.
	$("#demonData_hp").text(demon.stats.hp);
	$("#demonData_mp").text(demon.stats.mp);
	$("#demonData_str").text(demon.stats.strength);
	$("#demonData_skill").text(demon.stats.skill);
	$("#demonData_magic").text(demon.stats.magic);
	$("#demonData_speed").text(demon.stats.speed);
	$("#demonData_luck").text(demon.stats.luck);

	// Set the demon affinities.
	$("#demonData_physical").html(Renderer.handleAffinity(
		demon.affinity.physical));
	$("#demonData_gun").html(Renderer.handleAffinity(
		demon.affinity.gun));
	$("#demonData_fire").html(Renderer.handleAffinity(
		demon.affinity.fire));
	$("#demonData_ice").html(Renderer.handleAffinity(
		demon.affinity.ice));
	$("#demonData_thunder").html(Renderer.handleAffinity(
		demon.affinity.thunder));
	$("#demonData_shock").html(Renderer.handleAffinity(
		demon.affinity.shock));
	$("#demonData_banish").html(Renderer.handleAffinity(
		demon.affinity.banish));
	$("#demonData_curse").html(Renderer.handleAffinity(
		demon.affinity.curse));
	$("#demonData_bind").html(Renderer.handleAffinity(
		demon.affinity.bind));
	$("#demonData_sleep").html(Renderer.handleAffinity(
		demon.affinity.sleep));
	$("#demonData_cold").html(Renderer.handleAffinity(
		demon.affinity.cold));
	$("#demonData_confusion").html(Renderer.handleAffinity(
		demon.affinity.confusion));
	$("#demonData_poison").html(Renderer.handleAffinity(
		demon.affinity.poison));

	this._addSkills(demon);
	this._addSpecialFusion(demon);
	this._addMutation(demon);
	this._addElementalRanks(demon);
	this._addElementalResult(demon);

	//$("#demonReverse").html(renderReverseList(data));
}

/**
 * Hide or unload the page.
 * @arg data Page specific data used to populate the page.
 */
PageDemonDetails.prototype.leave = function(data) {
	// Show the page data since the page is being "replaced".
	$("#demonData").hide();
}

/**
 * Add the skills to the demon details.
 * @arg data Demon data object for the demon.
 */
PageDemonDetails.prototype._addSkills = function(data) {
	var skillList = $("#demonData_skills").empty();

	$.each(data.skills, function(nameJP, obtainLvl) {
		// Separate the skills in the list.
		if(skillList.children().length)
			skillList.append(" / ");

		// Fetch the data for the skill.
		var skillData = Database.skillByNameJP(nameJP);

		// If the skill is not found, just leave the Japanese name.
		if(skillData === undefined) {
			skillList.append(nameJP);
		} else {
			// Create the skill line with the English name of the skill.
			skillList.append($.create("a").text(skillData.nameEN).addClass(
				"skillLink").click(function() {
					Application.showPage("skill_details", {
						"nameEN": skillData.nameEN
					});
				}));
		}

		// If the skill is learned at a later level, add the level.
		if(obtainLvl > 0)
			skillList.append(" (" + obtainLvl + ")");
	});
}

/**
 * Add the special fusion (if any) to the demon details.
 * @arg data Demon data object for the demon.
 */
PageDemonDetails.prototype._addSpecialFusion = function(data) {
	// If there is a special fusion, add it; otherwise, hide the field.
	if(data.fusions) {
		// Show the field.
		$("#demonData_fusionSection").show();

		// The DOM node we are adding the fusions to.
		var fusions = $("#demonData_fusions").empty();

		// Process the fusion components (should only be the one).
		$.each(data.fusions[0], function(index, component) {
			// Separate the fusion components in the list.
			if(fusions.children().length)
				fusions.append(" x ");

			// Fetch the data for the component.
			var componentData = Database.demonByNameJP(component);

			// If the component was not found in the database,
			// make a blank one.
			if(componentData === undefined) {
				fusions.append($.create("a").text(component));
			} else {
				// Create a link for the component.
				fusions.append($.create("a").text(componentData.nameEN
					).addClass("demonLink").click(function() {
						Application.showPage("demon_details", {
							"nameEN": componentData.nameEN
						});
				}));

				// Add the level for the component.
				fusions.append(" (" + componentData.level + ")");
			}
		});
	} else {
		// Hide the field.
		$("#demonData_fusionSection").hide();
	}
}

/**
 * Add the mutation (if any) to the demon details.
 * @arg data Demon data object for the demon.
 */
PageDemonDetails.prototype._addMutation = function(data) {
	// Empty the mutation field first.
	var field = $("#demonData_mutation").empty();

	if(data.mutate) {
		var mutateTarget = Database.demonByNameJP(data.mutate.target);

		// Create a link if the target demon was found in the database.
		if(mutateTarget === undefined) {
			// Create a dummy info with the Japanese demon name.
			field.text("Into " + data.mutate.target + " at level " +
				data.mutate.level + ".");
		} else {
			// Create a link for the demon.
			field.append("Into ").append($.create("a").text(
				mutateTarget.nameEN).addClass("demonLink").click(function() {
					Application.showPage("demon_details", {
						"nameEN": mutateTarget.nameEN
					});
				})).append(" (" + mutateTarget.level + ")").append(
				" at level " + data.mutate.level + ".");
		}
	}

	// Fetch the reverse mutation data (if any).
	var reverseMutate = Database.reverseDemonMutateJP(data.nameJP);

	// If there is a reverse mutation, add the information.
	if(reverseMutate) {
		// If this demon also mutates into something, add a separator.
		if(field.children().length)
			field.prepend(" ");

		// Fetch the demon data for the source of the mutation.
		var mutateSource = Database.demonByNameJP(reverseMutate.source);

		// Create a link if the source demon was found in the database.
		if(mutateSource === undefined) {
			// Create a dummy info with the Japanese demon name.
			field.prepend("From " + reverseMutate.source + " at level " +
				reverseMutate.level + ".");
		} else {
			// Create a link for the demon.
			field.prepend($.create("span").append("From "
				).append($.create("a").text(mutateSource.nameEN).addClass(
				"demonLink").click(function() {
					Application.showPage("demon_details", {
						"nameEN": mutateSource.nameEN
					});
				})).append(" (" + mutateSource.level + ")").append(
				" at level " + reverseMutate.level + "."));
		}
	}

	if(field.children().length) {
		// Show the mutation field.
		$("#demonData_mutateSection").show();
	} else {
		// Hide the field if there is no mutation.
		$("#demonData_mutateSection").hide();
	}
}

/**
 * Add the elemental rank up/down info to the demon details.
 * @arg data Demon data object for the demon.
 */
PageDemonDetails.prototype._addElementalRanks = function(data) {
	// Fetch the rank information for the tribe.
	var rank = Database.elementalRanksForTribeJP(data.tribe);

	// If the rank information was not found, default to nothing.
	if(rank === undefined)
		rank = "--------";

	// Fill in the rank fields.
	$("#demonData_erthys").text(Renderer.handleRank(rank[0]));
	$("#demonData_aeros").text(Renderer.handleRank(rank[1]));
	$("#demonData_aquans").text(Renderer.handleRank(rank[2]));
	$("#demonData_flaemis").text(Renderer.handleRank(rank[3]));
	$("#demonData_gnome").text(Renderer.handleRank(rank[4]));
	$("#demonData_sylph").text(Renderer.handleRank(rank[5]));
	$("#demonData_undine").text(Renderer.handleRank(rank[6]));
	$("#demonData_salamander").text(Renderer.handleRank(rank[7]));
}

/**
 * Add the elemental result (if two demons from the tribe were fused together)
 * to the demon details.
 * @arg data Demon data object for the demon.
 */
PageDemonDetails.prototype._addElementalResult = function(data) {
	// Fetch the elemental result.
	var elemental = Database.elementalForTribeJP(data.tribe);

	// If the elemental result was found, create a link for it; otherwise,
	// place the word "None" where the result would be.
	if(elemental === undefined) {
		$("#demonData_elementResult").empty().append("None");
	} else {
		$("#demonData_elementResult").empty().append($.create("a").text(
			elemental.nameEN).addClass("demonLink").click(function() {
				Application.showPage("demon_details", {
					"nameEN": elemental.nameEN
				});
			})).append(" (" + elemental.level + ")");
	}
}

// Add the page to the application.
Application.registerPage("demon_details", new PageDemonDetails());
