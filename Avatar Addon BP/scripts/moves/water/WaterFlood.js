import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Water Flood',
    description: 'Floods a nearby area, and does a small bit of damage to players.',
    style: 'water',
    unlockable: 2,
    unlockable_for_avatar: 23,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
        try { player.runCommandAsync("fill ~1 ~1 ~1 ~-1 ~1 ~-1 flowing_water 0 keep"); } catch (error) {}
        try { player.runCommandAsync(`damage @e[r=8,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 16))} none entity @s`); } catch (error) {}
        let {x, y, z} = player.location;
        let floodTick = world.events.tick.subscribe(event => {
	        if (!startTick) startTick = event.currentTick;
            if (event.currentTick - startTick > 100) {
                world.events.tick.unsubscribe(floodTick);
                try { player.runCommandAsync(`execute as @s positioned ${x} ${y} ${z} run fill ~3 ~3 ~3 ~-3 ~-3 ~-3 air -1 replace water`); } catch (error) {}
                try { player.runCommandAsync(`execute as @s positioned ${x} ${y} ${z} run fill ~3 ~3 ~3 ~-3 ~-3 ~-3 air -1 replace flowing_water`); } catch (error) {}
                startTick = undefined;
            }
        })
    }
}

export default command