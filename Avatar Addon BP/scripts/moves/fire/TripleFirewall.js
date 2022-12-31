import { world } from '@minecraft/server'
import { getScore, getBendingStyle } from "./../../util.js";

let startTick;
let stage = 1;
let firetype = "";

const command = {
    name: 'Triple Firewall',
    description: 'Shoot up a wall of flames that does major damage. Punch use the next combo piece.',
    style: 'fire',
    unlockable: 10,
    unlockable_for_avatar: 75,
    async execute(player) {
		if (getScore("level", player) > 100) { firetype = "_blue"; } else { firetype = ""; }
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
				player.removeTag('kbsafe');
			}
		})
	}
}

export default command



async function blast1(player) {
	return new Promise(resolve => {
		try {
			player.runCommandAsync(`particle a:fire_wave${firetype} ~~~`);
			player.runCommandAsync(`particle a:fire_wall${firetype} ~~~`);
			player.runCommandAsync("scoreboard players set @s cooldown1 0");
			player.runCommandAsync("scoreboard players set @s detect_left 0");
			player.runCommandAsync("playsound fire.ignite @a[r=13]");
			player.runCommandAsync(`damage @e[r=10,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`);
		} catch (error) {}
		player.addTag('kbsafe');
		player.runCommandAsync(`title @s title a:${getBendingStyle(player).toLowerCase()}`);
		player.runCommandAsync("summon a:knockback_instant ~~5~");
	});
}

async function blast2(player) {
	return new Promise(resolve => {
		try { 
			player.runCommandAsync(`particle a:fire_wave${firetype} ~~~`);
			player.runCommandAsync(`particle a:fire_wall${firetype} ~~~`);
			player.runCommandAsync("scoreboard players set @s cooldown1 0");
			player.runCommandAsync("scoreboard players set @s detect_left 0");
			player.runCommandAsync("playsound fire.ignite @a[r=13]");
			player.runCommandAsync(`damage @e[r=10,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`);
		} catch (error) {}
		player.runCommandAsync("summon a:knockback_instant ~~5~");
		player.runCommandAsync(`title @s title a:${getBendingStyle(player).toLowerCase()}`);
	});
}

async function blast3(player) {
	return new Promise(resolve => {
		try { 
			player.runCommandAsync(`particle a:fire_wave${firetype} ~~~`);
			player.runCommandAsync(`particle a:fire_wall${firetype} ~~~`);
			player.runCommandAsync("scoreboard players set @s cooldown1 0");
			player.runCommandAsync("scoreboard players set @s detect_left 0");
			player.runCommandAsync("playsound fire.ignite @a[r=13]");
			player.runCommandAsync(`damage @e[r=10,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`);
		} catch (error) {}
		player.runCommandAsync(`title @s title a:${getBendingStyle(player).toLowerCase()}`);
		player.removeTag('kbsafe');
	});
}