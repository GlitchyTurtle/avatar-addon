import { world } from "mojang-minecraft";
import commands from './../../moves/import.js';
import { getScore, getBendingStyle, getSubBendingStyle } from "./../../util.js";

const World = world;

export function levelup(message, args) {
	let player = message.sender;
	if (player.hasTag("staff")) {
		message.cancel = true;
		
		if (!args.length) {
			return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cYou need to pass an argument, like @${player.name}."}]}`);
		}
		
		let member;
		for (let pl of World.getPlayers()) {
			if ((args[0].toLowerCase().replace(/"|\\|@/g, "")).includes(pl.nameTag.toLowerCase())) {
				member = pl;
			}
		}
		
		if (!member) {
			return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cCouldn't find that player."}]}`);
		}
		
		for (let i = 1; i < (parseFloat(args[1])+1); i++) {
			levelUp(player);
		}
	}
}

function levelUp(player) {
	let commandslist = Object.values(commands)
    player.runCommand("scoreboard players set @s sub_level 0");
	player.runCommand("playsound random.levelup @s ~ ~ ~");
	player.runCommand("scoreboard players add @s level 1");
	player.runCommand(`xp 50 @s`);
	player.runCommand("particle a:level_up ~~~");
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§bYou have leveled up to level: §r"},{"score":{"name": "@s","objective": "level"}}]}`);
	for (let i = 0; i < commandslist.length; i++) {
		if ((commandslist[i].style === getBendingStyle(player).toLowerCase() || player.hasTag("avatar")) && commandslist[i].unlockable === getScore("level", player) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(player))) {
			player.runCommand(`tellraw @s {"rawtext":[{"text":"§bYou have unlocked a new move: §r${commandslist[i].name}"}]}`);
		}
	}
}