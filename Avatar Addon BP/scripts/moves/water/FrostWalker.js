import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Frost Walker',
    description: 'Walk on water for a until your cooldown is up.',
    style: 'water',
    unlockable: 7,
    unlockable_for_avatar: 28,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
        player.runCommandAsync("effect @s speed 4 2 true");
        let frostTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			try { player.runCommandAsync(`testforblock ~~~ air`); player.runCommandAsync(`fill ~2~-1~2 ~-2~-1~-2 frosted_ice 0 replace water`); } catch (error) {}	 
			if (event.currentTick - startTick > 100) {
				world.events.tick.unsubscribe(frostTick);
				startTick = undefined;
			}
        })
    }
}

export default command