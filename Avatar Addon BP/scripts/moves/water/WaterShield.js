import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Water Shield',
    description: 'Protect yourself from damage!',
    style: 'water',
    unlockable: 3,
    unlockable_for_avatar: 24,
    cooldown: 'fast',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
		player.runCommandAsync("particle a:water_shield ~~~");
		player.runCommandAsync("effect @s resistance 1 255 true");
		let {x, y, z} = player.location;
		let waterShieldTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			try { player.runCommandAsync(`execute as @e[x=${x},y=${y},z=${z},name=!"${player.name}",r=4] at @s run tp @s ^^^-1 facing ${x} ${y} ${z}`); } catch (error) {}
			if (event.currentTick - startTick > 120) {
				world.events.tick.unsubscribe(waterShieldTick);
				startTick = undefined;
			}
		})
    }
}

export default command