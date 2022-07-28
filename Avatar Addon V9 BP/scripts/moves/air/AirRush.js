import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Air Rush',
    description: 'Blast yourself forward through the air, this moves comes in clutch while falling!',
    style: 'air',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.addTag("airrush");
        let rushTick = world.events.tick.subscribe(event => {
	if (!startTick) startTick = event.currentTick;
            try {
	    player.runCommand("execute @s[tag=airrush] ~~~ tp @s ^ ^0.2 ^3 true");
                player.runCommand("execute @s[tag=airrush] ~~~ particle minecraft:egg_destroy_emitter ~~~");
	} catch (error) {}
            if (event.currentTick - startTick > 15) {
	    world.events.tick.unsubscribe(rushTick);
	    player.removeTag("airrush");
	    startTick = undefined;
	}
        })
    }
}

export default command