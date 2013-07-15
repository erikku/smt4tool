$('#walkthrough').html(walkthroughHeader("intro", "find_navarre") + "<h1>Training Exercise</h1>" +
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
}) +
htmlQuest({
	"name": "Training Exercise II",
	"stars": 1,
	"client": "Hope",
	"reward": "150 Macca",
	"task": "Recruit 3 demons into your party.",
	"desc": "This is the second training exercise. A Samurai does not only " +
		"battle demons. It is essential at times that you strengthen your " +
		"forces by recruiting demons to your side. Once you have acquired " +
		"three demons, which may be any you encounter, the quest will be " +
		"complete."
}) +
"<p>I strongly suggest that " + htmlDemonLink("Napaea") + " be your first or second contracted demon. A single round of battle can easily leave you inches from death. Save after you contract each demon. Try to avoid actual battle during this process. When scouting, try not to give up too many items. You can use the \"Cheat\" option to avoid this; however, note that using this multiple times in a conversation usually does not work. If you fail and lose items, I suggest reloading and trying again as opposed to wasting your HP, MP, and items. Remember that if the conversation failed and the demon leaves, if you didn't burn a lot of items you will have gained free experience! Once you have a full party, you should have enough press turns for normal combat.</p>" +
"<p>Here is a list of useful skills you may want to add to your party as you work your way through this area (and one or two of the fastest demons to get them from):</p>" +
"<ul>" +
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
"<p>Once you have all these skills you may wish to fuse them into some demons with decent MP and magic like " + htmlDemonLink("Apsaras") + " or " + htmlDemonLink("Strigolii") + ". " + htmlDemonLink("Fomor") + " makes a decent melee demon. Remember that you gain 10 app points for every level you gain. I suggest you go for the ___ apps first. The more skills you can keep, the better you can exploit weakpoints while still being able to use buffs, debuffs, and healing.</p>" +
htmlQuest({
	"name": "Final Training Exercise",
	"stars": 1,
	"client": "Hope",
	"reward": "500 Macca",
	"task": "Obtain the valuable item and return Aquila Plaza.",
	"desc": "This is the final training exercise. A Samurai must have a " +
		"thorough grasp on his surroundings. I have hidden a certain item " +
		"of value in the 2nd Stratum of Naraku. Find it and return to " +
		"Aquila Statue Plaza with it. And make no inquiries regarding its " +
		"nature..."
}));
