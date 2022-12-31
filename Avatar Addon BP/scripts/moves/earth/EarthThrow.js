import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Throw',
    description: 'Summons a piece of dirt you can aim by looking around. Punch to fire, or just wait till your cooldown is up.',
    style: 'earth',
    unlockable: 6,
    unlockable_for_avatar: 47,
    cooldown: 'fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound dig.grass @a[r=10]");
		player.runCommandAsync("summon a:dirt_block ^^0.3^1");
		player.runCommandAsync("scoreboard players set @s detect_left 0");
		player.runCommandAsync(`titleraw @s actionbar {"rawtext":[{"text":"§bPunch to shoot."}]}`);
        let earthThrowTick = world.events.tick.subscribe(event => {
			if (!startTick) startTick = event.currentTick;
			if (event.currentTick - startTick > 50) {
				try { player.runCommandAsync(`tag @e[r=10,c=1,type=a:dirt_block] add launch`); } catch (error) {}
			}
			try { player.runCommandAsync(`tp @e[c=1,type=a:dirt_block,tag=!launch] ^^0.3^1.5 facing @p`); } catch (error) {}
			if (getScore("detect_left", player) === 1) { 
				player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
				try { player.runCommandAsync(`tag @e[r=10,c=1,type=a:dirt_block] add launch`); } catch (error) {}
			}
			try {
				player.runCommandAsync(`execute as @e[c=1,type=a:dirt_block,tag=launch] at @s run tp @s ^^^-1.5`);
				player.runCommandAsync(`execute as @e[c=1,type=a:dirt_block,tag=launch] at @s run execute as @e[r=2,name=!"${player.name}",type=!a:dirt_block] at @s run event entity @e[r=5,type=a:dirt_block] minecraft:explode`);
			} catch (error) {}
			player.runCommandAsync(`testfor @e[type=a:dirt_block,r=50,c=1]`).catch(err=>{
				world.events.tick.unsubscribe(earthThrowTick);
				startTick = undefined;
			})
        })
    }
}

export default command