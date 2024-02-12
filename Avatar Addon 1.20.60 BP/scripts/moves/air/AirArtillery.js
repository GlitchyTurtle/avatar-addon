import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, createShockwave, getScore, setScore, playSound, delayedFunc, calculateKnockbackVector } from "./../../util.js";

const command = {
    name: 'Air Artillery',
    description: 'Shoots a blast of air that locks on to the closest entity, and does damage on impact!',
    style: 'air',
    unlockable: 11,
    unlockable_for_avatar: 11,
    cooldown: 'fast',
    execute(player) {
        // Setup
        
        player.playAnimation("animation.air.blast");

        // To be executed when the animation is done
        delayedFunc(player, (airArtillery) => {
            const map = new MolangVariableMap();
            const entities = getNearbyEntities(player, 25);

            if (entities.length === 0) return player.sendMessage("§cThere are no nearby entities to target!");

            let currentTick = 0;
            let endRuntime = false;
            let currentLocation;

            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 200) return system.clearRun(sched_ID);

                const target = getClosestTarget(player, entities);

                if (!target || target.getEffect("invisibility") || target.hasTag("dodge") || target.hasTag("bendingShield")) {
                    player.sendMessage("§cThe entity you were tracking was lost!");
                    return system.clearRun(sched_ID);
                }

                try {
                    if (!currentLocation) {
                        const entityDir = calculateKnockbackVector(target.location, player.location, 1);
                        currentLocation = calcVectorOffset(player, -0.2, 1, currentTick, entityDir);
                    }

                    const entityDir = calculateKnockbackVector(target.location, currentLocation, 1);
                    const currentPos = calcVectorOffset(player, -0.2, 1, currentTick, entityDir, currentLocation);
                    const currentBlock = player.dimension.getBlock(currentPos);

                    if (!entityDir || !currentPos || !currentBlock) return system.clearRun(sched_ID);

                    const hasHitEntity = getNearbyEntities(player, 1.5, currentPos);

                    if (currentBlock.isSolid || hasHitEntity.length > 0) endRuntime = true;

                    map.setVector3("variable.plane", entityDir);
                    player.dimension.spawnParticle("a:air_artillery", currentPos, map);

                    if (currentTick > 100 || endRuntime) {
                        // Particle effects and sound
                        player.dimension.spawnParticle("a:air_blast_pop", currentPos, map);
                        playSound(player, 'firework.blast', 1, currentPos, 3);
                        createShockwave(player, currentPos, "normal", 3, 3);
                        return system.clearRun(sched_ID);
                    }
                } catch (error) {
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 12);
    }
};

export default command;

function getNearbyEntities(player, maxDistance, location = player.location) {
    return [...player.dimension.getEntities({
        location,
        maxDistance,
        excludeNames: [player.name],
        excludeFamilies: ["inanimate"],
        excludeTypes: ["item"],
        excludeTags: ["bending_dmg_off"]
    })];
}

function getClosestTarget(player, entities) {
    return entities[0];
}