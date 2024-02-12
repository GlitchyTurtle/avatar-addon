import { MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, applyBasicDamage, setScore, playSound, delayedFunc } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Combustion Blast',
    description: 'Shoots out a beam that explodes when it hits either players or blocks!',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 0,
    skill_required: 'Combustion Blast',
    cooldown: 'fast',
    execute(player) {
        
        player.playAnimation("animation.fire.blast");

        delayedFunc(player, (combustionBlast) => {
            for (var i = 1; i < 250; i++) {
                // Create the needed variables for kb and pos
                const currentPos = calcVectorOffset(player, -0.2, 1, i/3);
                const currentBlock = player.dimension.getBlock(currentPos);
                const entities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 3.2, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];

                // Check if we hit a solid block
                if (!currentBlock.isAir || entities[0]) break;

                entities.forEach(entity => {
                    applyBasicDamage(player, entity, "ultra_heavy", 1);
                });

                if (i % 25 == 0) {
                    const entityViewDir = player.getViewDirection();
                    const angleMap = new MolangVariableMap();
                    angleMap.setVector3("variable.plane", entityViewDir);
                    player.dimension.spawnParticle("a:block_indicator", currentPos, angleMap);
                }

                // Spawn the particle
                player.dimension.spawnParticle("a:air_blast_small", currentPos, map);
            }

            // Particle effects and sound
            const finalPos = calcVectorOffset(player, -0.2, 1, (i)/3);
            player.dimension.spawnParticle("minecraft:huge_explosion_emitter", finalPos, map);
            playSound(player, 'firework.blast', 1, finalPos, 3);
            player.dimension.spawnEntity('a:explosion', {x: finalPos.x, y: finalPos.y + 3, z: finalPos.z});
            //console.warn("Combustion Blast by " + player.name + " at " + finalPos.x + " " + finalPos.y + " " + finalPos.z);
        }, 12);
    }
}

export default command