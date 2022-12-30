import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Fire Sprint',
    description: 'Sprint so fast you leave a trail of fire in your wake!',
    style: 'fire',
    unlockable: 3,
    unlockable_for_avatar: 64,
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
        player.runCommandAsync("effect @s speed 3 10 true");
        player.runCommandAsync("particle a:fire_wave");
        let sprintTick = world.events.tick.subscribe(event => {
		if (!startTick) startTick = event.currentTick;
            try {
				player.runCommandAsync("particle minecraft:mobflame_single ~ ~1 ~"); 
				player.runCommandAsync("particle a:fire_blast ~~~");
				player.runCommandAsync("setblock ~~~ fire 0 keep");
			} catch (error) {}
			if (event.currentTick - startTick > 40) {
				world.events.tick.unsubscribe(sprintTick);
				startTick = undefined;
			}
        })
    }
}

export default command