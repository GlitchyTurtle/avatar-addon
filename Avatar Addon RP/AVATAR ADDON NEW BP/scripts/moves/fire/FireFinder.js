import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, setScore, getScore, createShockwave, delayedFunc, calculateKnockbackVector } from "../../util.js";

const command = {
    name: 'Fire Finder',
    description: 'Shoots a blast of fire that locks on to the closest entity, and does damage on impact!',
    style: 'fire',
    unlockable: 1,
    unlockable_for_avatar: 62,
    cooldown: 'fast',
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.fire.blast");

        // To be executed when the animation is done
        delayedFunc(player, (fireFinder) => {
            const map = new MolangVariableMap();
            const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 55, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
            if (entities[0] == undefined) return player.sendMessage("§cThere are no nearby entities to target!");

            const particle = (getScore("level", player) >= 100) ? "a:fire_finder_blue" : "a:fire_finder";
            let currentTick = 0;
            let endRuntime = false;
            let currentLocation;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 55, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
                const target = entities[0];

                if (target.getEffect("invisibility") || target.hasTag("dodge") || target.hasTag("bendingShield")) {
                    player.sendMessage("§cThe entity you were tracking was lost!");
                    return system.clearRun(sched_ID);
                }

                // Find the block current location based on the last particle location
                let entityDir;
                let currentPos;
                let currentBlock;
                try {
                    if (!currentLocation) {
                        entityDir = calculateKnockbackVector(target.location, player.location, 1); 
                        currentLocation = calcVectorOffset(player, -0.2, 1, currentTick, entityDir);
                    }
                    entityDir = calculateKnockbackVector(target.location, currentLocation, 1); 
                    currentPos = calcVectorOffset(player, -0.2, 1, currentTick, entityDir, currentLocation);
                    currentBlock = player.dimension.getBlock(currentPos);
                } catch (error) {
                    return system.clearRun(sched_ID);
                }
                if (!entityDir || !currentPos || !currentBlock) return system.clearRun(sched_ID);

                // Check if we hit the entity
                const hasHitEntity = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.5, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];

                // Check if we hit a solid block
                if (currentBlock.isSolid || hasHitEntity[0] != undefined) endRuntime = true;

                // Spawn the particle
                player.dimension.spawnParticle(particle, currentPos, map);
                
                // The end of the runtime
                if (currentTick > 50 || endRuntime) {
                    createShockwave(player, currentPos, "high", 3, 2);
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 12);
    }
}

export default command