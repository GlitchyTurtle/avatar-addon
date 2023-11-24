import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, setScore, playSound, delayedFunc, calculateKnockbackVector } from "../../util.js";

const command = {
    name: 'Air Finder',
    description: 'Shoots a blast of air that locks on to the closest entity and shows their location. It doesn\'t do damage, but it looks scary!',
    style: 'air',
    unlockable: 8,
    unlockable_for_avatar: 8,
    cooldown: 'fast',
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.bubble");

        // To be executed when the animation is done
        delayedFunc(player, (airArtillery) => {
            const map = new MolangVariableMap();

            const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 45, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
            if (entities[0] == undefined) return player.sendMessage("§cThere are no nearby entities to target!");

            let currentTick = 0;
            let endRuntime = false;
            let currentLocation;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                // Find the block current location based on the last particle location
                entities.forEach(entity => {
                    let entityDir;
                    let currentPos;
                    let currentBlock;
                    try {
                        if (!currentLocation) {
                            entityDir = calculateKnockbackVector(entity.location, player.location, 1); 
                            currentLocation = calcVectorOffset(player, -0.2, 1, currentTick/2, entityDir);
                        }
                        entityDir = calculateKnockbackVector(entity.location, currentLocation, 1); 
                        currentPos = calcVectorOffset(player, -0.2, 1, currentTick/2, entityDir, currentLocation); //
                        currentBlock = player.dimension.getBlock(currentPos);
                    } catch (error) {
                        return;
                    }
                    if (!entityDir || !currentPos || !currentBlock) return;
    
                    // Check if we hit the entity
                    const hasHitEntity = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.5, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
    
                    // Check if we hit a solid block
                    if (currentBlock.isSolid || hasHitEntity[0] != undefined) return entities.splice(entities.indexOf(entity), 1);
    
                    // Spawn the particle
                    if (!hasHitEntity[0]) player.dimension.spawnParticle("a:air_blast", currentPos, map);
                });

                // The end of the runtime
                if (currentTick > 100 || endRuntime) {
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 10);
    }
}

export default command