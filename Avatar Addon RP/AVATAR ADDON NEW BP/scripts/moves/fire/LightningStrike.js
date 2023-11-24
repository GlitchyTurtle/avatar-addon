import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, traceLine, setScore, delayedFunc } from "../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Lightning Strike',
    description: 'Shoot an arc of lightning directly forward, which will stun the first 2 entities it touches for 2 seconds.',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'slow',
    skill_required: 'Lightning Strike',
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");
        
        // To be executed when the animation is done
        delayedFunc(player, (airBall) => {
            let currentTick = 0;
            player.runCommand("inputpermission set @s movement disabled");
            player.runCommandAsync("camerashake add @a[r=10] 0.2 0.8 positional");
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 16) {
                    player.runCommand("inputpermission set @s movement enabled");
                    return system.clearRun(sched_ID);
                }

                const locationA = calcVectorOffset(player, 0, 0.6, 0.2)
                const locationB = calcVectorOffset(player, Math.random() * 4 - 2, Math.random() * 2 - 0.5, 4 + Math.random())
                const locationC = calcVectorOffset(player, Math.random() * 4 - 2, Math.random() * 2 - 0.5, 6 + Math.random())
                const locationD = calcVectorOffset(player, 0, 0, 12)
    
                //player.dimension.spawnParticle("a:air_blast", locationA, map);
                traceLine(player, locationA, locationB, 20, "a:lightning");
                traceLine(player, locationB, locationC, 20, "a:lightning");
                traceLine(player, locationC, locationD, 20, "a:lightning");

                //player.runCommand(`execute positioned ^^^10 run tag @e[r=4,name=!${player.name}] add stun`);
                //player.runCommand(`execute positioned ^^^5 run tag @e[r=4,name=!${player.name}] add stun`);

                const entities = player.getEntitiesFromViewDirection({ maxDistance: 75, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
                entities.forEach(eventEntity => {
                    if (eventEntity.entity.hasTag("bending_dmg_off")) return;
                    eventEntity.entity.addTag("stun")
                });
            }, 1);
        }, 12);

        delayedFunc(player, (stun) => {
            let currentTickSecondary = 0;
            const sched_ID_Secondary = system.runInterval(function tick() {
                // In case of errors
                currentTickSecondary++;
                if (currentTickSecondary > 100) return system.clearRun(sched_ID_Secondary);
                
                const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 40, tags: ["stun"] })];
                let count = 0;
                entities.forEach(entity => {
                    if (count > 1) return;
                    count++;
                    const locationA = calcVectorOffset(entity, Math.random() * 2 - 1, Math.random() * 2 - 0.5, Math.random() * 2 - 1)
                    const locationB = calcVectorOffset(entity, Math.random() * 2 - 1, Math.random() * 2 - 0.5, Math.random() * 2 - 1)
                    const locationC = calcVectorOffset(entity, Math.random() * 2 - 1, Math.random() * 2 - 0.5, Math.random() * 2 - 1)
                    const locationD = calcVectorOffset(entity, Math.random() * 2 - 1, Math.random() * 2 - 0.5, Math.random() * 2 - 1)
        
                    traceLine(entity, locationA, locationB, 5, "a:lightning");
                    traceLine(entity, locationB, locationC, 5, "a:lightning");
                    traceLine(entity, locationC, locationD, 5, "a:lightning");
                    
                    entity.addEffect("slowness", 25, { amplifier: 5, showParticles: false });
                    entity.addEffect("blindness", 25, { amplifier: 2, showParticles: false });
                });

                if (currentTickSecondary > 40) {
                    entities.forEach(entity => {
                        try {
                            entity.removeTag("stun")
                            entity.removeEffect("blindness");
                            entity.removeEffect("slowness");
                        } catch (error) {}
                    })
                    return system.clearRun(sched_ID_Secondary);
                }
            }, 1)
        }, 15)

    }
}

export default command