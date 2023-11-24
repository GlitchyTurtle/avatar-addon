import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, createShockwave, getScore, setScore, playSound, delayedFunc, calculateKnockbackVector } from "../../util.js";

const command = {
    name: 'Air Asphyxiation',
    description: 'Shoots a blast of air that locks on to the closest entity, and does damage on impact!',
    style: 'air',
    unlockable: 11,
    unlockable_for_avatar: 11,
    cooldown: 'fast',
    skill_required: "Asphyxiation",
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");

        // To be executed when the animation is done
        delayedFunc(player, (airAsphyxiation) => {
            const map = new MolangVariableMap();
            const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 25, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
            
            if (entities[0] == undefined) return player.sendMessage("§cThere are no nearby entities to target!");

            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 200) return system.clearRun(sched_ID);

                const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 55, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
                const target = entities[0];

                if (target.getEffect("invisibility") || target.hasTag("dodge") || target.hasTag("bendingShield")) {
                    player.sendMessage("§cThe entity you were tracking was lost!");
                    return system.clearRun(sched_ID);
                }
                

                
                // The end of the runtime
                if (currentTick > 100) return system.clearRun(sched_ID);
            }, 1);
        }, 12);
    }
}

export default command