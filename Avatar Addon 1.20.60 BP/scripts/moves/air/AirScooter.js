import { system, MolangVariableMap } from "@minecraft/server";
import { getScore, setCooldown, getCooldown, calcVectorOffset, delayedFunc } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Air Scooter',
    description: 'Defend yourself from projectiles',
    style: 'air',
    unlockable: 6,
    unlockable_for_avatar: 6,
    cooldown: 'fast',
    execute(player) {
        
        
        // To be executed when the animation is done
        delayedFunc(player, (airRush) => {
            let currentTick = 0;
            setCooldown(player, 41);
            player.playAnimation("animation.air.scooter");
            const sched_ID = system.runInterval(function tick() {
                // Code
                // In case of errors
                currentTick++;
                if (currentTick > 5000) return system.clearRun(sched_ID);

                // Apply velocity in the direction the player is looking at
                const viewDirection = player.getViewDirection();
                

                player.dimension.spawnParticle("a:air_scooter", calcVectorOffset(player, 0, 0, 1), map);
                if (currentTick % 20 == 0) player.playAnimation("animation.air.scooter");

                //if (!below1.isAir) {
                //    player.applyKnockback(viewDirection.x, viewDirection.z, 0.5, viewDirection.y/2 + 1);
                //} else {
                    player.applyKnockback(viewDirection.x, viewDirection.z, 0.5, viewDirection.y/4);
                //}

                // The end of the runtime
                player.addEffect("slow_falling", 265, { amplifier: 255, showParticles: false });
                if (getScore("sneak_time", player) > 0 || getCooldown(player) < 40) return system.clearRun(sched_ID);
            }, 1);
        }, 1);
    }
}

export default command