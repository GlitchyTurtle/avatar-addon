import { system, MolangVariableMap } from "@minecraft/server";
import { calcVectorOffset, setScore, playSound, delayedFunc, calculateKnockbackVector } from "../../util.js";

function calcDistanceToGround(player) {
    const { x, y, z } = player.location;
    if (player.isOnGround) {
        const block = player.dimension.getBlock({x: x, y: y - 0.5, z: z});
		return [0, block];
	}

	for (let i = 0; i < 200; i++) {
		const block = player.dimension.getBlock({x: x, y: y - i/4, z: z});
		if (!block.isAir) {
			return [i/4, block];
		}
	}
	return [50, null];
}

const command = {
    name: 'Water Vortex',
    description: 'Get the high ground on a \nspinning vortex of water!',
    style: 'water',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'fast',
    skill_required: "Water Vortex",
    execute(player) {
        // Setup
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.bubble");

        if (player.hasTag("usingPlume")) return;

        // To be executed when the animation is done
        delayedFunc(player, (airArtillery) => {
            const map = new MolangVariableMap();

            let currentTick = 0;
            let endRuntime = false;
            player.addTag("usingPlume")
            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 201) return system.clearRun(sched_ID);

                const gdist = calcDistanceToGround(player);
                const distance = gdist[0];
                const block = gdist[1];
                
                const viewDirection = player.getViewDirection();
                if (distance < 8) {
                    player.applyKnockback(viewDirection.x, viewDirection.z, 0.2, viewDirection.y/2 + Math.max(1 - distance/6, 0.1));
                } else if (distance > 7 && distance < 9) {
                    player.applyKnockback(viewDirection.x, viewDirection.z, 0.2, 0);
                }

                // Spawn the particle
                const { x, y, z } = player.location;
                for (let i = 1; i < Math.min(distance * 1, 10); i++) {
                    //map.setVector3("variable.plane", { x: 0.3, y: 15, z: 2 * i/3 });
                    player.dimension.spawnParticle("a:water_preloaded_4", {x: x, y: y + i - distance, z: z}, map);
                }

                player.addEffect("slow_falling", 265, { amplifier: 255, showParticles: false });

                // The end of the runtime
                if (currentTick > 200 || endRuntime) {
                    player.removeTag("usingPlume");
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 10);
    }
}

export default command