import { world } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Earth Top',
    description: 'Go to the highest block above you. Useful for getting out of caves or escaping!',
    style: 'earth',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommand("camerashake add @s 0.4 0.1 positional");
			player.runCommand("spreadplayers ~~ 0 1 @s");
		}
    }
}

export default command