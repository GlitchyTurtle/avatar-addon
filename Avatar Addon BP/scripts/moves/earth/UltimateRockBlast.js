import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

const command = {
	name: 'Ultimate Rock Blast',
	description: 'Send curving blasts that do major damage. Punch use the next combo piece.',
	style: 'earth',
	unlockable: 11,
	unlockable_for_avatar: 55,
	cooldown: 'slow',
	async execute(player) {
		let stage = 1;
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		await new Promise(resolve => {
			blast(player);
			resolve();
		});
	  	let rockBlastTick = world.events.tick.subscribe(async event => {
			if (!startTick) startTick = event.currentTick;
			if (stage === 1 && getScore("detect_left", player) === 1) {
				await new Promise(resolve => {
					blast(player);
					resolve();
				});
				stage++;
			} else if (stage === 2 && getScore("detect_left", player) === 1) {
				await new Promise(resolve => {
					blast(player);
					resolve();
				});
				player.runCommandAsync("tag @e[r=10,type=a:dirt_block_small] add move");
				world.events.tick.unsubscribe(rockBlastTick);
				startTick = undefined;
			}
			if (event.currentTick - startTick > 300 || (getScore("cooldown1", player) > 90 && event.currentTick - startTick > 20)) {
				world.events.tick.unsubscribe(rockBlastTick);
				startTick = undefined;
			}
	  	})
	}
}

async function blast(player) {
	return new Promise(resolve => {
		player.runCommandAsync("playsound dig.grass @a[r=10]");
		try {
			player.runCommandAsync("summon a:dirt_block_small ^^2^1.5");
			player.runCommandAsync("scoreboard players set @s cooldown1 0");
			player.runCommandAsync("scoreboard players set @s detect_left 0");
			resolve();
		} catch (error) {}
	});
}

export default command