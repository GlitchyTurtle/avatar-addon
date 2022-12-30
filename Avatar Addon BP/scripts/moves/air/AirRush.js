import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Air Rush',
    description: 'Blast yourself forward through the air, this moves comes in clutch while falling!',
    style: 'air',
    unlockable: 7,
    unlockable_for_avatar: 7,
    cooldown: 'slow',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        let rushTick = world.events.tick.subscribe(event => {
            if (!startTick) startTick = event.currentTick;
            try {
                player.runCommandAsync("execute as @s at @s run tp @s ^ ^0.2 ^3 true");
                player.runCommandAsync("execute as @s at @s run particle minecraft:egg_destroy_emitter ~~~");
            } catch (error) {}
            if (event.currentTick - startTick > 15) {
                world.events.tick.unsubscribe(rushTick);
                startTick = undefined;
            }
        })
    }
}

export default command