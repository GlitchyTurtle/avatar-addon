import { ActionFormData } from "@minecraft/server-ui";
import { getScore, getBendingStyle, getSubBendingStyle } from "./../util.js";
import commands from './../moves/import.js';

const commandslist = Object.values(commands)

export function bendingInfoMenu(source) {
	if (!source.hasTag("avatar") && !source.hasTag("air") && !source.hasTag("fire") && !source.hasTag("water") && !source.hasTag("earth")) return source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"§cYou can't bend, what do you need this for?§r"}]}`);
	let infoMenu = new ActionFormData();
	infoMenu.title("Bending Info: Main");	
	infoMenu.body("Learn what your moves, slots, or passives can do!");
	infoMenu.button("Moves", "textures/ui/avatar_logo");
	infoMenu.button("Slots", "textures/ui/info");
	infoMenu.button("Passives", "textures/ui/passives");

	infoMenu.show(source).then((ActionFormResponse) => {
		const { selection } = ActionFormResponse;
		if (selection === 0) {
			let moves = "";
			for (let i = 0; i < commandslist.length; i++) {
				if ((commandslist[i].style === getBendingStyle(source).toLowerCase() || source.hasTag("avatar")) && (commandslist[i].unlockable <= getScore("level", source) || (source.hasTag("avatar") && commandslist[i].unlockable_for_avatar <= getScore("level", source))) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(source))) {
					moves = moves + (`\n§b${commandslist[i].name} §r- ${commandslist[i].description}`);
				}
			}
			source.runCommandAsync( `tellraw @s {"rawtext":[{"text":"-----------------------------------------§r${moves}\n-----------------------------------------§r"}]}`);
		} else if (selection === 1) {
			source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"-----------------------------------------§r\n§bSlot 1 §r- Look up and sneak to trigger whatever move you have for slot 1.\n§bSlot 2 §r- Look down and punch to trigger whatever move you have for slot 2.\n§bSlot 3 §r- Double sneak (sneak twice quickly) to trigger whatever move you have for slot 3.\n§bSlot 4 §r- Sneak and punch to trigger whatever move you have for slot 4.\n-----------------------------------------§r"}]}');
		} else if (selection === 2) {
			if (source.hasTag("earth")) {
				source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"-----------------------------------------§r\n§bEarth Sprint §r- When you sprint on earthly blocks for a certain time, you will be effected with speed.\n§bHealth §r- Your health is 20 hearts, double the normal 10 hearts.\n§bImmunity §r- You will not take suffocation damage taken from earthly blocks.\n-----------------------------------------§r"}]}');
			} else if (source.hasTag("water")) {
				source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"-----------------------------------------§r\n§bWater Strength §r- When in or touching water, you will get a strength effect.\n§bBonus §r- On full moons, your moves become more powerful, and you have extra resistance and strength.\n§bHealth §r- Your health is 15 hearts, slightly more than the normal 10 hearts.\n§bImmunity §r- You can breathe underwater, and are immune to drowning damage.\n-----------------------------------------§r"}]}');
			} else if (source.hasTag("fire")) {
				source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"-----------------------------------------§r\n§bHot Hands §r- Right click (or long press) on any food item to automatically toast it up.\n§bHealth §r- Your health is 15 hearts, slightly more than the normal 10 hearts.\n§bImmunity §r- You are immune to any kind of lava or fire damage.\n-----------------------------------------§r"}]}');
			} else if (source.hasTag("air")) {
				source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"-----------------------------------------§r\n§bLight Bend §r- After sneaking for a certain time, you will become invisible.\n§bHealth §r- Your health is the normal 10 hearts.\n§bImmunity §r- You are immune to any kind of fall damage, including fall damage wearing an elytra (not wall hits though).\n-----------------------------------------§r"}]}');
			} else if (source.hasTag("avatar")) {
				source.runCommandAsync( 'tellraw @s {"rawtext":[{"text":"-----------------------------------------§r\n§bLight Bend §r- After sneaking for a certain time, you will become invisible.\n§bHot Hands§r- Right click (or long press) on any food item to automatically toast it up.\n§bWater Strength §r- When in or touching water, you will get a strength effect.\n§bEarth Sprint §r- When you sprint on earthly blocks for a certain time, you will be effected with speed.\n§bHealth §r- Your health is 20 hearts, double the normal 10 hearts.\n§bImmunity §r- You will not take earth suffocation damage, fall damage, fire damage, or water damage.\n-----------------------------------------§r"}]}');
			}
		}
	})
}