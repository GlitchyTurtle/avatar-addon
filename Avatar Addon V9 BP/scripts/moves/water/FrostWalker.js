import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Frost Walker',
    description: 'Walk on water for a until your cooldown is up.',
    style: 'water',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
        player.runCommand("effect @s speed 4 2 true");
        let frostTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			try { player.runCommand(`testforblock ~~~ air`); player.runCommand(`fill ~2~-1~2 ~-2~-1~-2 frosted_ice 0 replace water`); } catch (error) {}	 
			if (event.currentTick - startTick > 100) {
				world.events.tick.unsubscribe(frostTick);
				startTick = undefined;
			}
        })
    }
}

export default command