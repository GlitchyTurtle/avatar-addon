import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Lift',
    description: 'Lifts a huge chunk of earth up with you.',
    style: 'earth',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommand("playsound dig.grass @a[r=10]");
			player.runCommand("clone ~5 ~-2 ~5 ~-5 ~4 ~-5 ~-5 ~4 ~-5 masked move");
			player.runCommand("execute @e[r=10] ~ ~ ~ tp @s ~ ~6 ~");
			let {x, y, z} = player.location;
			let dropTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				if (event.currentTick - startTick > 100) {
					world.events.tick.unsubscribe(dropTick);
					try { player.runCommand(`execute @s ${x} ${y} ${z} clone ~5 ~4 ~5 ~-5 ~-4 ~-5 ~-5 ~-10 ~-5 masked move`); } catch (error) {}
					try { player.runCommand(`execute @s ${x} ${y} ${z} execute @e[r=10] ~ ~ ~ tp @s ~ ~-6 ~`); } catch (error) {}
					startTick = undefined;
				}
			})
		}
    }
}

export default command