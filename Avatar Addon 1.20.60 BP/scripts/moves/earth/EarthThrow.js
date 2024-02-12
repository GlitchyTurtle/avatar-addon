import { system } from "@minecraft/server";
import { getScore, setScore, playSound, calcVectorOffset, setCooldown } from "./../../util.js";

const command = {
    name: 'Earth Throw',
    description: 'Summons a piece of dirt you can aim by looking around. Punch to fire, or just wait till your cooldown is up.',
    style: 'earth',
    unlockable: 6,
    unlockable_for_avatar: 47,
    cooldown: 'fast',
    execute(player) {
        
        

        player.playAnimation("animation.earth.pull");
        player.runCommand("camerashake add @a[r=10] 0.4 0.1 positional");
        playSound(player, 'dig.gravel', 1, player.location, 2);
        player.dimension.spawnEntity('a:dirt_block', calcVectorOffset(player, 0, 0.3, 1));
        setScore(player, "detect_left", 0);

        let currentTick = 0;
        const sched_ID = system.runInterval(function tick() {
            // In case of errors
            currentTick++;
            if (currentTick > 102) return system.clearRun(sched_ID);

            setCooldown(player, 80);
			if (currentTick > 80) {
				player.runCommand(`tag @e[r=10,c=1,type=a:dirt_block] add launch`); 
			}
			player.runCommand(`tp @e[c=1,type=a:dirt_block,tag=!launch] ^^0.3^1.5 facing @p`); 
			if (getScore("detect_left", player) === 1) { 
				player.runCommand(`tag @e[r=10,c=1,type=a:dirt_block] add launch`); 
			}

            player.runCommand(`execute as @e[c=1,type=a:dirt_block,tag=launch] at @s run tp @s ^^^-1`);
            player.runCommand(`execute as @e[c=1,type=a:dirt_block,tag=launch] at @s run execute as @e[r=2,name=!"${player.name}",type=!a:dirt_block] at @s run event entity @e[r=5,type=a:dirt_block] minecraft:explode`);
            

            if (currentTick > 100) { 
                setCooldown(player, 100);
                return system.clearRun(sched_ID);
            }
        })
    }
}

export default command