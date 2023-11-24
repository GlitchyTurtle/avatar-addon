import { MolangVariableMap } from "@minecraft/server";
import { setScore, getScore, playSound, calculateDistance } from "../util.js";
import { playerHasSkill } from "../scroll/skillTreeMenu.js";

const map = new MolangVariableMap();

function calculateDistanceXZ(posA, posB) {
    const deltaX = posB.x - posA.x;
    const deltaZ = posB.z - posA.z;
    const distance = Math.sqrt(deltaX * deltaX + deltaZ * deltaZ);
    return distance;
}

export function entityHitBlockEvent(eventData) {
    // Properties from class
    let { hitBlock, damagingEntity } = eventData;

    // If a block is hit then ignore
	if (!hitBlock) return;

    if (damagingEntity.hasTag("water") && hitBlock.typeId === "minecraft:grass" && getScore("water_loaded", damagingEntity) < 8 && playerHasSkill(damagingEntity, "Moisture Drain")) {
        damagingEntity.sendMessage("§7Consumed moisture from this block.")
        hitBlock.setType("minecraft:dirt");
        setScore(damagingEntity, "water_loaded", 8);
    }

    if (damagingEntity.getComponent('inventory').container.getItem(damagingEntity.selectedSlot)) return;

    if (damagingEntity.hasTag("pillar_pound") && (hitBlock.typeId === "minecraft:grass") && getScore("cooldown", damagingEntity) == 100 && getScore("detect_sneak", damagingEntity) == 0) {
        setScore(damagingEntity, "cooldown", 0);
        damagingEntity.onScreenDisplay.setTitle(`a:earth_super_fast`);
        damagingEntity.addTag("super_fast_cooldown");
        
        const { x, y, z } = hitBlock.location;

        if (calculateDistanceXZ(damagingEntity.location, hitBlock.location) < 1.5) {
            damagingEntity.teleport({ x: damagingEntity.location.x, y: damagingEntity.location.y + 4, z: damagingEntity.location.z }, { dimension: damagingEntity.dimension });
            damagingEntity.applyKnockback(0, 0, 0, 2);
            damagingEntity.addEffect("slow_falling", 165, { amplifier: 255, showParticles: false });
        }
        damagingEntity.runCommand(`clone ${x} ${y-3} ${z} ${x} ${y} ${z} ${x} ${y+1} ${z}`);
        damagingEntity.runCommand(`fill ${x} ${y-3} ${z} ${x} ${y} ${z} air`);
        damagingEntity.dimension.spawnParticle("a:earth_shockwave_small", { x: x + 0.5, y: y + 1, z: z + 0.5 }, map);
    } else if (damagingEntity.hasTag("pillar_pound") && (hitBlock.typeId === "minecraft:grass") && getScore("cooldown", damagingEntity) == 100 && getScore("detect_sneak", damagingEntity) == 1) {
        setScore(damagingEntity, "cooldown", 0);
        damagingEntity.onScreenDisplay.setTitle(`a:earth_super_fast`);
        damagingEntity.addTag("super_fast_cooldown");
        
        const { x, y, z } = hitBlock.location;
        damagingEntity.runCommand(`clone ${x} ${y-3} ${z} ${x} ${y} ${z} ${x} ${y-7} ${z}`);
        damagingEntity.runCommand(`fill ${x} ${y-3} ${z} ${x} ${y} ${z} air`);
        damagingEntity.dimension.spawnParticle("a:earth_shockwave_small", { x: x + 0.5, y: y + 1, z: z + 0.5 }, map);
    }
}