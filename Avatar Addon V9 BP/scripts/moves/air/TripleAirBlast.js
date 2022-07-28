import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;
let stage = 1;

const command = {
    name: 'Triple Air Blast',
    description: 'Send curving blasts that do major damage. Punch use the next combo piece.',
    style: 'air',
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
			}
		})
	}
}

export default command



function blast1(player) {
	try { 
		player.runCommand("particle a:air_blast ^0.4 ^1.4 ^1");
        player.runCommand("particle a:air_blast ^0.6 ^1.4 ^1.5");
        player.runCommand("particle a:air_blast ^0.8 ^1.4 ^2");
        player.runCommand("particle a:air_blast ^0.9 ^1.4 ^2.5");
        player.runCommand("particle a:air_blast ^1 ^1.4 ^3");
        player.runCommand("particle a:air_blast ^1 ^1.4 ^3.5");
        player.runCommand("particle a:air_blast ^1 ^1.4 ^4");
        player.runCommand("particle a:air_blast ^0.9 ^1.4 ^4.5");
        player.runCommand("particle a:air_blast ^0.8 ^1.4 ^5");
        player.runCommand("particle a:air_blast ^0.6 ^1.4 ^5.5");
        player.runCommand("particle a:air_blast ^0.4 ^1.4 ^6");
        player.runCommand("particle a:air_blast_pop ^^1.4 ^7");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
		player.runCommand("playsound firework.blast @a[r=3]");
		player.runCommand(`execute @s ^^^7 damage @e[r=3] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`);
	} catch (error) {}
}

function blast2(player) {
	for (let i = 1; i < 15; i++) {
		try {
			player.runCommand(`execute @s ^^^${i/2} execute @e[r=2,tag=!selfshove] ~~~ tp @s ^^^-0.5 facing @p[tag=selfshove]`);
		} catch (error) {}
    }
	player.runCommand("playsound firework.blast @a[r=3]");
	try { 
		player.runCommand("particle a:air_blast ^-0.4 ^1.4 ^1");
		player.runCommand("particle a:air_blast ^-0.6 ^1.4 ^1.5");
		player.runCommand("particle a:air_blast ^-0.8 ^1.4 ^2");
		player.runCommand("particle a:air_blast ^-0.9 ^1.4 ^2.5");
		player.runCommand("particle a:air_blast ^-1 ^1.4 ^3");
		player.runCommand("particle a:air_blast ^-1 ^1.4 ^3.5");
		player.runCommand("particle a:air_blast ^-1 ^1.4 ^4");
		player.runCommand("particle a:air_blast ^-0.9 ^1.4 ^4.5");
		player.runCommand("particle a:air_blast ^-0.8 ^1.4 ^5");
		player.runCommand("particle a:air_blast ^-0.6 ^1.4 ^5.5");
		player.runCommand("particle a:air_blast ^-0.4 ^1.4 ^6");
		player.runCommand("particle a:air_blast_pop ^^1.4 ^7");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
		player.runCommand(`execute @s ^^^7 damage @e[r=3] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`);
	} catch (error) {}
}

function blast3(player) {
    for (let i = 1; i < 15; i++) {
		try {
			player.runCommand(`particle a:air_blast ^^1^${i/2}`);
        	player.runCommand(`execute @s ^^^${i/2} execute @e[r=2,name=!${player.nameTag}] ~~~ tp @s ^^^-0.5 facing @p[name=${player.nameTag}]`);
		} catch (error) {}
    }
	player.runCommand(`particle a:air_blast_pop ^^1^7.2`);
	player.runCommand("playsound firework.blast @a[r=3]");
	try { player.runCommand(`execute @s ^^^7 damage @e[r=3] ${Math.ceil(Math.min(getScore("level", player)/4, 16))+2} none entity @s`); } catch (error) {}
	player.runCommand("scoreboard players set @s cooldown1 0");
	player.runCommand("scoreboard players set @s detect_left 0");
}