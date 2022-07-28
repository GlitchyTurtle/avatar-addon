import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let check;

const command = {
    name: 'Earth Search',
    description: 'Search the blocks under you and one block in each direction for diamonds (1000 blocks total).',
    style: 'earth',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommand("camerashake add @s 0.4 0.1 positional");
			check = 1000;
			for (let i = 1; i < 201; i++) {
				try { player.runCommand(`execute @s ~~~ detect ~~-${i}~ diamond_ore -1 tellraw @s {"rawtext":[{"text":"${i} blocks below you: "},{"text":"§bDiamond"}]}`); } catch (error) {check = check - 1}
				try { player.runCommand(`execute @s ~~~ detect ~1~-${i}~ diamond_ore -1 tellraw @s {"rawtext":[{"text":"${i} blocks below you: "},{"text":"§bDiamond"}]}`); } catch (error) {check = check - 1}
				try { player.runCommand(`execute @s ~~~ detect ~-1~-${i}~ diamond_ore -1 tellraw @s {"rawtext":[{"text":"${i} blocks below you: "},{"text":"§bDiamond"}]}`); } catch (error) {check = check - 1}
				try { player.runCommand(`execute @s ~~~ detect ~~-${i}~1 diamond_ore -1 tellraw @s {"rawtext":[{"text":"${i} blocks below you: "},{"text":"§bDiamond"}]}`); } catch (error) {check = check - 1}
				try { player.runCommand(`execute @s ~~~ detect ~~-${i}~-1 diamond_ore -1 tellraw @s {"rawtext":[{"text":"${i} blocks below you: "},{"text":"§bDiamond"}]}`); } catch (error) {check = check - 1}
			}
			if (check === 0) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cFound nothing."}]}`); }
		}
    }
}

export default command