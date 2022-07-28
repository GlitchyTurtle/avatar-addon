import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Shove',
    description: 'Blasts a shockwave and does lots of damage to nearby players. Can also stop you from taking damage.',
    style: 'earth',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("effect @s resistance 1 255 true");
		if (getScore("ground", player) === 1) {
			player.runCommand("playsound dig.grass @a[r=10]");
			player.runCommand("particle a:earth_shockwave ~~~");
			player.runCommand("camerashake add @s 0.3 0.1 positional");
			try { player.runCommand(`execute @s ~~~ damage @e[r=6,rm=0.3] ${Math.ceil(Math.min(getScore("level", player)/4, 19))} none entity @s`); } catch (error) {}
		}
    }
}

export default command