import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Lift',
    description: 'Lifts a huge chunk of earth up with you.',
    style: 'earth',
    unlockable: 10,
    unlockable_for_avatar: 51,
    cooldown: 'slow',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("playsound dig.grass @a[r=10]");
			let {x, y, z} = player.location;
			player.runCommandAsync("clone ~5~-2~5 ~-5~4~-5 ~-5~4~-5 masked move");
			player.runCommandAsync("execute as @e[r=10] at @s run tp @s ~~6~");
			let dropTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				if (event.currentTick - startTick > 100) {
					world.events.tick.unsubscribe(dropTick);
					try { player.runCommandAsync(`execute as @s positioned ${x} ${y+6} ${z} run clone ~5 ~4 ~5 ~-5 ~-4 ~-5 ~-5 ~-10 ~-5 masked move`); } catch (error) {}
					startTick = undefined;
				}
			})
		}
    }
}

export default command