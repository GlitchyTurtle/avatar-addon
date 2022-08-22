import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Water Splash',
    description: 'Pushes all nearby mobs and players away with a wave of water.',
    style: 'water',
    unlockable: 0,
    execute(player) {
        player.addTag("kbsafeW");
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
        player.runCommand("summon a:splash_effect");
        try { player.runCommand(`damage @e[r=10,rm=0.5] ${Math.ceil(Math.min(getScore("level", player)/4, 8))} none entity @s`); } catch (error) {}
        let kbTickW = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;        
			if (event.currentTick - startTick > 10) {
				world.events.tick.unsubscribe(kbTickW);
				player.removeTag("kbsafeW");
				startTick = undefined;
			}
        })
    }
}

export default command