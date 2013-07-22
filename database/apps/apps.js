registerApp({
	"name": "Skill Expansion 1",
	"points": 20,
	"req": ["Level 4"],
	"desc": "Adds 1 skill slot for your skills."
});

registerApp({
	"name": "Skill Expansion 2",
	"points": 30,
	"req": ["app:Skill Expansion 1"],
	"desc": "Adds 1 skill slot for your skills."
});

registerApp({
	"name": "Skill Expansion 3",
	"points": 30,
	"req": ["app:Skill Expansion 2"],
	"desc": "Adds 1 skill slot for your skills."
});

registerApp({
	"name": "Skill Expansion 4",
	"points": 40,
	"req": ["app:Skill Expansion 3"],
	"desc": "Adds 1 skill slot for your skills."
});

registerApp({
	"name": "Auto-Pinpoint",
	"points": 30,
	"req": ["Unknown"],
	"desc": "Allows for automatic targeting of enemy weaknesses in Auto-Battle."
});

registerApp({
	"name": "Demon Analyze",
	"points": 20,
	"req": ["app:Scout"],
	"desc": "Installs a function that allows you to view enemy demon's abilities."
});

registerApp({
	"name": "HP Recovery 1",
	"points": 35,
	"req": ["Unknown"],
	"desc": "Regenerates your HP while walking."
});

registerApp({
	"name": "MP Recovery 1",
	"points": 35,
	"req": ["Unknown"],
	"desc": "Regenerates your MP while walking."
});

registerApp({
	"name": "MP Recovery 2",
	"points": 40,
	"req": ["app:MP Recovery 1"],
	"desc": "Regenerates your MP while walking."
});

registerApp({
	"name": "Mapper",
	"points": 1,
	"req": ["Complete Training Exercise II"],
	"desc": "Installs a function that allows you to view enemy demon's abilities."
});

registerApp({
	"name": "Expand Stock 1",
	"points": 5,
	"req": ["Unknown"],
	"desc": "Adds 1 slot to your demon stock."
});

registerApp({
	"name": "Expand Stock 2",
	"points": 5,
	"req": ["app:Expand Stock 1"],
	"desc": "Adds 1 slot to your demon stock."
});

registerApp({
	"name": "Expand Stock 3",
	"points": 5,
	"req": ["app:Expand Stock 2"],
	"desc": "Adds 1 slot to your demon stock."
});

registerApp({
	"name": "Expand Stock 4",
	"points": 5,
	"req": ["app:Expand Stock 3"],
	"desc": "Adds 1 slot to your demon stock."
});

registerApp({
	"name": "Expand Stock 5",
	"points": 6,
	"req": ["app:Expand Stock 4"],
	"desc": "Adds 1 slot to your demon stock."
});

registerApp({
	"name": "Expand Stock 6",
	"points": 6,
	"req": ["app:Expand Stock 5"],
	"desc": "Adds 1 slot to your demon stock."
});

registerApp({
	"name": "Skill Smother 1",
	"points": 20,
	"req": ["app:Scout"],
	"desc": "Decreases the MP cost of demon's skills by 1."
});

registerApp({
	"name": "Demon Skill+1",
	"points": 20,
	"req": ["Unknown"],
	"desc": "Adds 1 skill slot for your demons."
});

registerApp({
	"name": "Demon Skill+2",
	"points": 25,
	"req": ["app:Demon Skill+1"],
	"desc": "Adds 1 skill slot for your demons."
});

registerApp({
	"name": "Demon Skill+3",
	"points": 30,
	"req": ["app:Demon Skill+2"],
	"desc": "Adds 1 skill slot for your demons."
});

registerApp({
	"name": "Demon Enhancer: St",
	"points": 25,
	"req": ["Unknown"],
	"desc": "Demons gain 1 more St than usual when leveling up."
});

registerApp({
	"name": "Demon Enhancer: Dx",
	"points": 25,
	"req": ["Unknown"],
	"desc": "Demons gain 1 more Dx than usual when leveling up."
});

registerApp({
	"name": "Demon Enhancer: Ma",
	"points": 25,
	"req": ["Unknown"],
	"desc": "Demons gain 1 more Ma than usual when leveling up."
});

registerApp({
	"name": "Demon Enhancer: Ag",
	"points": 25,
	"req": ["Unknown"],
	"desc": "Demons gain 1 more Ag than usual when leveling up."
});

registerApp({
	"name": "Demon Enhancer: Lu",
	"points": 25,
	"req": ["Unknown"],
	"desc": "Demons gain 1 more Lu than usual when leveling up."
});

registerApp({
	"name": "Skill Augment",
	"points": 60,
	"req": ["Unknown"],
	"desc": "Makes skills mutate."
});

registerApp({
	"name": "Gift Augment",
	"points": 45,
	"req": ["Unknown"],
	"desc": "Improves the quality of gifts you receive from your demons."
});

registerApp({
	"name": "Scout",
	"points": 1,
	"req": ["Complete Training Exercise I"],
	"desc": "Adds a talk skill to recruit demons during battle."
});

registerApp({
	"name": "Scout Gift",
	"points": 15,
	"req": ["app:Scout"],
	"desc": "Demons befriended through the Scout skill will give you an item."
});

registerApp({
	"name": "Scout Bonus",
	"points": 15,
	"req": ["app:Scout Gift"],
	"desc": "Demons befriended through the Scout skill will give you macca."
});

registerApp({
	"name": "Scout+",
	"points": 15,
	"req": ["app:Scout Bonus"],
	"desc": "Demons befriended through the Scout skill will recruit other demons."
});

registerApp({
	"name": "Expert Scout",
	"points": 15,
	"req": ["app:Scout+"],
	"desc": "Greatly decreases the demon's demands when using the Scout skill."
});

registerApp({
	"name": "Trade",
	"points": 10,
	"req": ["app:Scout Gift"],
	"desc": "Adds a talk skill to negotiate with a demon for items during battle."
});

registerApp({
	"name": "Trade+",
	"points": 20,
	"req": ["app:Trade"],
	"desc": "Receive additional items when using the Trade skill."
});

registerApp({
	"name": "Negotiate",
	"points": 20,
	"req": ["app:Scout"],
	"desc": "Adds a talk skill to negotiate with a cease-fire with demons."
});

registerApp({
	"name": "Fundraise",
	"points": 15,
	"req": ["app:Scout Gift"],
	"desc": "Adds a talk skill to ask a demon for Macca during battle."
});

registerApp({
	"name": "Fundraise+",
	"points": 30,
	"req": ["app:Fundraise"],
	"desc": "Receive additional Macca when using the Fundraise skill."
});

registerApp({
	"name": "Expert Fundraiser",
	"points": 40,
	"req": ["app:Fundraise+"],
	"desc": "Gradually increases the Macca gained when using the Fundraise skill."
});

registerApp({
	"name": "Talk EXP Boost 1",
	"points": 10,
	"req": ["Unknown"],
	"desc": "Increases the EXP gained through demon conversation by 1.2x."
});

registerApp({
	"name": "Demolingual",
	"points": 20,
	"req": ["Fail to talk to a demon"],
	"desc": "Adds an ability in battle to understand demons that one normally can't talk to."
});

registerApp({
	"name": "Demon Fusion",
	"points": 2,
	"req": ["Return to Naraku after Final Training Exercise"],
	"desc": "Installs the \"Cathedral of Shadows\" App that allows you to fuse demons."
});

registerApp({
	"name": "Demon Fusion Lite",
	"points": 20,
	"req": ["Unknown"],
	"desc": "Allows for simple, 2-demon fusion during battle."
});

registerApp({
	"name": "Fusion Booster 1",
	"points": 40,
	"req": ["Unknown"],
	"desc": "Increases the level ceiling for fusions by 1."
});

registerApp({
	"name": "Fusion EXP Boost 1",
	"points": 10,
	"req": ["Unknown"],
	"desc": "Increases EXP gained through demon fusion by 1.2x."
});

registerApp({
	"name": "Summon Discount 1",
	"points": 0,
	"req": ["Unknown"],
	"desc": "Lowers the Macca cost to summon demons from the Demon Compendium by 5%."
});

registerApp({
	"name": "Summon Discount 2",
	"points": 0,
	"req": ["app:Summon Discount 1"],
	"desc": "Lowers the Macca cost to summon demons from the Demon Compendium by 10%."
});

registerApp({
	"name": "Summon Discount 3",
	"points": 0,
	"req": ["app:Summon Discount 2"],
	"desc": "Lowers the Macca cost to summon demons from the Demon Compendium by 20%."
});

registerApp({
	"name": "Summon Discount 4",
	"points": 0,
	"req": ["app:Summon Discount 3"],
	"desc": "Lowers the Macca cost to summon demons from the Demon Compendium by 50%."
});
