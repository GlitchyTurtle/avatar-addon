import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;
let stage = 1;

const command = {
    name: 'Ultimate Rock Blast',
    description: 'Send curving blasts that do major damage. Punch use the next combo piece.',
    style: 'earth',
    unlockable: 10,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
		blast1(player);
        let rockBlastTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			if (stage === 1 && getScore("detect_left", player) === 1) {
				blast2(player);
				stage++;
			} else if (stage === 2 && getScore("detect_left", player) === 1) {
				blast3(player);
				world.events.tick.unsubscribe(rockBlastTick);
				stage = 1;
				startTick = undefined;
			}
			if (event.currentTick - startTick > 300 || getScore("cooldown1", player) > 90) {
				world.events.tick.unsubscribe(rockBlastTick);
				startTick = undefined;
				stage = 1;
			}
		})
	}
}

export default command



function blast1(player) {
	player.runCommand("playsound dig.grass @a[r=10]");
	try { 
		player.runCommand("summon a:dirt_block_small ^^2^1.5");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
	} catch (error) {}
}

function blast2(player) {
	player.runCommand("playsound dig.grass @a[r=10]");
	try { 
		player.runCommand("summon a:dirt_block_small ^^2^1.5");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
	} catch (error) {}
}

function blast3(player) {
	player.runCommand("playsound dig.grass @a[r=10]");
	try { 
		player.runCommand("summon a:dirt_block_small ^^2^1.5");
		player.runCommand("tag @e[r=10,type=a:dirt_block_small] add move");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
	} catch (error) {}
}