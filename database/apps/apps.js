registerApp({
	"name": "Scout",
	"points": 1,
	"req": ["Complete Training Exercise I"],
	"desc": "Adds a talk skill to recruit demons during battle."
});

registerApp({
	"name": "Demon Analyze",
	"points": 20,
	"req": ["app:Scout"],
	"desc": "Installs a function that allows you to view enemy demon's abilities."
});

registerApp({
	"name": "Skill Smother 1",
	"points": 20,
	"req": ["app:Scout"],
	"desc": "???"
});

registerApp({
	"name": "Scout Gift",
	"points": 15,
	"req": ["app:Scout"],
	"desc": "Demons befriended through the Scout skill will give you an item."
});

registerApp({
	"name": "Negotiate",
	"points": 0,
	"req": ["app:Scout"],
	"desc": "???"
});
