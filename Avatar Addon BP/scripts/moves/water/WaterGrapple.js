import { system } from '@minecraft/server'
import { getScore, setScore, delayedFunc, playSound, traceLine, calculateDistance, calculateKnockbackVector, calcVectorOffset } from "../../util.js";

function calculateDistanceXZ(posA, posB) {
    const deltaX = posB.x - posA.x;
    const deltaZ = posB.z - posA.z;
    const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
    return distance;
}

const command = {
    name: 'Water Grapple',
    description: 'Floods a nearby area, and does a small bit of damage to players.',
    style: 'water',
    unlockable: 0,
    unlockable_for_avatar: 0,
    mob_tier_required: 2,
    cooldown: 'fast',
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        // Check if they have water
		if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")

        player.playAnimation("animation.water.whip");

        // To be executed when the animation is done
        delayedFunc(player, (waterGrapple) => {
            const range = 25 + getScore("water_loaded", player) * 5 + (getScore("mobTier", player) >= 10 ? 50 : 0);
            const getBlock = player.getBlockFromViewDirection({ maxDistance: range, includePassableBlocks: false, includeLiquidBlocks: false });

            if (!getBlock) return player.sendMessage(`§cYou need to aim at a block within ${range} blocks.`);
            setScore(player, "water_loaded", -1, true);
            player.addTag("hiddenWater");

            const pointB = getBlock.location;

            let currentTick = 0;
            let endRuntime = false;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);
                
                const pointA = player.location;
                const distance = calculateDistance(pointA, pointB);
                const verticalDiff = pointB.y - pointA.y;

                traceLine(player.getHeadLocation(), pointB, distance, "a:water_preloaded_1");
                playSound(player, 'mob.turtle.swim', 0.9, player.location, 1);

                if (calculateDistanceXZ(pointA, pointB) < 2 && verticalDiff < 1) endRuntime = true;

                const kbVector = calculateKnockbackVector(pointA, pointB, 0.5);
                player.applyKnockback(-kbVector.x, -kbVector.z, 1, 0.5);

                // The end of the runtime
                if (currentTick > 40 || endRuntime) {
                    player.removeTag("hiddenWater");
                    player.addEffect("slow_falling", 140, { amplifier: 1, showParticles: false });
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 5);
    }
}

export default command