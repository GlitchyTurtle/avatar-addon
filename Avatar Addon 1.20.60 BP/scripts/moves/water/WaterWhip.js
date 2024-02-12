import { system } from '@minecraft/server'
import { getScore, setScore, delayedFunc, playSound, traceLine, calculateDistance, calculateKnockbackVector } from "./../../util.js";

const command = {
    name: 'Water Whip',
    description: 'Shoot yourself over 5 blocks to the left side to dodge other moves.',
    style: 'water',
    unlockable: 1,
    unlockable_for_avatar: 22,
    cooldown: 'super_fast',
    execute(player) {
        
        

        // Check if they have water
		if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
		setScore(player, "water_loaded", -1, true);

        player.playAnimation("animation.water.whip");
        player.addTag("hiddenWater");

        // To be executed when the animation is done
        delayedFunc(player, (waterWhip) => {
            let currentTick = 0;
            const entities = player.getEntitiesFromViewDirection({ maxDistance: 20 });
            //console.warn(JSON.stringify(entities))

            if (!entities[0]) {
                player.sendMessage("§cYou must be 10 or less blocks away and your aim must be precise.");
                return player.removeTag("hiddenWater");
            }
            const targetEntity = entities[0].entity;
            //console.warn(JSON.stringify(targetEntity))

            if (!targetEntity) return player.sendMessage("§cYou must be 10 or less blocks away and your aim must be precise.");
            if (targetEntity.hasTag("bending_dmg_off")) return player.removeTag("hiddenWater");

            const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);
                
                const pointA = player.getHeadLocation();
                const pointB = targetEntity.location;
                const distance = calculateDistance(pointA, pointB);

                traceLine(pointA, pointB, 20, "a:water_preloaded_2");
                playSound(player, 'mob.turtle.swim', 0.9, player.location, 1);

                if (distance < 2) {
                    player.removeTag("hiddenWater");
                    return system.clearRun(sched_ID);
                }

                try {
                    const kbVector = calculateKnockbackVector(targetEntity.location, pointA, 0.5);
                    targetEntity.applyKnockback(-kbVector.x, -kbVector.z, 3, 0.5);
                } catch (error) {
                    const itemkKbVector = calculateKnockbackVector(targetEntity.location, pointA, 3);
                    targetEntity.applyImpulse({x: -itemkKbVector.x, y: -itemkKbVector.y, z: -itemkKbVector.z});
                }

                // The end of the runtime
                if (currentTick > 10) {
                    player.removeTag("hiddenWater");
                    return system.clearRun(sched_ID);
                }
            }, 1);
        }, 10);
    }
}

export default command