function PageAppList() {
	// Call the parent constructor.
	Page.call(this);
}

// Inherit from the parent class.
PageAppList.prototype = new Page();

// Correct the constructor.
PageAppList.prototype.constructor = PageAppList;

/**
 * Return the tab this page belongs to.
 */
PageAppList.prototype.tab = function() {
	return "app";
}

/**
 * Initialize the page (populate it with static data, hide it).
 */
PageAppList.prototype.initialize = function() {
	// Hide the page data until the page is "loaded".
	$("#appList").hide();
	$("#showAllAppsBtn").show();

	// Populate the list with the buttons.
	$("#appList").html(appList);
}

/**
 * Show or load the page.
 * @arg data Page specific data used to populate the page.
 */
PageAppList.prototype.enter = function(data) {
	// Show the page data since the page is being "loaded".
	$("#appList").show();
	$("#showAllAppsBtn").hide();

	// Create the table header.
	var appList = this._tableHeader();

	// Copy this.
	var obj = this;

	// Add each app to the table.
	$.each(Database.allAppsByName(), function(index, data) {
		appList.append(obj._tableEntry(data));
	});

	// Create the table footer.
	appList.append(this._tableFooter());

	// Add the data to the div.
	$("#appList").empty().append(appList);
}

/**
 * Hide or unload the page.
 * @arg data Page specific data used to populate the page.
 */
PageAppList.prototype.leave = function(data) {
	// Show the page data since the page is being "replaced".
	$("#appList").hide();
	$("#showAllAppsBtn").show();
}

/**
 * The beginning of the table.
 * @returns HTML for the beginning of the table.
 */
PageAppList.prototype._tableHeader = function() {
	var table = $.create("table");

	// Create each table header: <th><a>{name}</a></th>
	$.each(["Name", "Points", "Requirements", "Description"],
		function(index, name) {
			table.append($.create("th").append($.create("a").text(name)));
	});

	return table;
}

/**
 * A app entry in the table.
 * @returns HTML for a app entry in the table.
 */
PageAppList.prototype._tableEntry = function(data) {
	var row = $.create("tr");

	// App name (with link to the details page).
	row.append($.create("td").append($.create("a").text(data.name
		).addClass("appLink").click(function() {
			Application.showPage("app_details", { "name": data.name });
	})));

	// Details for the app.
	row.append($.create("td").text(data.points));
	row.append($.create("td").append(Renderer.handleRequirements(data.req)));
	row.append($.create("td").text(data.desc));

	return row;
}

/**
 * The end of the table.
 * @returns HTML for the end of the table.
 */
PageAppList.prototype._tableFooter = function() {
	return undefined;
}

// Add the page to the application.
Application.registerPage("app_list", new PageAppList());
