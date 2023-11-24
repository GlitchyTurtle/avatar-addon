import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, createShockwave, setScore, delayedFunc, getScore } from "../../util.js";

const command = {
    name: 'Air Ball',
    description: 'Summon out a blade of air that you can steer by moving left and right.',
    style: 'air',
    unlockable: 10,
    unlockable_for_avatar: 10,
    cooldown: 'slow',
    damage_factor: 1,
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");
        const dmg_factor = this.damage_factor;

        // To be executed when the animation is done
        delayedFunc(player, (airBall) => {
            const map = new MolangVariableMap();
            const travelDir = player.getViewDirection();

            let currentTick = 0;
            let endRuntime = false;
            let currentLocation;
            let explode = true;
            
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 150) return system.clearRun(sched_ID);

                // Find the block current location based on the last particle location
                let currentPos;
                let currentBlock;
                try {
                    if (!currentLocation) currentLocation = calcVectorOffset(player, -0.2, 1, currentTick/2, travelDir);
                    currentPos = calcVectorOffset(player, -0.2, 1, currentTick/2, travelDir, currentLocation); //
                    currentBlock = player.dimension.getBlock(currentPos);  
                } catch (error) {
                    return system.clearRun(sched_ID);
                }

                if (!currentPos || !currentBlock) return system.clearRun(sched_ID);

                const nearbyEntities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 3, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];

                nearbyEntities.forEach(entity => {
                    const blockWindow = getScore("sneak_time", entity);
                    if (!blockWindow || blockWindow < 5 || blockWindow > 15) return endRuntime = true;
                    
                    explode = false;
                    const entityViewDir = entity.getViewDirection();
                    const map = new MolangVariableMap();
                    map.setVector3("variable.plane", entityViewDir);
                    const spawnPos = calcVectorOffset(entity, 0, 0.5, 1);
                    entity.dimension.spawnParticle("a:block_indicator", spawnPos, map);
                    playSound(entity, "note.pling", 3, entity.location, 2);
                });

                if (nearbyEntities[0] != undefined) endRuntime = true;

                // Check if we hit a solid block
                if (currentBlock.isSolid) endRuntime = true;

                // Spawn the particle
                player.dimension.spawnParticle("minecraft:large_explosion", currentPos, map);
                
                // The end of the runtime
                if (currentTick > 140 || endRuntime) {
                    // Particle effects and sound
                    if (explode) {
                        player.dimension.spawnParticle("minecraft:huge_explosion_emitter", currentPos, map);
                        createShockwave(player, currentPos, "super_heavy", 12, 2);
                    }
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 12);
    }
}

export default command