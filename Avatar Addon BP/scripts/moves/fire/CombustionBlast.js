import { MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, getScore, setScore, playSound, delayedFunc, calcBendingResistance } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Combustion Blast',
    description: 'Shoots out a beam that explodes when it hits either players or blocks!',
    style: 'fire',
    unlockable: 20,
    unlockable_for_avatar: 80,
    sub_bending_required: 'combustion',
    damage_factor: 3,
    execute(player) {
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.fire.blast");

        delayedFunc(player, (combustionBlast) => {
            for (var i = 1; i < 150; i++) {
                // Create the needed variables for kb and pos
                const currentPos = calcVectorOffset(player, -0.2, 1, i/2);
                const currentBlock = player.dimension.getBlock(currentPos);
                const entities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.2, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];

                // Check if we hit an entity
                if (entities[0] && i < 10) return player.sendMessage("§cThat's a bit too close, so damage cannot be dealt. Try 5+ blocks.");

                // Check if we hit a solid block
                if (currentBlock.isSolid()) break;

                // Spawn the particle
                player.dimension.spawnParticle("minecraft:large_explosion", currentPos, map);
            }

            // Apply full damage and knockback for good aim
            const playerViewDir = player.getViewDirection()
            const entities = player.getEntitiesFromViewDirection({ maxDistance: 75, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
            entities.forEach(entity => {
                entity.applyKnockback(playerViewDir.x, playerViewDir.z, 3, 0.3)
                const damageDealt = getScore('offTier', player) * this.damage_factor + 2;
                entity.applyDamage(Math.max(damageDealt - calcBendingResistance(entity), 1));
            });

            // Particle effects and sound
            player.dimension.spawnParticle("minecraft:huge_explosion_emitter", calcVectorOffset(player, -0.2, 1, i/2 - 0.5), map);
            playSound(player, 'firework.blast', 1, calcVectorOffset(player, -0.2, 1, i/2 - 0.5), 3);
        }, 12);
    }
}

export default command