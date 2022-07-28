import { Location, world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Shield',
    description: 'Protect yourself from damage!',
    style: 'earth',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommand("camerashake add @s 0.4 0.1 positional");
			player.runCommand("particle a:earth_shield ~~~");
			player.runCommand("playsound dig.grass @a[r=10]");
			player.addTag("safeShield");
			let {x, y, z} = player.location;
			let earthShieldTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				try { player.runCommand(`execute @e[x=${x},y=${y},z=${z},tag=!safeShield,r=4] ~~~ tp @s ^^^-1 facing ${x} ${y} ${z}`); } catch (error) {}
				if (event.currentTick - startTick > 120) {
					world.events.tick.unsubscribe(earthShieldTick);
					startTick = undefined;
					player.removeTag("safeShield");
				}
			})
		}
    }
}

export default command