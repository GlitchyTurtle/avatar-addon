import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Water Splash',
    description: 'Pushes all nearby mobs and players away with a wave of water.',
    style: 'water',
    unlockable: 6,
    unlockable_for_avatar: 27,
    cooldown: 'fast',
    async execute(player) {
        await player.addTag("kbsafeW");
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
        player.runCommandAsync("summon a:splash_effect");
        try { player.runCommandAsync(`damage @e[r=10,type=!item,name=!${player.name}] ${Math.ceil(Math.min(getScore("level", player)/4, 8))} none entity @s`); } catch (error) {}
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