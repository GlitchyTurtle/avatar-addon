import { MolangVariableMap } from "@minecraft/server";
import { ActionFormData } from "@minecraft/server-ui"
import { refreshSidebar } from './../runtimes/main.js';
import { setScore, getScore, parseSettings, getBendingStyle } from "./../util.js";

// To spawn particles
const map = new MolangVariableMap();

// Tags that need to be removed
const removeTags = [
	"air",
	"earth",
	"fire",
	"water",
	"avatar",
	"avatar_state",
	"kb_up",
	"sub_projectile",
	"avatar_particles",
	"fast_cooldown",
	"super_fast_cooldown",
	"antimagic",
	"spirit",
	"chi_blocked",
	"permKbSafe",
	"double_jump",
	
	// Carried
	"passive_regen",

    // Air
    "wind_dash",
    "double_jump",
    "passive_mobility",
    "sub_projectile",
    "permKbSafe",
    
    // Earth
    "pillar_pound",
    "earth_sprint",

    // Fire
    "nether_buff",
    "passive_mobility",
    "village_hero",
    "hot_blood",
];

// Events that reset other skill tree events
const resetEvents = [
	"a:set_trigger_skulk_on",
	"a:reset_damage_sensor",
	"a:normal_hunger",
	"a:set_base_damage_normal",
	"a:set_breath_normal",
	"a:set_health_normal",
	"a:mob_agro"
];

// Scores that need to be reset
const resetScores = [
	"level",
	"sub_level",
	"skill_points",
	"moveslot1",
	"moveslot2",
	"moveslot3",
	"moveslot4",
	"moveslot5",
	"moveslot6",
	"moveslot7",
	"moveslot8",
	"moveslot9",
]

export function resetPlayer(player) {
	setScore(player, "skill_tree", 1, false);
	player.runCommand("clear @s a:skill_point -1");
	// Remove tags
	const tags = player.getTags();
	for (const tag of removeTags) {
		player.removeTag(tag);
	}
	for (const tag of tags) {
		if (tag.startsWith('sub_') || tag.startsWith('Moveset:')) {
			player.removeTag(tag);
		}
	}

	// Reset events
	for (const event of resetEvents) {
		player.triggerEvent(event);
	}

	// Reset scores
	for (const score of resetScores) {
		setScore(player, score, 0);
	}

	refreshSidebar(player);
}

export function chooseType(player, typeName) {
	player.addTag(typeName)
	player.dimension.spawnParticle(`a:choose_${typeName}`, player.location, map);
	player.onScreenDisplay.setTitle(`a:${typeName}_super_fast`);
}

export function chooseBendingMenu(source) {
	// Quick checks
	if (source.hasTag('bending_off')) return source.sendMessage("§cYou need to enable bending to choose!");

	// So we can access settings
	const SETTINGS = parseSettings(getScore("settings", source));

	if (SETTINGS.CHOICE_FINAL && source.hasTag("alreadyChose")) return source.sendMessage("§cOn this server, all picks are final. No changing now!");
	if (SETTINGS.BENDING_OPT === 2) return source.sendMessage("§cOn this server, an admin must choose your bending for you!");

	if (SETTINGS.BENDING_OPT === 1) {
		resetPlayer(source);
		let selectionList = ["Non-Bender", "Air", "Water", "Fire", "Earth"]
		if (SETTINGS.AVATAR_OPT >= 1) selectionList.push("Avatar");
		source.sendMessage("§cOn this server, your bending is randomly chosen!");

		const randomChoice = selectionList[Math.floor(Math.random() * selectionList.length)]
		if (randomChoice === "Non-Bender") {
			setScore(source, "level", 20, false)
			source.onScreenDisplay.setTitle("a:reset");
		} else if (randomChoice === "Avatar") {
			chooseType(source, randomChoice.toLowerCase());
			let newSettings = getScore("settings", source).toString();
			var chars = newSettings.split('');
			chars[1] = "0";
			newSettings = chars.join('');
			source.runCommand(`scoreboard players set avatar:config settings ${newSettings}`);
			source.runCommand("scoreboard players operation @a settings = avatar:config settings");
		} else {
			chooseType(source, randomChoice.toLowerCase());
		}

		let bendingStyle;
		if (source.hasTag("air") || source.hasTag("fire") || source.hasTag("earth") || source.hasTag("water")) {
			bendingStyle = getBendingStyle(source) + "bender";
		} else {
			bendingStyle = getBendingStyle(source);
		}
		source.sendMessage(`§7You have become a ${bendingStyle}!`);
		if (SETTINGS.CHOICE_FINAL) source.addTag("alreadyChose");
		return;
	}

	// Choose bending menu, which I called choose style
	let chooseStyle = new ActionFormData();
	chooseStyle.title("Bending Style Menu");
	chooseStyle.body("Choose your bending style here! Your level will be reset upon choosing though.");
	chooseStyle.button("Non-Bender", "textures/ui/brewing_fuel_empty");
	chooseStyle.button("Air", "textures/ui/avatar/air");
	chooseStyle.button("Water", "textures/ui/avatar/water");
	chooseStyle.button("Fire", "textures/ui/avatar/fire");
	chooseStyle.button("Earth", "textures/ui/avatar/earth");
	if (SETTINGS.AVATAR_OPT === 2) chooseStyle.button("Avatar", "textures/ui/avatar/avatar");

	let selectionList = ["Non-Bender", "Air", "Water", "Fire", "Earth", "Avatar"]

	// Show the menu and respond	
	chooseStyle.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
		if (selection === undefined) return;

		// Reset the tags and scores, then add new ones
		resetPlayer(source);
		if (SETTINGS.CHOICE_FINAL) source.addTag("alreadyChose");
		switch(selectionList[selection]) {
			case "Non-Bender":
				setScore(source, "level", 20, false)
				source.onScreenDisplay.setTitle("a:reset");
				break;
			case "Air":
				chooseType(source, "air");
				break;
			case "Water":
				chooseType(source, "water");
				break;
			case "Fire":
				chooseType(source, "fire");
				break;
			case "Earth":
				chooseType(source, "earth");
				break;
			case "Avatar":
				chooseType(source, "avatar");
				break;
		}
	})
}