function PageSelectAffinity() {
	// Call the parent constructor.
	Page.call(this);
}

// Inherit from the parent class.
PageSelectAffinity.prototype = new Page();

// Correct the constructor.
PageSelectAffinity.prototype.constructor = PageSelectAffinity;

/**
 * Return the tab this page belongs to.
 */
PageSelectAffinity.prototype.tab = function() {
	return "demon";
}

/**
 * Initialize the page (populate it with static data, hide it).
 */
PageSelectAffinity.prototype.initialize = function() {
	// Hide the page data until the page is "loaded".
	$("#affinityFilter").hide();
	$("#affinityFilterBtn").show();

	// Create the action for the find button.
	$("#affinityFindBtn").click(function() {
		// Display the page for the list of demons.
		Application.showPage("demon_list", {
			"filter": "affinity",
			"a": $("#affinitySelectA").val(),
			"b": $("#affinitySelectB").val()
		})
	});
}

/**
 * Show or load the page.
 * @arg data Page specific data used to populate the page.
 */
PageSelectAffinity.prototype.enter = function(data) {
	// Show the page data since the page is being "loaded".
	$("#affinityFilter").show();
	$("#affinityFilterBtn").hide();

	// Load the state if it exists.
	if(data.a && data.b) {
		$("#affinitySelectA").val(data.a);
		$("#affinitySelectB").val(data.b);
	} else {
		$("#affinitySelectA").val("physical");
		$("#affinitySelectB").val("n/a");
	}
}

/**
 * Hide or unload the page.
 * @arg data Page specific data used to populate the page.
 */
PageSelectAffinity.prototype.leave = function(data) {
	// Show the page data since the page is being "replaced".
	$("#affinityFilter").hide();
	$("#affinityFilterBtn").show();

	// Save the state.
	data.a = $("#affinitySelectA").val();
	data.b = $("#affinitySelectB").val();
}

// Add the page to the application.
Application.registerPage("select_affinity", new PageSelectAffinity());
