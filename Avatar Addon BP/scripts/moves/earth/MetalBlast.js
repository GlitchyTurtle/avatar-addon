import { MolangVariableMap, Player } from "@minecraft/server";
import { calcVectorOffset, applyBasicDamage, setScore, playSound, delayedFunc, checkItemAmount } from "./../../util.js";

const command = {
    name: 'Metal Blast',
    description: 'Shoots a focused beam of metal that *does* damage (with no max damage cap). Almost no cooldown because it consumes iron instead!',
    style: 'earth',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'super_fast',
    skill_required: "Metal Blast",
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.earth.blast");
        
        // To be executed when the animation is done
        delayedFunc(player, (airBlast) => {
            const map = new MolangVariableMap();
            for (var i = 1; i < 15; i++) {
                // Create the needed variables for kb and pos
                const playerViewDir = player.getViewDirection()
                const currentPos = calcVectorOffset(player, -0.2, 1, i/2);
                const currentBlock = player.dimension.getBlock(currentPos);
                
                // Apply knockback (and a little bit of damage) to the entities
                const entities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 3, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
                let items = [...player.dimension.getEntities({ location: currentPos, maxDistance: 3, type: "item" })];
                entities.forEach(entity => applyBasicDamage(player, entity.entity, "super_light", 1));
                items.forEach(item => { item.applyImpulse(playerViewDir) });

                // Check if we hit a solid block or shield
                let detectShield = [...player.dimension.getEntities({ location: currentPos, maxDistance: 6, excludeNames: [player.name], tags: ["bendingShield"] })];
                if (currentBlock.isSolid) break;
                if (detectShield[0]) return;

                // Spawn the particle
                player.dimension.spawnParticle("a:metal_blast", currentPos, map);
            }

            // Apply full damage and knockback for good aim
            const entities = player.getEntitiesFromViewDirection({ maxDistance: 10, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
            entities.forEach(eventEntity => applyBasicDamage(player, eventEntity.entity, "normal", 1));


            // Particle effects and sound
            playSound(player, 'firework.blast', 1, calcVectorOffset(player, -0.2, 1, i/2 - 0.5), 3);
        }, 10);
    }
}

export default command