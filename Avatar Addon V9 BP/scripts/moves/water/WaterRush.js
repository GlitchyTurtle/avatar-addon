import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;
let endEarly;

const command = {
    name: 'Water Rush',
    description: 'Speed toward the nearest entity, it will stop you 3 blocks away.',
    style: 'water',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
		endEarly = false
        let rushWaterTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			try {
				player.runCommand(`particle a:water_dodge ~~~`); 
				player.runCommand(`tp @s ^ ^ ^1.5 facing @e[name=!${player.nameTag},c=1,type=!item,type=!xp_orb]`);
			} catch (error) {}
			try {
				player.runCommand(`testfor @e[r=3,name=!${player.nameTag}]`);
				endEarly = true;
			} catch (error) {}
			if (event.currentTick - startTick > 100 || endEarly === true) {
				world.events.tick.unsubscribe(rushWaterTick);	
				startTick = undefined;
			}
        })
    }
}

export default command