import { getScore, getBendingStyle, getSubBendingStyle } from "./../../util.js";
import commands from './../../moves/import.js';

export function info(message, args) {
    message.cancel = true;
    message.sender.runCommand(`playsound random.levelup "${message.sender.nameTag}"`);
	
	if (args === 'moves') {
		if (message.sender.hasTag("earth") || message.sender.hasTag("air") || message.sender.hasTag("fire") || message.sender.hasTag("water")) {
			message.sender.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
			message.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§l§b${getBendingStyle(message.sender)}bender§r"}]}`);
			message.sender.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
			let commandslist = Object.values(commands);
			for (let i = 0; i < commandslist.length; i++) {
				if (commandslist[i].style === getBendingStyle(message.sender).toLowerCase() && commandslist[i].unlockable <= getScore("level", message.sender) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(message.sender))) {
					message.sender.runCommand(`tellraw @s {"rawtext":[{"text":"§b${commandslist[i].name} §r- ${commandslist[i].description}"}]}`);
				}
			}
			message.sender.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
		} else if (message.sender.hasTag("avatar")) {
			//avatar stuff
		}
	} else if (args === 'slots')
}