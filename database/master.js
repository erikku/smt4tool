function walkthroughPage(page, tab) {
	$("#walkMenu").text("");

	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "walkthrough/" + page + ".js";

	$("#walkthrough")[0].appendChild(s);

	if(typeof(tab) !== 'undefined' && !tab)
		return;

	showTab("walkthrough");
}

function walkthroughHeader(prev, next) {
	var html = "";

	if(typeof(prev) !== 'undefined') {
		html += "<a id=\"prevBtn\" class=\"button_up\" onClick=\"" +
			"walkthroughPage('" + prev + "');\">Previous</a>";
	}

	html += "<a id=\"tocBtn\" class=\"button_up\" onClick=\"walkthroughPage" +
		"('contents');\">Table of Contents</a>";

	if(typeof(next) !== 'undefined') {
		html += "<a id=\"nextBtn\" class=\"button_up\" onClick=\"" +
			"walkthroughPage('" + next + "');\">Next</a>";
	}

	html += "<hr/>";

	$("#walkMenu").html(html);

	return "";
}

function htmlDemonLink(name) {
	return "<a class=\"demonLink\" onClick=\"demonClicked(this);\">" +
		name + "</a>";
}

function htmlSkillLink(name) {
	return "<a class=\"skillLink\" onClick=\"skillClicked(this);\">" +
		name + "</a>";
}

function htmlAppLink(name) {
	return "<a class=\"appLink\" onClick=\"appClicked(this);\">" +
		name + "</a>";
}

function htmlQuest(data) {
	var html = "<h2>" + data.name + "&nbsp;&nbsp;";

	for(var i = 0; i < data.stars; i++)
		html += "★";

	for(var i = data.stars; i < 8; i++)
		html += "☆";

	html += "</h2><table class=\"quest\">";

	/*
	html += "<tr><td class=\"questCat\">";
	html += "<a class=\"section\">Stars</a>";
	html += "</td><td>";
	html += "<a id=\"questData_stars\">" + data.stars + "</a></td></tr>";
	*/

	html += "<tr><td class=\"questCat\">";
	html += "<a class=\"section\">Client</a>";
	html += "</td><td>";
	html += "<a id=\"questData_client\">" + data.client + "</a></td></tr>";

	html += "<tr><td class=\"questCat\">";
	html += "<a class=\"section\">Reward</a>";
	html += "</td><td>";
	html += "<a id=\"questData_reward\">" + data.reward + "</a></td></tr>";

	html += "<tr><td class=\"questCat\">";
	html += "<a class=\"section\">Task</a>";
	html += "</td><td>";
	html += "<a id=\"questData_task\">" + data.task + "</a></td></tr>";

	html += "<tr><td class=\"questCat\">";
	html += "<a class=\"section\">Description</a>";
	html += "</td><td>";
	html += "<a id=\"questData_desc\">" + data.desc + "</a></td></tr>";

	html += "</table>";

	return html;
}
