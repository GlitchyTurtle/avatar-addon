import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let check;

const command = {
    name: 'Earth Search',
    description: 'Search the blocks under you and one block in each direction for diamonds (1000 blocks total).',
    style: 'earth',
    unlockable: 3,
    unlockable_for_avatar: 44,
    cooldown: 'super_fast',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
			player.runCommandAsync("function _internal/earth_search")
		} else {
			player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou need to be grounded!"}]}`);
		}
    }
}

export default command