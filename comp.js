function addToCOMP() {
	compList.push({
		"nameJP": currentDemon.nameJP,
		"level": currentDemon.level,
		"skills": currentDemon.skill
	});

	showTab("comp");
	refleshCOMP();
}

function refleshCOMP() {
	//
}
