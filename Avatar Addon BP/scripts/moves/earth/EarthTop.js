import { world } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Earth Top',
    description: 'Go to the highest block above you. Useful for getting out of caves or escaping!',
    style: 'earth',
    unlockable: 7,
    unlockable_for_avatar: 48,
    cooldown: 'super_fast',
    async execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
      await player.runCommandAsync("effect @s add resistance 1 255 true");
			player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
			player.runCommandAsync("spreadplayers ~~ 0 1 @s");
		}
    }
}

export default command