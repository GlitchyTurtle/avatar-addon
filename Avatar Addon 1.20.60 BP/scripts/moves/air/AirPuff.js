import { system, MolangVariableMap } from "@minecraft/server";
import { delayedFunc, createShockwave, calcVectorOffset, setScore, playSound } from "../../util.js";

const map = new MolangVariableMap();
const command = {
    name: 'Air Puff',
    description: 'Explodes a small shockwave of air a few blocks in front of you that does damage.',
    style: 'air',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    skill_required: "Air Puff",
    execute(player) {
        // Setup
        
        player.playAnimation("animation.air.blast");

        // To be executed when the animation is done
        delayedFunc(player, airPulse => {
            player.dimension.spawnParticle("a:air_leap", player.location, map);

            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // Code
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                const map2 = new MolangVariableMap();
                const headloc = player.getHeadLocation();
                const virdir = player.getViewDirection()
                map2.setVector3("variable.plane", virdir);
                player.dimension.spawnParticle("a:blow", calcVectorOffset(player, 0, 0, 1, virdir, headloc), map2);
            
                for (let i = 1; i < 20; i++) {
                    const nearbyEntities = [...player.dimension.getEntities({ location: calcVectorOffset(player, 0, 0, i), maxDistance: 2, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
                    nearbyEntities.forEach(entity => {
                        if (entity.hasTag("permKbSafe")) return entity.dimension.spawnParticle("a:air_leap", entity.location, map);
                        entity.applyKnockback(virdir.x, virdir.z, i/8, virdir.y/2);
                    });
                }    

                // The end of the runtime
                if (currentTick > 35) return system.clearRun(sched_ID);
            }, 1);
        }, 10);
    }
}

export default command