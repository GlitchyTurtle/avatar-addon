import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, playSound, delayedFunc, applyBasicDamage } from "./../../util.js";

const command = {
    name: 'Water Spear',
    description: 'Shoots a focused beam of water that does damage and knockback.',
    style: 'water',
    unlockable: 0,
    unlockable_for_avatar: 21,
    cooldown: 'super_fast',
    damage_factor: 3,
    execute(player) {
        // Setup
        

        // Check if they have water
        if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
        setScore(player, "water_loaded", -1, true);

        // For player and water animation
        player.playAnimation("animation.air.blast");
        player.addTag("hiddenWater");
/*
        // To be executed when the animation is done
        delayedFunc(player, (waterSpear) => {
            const map = new MolangVariableMap();
            for (var i = 1; i < 15; i++) {
                // Create the needed variables for kb and pos
                const currentPos = calcVectorOffset(player, -0.2, 1, i/2);
                const currentBlock = player.dimension.getBlock(currentPos);
                
                // Apply knockback (and a little bit of damage) to the entities
                const entities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 3, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
                let items = [...player.dimension.getEntities({ location: currentPos, maxDistance: 3, type: "item" })];
                entities.forEach(entity => applyBasicDamage(player, entity, "super_light", 1));
                items.forEach(item => { item.applyImpulse(playerViewDir) });

                // Check if we hit a solid block or shield
                let detectShield = [...player.dimension.getEntities({ location: currentPos, maxDistance: 6, excludeNames: [player.name], tags: ["bendingShield"] })];
                if (currentBlock.isSolid) break;
                if (detectShield[0]) return player.removeTag("hiddenWater");

                // Spawn the particle
                player.dimension.spawnParticle(`a:water_preloaded_${Math.max(Math.min(Math.ceil(getScore("water_loaded", player)/2), 8), 1)}`, currentPos, map);
            }

            // Apply full damage and knockback for good aim
            const entities = player.getEntitiesFromViewDirection({ maxDistance: 10, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
            entities.forEach(eventEntity => applyBasicDamage(player, eventEntity.entity, "normal", 1));

            // Particle effects and sound
            player.dimension.spawnParticle("a:water_blast_pop", calcVectorOffset(player, -0.2, 1, i/2 - 0.5), map);
            playSound(player, 'firework.blast', 1, calcVectorOffset(player, -0.2, 1, i/2 - 0.5), 3);
            player.removeTag("hiddenWater");
        }, 10);*/

        delayedFunc(player, (airBall) => {
            const map = new MolangVariableMap();
            const travelDir = player.getViewDirection();

            let currentTick = -1;
            let endRuntime = false;
            let currentLocation;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick += 2;
                if (currentTick > 15) return system.clearRun(sched_ID);

                // Find the block current location based on the last particle location
                let currentPos;
                let currentBlock;
                try {
                    if (!currentLocation) currentLocation = calcVectorOffset(player, 0, 0.5, currentTick, travelDir);
                    currentPos = calcVectorOffset(player, 0, 0.5, currentTick, travelDir, currentLocation); //
                    currentBlock = player.dimension.getBlock(currentPos);  
                } catch (error) {
                    return system.clearRun(sched_ID);
                }

                if (!currentPos || !currentBlock) return system.clearRun(sched_ID);

                let items = [...player.dimension.getEntities({ location: currentPos, maxDistance: 3, type: "item" })];
                items.forEach(item => { item.applyImpulse(travelDir) });

                const nearbyEntities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 3, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
                nearbyEntities.forEach(entity => {
                   applyBasicDamage(player, entity, "normal", 3);
                });
                if (nearbyEntities[0] != undefined) endRuntime = true;

                // Check if we hit a solid block
                if (currentBlock.isSolid) endRuntime = true;

                // Spawn the particle
                player.dimension.spawnParticle(`a:water_preloaded_8`, currentPos, map);

                // The end of the runtime
                if (currentTick > 12 || endRuntime) {
                    // Particle effects and sound
                    player.dimension.spawnParticle("a:water_blast_pop", currentPos, map);

                    player.removeTag("hiddenWater");
                    //createShockwave(player, currentPos, "super_heavy", 12, 2);
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 10);

    }
}

export default command