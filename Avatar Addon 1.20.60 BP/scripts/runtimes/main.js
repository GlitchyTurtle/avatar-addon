// Minecraft imports + move lists
import { world } from "@minecraft/server";
import commands from '../moves/import.js';

// Utility functions
import { setup } from '../setup.js';
import {
	getScore,
	setScore,
	toCamelCase,
	getBendingStyle,
	levelUp,
	canBend,
	parseMoveslot,
	parseSettings,
	isLineClear,
	traceLine,
	delayedFunc,
	calculateDistance,
	getGamemode
} from "../util.js";

// Bender runtimes
import { earthRuntime } from "./earth.js";
import { airRuntime } from "./air.js";
import { waterRuntime } from "./water.js";
import { fireRuntime } from "./fire.js";

import { refreshSkillTree } from "../scroll/skillTreeMenu.js";

// The list of all the moves
const BENDING_MOVES = Object.values(commands);

export const PLAYER_DATA_MAP = {};

const colors = {
    "earth": "§2",
    "air": "§b",
    "fire": "§6",
    "water": "§9",
    "avatar": "§g"
};

world.afterEvents.playerLeave.subscribe(eventData => playerLeave(eventData));
function playerLeave(eventData) {
	if (PLAYER_DATA_MAP[eventData.playerId]) delete PLAYER_DATA_MAP[eventData.playerId];
}

export function refreshSidebar(player) {
	try {
		PLAYER_DATA_MAP[player.id].refreshAll();
	} catch (error) {
		console.warn(`Error with refreshing sidebar on ${player.name} in (51-main.js): ${error}`);
	};
}

export function mainSetCooldown(player, score) {
	try {
		PLAYER_DATA_MAP[player.id].cooldown = score;
	} catch (error) {
		console.warn(`Error with postponing cooldown on ${player.name} in (57-main.js): ${error}`);
	}
}

export function mainGetCooldown(player) {
	return PLAYER_DATA_MAP[player.id].cooldown;
}

export function tickEvent() {
    for (const player of world.getPlayers()) {
		try {
			if (player.id) playerRuntime(player);
		} catch (error) {
			console.warn(`Error with playerRuntime on ${player.name} in (60-main.js): ${error}`);
		}
    }
}

function playerRuntime(player) {
	// Setup for new players
	if (!player.hasTag("setup")) setup(player);

	// Personal player stuff
	const BENDING_STYLE = getBendingStyle(player);
	const CAN_BEND = canBend(player);

	// Runtime for all benders
	if (BENDING_STYLE != "Non-bender" && CAN_BEND) {
		benderRuntime(player);
	} else if (BENDING_STYLE != "Non-bender" && !CAN_BEND) {
		player.onScreenDisplay.setActionBar("Bending Disabled");
	} else if (BENDING_STYLE == "Non-bender") {
		player.onScreenDisplay.setTitle(`a:reset`);
	}

	// Anti Combat log and Anti Combat Teleport
	try {
		const combat = getScore("combat", player);
		if (combat > 0) { 
			setScore(player, "combat", -1, true);
			if (combat - 1 < 1) {
				player.sendMessage("§aYou are safe to leave the game now.");
			}
		} else if (getScore("combo", player) > 0) {
			setScore(player, "combo", 0);
		}
	} catch (error) {
		console.warn(`Error with anti combat log on ${player.name} in (86-main.js): ${error}`);
	}

	if (getScore("detect_sneak", player) == 1) setScore(player, "sneak_time", 1, true);

	// Cooldown
	if (BENDING_STYLE == "Non-bender") return;
}

function avatarRuntime(player) {
	earthRuntime(player);
	airRuntime(player);
	waterRuntime(player);
	fireRuntime(player);
}

function setupPlayerData(player) {
	PLAYER_DATA_MAP[player.id] = {
			
		style: getBendingStyle(player),
		tag: getBendingStyle(player).toLowerCase(),
		runtime: undefined, 
	
		moveset: [],
		skills: [],

		cooldown: 0,

		refreshAll() {
			this.style = getBendingStyle(player);
			this.tag = getBendingStyle(player).toLowerCase();
			this.refreshMoveset();
			this.refreshRuntime();
			this.refreshSkills();
		},

		refreshMoveset() {
			this.moveset = [];
			for (let i = 1; i <= 9; i++) {
				const SLOT_AND_BINDING = parseMoveslot(getScore(`moveslot${i}`, player));
				this.moveset.push(i + ": " + BENDING_MOVES[SLOT_AND_BINDING[1]].name.replace("Leave ", ""));
			}

			// Display moves on the right sidebar
			delayedFunc(player, (sidebarTimeDelay) => player.onScreenDisplay.setTitle(`}§l-- §6${colors[this.tag]}Slots:§r§l --§r\n` + this.moveset.join('\n') + "\n"), 100);
			delayedFunc(player, (titleTimeDelay) => player.onScreenDisplay.setTitle(`a:${this.tag}_super_fast`), 150);
		},

		refreshSkills() {
			refreshSkillTree(player);
		},

		refreshRuntime() {
			if (this.style == "Earth") this.runtime = earthRuntime;
			if (this.style == "Air") this.runtime = airRuntime; 
			if (this.style == "Water") this.runtime = waterRuntime;
			if (this.style == "Fire") this.runtime = fireRuntime;
			if (this.style == "Avatar") this.runtime = avatarRuntime;
		}
	}
	
	// Setup with the current values
	PLAYER_DATA_MAP[player.id].refreshAll();
}

function benderRuntime(player) {
	// Setup player data if it doesn't exist
	if (!PLAYER_DATA_MAP[player.id]) setupPlayerData(player);

	// Get the player's data
	const PLAYER_DATA = PLAYER_DATA_MAP[player.id];

	if (player.hasTag("chi_blocked")) {
		if (PLAYER_DATA.cooldown < 100) {
			PLAYER_DATA.cooldown++;
		} else {
			player.removeTag("chi_blocked");
		}
		return player.onScreenDisplay.setActionBar("Chi Blocked");;
	}

	// Runtime for the current style
	PLAYER_DATA.runtime(player);

	// Skill Tree runtime stuff that spans across multiple styles of bending
	const PLAYER_SKILLS = PLAYER_DATA.skills;
	if (PLAYER_SKILLS.includes("Chi Infusion") && !player.getEffect("regeneration")) player.addEffect("regeneration", 120000, { amplifier: 0, showParticles: false })
	if (PLAYER_SKILLS.includes("Sky's Grace") && (!player.getEffect("jump_boost") || !player.getEffect("speed"))) {
		player.addEffect("jump_boost", 120000, { amplifier: 1, showParticles: false });
		player.addEffect("speed", 120000, { amplifier: 1, showParticles: false });
	}

	// The basic cooldown logic
	const COOLDOWN = PLAYER_DATA.cooldown;
	if (COOLDOWN < 100) PLAYER_DATA.cooldown++;

	// Reused checks
	const VIEW_DIRECTION = player.getViewDirection();
	const COOLDOWN_CHECK = COOLDOWN === 100;
	const LEFT_CHECK = getScore("detect_left", player) === 1;
	const SNEAK_CHECK = getScore("detect_sneak", player) === 1;

	// List of conditions for each action
	const DOUBLE_SNEAK = getScore("detect_dsneak", player) === 1 && COOLDOWN_CHECK;
	const SNEAK_PUNCH = SNEAK_CHECK && LEFT_CHECK && COOLDOWN_CHECK;
	const RIGHT_CLICK = getScore("detect_right", player) === 1 && COOLDOWN_CHECK;
	const LOOK_DOWN_PUNCH = VIEW_DIRECTION.y < -0.95 && LEFT_CHECK && COOLDOWN_CHECK;
	const LOOP_UP_SNEAK = VIEW_DIRECTION.y > 0.95 && SNEAK_CHECK && COOLDOWN_CHECK;

	// List of actions
	const ACTIONS = [DOUBLE_SNEAK, SNEAK_PUNCH, RIGHT_CLICK, LOOK_DOWN_PUNCH, LOOP_UP_SNEAK];

	// Get the selected slot and show the current move
	const SLOT_AND_BINDING = parseMoveslot(getScore(`moveslot${player.selectedSlot + 1}`, player));
	player.onScreenDisplay.setActionBar(BENDING_MOVES[SLOT_AND_BINDING[1]].name.replace("Leave ", ""));

	// Avatar State
	if (player.hasTag("avatar_state")) avatarState(player);

	// Detect if player activates slot
	if (ACTIONS[SLOT_AND_BINDING[0] - 1] && SLOT_AND_BINDING[1] != 0) {
		try {
			actionMoves(player, SLOT_AND_BINDING[1], BENDING_MOVES);
		} catch (error) {
			console.warn(`Error with executing action moves on ${player.name} in (193-main.js): ${error}`);
		}
	}
}

function actionMoves(player, slotExecuted, moveList) {
	// Find and execute the move
	const moveListNames = moveList.map(function(object) { return object.name; });
	const cmd = toCamelCase(moveListNames[slotExecuted]);
	
	commands[cmd].execute(player);
	if (!player.hasTag("chatmsgoff")) player.sendMessage(`§rYou used §b${moveListNames[slotExecuted]}!§r`);

	// Reset scoreboards manually
	setScore(player, "detect_right", 0);
	setScore(player, "detect_dsneak", 0);

	const PLAYER_DATA = PLAYER_DATA_MAP[player.id]

	const style = PLAYER_DATA.tag;
	switch (commands[cmd].cooldown) {
		case "super_slow":
			player.onScreenDisplay.setTitle(`a:${style}_slow`);
			PLAYER_DATA.cooldown = 0;
			break;
		case "slow":
			player.onScreenDisplay.setTitle(`a:${style}_normal`);
			PLAYER_DATA.cooldown = 40;
			break;
		case "fast":
			player.onScreenDisplay.setTitle(`a:${style}_fast`);
			PLAYER_DATA.cooldown = 65;
			break;
		case "super_fast":
			player.onScreenDisplay.setTitle(`a:${style}_super_fast`);
			PLAYER_DATA.cooldown = 75;
			break;
		default:
			player.onScreenDisplay.setTitle(`a:${style}`);
			PLAYER_DATA.cooldown = 50;
	} 

	setScore(player, "sub_level", 3, true);
	if (getScore("level", player) < 10) setScore(player, "sub_level", 5, true);

	// Level Up
	const SETTINGS = parseSettings(getScore("settings", player));
	if (Math.ceil(getScore("level", player) / 4 * 5 + 10) <= getScore("sub_level", player) * (SETTINGS.LEVEL_SPD)/4) {
		levelUp(player);
	}
}

function avatarState(player) {
	try {
		if (!player.hasTag("avatar_particles")) {
			player.runCommandAsync("particle a:avatar_water_ring ~~1~");
			player.runCommandAsync("particle a:avatar_fire_ring ~~1~");
			player.runCommandAsync("particle a:avatar_earth_ring ~~1~");
			player.runCommandAsync("particle a:air_charge ~~~");
		}
		player.addEffect("regeneration", 200, { amplifier: 2, showParticles: false });
		player.addEffect("resistance", 200, { amplifier: 2, showParticles: false });
		player.addEffect("strength", 200, { amplifier: 2, showParticles: false });
		player.addEffect("speed", 200, { amplifier: 2, showParticles: false }); 
	} catch (error) {}
}