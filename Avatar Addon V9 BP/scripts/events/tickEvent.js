import { world, Player, BlockLocation, Location, EntityTypes } from "mojang-minecraft";
import { ActionFormData, ModalFormData } from "mojang-minecraft-ui"
import { groundBlocks, getScore, toCamelCase, getBendingStyle, getSubBendingStyle } from "./../util.js";
import commands from './../moves/import.js';

const World = world;

let moveList;
let slot = 0;
let commandslist = Object.values(commands);

export function tickEvent(eventData) {
    for (let player of World.getPlayers()) {
		if ((player.hasTag("avatar") || player.hasTag("air") || player.hasTag("fire") || player.hasTag("water") || player.hasTag("earth")) && !player.hasTag("bending_off") && !player.hasTag("antimagic") && !player.hasTag("chi_blocked")) {
			//Runtimes
			if (player.hasTag("earth")) { 
				earthRuntime(player);
			} else if (player.hasTag("air")) {
				airRuntime(player); 
			} else if (player.hasTag("water")) {
				waterRuntime(player); 
			} else if (player.hasTag("avatar")) {
				airRuntime(player);
				earthRuntime(player);
				waterRuntime(player); 
			}
			//Slot 1 - Sneak and look upwards
			if (getScore("cooldown1", player) === 100 && getScore("detect_rhx", player) === -90 && getScore("detect_sneak", player) === 1 && !player.hasTag("mobile")) {
				actionMoves(player, 1);
			}
			//Slot 2 - Look down and punch
			if (getScore("cooldown1", player) === 100 && getScore("detect_rhx", player) >= 75 && getScore("detect_left", player) === 1 && !player.hasTag("mobile")) {
				actionMoves(player, 2);
			}
			//Slot 3 - Sneak twice fast
			if (getScore("cooldown1", player) === 100 && getScore("detect_dsneak", player) === 1 && !player.hasTag("mobile")) {
				actionMoves(player, 3);
			}
			//Slot 4 - Sneak and punch
			if (getScore("cooldown1", player) === 100 && getScore("detect_sneak", player) === 1 && getScore("detect_left", player) === 1 && !player.hasTag("mobile")) {
				actionMoves(player, 4);
			}
		}
		//Cooldown
		if (getScore("cooldown1", player) === 0) { player.runCommand(`title @s title a:${getBendingStyle(player).toLowerCase()}`); }
		if (getScore("cooldown1", player) < 100) { player.runCommand("scoreboard players add @s cooldown1 1"); }
		//Chiblock remover
		if (player.hasTag('chi_blocked') && getScore("cooldown1", player) === 100) { player.removeTag('chi_blocked'); }
		//Setup
		if (!player.hasTag('setup')) { setup(player); }
		//Combat log and teleport
		if (getScore("combat", player) > 0) { 
			player.runCommand("scoreboard players remove @s combat 1");
			if (getScore("combat", player) === 0) {
				player.runCommand(`tellraw @s {"rawtext":[{"text":"§aYou are safe to leave the game now."}]}`);
			}
		} else {
			player.runCommand(`scoreboard players set @s combo 0`);
		}
		//Level Up
		if (Math.ceil(getScore("level", player) / 4 * 5 + 10) <= getScore("sub_level", player)) { 
			levelUp(player);
		}
    }
}

function makeList(commandslist, player) {
	moveList = ["Leave Empty"]
	for (let i = 0; i < commandslist.length; i++) {
		if ((commandslist[i].style === getBendingStyle(player).toLowerCase() || player.hasTag("avatar")) && commandslist[i].unlockable <= getScore("level", player) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(player))) {
			moveList.push(`${commandslist[i].name}`);
		}
	}
	return moveList;
}

function levelUp(player) {
    player.runCommand("scoreboard players set @s sub_level 0");
	player.runCommand("playsound random.levelup @s ~ ~ ~");
	player.runCommand("scoreboard players add @s level 1");
	player.runCommand(`xp 50 @s`);
	player.runCommand("particle a:level_up ~~~");
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§bYou have leveled up to level: §r"},{"score":{"name": "@s","objective": "level"}}]}`);
	try { } catch (error) {}
	//List all the moves for that level, because you can only level up once it looks like an interactive unlock
	for (let i = 0; i < commandslist.length; i++) {
		if (commandslist[i].style === getBendingStyle(player).toLowerCase() && commandslist[i].unlockable === getScore("level", player) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(player))) {
			player.runCommand(`tellraw @s {"rawtext":[{"text":"§bYou have unlocked a new move: §r${commandslist[i].name}"}]}`);
		}
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
		player.runCommand(`scoreboard players set @s ground 1`);
	} else {
		player.runCommand(`scoreboard players set @s ground 0`);
	}
	if (getScore("detect_sprint", player) === 1 && getScore("ground", player) === 1 && getScore("earth_sprint", player) < 100) {
		player.runCommand("scoreboard players add @s earth_sprint 1");
	} else if (getScore("detect_sprint", player) === 1 && getScore("ground", player) === 1 && getScore("earth_sprint", player) === 100) {
		player.runCommand("effect @s speed 5 3 true");
		if (getScore("ground", player) === 1) {
			player.runCommand("camerashake add @s 0.1 0.1 positional");
			player.runCommand("particle a:earth_sprint ~~~");
		}
	} else if (getScore("detect_sprint", player) === 0) {
		player.runCommand("scoreboard players set @s earth_sprint 0");
	}
}

function airRuntime(player) {
	if (getScore("detect_sneak", player) === 1 && getScore("cooldown1", player) === 100) {
		if (getScore("air_invis", player) === 100) {
			player.runCommand("effect @s invisibility 1 1 true");
			player.runCommand("particle minecraft:end_chest ~ ~ ~");
		} else { player.runCommand("scoreboard players add @s air_invis 1"); }
	} else { player.runCommand("scoreboard players set @s air_invis 0"); }
	if (player.hasTag('sub_projectile')) {
		try { player.runCommand("tag @e[r=10,type=arrow] add seeking"); } catch (error) {}
		try { player.runCommand(`execute @e[r=${getScore("level", player)*4},type=arrow,tag=seeking] ~~~ detect ~~-1~ air 0 particle a:air_blast ~~~`); } catch (error) {}
		try { player.runCommand(`execute @e[r=${getScore("level", player)*4},type=arrow,tag=seeking] ~~~ execute @e[r=2,type=!arrow,tag=!seeking,tag=!sub_projectile] ~~~ damage @s 2 projectile`); } catch (error) {}
		try { player.runCommand(`execute @e[r=${getScore("level", player)*4},type=arrow,tag=seeking] ~~~ execute @e[r=2,type=!arrow,tag=!seeking,tag=!sub_projectile] ~~~ kill @e[r=4,type=arrow]`); } catch (error) {}
		try { player.runCommand(`execute @e[r=${getScore("level", player)*4},c=5,type=arrow,tag=seeking] ~~~ tp @s ^^^1 facing @e[tag=!sub_projectile,tag=!seeking,type=!armor_stand,type=!item,c=1,type=!xp_orb]`); } catch (error) {}
	}
}

function waterRuntime(player) {
	if (getScore("detect_water", player) === 1 && getScore("cooldown1", player) === 100) {
		player.runCommand(`effect @s conduit_power 10 2 true`);
	}
	if (player.hasTag("full_moon")) {
		player.runCommand(`effect @s strength 10 4 true`);
		player.runCommand(`effect @s speed 10 2 true`);
	}
}

export function actionMoves(player, slotExecuted) {
	if (slotExecuted === 1) {
		makeList(commandslist, player);
		let cmd = toCamelCase(moveList[getScore("moveslot1", player)]);
		if (!player.hasTag("chatmsgoff") && getScore("moveslot1", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore("moveslot1", player)]}!§r"}]}`); }
		try { commands[cmd].execute(player); if (slot != 1) { slot = 1; player.runCommand('scoreboard players add @s sub_level 3'); } } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have slot 1 empty!§r"}]}`); player.runCommand("scoreboard players set @s cooldown1 0"); }
	} else if (slotExecuted === 2) {
		makeList(commandslist, player);
		let cmd = toCamelCase(moveList[getScore("moveslot2", player)]);
		if (!player.hasTag("chatmsgoff") && getScore("moveslot2", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore("moveslot2", player)]}!§r"}]}`); }
		try { commands[cmd].execute(player); if (slot != 2) { slot = 2; player.runCommand('scoreboard players add @s sub_level 2'); } } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have slot 2 empty!§r"}]}`); player.runCommand("scoreboard players set @s cooldown1 0"); }
	} else if (slotExecuted === 3) {
		makeList(commandslist, player);
		let cmd = toCamelCase(moveList[getScore("moveslot3", player)]);
		if (!player.hasTag("chatmsgoff") && getScore("moveslot3", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore("moveslot3", player)]}!§r"}]}`); }
		try { commands[cmd].execute(player); if (slot != 3) { slot = 3; player.runCommand('scoreboard players add @s sub_level 2'); } } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have slot 3 empty!§r"}]}`); player.runCommand("scoreboard players set @s cooldown1 0"); }
	} else if (slotExecuted === 4) {
		makeList(commandslist, player);
		let cmd = toCamelCase(moveList[getScore("moveslot4", player)]);
		if (!player.hasTag("chatmsgoff") && getScore("moveslot4", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore("moveslot4", player)]}!§r"}]}`); }
		try { commands[cmd].execute(player); if (slot != 4) { slot = 4; player.runCommand('scoreboard players add @s sub_level 2'); } } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have slot 4 empty!§r"}]}`); player.runCommand("scoreboard players set @s cooldown1 0"); }
	}
}

function setup(player) {
	const list = ["ground", "cooldown1", "charged_attack", "earth_sprint", "air_invis", "sub_level", "level", "home", "shop", "combo", "unlocked", "moveslot1", "moveslot2", "moveslot3", "moveslot4", "detect_rhy", "aas", "combat", "detect_water", "deaths", "kills", "money", "detect_left", "detect_sneak", "detect_dsneak", "detect_sneakTemp", "detect_dsneakSet", "detect_sprint", "detect_rhx"]
	list.forEach(forEachScoreboard, player);
	player.runCommand(`scoreboard players set @a detect_dsneakSet 20`);
	player.runCommand("gamerule sendcommandfeedback false");
	player.runCommand("gamerule commandblockoutput false");
	player.runCommand("gamerule showtags false");
	player.addTag("setup");
	player.runCommand(`playsound random.levelup @s`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§l§bAvatar Addon Commands:"}]}`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!help§r - Shows this help menu!"}]}`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!bending§r - Toggles your ability to bend, you can also put arrows in your offhand."}]}`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!scroll§r - Gives you the bending scroll, which you can use to choose, choose slots, edit settings, and more!"}]}`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!stats <player>§r - Shows a players stats, like kills, deaths and level!"}]}`);
	if (!getScore("shop", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!shop <buy, sell, help>§r - Use the shop to sell and buy items, use <!shop help> to find out more"}]}`); }
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!info <moves, slots, passives>§r - Get your current moves or slots to choose from!"}]}`);
	if (!getScore("home", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!home <set, delete, teleport, help>§r - Creates or edits a home, which you can tp back too."}]}`); }
	player.runCommand(`tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}`);
}

function forEachScoreboard(item) {
	try { world.getDimension("overworld").runCommand(`scoreboard objectives add ${item} dummy`); } catch (error) {}
	try { world.getDimension("overworld").runCommand(`scoreboard players add @a ${item} 0`); } catch (error) {}
}