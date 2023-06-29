import { system } from '@minecraft/server'
import { setScore, delayedFunc } from "./../../util.js";

const command = {
    name: 'Air Rush',
    description: 'Blast yourself forward through the air, this moves comes in clutch while falling!',
    style: 'air',
    unlockable: 7,
    unlockable_for_avatar: 7,
    cooldown: 'slow',
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.rush");

        // To be executed when the animation is done
        delayedFunc(player, (airRush) => {
            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // Code
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                // Apply velocity in the direction the player is looking at
                const viewDirection = player.getViewDirection();
                player.applyKnockback(viewDirection.x, viewDirection.z, 2, viewDirection.y);

                // The end of the runtime
                if (currentTick > 35) return system.clearRun(sched_ID);
            }, 1);
        }, 12);
    }
}

export default command