import { world } from "@minecraft/server";
import { ModalFormData } from "@minecraft/server-ui";
import { getScore, getBendingStyle, parseMoveslot, playerHasSkill } from "./../util.js";
import commands from './../moves/import.js';

const commandslist = Object.values(commands)

export function statsMenu(source) {
	// Stats menu players comp
	let players = [];
	let playerObjs = [];
	for (let player of world.getPlayers()) {
		playerObjs.push(player)
		players.push(player.nameTag);
	}

	// Stats menu display
	let statsMenu = new ModalFormData();
	statsMenu.title("See Player Stats");
	statsMenu.dropdown("Player Name:", players, 0);

	// Show the menu
	statsMenu.show(source).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return source.sendMessage("§cYou didn't select anything.");

		const [target] = formValues;
		const member = playerObjs[target];
		
		if (!member) {
			return source.sendMessage("§cCouldn't find that player.");
		}
		
		if (member.hasTag("hide_stats") && !source.hasTag("staff")) {
			return source.sendMessage("§cThat player has privated their stats.");
		} else if (member.hasTag("hide_stats")) {
			source.sendMessage("§cThat player has privated their stats, but you can see them anyway because you're OP.");
		}

		showStats(source, member)
	})
}

export function showStats(source, member) {
	const moveList = ["Empty"]
	const BENDING_STYLE = getBendingStyle(member);
	for (let i = 0; i < commandslist.length; i++) {
		let currentMove = commandslist[i];
		//BENDING_STYLE.toLowerCase() flter

		if (
			// Error check
			(currentMove.name.length > 0) &&

			// Check for current type
			(currentMove.style === BENDING_STYLE.toLowerCase() || member.hasTag("avatar")) &&

			// Basic unlocks
			((member.hasTag("avatar") && currentMove.unlockable_for_avatar <= getScore("level", member)) || 
			(!member.hasTag("avatar") && currentMove.unlockable <= getScore("level", member))) &&

			// Skill Tree now!
			(currentMove.skill_required === undefined || playerHasSkill(member, currentMove.skill_required)) 
			) {

			// Actual if statment body
			moveList.push(`${currentMove.name}`);
		}
	}
		
	let tags = member.getTags();
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
	if (member.hasTag("air") || member.hasTag("fire") || member.hasTag("earth") || member.hasTag("water")) {
		bendingStyle = getBendingStyle(member) + "bender";
	} else {
		bendingStyle = getBendingStyle(member);
	}

	let build = "\n"
	for (let i = 1; i <= 9; i++) {
		let currentMoveSlot = parseMoveslot(getScore(`moveslot${i}`, member))[1];
		let currentMove = commandslist[currentMoveSlot];
		build += (`§bSlot ${i}:§r ${currentMove.name}\n`)	
	}

	source.sendMessage(`----------------\n§b${member.nameTag}§r is a level §b${getScore("level", member)}§r ${bendingStyle}.\nThey have §c${getScore("deaths", member)}§r deaths, and §a${getScore("kills", member)}§r kills.\nThey have §a${counterHome}§r saved home locations and §a${counterMoveset}§r saved movesets.\nTheir build is: §r${build}----------------`);
}