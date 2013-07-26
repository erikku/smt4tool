/**
 * Database object constructor.
 */
function DatabaseImpl() {
	//
	// Private Variables
	//

	// Mapping of English names to tribe data.
	this.mTribeByNameEN = { };

	// Mapping of Japanese names to tribe data.
	this.mTribeByNameJP = { };

	// Array of English tribe names.
	this.mTribeNamesEN = [ ];

	// Mapping of English names to demon data.
	this.mDemonByNameEN = { };

	// Mapping of Japanese names to demon data.
	this.mDemonByNameJP = { };

	// Array of English demon names.
	this.mDemonNamesEN = [ ];

	// Mapping of Japanese demon names to their source mutation.
	this.mDemonReverseMutate = { };

	// Mapping of skills to an array of demons who know/learn the skill.
	this.mDemonSkillMapping = { };

	// Mapping of tribes to an array of demons who are part of the tribe.
	this.mDemonTribeMapping = { };

	// Mapping of English names to skill data.
	this.mSkillByNameEN = { };

	// Mapping of Japanese names to skill data.
	this.mSkillByNameJP = { };

	// Array of English skill names.
	this.mSkillNamesEN = [ ];

	// Mapping of English names to app data.
	this.mAppByNameEN = { };

	// Array of English app names.
	this.mAppNamesEN = [ ];
}

//
// Public Methods
//

/**
 * Register a new demon into the database.
 * @arg data The demon object to register.
 */
DatabaseImpl.prototype.registerDemon = function(data) {
	// Make sure that a demon with the same name is not already found.
	if(this.demonByNameEN(data.nameEN) !== undefined ||
		this.demonByNameJP(data.nameJP) !== undefined) {
			alert("Duplicate demon: " + data.nameEN);

			return;
	}

	// Add the demon to all the lookup hash tables.
	this.mDemonNamesEN.push(data.nameEN);
	this.mDemonByNameJP[data.nameJP] = data;
	this.mDemonByNameEN[data.nameEN.toLowerCase()] = data;

	// Add each skill the demon has to the demon-skill mapping.
	// NOTE: this.mDemonSkillMapping does not work inside the loop function!
	$.each(data.skills, function(skill, level) {
		// If this is the first demon for this skill, create a new array;
		// otherwise, add the demon to the array.
		if(skill in Database.mDemonSkillMapping)
			Database.mDemonSkillMapping[skill].push(data);
		else
			Database.mDemonSkillMapping[skill] = [data];
	});

	// Add the dmeon to the tribe mapping.
	if(data.tribe in Database.mDemonTribeMapping)
		Database.mDemonTribeMapping[data.tribe].push(data);
	else
		Database.mDemonTribeMapping[data.tribe] = [data];

	// Add the reverse mutation (if there is one).
	if(data.mutate) {
		this.mDemonReverseMutate[data.mutate.target] = {
			"source": data.nameJP,
			"level": data.mutate.level
		}
	}
}

/**
 * Register a new tribe into the database.
 * @arg data The tribe object to register.
 */
DatabaseImpl.prototype.registerTribe = function(data) {
	// Make sure that a tribe with the same name is not already found.
	if(this.tribeByNameEN(data.nameEN) !== undefined ||
		this.tribeByNameJP(data.nameJP) !== undefined) {
			alert("Duplicate tribe: " + data.nameEN);

			return;
	}

	// Add the tribe to all the lookup hash tables.
	this.mTribeNamesEN.push(data.nameEN);
	this.mTribeByNameJP[data.nameJP] = data;
	this.mTribeByNameEN[data.nameEN.toLowerCase()] = data;
}

/**
 * Register a new skill into the database.
 * @arg data The skill object to register.
 */
DatabaseImpl.prototype.registerSkill = function(data) {
	// Make sure that a skill with the same name is not already found.
	if(this.skillByNameEN(data.nameEN) !== undefined ||
		this.skillByNameJP(data.nameJP) !== undefined) {
			alert("Duplicate skill: " + data.nameEN);

			return;
	}

	// Add the skill to all the lookup hash tables.
	this.mSkillNamesEN.push(data.nameEN);
	this.mSkillByNameJP[data.nameJP] = data;
	this.mSkillByNameEN[data.nameEN.toLowerCase()] = data;
}

DatabaseImpl.prototype.registerApp = function(data) {
	// Make sure that an app with the same name is not already found.
	if(this.appByNameEN(data.name) !== undefined) {
		alert("Duplicate app: " + data.name);

		return;
	}

	// Add the app to all the lookup hash tables.
	this.mAppNamesEN.push(data.name);
	this.mAppByNameEN[data.name.toLowerCase()] = data;
}

/**
 * Find the tribe with the given English name.
 * @arg name English name of the tribe.
 * @returns The tribe object or undefined if the tribe was not found.
 */
DatabaseImpl.prototype.tribeByNameEN = function(name) {
	return this.mTribeByNameEN[name.toLowerCase()];
}

/**
 * Find the tribe with the given Japanese name.
 * @arg name Japanese name of the tribe.
 * @returns The tribe object or undefined if the tribe was not found.
 */
DatabaseImpl.prototype.tribeByNameJP = function(name) {
	return this.mTribeByNameJP[name];
}

/**
 * Get the list of English tribe names.
 * @returns The list of English tribe names.
 */
DatabaseImpl.prototype.tribeNamesEN = function() {
	return this.mTribeNamesEN;
}

/**
 * Get the number of tribes in the database.
 * @returns The number of tribes in the database.
 */
DatabaseImpl.prototype.tribeCount = function() {
	return this.mTribeNamesEN.length;
}

/**
 * Find the demon with the given English name.
 * @arg name English name of the demon.
 * @returns The demon object or undefined if the demon was not found.
 */
DatabaseImpl.prototype.demonByNameEN = function(name) {
	return this.mDemonByNameEN[name.toLowerCase()];
}

/**
 * Find the demon with the given Japanese name.
 * @arg name Japanese name of the demon.
 * @returns The demon object or undefined if the demon was not found.
 */
DatabaseImpl.prototype.demonByNameJP = function(name) {
	return this.mDemonByNameJP[name];
}

/**
 * Find the skill with the given English name.
 * @arg name English name of the skill.
 * @returns The skill object or undefined if the skill was not found.
 */
DatabaseImpl.prototype.skillByNameEN = function(name) {
	return this.mSkillByNameEN[name.toLowerCase()];
}

/**
 * Find the skill with the given Japanese name.
 * @arg name Japanese name of the skill.
 * @returns The skill object or undefined if the skill was not found.
 */
DatabaseImpl.prototype.skillByNameJP = function(name) {
	return this.mSkillByNameJP[name];
}

/**
 * Find the app with the given English name.
 * @arg name English name of the app.
 * @returns The app object or undefined if the app was not found.
 */
DatabaseImpl.prototype.appByNameEN = function(name) {
	return this.mAppByNameEN[name.toLowerCase()];
}

/**
 * Get a list of all demons, sorted by level (and then name).
 * @returns The array of demon objects.
 */
DatabaseImpl.prototype.allDemonsByLevel = function() {
	var demons = [ ];

	// Add each demon to the list.
	$.each(this.mDemonByNameEN, function(name, data) {
		demons.push(data);
	});

	// Sort the list by level and then name.
	demons.sort(function(a, b) {
		if(a.level == b.level)
			return a.nameEN > b.nameEN ? 1 : -1;

		return a.level - b.level;
	});

	return demons;
}

/**
 * Get a list of all demons in a tribe, sorted by level (and then name).
 * @arg tribe Japanese name of the tribe to get.
 * @returns The array of demon objects.
 */
DatabaseImpl.prototype.tribeDemonsByLevel = function(tribe) {
	var demons = [ ];

	// Add each demon to the list.
	$.each(this.mDemonTribeMapping[tribe], function(name, data) {
		demons.push(data);
	});

	// Sort the list by level and then name.
	demons.sort(function(a, b) {
		if(a.level == b.level)
			return a.nameEN > b.nameEN ? 1 : -1;

		return a.level - b.level;
	});

	return demons;
}

/**
 * Get a list of all demons with the requested affinity,
 * sorted by level (and then name).
 * @arg a The affinity type (physical, gun, fire, etc.).
 * @arg b The affinity (null, reflect, absorb, etc.).
 * @returns The array of demon objects.
 */
DatabaseImpl.prototype.affinityDemonsByLevel = function(a, b) {
	var demons = [ ];

	// Add each demon to the list.
	$.each(this.mDemonByNameJP, function(name, data) {
		if(data.affinity[a] == b)
			demons.push(data);
	});

	// Sort the list by level and then name.
	demons.sort(function(a, b) {
		if(a.level == b.level)
			return a.nameEN > b.nameEN ? 1 : -1;

		return a.level - b.level;
	});

	return demons;
}

/**
 * Determine if a demon with the given English name exists in the database.
 * @arg name English name of the demon to look for.
 * @returns true if the demon exists, false otherwise.
 */
DatabaseImpl.prototype.demonExistsEN = function(name) {
	return name.toLowerCase() in this.mDemonByNameEN;
}

/**
 * Determine if a skill with the given English name exists in the database.
 * @arg name English name of the skill to look for.
 * @returns true if the skill exists, false otherwise.
 */
DatabaseImpl.prototype.skillExistsEN = function(name) {
	return name.toLowerCase() in this.mSkillByNameEN;
}

/**
 * Determine if a app with the given English name exists in the database.
 * @arg name English name of the app to look for.
 * @returns true if the app exists, false otherwise.
 */
DatabaseImpl.prototype.appExistsEN = function(name) {
	return name.toLowerCase() in this.mAppByNameEN;
}

/**
 * Convert the Japanese tribe name into an English tribe name.
 * @arg name Japanese tribe name to search for.
 * @returns The matching English tribe name.
 */
DatabaseImpl.prototype.translateTribeJP = function(name) {
	return this.mTribeByNameJP[name].nameEN;
}

/**
 * Get the demon data for the elemental result if you fuse two demons from the
 * given tribe.
 * @arg name Japanese tribe name.
 * @returns The resulting elemental demon data or undefined if there is none.
 */
DatabaseImpl.prototype.elementalForTribeJP = function(name) {
	// Fetch the tribe data.
	var tribe = this.mTribeByNameJP[name];

	// If the tribe was found, find the elemental demon.
	if(tribe !== undefined)
		return this.demonByNameJP(tribe.elemental);

	return undefined;
}

/**
 * Get the elemental rank up/down information from the given tribe.
 * @arg name Japanese tribe name.
 * @returns The elemental rank up/down information.
 */
DatabaseImpl.prototype.elementalRanksForTribeJP = function(name) {
	// Fetch the tribe data.
	var tribe = this.mTribeByNameJP[name];

	// If the tribe was found, find the elemental rank information.
	if(tribe !== undefined)
		return tribe.ranks;

	return undefined;
}

/**
 * Get the source demon you can mutate into the requested demon.
 * @arg name Japanese name of the resulting demon.
 * @returns Object with the source demon and mutation level or undefined
 * if there is no mutation.
 */
DatabaseImpl.prototype.reverseDemonMutateJP = function(name) {
	return this.mDemonReverseMutate[name];
}

/**
 * Get a list of all skills, sorted by name.
 * @returns The array of skill objects.
 */
DatabaseImpl.prototype.allSkillsByName = function() {
	var skills = [ ];

	// Add each demon to the list.
	$.each(this.mSkillByNameEN, function(name, data) {
		skills.push(data);
	});

	// Sort the list by level and then name.
	skills.sort(function(a, b) {
		return a.nameEN > b.nameEN ? 1 : -1;
	});

	return skills;
}

/**
 * Get a list of all apps, sorted by name.
 * @returns The array of app objects.
 */
DatabaseImpl.prototype.allAppsByName = function() {
	var apps = [ ];

	// Add each app to the list.
	$.each(this.mAppByNameEN, function(name, data) {
		apps.push(data);
	});

	// Sort the list by level and then name.
	apps.sort(function(a, b) {
		return a.name > b.name ? 1 : -1;
	});

	return apps;
}

/**
 * Get a list of all demons, sorted by level and then name, that have the
 * given skill.
 * @arg name Japanese name of the skill.
 * @returns The array of demon objects.
 */
DatabaseImpl.prototype.demonSkillMappingJP = function(name) {
	// If there is no demons for the skill, return an empty array.
	if(this.mDemonSkillMapping[name] === undefined)
		return [ ];

	// Sort the skills.
	this.mDemonSkillMapping[name].sort(function(a, b) {
		// Use the base level.
		var aLvl = a.level;

		// If the demon does not start with the skill, use the acquire level.
		if(a.skills[name] > 0)
			aLvl = a.skills[name];

		// Use the base level.
		var bLvl = b.level;

		// If the demon does not start with the skill, use the acquire level.
		if(b.skills[name] > 0)
			bLvl = b.skills[name];

		// If the levels are equal, sort by name.
		if(aLvl == bLvl)
			return a.nameEN > b.nameEN ? 1 : -1;

		// Sort by level.
		return aLvl - bLvl;
	});

	return this.mDemonSkillMapping[name];
}


// Singleton for the database.
var Database = new DatabaseImpl();
