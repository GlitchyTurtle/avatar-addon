import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, calculateDistance, setScore, applyBasicDamage, delayedFunc, calculateKnockbackVector } from "./../../util.js";

const command = {
    name: 'Air Tornado',
    description: 'Summon out a blade of air that you can steer by moving left and right.',
    style: 'air',
    unlockable: 10,
    unlockable_for_avatar: 10,
    cooldown: 'slow',
    damage_factor: 1,
    execute(player) {
        // Setup
        player.playAnimation("animation.air.tornado");
        player.runCommand("inputpermission set @s movement disabled");
        
        // To be executed when the animation is done
        delayedFunc(player, (airTornado) => {
            player.runCommand("inputpermission set @s movement enabled");
            const viewDir = player.getViewDirection();
            const travelDir = {x: viewDir.x, y: 0, z: viewDir.z}

            let currentTick = 0;
            let endRuntime = false;
            let currentLocation; //PERMKBSAFE
            const map = new MolangVariableMap();
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 150) return system.clearRun(sched_ID);

                // Find the block current location based on the last particle location
                let currentPos;
                let currentBlock;
                try {
                    if (!currentLocation) currentLocation = calcVectorOffset(player, 0, 0.3, currentTick/4, travelDir);
                    currentPos = calcVectorOffset(player, 0, 0.3, currentTick/4, travelDir, currentLocation);
                    currentBlock = player.dimension.getBlock(currentPos);  
                } catch (error) {
                    return system.clearRun(sched_ID);
                }
                if (!currentPos || !currentBlock) return system.clearRun(sched_ID);

                const nearbyEntities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 5.5, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
                nearbyEntities.forEach(entity => {
                    const kbVector = calculateKnockbackVector(entity.location, currentPos, 1.2);
                    const kbIntensity = calculateDistance(entity.location, currentPos) / 2.5;
                    if (Math.random() > 0.8) applyBasicDamage(player, entity, "super_light", 0);
                    entity.applyKnockback(-kbVector.x, -kbVector.z, kbIntensity, -kbVector.y);
                })

                // Check if we hit a solid block
                if (currentBlock.isSolid) endRuntime = true;

                // Spawn the particle
                for (let i = 1; i < 10; i++) {
                    map.setVector3("variable.plane", { x: 0.3, y: 15, z: 2 * i });
                    player.dimension.spawnParticle("a:air_shockwave_dynamic", {x: currentPos.x, y: currentPos.y + i/2, z: currentPos.z}, map);
    
                }

                // The end of the runtime
                if (currentTick > 90 || endRuntime) {
                    // Particle effects and sound
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 10);
    }
}

export default command