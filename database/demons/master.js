elementalRankers = ["アーシーズ", "エアロス", "アクアンズ", "フレイミーズ", "ノーム",
	"シルフ", "ウンディーネ", "サラマンダー"];

function renderReverseChart() {
	var html = "";

	$.each(reverseChart, function(result, combos) {
		html += "<p>" + result + ": ";

		var comboList = "";

		$.each(combos, function(index, combo) {
			if(comboList.length)
				comboList += ", ";

			comboList += combo[0] + "x" + combo[1];
		});

		html += comboList + "</p>";
	});

	return html;
}

function fusionBad(result) { return result == "－"; }
function fusionElemental(result) { return result == "精霊" }

function handleAffinity(affinity, short) {
	if(short) {
		if(affinity == "null")
			return "<a style=\"color: #999999;\">Nu</a>";
		else if(affinity == "weak")
			return "<a style=\"color: #CC0000;\">Wk</a>";
		else if(affinity == "protect")
			return "<a style=\"color: #00CC00;\">Rs</a>";
		else if(affinity == "reflect")
			return "<a style=\"color: #3333FF;\">Rp</a>";
		else if(affinity == "absorb")
			return "<a style=\"color: #CC00CC;\">Dr</a>";
		else
			return "<a style=\"color: #FFFFFF;\">-</a>";
	} else {
		if(affinity == "null")
			return "<a style=\"color: #999999;\">Null</a>";
		else if(affinity == "weak")
			return "<a style=\"color: #CC0000;\">Weak</a>";
		else if(affinity == "protect")
			return "<a style=\"color: #00CC00;\">Resist</a>";
		else if(affinity == "reflect")
			return "<a style=\"color: #3333FF;\">Repel</a>";
		else if(affinity == "absorb")
			return "<a style=\"color: #CC00CC;\">Drain</a>";
		else
			return "<a style=\"color: #FFFFFF;\">N/A</a>";
	}
}

function parseRank(rank) {
	if(rank == "u")
		return "Up";
	else if(rank == "d")
		return "Down";
	else
		return "-";
}

function showDemon(name) {
	name = name.toLowerCase();

	if(!(name in demonByNameEN))
		return;

	var data = demonByNameEN[name];
	currentDemon = data;

	$("#demonData_name").text(data.nameEN);
	$("#demonData_tribe").text(tribeListEN[tribeListJP.indexOf(data.tribe)]);
	$("#demonData_level").text(data.level);
	$("#demonData_hp").text(data.stats.hp);
	$("#demonData_mp").text(data.stats.mp);
	$("#demonData_str").text(data.stats.strength);
	$("#demonData_skill").text(data.stats.skill);
	$("#demonData_magic").text(data.stats.magic);
	$("#demonData_speed").text(data.stats.speed);
	$("#demonData_luck").text(data.stats.luck);
	$("#demonData_physical").html(handleAffinity(data.affinity.physical));
	$("#demonData_gun").html(handleAffinity(data.affinity.gun));
	$("#demonData_fire").html(handleAffinity(data.affinity.fire));
	$("#demonData_ice").html(handleAffinity(data.affinity.ice));
	$("#demonData_thunder").html(handleAffinity(data.affinity.thunder));
	$("#demonData_shock").html(handleAffinity(data.affinity.shock));
	$("#demonData_banish").html(handleAffinity(data.affinity.banish));
	$("#demonData_curse").html(handleAffinity(data.affinity.curse));
	$("#demonData_bind").html(handleAffinity(data.affinity.bind));
	$("#demonData_sleep").html(handleAffinity(data.affinity.sleep));
	$("#demonData_cold").html(handleAffinity(data.affinity.cold));
	$("#demonData_confusion").html(handleAffinity(data.affinity.confusion));
	$("#demonData_poison").html(handleAffinity(data.affinity.poison));
	$("#tribeListBtn").show();
	$("#demonData").show();
	$("#tribeList").hide();
	$("#demonList").hide();

	var rank = "--------";

	if(tribeListJP.indexOf(data.tribe) >= 0 && tribeListJP.indexOf(data.tribe)
		< elementalRanks.length) {
			rank = elementalRanks[tribeListJP.indexOf(data.tribe)];
	}

	var elemental = "None";

	if(tribeListJP.indexOf(data.tribe) >= 0 && tribeListJP.indexOf(data.tribe)
		< elementals.length && elementals[tribeListJP.indexOf(data.tribe)] != "-") {
			elemental = htmlDemonLink(demonByNameJP[elementals[
				tribeListJP.indexOf(data.tribe)]].nameEN);
	}

	$("#demonData_elementResult").html(elemental);

	$("#demonData_erthys").text(parseRank(rank[0]));
	$("#demonData_aeros").text(parseRank(rank[1]));
	$("#demonData_aquans").text(parseRank(rank[2]));
	$("#demonData_flaemis").text(parseRank(rank[3]));
	$("#demonData_gnome").text(parseRank(rank[4]));
	$("#demonData_sylph").text(parseRank(rank[5]));
	$("#demonData_undine").text(parseRank(rank[6]));
	$("#demonData_salamander").text(parseRank(rank[7]));

	var skillList = "";

	$.each(data.skills, function(nameJP, obtainLvl) {
		if(skillList.length)
			skillList += " / ";

		if(!skillByNameJP[nameJP]) {
			skillList += nameJP
		} else {
			skillList += "<a class=\"demonLink\" onClick=\"skillClicked(" +
				"this);\">" + skillByNameJP[nameJP].nameEN + "</a>";
		}

		if(obtainLvl > 0)
			skillList += " (" + obtainLvl + ")";
	});

	$("#demonData_skills").html(skillList);

	if(data["fusions"]) {
		$("#demonData_fusionSection").show();

		var fusions = "";

		$.each(data.fusions, function(index, fusion) {
			var fusionHTML = "";

			$.each(fusion, function(index, component) {
				if(fusionHTML.length)
					fusionHTML += " x ";

				var componentData = demonByNameJP[component];
				if(!componentData) {
					componentData = {
						"nameEN": component,
						"level": 0
					}
				}

				fusionHTML += "<a class=\"demonLink\" " +
					"onClick=\"demonClicked(this);\">" +
					componentData.nameEN + "</a> (" +
					componentData.level + ")";
			});

			if(fusions.length)
				fusions += " / ";

			fusions += fusionHTML;
		});

		$("#demonData_fusions").html(fusions);
	} else {
		$("#demonData_fusionSection").hide();
	}

	if(data["mutate"]) {
		$("#demonData_mutateSection").show();

		var mutateTarget = demonByNameJP[data.mutate.target];

		var mutation = "<a class=\"demonLink\" " +
					"onClick=\"demonClicked(this);\">" +
					mutateTarget.nameEN + "</a> (" + data.mutate.level +
					" => " + mutateTarget.level + ")";

		$("#demonData_mutation").html(mutation);
	} else {
		$("#demonData_mutateSection").hide();
	}

	$("#demonReverse").html(renderReverseList(data));

	showTab("demons");

	$("#showAllDemonsBtn").show();
	$("#affinityFilterBtn").show();
	$("#tribeListBtn").show();
}

function generateReverseCache() {
	/*
	var out = "";

	$.each(demonByNameJP, function(nameJP, data) {
		out += JSON.stringify(renderReverseList(data));
	});

	$('#reverseChartTest').text(out);
	*/

	var cache = { };

	$.each(demonByNameJP, function(nameJP, data) {
		cache[nameJP] = renderReverseList(data);
	});

	$('#reverseChartTest').text(JSON.stringify(cache));
}

function renderReverseList(baseDemon) {
	if(baseDemon.fusions === undefined &&
		reverseChart[baseDemon.tribe] !== undefined) {

		var results = [ ];

		$.each(reverseChart[baseDemon.tribe], function(index, combo) {
			var components = [ ];

			$.each(demonByNameEN, function(nameEN, data) {
				if(data.tribe == combo[0] || data.tribe == combo[1])
					components.push(data);
			});

			results = results.concat(computeReverseFusions(baseDemon.nameEN,
				components));
		});

		$.each(demonByNameEN, function(nameEN, data) {
			var components = [ ];

			if(data.tribe == "精霊" || data.tribe == baseDemon.tribe)
				components.push(data);

			results = results.concat(computeReverseFusions(baseDemon.nameEN,
				components));
		});

		var html = "";

		$.each(results, function(index, code) {
			if(html.length)
				html += "<br/>" + code;
			else
				html += code;
		});

		if(html.length) {
			html = "<p><a class=\"button_up\">Fusion Combinations" +
				"</a></p>" + html;
		}

		return html;
	}

	return "";
}

function demonTableHeader() {
	var demonList = "";
	demonList += "<table>";
	demonList += "<th><a>Lv</a></th>";
	demonList += "<th><a>Name</a></th>";
	demonList += "<th><a>HP</a></th>";
	demonList += "<th><a>MP</a></th>";
	demonList += "<th><a>St</a></th>";
	demonList += "<th><a>Dx</a></th>";
	demonList += "<th><a>Ma</a></th>";
	demonList += "<th><a>Ag</a></th>";
	demonList += "<th><a>Lu</a></th>";
	demonList += "<th><a>Phys</a></th>";
	demonList += "<th><a>Gun</a></th>";
	demonList += "<th><a>Fire</a></th>";
	demonList += "<th><a>Ice</a></th>";
	demonList += "<th><a>Elec</a></th>";
	demonList += "<th><a>Force</a></th>";
	demonList += "<th><a>Light</a></th>";
	demonList += "<th><a>Dark</a></th>";

	return demonList;
}

function demonClicked(obj) {
	var name = $(obj).text();

	if(Database.demonExistsEN(name))
		Application.showTab("demon_details", { "nameEN": name });
}

function demonTableEntry(data, targetLevel) {
	var demonList = "";
	demonList += "<tr>";

	if(targetLevel !== undefined && targetLevel > data.level) {
		demonList += "<td>" + data.level + "=>" + targetLevel + "</td>";
	} else {
		demonList += "<td>" + data.level + "</td>";
	}

	demonList += "<td><a class=\"demonLink\" onClick=\"demonClicked(this);\">" +
		data.nameEN + "</a></td>";
	demonList += "<td>" + data.stats.hp + "</td>";
	demonList += "<td>" + data.stats.mp + "</td>";
	demonList += "<td>" + data.stats.strength + "</td>";
	demonList += "<td>" + data.stats.skill + "</td>";
	demonList += "<td>" + data.stats.magic + "</td>";
	demonList += "<td>" + data.stats.speed + "</td>";
	demonList += "<td>" + data.stats.luck + "</td>";
	demonList += "<td>" + handleAffinity(
		data.affinity.physical, false) + "</td>";
	demonList += "<td>" + handleAffinity(
		data.affinity.gun, false) + "</td>";
	demonList += "<td>" + handleAffinity(
		data.affinity.fire, false) + "</td>";
	demonList += "<td>" + handleAffinity(
		data.affinity.ice, false) + "</td>";
	demonList += "<td>" + handleAffinity(
		data.affinity.thunder, false) + "</td>";
	demonList += "<td>" + handleAffinity(
		data.affinity.shock, false) + "</td>";
	demonList += "<td>" + handleAffinity(
		data.affinity.banish, false) + "</td>";
	demonList += "<td>" + handleAffinity(
		data.affinity.curse, false) + "</td>";
	demonList += "</tr>";

	return demonList;
}

function demonTableFooter() {
	return "</table>";
}

function showDemonList(html) {
	$("#demonData").hide();
	$("#demonList").html(html);
	$("#showAllDemonsBtn").show();
	$("#affinityFilterBtn").show();
	$("#affinityFilter").hide();
	$("#tribeListBtn").show();
	$("#tribeList").hide();
	$("#demonList").show();
}

function showTribe(index) {
	var demons = [ ];

	$.each(demonByNameEN, function(name, data) {
		if(tribeListJP.indexOf(data.tribe) == index) {
			demons.push(data);
		}
	});

	demons.sort(function(a, b) {
		if(a.level == b.level)
			return a.nameEN > b.nameEN ? 1 : -1;

		return a.level - b.level;
	});

	var demonList = demonTableHeader();

	$.each(demons, function(index, data) {
		demonList += demonTableEntry(data);
	});

	demonList += demonTableFooter();

	showDemonList(demonList);
}

function findAffinity() {
	var a = $("#affinitySelectA").val();
	var b = $("#affinitySelectB").val();
	var demons = [ ];

	$.each(demonByNameEN, function(name, data) {
		if(data.affinity[a] == b) {
			demons.push(data);
		}
	});

	demons.sort(function(a, b) {
		if(a.level == b.level)
			return a.nameEN > b.nameEN ? 1 : -1;

		return a.level - b.level;
	});

	var demonList = demonTableHeader();

	$.each(demons, function(index, data) {
		demonList += demonTableEntry(data);
	});

	demonList += demonTableFooter();

	showDemonList(demonList);
}

function restoreTribeList() {
	$("#showAllDemonsBtn").show();
	$("#affinityFilterBtn").show();
	$("#affinityFilter").hide();
	$("#tribeListBtn").hide();
	$("#demonData").hide();
	$("#demonList").hide();
	$("#tribeList").show();
	$("#demonSearch").val("");
}

function restoreAffinityFilter() {
	restoreTribeList();

	$("#showAllDemonsBtn").hide();
	$("#affinityFilterBtn").hide();
	$("#affinityFilter").show();
	$("#tribeListBtn").show();
	$("#tribeList").hide();
}

function showAllDemons() {
	var demons = [ ];

	$.each(demonByNameEN, function(name, data) {
		demons.push(data);
	});

	demons.sort(function(a, b) {
		if(a.level == b.level)
			return a.nameEN > b.nameEN ? 1 : -1;

		return a.level - b.level;
	});

	var demonList = demonTableHeader();

	$.each(demons, function(index, data) {
		demonList += demonTableEntry(data);
	});

	demonList += demonTableFooter();

	showDemonList(demonList);

	$("#showAllDemonsBtn").hide();
}

function showTab(name) {
	if(name == "demons") {
		$("#demonTab").show();
		$("#demonButton").removeClass("button_up");
		$("#demonButton").addClass("button_down");
	} else {
		$("#demonTab").hide();
		$("#demonButton").removeClass("button_down");
		$("#demonButton").addClass("button_up");
	}

	if(name == "skills") {
		$("#skillTab").show();
		$("#skillButton").removeClass("button_up");
		$("#skillButton").addClass("button_down");
	} else {
		$("#skillTab").hide();
		$("#skillButton").removeClass("button_down");
		$("#skillButton").addClass("button_up");
	}

	if(name == "comp") {
		$("#compTab").show();
		$("#compButton").removeClass("button_up");
		$("#compButton").addClass("button_down");
	} else {
		$("#compTab").hide();
		$("#compButton").removeClass("button_down");
		$("#compButton").addClass("button_up");
	}

	if(name == "walkthrough" || name == "walk") {
		$("#walkTab").show();
		$("#walkButton").removeClass("button_up");
		$("#walkButton").addClass("button_down");
	} else {
		$("#walkTab").hide();
		$("#walkButton").removeClass("button_down");
		$("#walkButton").addClass("button_up");
	}

	if(name == "apps") {
		$("#appTab").show();
		$("#appButton").removeClass("button_up");
		$("#appButton").addClass("button_down");
	} else {
		$("#appTab").hide();
		$("#appButton").removeClass("button_down");
		$("#appButton").addClass("button_up");
	}
}

function demonQuickList(demonNames) {
	var demons = [ ];

	$.each(demonNames, function(index, name) {
		demons.push(demonByNameEN[name.toLowerCase()]);
	});

	demons.sort(function(a, b) {
		if(a.level == b.level)
			return a.nameEN > b.nameEN ? 1 : -1;

		return a.level - b.level;
	});

	var demonList = demonTableHeader();

	$.each(demons, function(index, data) {
		demonList += demonTableEntry(data);
	});

	demonList += demonTableFooter();

	return demonList;
}
