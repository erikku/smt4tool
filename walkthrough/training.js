$('#walkthrough').html(walkthroughHeader("intro", "find_navarre") + "<h1>Training Exercise</h1>" +
"<ul>" +
	"<p>Here is a list of useful skills you may want to add to your party as you work your way through this area (and one or two of the fastest demons to get them from):</p>" +
	"<li>" + htmlSkillLink("Agi") + ": " + htmlDemonLink("Onmoraki") + " (3), " + htmlDemonLink("Melchom") + " (5)</li>" +
	"<li>" + htmlSkillLink("Bufu") + ": " + htmlDemonLink("Centaur") + " (1)</li>" +
	"<li>" + htmlSkillLink("Zio") + ": " + htmlDemonLink("Mokoi") + " (2)</li>" +
	"<li>" + htmlSkillLink("Zan") + ": " + htmlDemonLink("Fukei") + " (1), " + htmlDemonLink("Napaea") + " (2=>3)</li>" +
	"<li>" + htmlSkillLink("Hama") + ": " + htmlDemonLink("Tam Lin") + " (13)</li>" +
	"<li>" + htmlSkillLink("Mudo") + ": " + htmlDemonLink("Dybbuk") + " (4), " + htmlDemonLink("Strigoii") + " (6)</li>" +
	"<li>" + htmlSkillLink("Maragi") + ": " + htmlDemonLink("Spriggan") + " (11=>13)</li>" +
	"<li>" + htmlSkillLink("Mabufu") + ": " + htmlDemonLink("Gremlin") + " (10)</li>" +
	"<li>" + htmlSkillLink("Mazio") + ": " + htmlDemonLink("Vodyanoy") + " (6)</li>" +
	"<li>" + htmlSkillLink("Mazan") + ": " + htmlDemonLink("Harpy") + " (9)</li>" +
	"<li>" + htmlSkillLink("Dai") + ": " + htmlDemonLink("Napaea") + " (2)</li>" +
	"<li>" + htmlSkillLink("Media") + ": " + htmlDemonLink("Apraras") + " (8)</li>" +
	"<li>" + htmlSkillLink("Tarukaja") + ": " + htmlDemonLink("Dwarf") + " (4)</li>" +
	"<li>" + htmlSkillLink("Rakukaja") + ": " + htmlDemonLink("Angel") + " (3=>5)</li>" +
	"<li>" + htmlSkillLink("Sukukaja") + ": " + htmlDemonLink("Tangata Manu") + " (2=>4)</li>" +
"</ul>" +
"<h2>Demons Seen Here</h2>" + demonQuickList(["Centaur", "Fukei", "Lham Dearg", "Mokoi", "Napaea", "Slime", "Griffon"]) +
htmlQuest({
	"name": "Training Exercise I",
	"stars": 1,
	"client": "Hope",
	"reward": "150 Macca",
	"task": "Slay some demons.",
	"desc": "This is the first training exercise. A Samurai must learn to " +
		"battle with demons. Your target may be any demon you find. " +
		"Defeat demons inside Naraku."
}));
