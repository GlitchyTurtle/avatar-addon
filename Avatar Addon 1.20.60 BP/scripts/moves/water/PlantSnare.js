import { system, MolangVariableMap } from '@minecraft/server'
import { getScore, setScore, delayedFunc, playSound, traceLine, applyBasicDamage, calcVectorOffset } from "../../util.js";

const command = {
    name: 'Plant Snare',
    description: 'Slow and posion your enemies in a 15 block radius by trapping them with vines that damage and prevent movement!',
    style: 'water',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'slow',
    skill_required: "Plant Snare",
    execute(player) {
        
        

        // Check if they have water
        if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
        setScore(player, "water_loaded", -1, true);

        player.playAnimation("animation.water.blast");
        delayedFunc(player, (frostBreath) => {
            playSound(player, 'mob.turtle.swim', 0.9, player.location, 1);
            const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 15, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                entities.forEach(entity => {
                    try {
                        entity.applyKnockback(0, 0, -5, -5);
                        if (Math.random() > 0.8) applyBasicDamage(player, entity, "super_light", 0);

                        const locationA = calcVectorOffset(entity, Math.random() * 2 - 1, Math.random() * 2 - 0.5, Math.random() * 2 - 1)
                        const locationB = calcVectorOffset(entity, Math.random() * 2 - 1, Math.random() * 2 - 0.5, Math.random() * 2 - 1)
                        const locationC = calcVectorOffset(entity, Math.random() * 2 - 1, Math.random() * 2 - 0.5, Math.random() * 2 - 1)
                        const locationD = calcVectorOffset(entity, Math.random() * 2 - 1, Math.random() * 2 - 0.5, Math.random() * 2 - 1)
            
                        traceLine(entity, locationA, locationB, 5, "a:plant_vine");
                        traceLine(entity, locationB, locationC, 5, "a:plant_vine");
                        traceLine(entity, locationC, locationD, 5, "a:plant_vine");
                        
                        entity.addEffect("slowness", 25, { amplifier: 25, showParticles: false });
                        entity.addEffect("blindness", 25, { amplifier: 22, showParticles: false });
                    } catch (err) {}
                });
            }, 1)
        }, 10)
    }
}

export default command