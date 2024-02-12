import { system } from '@minecraft/server'
import { setScore, getScore, playSound } from "./../../util.js";

const command = {
    name: 'Frost Walker',
    description: 'Walk on water for a until your cooldown is up.',
    style: 'water',
    unlockable: 7,
    unlockable_for_avatar: 28,
    cooldown: 'fast',
    execute(player) {
        
        

        // Check if they have water
        if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
        setScore(player, "water_loaded", -1, true);
        
        player.addTag("hiddenWater");
        playSound(player, 'mob.turtle.swim', 0.9, player.location, 1);
        player.addEffect("speed", 80, { amplifier: 1, showParticles: false });

        let currentTick = 0;
        const sched_ID = system.runInterval(function tick() {
            // In case of errors
            currentTick++;
            if (currentTick > 100) return system.clearRun(sched_ID);
            //let below = player.dimension.getBlock({x: player.location.x, y: player.location.y - 1, z: player.location.z});
            let feet = player.dimension.getBlock({x: player.location.x, y: player.location.y, z: player.location.z});
            if (feet.isAir) player.runCommandAsync(`fill ~2~-1~2 ~-2~-1~-2 frosted_ice replace water`); 
            if (currentTick > 100) {
                player.removeTag("hiddenWater");
                return system.clearRun(sched_ID);
            }
        }, 1)
    }
}

export default command