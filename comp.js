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

function componentToCOMP(nameEN) {
	$("#compSplitDialog").dialog("close");

	currentDemon = demonByNameEN[nameEN.replace("$", "'").toLowerCase()];

	addToCOMP();
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

function renderFusion(a, b, idxA, idxB) {
	var result = calculateFusion(a, b);

	if(result !== undefined) {
		var html = "<div class=\"compCombo\" onClick=\"compFuse(" +
			idxA + ", " + idxB + ");\">";

		html += "<a class=\"section\">" + a.nameEN + " (" + a.level + ")</a>";
		html += "&nbsp;+&nbsp;";
		html += "<a class=\"section\">" + b.nameEN + " (" + b.level + ")</a>";
		html += "&nbsp;=&nbsp;";
		html += "<a class=\"section\">" + result.nameEN + " (" +
			result.level + ")</a>";
		html += "</div>";

		// We have to be careful not to modify the base object (which is the
		// demon data from the database!) and add the HTML to it. We must COPY
		// the data we need from the demon data and add the HTML data to a new
		// object instead.
		return {
			"nameEN": result.nameEN,
			"level": result.level,
			"html": html
		}
	}

	return undefined;
}

function renderReverseFusion(result, resultIndex, a, b) {
	var html = "<div class=\"compCombo\" onClick=\"compDismiss(" +
		resultIndex + "); componentToCOMP('" +
		a.nameEN.replace("'", "$") + "'); componentToCOMP('" +
		b.nameEN.replace("'", "$") + "');\">";

	var activeSkills = [ ];
	var learnedSkills = [ ];
	var skillList = "";

	$.each(a.skills, function(nameJP, obtainLvl) {
		if(obtainLvl > a.level) {
			learnedSkills.push(skillByNameJP[nameJP].nameEN +
				" (" + a.nameEN + " - " + obtainLvl + ")");
		} else {
			activeSkills.push(skillByNameJP[nameJP].nameEN);
		}
	});

	$.each(b.skills, function(nameJP, obtainLvl) {
		if(obtainLvl > b.level) {
			learnedSkills.push(skillByNameJP[nameJP].nameEN +
				" (" + b.nameEN + " - " + obtainLvl + ")");
		} else if(a.skills["nameJP"] === undefined) {
			activeSkills.push(skillByNameJP[nameJP].nameEN);
		}
	});

	$.each(activeSkills, function(index, code) {
		if(skillList.length)
			skillList += " / " + code;
		else
			skillList += code;
	});

	var total = activeSkills.length + learnedSkills.length;
	var isFirst = true;

	if(learnedSkills.length && total > 4)
		skillList += "<br/>";
	else
		isFirst = false;

	$.each(learnedSkills, function(index, code) {
		if(!isFirst)
			skillList += " / " + code;
		else
			skillList += code;

		isFirst = false;
	});

	html += "<a class=\"section\">" + a.nameEN + " (" + a.level + ")</a>";
	html += "&nbsp;+&nbsp;";
	html += "<a class=\"section\">" + b.nameEN + " (" + b.level + ")</a>";
	html += "<br/>Skills this combination can produce:<br/>" + skillList;
	html += "</div>";

	return html;
}

function compFindDemon(searchTerm) {
	var idx = -1;

	$.each(compList, function(index, data) {
		if(data.nameEN == searchTerm) {
			idx = index;

			return false;
		}
	});

	return idx;
}

function compFuseSpecial(nameEN) {
	var data = demonByNameEN[nameEN.toLowerCase()];

	var result = {
		// Keep track of the fusion history.
		"parents": [ ],
		"nameEN": data.nameEN,
		"level": data.level,
		"skills": [ ]
	};

	// Copy the initial skills
	$.each(data.skills, function(skill, obtainLvl) {
		if(obtainLvl <= result.level)
			result.skills.push(skillByNameJP[skill].nameEN);
	});

	$.each(data["fusions"][0], function(index, component) {
		// Remove the original demon.
		var parent = compList.splice(compFindDemon(nameEN), 1)[0];

		// Add the demon as a parent.
		result.parents.push(parent);

		// Add the skills to the result.
		$.each(parent.skills, function(index, skill) {
			if(result.skills.indexOf(skill) < 0)
				result.skills.push(skill);
		});
	});

	// Add the new demon.
	compList.push(result);

	// Select the 8 skills (if we have over 8).
	if(result.skills.length > 8) {
		compSelectSkills(compList.length - 1);
	} else {
		refleshCOMP();
	}
}

function computeFusions() {
	if(compList.length < 2)
		return "";

	var fuseList = [ ];

	// Handle all special fusions.
	if(compList.length >= 3) {
		$.each(demonByNameEN, function(nameEN, data) {
			if(data["fusions"] && data["fusions"].length) {
				var haveFusion = true;

				$.each(data["fusions"][0], function(index, component) {
					var idx = compFindDemon(demonByNameJP[component].nameEN);

					if(idx < 0)
						haveFusion = false;
				});

				if(haveFusion) {
					var html = "<div class=\"compCombo\" onClick=\"" +
						"compFuseSpecial('" + data.nameEN + "');\">";

					$.each(data["fusions"][0], function(index, component) {
						var a = demonByNameJP[component];

						html += "<a class=\"section\">" + a.nameEN +
							" (" + a.level + ")</a>";
						html += "&nbsp;+&nbsp;";
					});

					html = html.substring(0, html.length - 7) + "=&nbsp;";
					html += "<a class=\"section\">" + data.nameEN + " (" +
						data.level + ")</a>";
					html += "</div>";

					fuseList.push({"html": html});
				}
			}
		});
	}

	/*
	 * The chart would look like this:
	 *   0 1 2 3 4
	 * 0 - A B C D
	 * 1 A - E F G
	 * 2 B E - H I
	 * 3 C F H - J
	 * 4 D G I J -
	 * And we don't want repeats so after they are gone:
	 *   0 1 2 3 4
	 * 0 - A B C D
	 * 1 - - E F G
	 * 2 - - - H I
	 * 3 - - - - J
	 * 4 - - - - -
	 * Thus we start each row at it's column index + 1.
	 */

	// Calculate the fusion combinations.
	for(var a = 0; a < compList.length; a++) {
		for(var b = a + 1; b < compList.length; b++) {
			var result = renderFusion(compList[a], compList[b], a, b);

			if(result !== undefined)
				fuseList.push(result);
		}
	}

	// Sort the fusions results (level then name).
	fuseList.sort(function(a, b) {
		if(a.level == b.level)
			return a.nameEN > b.nameEN ? 1 : -1;

		return a.level - b.level;
	});

	var html = "";

	// Create HTML for the results.
	$.each(fuseList, function(index, result) {
		var code = result["html"];

		if(code.length && html.length)
			html += "<br/>" + code;
		else
			html += code;
	});

	if(html.length) {
		html = "<p><a class=\"button_up\">Possible Fusions</a></p>" + html;
	}

	return html;
}

function computeReverseFusions(resultIndex, targetName, components) {
	if(components.length < 2)
		return [ ];

	var fuseList = [ ];

	// Calculate the fusion combinations.
	for(var a = 0; a < components.length; a++) {
		for(var b = a + 1; b < components.length; b++) {
			var result = calculateFusion(components[a], components[b]);

			if(result !== undefined && result.nameEN == targetName) {
				fuseList.push(renderReverseFusion(result, resultIndex,
					components[a], components[b]));
			}
		}
	}

	return fuseList;
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
		var resultTribe = "-";

		if(idxA < fusionChart.length && idxB < fusionChart.length)
			resultTribe = fusionChart[idxA][idxB];

		if(resultTribe != "-") {
			// var targetLevel = Math.round((baseDemonA.level + baseDemonB.level) / 2);
			var targetLevel = (baseDemonA.level + baseDemonB.level + 1) >> 1;
			var currentLevel = 100;
			var highest = { "level": 0 };

			$.each(demonByNameJP, function(name, demon) {
				if(demon.tribe == resultTribe && demon.level > highest.level)
					highest = demon;
			});

			$.each(demonByNameJP, function(name, demon) {
				if(demon.tribe == resultTribe && demon.level < currentLevel &&
					targetLevel < demon.level && demon.fusions === undefined) {
						currentLevel = demon.level;
						result = demon;
				}
			});

			if(result == undefined)
				result = highest;
		}
	}

	return result;
}

function compFuse(a, b) {
	// Calculate the fusion.
	var baseResult = calculateFusion(compList[a], compList[b]);

	var result = {
		// Keep track of the fusion history.
		"parents": [compList[a], compList[b]],
		"nameEN": baseResult.nameEN,
		"level": baseResult.level,
		"skills": [ ]
	};

	// Copy the initial skills
	$.each(baseResult.skills, function(skill, obtainLvl) {
		if(obtainLvl <= result.level)
			result.skills.push(skillByNameJP[skill].nameEN);
	});

	// Add the skills to the result.
	$.each(compList[a].skills, function(index, skill) {
		if(result.skills.indexOf(skill) < 0)
			result.skills.push(skill);
	});
	$.each(compList[b].skills, function(index, skill) {
		if(result.skills.indexOf(skill) < 0)
			result.skills.push(skill);
	});

	// Remove the original demons.
	compList.splice(a, 1); if(a < b) b--;
	compList.splice(b, 1);

	// Add the new demon.
	compList.push(result);

	// Select the 8 skills (if we have over 8).
	if(result.skills.length > 8) {
		compSelectSkills(compList.length - 1);
	} else {
		refleshCOMP();
	}
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

		var baseDemon = demonByNameEN[demon.nameEN.toLowerCase()];

		html += "<div class=\"compEntry\">";

		html += "<a class=\"section\" id=\"compLevelInfo\">" + demon.level +
			"</a>&nbsp;&nbsp;" + htmlDemonLink(demon.nameEN) + " (" +
			skills + ")<br/>";
		html += "<a class=\"button_up\" id=\"compDismissBtn\" onClick=\"" +
			"compDismiss(" + index + ");\">Dismiss</a>";
		html += "<a class=\"button_up\" id=\"compLevelBtn\" onClick=\"" +
			"compLevel(" + index + ");\">Level</a>";

		if(baseDemon.fusions || (reverseChart[baseDemon.tribe] &&
			reverseChart[baseDemon.tribe].length)) {
				html += "<a class=\"button_up\" id=\"compSplitBtn\" " +
					"onClick=\"compSplit(" + index + ");\">Split</a>";
		}

		if(baseDemon["mutate"]) {
			html += "<a class=\"button_up\" id=\"compMutateBtn\" onClick=\"" +
				"compMutate(" + index + ");\">Mutate</a>";
		}

		if(demon["parents"] && demon["parents"].length) {
			html += "<a class=\"button_up\" id=\"compHistoryBtn\" " +
				"onClick=\"compHistory(" + index + ");\">History</a>";
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
	var skillCount = compList[index].skills.length;
	var html = "";

	$.each(compList[index].skills, function(index, skill) {
		html = "<span><input type=\"checkbox\" name=\"skill\" value=\"" +
			index + "\">" + skill + "<br/></span>" + html;
	});

	$("#compSelectBoxes").html(html);

	$("#compSelectDialog").dialog({
		dialogClass: "no-close",
		closeOnEscape: true,
		resizable: false,
		height: 300,
		modal: true,
		buttons: {
			"Finish Demon": function() {
				var count = 0

				$("#compSelectForm :input").each(function() {
					if($(this).is(":checked"))
						count++;
				});

				if(count > 8) {
					alert("You selected too many skills. Try again.");
				} else {
					$("#compSelectForm :input").each(function() {
						if(!$(this).is(":checked"))
							compList[index].skills.splice($(this).val(), 1);
					});

					refleshCOMP();
		      		$(this).dialog("close");
	      		}
			}
		}
	});
}

function renderHistory(child, depth) {
	if(depth == undefined)
		depth = "";

	if(child["parents"] === undefined || child["parents"].length < 1)
		return "";

	var html = "";

	$.each(child["parents"], function(index, parent) {
		if(html.length)
			html += "<br/>";

		html += depth + parent.nameEN;

		var superParent = renderHistory(parent, "&nbsp;&nbsp" + depth);
		if(superParent.length)
			html += "<br/>" + superParent;
	});

	return html;
}

function compHistory(index) {
	var html = compList[index].nameEN + "<br/>" +
		renderHistory(compList[index], "+-> ");

	$("#compHistory").html(html);

	$("#compHistoryDialog").dialog({
		dialogClass: "no-close",
		closeOnEscape: true,
		resizable: false,
		width: 700,
		height: 380,
		modal: true,
		buttons: {
			"Cancel": function() {
	      		$(this).dialog("close");
			}
		}
	});
}

function compSplit(index) {
	var baseDemon = demonByNameEN[compList[index].nameEN.toLowerCase()];
	var resultIndex = index;
	var limit = parseInt($("#compLevelLimit").val());

	if(isNaN(limit))
		limit = 99;

	if(compList[index]["parents"] && compList[index]["parents"].length) {
		var child = compList.splice(index, 1)[0];

		$.each(child["parents"], function(index, parent) {
			compList.push(parent);
		});

		refleshCOMP();
	} else if(baseDemon.fusions && baseDemon.fusions.length) {
		compList.splice(index, 1);

		$.each(baseDemon.fusions[0], function(index, component) {
			var componentData = demonByNameJP[component];
			var skills = [ ];

			$.each(componentData.skills, function(skill, obtainLvl) {
				if(obtainLvl <= 0)
					skills.push(skillByNameJP[skill].nameEN);
			});

			compList.push({
				"nameEN": componentData.nameEN,
				"level": componentData.level,
				"skills": skills
			});
		});

		refleshCOMP();
	} else {
		var results = [ ];

		$.each(reverseChart[baseDemon.tribe], function(index, combo) {
			var components = [ ];

			$.each(demonByNameEN, function(nameEN, data) {
				if(data.level <= limit) {
					if(data.tribe == combo[0] || data.tribe == combo[1])
						components.push(data);
				}
			});

			results = results.concat(computeReverseFusions(resultIndex,
				baseDemon.nameEN, components));
		});

		$.each(demonByNameEN, function(nameEN, data) {
			var components = [ ];

			if(data.level <= limit) {
				if(data.tribe == "精霊" || data.tribe == baseDemon.tribe)
					components.push(data);
			}

			results = results.concat(computeReverseFusions(resultIndex,
				baseDemon.nameEN, components));
		});

		var html = "";

		$.each(results, function(index, code) {
			if(html.length)
				html += "<br/>" + code;
			else
				html += code;
		});

		$("#compSplitList").html(html);

		$("#compSplitDialog").dialog({
			dialogClass: "no-close",
			closeOnEscape: true,
			resizable: false,
			width: 700,
			height: 380,
			modal: true,
			buttons: {
				"Cancel": function() {
		      		$(this).dialog("close");
				}
			}
		});
	}
}

function compMutate(index) {
	// Mutate data.
	var mutateData = demonByNameEN[compList[
		index].nameEN.toLowerCase()].mutate;
	var target = mutateData.target;
	var targetLevel = mutateData.level;

	// Calculate the fusion.
	var baseResult = demonByNameJP[target];

	// If the demon is too low of a level, fix that first.
	if(compList[index].level < targetLevel) {
		var baseDemon = demonByNameEN[compList[
			index].nameEN.toLowerCase()];
		var baseLevel = compList[index].level;

		$.each(baseDemon.skills, function(skill, obtainLvl) {
			if(obtainLvl > baseLevel && obtainLvl <= targetLevel) {
				compList[index].skills.push(
					skillByNameJP[skill].nameEN);
			}
		});

		compList[index].level = targetLevel;
	}

	// Create the result demon.
	var result = {
		// Keep track of the fusion history.
		"parents": [compList[index]],
		"nameEN": baseResult.nameEN,
		"level": baseResult.level,
		"skills": [ ]
	};

	// Copy the initial skills
	$.each(baseResult.skills, function(skill, obtainLvl) {
		if(obtainLvl <= result.level)
			result.skills.push(skillByNameJP[skill].nameEN);
	});

	// Add the skills to the result.
	$.each(compList[index].skills, function(index, skill) {
		if(result.skills.indexOf(skill) < 0)
			result.skills.push(skill);
	});

	// Replace the original demon with the mutated one.
	compList[index] = result;

	// Select the 8 skills (if we have over 8).
	if(result.skills.length > 8) {
		compSelectSkills(index);
	} else {
		refleshCOMP();
	}
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
