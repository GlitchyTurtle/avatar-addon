import { getScore, getBendingStyle, getSubBendingStyle } from "./../../util.js";
import commands from './../../moves/import.js';

export function info(message, args) {
    message.cancel = true;
	let player = message.sender;

    player.runCommand(`playsound random.levelup "${player.nameTag}"`);
	
	if (!args.length || !args.includes("moves") && !args.includes("slots") && !args.includes("passives")) {
        return player.runCommand(`tellraw @s {"rawtext":[{"text":"§cThe argument (${args}) is not valid. Please use: moves, slots, passives"}]}`);
    }
	
	player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§l§b${getBendingStyle(player)}bender§r"}]}`);
	player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
	
	if (args.includes("moves")) {
		if (player.hasTag("earth") || player.hasTag("air") || player.hasTag("fire") || player.hasTag("water")) {
			let commandslist = Object.values(commands);
			for (let i = 0; i < commandslist.length; i++) {
				if (commandslist[i].style === getBendingStyle(player).toLowerCase() && commandslist[i].unlockable <= getScore("level", player) && (!commandslist[i].sub_bending_required || commandslist[i].sub_bending_required === getSubBendingStyle(player))) {
					player.runCommand(`tellraw @s {"rawtext":[{"text":"§b${commandslist[i].name} §r- ${commandslist[i].description}"}]}`);
				}
			}
			player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
		} else if (player.hasTag("avatar")) {
			//avatar stuff
		}
	} else if (args.includes("slots")) {
		player.runCommand('tellraw @s {"rawtext":[{"text":"§bSlot 1 §r- Look up and sneak to trigger whatever move you have for slot 1."}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§bSlot 2 §r- Look down and punch to trigger whatever move you have for slot 2."}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§bSlot 3 §r- Double sneak (sneak twice quickly) to trigger whatever move you have for slot 3."}]}');
		player.runCommand('tellraw @s {"rawtext":[{"text":"§bSlot 4 §r- Sneak and punch to trigger whatever move you have for slot 4."}]}');
		try { player.runCommand('tellraw @s[scores={level=20..}] {"rawtext":[{"text":"§bSlot 5 §r- Look down and jump to trigger whatever move you have for slot 5."}]}'); } catch (error) {}
		try { player.runCommand('tellraw @s[scores={level=30..}] {"rawtext":[{"text":"§bSlot 6 §r- Jump and sneak to trigger whatever move you have for slot 6."}]}'); } catch (error) {}
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
	} else if (args.includes("passives")) {
		if (player.hasTag("earth")) {
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bEarth Sprint §r- When you sprint on earthly blocks for a certain time, you will be effected with speed."}]}');
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bHealth §r- Your health is 20 hearts, double the normal 10 hearts."}]}');
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bImmunity §r- You will not take suffocation damage taken from earthly blocks."}]}');
		} else if (player.hasTag("water")) {
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bWater Strength §r- When in or touching water, you will get a strength effect."}]}');
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bBonus §r- On full moons, your moves become more powerful, and you have extra resistance and strength."}]}');
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bHealth §r- Your health is 15 hearts, slightly more than the normal 10 hearts."}]}');
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bImmunity §r- You can breathe underwater, and are immune to drowning damage."}]}');
		} else if (player.hasTag("fire")) {
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bHot Hands§r- Right click (or long press) on any food item to automatically toast it up."}]}');
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bHealth §r- Your health is 15 hearts, slightly more than the normal 10 hearts."}]}');
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bImmunity §r- You are immune to any kind of lava or fire damage."}]}');
		} else if (player.hasTag("air")) {
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bLight Bend §r- After sneaking for a certain time, you will become invisible."}]}');
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bHealth §r- Your health is the normal 10 hearts."}]}');
			player.runCommand('tellraw @s {"rawtext":[{"text":"§bImmunity §r- You are immune to any kind of fall damage, including fall damage wearing an elytra (not wall hits though)."}]}');
		} else if (player.hasTag("avatar")) {
			
		}
		player.runCommand('tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}');
	}
}