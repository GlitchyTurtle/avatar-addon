import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Shove',
    description: 'Blasts a shockwave and does lots of damage to nearby players. Can also stop you from taking damage.',
    style: 'earth',
    unlockable: 2,
    unlockable_for_avatar: 43,
    cooldown: 'super_fast',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		player.runCommandAsync("effect @s resistance 1 255 true");
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("playsound dig.grass @a[r=10]");
			player.runCommandAsync("particle a:earth_shockwave ~~~");
			player.runCommandAsync("camerashake add @s 0.3 0.1 positional");
			try { player.runCommandAsync(`damage @e[r=6,type=!item,name=!${player.name}] ${Math.ceil(Math.min(getScore("level", player)/4, 19))} none entity @s`); } catch (error) {}
		}
    }
}

export default command