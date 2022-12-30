import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Ice Throw',
    description: 'Summons a piece of ice you can aim by looking around. Punch to fire, or just wait till your cooldown is up.',
    style: 'water',
    unlockable: 10,
    unlockable_for_avatar: 31,
    cooldown: 'super_fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
		player.runCommandAsync("summon a:ice_block ^^0.3^1");
		player.runCommandAsync("scoreboard players set @s detect_left 0");
		player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§bPunch to shoot."}]}`);
        let iceThrowTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			if (event.currentTick - startTick > 50) {
				try { player.runCommandAsync(`tag @e[r=10,c=1,type=a:ice_block] add launch`); } catch (error) {}
			}
			try { player.runCommandAsync(`tp @e[c=1,type=a:ice_block,tag=!launch] ^^0.3^1.5 facing @p`); } catch (error) {}
			if (getScore("detect_left", player) === 1) { 
				try { player.runCommandAsync(`tag @e[r=10,c=1,type=a:ice_block] add launch`); } catch (error) {}
			}
			try {
				player.runCommandAsync(`execute as @e[c=1,type=a:ice_block,tag=launch] at @s run tp @s ^^^-1`);
				player.runCommandAsync(`execute as @e[c=1,type=a:ice_block,tag=launch] at @s run execute as @e[r=2,name=!${player.nameTag},type=!a:ice_block] at @s run event entity @e[r=5,type=a:ice_block] minecraft:explode`);
			} catch (error) {}
			player.runCommandAsync(`testfor @e[type=a:ice_block,r=50,c=1]`).catch(err=>{
				world.events.tick.unsubscribe(iceThrowTick);
				startTick = undefined;
			})
        })
    }
}

export default command