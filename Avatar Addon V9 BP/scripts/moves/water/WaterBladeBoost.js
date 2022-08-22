import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;
let stage = 1;

const command = {
    name: 'Water Blade Boost',
    description: 'Boost yourself away from danger and do damage. Punch use the next combo piece.',
    style: 'water',
    unlockable: 10,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
		blast1(player);
		player.runCommand("scoreboard players set @s detect_left 0");
        let tripleAirTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			if (stage === 1 && getScore("detect_left", player) === 1) {
				blast2(player);
				stage++;
				player.runCommand("scoreboard players set @s detect_left 0");
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
		player.runCommand("summon a:knockback_instant ^^1^-1.5");
        player.runCommand("particle a:water_slice ~~~");
        player.runCommand("damage @e[rm=1,r=4] 5 none entity @s");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
		player.runCommand("scoreboard players set @s detect_sneak 0");
	} catch (error) {}
}

function blast2(player) {
	try { 
		player.runCommand("summon a:knockback_instant ^^1^-1.5");
        player.runCommand("particle a:water_slice ~~~");
        player.runCommand("damage @e[rm=1,r=4] 5 none entity @s");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
		player.runCommand("scoreboard players set @s detect_sneak 0");
	} catch (error) {}
}

function blast3(player) {
	try {
		player.runCommand("summon a:knockback_instant ^^1^-1.5");
        player.runCommand("particle a:water_slice ~~~");
        player.runCommand("damage @e[rm=1,r=4] 5 none entity @s");
		player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("scoreboard players set @s detect_left 0");
		player.runCommand("scoreboard players set @s detect_sneak 0");
	} catch (error) {}
}