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
		if ((player.hasTag("avatar") || player.hasTag("air") || player.hasTag("fire") || player.hasTag("water") || player.hasTag("earth")) && !player.hasTag("antimagic") && !player.hasTag("chi_blocked")) {
			//Earth runtime
			if (player.hasTag("earth")) {
				earthRuntime(player);
			}
			
			//Air runtime
			if (player.hasTag("air")) {
				airRuntime(player);
			}
			
			//Level Up
			if (Math.ceil(getScore("level", player) / 4 * 5 + 10) <= getScore("sub_level", player)) {
				levelUp(player);
			}
			
			//Cooldown
			if (getScore("cooldown1", player) === 0) { player.runCommand(`title @s title a:${getBendingStyle(player).toLowerCase()}`); }
			if (getScore("cooldown1", player) < 100) { player.runCommand("scoreboard players add @s cooldown1 1"); }
			
			//Slot 1 - Sneak and look upwards
			if (getScore("cooldown1", player) === 100 && getScore("detect_rhx", player) === -90 && getScore("detect_sneak", player) === 1) {
				makeList(commandslist, player);
				let cmd = toCamelCase(moveList[getScore("moveslot1", player)]);
				if (!player.hasTag("chatmsgoff") && getScore("moveslot1", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore("moveslot1", player)]}!§r"}]}`); }
				try { commands[cmd].execute(player); if (slot != 1) { slot = 1; player.runCommand('scoreboard players add @s sub_level 1'); } } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have slot 1 empty!§r"}]}`); player.runCommand("scoreboard players set @s cooldown1 0"); }
			}
			//Slot 2 - Look down and punch
			if (getScore("cooldown1", player) === 100 && getScore("detect_rhx", player) >= 75 && getScore("detect_left", player) === 1) {
				makeList(commandslist, player);
				let cmd = toCamelCase(moveList[getScore("moveslot2", player)]);
				if (!player.hasTag("chatmsgoff") && getScore("moveslot2", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore("moveslot2", player)]}!§r"}]}`); }
				try { commands[cmd].execute(player); if (slot != 2) { slot = 2; player.runCommand('scoreboard players add @s sub_level 1'); } } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have slot 2 empty!§r"}]}`); player.runCommand("scoreboard players set @s cooldown1 0"); }
			}
			//Slot 3 - Sneak twice fast
			if (getScore("cooldown1", player) === 100 && getScore("detect_dsneak", player) === 1) {
				makeList(commandslist, player);
				let cmd = toCamelCase(moveList[getScore("moveslot3", player)]);
				if (!player.hasTag("chatmsgoff") && getScore("moveslot3", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore("moveslot3", player)]}!§r"}]}`); }
				try { commands[cmd].execute(player); if (slot != 3) { slot = 3; player.runCommand('scoreboard players add @s sub_level 1'); } } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have slot 3 empty!§r"}]}`); player.runCommand("scoreboard players set @s cooldown1 0"); }
			}
			//Slot 4 - Sneak and punch
			if (getScore("cooldown1", player) === 100 && getScore("detect_sneak", player) === 1 && getScore("detect_left", player) === 1 && getScore("detect_jump", player) === 0) {
				makeList(commandslist, player);
				let cmd = toCamelCase(moveList[getScore("moveslot4", player)]);
				if (!player.hasTag("chatmsgoff") && getScore("moveslot4", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore("moveslot4", player)]}!§r"}]}`); }
				try { commands[cmd].execute(player); if (slot != 4) { slot = 4; player.runCommand('scoreboard players add @s sub_level 1'); } } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have slot 4 empty!§r"}]}`); player.runCommand("scoreboard players set @s cooldown1 0"); }
			}
			//Slot 5 - Look down and jump (unlocked at lvl 20)
			if (getScore("level", player) > 20 && getScore("cooldown1", player) === 100 && getScore("detect_rhx", player) >= 75 && getScore("detect_jump", player) === 1) {
				makeList(commandslist, player);
				let cmd = toCamelCase(moveList[getScore("moveslot5", player)]);
				if (!player.hasTag("chatmsgoff") && getScore("moveslot5", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore("moveslot5", player)]}!§r"}]}`); }
				try { commands[cmd].execute(player); if (slot != 5) { slot = 5; player.runCommand('scoreboard players add @s sub_level 2'); } } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have slot 5 empty!§r"}]}`); player.runCommand("scoreboard players set @s cooldown1 0"); }
			}
			//Slot 6 - Jump in the air and sneak (unlocked at lvl 30)
			if (getScore("level", player) > 30 && getScore("cooldown1", player) === 100 && getScore("detect_sneak", player) === 1 && getScore("detect_jump", player) === 1) {
				makeList(commandslist, player);
				let cmd = toCamelCase(moveList[getScore("moveslot6", player)]);
				if (!player.hasTag("chatmsgoff") && getScore("moveslot6", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§rYou used §b${moveList[getScore("moveslot6", player)]}!§r"}]}`); }
				try { commands[cmd].execute(player); if (slot != 6) { slot = 5; player.runCommand('scoreboard players add @s sub_level 2'); } } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou have slot 6 empty!§r"}]}`); player.runCommand("scoreboard players set @s cooldown1 0"); }
			}
		}
		if (player.hasTag('chi_blocked') && getScore("cooldown1", player) === 100) { player.removeTag('chi_blocked'); }
    }
}

function makeList(commandslist, player) {
	moveList = ["Leave Empty"]
	for (let i = 0; i < commandslist.length; i++) {
		if (commandslist[i].style === getBendingStyle(player).toLowerCase() && commandslist[i].unlockable <= getScore("level", player) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(player))) {
			moveList.push(`${commandslist[i].name}`);
		}
	}
	return moveList;
}

function levelUp(player) {
	let commandslist = Object.values(commands)
    player.runCommand("scoreboard players set @s sub_level 0");
	player.runCommand("playsound random.levelup @s ~ ~ ~");
	player.runCommand("scoreboard players add @s level 1");
	player.runCommand(`xp 50 @s`);
	player.runCommand("particle a:level_up ~~~");
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§bYou have leveled up to level: §r"},{"score":{"name": "@s","objective": "level"}}]}`);
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