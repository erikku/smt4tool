function PageCOMP() {
	// Call the parent constructor.
	Page.call(this);
}

// Inherit from the parent class.
PageCOMP.prototype = new Page();

// Correct the constructor.
PageCOMP.prototype.constructor = PageCOMP;

/**
 * Return the tab this page belongs to.
 */
PageCOMP.prototype.tab = function() {
	return "comp";
}

/**
 * Initialize the page (populate it with static data, hide it).
 */
PageCOMP.prototype.initialize = function() {
	// There is nothing to do here.
}

/**
 * Show or load the page.
 * @arg data Page specific data used to populate the page.
 */
PageCOMP.prototype.enter = function(data) {
	// Hide these by default.
	$("#compLevelDialog").hide();
	$("#compSplitDialog").hide();
	$("#compSelectDialog").hide();
	$("#compHistoryDialog").hide();

	// Load the cookie.
	COMP.loadCookie();
}

/**
 * Hide or unload the page.
 * @arg data Page specific data used to populate the page.
 */
PageCOMP.prototype.leave = function(data) {
	// There is nothing to do here.
}

// Add the page to the application.
Application.registerPage("comp", new PageCOMP());
