import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Throw',
    description: 'Summons a piece of ice you can aim by looking around. Punch to fire, or just wait till your cooldown is up.',
    style: 'earth',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
		player.runCommand("summon a:dirt_block ^^0.3^1");
		player.runCommand("scoreboard players set @s detect_left 0");
		player.runCommand(`titleraw @s actionbar {"rawtext":[{"text":"§bPunch to shoot."}]}`);
        let earthThrowTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			if (event.currentTick - startTick > 100) {
				try { player.runCommand(`tag @e[r=10,c=1,type=a:dirt_block] add launch`); } catch (error) {}
			}
			try { player.runCommand(`tp @e[c=1,type=a:dirt_block,tag=!launch] ^^0.3^1.5 facing @p`); } catch (error) {}
			if (getScore("detect_left", player) === 1) { 
				try { player.runCommand(`tag @e[r=10,c=1,type=a:dirt_block] add launch`); } catch (error) {}
			}
			try {
				player.runCommand(`execute @e[c=1,type=a:dirt_block,tag=launch] ~~~ tp @s ^^^-1`);
				player.runCommand(`execute @e[c=1,type=a:dirt_block,tag=launch] ~~~ execute @e[r=2,name=!${player.nameTag},type=!a:dirt_block] ~~~ event entity @e[r=5,type=a:dirt_block] minecraft:explode`);
			} catch (error) {}
			try { player.runCommand(`testfor @e[type=a:dirt_block,r=50,c=1]`); } catch (error) {
				world.events.tick.unsubscribe(earthThrowTick);
				startTick = undefined;
			}
        })
    }
}

export default command