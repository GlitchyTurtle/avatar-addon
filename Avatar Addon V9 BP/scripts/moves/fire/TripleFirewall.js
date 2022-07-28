import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;
let stage = 1;

const command = {
    name: 'Triple Firewall',
    description: 'Shoot up a wall of flames that does major damage. Punch use the next combo piece.',
    style: 'fire',
    unlockable: 10,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
		blast1(player);
        let tripleAirTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			if (stage === 1 && getScore("detect_left", player) === 1) {
				blast2(player);
				stage++;
			} else if (stage === 2 && getScore("detect_left", player) === 1) {
				blast3(player);
				world.events.tick.unsubscribe(tripleAirTick);
				stage = 1;
				startTick = undefined;
			}
			if (event.currentTick - startTick > 300 || getScore("cooldown1", player) > 90) {
				world.events.tick.unsubscribe(tripleAirTick);
				startTick = undefined;
				stage = 1;
				player.removeTag('kbsafe');
			}
		})
	}
}

export default command



function blast1(player) {
	try { 
		player.runCommand("particle a:fire_wave ~~~");
		player.runCommand("particle a:fire_wall ~~~");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
		player.runCommand("playsound fire.ignite @a[r=13]");
		player.runCommand(`damage @e[rm=0.5,r=10] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`);
	} catch (error) {}
	player.addTag('kbsafe');
	player.runCommand("summon a:knockback_instant ~~5~");
}

function blast2(player) {
	try { 
		player.runCommand("particle a:fire_wave ~~~");
		player.runCommand("particle a:fire_wall ~~~");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
		player.runCommand("playsound fire.ignite @a[r=13]");
		player.runCommand(`damage @e[rm=0.5,r=10] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`);
	} catch (error) {}
	player.runCommand("summon a:knockback_instant ~~5~");
}

function blast3(player) {
	try { 
		player.runCommand("particle a:fire_wave ~~~");
		player.runCommand("particle a:fire_wall ~~~");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
		player.runCommand("playsound fire.ignite @a[r=13]");
		player.runCommand(`damage @e[rm=0.5,r=10] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`);
	} catch (error) {}
	player.removeTag('kbsafe');
}