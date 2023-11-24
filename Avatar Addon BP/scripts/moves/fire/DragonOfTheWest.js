import { system, MolangVariableMap } from "@minecraft/server";
import { delayedFunc, applyBasicDamage, calcVectorOffset, setScore, playSound } from "../../util.js";

const map = new MolangVariableMap();
const command = {
    name: 'Dragon of the West',
    description: 'The most famous move of all! Maybe.',
    style: 'fire',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    skill_required: "Dragon of the West",
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.blast");

        // To be executed when the animation is done
        delayedFunc(player, airPulse => {

            let currentTick = 0;
            const sched_ID = system.runInterval(function tick() {
                // Code
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

                try {
                    const map2 = new MolangVariableMap();
                    const headloc = player.getHeadLocation();
                    const virdir = player.getViewDirection()
                    map2.setVector3("variable.plane", virdir);
                    player.dimension.spawnParticle("a:dragon_of_the_west", calcVectorOffset(player, 0, 0, 1, virdir, headloc), map2);
                
                    for (let i = 1; i < 15; i++) {
                        const nearbyEntities = [...player.dimension.getEntities({ location: calcVectorOffset(player, 0, 0, i), maxDistance: 2, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
                        nearbyEntities.forEach(entity => {
                            if (entity.hasTag("permKbSafe")) return entity.dimension.spawnParticle("a:air_leap", entity.location, map);
                            entity.applyKnockback(virdir.x, virdir.z, i/8, virdir.y/2);
                            applyBasicDamage(player, entity, "normal", 0);
                        });
                    }
                } catch (error) {}

                // The end of the runtime
                if (currentTick > 35) return system.clearRun(sched_ID);
            }, 1);
        }, 10);
    }
}

export default command