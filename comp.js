function addToCOMP() {
	var skills = [ ];

	$.each(currentDemon.skills, function(skill, obtainLvl) {
		if(obtainLvl <= 0)
			skills.push(skillByNameJP[skill].nameEN);
	});

	compList.push({
		"nameEN": currentDemon.nameEN,
		"level": currentDemon.level,
		"skills": skills
	});

	showTab("comp");
	refleshCOMP();
}

function refleshCOMP() {
	// Rip the flesh off the table, skin the demons, and populate the table
	// with the flesh. Honestly it was a spelling mistake. Let's keep it :P
	var html = "";

	$.each(compList, function(index, demon) {
		if(html.length)
			html += "<br/>";

		var skills = "";

		$.each(demon.skills, function(skillIndex, skill) {
			if(skills.length)
				skills += ", ";

			skills += htmlSkillLink(skill);
		});

		html += "<div class=\"compEntry\">";

		html += "<a class=\"section\">" + demon.level + "</a>&nbsp;&nbsp;" +
			htmlDemonLink(demon.nameEN) + " (" + skills + ")&nbsp;&nbsp;";
		html += "<a class=\"button_up\" id=\"compLevelBtn\" onClick=\"" +
			"compLevel(" + index + ");\">Level</a>";

		html += "</div>";
	});

	$("#compList").html(html);
}

function compLevel(index) {
	$("#dialog-confirm").dialog({
		dialogClass: "no-close",
		closeOnEscape: true,
		resizable: false,
		height:140,
		modal: true,
		buttons: {
			"Delete all items": function() {
				$(this).dialog("close");
	    	},
			Cancel: function() {
	      		$(this).dialog("close");
			}
		}
	});
}
