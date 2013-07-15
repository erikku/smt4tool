function walkthroughPage(page, tab) {
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

	return html;
}
