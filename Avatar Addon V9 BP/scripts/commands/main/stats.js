import { world } from "mojang-minecraft";
import { getScore, getBendingStyle, getSubBendingStyle } from "./../../util.js";
import commands from './../../moves/import.js';

const World = world;
let moveList;

export function stats(message, args) {
    message.cancel = true;
	let player = message.sender;
	
	if (!args.length) {
		return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cYou need to pass an argument, like @${player.name}."}]}`);
    }
    
    let member;
    for (let pl of World.getPlayers()) {
        if (pl.nameTag.toLowerCase() === args[0].toLowerCase().replace(/"|\\|@/g, "")) {
            member = pl;
        }
    }
    
    if (!member) {
        return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cCouldn't find that player."}]}`);
    }
	
	if (member.hasTag("hide_stats") && !player.hasTag("staff")) {
		return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cThat player has privated their stats."}]}`);
	}
	
	let commandslist = Object.values(commands)
	moveList = ["Empty"]
	for (let i = 0; i < commandslist.length; i++) {
		if (commandslist[i].style === getBendingStyle(member).toLowerCase() && commandslist[i].unlockable <= getScore("level", member) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(member))) {
			moveList.push(`${commandslist[i].name}`);
		}
	}
    player.runCommand(`playsound random.levelup "${player.name}"`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"---------------------\n§b${member.nameTag}§r is a level §b${getScore("level", member)}§r ${getBendingStyle(member)}bender. \nThey have §c${getScore("deaths", member)}§r deaths, and §a${getScore("kills", member)}§r kills."},{"text":"\nTheir build is: \n§bSlot 1: §r${moveList[getScore("moveslot1", member)]}\n§bSlot 2: §r${moveList[getScore("moveslot2", member)]}\n§bSlot 3: §r${moveList[getScore("moveslot3", member)]}\n§bSlot 4: §r${moveList[getScore("moveslot4", member)]}\n§bSlot 5: §r${moveList[getScore("moveslot5", member)]}\n§bSlot 6: §r${moveList[getScore("moveslot6", member)]} §r\n---------------------"}]}`);
}