import { Location, world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Water Shield',
    description: 'Protect yourself from damage!',
    style: 'water',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommand("camerashake add @s 0.4 0.1 positional");
			player.runCommand("particle a:water_shield ~~~");
			player.addTag("safeShieldW");
			let {x, y, z} = player.location;
			let waterShieldTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				try { player.runCommand(`execute @e[x=${x},y=${y},z=${z},tag=!safeShieldW,r=4] ~~~ tp @s ^^^-1 facing ${x} ${y} ${z}`); } catch (error) {}
				if (event.currentTick - startTick > 120) {
					world.events.tick.unsubscribe(waterShieldTick);
					startTick = undefined;
					player.removeTag("safeShieldW");
				}
			})
		}
    }
}

export default command