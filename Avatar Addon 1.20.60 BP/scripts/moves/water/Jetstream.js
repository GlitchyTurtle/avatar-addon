import { system, MolangVariableMap } from '@minecraft/server'
import { getScore, setScore, delayedFunc } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Jetstream',
    description: 'Propel yourself backwards with a jet of water!',
    style: 'water',
    unlockable: 5,
    unlockable_for_avatar: 26,
    cooldown: 'slow',
    execute(player) {
        // Setup
        

        // Check if they have water
		if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
		setScore(player, "water_loaded", -1, true);

        player.playAnimation("animation.water.rush");
        player.addTag("hiddenWater");

        // To be executed when the animation is done
        delayedFunc(player, (airRush) => {
            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                // Particle
                player.dimension.spawnParticle("a:water_preloaded_4", { x: player.location.x, y: player.location.y + 1, z: player.location.z }, map);

                // Apply velocity in the direction the player is looking at
                const viewDirection = player.getViewDirection();
                player.applyKnockback(viewDirection.x, viewDirection.z, -2, -viewDirection.y/2);

                // The end of the runtime
                if (currentTick > 15) {
                    player.removeTag("hiddenWater");
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 20);
    }
}

export default command