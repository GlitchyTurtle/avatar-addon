import { system } from "@minecraft/server";
import { getScore, setScore, playSound, calcVectorOffset } from "./../../util.js";

const command = {
    name: 'Ice Throw',
    description: 'Summons a piece of ice you can aim by looking around. Punch to fire, or just wait till your cooldown is up.',
    style: 'water',
    unlockable: 10,
    unlockable_for_avatar: 31,
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        // Check if they have water
        if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!");
        setScore(player, "water_loaded", -1, true);

        player.addTag("hiddenWater");
        player.playAnimation("animation.water.push");
        player.runCommand("camerashake add @a[r=10] 0.4 0.1 positional");
        playSound(player, 'mob.turtle.swim', 1, player.location, 2);
        player.dimension.spawnEntity('a:ice_block', calcVectorOffset(player, 0, 0.3, 1));
        setScore(player, "detect_left", 0);

        let currentTick = 0;
        const sched_ID = system.runInterval(function tick() {
            // In case of errors
            currentTick++;
            if (currentTick > 100) return system.clearRun(sched_ID);

			if (currentTick > 80) {
				player.runCommand(`tag @e[r=10,c=1,type=a:ice_block] add launch`); 
			}
			player.runCommand(`tp @e[c=1,type=a:ice_block,tag=!launch] ^^0.3^1.5 facing @p`); 
			if (getScore("detect_left", player) === 1) { 
				player.runCommand(`tag @e[r=10,c=1,type=a:ice_block] add launch`); 
			}

            player.runCommand(`execute as @e[c=1,type=a:ice_block,tag=launch] at @s run tp @s ^^^-1`);
            player.runCommand(`execute as @e[c=1,type=a:ice_block,tag=launch] at @s run execute as @e[r=2,name=!"${player.name}",type=!a:ice_block] at @s run event entity @e[r=5,type=a:ice_block] minecraft:explode`);
            setScore(player, "cooldown", 0);

            if (currentTick > 100) { 
                setScore(player, "cooldown", 70);
                player.removeTag("hiddenWater");
                return system.clearRun(sched_ID);
            }
        })
    }
}

export default command