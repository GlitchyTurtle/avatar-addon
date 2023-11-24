import { MolangVariableMap, system } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, playSound, delayedFunc, applyBasicDamage } from "./../../util.js";

const command = {
    name: 'Air Blast',
    description: 'Shoots a focused beam of air that does damage and knockback.',
    style: 'air',
    unlockable: 0,
    unlockable_for_avatar: 0,
	cooldown: 'super_fast',
    damage_factor: 2.5,
    execute(player, decay) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");

        // To be executed when the animation is done

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
                items.forEach(item => { item.applyImpulse(playerViewDir) });

                const nearbyEntities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 3, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
                nearbyEntities.forEach(entity => {
                   applyBasicDamage(player, entity, "normal", 3/decay);
                });
                if (nearbyEntities[0] != undefined) endRuntime = true;

                // Check if we hit a solid block
                if (currentBlock.isSolid) endRuntime = true;

                // Spawn the particle
                player.dimension.spawnParticle("minecraft:large_explosion", currentPos, map);

                // The end of the runtime
                if (currentTick > (10/decay + 2) || endRuntime) {
                    // Particle effects and sound
                    player.dimension.spawnParticle("a:air_blast_pop", currentPos, map);
                    //createShockwave(player, currentPos, "super_heavy", 12, 2);
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 10);
    }
}

export default command