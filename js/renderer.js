/**
 * Renderer object constructor.
 */
function RendererImpl() {
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
 * Convert the affinity value to HTML.
 * @arg affinity The value to convert.
 * @returns The equivalent HTML.
 */
RendererImpl.prototype.handleAffinity = function(affinity) {
	// Convert the affinity to colored text with the proper translation.
	if(affinity == "null")
		return $.create("a").addClass("affinityNull").text("Null");
	else if(affinity == "weak")
		return $.create("a").addClass("affinityWeak").text("Weak");
	else if(affinity == "protect")
		return $.create("a").addClass("affinityProtect").text("Resist");
	else if(affinity == "reflect")
		return $.create("a").addClass("affinityReflect").text("Repel");
	else if(affinity == "absorb")
		return $.create("a").addClass("affinityDrain").text("Drain");
	else
		return $.create("a").addClass("affinityNormal").text("N/A");
}

/**
 * Convert the elemental rank data to text.
 * @arg rank Elemental rank data (one of u, d, -).
 * @returns The equivalent text.
 */
RendererImpl.prototype.handleRank = function(rank) {
	if(rank == "u")
		return "Up";
	else if(rank == "d")
		return "Down";
	else
		return "-";
}

// Singleton for the renderer.
var Renderer = new RendererImpl();
