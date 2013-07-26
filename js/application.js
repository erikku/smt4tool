/**
 * Application object constructor.
 */
function ApplicationImpl() {
	//
	// Private Variables
	//

	// Array containing the page history.
	this.mHistory = [ ];

	// Current position in the page history.
	this.mHistoryPos = -1;

	// Mapping containing the page objects.
	this.mPages = { };

	// Current page (index into mHistory).
	this.mCurrentPage = "welcome";

	// Array of main app tabs.
	this.mTabs = [ ];

	// Mapping of the active history index for the associated tab.
	this.mActiveTabHistory = { };

	// Current tab.
	this.mCurrentTab = "welcome";

	// Default pages.
	this.mDefaultPages = {
		"demon": { "page": "tribe_list", "data": undefined },
		"skill": { "page": "skill_list", "data": undefined },
		"app": { "page": "app_list", "data": undefined },
	};
}

//
// Public Methods
//

/**
 * Initialize the application (called once on page load).
 */
ApplicationImpl.prototype.initialize = function() {
	// Set jquery.cookie to use JSON.
	$.cookie.json = true;

	// Register the tabs.
	$.each([ "demon", "skill", "app", "walk", "comp" ], function(index, tab) {
		Application.registerTab(tab);
	});

	// Hide the navigation buttons until they are needed.
	$("#backButton").hide();
	$("#forwardButton").hide();

	// Initialize all the pages.
	$.each(this.mPages, function(name, obj) {
		obj.initialize();
	});

	//fusionChartCheck();
	//$('#reverseChartTest').text(JSON.stringify(reverseChart));
	//$('#reverseChartTest').html(renderReverseChart());
	//generateReverseCache();

	// Hide these by default.
	$("#compSplitDialog").hide();
	$("#compHistoryDialog").hide();

	// Create the autocomplete for the demon search.
	$("#demonSearch").autocomplete({
		source: Database.mDemonNamesEN,
		select: function(e, ui) {
			var name = ui.item.value.toLowerCase();

			if(PageDemonDetails.currentDemon != name &&
				Database.demonExistsEN(name)) {
					Application.showPage("demon_details", { "nameEN": name });
			}
		}
	});

	// Create the action when you type into the demon search.
	$("#demonSearch").keyup(function(e){
		var name = $("#demonSearch").val().toLowerCase();

		if(PageDemonDetails.currentDemon != name &&
			Database.demonExistsEN(name)) {
				Application.showPage("demon_details", { "nameEN": name });
		}
	})

	// Create the autocomplete for the skill search.
	$("#skillSearch").autocomplete({
		source: Database.mSkillNamesEN,
		select: function(e, ui) {
			var name = ui.item.value.toLowerCase();

			if(PageSkillDetails.currentSkill != name &&
				Database.skillExistsEN(name)) {
					Application.showPage("skill_details", { "nameEN": name });
			}
		}
	});

	// Create the action when you type into the skill search.
	$("#skillSearch").keyup(function(e){
		var name = $("#skillSearch").val().toLowerCase();

		if(PageSkillDetails.currentSkill != name &&
			Database.skillExistsEN(name)) {
				Application.showPage("skill_details", { "nameEN": name });
		}
	})

	// Create the autocomplete for the app search.
	$("#appSearch").autocomplete({
		source: Database.mAppNamesEN,
		select: function(e, ui) {
			var name = ui.item.value.toLowerCase();

			if(PageAppDetails.currentApp != name &&
				Database.appExistsEN(name)) {
					Application.showPage("app_details", { "nameEN": name });
			}
		}
	});

	// Create the action when you type into the app search.
	$("#appSearch").keyup(function(e){
		var name = $("#appSearch").val().toLowerCase();

		if(PageAppDetails.currentApp != name &&
			Database.appExistsEN(name)) {
				Application.showPage("app_details", { "name": name });
		}
	});

	$("#compLevelDialog").hide();
	$("#compSelectDialog").hide();
	$("#withSkillSection").hide();

	showAllApps();

	// Load the COMP from a cookie (expires in 5 years).
	var compData = $.cookie("comp");

	// Set the COMP data if it's valid.
	if(compData && compData.length)
		compList = compData;

	// Try to load it.
	try {
		refleshCOMP();
	} catch(e) {
		compList = [ ];

		refleshCOMP();
	}

	walkthroughPage("contents", false);

	/*
	// This test code is used to validate the demon skills.
	$.each(demonByNameEN, function(nameEN, data) {
		$.each(data.skills, function(skillJP, obtainLvl) {
			if(skillByNameJP[skillJP] === undefined) {
				alert(skillJP + " on " + data.nameEN);
			}
		});
	});
	*/

	/*
	// This test code is used to validate the level demons get skills at.
	$.each(demonByNameEN, function(nameEN, data) {
		$.each(data.skills, function(skillJP, obtainLvl) {
			if(obtainLvl != 0 && obtainLvl < data.level) {
				alert(skillJP + " on " + data.nameEN);
			}
		});
	});
	*/

	/*
	// This test code is used to validate mutation trigger levels.
	$.each(demonByNameEN, function(nameEN, data) {
		if(data.mutate && data.mutate.level <= data.level) {
			alert("Mutation for: " + data.nameEN);
		}
	});
	*/

	// Set all the default pages for each tab.
	$.each(this.mDefaultPages, function(tab, data) {
		Application.showPage(data.page, data.data);
	});

	// Clear the history.
	this.mHistory = [ ];
	this.mHistoryPos = -1;
	this.mActiveTabHistory = { };

	// Default to the demon tab.
	this.showPage(this.mDefaultPages["demon"].page,
		this.mDefaultPages["demon"].data);
}

/**
 * Show the desired page.
 * @arg name Name of the page to show.
 * @arg data Page data needed to populate the page (varies based on the page).
 */
ApplicationImpl.prototype.showPage = function(name, data) {
	// Don't bother if it's the same page. This breaks multiple demon quick
	// searches!
	/*if(name == this.mCurrentPage) {
		return;
	}*/

	// Add the page name to the data.
	if(data === undefined) {
		data = { "page": name };
	} else {
		data["page"] = name;
	}

	// Clear the current demon, skill, and app. These are used to keep the
	// quick search from duplicating the same page.
	PageDemonDetails.currentDemon = undefined;
	PageSkillDetails.currentSkill = undefined;
	PageAppDetails.currentApp = undefined;

	// If there is history after the current page, remove it.
	if(this.mHistoryPos >= 0 && this.mHistoryPos < (this.mHistory.length - 1)) {
		this.mHistory.splice(this.mHistoryPos + 1, this.mHistory.length -
			this.mHistoryPos - 1);

		// Active tab history that must be removed.
		var toRemove = [ ];

		// Save the length of the history.
		var historyLen = this.mHistory.length;

		// Find any wiped pages from the active tab history that should be
		// removed.
		$.each(this.mActiveTabHistory, function(tab, historyIndex) {
			if(historyIndex >= historyLen)
				toRemove.push(tab);
		});

		// Variable for the active tab history (needed for the loop).
		var activeTabHistory = this.mActiveTabHistory;

		// Remove them.
		$.each(toRemove, function(index, tab) {
			delete activeTabHistory[tab];
		});
	}

	// Get the tab this page belongs to.
	var tab = this.mPages[name].tab();

	// If there is a previous page on this tab, unload it.
	if(this.mActiveTabHistory[tab] !== undefined) {
		// Get the data for the page active on the tab.
		var activePageData = this.mHistory[this.mActiveTabHistory[tab]];

		// Leave the page.
		this.mPages[activePageData.page].leave(activePageData);
	} else {
		// Get the data for the default page.
		var defaultPageData = this.mDefaultPages[tab];

		// Unload the default page before we load a new page in.
		this.mPages[defaultPageData.page].leave(defaultPageData.data);
	}

	// Load the new page.
	this.mPages[name].enter(data);

	// Add the page data to the history.
	this.mHistory.push(data);
	this.mHistoryPos++;

	// Add the page as the active page on the tab.
	this.mActiveTabHistory[tab] = this.mHistoryPos;

	// We can no longer go forward.
	$("#forwardButton").hide();

	// Display the back button if there is history.
	if(this.mHistory.length > 1) {
		$("#backButton").show();
	} else {
		$("#backButton").hide();
	}

	// Set the new page.
	this.mCurrentPage = name;

	// Display the right tab.
	this.showTab(tab);
}

/**
 * Show the desired application tab.
 * @arg name Name of the tab to show.
 */
ApplicationImpl.prototype.showTab = function(name) {
	// Don't bother if it's the same tab.
	if(name == this.mCurrentTab) {
		return;
	}

	// Hide all tabs and set their button as clickable/up.
	$.each(this.mTabs, function(index, tab) {
		$("#" + tab + "Tab").hide();
		$("#" + tab + "Button").removeClass("button_down");
		$("#" + tab + "Button").addClass("button_up");
	});

	// Show the desired tab and make the button show depressed.
	$("#" + name + "Tab").show();
	$("#" + name + "Button").removeClass("button_up");
	$("#" + name + "Button").addClass("button_down");

	// Set the current tab.
	this.mCurrentTab = name;
}

/**
 * Register a new page.
 * @arg name Name of the page to add.
 * @arg obj Object for the page.
 */
ApplicationImpl.prototype.registerPage = function(name, obj) {
	// Add the page (if it's unique).
	if(name in this.mPages) {
		alert("Duplicate page: " + name);
	} else {
		this.mPages[name] = obj;
	}
}

/**
 * Register a new main app tab.
 * @arg name Name of the tab to add.
 */
ApplicationImpl.prototype.registerTab = function(name) {
	// Add the tab (if it's unique).
	if(this.mTabs.indexOf(name) >= 0) {
		alert("Duplicate tab: " + name);
	} else {
		this.mTabs.push(name);

		// Create the function to show the tab.
		$("#" + name + "Button").click(function() {
			Application.showTab(name);
		});
	}
}

/**
 * Navigate to the previous page in the history.
 */
ApplicationImpl.prototype.back = function() {
	// If we can't go back, bail.
	if(this.mHistoryPos < 1) {
		return;
	}

	// Get the page data.
	var data = this.mHistory[this.mHistoryPos - 1];

	// Get the tab this page belongs to.
	var tab = this.mPages[data.page].tab();

	// If there is a previous page on this tab, unload it.
	if(this.mActiveTabHistory[tab] !== undefined) {
		// Get the data for the page active on the tab.
		var activePageData = this.mHistory[this.mActiveTabHistory[tab]];

		// Leave the page.
		this.mPages[activePageData.page].leave(activePageData);
	}

	// Move back in the history.
	this.mHistoryPos--;

	// Load the new page.
	this.mPages[data.page].enter(data);

	// Add the page as the active page on the tab.
	this.mActiveTabHistory[tab] = this.mHistoryPos;

	// Set the new page.
	this.mCurrentPage = data.page;

	// Display the forward button if we can go forward.
	if(this.mHistoryPos < (this.mHistory.length - 1)) {
		$("#forwardButton").show();
	} else {
		$("#forwardButton").hide();
	}

	// Display the forward button if we can go backwards.
	if(this.mHistoryPos > 0) {
		$("#backButton").show();
	} else {
		$("#backButton").hide();
	}

	// Display the right tab.
	this.showTab(tab);
}

/**
 * Navigate to the next page in the history.
 */
ApplicationImpl.prototype.forward = function() {
	// If we can't go forward, bail.
	if((this.mHistoryPos + 1) >= this.mHistory.length) {
		return;
	}

	// Get the page data.
	var data = this.mHistory[this.mHistoryPos + 1];

	// Get the tab this page belongs to.
	var tab = this.mPages[data.page].tab();

	// If there is a previous page on this tab, unload it.
	if(this.mActiveTabHistory[tab] !== undefined) {
		// Get the data for the page active on the tab.
		var activePageData = this.mHistory[this.mActiveTabHistory[tab]];

		// Leave the page.
		this.mPages[activePageData.page].leave(activePageData);
	}

	// Move forward in the history.
	this.mHistoryPos++;

	// Load the new page.
	this.mPages[data.page].enter(data);

	// Add the page as the active page on the tab.
	this.mActiveTabHistory[tab] = this.mHistoryPos;

	// Set the new page.
	this.mCurrentPage = data.page;

	// Display the forward button if we can go forward.
	if(this.mHistoryPos < (this.mHistory.length - 1)) {
		$("#forwardButton").show();
	} else {
		$("#forwardButton").hide();
	}

	// Display the forward button if we can go backwards.
	if(this.mHistoryPos > 0) {
		$("#backButton").show();
	} else {
		$("#backButton").hide();
	}

	// Display the right tab.
	this.showTab(tab);
}

// Singleton for the application.
var Application = new ApplicationImpl();
