function walkthroughPage(page) {
	var s = document.createElement("script");
	s.type = "text/javascript";
	s.src = "walkthrough/" + page + ".js";

	$("#walkthrough")[0].appendChild(s);

	showTab("walkthrough");
}
