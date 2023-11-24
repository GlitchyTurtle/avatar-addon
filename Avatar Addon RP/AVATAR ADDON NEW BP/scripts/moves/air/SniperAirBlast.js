import { MolangVariableMap, system } from "@minecraft/server";
import { calcVectorOffset, applyBasicDamage, setScore, playSound, delayedFunc, traceLine, createShockwave } from "../../util.js";

const command = {
    name: 'Sniper Air Blast',
    description: 'Shoots a focused beam of air that does damage and knockback, but at a super long range. It only works if your cursor is perfectly aimed.',
    style: 'air',
    unlockable: 12,
    unlockable_for_avatar: 12,
	cooldown: 'slow',
    execute(player, decay) {
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");

        delayedFunc(player, (airBall) => {
            const map = new MolangVariableMap();
            const travelDir = player.getViewDirection();

            let currentTick = -5;
            let endRuntime = false;
            let currentLocation;

            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick += 5;
                if (currentTick > 101) return system.clearRun(sched_ID);

                // Find the block current location based on the last particle location
                let currentPos;
                let previousPos;
                let currentBlock;
                try {
                    if (!currentLocation) currentLocation = calcVectorOffset(player, 0, 0, currentTick, travelDir);
                    currentPos = calcVectorOffset(player, 0, 0.5, currentTick, travelDir, currentLocation); //
                    currentBlock = player.dimension.getBlock(currentPos);  
                } catch (error) {
                    return system.clearRun(sched_ID);
                }

                if (!currentPos || !currentBlock) return system.clearRun(sched_ID);

                const entities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 4, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];

                // Check if we hit an entity
                if (entities[0] && currentTick < 15) {
                    player.sendMessage("§cThat's a bit too close, so damage cannot be dealt. Try 15+ blocks.");
                    return system.clearRun(sched_ID);
                }
                
                entities.forEach(entity => {
                    applyBasicDamage(player, entity, "ultra_heavy", 1);
                });
                if (entities[0] != undefined) endRuntime = true;

                // Check if we hit a solid block
                if (currentBlock.isSolid) endRuntime = true;

                if (currentTick % 15 == 0) {
                    const entityViewDir = player.getViewDirection();
                    const angleMap = new MolangVariableMap();
                    angleMap.setVector3("variable.plane", entityViewDir);
                    player.dimension.spawnParticle("a:block_indicator", currentPos, angleMap);
                }

                // Spawn the particle
                player.dimension.spawnParticle("a:air_blast", currentPos, map);

                previousPos = calcVectorOffset(player, 0, 0.5, currentTick - 5, travelDir, currentLocation);

                if (previousPos) traceLine(player, currentPos, previousPos, 5, "a:air_blast");

                // The end of the runtime
                if (currentTick > (100/decay) || endRuntime) {
                    // Particle effects and sound
                    player.dimension.spawnParticle("minecraft:huge_explosion_emitter", currentPos, map);
                    createShockwave(player, currentPos, "super_heavy", 12, 2);
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 10);

        /*
        delayedFunc(player, (airBlast) => {
            const map = new MolangVariableMap();
            for (var i = 1; i < 150; i++) {
                // Create the needed variables for kb and pos
                const currentPos = calcVectorOffset(player, -0.2, 1, i/2);
                const currentBlock = player.dimension.getBlock(currentPos);
                const entities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.2, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];

                // Check if we hit an entity
                if (entities[0] && i < 30) return player.sendMessage("§cThat's a bit too close, so damage cannot be dealt. Try 15+ blocks.");

                // Check if we hit a solid block
                if (currentBlock.isSolid) break;

                if (i % 20 == 0 || i == 5) {
                    const entityViewDir = player.getViewDirection();
                    const angleMap = new MolangVariableMap();
                    angleMap.setVector3("variable.plane", entityViewDir);
                    player.dimension.spawnParticle("a:block_indicator", currentPos, angleMap);
                }

                // Spawn the particle
                player.dimension.spawnParticle("a:air_blast", currentPos, map);
            }

            // Apply full damage and knockback for good aim
            const entities = player.getEntitiesFromViewDirection({ maxDistance: 75, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
            entities.forEach(eventEntity => applyBasicDamage(player, eventEntity.entity, "ultra_heavy", 1));

            // Particle effects and sound
            player.dimension.spawnParticle("a:air_blast_pop", calcVectorOffset(player, -0.2, 1, i/2 - 0.5), map);
            playSound(player, 'firework.blast', 1, calcVectorOffset(player, -0.2, 1, i/2 - 0.5), 3);
        }, 12);
        */
    }
}

export default command