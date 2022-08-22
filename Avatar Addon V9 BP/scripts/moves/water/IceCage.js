import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Ice Cage',
    description: 'Lock away all entities in a radius of 5 blocks in a cage of ice.',
    style: 'water',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound beacon.power @a[r=6]");
		try {
			player.runCommand("execute @e[r=5,rm=0.5] ~ ~ ~ fill ~1 ~-1 ~1 ~-1 ~2 ~-1 packed_ice 0 keep"); 
			player.runCommand("execute @e[r=5,rm=0.5] ~ ~ ~ fill ~ ~ ~ ~ ~1 ~ air 0 replace packed_ice");
		} catch (error) {}
    }
}

export default command