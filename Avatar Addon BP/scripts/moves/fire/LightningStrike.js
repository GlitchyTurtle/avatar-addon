import { system, MolangVariableMap } from '@minecraft/server'
import { setScore, getScore, delayedFunc, calcVectorOffset } from "./../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Lightning Strike',
    description: 'Strike lightning on enemies 7 blocks out, which stuns enemies who get hit!',
    style: 'fire',
    unlockable: 15,
    unlockable_for_avatar: 0,
    sub_bending_required: 'lightning',
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        player.playAnimation("animation.fire.blast");

        delayedFunc(player, (lightningStrike) => {
            player.dimension.spawnEntity('minecraft:lightning_bolt', calcVectorOffset(player, 0, 0, 7));
            player.runCommand(`execute at @s as @s positioned ^^^7 run inputpermission set @a[r=3,name=!"${player.name}"] movement disabled`);
            player.runCommand(`execute at @s as @s positioned ^^^7 run inputpermission set @a[r=3,name=!"${player.name}"] camera disabled`);
    
            let currentTick = 0;
            let endRuntime = false;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);
                player.runCommand(`execute at @s as @s positioned ^^^7 run execute as @e[type=!player,r=3] at @s run tp @s @s`);
                const entities = [...player.dimension.getEntities({ excludeNames: [player.name], location: player.location, maxDistance: 10 })];
                entities.forEach(entity => {
                    if (getScore("defTier", entity) >= 10 && getScore("detect_sneak", entity) == 1) {
                        entity.runCommand("inputpermission set @s movement enabled");
                        entity.runCommand("inputpermission set @s camera enabled");
                        player.runCommand(`execute as @e[r=8,name=!"${entity.name}"] at @s run summon lightning_bolt`);
                        entity.addEffect("resistance", 20, { amplifier: 255, showParticles: false });
                        entity.addEffect("fire_resistance", 200, { amplifier: 3, showParticles: false });
                        entity.addEffect("instant_health", 200, { amplifier: 3, showParticles: false });
                        entity.addEffect("speed", 40, { amplifier: 3, showParticles: false });
                        entity.addEffect("strength", 40, { amplifier: 3, showParticles: false });
                        entity.sendMessage("§7You redirected lightning!");
                        endRuntime = true;
                    }
                    entity.dimension.spawnParticle("a:frost_breath", entity.location, map);
                });
                if (currentTick > 20 || endRuntime) {
                    player.runCommand(`execute at @s as @s positioned ^^^7 run inputpermission set @a[r=3,name=!"${player.name}"] movement enabled`);
                    player.runCommand(`execute at @s as @s positioned ^^^7 run inputpermission set @a[r=3,name=!"${player.name}"] camera enabled`);
                    return system.clearRun(sched_ID);
                }
            }, 1)
        }, 15)
    }
}

export default command