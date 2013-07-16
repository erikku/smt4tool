skillNamesEN = [ ];
skillByNameJP = { };
skillByNameEN = { };

currentSkill = { };

function skillTableHeader() {
	var skillList = "";
	skillList += "<table>";
	skillList += "<th><a>Name</a></th>";
	skillList += "<th><a>MP</a></th>";
	skillList += "<th><a>Attribute</a></th>";
	skillList += "<th><a>Effect</a></th>";

	return skillList;
}

function skillClicked(obj) {
	showSkill(obj.innerText);
}

function registerSkill(data) {
	skillNamesEN.push(data.nameEN);
	skillByNameJP[data.nameJP.toLowerCase()] = data;
	skillByNameEN[data.nameEN.toLowerCase()] = data;
}

function skillTableEntry(data) {
	var skillList = "";
	skillList += "<tr>";
	skillList += "<td><a class=\"skillLink\" onClick=\"skillClicked(this);\">" +
		data.nameEN + "</a></td>";
	skillList += "<td>" + (data.cost < 0 ? "-" : data.cost) + "</td>";
	skillList += "<td>" + data.attribute + "</td>";
	skillList += "<td>" + data.effect + "</td>";
	skillList += "</tr>";

	return skillList;
}

function skillTableFooter() {
	return "</table>";
}

function showSkillList(html) {
	$("#skillData").hide();
	$("#skillList").html(html);
	$("#showAllSkillsBtn").show();
	$("#skillList").show();
}

function showAllSkills() {
	var skills = [ ];

	$.each(skillByNameEN, function(name, data) {
		skills.push(data);
	});

	skills.sort(function(a, b) {
		return a.nameEN > b.nameEN ? 1 : -1;
	});

	var skillList = skillTableHeader();

	$.each(skills, function(index, data) {
		skillList += skillTableEntry(data);
	});

	skillList += skillTableFooter();

	showSkillList(skillList);

	$("#showAllSkillsBtn").hide();
	$("#withSkillSection").hide();
}

function showSkill(name) {
	name = name.toLowerCase();

	if(!(name in skillByNameEN))
		return;

	var data = skillByNameEN[name];
	currentSkill = data;

	showTab("skills");

	$("#skillData_name").text(data.nameEN);
	$("#skillData_attribute").text(data.attribute);
	$("#skillData_cost").text(data.cost);
	$("#skillData_power").text(data.power);
	$("#skillData_hits").text(data.hits);
	$("#skillData_hit").text(data.hit);
	$("#skillData_target").text(data.target);
	$("#skillData_strengthen").text(data.strengthen <= 0 ?
		"-" : data.strengthen);
	$("#skillData_effect").text(data.effect);

	if(data.notes && data.notes.length > 1) {
		$("#skillData_notes").text(data.notes);
		$("#skillData_notesRow").show();
	} else {
		$("#skillData_notesRow").hide();
	}

	$("#skillList").hide();
	$('#skillData').show();
	$("#showAllSkillsBtn").show();
	$("#withSkillSection").hide();

	if(!demonSkillMapping[data.nameJP] ||
		!demonSkillMapping[data.nameJP].length) {
			$("#demonMatchList").hide();

			return;
	}

	var demons = demonSkillMapping[data.nameJP];

	demons.sort(function(a, b) {
		var aLvl = a.level;
		if(a.skills[data.nameJP] > 0)
			aLvl = a.skills[data.nameJP];

		var bLvl = b.level;
		if(b.skills[data.nameJP] > 0)
			bLvl = b.skills[data.nameJP];

		if(aLvl == bLvl)
			return a.nameEN > b.nameEN ? 1 : -1;

		return aLvl - bLvl;
	});

	var demonList = demonTableHeader();

	$.each(demons, function(index, data) {
		demonList += demonTableEntry(data);
	});

	demonList += demonTableFooter();

	$("#demonMatchList").show();
	$("#demonMatchList").html(demonList);
	$("#withSkillSection").show();
}
