(function($) { 
	/**
	 * Create the walkthrough header.
	 * @arg prev Optional previous document.
	 * @arg next Optional next document.
	 */
	$.fn.walkHeader = function(prev, next) {
		// Get the menu.
		var menu = $("#walkMenu").empty();

		// Create the previous button.
		if(prev !== undefined) {
			menu.append($.create("a").attr("id", "prevBtn").addClass(
				"button_up").text("Previous").click(function() {
				Application.showPage("walkthrough", { "source": prev });
			}));
		}

		// Create the next button.
		menu.append($.create("a").attr("id", "tocBtn").addClass(
			"button_up").text("Table of Contents").click(function() {
			Application.showPage("walkthrough", { "source": "contents" });
		}));

		// Create the next button.
		if(next !== undefined) {
			menu.append($.create("a").attr("id", "nextBtn").addClass(
				"button_up").text("Next").click(function() {
				Application.showPage("walkthrough", { "source": next });
			}));
		}

		// Add a horizontal line.
		menu.append($.create("hr"));

		return this;
	}

	/**
	 * Add an entry into the table of contents.
	 * @arg name Display name for the entry.
	 * @arg page Filename of the page (without path or extension).
	 */
	$.fn.contents = function(name, page) {
		this.append($.create("li").append($.create("a").text(
			name).click(function() {
				Application.showPage("walkthrough", { "source": page });
		})));

		return this;
	}

	/**
	 * Insert a demon link into the walkthrough.
	 * @arg name English name of the demon to insert.
	 */
	$.fn.demonLink = function(name) {
		this.append($.create("a").addClass("demonLink").text(
			name).click(function() {
				Application.showPage("demon_details", { "nameEN": name })
		}))

		return this;
	}

	/**
	 * Insert a skill link into the walkthrough.
	 * @arg name English name of the skill to insert.
	 */
	$.fn.skillLink = function(name) {
		this.append($.create("a").addClass("skillLink").text(
			name).click(function() {
				Application.showPage("skill_details", { "nameEN": name })
		}))

		return this;
	}

	/**
	 * Insert an app link into the walkthrough.
	 * @arg name English name of the app to insert.
	 */
	$.fn.appLink = function(name) {
		this.append($.create("a").addClass("appLink").text(
			name).click(function() {
				Application.showPage("app_details", { "name": name })
		}))

		return this;
	}

	/**
	 * Create an HTML element for a demon.
	 * @arg name English name of the demon to insert.
	 */
	$.demonLink = function(name) {
		return $.create("a").addClass("demonLink"
			).text(name).click(function() {
				Application.showPage("demon_details", { "nameEN": name })
		});
	}

	/**
	 * Create an HTML element for a skill.
	 * @arg name English name of the skill to insert.
	 */
	$.skillLink = function(name) {
		return $.create("a").addClass("skillLink"
			).text(name).click(function() {
				Application.showPage("skill_details", { "nameEN": name })
		});
	}

	/**
	 * Create an HTML element for a app.
	 * @arg name English name of the app to insert.
	 */
	$.appLink = function(name) {
		return $.create("a").addClass("appLink"
			).text(name).click(function() {
				Application.showPage("app_details", { "nameEN": name })
		});
	}

	/**
	 * Join an list of elements together using the given separator.
	 * @arg list The list of elements. Can be anything $.each can handle.
	 * @arg separator String or DOM element to use as a separator (what
	 * $.fn.append takes as an argument).
	 * @arg func The function to call on each element to convert it to HTML.
	 * Like the $.each function, break by returning false or for a valid
	 * element, return a DOM element or string (what $.fn.append takes).
	 * @returns The DOM elements appended together.
	 */
	$.fn.eachJoin = function(list, separator, func) {
		// The DOM element to append the elements to.
		var result = this;

		// If this is the first element or not.
		var first = true;

		$.each(list, function(a, b) {
			// Call the function for the current element.
			var element = func(a, b);

			// If the user wants to break out of the loop, break out of
			// this loop as well.
			if(element === false)
				return false;

			// If this is the first element, append just the element;
			// otherwise, append a separator then the element.
			if(first)
				result.append(element);
			else
				result.append(separator).append(element);

			// The first element is done now.
			first = false;
		});

		return this;
	}

	/**
	 * Insert a quest into the walkthrough.
	 * @arg data Object containing the data on the quest.
	 */
	$.fn.quest = function(data) {
		// Create the star rating for the quest.
		var stars = "&nbsp;&nbsp;";

		for(var i = 0; i < data.stars; i++)
			stars += "★";

		for(var i = data.stars; i < 8; i++)
			stars += "☆";

		// The title and rating for the quest.
		this.append($.create("h2").html(data.name + stars));

		// The main quest table.
		var table = $.create("table").addClass("quest");

		/*
		table.append($.create("tr"
			).append($.create("td").addClass("questCat").append(
				$.create("a").addClass("section").text("Stars")
			)).append($.create("td").append(
				$.create("a").attr("id", "questData_stars").html(data.stars)
			))
		);
		*/

		table.append($.create("tr"
			).append($.create("td").addClass("questCat").append(
				$.create("a").addClass("section").text("Client")
			)).append($.create("td").append(
				$.create("a").attr("id", "questData_client").html(data.client)
			))
		);

		table.append($.create("tr"
			).append($.create("td").addClass("questCat").append(
				$.create("a").addClass("section").text("Reward")
			)).append($.create("td").append(
				$.create("a").attr("id", "questData_reward").html(data.reward)
			))
		);

		table.append($.create("tr"
			).append($.create("td").addClass("questCat").append(
				$.create("a").addClass("section").text("Task")
			)).append($.create("td").append(
				$.create("a").attr("id", "questData_task").html(data.task)
			))
		);

		table.append($.create("tr"
			).append($.create("td").addClass("questCat").append(
				$.create("a").addClass("section").text("Description")
			)).append($.create("td").append(
				$.create("a").attr("id", "questData_desc").html(data.desc)
			))
		);

		// Add the table to the document.
		this.append(table);

		return this;
	}

	/**
	 * Insert a map into the walkthrough.
	 * @arg name Filename of the map (without path or extention).
	 */
	$.fn.areaMap = function(name) {
		return this.append($.create("img").addClass("map").attr(
			"src", "walkthrough/" + name + ".png"));
	}

	/**
	 * Insert a table of demons into the walkthrough.
	 * @arg demonNames Array of the names of the demons to list.
	 */
	$.fn.demonList = function(demonNames) {
		// Array of the demon data objects.
		var demons = [ ];

		$.each(demonNames, function(index, name) {
			// Fetch the dmeon.
			var demon = Database.demonByNameEN(name.toLowerCase());

			// Add the demon if it was found in the database.
			if(demon === undefined) {
				alert("Missing demon: " + name);
			} else {
				demons.push(demon);
			}
		});

		// Sort the demons by level and then name.
		demons.sort(function(a, b) {
			if(a.level == b.level)
				return a.nameEN > b.nameEN ? 1 : -1;

			return a.level - b.level;
		});

		// Create the top of the table.
		var demonList = PageDemonList.tableHeader();

		// Add each demon to the table.
		$.each(demons, function(index, data) {
			demonList.append(PageDemonList.tableEntry(data));
		});

		// Create the table footer.
		demonList.append(PageDemonList.tableFooter());

		return this.append(demonList);
	}

}(jQuery));
