// http://stackoverflow.com/questions/3959211/fast-factorial-function-in-javascript
var f = [ ];
function factorial(n) {
	if(n == 0 || n == 1)
		return 1;
	else if(f[n] > 0)
		return f[n];
	else
		return f[n] = factorial(n - 1) * n;
}

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

function renderFusion(a, b) {
	var result = calculateFusion(a, b);

	if(result !== undefined) {
		var html = "<div class=\"compCombo\">";

		html += "<a class=\"section\">" + a.nameEN + "</a>";
		html += "&nbsp;+&nbsp;";
		html += "<a class=\"section\">" + b.nameEN + "</a>";
		html += "&nbsp;=&nbsp;";
		html += "<a class=\"section\">" + result.nameEN + "</a>";
		html += "</div>";

		return html;
	} else {
		return "";
	}
}

function computeFusions() {
	if(compList.length < 2)
		return "";

	var count = 1;

	if(compList.length > 2) {
		count = factorial(compList.length) / factorial(compList.length - 2);
	}

	var html = "";

	// Permute the fusion combinations.
	for(var a = 0; a < compList.length; a++) {
		for(var b = 0; b < a; b++) {
			if(count) {
				var code = renderFusion(compList[a], compList[b]);

				if(code.length && html.length)
					html += "<br/>" + code;
				else
					html += code;

				count --;
			}
		}

		for(var b = a + 1; b < compList.length; b++) {
			if(count) {
				var code = renderFusion(compList[a], compList[b]);

				if(code.length && html.length)
					html += "<br/>" + code;
				else
					html += code;

				count --;
			}
		}
	}

	if(html.length) {
		html = "<p><a class=\"button_up\">Possible Fusions</a></p>" + html;
	}

	return html;
}

function calculateFusion(a, b) {
	if(a >= elementalRanks.length || b >= elementalRanks.length)
		return undefined;

	//alert(a.nameEN + " x " + b.nameEN);

	var baseDemonA = demonByNameEN[a.nameEN.toLowerCase()];
	var baseDemonB = demonByNameEN[b.nameEN.toLowerCase()];

	var idxA = tribeListJP.indexOf(baseDemonA.tribe);
	var idxB = tribeListJP.indexOf(baseDemonB.tribe);

	var result = undefined;

	// Make sure we are not fusing the same demon.
	if(baseDemonA.nameEN == baseDemonB.nameEN)
		return undefined;

	if(baseDemonA.tribe == baseDemonB.tribe) {
		// Elemental fusion.
		//alert("Elemental fusion.");
		result = demonByNameJP[elementals[idxA]];
	} else if(baseDemonA.tribe == "精霊" || baseDemonB.tribe == "精霊") {
		// Rank up/down fusion.
		//alert("Rank up/down fusion.");
		var mainDemon = baseDemonB;
		var elementalDemon = baseDemonA;
		var elementalTribe = idxA;
		var mainTribe = idxB;

		if(baseDemonB.tribe == "精霊") {
			mainDemon = baseDemonA;
			elementalDemon = baseDemonB;
			elementalTribe = idxB;
			mainTribe = idxA;
		}

		var mainLevel = mainDemon.level;
		var rank = elementalRanks[mainTribe][elementalRankers.indexOf(
			elementalDemon.nameJP)];

		//var elementalTribe = tribeListJP[elementalTribe];
		var targetTribe = tribeListJP[mainTribe];

		if(rank == "u") {
			var currentLevel = 100;

			// Up
			$.each(demonByNameJP, function(name, demon) {
				if(demon.tribe == targetTribe && demon.level < currentLevel &&
					demon.level > mainDemon.level &&
					demon.fusions === undefined) {
						currentLevel = demon.level;
						result = demon;
				}
			});

			if(result === undefined)
				result = mainDemon;
		} else if(rank == "d") {
			var currentLevel = 0;

			// Down
			$.each(demonByNameJP, function(name, demon) {
				if(demon.tribe == targetTribe && demon.level > currentLevel &&
					demon.level < mainDemon.level &&
					demon.fusions === undefined) {
						currentLevel = demon.level;
						result = demon;
				}
			});

			if(result === undefined)
				result = mainDemon;
		} else {
			// No fusion!
		}
	} else {
		// Normal fusion.
		//alert("Normal fusion.");
		var resultTribe = fusionChart[idxA][idxB];

		if(resultTribe != "-") {
			var targetLevel = (baseDemonA.level + baseDemonB.level) / 2;
			var currentLevel = 0;

			$.each(demonByNameJP, function(name, demon) {
				if(demon.tribe == resultTribe && demon.level > currentLevel &&
					demon.level <= targetLevel &&
					demon.fusions === undefined) {
						currentLevel = demon.level;
						result = demon;
				}
			});
		}
	}

	return result;
}

function refleshCOMP() {
	// Rip the flesh off the table, skin the demons, and populate the table
	// with the flesh. Honestly it was a spelling mistake. Let's keep it :P
	var html = "";

	if(compList.length < 1) {
		html = "<p>Your COMP is empty. Add demons from their " +
			"respective details page.</p>";
	}

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

		html += "<a class=\"section\" id=\"compLevelInfo\">" + demon.level +
			"</a>&nbsp;&nbsp;" + htmlDemonLink(demon.nameEN) + " (" +
			skills + ")&nbsp;&nbsp;";
		html += "<a class=\"button_up\" id=\"compDismissBtn\" onClick=\"" +
			"compDismiss(" + index + ");\">Dismiss</a>";
		html += "<a class=\"button_up\" id=\"compLevelBtn\" onClick=\"" +
			"compLevel(" + index + ");\">Level</a>";
		html += "<a class=\"button_up\" id=\"compSplitBtn\" onClick=\"" +
			"compSplit(" + index + ");\">Split</a>";

		var baseDemon = demonByNameEN[demon.nameEN.toLowerCase()];

		if(baseDemon["mutate"]) {
			html += "<a class=\"button_up\" id=\"compMutateBtn\" onClick=\"" +
				"compMutate(" + index + ");\">Mutate</a>";
		}

		html += "</div>";
	});

	$("#compList").html(html);

	$("#compResults").html(computeFusions());
}

function compDismiss(index) {
	compList.splice(index, 1);

	refleshCOMP();
}

function compSelectSkills(index) {
	alert("Select!");
}

function compSplit(index) {
	// body...
}

function compMutate(index) {
	// body...
}

function compLevel(index) {
	$("#compLevelDialog").dialog({
		dialogClass: "no-close",
		closeOnEscape: true,
		resizable: false,
		height: 200,
		modal: true,
		buttons: {
			"Update Level": function() {
				var baseLevel = compList[index].level;
				var targetLevel = parseInt($("#compLevelInput").val());

				if(targetLevel < baseLevel || targetLevel > 99 ||
					isNaN(targetLevel)) {
						alert("Demon level must be between " +
							baseLevel + "and 99.");
				} else {
					var baseDemon = demonByNameEN[compList[
						index].nameEN.toLowerCase()];

					$.each(baseDemon.skills, function(skill, obtainLvl) {
						if(obtainLvl > baseLevel && obtainLvl <= targetLevel) {
							compList[index].skills.push(
								skillByNameJP[skill].nameEN);
						}
					});

					compList[index].level = targetLevel;

					$(this).dialog("close");

					if(compList[index].skills.length > 8) {
						compSelectSkills(index);
					} else {
						refleshCOMP();
					}
				}
	    	},
			"Cancel": function() {
	      		$(this).dialog("close");
			}
		}
	});

	$("#compLevelInput").val(compList[index].level);
}
