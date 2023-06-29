import { MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, playSound, delayedFunc, calcBendingResistance } from "./../../util.js";

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
        setScore(player, "cooldown", 0);

        // Check if they have water
        if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
        setScore(player, "water_loaded", -1, true);

        // For player and water animation
        player.playAnimation("animation.air.blast");
        player.addTag("hiddenWater");

        // To be executed when the animation is done
        delayedFunc(player, (waterSpear) => {
            const map = new MolangVariableMap();
            for (var i = 1; i < 15; i++) {
                // Create the needed variables for kb and pos
                const currentPos = calcVectorOffset(player, -0.2, 1, i/2);
                const currentBlock = player.dimension.getBlock(currentPos);
                
                // A bit of damage to the entities
                const entities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.2, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
                entities.forEach(entity => {
                    entity.applyDamage(Math.max(3 - calcBendingResistance(entity), 1));
                });

                // Check if we hit a solid block or shield
                let detectShield = [...player.dimension.getEntities({ location: currentPos, maxDistance: 6, excludeNames: [player.name], tags: ["bendingShield"] })];
                if (currentBlock.isSolid()) break;
                if (detectShield[0]) return player.removeTag("hiddenWater");

                // Spawn the particle
                player.dimension.spawnParticle(`a:water_preloaded_${Math.max(Math.min(Math.ceil(getScore("water_loaded", player)/2), 8), 1)}`, currentPos, map);
            }

            // Apply full damage and knockback for good aim
            const playerViewDir = player.getViewDirection()
            const entities = player.getEntitiesFromViewDirection({ maxDistance: 10, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
            entities.forEach(entity => {
                if (entity.hasTag("permKbSafe") && (entity instanceof Player)) return entity.dimension.spawnParticle("a:air_leap", entity.location, map);
                try {
                    entity.applyKnockback(playerViewDir.x, playerViewDir.z, 3, 0.3)

                    const damageDealt = getScore('offTier', player) * this.damage_factor + 2;
                    entity.applyDamage(Math.max(damageDealt - calcBendingResistance(entity), 1));
                } catch (error) {}
            });

            // Particle effects and sound
            player.dimension.spawnParticle("a:water_blast_pop", calcVectorOffset(player, -0.2, 1, i/2 - 0.5), map);
            playSound(player, 'firework.blast', 1, calcVectorOffset(player, -0.2, 1, i/2 - 0.5), 3);
            player.removeTag("hiddenWater");
        }, 10);

    }
}

export default command