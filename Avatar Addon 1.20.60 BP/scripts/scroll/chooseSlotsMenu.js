import { ModalFormData } from "@minecraft/server-ui";
import { getScore, setScore, getBendingStyle, parseMoveslot, toCamelCase, delayedFunc } from "./../util.js";
import { refreshSidebar } from './../runtimes/main.js';
import { playerHasSkill } from './skillTreeMenu.js';
import commands from '../moves/import.js';

const commandslist = Object.values(commands)

export function validateMoves(source) {
	const BENDING_STYLE = getBendingStyle(source);
	if (BENDING_STYLE == "Non-bender") return;

	let moveList = ["Leave Empty"]
	for (let i = 0; i < commandslist.length; i++) {
		let currentMove = commandslist[i];
		if ((currentMove.name.length > 0) && (currentMove.style === BENDING_STYLE.toLowerCase() || source.hasTag("avatar")) && ((source.hasTag("avatar") && currentMove.unlockable_for_avatar <= getScore("level", source)) || (!source.hasTag("avatar") && currentMove.unlockable <= getScore("level", source))) && (currentMove.skill_required === undefined || playerHasSkill(source, currentMove.skill_required)) ) {
			moveList.push(`${currentMove.name}`);
		}
	}

	for (let i = 1; i <= 9; i++) {
		const slotAndBinding = parseMoveslot(getScore(`moveslot${i}`, source));
		const moveName = commandslist[slotAndBinding[1]].name

		if (!moveList.includes(moveName)) setScore(source, `moveslot${i}`, 10);
	}

	refreshSidebar(source);
	delayedFunc(source, (bendingCooldown) => refreshSidebar(source), 5);
	delayedFunc(source, (bendingCooldown) => refreshSidebar(source), 25);
}

export function chooseSlotsMenu(source) {
	setScore(source, "level", 0, true);

	const BENDING_STYLE = getBendingStyle(source);
	if (BENDING_STYLE == "Non-bender") return source.sendMessage("§cChoose a bending type first!");

	validateMoves(source);

	const slotBinding = ["Sneak Twice Fast", "Sneak and Punch", "Right Click Item", "Look Down and Punch", "Look Up and Sneak"]
	let moveList = ["Leave Empty"]
	for (let i = 0; i < commandslist.length; i++) {
		let currentMove = commandslist[i];
		//BENDING_STYLE.toLowerCase() flter

		if (
			// Error check
			(currentMove.name.length > 0) &&

			// Check for current type
			(currentMove.style === BENDING_STYLE.toLowerCase() || source.hasTag("avatar")) &&

			// Basic unlocks
			((source.hasTag("avatar") && currentMove.unlockable_for_avatar <= getScore("level", source)) || 
			(!source.hasTag("avatar") && currentMove.unlockable <= getScore("level", source))) &&

			// Skill Tree now!
			(currentMove.skill_required === undefined || playerHasSkill(source, currentMove.skill_required)) 
			) {

			// Actual if statment body
			moveList.push(`${currentMove.name}`);
		}
	}

	const slotPrevScores = [];
	const bindingPrevScores = [];
	for (let i = 1; i <= 9; i++) {
		const slotAndBinding = parseMoveslot(getScore(`moveslot${i}`, source));
		bindingPrevScores.push(slotAndBinding[0] - 1);

		// We look for the (maybe) new index of the move in case a move was inserted before it and the index would be wrong
		// This fixes the issue, but does lead to some unintended consequences (see the if exists check)
		const moveName = commandslist[slotAndBinding[1]].name
		const index = moveList.findIndex(name => name == moveName);

		if (moveList.includes(moveName)) {
			slotPrevScores.push(index);
		} else {
			slotPrevScores.push(0);
		}
	}

	const chooseSlot = new ModalFormData();
	chooseSlot.title(`Slot Choice Menu: ${BENDING_STYLE}`);
	for (let i = 1; i <= 9; i++) {
		chooseSlot.dropdown(`${BENDING_STYLE} Move Slot #${i}`, moveList, slotPrevScores[i-1]);
		chooseSlot.dropdown(`Move Slot #${i} Activation Binding`, slotBinding, bindingPrevScores[i-1]);
	}
	
	chooseSlot.show(source).then((ModalFormResponse) => {
		const { formValues } = ModalFormResponse;
		if (!formValues) return source.sendMessage("§cYou exited the menu, so your selection was not saved!");

		let message = "----------------\n";
		for (let i = 1; i <= 18; i += 2) {
			const itemName = toCamelCase(`${moveList[formValues[i-1]]}`);
			let itemIndex;
			
			for (let i = 0; i < Object.keys(commands).length; i++) {
				if (Object.keys(commands)[i] === itemName) {
					itemIndex = i;
					break;
				}
			}
			message += (`§bSlot ${(i+1)/2}:§r ${moveList[formValues[i-1]]}${ moveList[formValues[i-1]] !== "Leave Empty" ? " - " + [slotBinding[formValues[i]]] : ""}\n`)

			setScore(source, `moveslot${(i+1)/2}`, parseInt(`${formValues[i] + 1}${itemIndex}`));
		}
		source.sendMessage(message + "----------------");
		refreshSidebar(source);
	}); 
}