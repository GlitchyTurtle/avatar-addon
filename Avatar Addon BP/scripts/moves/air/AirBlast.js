import { MolangVariableMap, Player } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, playSound, delayedFunc, calcBendingResistance } from "./../../util.js";

const command = {
    name: 'Air Blast',
    description: 'Shoots a focused beam of air that does damage and knockback.',
    style: 'air',
    unlockable: 0,
    unlockable_for_avatar: 0,
	cooldown: 'fast',
    damage_factor: 2.5,
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");

        // To be executed when the animation is done
        delayedFunc(player, (airBlast) => {
            const map = new MolangVariableMap();
            for (var i = 1; i < 15; i++) {
                // Create the needed variables for kb and pos
                const playerViewDir = player.getViewDirection()
                const currentPos = calcVectorOffset(player, -0.2, 1, i/2);
                const currentBlock = player.dimension.getBlock(currentPos);
                
                // Apply knockback (and a little bit of damage) to the entities
                const entities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.2, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
                let items = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.2, type: "item" })];
                entities.forEach(entity => {
                    if (entity.hasTag("permKbSafe") && (entity instanceof Player)) return entity.dimension.spawnParticle("a:air_leap", entity.location, map);
                    entity.applyKnockback(playerViewDir.x, playerViewDir.z, 1, 0.3)
                    entity.applyDamage(Math.max(3 - calcBendingResistance(entity), 1));
                });
                items.forEach(item => { item.applyImpulse(playerViewDir) });

                // Check if we hit a solid block or shield
                let detectShield = [...player.dimension.getEntities({ location: currentPos, maxDistance: 6, excludeNames: [player.name], tags: ["bendingShield"] })];
                if (currentBlock.isSolid()) break;
                if (detectShield[0]) return;

                // Spawn the particle
                player.dimension.spawnParticle("a:air_blast", currentPos, map);
            }

            // Apply full damage and knockback for good aim
            const playerViewDir = player.getViewDirection()
            const entities = player.getEntitiesFromViewDirection({ maxDistance: 10, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
            entities.forEach(entity => {
                try {
                    if (entity.hasTag("permKbSafe") && (entity instanceof Player)) return entity.dimension.spawnParticle("a:air_leap", entity.location, map);
                    entity.applyKnockback(playerViewDir.x, playerViewDir.z, 3, 0.3)

                    const damageDealt = getScore('offTier', player) * this.damage_factor + 2;
                    entity.applyDamage(Math.max(damageDealt - calcBendingResistance(entity), 1));
                } catch (error) {}
            });

            // Particle effects and sound
            player.dimension.spawnParticle("a:air_blast_pop", calcVectorOffset(player, -0.2, 1, i/2 - 0.5), map);
            playSound(player, 'firework.blast', 1, calcVectorOffset(player, -0.2, 1, i/2 - 0.5), 3);
        }, 10);
    }
}

export default command