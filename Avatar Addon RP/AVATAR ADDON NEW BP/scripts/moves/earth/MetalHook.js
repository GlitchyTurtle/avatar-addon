import { system } from '@minecraft/server'
import { getScore, setScore, delayedFunc, playSound, traceLine, calculateDistance, calculateKnockbackVector, calcVectorOffset } from "../../util.js";

function calculateDistanceXZ(posA, posB) {
    const deltaX = posB.x - posA.x;
    const deltaZ = posB.z - posA.z;
    const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
    return distance;
}

const command = {
    name: 'Metal Hook',
    description: 'Grapple onto trees and structures and pull yourself towards them at rapid speed!',
    style: 'earth',
    unlockable: 0,
    unlockable_for_avatar: 0,
    skill_required: "Metal Hook",
    cooldown: 'fast',
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        player.playAnimation("animation.water.whip");

        // To be executed when the animation is done
        delayedFunc(player, (waterGrapple) => {
            const range = 60 + (getScore("mobTier", player) >= 10 ? 50 : 0);
            const getBlock = player.getBlockFromViewDirection({ maxDistance: range, includePassableBlocks: false, includeLiquidBlocks: false });

            if (!getBlock) return player.sendMessage(`§cYou need to aim at a block within ${range} blocks.`);

            const pointB = getBlock.block.location;

            let currentTick = 0;
            let endRuntime = false;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);
                
                const pointA = player.location;
                const distance = calculateDistance(pointA, pointB);
                const verticalDiff = pointB.y - pointA.y;

                traceLine(player, calcVectorOffset(player, 0, 0, -1), pointB, distance, "a:metal_blast");
                //playSound(player, 'mob.turtle.swim', 0.9, player.location, 1);

                if (calculateDistanceXZ(pointA, pointB) < 2 && verticalDiff < 5) endRuntime = true;

                const kbVector = calculateKnockbackVector(pointA, pointB, 0.5);
                player.applyKnockback(-kbVector.x, -kbVector.z, 4, -kbVector.y * 4);

                // The end of the runtime
                if (currentTick > 40 || endRuntime) {
                    
                    player.addEffect("slow_falling", 140, { amplifier: 1, showParticles: false });
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 5);
    }
}

export default command