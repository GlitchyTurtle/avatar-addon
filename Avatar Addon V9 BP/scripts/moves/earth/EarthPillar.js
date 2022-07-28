import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Pillar',
    description: 'Lift the earth under you 4 blocks up.',
    style: 'earth',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommand("playsound dig.grass @a[r=10]");
			player.runCommand("tp @s ~ ~4 ~");
			let {x, y, z} = player.location;
			player.runCommand("clone ~ ~-8 ~ ~ ~-4 ~ ~ ~-4 ~");
			player.runCommand("fill ~ ~-8 ~ ~ ~-5 ~ air");
			let dropPillarTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				if (event.currentTick - startTick > 100) {
					world.events.tick.unsubscribe(dropPillarTick);
					try { player.runCommand(`execute @s ${x} ${y} ${z} clone ~~-1~ ~~-4~ ~~-8~`); } catch (error) {}
					try { player.runCommand(`execute @s ${x} ${y} ${z} fill ~ ~ ~ ~ ~-4 ~ air`); } catch (error) {}
					startTick = undefined;
				}
			})
		}
    }
}

export default command