import { world } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Burrow',
    description: 'Burrow 2 blocks under the ground to escape enemies, and look like you just teleported.',
    style: 'earth',
    unlockable: 1,
    unlockable_for_avatar: 42,
    cooldown: 'slow',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
			player.runCommandAsync("tp @s ~~-4~");
			//Weird, but it won't work on slower devices otherwise.
			let earthBurrowTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				try { player.runCommandAsync("fill ~~~~~2~ air 0 destroy"); } catch (error) {}
				if (event.currentTick - startTick > 10) {
					world.events.tick.unsubscribe(earthBurrowTick);
					startTick = undefined;
				}
			})
		}
    }
}

export default command