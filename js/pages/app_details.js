function PageAppDetails() {
	// Call the parent constructor.
	Page.call(this);
}

// Inherit from the parent class.
PageAppDetails.prototype = new Page();

// Correct the constructor.
PageAppDetails.prototype.constructor = PageAppDetails;

/**
 * Return the tab this page belongs to.
 */
PageAppDetails.prototype.tab = function() {
	return "app";
}

/**
 * Initialize the page (populate it with static data, hide it).
 */
PageAppDetails.prototype.initialize = function() {
	// Hide the page data until the page is "loaded".
	$("#appData").hide();
}

/**
 * Show or load the page.
 * @arg data Page specific data used to populate the page.
 */
PageAppDetails.prototype.enter = function(data) {
	// Show the page data since the page is being "loaded".
	$("#appData").show();

	// Fetch the data for the app.
	var app = Database.appByNameEN(data.name);

	// Set the current app.
	PageAppDetails.currentApp = app.name.toLowerCase();

	// Set the app data.
	$("#appData_name").text(app.name);
	$("#appData_points").text(app.points);
	$("#appData_req").html(Renderer.handleRequirements(app.req));
	$("#appData_desc").text(app.desc);

	// Display the notes if there is any.
	if(app.notes && app.notes.length > 1) {
		$("#appData_notes").text(data.notes);
		$("#appData_notesRow").show();
	} else {
		$("#appData_notesRow").hide();
	}
}

/**
 * Hide or unload the page.
 * @arg data Page specific data used to populate the page.
 */
PageAppDetails.prototype.leave = function(data) {
	// Show the page data since the page is being "replaced".
	$("#appData").hide();
}

// Add the page to the application.
Application.registerPage("app_details", new PageAppDetails());
