import { ModalFormData } from "@minecraft/server-ui";
import { getScore, getBendingStyle, getSubBendingStyle } from "./../util.js";
import commands from './../moves/import.js';

let moveList;
const commandslist = Object.values(commands)

export function chooseSlotsMenu(source) {
	// SUPER IMPORTANT, in case they don't have a level score yet
	source.runCommandAsync( `scoreboard players add @s level 0`);

	// Some quick checks
	if (source.hasTag('bending_off')) {
		return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou need to enable bending to choose!§r"}]}`);
	}
	if (!source.hasTag("avatar") && !source.hasTag("air") && !source.hasTag("water") && !source.hasTag("fire") && !source.hasTag("earth")) {
		return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cChoose a bending type first!"}]}`);;
	}

	// Slot choice menu
    let prevscore1 = getScore("moveslot1", source)
    let prevscore2 = getScore("moveslot2", source)
    let prevscore3 = getScore("moveslot3", source)
    let prevscore4 = getScore("moveslot4", source)
	moveList = ["Leave Empty"]
	for (let i = 0; i < commandslist.length; i++) {
		if ((commandslist[i].style === getBendingStyle(source).toLowerCase() || source.hasTag("avatar") && commandslist[i].unlockable_for_avatar <= getScore("level", source)) && commandslist[i].unlockable <= getScore("level", source) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(source))) {
			moveList.push(`${commandslist[i].name}`);
		}
	}
	
	let chooseSlot = new ModalFormData();
	chooseSlot.title(`Slot Choice Menu: ${getBendingStyle(source)}`);
	chooseSlot.dropdown(`${getBendingStyle(source)} Move Slot #1`, moveList, prevscore1);
	chooseSlot.dropdown(`${getBendingStyle(source)} Move Slot #2`, moveList, prevscore2);
	chooseSlot.dropdown(`${getBendingStyle(source)} Move Slot #3`, moveList, prevscore3);
	chooseSlot.dropdown(`${getBendingStyle(source)} Move Slot #4`, moveList, prevscore4);

	// Show the menu
	chooseSlot.show(source).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return source.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou exited the menu, so your selection was not saved!"}]}`);
		let [slotchoice1, slotchoice2, slotchoice3, slotchoice4] = formValues;
		//console.warn(`chooseSlot : ${slotchoice1} : ${slotchoice2} : ${slotchoice3} : ${slotchoice4}`);
		source.runCommandAsync( `scoreboard players set @s moveslot1 ${slotchoice1}`);
		source.runCommandAsync( `scoreboard players set @s moveslot2 ${slotchoice2}`);
		source.runCommandAsync( `scoreboard players set @s moveslot3 ${slotchoice3}`);
		source.runCommandAsync( `scoreboard players set @s moveslot4 ${slotchoice4}`);
	})
}