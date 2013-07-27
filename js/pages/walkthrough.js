function PageWalkthrough() {
	// Call the parent constructor.
	Page.call(this);
}

// Inherit from the parent class.
PageWalkthrough.prototype = new Page();

// Correct the constructor.
PageWalkthrough.prototype.constructor = PageWalkthrough;

/**
 * Return the tab this page belongs to.
 */
PageWalkthrough.prototype.tab = function() {
	return "walk";
}

/**
 * Initialize the page (populate it with static data, hide it).
 */
PageWalkthrough.prototype.initialize = function() {
	// There is nothing to do here.
}

/**
 * Show or load the page.
 * @arg data Page specific data used to populate the page.
 */
PageWalkthrough.prototype.enter = function(data) {
	// Empty the walkthrough menu (added to by the page that is loaded).
	$("#walkMenu").empty();

	// Create the page script element.
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "walkthrough/" + data.source + ".js";

	// Load the page script (don't use jQuery or it will try to use AJAX).
	$("#walkthrough")[0].appendChild(s);
}

/**
 * Hide or unload the page.
 * @arg data Page specific data used to populate the page.
 */
PageWalkthrough.prototype.leave = function(data) {
	// There is nothing to do here.
}

// Add the page to the application.
Application.registerPage("walkthrough", new PageWalkthrough());
