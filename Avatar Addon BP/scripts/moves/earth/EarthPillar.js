import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Pillar',
    description: 'Lift the earth under you 4 blocks up.',
    style: 'earth',
    unlockable: 0,
    unlockable_for_avatar: 41,
    cooldown: 'slow',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			let {x, y, z} = player.location;
			console.warn(x,y,z)
			player.runCommandAsync("playsound dig.grass @a[r=10]");
			create(player);
			let dropPillarTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				if (event.currentTick - startTick > 50) {
					world.events.tick.unsubscribe(dropPillarTick);
					remove(player, x, y, z)
					startTick = undefined;
				}
			})
		}
    }
}

async function create(player) {
	await player.runCommandAsync("tp @s ~ ~4 ~");
	await player.runCommandAsync("clone ~ ~-8 ~ ~ ~-5 ~ ~ ~-4 ~");
	await player.runCommandAsync("fill ~ ~-8 ~ ~ ~-5 ~ air");
}

async function remove(player, x, y, z) {
	await player.runCommandAsync(`execute as @s positioned ${x} ${y+4} ${z} run clone ~~-1~ ~~-4~ ~~-8~`);
	await player.runCommandAsync(`execute as @s positioned ${x} ${y+4} ${z} run fill ~~~ ~~-4~ air`);
}

export default command