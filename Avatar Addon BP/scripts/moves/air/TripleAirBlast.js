import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;
let stage = 1;

const command = {
    name: 'Triple Air Blast',
    description: 'Send curving blasts that do major damage. Punch use the next combo piece.',
    style: 'air',
    unlockable: 14,
    unlockable_for_avatar: 14,
    cooldown: 'fast',
    async execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
		await new Promise(resolve => {
			blast1(player);
			resolve();
		});
        let tripleAirTick = world.events.tick.subscribe(async event => {
			if (!startTick) startTick = event.currentTick;
			if (stage === 1 && getScore("detect_left", player) === 1) {
				await new Promise(resolve => {
					blast2(player);
					resolve();
				});
				stage++;
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
		for (let i = 1; i < 15; i++) {
			try {
				player.runCommandAsync(`execute as @s positioned ^^^${i/2} run execute as @e[r=2,name=!"${player.name}"] at @s run tp @s ^^^-0.5 facing @p[name="${player.name}"]`);
			} catch (error) {}
		}
		try {
			player.runCommandAsync("particle a:air_blast ^0.4 ^1.4 ^1");
			player.runCommandAsync("particle a:air_blast ^0.6 ^1.4 ^1.5");
			player.runCommandAsync("particle a:air_blast ^0.8 ^1.4 ^2");
			player.runCommandAsync("particle a:air_blast ^0.9 ^1.4 ^2.5");
			player.runCommandAsync("particle a:air_blast ^1 ^1.4 ^3");
			player.runCommandAsync("particle a:air_blast ^1 ^1.4 ^3.5");
			player.runCommandAsync("particle a:air_blast ^1 ^1.4 ^4");
			player.runCommandAsync("particle a:air_blast ^0.9 ^1.4 ^4.5");
			player.runCommandAsync("particle a:air_blast ^0.8 ^1.4 ^5");
			player.runCommandAsync("particle a:air_blast ^0.6 ^1.4 ^5.5");
			player.runCommandAsync("particle a:air_blast ^0.4 ^1.4 ^6");
			player.runCommandAsync("particle a:air_blast_pop ^^1.4 ^7");
			player.runCommandAsync("scoreboard players set @s cooldown1 0");
			player.runCommandAsync("scoreboard players set @s detect_left 0");
			player.runCommandAsync("playsound firework.blast @a[r=3]");
			player.runCommandAsync(`execute as @s positioned ^^^7 run damage @e[r=3,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`);
		} catch (error) {}
	})
}

async function blast2(player) {
	return new Promise(resolve => {
		for (let i = 1; i < 15; i++) {
			try {
				player.runCommandAsync(`execute as @s positioned ^^^${i/2} run execute as @e[r=2,name=!"${player.name}"] at @s run tp @s ^^^-0.5 facing @p[name="${player.name}"]`);
			} catch (error) {}
		}
		player.runCommandAsync("playsound firework.blast @a[r=3]");
		try { 
			player.runCommandAsync("particle a:air_blast ^-0.4 ^1.4 ^1");
			player.runCommandAsync("particle a:air_blast ^-0.6 ^1.4 ^1.5");
			player.runCommandAsync("particle a:air_blast ^-0.8 ^1.4 ^2");
			player.runCommandAsync("particle a:air_blast ^-0.9 ^1.4 ^2.5");
			player.runCommandAsync("particle a:air_blast ^-1 ^1.4 ^3");
			player.runCommandAsync("particle a:air_blast ^-1 ^1.4 ^3.5");
			player.runCommandAsync("particle a:air_blast ^-1 ^1.4 ^4");
			player.runCommandAsync("particle a:air_blast ^-0.9 ^1.4 ^4.5");
			player.runCommandAsync("particle a:air_blast ^-0.8 ^1.4 ^5");
			player.runCommandAsync("particle a:air_blast ^-0.6 ^1.4 ^5.5");
			player.runCommandAsync("particle a:air_blast ^-0.4 ^1.4 ^6");
			player.runCommandAsync("particle a:air_blast_pop ^^1.4 ^7");
			player.runCommandAsync("scoreboard players set @s cooldown1 0");
			player.runCommandAsync("scoreboard players set @s detect_left 0");
			player.runCommandAsync(`execute as @s positioned ^^^7 run damage @e[r=3,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`);
		} catch (error) {}
	})
}

async function blast3(player) {
	return new Promise(resolve => {
		for (let i = 1; i < 15; i++) {
			try {
				player.runCommandAsync(`particle a:air_blast ^^1^${i/2}`);
				player.runCommandAsync(`execute as @s positioned ^^^${i/2} run execute as @e[r=2,name=!"${player.name}"] at @s run tp @s ^^^-0.5 facing @p[name="${player.name}"]`);
			} catch (error) {}
		}
		player.runCommandAsync(`particle a:air_blast_pop ^^1^7.2`);
		player.runCommandAsync("playsound firework.blast @a[r=3]");
		try { player.runCommandAsync(`execute as @s positioned ^^^7 run damage @e[r=3,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`); } catch (error) {}
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		player.runCommandAsync("scoreboard players set @s detect_left 0");
	})
}