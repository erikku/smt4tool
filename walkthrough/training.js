$('#walkthrough').empty().walkHeader("intro", undefined
	).append("<h1>Training Exercise</h1>"
	).append("<h2>Demons Seen Here</h2>"
		).demonList(["Centaur", "Fuxi", "Lham Dearg", "Mokoi", "Napaea",
			"Slime", "Griffon", "Chagrin", "Myrmecoleon"]
		).quest({
			"name": "Training Exercise I",
			"stars": 1,
			"client": "Hope",
			"reward": "150 Macca",
			"task": "Slay some demons.",
			"desc": "This is the first training exercise. A Samurai must " +
				"learn to battle with demons. Your target may be any demon " +
				"you find. Defeat demons inside Naraku."
		}).append($.create("p").append("It's not that hard to defeat your " +
			"first enemy. You can pretty much attack (and that's pretty " +
			"much all you can do until you get demons in your party). If " +
			"you need more help, the game will explain the battle system.")
		).quest({
			"name": "Training Exercise II",
			"stars": 1,
			"client": "Hope",
			"reward": "150 Macca",
			"task": "Recruit 3 demons into your party.",
			"desc": "This is the second training exercise. A Samurai does " +
				"not only battle demons. It is essential at times that you " +
				"strengthen your forces by recruiting demons to your side. " +
				"Once you have acquired three demons, which may be any you " +
				"encounter, the quest will be complete."
		}).append($.create("p").append("I strongly suggest that "
			).demonLink("Napaea").append(" be your first or second " +
			"contracted demon. A single round of battle can easily leave " +
			"you inches from death. Save after you contract each demon. Try " +
			"to avoid actual battle during this process. When scouting, try " +
			"not to give up too many items. You can use the \"Cheat\" " +
			"option to avoid this; however, note that using this multiple " +
			"times in a conversation usually does not work. If you fail and " +
			"lose items, I suggest reloading and trying again as opposed " +
			"to wasting your HP, MP, and items. Remember that if the " +
			"conversation failed and the demon leaves, if you didn't burn " +
			"a lot of items you will have gained free experience! Once you " +
			"have a full party, you should have enough press turns for " +
			"normal combat.")
		).append($.create("p").append("Here is a list of useful skills you " +
			"may want to add to your party as you work your way through " +
			"this area (and one or two of the fastest demons to get them " +
			"from):")).append($.create("ul"
				).append($.create("li").skillLink("Agi").append(": "
					).demonLink("Onmoraki").append(" (3), "
					).demonLink("Melchom").append(" (5)")
				).append($.create("li").skillLink("Bufu").append(": "
					).demonLink("Centaur").append(" (1)")
				).append($.create("li").skillLink("Zio").append(": "
					).demonLink("Mokoi").append(" (2)")
				).append($.create("li").skillLink("Zan").append(": "
					).demonLink("Fuxi").append(" (1), "
					).demonLink("Napaea").append(" (2=>3)")
				).append($.create("li").skillLink("Hama").append(": "
					).demonLink("Tam Lin").append(" (13)")
				).append($.create("li").skillLink("Mudo").append(": "
					).demonLink("Dybbuk").append(" (4), "
					).demonLink("Strigoii").append(" (6)")
				).append($.create("li").skillLink("Maragi").append(": "
					).demonLink("Spriggan").append(" (11=>13)")
				).append($.create("li").skillLink("Mabufu").append(": "
					).demonLink("Gremlin").append(" (10)")
				).append($.create("li").skillLink("Mazio").append(": "
					).demonLink("Vodyanik").append(" (6)")
				).append($.create("li").skillLink("Mazan").append(": "
					).demonLink("Harpy").append(" (9)")
				).append($.create("li").skillLink("Dia").append(": "
					).demonLink("Napaea").append(" (2)")
				).append($.create("li").skillLink("Media").append(": "
					).demonLink("Apraras").append(" (8)")
				).append($.create("li").skillLink("Tarukaja").append(": "
					).demonLink("Dwarf").append(" (4)")
				).append($.create("li").skillLink("Rakukaja").append(": "
					).demonLink("Angel").append(" (3=>5)")
				).append($.create("li").skillLink("Sukukaja").append(": "
					).demonLink("Tangata Manu").append(" (2=>4)"))
		).append($.create("p").append("Once you have all these skills you " +
			"may wish to fuse them into some demons with decent MP and " +
			"magic like ").demonLink("Apsaras").append(" or "
			).demonLink("Strigolii").append(". ").demonLink("Fomor").append(
			" makes a decent melee demon. Remember that you gain 10 app " +
			"points for every level you gain. I suggest you go for the ").appLink(
			"Demon Skill+1").append(" app first. The more skills you can " +
			"keep, the better you can exploit weakpoints while still being " +
			"able to use buffs, debuffs, and healing.</p>")
		).quest({
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
		});
