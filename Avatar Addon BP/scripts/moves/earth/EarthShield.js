import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Shield',
    description: 'Protect yourself from damage!',
    style: 'earth',
    unlockable: 4,
    unlockable_for_avatar: 45,
    cooldown: 'slow',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
			player.runCommandAsync("particle a:earth_shield ~~~");
			player.runCommandAsync("playsound dig.grass @a[r=10]");
			let {x, y, z} = player.location;
			let earthShieldTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				try { player.runCommandAsync(`execute as @e[x=${x},y=${y},z=${z},name=!"${player.name}",r=4] at @s run tp @s ^^^-1 facing ${x} ${y} ${z}`); } catch (error) {}
				if (event.currentTick - startTick > 120) {
					world.events.tick.unsubscribe(earthShieldTick);
					startTick = undefined;
				}
			})
		}
    }
}

export default command