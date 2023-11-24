import { system } from '@minecraft/server'
import { setScore, delayedFunc, playSound } from "./../../util.js";

const command = {
    name: 'Fire Sprint',
    description: 'Sprint so fast you leave a trail of fire in your wake!',
    style: 'fire',
    unlockable: 3,
    unlockable_for_avatar: 64,
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);
        playSound(player, 'firework.blast', 1, player.location, 3);
        player.addEffect("fire_resistance", 65, { amplifier: 1, showParticles: false });
        player.addEffect("speed", 40, { amplifier: 10, showParticles: false });
        player.runCommand("camerashake add @s 0.1 2 positional");

        // To be executed when the animation is done
        delayedFunc(player, (fireSprint) => {
            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);           

                const block = player.dimension.getBlock(player.location);
                if (!block.isSolid && !block.isLiquid) {
                    block.setType("minecraft:fire");
                }

                // The end of the runtime
                if (currentTick > 35) return system.clearRun(sched_ID);
            }, 1);
        }, 6);
    }
}

export default command