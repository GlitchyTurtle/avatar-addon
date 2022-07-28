import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Fire Sprint',
    description: 'Sprint so fast you leave a trail of fire in your wake!',
    style: 'fire',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.shulker.shoot @a[r=3]");
        player.runCommand("effect @s speed 3 10 true");
        player.runCommand("particle a:fire_wave");
        let sprintTick = world.events.tick.subscribe(event => {
		if (!startTick) startTick = event.currentTick;
            try {
				player.runCommand("particle minecraft:mobflame_single ~ ~1 ~"); 
				player.runCommand("particle a:fire_blast ~~~");
				player.runCommand("setblock ~~~ fire 0 keep");
			} catch (error) {}
			if (event.currentTick - startTick > 40) {
				world.events.tick.unsubscribe(sprintTick);
				startTick = undefined;
			}
        })
    }
}

export default command