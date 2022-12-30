import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Headbutt',
    description: 'Run fast and deal damage to nearby players!',
    style: 'earth',
    unlockable: 5,
    unlockable_for_avatar: 46,
    cooldown: 'slow',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("playsound dig.grass @a[r=10]");
			let earthThrowTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				player.runCommandAsync("effect @s speed 1 2");
				try { player.runCommandAsync(`damage @e[r=5,type=!item,name=!${player.name}] 2 none`); } catch (error) {}
				try { player.runCommandAsync("fill ~-1~~-1 ~1~2~1 air 0 destroy"); } catch (error) {}
				if (event.currentTick - startTick > 100) {
					world.events.tick.unsubscribe(earthThrowTick);
					startTick = undefined;
				}
			})
		}
    }
}

export default command