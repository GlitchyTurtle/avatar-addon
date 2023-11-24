import { MolangVariableMap } from "@minecraft/server";
import { setScore, delayedFunc, playSound, calculateKnockbackVector, calculateDistance } from "./../../util.js";

const command = {
    name: 'Air Pull',
    description: 'The opposite of air push, pulls all nearby entities close to you with strong winds - from up to 40 blocks away!',
    style: 'air',
    unlockable: 3,
    unlockable_for_avatar: 3,
    cooldown: 'fast',
    execute(player) {
        setScore(player, "cooldown", 0);
        player.playAnimation("animation.air.pull");
        delayedFunc(player, airPull => {
            const map = new MolangVariableMap();
            const dimension = player.dimension;
            const spawnPos = player.location;
            const entities = [...dimension.getEntities({ location: spawnPos, maxDistance: 42, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["permKbSafe", "bending_dmg_off"] })];
            const items = [...dimension.getEntities({ location: spawnPos, maxDistance: 42, type: "item" })];

            entities.forEach(entity => {
                const kbVector = calculateKnockbackVector(entity.location, spawnPos, 1);
                entity.applyKnockback(-kbVector.x, -kbVector.z, 5, kbVector.y);
                if (player.location.y > entity.location.y + 8) {
                    entity.applyKnockback(0, 0, 0, 3);
                }
            });
            items.forEach(item => {
                const itemkKbVector = calculateKnockbackVector(item.location, spawnPos, 3);
                item.applyImpulse({x: -itemkKbVector.x, y: -itemkKbVector.y, z: -itemkKbVector.z});
            });
            player.dimension.spawnParticle("a:air_pull", spawnPos, map);
            playSound(player, 'mob.blaze.shoot', 1, spawnPos, 5);
        }, 5);
    }
}

export default command