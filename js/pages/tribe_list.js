/**
 * Page constructor. Don't expect to see anything here.
 */
function PageTribeList() {
	// Call the parent constructor.
	Page.call(this);
}

// Inherit from the parent class.
PageTribeList.prototype = new Page();

// Correct the constructor.
PageTribeList.prototype.constructor = PageTribeList;

/**
 * Return the tab this page belongs to.
 */
PageTribeList.prototype.tab = function() {
	return "demon";
}

/**
 * Initialize the page (populate it with static data, hide it).
 */
PageTribeList.prototype.initialize = function() {
	// Hide the page data until the page is "loaded".
	$("#tribeList").hide();
	$("#tribeListBtn").show();

	// Create a button for each tribe.
	$.each(Database.mTribeByNameEN, function(name, data) {
		$("#tribeList").append(
			$.create("a").click(function() {
				Application.showPage("demon_list", {
					"filter": "tribe",
					"tribe": data.nameJP
				});
			}).addClass("button_up").text(data.nameEN)
		);
	});
}

/**
 * Show or load the page.
 * @arg data Page specific data used to populate the page.
 */
PageTribeList.prototype.enter = function(data) {
	// Show the page data since the page is being "loaded".
	$("#tribeList").show();
	$("#tribeListBtn").hide();
}

/**
 * Hide or unload the page.
 * @arg data Page specific data used to populate the page.
 */
PageTribeList.prototype.leave = function(data) {
	// Show the page data since the page is being "replaced".
	$("#tribeList").hide();
	$("#tribeListBtn").show();
}

// Add the page to the application.
Application.registerPage("tribe_list", new PageTribeList());
