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
	calculateDistance
} from "../util.js";

// Bender runtimes
import { earthRuntime } from "./earth.js";
import { airRuntime } from "./air.js";
import { waterRuntime } from "./water.js";
import { fireRuntime } from "./fire.js";

// The list of all the moves
const BENDING_MOVES = Object.values(commands);

export function tickEvent() {
    for (let player of world.getPlayers()) {
		try {
			if (player.id) playerRuntime(player);
		} catch (error) {
			console.warn(error);
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
		// Bending related conditions
		const DOUBLE_SNEAK = getScore("detect_dsneak", player) == 1 && getScore("cooldown", player) == 100; //1
		const SNEAK_PUNCH = getScore("detect_sneak", player) == 1 && getScore("detect_left", player) == 1 && getScore("cooldown", player) == 100; //2
		const RIGHT_CLICK = getScore("detect_right", player) == 1 && getScore("cooldown", player) == 100; //2

		// List of actions
		const ACTIONS = [DOUBLE_SNEAK, SNEAK_PUNCH, RIGHT_CLICK];

		// Get the selected slot
		const BENDING_SLOT = player.selectedSlot + 1;
		const SLOT_AND_BINDING = parseMoveslot(getScore(`moveslot${BENDING_SLOT}`, player));

		// Show the current move
		//player.onScreenDisplay.setActionBar(BENDING_MOVES[SLOT_AND_BINDING[1]].name.replace("Leave ", "")); - until bugs on apex are resolved
		player.runCommand(`title @s actionbar ${BENDING_MOVES[SLOT_AND_BINDING[1]].name.replace("Leave ", "")}`);

		// Avatar State
		if (player.hasTag("avatar_state")) avatarState(player);

		// Reset "right click" scoreboard manually
		if (getScore("detect_right", player)) setScore(player, "detect_right", 0);
		
		// Detect if player activates slot
		if (ACTIONS[SLOT_AND_BINDING[0] - 1] && SLOT_AND_BINDING[1] != 0) {
			actionMoves(player, SLOT_AND_BINDING[1], BENDING_MOVES);
			setScore(player, "detect_dsneak", 0);
		}
		
		// Runtimes
		if (BENDING_STYLE == "Earth" || BENDING_STYLE == "Avatar") earthRuntime(player);
		if (BENDING_STYLE == "Air" || BENDING_STYLE == "Avatar") airRuntime(player); 
		if (BENDING_STYLE == "Water" || BENDING_STYLE == "Avatar") waterRuntime(player);
		if (BENDING_STYLE == "Fire" || BENDING_STYLE == "Avatar") fireRuntime(player)
	} else if (BENDING_STYLE != "Non-bender") {
		//player.onScreenDisplay.setActionBar("Bending Disabled"); - until bugs on apex are resolved
		player.runCommand("title @s actionbar Bending Disabled");
	}

	// Anti Combat log and Anti Combat Teleport
	if (getScore("combat", player) > 0) { 
		setScore(player, "combat", -1, true);
		if (getScore("combat", player) < 1) {
			player.sendMessage("§aYou are safe to leave the game now.");
		}
	} else if (getScore("combo", player) > 0) {
		setScore(player, "combo", 0);
	}

	// Cooldown
	if (BENDING_STYLE == "Non-bender") return;
	const SETTINGS = parseSettings(getScore("settings", player));
	if (getScore("cooldown", player) < 100 && !SETTINGS.COOLDOWNS) {
		let addToCooldown = 2;
		if (player.hasTag("fast_cooldown")) addToCooldown += 2;
		if (player.hasTag("super_fast_cooldown")) addToCooldown += 8;
		setScore(player, "cooldown", addToCooldown, true);
	} else if (!SETTINGS.COOLDOWNS) {
		if (player.hasTag('fast_cooldown')) player.removeTag('fast_cooldown');
		if (player.hasTag('super_fast_cooldown')) player.removeTag('super_fast_cooldown');
		if (player.hasTag('chi_blocked')) player.removeTag('chi_blocked');
		if (getScore("cooldown", player) > 100) setScore(player, "cooldown", 100);
	} else {
		setScore(player, "cooldown", 100);
	}
}

function actionMoves(player, slotExecuted, moveList) {
	// Find and execute the move
	let moveListNames = moveList.map(function(object) { return object.name; });
	if (!player.hasTag("chatmsgoff")) player.sendMessage(`§rYou used §b${moveListNames[slotExecuted]}!§r`);
	let cmd = toCamelCase(moveListNames[slotExecuted]);
	commands[cmd].execute(player);
	
	// Cooldown logic
	const style = getBendingStyle(player).toLowerCase();
	if (!getScore("cdSet", player)) setScore(player, "cooldown", 0);
	switch (commands[cmd].cooldown) {
		case "slow":
			player.onScreenDisplay.setTitle(`a:${style}`);
			break;
		case "fast":
			player.onScreenDisplay.setTitle(`a:${style}_fast`);
			player.addTag("fast_cooldown");
			break;
		case "super_fast":
			player.onScreenDisplay.setTitle(`a:${style}_super_fast`);
			player.addTag("super_fast_cooldown");
			break;
		default:
			player.onScreenDisplay.setTitle(`a:${style}`);
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
}