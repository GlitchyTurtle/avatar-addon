import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, applyBasicDamage, getScore, setScore, playSound, delayedFunc, calculateKnockbackVector } from "../../util.js";

const command = {
    name: 'Air Asphyxiation',
    description: 'Shoots a blast of air that locks on to the closest entity, and does damage on impact!',
    style: 'air',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'slow',
    skill_required: "Asphyxiation",
    execute(player) {
        // Setup
        
        player.playAnimation("animation.air.blast");

        // To be executed when the animation is done
        delayedFunc(player, (airAsphyxiation) => {
            const map = new MolangVariableMap();
            const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 15, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
            const target = entities[0];
            if (target == undefined) return player.sendMessage("§cThere are no nearby entities to target!");

            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 50) return system.clearRun(sched_ID);

                try {
                    if (target.getEffect("invisibility") || target.hasTag("dodge") || target.hasTag("bendingShield")) {
                        player.sendMessage("§cThe entity you were tracking was lost!");
                        return system.clearRun(sched_ID);
                    }

                    player.dimension.spawnParticle("a:air_pulse", target.getHeadLocation(), map);
                    if (Math.random() > 0.92) applyBasicDamage(player, target, "light", 0, true);
                    target.addEffect("slowness", 25, { amplifier: 2, showParticles: false });
                    target.addEffect("blindness", 25, { amplifier: 1, showParticles: false });
                    
                } catch (error) {}

                // The end of the runtime
                if (currentTick > 50) return system.clearRun(sched_ID);
            }, 1);
        }, 12);
    }
}

export default command