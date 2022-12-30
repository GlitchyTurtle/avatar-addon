import { world, BlockLocation } from "@minecraft/server";
import { groundBlocks, getScore, toCamelCase, getBendingStyle, getSubBendingStyle, showWarning } from "./../util.js";
import commands from './../moves/import.js';

let moveList;
let slot = 0;
let commandslist = Object.values(commands);

export function tickEvent(eventData) {
    for (let player of world.getPlayers()) {
		if ((player.hasTag("avatar") || player.hasTag("air") || player.hasTag("fire") || player.hasTag("water") || player.hasTag("earth")) && !player.hasTag("bending_off") && !player.hasTag("antimagic") && !player.hasTag("chi_blocked")) {
			// Runtimes
			if (player.hasTag("earth")) { 
				earthRuntime(player);
			} else if (player.hasTag("air")) {
				airRuntime(player); 
			} else if (player.hasTag("water")) {
				waterRuntime(player); 
			} else if (player.hasTag("avatar")) {
				player.runCommandAsync("effect @s fire_resistance 20 20 true");
				airRuntime(player);
				earthRuntime(player);
				waterRuntime(player); 
			} else if (player.hasTag("fire")) {
				player.runCommandAsync("effect @s fire_resistance 20 20 true");
			}

			// Slot 1 - Sneak and look upwards
			if (getScore("cooldown1", player) === 100 && getScore("detect_rhx", player) === -90 && getScore("detect_sneak", player) === 1 && !player.hasTag("mobileMode")) {
				actionMoves(player, 1);
			}

			// Slot 2 - Look down and punch
			if (getScore("cooldown1", player) === 100 && getScore("detect_rhx", player) >= 75 && getScore("detect_left", player) === 1 && !player.hasTag("mobileMode")) {
				actionMoves(player, 2);
			}

			// Slot 3 - Sneak twice fast
			if (getScore("cooldown1", player) === 100 && getScore("detect_dsneak", player) === 1 && !player.hasTag("mobileMode")) {
				actionMoves(player, 3);
			}

			// Slot 4 - Sneak and punch
			if (getScore("cooldown1", player) === 100 && getScore("detect_sneak", player) === 1 && getScore("detect_left", player) === 1 && !player.hasTag("mobileMode")) {
				actionMoves(player, 4);
			}
			
			// Avatar State
			if (player.hasTag("avatar_state")) avatarState(player);
		}

		// Cooldown
		if (getScore("cooldown1", player) < 100 && !getScore("cdSet", player)) {
			player.removeTag('justUsedMove');
			player.runCommandAsync("scoreboard players add @s cooldown1 2");
			if (player.hasTag("fast_cooldown")) player.runCommandAsync("scoreboard players add @s cooldown1 2");
			if (player.hasTag("super_fast_cooldown")) player.runCommandAsync("scoreboard players add @s cooldown1 8");
		} else if (!getScore("cdSet", player)) {
			if (getScore("cooldown1", player) == 100 && player.hasTag('justUsedMove')) return;
			if (player.hasTag('fast_cooldown')) player.removeTag('fast_cooldown');
			if (player.hasTag('super_fast_cooldown')) player.removeTag('super_fast_cooldown');
			if (player.hasTag('chi_blocked')) player.removeTag('chi_blocked'); 
			if (getScore("cooldown1", player) > 100) player.runCommandAsync("scoreboard players set @s cooldown1 100");
		} else {
			player.runCommandAsync("scoreboard players set @s cooldown1 100");
		}

		// Setup
		if (!player.hasTag('setup')) setup(player);

		// Combat log and teleport
		if (getScore("combat", player) > 0) { 
			player.runCommandAsync("scoreboard players remove @s combat 1");
			if (getScore("combat", player) <= 1) {
				player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§aYou are safe to leave the game now."}]}`);
			}
		} else {
			player.runCommandAsync(`scoreboard players set @s combo 0`);
		}

		// Level Up
		if (Math.ceil(getScore("level", player) / 4 * 5 + 10) <= getScore("sub_level", player)) { 
			levelUp(player);
		}
    }
}

function makeList(commandslist, player) {
	moveList = ["Leave Empty"]
	for (let i = 0; i < commandslist.length; i++) {
		if ((commandslist[i].style === getBendingStyle(player).toLowerCase() || player.hasTag("avatar")) && (commandslist[i].unlockable <= getScore("level", player) || (player.hasTag("avatar")) && commandslist[i].unlockable_for_avatar <= getScore("level", player)) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required == getSubBendingStyle(player))) {
			moveList.push(`${commandslist[i].name}`);
		}
	}
	return moveList;
}

function levelUp(player) {
    player.runCommandAsync("scoreboard players set @s sub_level 0");
	player.runCommandAsync("playsound random.levelup @s ~ ~ ~");
	player.runCommandAsync("scoreboard players add @s level 1");
	player.runCommandAsync("particle a:level_up ~~~");
	player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§bLeveled up to: "},{"score":{"name": "@s","objective": "level"}}]}`);

	// List all the moves for that level, because you can only level up once it looks like an interactive unlock
	let newMoves = "";
	for (let i = 0; i < commandslist.length; i++) {
		if (commandslist[i].style === getBendingStyle(player).toLowerCase() && commandslist[i].unlockable === (getScore("level", player) + 1) || (player.hasTag("avatar") && commandslist[i].unlockable_for_avatar === (getScore("level", player)) + 1) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(player))) {
			newMoves = newMoves + `§b ${commandslist[i].name} \n`
		}
	}
	if (newMoves) {
		player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"${newMoves}"}]}`)
	}
}

function earthRuntime(player) {
	let {x, y, z} = player.location;
	let verifyDirt = player.dimension.getBlock(new BlockLocation(x, y - 1, z));
	let verifyDirt1 = player.dimension.getBlock(new BlockLocation(x + 1, y - 1, z));
	let verifyDirt2 = player.dimension.getBlock(new BlockLocation(x - 1, y - 1, z));
	let verifyDirt3 = player.dimension.getBlock(new BlockLocation(x, y - 1, z + 1));
	let verifyDirt4 = player.dimension.getBlock(new BlockLocation(x, y - 1, z - 1));
	if (groundBlocks.includes(verifyDirt.type.id) || groundBlocks.includes(verifyDirt1.type.id) || groundBlocks.includes(verifyDirt2.type.id) || groundBlocks.includes(verifyDirt3.type.id) || groundBlocks.includes(verifyDirt4.type.id)) {
		player.runCommandAsync(`scoreboard players set @s ground 1`);
	} else {
		player.runCommandAsync(`scoreboard players set @s ground 0`);
	}
	if (getScore("detect_sprint", player) === 1 && getScore("ground", player) === 1 && getScore("earth_sprint", player) < 100) {
		player.runCommandAsync("scoreboard players add @s earth_sprint 1");
	} else if (getScore("detect_sprint", player) === 1 && getScore("ground", player) === 1 && getScore("earth_sprint", player) === 100) {
		player.runCommandAsync("effect @s speed 5 3 true");
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("camerashake add @s 0.1 0.1 positional");
			player.runCommandAsync("particle a:earth_sprint ~~~");
		}
	} else if (getScore("detect_sprint", player) === 0) {
		player.runCommandAsync("scoreboard players set @s earth_sprint 0");
	}
}

function airRuntime(player) {
	if (getScore("detect_sneak", player) === 1 && getScore("cooldown1", player) === 100) {
		if (getScore("air_invis", player) === 100) {
			player.runCommandAsync("effect @s invisibility 1 1 true");
			player.runCommandAsync("particle minecraft:end_chest ~ ~ ~");
		} else { player.runCommandAsync("scoreboard players add @s air_invis 1"); }
	} else {
		player.runCommandAsync("scoreboard players set @s air_invis 0");
	}
	if (player.hasTag('sub_projectile')) {
		try { player.runCommandAsync("tag @e[r=10,type=arrow] add seeking"); } catch (error) {}
		try { player.runCommandAsync(`execute as @e[r=${getScore("level", player)*4},type=arrow,tag=seeking] at @s if block ~~-1~ air run particle a:air_blast ~~~`); } catch (error) {}
		try { player.runCommandAsync(`execute as @e[r=${getScore("level", player)*4},type=arrow,tag=seeking] at @s run execute as @e[r=2,type=!arrow,tag=!seeking,tag=!sub_projectile] run damage @s[type=!item,name=!${player.name}] 2 projectile`); } catch (error) {}
		try { player.runCommandAsync(`execute as @e[r=${getScore("level", player)*4},type=arrow,tag=seeking] at @s run execute as @e[r=2,type=!arrow,tag=!seeking,tag=!sub_projectile] run kill @e[r=4,type=arrow]`); } catch (error) {}
		try { player.runCommandAsync(`execute as @e[r=${getScore("level", player)*4},c=5,type=arrow,tag=seeking] at @s run tp @s ^^^2 facing @e[tag=!sub_projectile,type=!arrow,type=!armor_stand,type=!item,c=1,type=!xp_orb]`); } catch (error) {}
	}
}

function waterRuntime(player) {
	if (getScore("detect_water", player) === 1 && getScore("cooldown1", player) === 100) {
		player.runCommandAsync(`effect @s conduit_power 10 2 true`);
	}
	if (player.hasTag("full_moon")) {
		player.runCommandAsync(`effect @s strength 10 4 true`);
		player.runCommandAsync(`effect @s speed 10 2 true`);
	}
}

function avatarState(player) {
	if (!player.hasTag("avatar_particles")) {
		player.runCommandAsync("particle a:avatar_water_ring ~~1~");
		player.runCommandAsync("particle a:avatar_fire_ring ~~1~");
		player.runCommandAsync("particle a:avatar_earth_ring ~~1~");
		player.runCommandAsync("particle a:air_charge ~~~");
	}
	player.runCommandAsync(`effect @s regeneration 10 2 true`);
	player.runCommandAsync(`effect @s strength 10 4 true`);
	player.runCommandAsync(`effect @s resistance 10 2 true`);
	player.runCommandAsync(`effect @s speed 10 2 true`);
}

export function actionMoves(player, slotExecuted) {
	if (player.hasTag("justUsedMove")) return;
	makeList(commandslist, player);
	let cmd;
	try { 
		cmd = toCamelCase(moveList[getScore(`moveslot${slotExecuted}`, player)]);
	} catch (error) {
		return player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§cYou have slot ${slotExecuted} empty!§r"}]}`);
	}

	if (!player.hasTag("chatmsgoff") && getScore(`moveslot${slotExecuted}`, player)) {
		player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore(`moveslot${slotExecuted}`, player)]}!§r"}]}`);
	}
	try {
		commands[cmd].execute(player);
		if (slot != slotExecuted) {
			slot = slotExecuted; player.runCommandAsync('scoreboard players add @s sub_level 3');
		} else if (getScore("level", player) <= 20) {
			player.runCommandAsync('scoreboard players add @s sub_level 1');
		}
	} catch (error) {
		return player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§cYou have slot ${slotExecuted} empty!§r"}]}`);
	}
	cooldownLogic(player, commands[cmd].cooldown);
}

function setup(player) {
	const list = ["ground", "cooldown1", "charged_attack", "earth_sprint", "air_invis", "sub_level", "level", "home", "shop", "avatarSet", "chatRankSet", "cdSet", "combo", "unlocked", "moveslot1", "moveslot2", "moveslot3", "moveslot4", "detect_rhy", "combat", "detect_water", "deaths", "kills", "money", "detect_left", "detect_sneak", "detect_dsneak", "detect_sneakTemp", "detect_dsneakSet", "detect_sprint", "detect_rhx"]
	list.forEach(forEachScoreboard, player);
	player.runCommandAsync(`scoreboard players set @a detect_dsneakSet 20`);
	player.runCommandAsync("gamerule sendcommandfeedback false");
	player.runCommandAsync("gamerule commandblockoutput false");
	player.runCommandAsync("gamerule showtags false");
	player.addTag("setup");
	player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§rAre you an op? If you want special menu settings, make sure you are a world operator!"}]}`);
	player.runCommandAsync('give @s a:bending_scroll 1 0 {"minecraft:keep_on_death":{},"minecraft:item_lock":{"mode":"lock_in_inventory"}}');
	showWarning(player, `Welcome!`, `Hey §b${player.nameTag}§r!\n\nWelcome to §bAvatar Addon§r!\n\nTo get started, right click or long press the §bbending scroll§r in your inventory, and select any option from the list.\n\nIf you need help, check the page where you downloaded this, the discord, or send me (GlitchyTurtle32) a message!`)
}

function forEachScoreboard(item) {
	try { world.getDimension("overworld").runCommandAsync(`scoreboard objectives add ${item} dummy`); } catch (error) {}
	try { world.getDimension("overworld").runCommandAsync(`scoreboard players add @a ${item} 0`); } catch (error) {}
}

function cooldownLogic(player, cooldown) {
	if (!getScore("cdSet", player)) player.addTag('justUsedMove');
	if (!getScore("cdSet", player)) player.runCommandAsync("scoreboard players set @s cooldown1 0");
	if (cooldown === "slow") {
		player.runCommandAsync(`title @s title a:${getBendingStyle(player).toLowerCase()}`);
	} else if (cooldown === "fast") {
		player.runCommandAsync(`title @s title a:${getBendingStyle(player).toLowerCase()}_fast`);
		player.addTag("fast_cooldown");
	} else if (cooldown === "super_fast") {
		player.runCommandAsync(`title @s title a:${getBendingStyle(player).toLowerCase()}_super_fast`);
		player.addTag("super_fast_cooldown");
	} else { // if not specified, assume slow
		player.runCommandAsync(`title @s title a:${getBendingStyle(player).toLowerCase()}`);
	}
}
