import { world, World } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;
let stage = 1;

const command = {
    name: 'Water Blade Boost',
    description: 'Boost yourself away from danger and do damage. Punch use the next combo piece.',
    style: 'water',
    unlockable: 11,
    unlockable_for_avatar: 35,
    cooldown: 'fast',
    async execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
		await new Promise(resolve => {
			blast1(player);
			resolve();
		});
		player.runCommandAsync("scoreboard players set @s detect_left 0");
        let tripleAirTick = world.events.tick.subscribe(async event => {
			if (!startTick) startTick = event.currentTick;
			if (stage === 1 && getScore("detect_left", player) === 1) {
				await new Promise(resolve => {
					blast2(player);
					resolve();
				});
				stage++;
				player.runCommandAsync("scoreboard players set @s detect_left 0");
			} else if (stage === 2 && getScore("detect_left", player) === 1) {
				await new Promise(resolve => {
					blast3(player);
					resolve();
				});
				world.events.tick.unsubscribe(tripleAirTick);
				stage = 1;
				startTick = undefined;
			}
			if (event.currentTick - startTick > 300 || (getScore("cooldown1", player) > 90 && event.currentTick - startTick > 20)) {
				world.events.tick.unsubscribe(tripleAirTick);
				startTick = undefined;
				stage = 1;
			}
		})
	}
}

export default command

async function blast1(player) {
	return new Promise(resolve => {
		try { 
			player.runCommandAsync("summon a:knockback_instant ^^1^-1.5");
			player.runCommandAsync("particle a:water_slice ~~~");
			player.runCommandAsync(`damage @e[r=4,type=!item,name=!${player.name}] 5 none entity @s`);
			player.runCommandAsync("scoreboard players set @s cooldown1 0");
			player.runCommandAsync("scoreboard players set @s detect_left 0");
			player.runCommandAsync("scoreboard players set @s detect_sneak 0");
		} catch (error) {}
	});
}

async function blast2(player) {
	return new Promise(resolve => {
		try { 
			player.runCommandAsync("summon a:knockback_instant ^^1^-1.5");
			player.runCommandAsync("particle a:water_slice ~~~");
			player.runCommandAsync(`damage @e[r=4,type=!item,name=!${player.name}] 5 none entity @s`);
			player.runCommandAsync("scoreboard players set @s cooldown1 0");
			player.runCommandAsync("scoreboard players set @s detect_left 0");
			player.runCommandAsync("scoreboard players set @s detect_sneak 0");
		} catch (error) {}
	});
}

async function blast3(player) {
	return new Promise(resolve => {
		try {
			player.runCommandAsync("summon a:knockback_instant ^^1^-1.5");
			player.runCommandAsync("particle a:water_slice ~~~");
			player.runCommandAsync(`damage @e[r=4,type=!item,name=!${player.name}] 5 none entity @s`);
			player.runCommandAsync("scoreboard players set @s cooldown1 0");
			player.runCommandAsync("scoreboard players set @s detect_left 0");
			player.runCommandAsync("scoreboard players set @s detect_sneak 0");
		} catch (error) {}
	});
}