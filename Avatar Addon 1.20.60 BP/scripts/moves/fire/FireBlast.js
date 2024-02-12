import { MolangVariableMap, Player } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, playSound, delayedFunc, applyBasicDamage } from "./../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Fire Blast',
    description: 'Shoots fire 10 blocks in front of you!',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 65,
    cooldown: 'super_fast',
    damage_factor: 3,
    execute(player) {
        // Setup
        
        player.playAnimation("animation.fire.blast");

        // To be executed when the animation is done
        delayedFunc(player, fireBlast => {
            let firetype = (getScore("level", player) >= 100) ? "fire_blue_blast" : "fire_blast";
            for (var i = 1; i < 25; i++) {
                // Create the needed variables for kb and pos
                const playerViewDir = player.getViewDirection()
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
                if (detectShield[0]) return;

                // Spawn the particles
                player.dimension.spawnParticle(`a:${firetype}`, currentPos, map);
                player.dimension.spawnParticle(`a:${firetype}`, calcVectorOffset(player, 0, 1 + i/20, i/2), map);
                player.dimension.spawnParticle(`a:${firetype}`, calcVectorOffset(player, 0, 1 - i/20, i/2), map);
                player.dimension.spawnParticle(`a:${firetype}`, calcVectorOffset(player, -(i/20), 1, i/2), map);
                player.dimension.spawnParticle(`a:${firetype}`, calcVectorOffset(player, (i/20), 1, i/2), map);
            }

            // Apply full damage and knockback for good aim
            const entities = player.getEntitiesFromViewDirection({ maxDistance: 10, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
            entities.forEach(eventEntity => applyBasicDamage(player, eventEntity.entity, "high", 1));
            playSound(player, 'firework.blast', 1, calcVectorOffset(player, -0.2, 1, i/2 - 0.5), 3);
        }, 10);
    }
}

export default command