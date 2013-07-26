function PageDemonList() {
	// Call the parent constructor.
	Page.call(this);
}

// Inherit from the parent class.
PageDemonList.prototype = new Page();

// Correct the constructor.
PageDemonList.prototype.constructor = PageDemonList;

/**
 * Return the tab this page belongs to.
 */
PageDemonList.prototype.tab = function() {
	return "demon";
}

/**
 * Initialize the page (populate it with static data, hide it).
 */
PageDemonList.prototype.initialize = function() {
	// Hide the page data until the page is "loaded".
	$("#demonList").hide();
	$("#showAllDemonsBtn").show();

	// Populate the list with the buttons.
	$("#demonList").html(demonList);
}

/**
 * Show or load the page.
 * @arg data Page specific data used to populate the page.
 */
PageDemonList.prototype.enter = function(data) {
	// Show the page data since the page is being "loaded".
	$("#demonList").show();

	// Create the table header.
	var demonList = this._tableHeader();

	// Copy this.
	var obj = this;

	if(data.filter == "tribe") {
		// Add each demon to the table.
		$.each(Database.tribeDemonsByLevel(data.tribe), function(index, data) {
			demonList.append(obj._tableEntry(data));
		});
	} else if(data.filter == "affinity") {
		// Add each demon to the table.
		$.each(Database.affinityDemonsByLevel(data.a, data.b),
			function(index, data) {
				demonList.append(obj._tableEntry(data));
		});
	} else { // Show all demons.
		// Add each demon to the table.
		$.each(Database.allDemonsByLevel(), function(index, data) {
			demonList.append(obj._tableEntry(data));
		});

		$("#showAllDemonsBtn").hide();
	}

	// Create the table footer.
	demonList.append(this._tableFooter());

	// Add the data to the div.
	$("#demonList").empty().append(demonList);
}

/**
 * Hide or unload the page.
 * @arg data Page specific data used to populate the page.
 */
PageDemonList.prototype.leave = function(data) {
	// Show the page data since the page is being "replaced".
	$("#demonList").hide();

	if(data.filter == "tribe") {
		// Nothing special to do.
	} else if(data.filter == "affinity") {
		// Nothing special to do.
	} else { // Show all demons.
		$("#showAllDemonsBtn").show();
	}
}

/**
 * The beginning of the table.
 * @returns HTML for the beginning of the table.
 */
PageDemonList.tableHeader = function() {
	var table = $.create("table");

	// Create each table header: <th><a>{name}</a></th>
	$.each(["Lv", "Name", "HP", "MP", "St", "Dx", "Ma", "Ag", "Lu",
		"Phys", "Gun", "Fire", "Ice", "Elec", "Force", "Light", "Dark"],
		function(index, name) {
			table.append($.create("th").append($.create("a").text(name)));
	});

	return table;
}

/**
 * A demon entry in the table.
 * @returns HTML for a demon entry in the table.
 */
PageDemonList.tableEntry = function(data, targetLevel) {
	var row = $.create("tr");

	// If a target level was defined (for skills that require leveling),
	// and it is above the base level of the demon, show it.
	if(targetLevel !== undefined && targetLevel > data.level) {
		row.append($.create("td").text(data.level + "=>" + targetLevel));
	} else {
		row.append($.create("td").text(data.level));
	}

	// Demon name (with link to the details page).
	row.append($.create("td").append($.create("a").text(data.nameEN
		).addClass("demonLink").click(function() {
			Application.showPage("demon_details", { "nameEN": data.nameEN });
	})));

	// Stats.
	row.append($.create("td").text(data.stats.hp));
	row.append($.create("td").text(data.stats.mp));
	row.append($.create("td").text(data.stats.strength));
	row.append($.create("td").text(data.stats.skill));
	row.append($.create("td").text(data.stats.magic));
	row.append($.create("td").text(data.stats.speed));
	row.append($.create("td").text(data.stats.luck));

	// Affinities.
	row.append($.create("td").append(Renderer.handleAffinity(
		data.affinity.physical)));
	row.append($.create("td").append(Renderer.handleAffinity(
		data.affinity.gun)));
	row.append($.create("td").append(Renderer.handleAffinity(
		data.affinity.fire)));
	row.append($.create("td").append(Renderer.handleAffinity(
		data.affinity.ice)));
	row.append($.create("td").append(Renderer.handleAffinity(
		data.affinity.thunder)));
	row.append($.create("td").append(Renderer.handleAffinity(
		data.affinity.shock)));
	row.append($.create("td").append(Renderer.handleAffinity(
		data.affinity.banish)));
	row.append($.create("td").append(Renderer.handleAffinity(
		data.affinity.curse)));

	return row;
}

/**
 * The end of the table.
 * @returns HTML for the end of the table.
 */
PageDemonList.tableFooter = function() {
	return undefined;
}

// Make private copies of these.
PageDemonList.prototype._tableHeader = PageDemonList.tableHeader;
PageDemonList.prototype._tableEntry = PageDemonList.tableEntry;
PageDemonList.prototype._tableFooter = PageDemonList.tableFooter;

// Add the page to the application.
Application.registerPage("demon_list", new PageDemonList());
