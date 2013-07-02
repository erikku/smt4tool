tribeListJP = [
	// Law
	"大天使", "女神", "霊鳥", "神樹", "天使", "妖鳥", "妖魔", "天女", "邪神", "凶鳥",
	"妖樹",
	// Neutral
	"魔神", "神獣", "聖獣", "幻魔", "妖精", "魔獣", "地霊", "龍王", "死神", "妖獣",
	"邪鬼", "妖虫",
	// Chaos
	"破壊神", "地母神", "龍神", "鬼神", "堕天使", "妖鬼", "鬼女", "夜魔", "魔王",
	"邪龍", "悪霊", "外道", "幽鬼",
	// Special
	"精霊", "魔人", "秘神", "フード", "狂神", "威霊", "天津神", "国津神", "英傑",
	"屍鬼"];
tribeListEN = [
	// Law
	"Herald", "Megami", "Avian", "Tree", "Divine", "Flight", "Yoma", "Nymph",
	"Vile", "Raptor", "Wood",
	// Neutral
	"Deity", "Avatar", "Genma", "Fairy", "Beast", "Jirae", "Dragon King",
	"Reaper", "Raptor", "Wilder", "Jaki", "Vermin",
	// Chaos
	"Fury", "Lady", "Dragon God", "Kishin", "Fallen", "Brute", "Femme",
	"Night", "Tyrant", "Evil Dragon", "Spirit", "Foul", "Haunt",
	// Special
	"Element", "Fiend", "Enigma", "Food", "Zealot", "Entity", "Amatsukami",
	"Kunitsukami", "Hero", "Undead"];
tribeLNC = ["L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "L", "N", "N",
	"N", "N", "N", "N", "N", "N", "N", "N", "N", "N", "C", "C", "C", "C", "C",
	"C", "C", "C", "C", "C", "C", "C", "C", "S", "S", "S", "S", "S", "S", "S",
	"S", "S", "S"];

demonNamesEN = [ ];
demonByNameEN = { };

// Each entry has a key of the skill name (in Japanese) that contains an array
// of demons who learn the skill (at any level - check this in the demon!).
demonSkillMapping = { };

// Order is the same as the tribe list. For example, to combine 女神 and 霊鳥:
// var a = tribeListJP.indexOf("女神");
// var b = tribeListJP.indexOf("霊鳥");
// var result = fusionChart[a][b];
// from there you can use the levels to calculate which demon in the tribe.
// Note: This is in Japanese because there is no "translation" to change.
fusionChart = [["－", "幻魔", "天使", "天使", "邪神", "霊鳥", "神樹", "女神", "－", "－", "－", "女神", "霊鳥", "霊鳥", "女神", "天使", "神獣", "魔神", "妖鳥", "－", "－", "－", "－", "死神", "女神", "破壊神", "－", "－", "妖鳥", "天女", "妖魔", "－", "－", "－", "邪神", "－"],
["幻魔", "精霊", "天女", "大天使", "妖魔", "天使", "天女", "神樹", "－", "－", "－", "神獣", "魔神", "霊鳥", "神樹", "幻魔", "堕天使", "神樹", "妖樹", "－", "－", "－", "－", "地母神", "魔神", "大天使", "幻魔", "外道", "天女", "－", "天女", "－", "－", "－", "地母神", "－"],
["天使", "天女", "精霊", "妖鳥", "妖鳥", "天使", "外道", "神樹", "－", "－", "－", "聖獣", "大天使", "妖鳥", "聖獣", "女神", "妖鳥", "妖魔", "－", "－", "－", "－", "－", "大天使", "破壊神", "神獣", "夜魔", "凶鳥", "幻魔", "女神", "凶鳥", "－", "－", "－", "凶鳥", "－"],
["天使", "大天使", "妖鳥", "精霊", "大天使", "霊鳥", "幻魔", "女神", "－", "－", "－", "妖魔", "天女", "魔獣", "妖精", "幻魔", "神獣", "妖精", "妖鳥", "－", "－", "－", "－", "－", "龍神", "龍王", "地霊", "邪神", "地霊", "地母神", "妖魔", "－", "－", "－", "妖樹", "－"],
["邪神", "妖魔", "妖鳥", "大天使", "精霊", "霊鳥", "妖鳥", "女神", "凶鳥", "－", "凶鳥", "大天使", "妖精", "神獣", "天女", "天女", "聖獣", "堕天使", "妖虫", "邪神", "凶鳥", "邪龍", "凶鳥", "堕天使", "外道", "邪龍", "龍王", "－", "地霊", "天女", "女神", "凶鳥", "凶鳥", "邪鬼", "堕天使", "邪鬼"],
["霊鳥", "天使", "天使", "霊鳥", "霊鳥", "精霊", "天女", "霊鳥", "凶鳥", "妖虫", "凶鳥", "大天使", "妖虫", "神獣", "神獣", "天使", "妖魔", "凶鳥", "魔獣", "悪霊", "外道", "凶鳥", "凶鳥", "堕天使", "夜魔", "－", "霊鳥", "天使", "魔獣", "魔獣", "堕天使", "邪龍", "外道", "凶鳥", "龍王", "凶鳥"],
["神樹", "天女", "外道", "幻魔", "妖鳥", "天女", "精霊", "妖精", "邪鬼", "妖樹", "邪龍", "妖精", "地霊", "龍王", "夜魔", "天使", "神獣", "地母神", "妖鳥", "幽鬼", "妖虫", "幽鬼", "妖獣", "夜魔", "幽鬼", "幻魔", "魔王", "龍王", "邪鬼", "幽鬼", "地霊", "邪鬼", "妖虫", "幽鬼", "夜魔", "－"],
["女神", "神樹", "神樹", "女神", "女神", "霊鳥", "妖精", "精霊", "外道", "幽鬼", "凶鳥", "鬼女", "妖精", "天使", "女神", "女神", "神獣", "聖獣", "妖樹", "悪霊", "－", "幽鬼", "－", "鬼女", "－", "地母神", "天使", "神獣", "鬼女", "－", "鬼女", "邪鬼", "－", "幽鬼", "鬼女", "悪霊"],
["－", "－", "－", "－", "凶鳥", "凶鳥", "邪鬼", "外道", "－", "邪龍", "邪鬼", "－", "－", "－", "－", "邪鬼", "妖獣", "邪鬼", "邪龍", "魔王", "凶鳥", "幽鬼", "凶鳥", "－", "－", "－", "－", "凶鳥", "邪鬼", "邪鬼", "邪鬼", "死神", "妖獣", "幽鬼", "魔王", "凶鳥"],
["－", "－", "－", "－", "－", "妖虫", "妖樹", "幽鬼", "邪龍", "－", "邪神", "－", "－", "－", "－", "妖樹", "妖虫", "外道", "妖虫", "悪霊", "妖虫", "－", "悪霊", "－", "－", "－", "－", "邪龍", "幽鬼", "妖樹", "妖樹", "妖虫", "妖虫", "妖獣", "霊鳥", "妖獣"],
["－", "－", "－", "－", "凶鳥", "凶鳥", "邪龍", "凶鳥", "邪鬼", "邪神", "－", "－", "－", "－", "－", "幽鬼", "妖獣", "妖虫", "邪龍", "悪霊", "凶鳥", "－", "悪霊", "－", "－", "－", "－", "－", "凶鳥", "凶鳥", "外道", "邪龍", "凶鳥", "凶鳥", "神樹", "死神"],
["女神", "神獣", "聖獣", "妖魔", "大天使", "大天使", "妖精", "鬼女", "－", "－", "－", "－", "幻魔", "神獣", "死神", "幻魔", "聖獣", "妖鬼", "魔獣", "－", "－", "－", "－", "地母神", "聖獣", "地母神", "破壊神", "破壊神", "地霊", "龍王", "妖魔", "－", "－", "－", "死神", "－"],
["霊鳥", "魔神", "大天使", "天女", "妖精", "妖虫", "地霊", "妖精", "－", "－", "－", "幻魔", "精霊", "魔獣", "魔神", "鬼神", "霊鳥", "神樹", "龍神", "－", "－", "－", "－", "龍神", "神樹", "破壊神", "龍神", "龍王", "聖獣", "聖獣", "魔獣", "－", "－", "－", "妖獣", "－"],
["霊鳥", "霊鳥", "妖鳥", "魔獣", "神獣", "神獣", "龍王", "天使", "－", "－", "－", "神獣", "魔獣", "精霊", "妖精", "魔獣", "霊鳥", "悪霊", "龍神", "－", "－", "－", "－", "龍王", "魔神", "神樹", "妖鬼", "魔獣", "邪鬼", "地霊", "地霊", "－", "－", "－", "妖虫", "－"],
["女神", "神樹", "聖獣", "妖精", "天女", "神獣", "夜魔", "女神", "－", "－", "－", "死神", "魔神", "妖精", "精霊", "魔神", "聖獣", "死神", "神獣", "－", "－", "－", "－", "鬼神", "鬼神", "夜魔", "妖鬼", "聖獣", "鬼神", "鬼神", "妖鬼", "－", "－", "－", "幽鬼", "－"],
["天使", "幻魔", "女神", "幻魔", "天女", "天使", "天使", "女神", "邪鬼", "妖樹", "幽鬼", "幻魔", "鬼神", "魔獣", "魔神", "精霊", "妖鳥", "夜魔", "霊鳥", "悪霊", "妖樹", "幽鬼", "妖樹", "魔神", "幻魔", "夜魔", "神樹", "夜魔", "鬼女", "地母神", "妖鬼", "幽鬼", "妖樹", "幽鬼", "地霊", "妖樹"],
["神獣", "堕天使", "妖鳥", "神獣", "聖獣", "妖魔", "神獣", "神獣", "妖獣", "妖虫", "妖獣", "聖獣", "霊鳥", "霊鳥", "聖獣", "妖鳥", "精霊", "妖魔", "妖獣", "悪霊", "妖虫", "妖獣", "妖獣", "龍王", "龍王", "妖獣", "聖獣", "龍王", "龍王", "聖獣", "地霊", "妖獣", "外道", "妖獣", "妖鳥", "妖獣"],
["魔神", "神樹", "妖魔", "妖精", "堕天使", "凶鳥", "地母神", "聖獣", "邪鬼", "外道", "妖虫", "妖鬼", "神樹", "悪霊", "死神", "夜魔", "妖魔", "精霊", "堕天使", "悪霊", "妖樹", "幽鬼", "外道", "妖鬼", "鬼神", "地母神", "神樹", "龍神", "妖精", "妖鬼", "妖精", "邪鬼", "妖獣", "邪鬼", "妖精", "邪鬼"],
["妖鳥", "妖樹", "－", "妖鳥", "妖虫", "魔獣", "妖鳥", "妖樹", "邪龍", "妖虫", "邪龍", "魔獣", "龍神", "龍神", "神獣", "霊鳥", "妖獣", "堕天使", "精霊", "悪霊", "邪龍", "邪龍", "邪龍", "龍神", "鬼女", "堕天使", "龍神", "龍神", "龍神", "邪龍", "妖魔", "邪龍", "妖虫", "邪龍", "魔獣", "妖樹"],
["－", "－", "－", "－", "邪神", "悪霊", "幽鬼", "悪霊", "魔王", "悪霊", "悪霊", "－", "－", "－", "－", "悪霊", "悪霊", "悪霊", "悪霊", "－", "悪霊", "幽鬼", "悪霊", "－", "－", "－", "－", "魔王", "悪霊", "悪霊", "幽鬼", "邪神", "悪霊", "妖樹", "邪神", "悪霊"],
["－", "－", "－", "－", "凶鳥", "外道", "妖虫", "－", "凶鳥", "妖虫", "凶鳥", "－", "－", "－", "－", "妖樹", "妖虫", "妖樹", "邪龍", "悪霊", "－", "邪龍", "悪霊", "－", "－", "－", "－", "凶鳥", "邪鬼", "－", "妖虫", "邪龍", "妖樹", "邪龍", "聖獣", "妖樹"],
["－", "－", "－", "－", "邪龍", "凶鳥", "幽鬼", "幽鬼", "幽鬼", "－", "－", "－", "－", "－", "－", "幽鬼", "妖獣", "幽鬼", "邪龍", "幽鬼", "邪龍", "－", "妖獣", "－", "－", "－", "－", "邪龍", "外道", "幽鬼", "幽鬼", "邪龍", "魔王", "幽鬼", "鬼神", "－"],
["－", "－", "－", "－", "凶鳥", "凶鳥", "妖獣", "－", "凶鳥", "悪霊", "悪霊", "－", "－", "－", "－", "妖樹", "妖獣", "外道", "邪龍", "悪霊", "悪霊", "妖獣", "－", "－", "－", "－", "－", "凶鳥", "妖獣", "－", "凶鳥", "凶鳥", "悪霊", "妖樹", "神獣", "妖樹"],
["死神", "地母神", "大天使", "－", "堕天使", "堕天使", "夜魔", "鬼女", "－", "－", "－", "地母神", "龍神", "龍王", "鬼神", "魔神", "龍王", "妖鬼", "龍神", "－", "－", "－", "－", "－", "鬼神", "堕天使", "堕天使", "魔王", "－", "地母神", "地霊", "－", "－", "－", "魔王", "－"],
["女神", "魔神", "破壊神", "龍神", "外道", "夜魔", "幽鬼", "－", "－", "－", "－", "聖獣", "神樹", "魔神", "鬼神", "幻魔", "龍王", "鬼神", "鬼女", "－", "－", "－", "－", "鬼神", "精霊", "破壊神", "鬼女", "鬼女", "鬼神", "妖鬼", "鬼女", "－", "－", "－", "女神", "－"],
["破壊神", "大天使", "神獣", "龍王", "邪龍", "－", "幻魔", "地母神", "－", "－", "－", "地母神", "破壊神", "神樹", "夜魔", "夜魔", "妖獣", "地母神", "堕天使", "－", "－", "－", "－", "堕天使", "破壊神", "精霊", "鬼女", "妖鬼", "鬼神", "堕天使", "外道", "－", "－", "－", "邪龍", "－"],
["－", "幻魔", "夜魔", "地霊", "龍王", "霊鳥", "魔王", "天使", "－", "－", "－", "破壊神", "龍神", "妖鬼", "妖鬼", "神樹", "聖獣", "神樹", "龍神", "－", "－", "－", "－", "堕天使", "鬼女", "鬼女", "精霊", "龍神", "破壊神", "地母神", "魔獣", "－", "－", "－", "邪鬼", "－"],
["－", "外道", "凶鳥", "邪神", "－", "天使", "龍王", "神獣", "凶鳥", "邪龍", "－", "破壊神", "龍王", "魔獣", "聖獣", "夜魔", "龍王", "龍神", "龍神", "魔王", "凶鳥", "邪龍", "凶鳥", "魔王", "鬼女", "妖鬼", "龍神", "精霊", "夜魔", "地母神", "妖鬼", "邪龍", "凶鳥", "邪鬼", "天使", "邪鬼"],
["妖鳥", "天女", "幻魔", "地霊", "地霊", "魔獣", "邪鬼", "鬼女", "邪鬼", "幽鬼", "凶鳥", "地霊", "聖獣", "邪鬼", "鬼神", "鬼女", "龍王", "妖精", "龍神", "悪霊", "邪鬼", "外道", "妖獣", "－", "鬼神", "鬼神", "破壊神", "夜魔", "精霊", "邪鬼", "悪霊", "邪鬼", "妖虫", "邪鬼", "悪霊", "邪鬼"],
["天女", "－", "女神", "地母神", "天女", "魔獣", "幽鬼", "－", "邪鬼", "妖樹", "凶鳥", "龍王", "聖獣", "地霊", "鬼神", "地母神", "聖獣", "妖鬼", "邪龍", "悪霊", "－", "幽鬼", "－", "地母神", "妖鬼", "堕天使", "地母神", "地母神", "邪鬼", "精霊", "地母神", "邪鬼", "－", "幽鬼", "天女", "悪霊"],
["妖魔", "天女", "凶鳥", "妖魔", "女神", "堕天使", "地霊", "鬼女", "邪鬼", "妖樹", "外道", "妖魔", "魔獣", "地霊", "妖鬼", "妖鬼", "地霊", "妖精", "妖魔", "幽鬼", "妖虫", "幽鬼", "凶鳥", "地霊", "鬼女", "外道", "魔獣", "妖鬼", "悪霊", "地母神", "精霊", "邪鬼", "妖虫", "外道", "妖魔", "悪霊"],
["－", "－", "－", "－", "凶鳥", "邪龍", "邪鬼", "邪鬼", "死神", "妖虫", "邪龍", "－", "－", "－", "－", "幽鬼", "妖獣", "邪鬼", "邪龍", "邪神", "邪龍", "邪龍", "凶鳥", "－", "－", "－", "－", "邪龍", "邪鬼", "邪龍", "邪鬼", "－", "妖獣", "邪鬼", "死神", "邪鬼"],
["－", "－", "－", "－", "凶鳥", "外道", "妖虫", "－", "妖獣", "妖虫", "凶鳥", "－", "－", "－", "－", "妖樹", "外道", "妖獣", "妖虫", "悪霊", "妖樹", "魔王", "悪霊", "－", "－", "－", "－", "凶鳥", "妖虫", "－", "妖虫", "妖獣", "－", "妖樹", "龍神", "妖樹"],
["－", "－", "－", "－", "邪鬼", "凶鳥", "幽鬼", "幽鬼", "幽鬼", "妖獣", "凶鳥", "－", "－", "－", "－", "幽鬼", "妖獣", "邪鬼", "邪龍", "妖樹", "邪龍", "幽鬼", "妖樹", "－", "－", "－", "－", "邪鬼", "邪鬼", "幽鬼", "外道", "邪鬼", "妖樹", "－", "－", "妖樹"],
["邪神", "地母神", "凶鳥", "妖樹", "堕天使", "龍王", "夜魔", "鬼女", "魔王", "霊鳥", "神樹", "死神", "妖獣", "妖虫", "幽鬼", "地霊", "妖鳥", "妖精", "魔獣", "邪神", "聖獣", "鬼神", "神獣", "魔王", "女神", "邪龍", "邪鬼", "天使", "悪霊", "天女", "妖魔", "死神", "龍神", "－", "－", "幻魔"],
["－", "－", "－", "－", "邪鬼", "凶鳥", "－", "悪霊", "凶鳥", "妖獣", "死神", "－", "－", "－", "－", "妖樹", "妖獣", "邪鬼", "妖樹", "悪霊", "妖樹", "－", "妖樹", "－", "－", "－", "－", "邪鬼", "邪鬼", "悪霊", "悪霊", "邪鬼", "妖樹", "妖樹", "幻魔", "－"]];

function fusionBad(result) { return result == "－"; }
function fusionElemental(result) { return result == "精霊" }

function registerDemon(data) {
	demonNamesEN.push(data.nameEN);
	demonByNameEN[data.nameEN.toLowerCase()] = data;
	$.each(data.skills, function(skill, level){
		if(skill in demonSkillMapping)
			demonSkillMapping[skill].push(data);
		else
			demonSkillMapping[skill] = [data];
	});
}

function handleAffinity(affinity, short) {
	if(short) {
		if(affinity == "null")
			return "<a style=\"color: #999999;\">N</a>";
		else if(affinity == "weak")
			return "<a style=\"color: #CC0000;\">W</a>";
		else if(affinity == "protect")
			return "<a style=\"color: #00CC00;\">P</a>";
		else if(affinity == "reflect")
			return "<a style=\"color: #0000CC;\">R</a>";
		else if(affinity == "absorb")
			return "<a style=\"color: #CC00CC;\">A</a>";
		else
			return "<a style=\"color: #FFFFFF;\">-</a>";
	} else {
		if(affinity == "null")
			return "<a style=\"color: #999999;\">Null</a>";
		else if(affinity == "weak")
			return "<a style=\"color: #CC0000;\">Weak</a>";
		else if(affinity == "protect")
			return "<a style=\"color: #00CC00;\">Protect</a>";
		else if(affinity == "reflect")
			return "<a style=\"color: #0000CC;\">Reflect</a>";
		else if(affinity == "absorb")
			return "<a style=\"color: #CC00CC;\">Absorb</a>";
		else
			return "<a style=\"color: #FFFFFF;\">N/A</a>";
	}
}

function showDemon(name) {
	name = name.toLowerCase();

	if(!(name in demonByNameEN))
		return;

	$("#demonData_name").text(demonByNameEN[name].nameEN);
	$("#demonData_tribe").text(tribeListEN[tribeListJP.indexOf(
		demonByNameEN[name].tribe)]);
	$("#demonData_level").text(demonByNameEN[name].level);
	$("#demonData_hp").text(demonByNameEN[name].stats.hp);
	$("#demonData_mp").text(demonByNameEN[name].stats.mp);
	$("#demonData_str").text(demonByNameEN[name].stats.strength);
	$("#demonData_skill").text(demonByNameEN[name].stats.skill);
	$("#demonData_magic").text(demonByNameEN[name].stats.magic);
	$("#demonData_speed").text(demonByNameEN[name].stats.speed);
	$("#demonData_luck").text(demonByNameEN[name].stats.luck);
	$("#demonData_physical").html(handleAffinity(
		demonByNameEN[name].affinity.physical));
	$("#demonData_gun").html(handleAffinity(
		demonByNameEN[name].affinity.gun));
	$("#demonData_fire").html(handleAffinity(
		demonByNameEN[name].affinity.fire));
	$("#demonData_ice").html(handleAffinity(
		demonByNameEN[name].affinity.ice));
	$("#demonData_thunder").html(handleAffinity(
		demonByNameEN[name].affinity.thunder));
	$("#demonData_shock").html(handleAffinity(
		demonByNameEN[name].affinity.shock));
	$("#demonData_banish").html(handleAffinity(
		demonByNameEN[name].affinity.banish));
	$("#demonData_curse").html(handleAffinity(
		demonByNameEN[name].affinity.curse));
	$("#tribeListBtn").show();
	$("#demonData").show();
	$("#tribeList").hide();
	$("#demonList").hide();
}

function demonTableHeader() {
	var demonList = "";
	demonList += "<table>";
	demonList += "<th><a>Level</a></th>";
	demonList += "<th><a>Name</a></th>";
	demonList += "<th><a>HP</a></th>";
	demonList += "<th><a>MP</a></th>";
	demonList += "<th><a>Str</a></th>";
	demonList += "<th><a>Skill</a></th>";
	demonList += "<th><a>Magic</a></th>";
	demonList += "<th><a>Speed</a></th>";
	demonList += "<th><a>Luck</a></th>";
	demonList += "<th><a>Phys</a></th>";
	demonList += "<th><a>Gun</a></th>";
	demonList += "<th><a>Fire</a></th>";
	demonList += "<th><a>Ice</a></th>";
	demonList += "<th><a>Elec</a></th>";
	demonList += "<th><a>Shock</a></th>";
	demonList += "<th><a>Banish</a></th>";
	demonList += "<th><a>Curse</a></th>";

	return demonList;
}

function demonClicked(obj) {
	showDemon(obj.innerText);
}

function demonTableEntry(data) {
	var demonList = "";
	demonList += "<tr>";
	demonList += "<td>" + data.level + "</td>";
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
	$("#demonList").html(html);
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

	$("#affinityFilterBtn").hide();
	$("#affinityFilter").show();
	$("#tribeListBtn").show();
	$("#tribeList").hide();
}
