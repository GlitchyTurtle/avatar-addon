import { world, Location } from "mojang-minecraft";
import commands from './../../moves/import.js';
import { getScore, getBendingStyle } from "./../../util.js";

const World = world;
const commandslist = Object.values(commands);
let moveList;

export function moveset(message, args) {
	message.cancel = true;
	let player = message.sender;
	
	// Don't allow spaces
	if (args.length < 1) {
		return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cMissing args. Use !moveset help"}]}`);
	}
	
	if (args[0] === 'save') {
		// Don't allow spaces
		if (args.length > 2) {
			return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§cNo spaces in moveset names please!"}]}`);
		}

		// Make sure this name doesn't exist already and it doesn't exceed limitations
		let verify = false;
		let counter = 0;
		let tags = player.getTags();
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].replace("Moveset:", "").startsWith(args[1].toString()) && tags[i] != "air") {
				verify = true;
				player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"You already have a moveset named ${args[1]}!"}]}`)
				break;
			}
			if (tags[i].startsWith("Moveset:")) {
				counter = ++counter;
			}
			if (counter >= 3 && true) {
				verify = true;
				player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"You can only have 3 saved movesets!"}]}`)
				break; 
			}
		}
		if (verify === true) {
			return;
		}

		// Store their new home coordinates
		player.addTag(`Moveset:${args[1]} ${getScore("moveslot1", player)} ${getScore("moveslot2", player)} ${getScore("moveslot3", player)} ${getScore("moveslot4", player)} ${getScore("moveslot5", player)} ${getScore("moveslot6", player)}`);
		player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§a"},{"text":"Moveset ${args[1]} has been saved!"}]}`)
	} else if (args[0] === 'delete') {
		// Don't allow spaces
		if (args.length > 2) {
			return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"No spaces in names please!"}]}`);
		}

		// Find and delete this saved home location
		let verify = false;
		let tags = player.getTags();
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].replace("Moveset:", "").startsWith(args[1].toString())) {
				verify = true;
				player.removeTag(tags[i])
				player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"You have successfully deleted ${args[1]}!"}]}`)
				break;
			}
		}
		if (verify === true) {
			return;
		} else {
			player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"${args[1]} does not exist!"}]}`)
		}
	} else if (args[0] === 'list') {
		let tags = player.getTags();
		let counter = 0;
		let movesetArray;
		player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§b§l"},{"text":"Moveset List:"}]}`);
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].startsWith("Moveset:")) {
				let movesetArray = tags[i].split(' ');
				moveList = ["Empty"];
				for (let i = 0; i < commandslist.length; i++) {
					if (commandslist[i].style === getBendingStyle(player).toLowerCase() && commandslist[i].unlockable <= getScore("level", player) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(player))) {
						moveList.push(`${commandslist[i].name}`);
					}
				}
				player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§b"},{"text":"Moveset Name: §r${movesetArray[0].replace("Moveset:", "")} §bSlot 1: §r${moveList[movesetArray[1]]} §bSlot 2: §r${moveList[movesetArray[2]]} §bSlot 3: §r${moveList[movesetArray[3]]} §bSlot 4: §r${moveList[movesetArray[4]]} §bSlot 5: §r${moveList[movesetArray[5]]} §bSlot 6: §r${moveList[movesetArray[6]]}"}]}`);
				counter = ++counter;
				console.warn(`${counter} ${movesetArray}`)
			}
		}
		if (counter === 0) {
			player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"You do not have any saved locations!"}]}`);
		}
	} else if (args[0] === 'load') {
		// Don't allow spaces
		if (args.length > 2) {
			return player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"No spaces in names please!"}]}`);
		}

		let verify = false;
		let tags = player.getTags();
		for (let i = 0; i < tags.length; i++) {
			if (tags[i].replace("Moveset:", "").startsWith(args[1].toString())) {
				verify = true;
				let movesetArray = tags[i].split(' ');
				player.runCommand(`scoreboard players set @s moveslot1 ${movesetArray[1]}`)
				player.runCommand(`scoreboard players set @s moveslot2 ${movesetArray[2]}`)
				player.runCommand(`scoreboard players set @s moveslot3 ${movesetArray[3]}`)
				player.runCommand(`scoreboard players set @s moveslot4 ${movesetArray[4]}`)
				player.runCommand(`scoreboard players set @s moveslot5 ${movesetArray[5]}`)
				player.runCommand(`scoreboard players set @s moveslot6 ${movesetArray[6]}`)
				player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§a"},{"text":"You have successfully loaded moveset: ${args[1]}!"}]}`)
				break;
			}
		}
		if (verify) {
			return;
		} else {
			player.runCommand(`tellraw "${player.nameTag}" {"rawtext":[{"text":"§c"},{"text":"${args[1]} does not exist!"}]}`)
		}
	} else if (args[0] === 'help') {
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§bMoveset Subcommands:§r"}]}');
		player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!moveset save <name>§r - Copies your current moveset to load back later!"}]}`);
		player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!moveset load <name>§r - Load back one of the movesets you saved!"}]}`);
		player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!moveset delete <name>§r - Delete one of your movesets!"}]}`);
		player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!moveset list§r - List your movesets!"}]}`);
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
	}
}