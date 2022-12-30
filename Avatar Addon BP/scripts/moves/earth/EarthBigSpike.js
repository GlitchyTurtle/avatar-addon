import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Big Spike',
    description: 'Summons a big spike five blocks out from the player, which launchs the nearby players and does damage.',
    style: 'earth',
    unlockable: 9,
    unlockable_for_avatar: 50,
    cooldown: 'slow',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("playsound dig.grass @a[r=10]");
			player.runCommandAsync("structure load earth_1 ^ ^ ^5");
		    	try { player.runCommandAsync(`execute as @s positioned ^^^5 run damage @e[r=3,type=!item,name=!${player.name}] ${Math.ceil(Math.min(getScore("level", player)/4, 16))+2} none entity @s`); } catch (error) {}
			try { player.runCommandAsync(`execute as @s positioned ^^^5 run effect @e[r=3,type=!item,name=!${player.name}] levitation 1 15 true`); } catch (error) {}
		}
    }
}

export default command