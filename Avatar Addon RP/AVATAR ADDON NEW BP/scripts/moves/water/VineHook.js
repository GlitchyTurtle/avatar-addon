import { system } from '@minecraft/server'
import { getScore, setScore, delayedFunc, playSound, traceLine, calculateDistance, calculateKnockbackVector, applyBasicDamage } from "../../util.js";

function calculateDistanceXZ(posA, posB) {
    const deltaX = posB.x - posA.x;
    const deltaZ = posB.z - posA.z;
    const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
    return distance;
}

const command = {
    name: 'Vine Hook',
    description: 'Grab and drag nearby enemies toward you with vines that deal thorn damage!',
    style: 'water',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    skill_required: "Vine Hook",
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        // Check if they have water
		if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")

        player.playAnimation("animation.water.whip");

        const nearbyEntities = [...player.dimension.getEntities({ location: player.location, maxDistance: 25, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
        
        // To be executed when the animation is done
        delayedFunc(player, (waterGrapple) => {
            setScore(player, "water_loaded", -1, true);
            player.addTag("hiddenWater");

            let currentTick = 0;
            let endRuntime = false;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                playSound(player, 'mob.turtle.swim', 0.9, player.location, 1);

                nearbyEntities.forEach(entity => {
                    try {
                        const kbVector = calculateKnockbackVector(entity.location, player.location, 1.2);
                        const kbIntensity = calculateDistance(entity.location, player.location) / 2.5;
                        traceLine(player, player.getHeadLocation(), entity.getHeadLocation(), 10, "a:plant_vines");
                        if (Math.random() > 0.8) applyBasicDamage(player, entity, "super_light", 0);
                        entity.applyKnockback(-kbVector.x, -kbVector.z, kbIntensity, -kbVector.y);
                    } catch (error) {}
                })

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