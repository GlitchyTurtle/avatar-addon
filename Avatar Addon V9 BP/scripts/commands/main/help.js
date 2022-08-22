import { getScore } from "./../../util.js";

export function help(message) {
    message.cancel = true;
    let player = message.sender
	player.runCommand(`playsound random.levelup "${message.sender.nameTag}"`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§l§bAvatar Addon Commands:"}]}`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!help§r - Shows this help menu!"}]}`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!bending§r - Toggles your ability to bend, you can also put arrows in your offhand."}]}`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!scroll§r - Gives you the bending scroll, which you can use to choose, choose slots, edit settings, and more!"}]}`);
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!stats <player>§r - Shows a players stats, like kills, deaths and level!"}]}`);
	if (!getScore("shop", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!shop <buy, sell, help>§r - Use the shop to sell and buy items, use <!shop help> to find out more"}]}`); }
	player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!info <moves, slots, passives>§r - Get your current moves or slots to choose from!"}]}`);
	if (!getScore("home", player)) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§b!home <set, delete, teleport, help>§r - Creates or edits a home, which you can tp back too."}]}`); }
	player.runCommand(`tellraw @s {"rawtext":[{"text":"-----------------------------------------§r"}]}`);
}