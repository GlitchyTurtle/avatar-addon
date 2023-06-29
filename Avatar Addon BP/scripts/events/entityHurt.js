import { Player, MolangVariableMap } from "@minecraft/server";
import { setScore, getScore } from "../util.js";

const map = new MolangVariableMap();

export function entityHurt(eventData) {
    const { hurtEntity, damageSource } = eventData;
    const health = hurtEntity.getComponent("health");

    if (hurtEntity.hasTag("water") && (damageSource.cause === "fire" || damageSource.cause === "fireTick") && getScore("utiTier", hurtEntity) >= 1) {
        if (getScore("water_loaded", hurtEntity) < 1) return hurtEntity.sendMessage("§cYou don't have enough water to put out this fire!")
        setScore(hurtEntity, "water_loaded", -1, true);
        const { x, y, z } = hurtEntity.location;
        const newLocation = { x: x, y: y + 1.3, z: z }
        hurtEntity.dimension.spawnParticle(`a:water_wave`, newLocation, map);
        hurtEntity.dimension.spawnParticle(`a:water_blast_pop`, newLocation, map);
        hurtEntity.addEffect("fire_resistance", 240, { amplifier: 0, showParticles: false });
        hurtEntity.runCommand("fill ~5~5~5 ~-5~-5~-5 air replace fire");
    }
    
    if (health.current > 0 || !health) return;
    setScore(hurtEntity, "combat", 0);
    setScore(hurtEntity, "deaths", 1, true);

    if (!damageSource || !(damageSource.damagingEntity instanceof Player)) return;
    setScore(damageSource.damagingEntity, "kills", 1, true);
}