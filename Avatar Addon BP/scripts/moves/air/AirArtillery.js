import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, createShockwave, getScore, setScore, playSound, delayedFunc, calculateKnockbackVector } from "./../../util.js";

const command = {
    name: 'Air Artillery',
    description: 'Shoots a blast of air that locks on to the closest entity, and does damage on impact!',
    style: 'air',
    unlockable: 11,
    unlockable_for_avatar: 11,
    cooldown: 'fast',
    damage_factor: 0.5,
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");
        const dmg_factor = this.damage_factor;

        // To be executed when the animation is done
        delayedFunc(player, (airArtillery) => {
            const map = new MolangVariableMap();
            const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 25, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
            
            if (entities[0] == undefined) return player.sendMessage("§cThere are no nearby entities to target!");

            let currentTick = 0;
            let endRuntime = false;
            let currentLocation;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 200) return system.clearRun(sched_ID);

                // Find the block current location based on the last particle location
                let entityDir;
                let currentPos;
                let currentBlock;
                try {
                    if (!currentLocation) {
                        entityDir = calculateKnockbackVector(entities[0].location, player.location, 1); 
                        currentLocation = calcVectorOffset(player, -0.2, 1, currentTick, entityDir);
                    }
                    entityDir = calculateKnockbackVector(entities[0].location, currentLocation, 1); 
                    currentPos = calcVectorOffset(player, -0.2, 1, currentTick, entityDir, currentLocation); //
                    currentBlock = player.dimension.getBlock(currentPos);  
                } catch (error) {
                    return system.clearRun(sched_ID);
                }
                if (!entityDir || !currentPos || !currentBlock) return system.clearRun(sched_ID);

                // Check if we hit the entity
                const hasHitEntity = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.5, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];

                // Check if we hit a solid block
                if (currentBlock.isSolid() || hasHitEntity[0] != undefined) endRuntime = true;

                // Spawn the particle
                player.dimension.spawnParticle("minecraft:large_explosion", currentPos, map);
                
                // The end of the runtime
                if (currentTick > 100 || endRuntime) {
                    // Particle effects and sound
                    player.dimension.spawnParticle("a:air_blast_pop", currentPos, map);
                    playSound(player, 'firework.blast', 1, currentPos, 3);
                    createShockwave(player, currentPos, 3, 3, dmg_factor);
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 12);
    }
}

export default command