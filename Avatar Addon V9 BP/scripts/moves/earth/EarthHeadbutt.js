import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Headbutt',
    description: 'Run fast and deal damage to nearby players!',
    style: 'earth',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommand("playsound dig.grass @a[r=10]");
			let earthThrowTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				player.runCommand("effect @s speed 1 2");
				try { player.runCommand("damage @e[r=5,rm=0.8] 2 none"); } catch (error) {}
				if (event.currentTick - startTick > 100) {
					world.events.tick.unsubscribe(earthThrowTick);
					startTick = undefined;
				}
			})
		}
    }
}

export default command