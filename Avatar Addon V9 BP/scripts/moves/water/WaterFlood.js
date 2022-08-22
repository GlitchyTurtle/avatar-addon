import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Water Flood',
    description: 'Floods a nearby area, and does a small bit of damage to players.',
    style: 'water',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
        try { player.runCommand("fill ~1 ~1 ~1 ~-1 ~1 ~-1 flowing_water 0 keep"); } catch (error) {}
        try { player.runCommand(`damage @e[r=8,rm=0.5] ${Math.ceil(Math.min(getScore("level", player)/4, 16))} none entity @s`); } catch (error) {}
        let {x, y, z} = player.location;
        let floodTick = world.events.tick.subscribe(event => {
	if (!startTick) startTick = event.currentTick;
	if (event.currentTick - startTick > 100) {
	    world.events.tick.unsubscribe(floodTick);
	    try { player.runCommand(`execute @s ${x} ${y} ${z} fill ~3 ~3 ~3 ~-3 ~-3 ~-3 air -1 replace water`); } catch (error) {}
	    try { player.runCommand(`execute @s ${x} ${y} ${z} fill ~3 ~3 ~3 ~-3 ~-3 ~-3 air -1 replace flowing_water`); } catch (error) {}
	    startTick = undefined;
	}
        })
    }
}

export default command