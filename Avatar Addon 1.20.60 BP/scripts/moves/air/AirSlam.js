import { system, MolangVariableMap } from '@minecraft/server';
import { setScore, delayedFunc, createShockwave, playSound } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Air Slam',
    description: 'Blast yourself forward through the air, this moves comes in clutch while falling!',
    style: 'air',
    unlockable: 10,
    unlockable_for_avatar: 10,
    cooldown: 'slow',
    execute(player) {
        // Setup
        

        // To be executed when the animation is done
        delayedFunc(player, (airRush) => {
            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // Code
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                // Apply velocity in the direction the player is looking at
                player.applyKnockback(0, 0, 0, -8);
                
                const playerPos = player.location;
                if (player.getVelocity().y == 0) {
                    if (currentTick < 3) {
                        player.sendMessage("§cYou must be in the air with enough downward force to use this!");
                        return system.clearRun(sched_ID);
                    }

                    player.playAnimation("animation.earth.landing");
                    player.dimension.spawnParticle("a:air_shockwave", playerPos, map);
                    playSound(player, 'random.explode', 1, playerPos, 5);
                    if (currentTick < 5) {
                        createShockwave(player, playerPos, "normal", 7, 10);
                    } else {
                        createShockwave(player, playerPos, "ultra_heavy", 7, 10);
                    }
                    return system.clearRun(sched_ID);
                }
                // The end of the runtime
                if (currentTick > 10) return system.clearRun(sched_ID);
            }, 1);
        }, 12);
    }
}

export default command