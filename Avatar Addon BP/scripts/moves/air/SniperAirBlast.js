import { MolangVariableMap, Player } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, playSound, delayedFunc, calcBendingResistance } from "../../util.js";

const command = {
    name: 'Sniper Air Blast',
    description: 'Shoots a focused beam of air that does damage and knockback, but at a super long range. It only works if your cursor is perfectly aimed.',
    style: 'air',
    unlockable: 0,
    unlockable_for_avatar: 0,
    off_tier_required: 5,
	cooldown: 'slow',
    damage_factor: 4,
    execute(player) {
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");

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
                if (currentBlock.isSolid()) break;

                // Spawn the particle
                player.dimension.spawnParticle("a:air_blast", currentPos, map);
            }

            // Apply full damage and knockback for good aim
            const playerViewDir = player.getViewDirection()
            const entities = player.getEntitiesFromViewDirection({ maxDistance: 75, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
            entities.forEach(entity => {
                try {
                    const damageDealt = getScore('offTier', player) * this.damage_factor + 2;
                    entity.applyDamage(Math.max(damageDealt - calcBendingResistance(entity), 1));

                    if (entity.hasTag("permKbSafe") && (entity instanceof Player)) return entity.dimension.spawnParticle("a:air_leap", entity.location, map);
                    entity.applyKnockback(playerViewDir.x, playerViewDir.z, 3, 0.3);
                } catch (error) {}
            });

            // Particle effects and sound
            player.dimension.spawnParticle("a:air_blast_pop", calcVectorOffset(player, -0.2, 1, i/2 - 0.5), map);
            playSound(player, 'firework.blast', 1, calcVectorOffset(player, -0.2, 1, i/2 - 0.5), 3);
        }, 12);
    }
}

export default command