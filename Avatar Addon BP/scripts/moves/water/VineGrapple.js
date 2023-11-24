import { system } from '@minecraft/server'
import { getScore, setScore, delayedFunc, playSound, traceLine, calculateDistance, calculateKnockbackVector, calcVectorOffset } from "../../util.js";

function calculateDistanceXZ(posA, posB) {
    const deltaX = posB.x - posA.x;
    const deltaZ = posB.z - posA.z;
    const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
    return distance;
}

const command = {
    name: 'Vine Grapple',
    description: 'Use your vines to grapple onto nearby blocks and pull yourself toward them!',
    style: 'water',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    skill_required: "Vine Grapple",
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        // Check if they have water
		if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")

        player.playAnimation("animation.water.whip");

        // To be executed when the animation is done
        delayedFunc(player, (waterGrapple) => {
            const range = 125;
            const getBlock = player.getBlockFromViewDirection({ maxDistance: range, includePassableBlocks: true, includeLiquidBlocks: true });

            if (!getBlock) return player.sendMessage(`§cYou need to aim at a block within ${range} blocks.`);
            setScore(player, "water_loaded", -1, true);
            player.addTag("hiddenWater");

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

                traceLine(player, player.getHeadLocation(), pointB, distance * 2, "a:plant_vine");
                playSound(player, 'mob.turtle.swim', 0.9, player.location, 1);

                if (calculateDistanceXZ(pointA, pointB) < 2 && verticalDiff < 1) endRuntime = true;

                const kbVector = calculateKnockbackVector(pointA, pointB, 0.5);
                player.applyKnockback(-kbVector.x, -kbVector.z, 1, -kbVector.y + 0.5);

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