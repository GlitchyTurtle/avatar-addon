import { world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { getScore, getBendingStyle, getSubBendingStyle } from "./../util.js";
import commands from './../moves/import.js';

let moveList;
const commandslist = Object.values(commands)

export function statsMenu(source) {
	// Stats menu players comp
	let players = [];
	for (let player of world.getPlayers()) {
		players.push(player.nameTag);
	}

	// Stats menu display
	let statsMenu = new ModalFormData();
	statsMenu.title("See Player Stats");
	statsMenu.dropdown("Player Name:", players, 0);

	// Show the menu
	statsMenu.show(source).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		let [target] = formValues;

		let member;
		for (let pl of world.getPlayers()) {
			if (pl.nameTag.toString() === players[target].toString()) {
				member = pl;
				break;
			}
		}
			
		if (!member) {
			return source.runCommandAsync( `tellraw "${source.nameTag}" {"rawtext":[{"text":"§cCouldn't find that player."}]}`);
		}
		
		if (member.hasTag("hide_stats") && !source.hasTag("staff")) {
			return source.runCommandAsync( `tellraw "${source.nameTag}" {"rawtext":[{"text":"§cThat player has privated their stats."}]}`);
		} else if (member.hasTag("hide_stats")) {
			source.runCommandAsync( `tellraw "${source.nameTag}" {"rawtext":[{"text":"§cThat player has privated their stats, but you can see them anyway because you're OP."}]}`);
		}
        
		moveList = ["Empty"]
		for (let i = 0; i < commandslist.length; i++) {
			if (commandslist[i].style === getBendingStyle(member).toLowerCase() && commandslist[i].unlockable <= getScore("level", member) || (member.hasTag("avatar") && commandslist[i].unlockable_for_avatar <= getScore("level", member)) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(member))) {
				moveList.push(`${commandslist[i].name}`);
			}
		}
			
		let tags = source.getTags();
		let counterHome = 0;
		let counterMoveset = 0;
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].startsWith("LocationHome:")) {
					counterHome = ++counterHome;
			}
			if (tags[i].startsWith("Moveset:")) {
					counterMoveset = ++counterMoveset;
			}
		}
		
		let bendingStyle;
		if (source.hasTag("air") || source.hasTag("fire") || source.hasTag("earth") || source.hasTag("water")) {
			bendingStyle = getBendingStyle(member) + "bender";
		} else {
			bendingStyle = getBendingStyle(member);
		}

		source.runCommandAsync( `playsound random.levelup @s`);
		source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"---------------------\n§b${member.nameTag}§r is a level §b${getScore("level", member)}§r ${bendingStyle}. \nThey have §c${getScore("deaths", member)}§r deaths, and §a${getScore("kills", member)}§r kills. \nTheir subbending style is §b${getSubBendingStyle(member)}§r.\nThey have §a${counterHome}§r saved home locations and §a${counterMoveset}§r saved movesets."},{"text":"\nTheir build is: \n§bSlot 1: §r${moveList[getScore("moveslot1", member)]}\n§bSlot 2: §r${moveList[getScore("moveslot2", member)]}\n§bSlot 3: §r${moveList[getScore("moveslot3", member)]}\n§bSlot 4: §r${moveList[getScore("moveslot4", member)]}§r\n---------------------"}]}`);
	})
}