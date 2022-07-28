import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Big Spike',
    description: 'Summons a big spike five blocks out from the player, which launchs the nearby players and does damage.',
    style: 'earth',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommand("playsound dig.grass @a[r=10]");
			player.runCommand("structure load earth_1 ^ ^ ^5");
		    	try { player.runCommand(`execute @s ^^^5 damage @e[r=3] ${Math.ceil(Math.min(getScore("level", player)/4, 16))+2} none entity @s`); } catch (error) {}
			try { player.runCommand(`execute @s ^^^5 effect @e[r=3] levitation 1 15 true`); } catch (error) {}
		}
    }
}

export default command