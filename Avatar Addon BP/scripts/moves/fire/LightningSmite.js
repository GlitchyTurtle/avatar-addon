import { MolangVariableMap } from '@minecraft/server'
import { setScore, getScore, delayedFunc } from "./../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Lightning Smite',
    description: 'Strike lightning on multiple enemies in a radius of up to 8 blocks out!',
    style: 'fire',
    unlockable: 20,
    unlockable_for_avatar: 80,
    sub_bending_required: 'lightning',
    cooldown: 'super_fast',
    execute(player) {
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.fire.push");

        delayedFunc(player, (frostBreath) => {
            const entities = [...player.dimension.getEntities({ excludeNames: [player.name], location: player.location, maxDistance: 8 })];
            if (entities[0] == undefined) return player.sendMessage("§cThere are no nearby entities to target!");
            entities.forEach(entity => {
                if (getScore("defTier", entity) >= 10 && getScore("detect_sneak", entity) == 1) {
                    player.runCommand(`execute as @e[r=8,name=!"${entity.name}"] at @s run summon lightning_bolt`);
                    entity.addEffect("resistance", 20, { amplifier: 255, showParticles: false });
                    entity.addEffect("fire_resistance", 200, { amplifier: 3, showParticles: false });
                    entity.addEffect("instant_health", 200, { amplifier: 3, showParticles: false });
                    entity.addEffect("speed", 40, { amplifier: 3, showParticles: false });
                    entity.addEffect("strength", 40, { amplifier: 3, showParticles: false });
                    entity.sendMessage("§7You redirected lightning!");
                }
                entity.dimension.spawnParticle("a:frost_breath", entity.location, map);
                player.dimension.spawnEntity('minecraft:lightning_bolt', entity.location);
            });
        }, 6);    
    }
}

export default command