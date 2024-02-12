import { system } from '@minecraft/server'
import { setScore, getScore, delayedFunc, playSound } from "./../../util.js";

const command = {
    name: 'Fire Boosters',
    description: 'Lets you fly by shooting out fire! If you ram into entities, it does damage.',
    style: 'fire',
    unlockable: 6,
    unlockable_for_avatar: 67,
    cooldown: 'super_fast',
    execute(player) {
        
        
        if (getScore("level", player) >= 100) {
            player.playAnimation("animation.fire.sprint_blue");
        } else {
            player.playAnimation("animation.fire.sprint");
        }
        player.runCommand("camerashake add @s 0.3 2 positional");

        // To be executed when the animation is done
        delayedFunc(player, (fireSprint) => {
            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);
                // Apply velocity in the direction the player is looking at
                const viewDirection = player.getViewDirection();
                player.applyKnockback(viewDirection.x, viewDirection.z, 2, viewDirection.y);

                // The end of the runtime
                if (currentTick > 35) {
                    player.runCommand("stopsound @s mob.cat.hiss")
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 6);
    }
}

export default command