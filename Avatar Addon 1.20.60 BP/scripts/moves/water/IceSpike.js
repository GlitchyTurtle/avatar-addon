import { getScore, setScore, playSound, delayedFunc } from "../../util.js";

const command = {
    name: 'Ice Spike',
    description: 'Blast mobs up into the air on a spike of ice!',
    style: 'water',
    unlockable: 9,
    unlockable_for_avatar: 30,
    cooldown: 'fast',
    execute(player) {
        
        

        // Check if they have water
        if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
        setScore(player, "water_loaded", -1, true);

        // Start
        player.addTag("hiddenWater");
        player.playAnimation("animation.water.push");
        player.runCommandAsync("camerashake add @a[r=10] 0.4 0.1 positional");
        playSound(player, 'mob.turtle.swim', 1, player.location, 2);

        const dimension = player.dimension;

        // Cage creation
        delayedFunc(player, (iceCage) => {
            const entities = [...dimension.getEntities({ location: player.location, maxDistance: 10, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];

            entities.forEach(entity => {
                const { x, y, z } = entity.location
                const spikeCoords = [
                    { x: x, y: y, z: z},
                    { x: x, y: y + 1, z: z},
                    { x: x, y: y + 2, z: z},
                    { x: x, y: y + 3, z: z},
                    { x: x, y: y + 4, z: z},
                    { x: x - 1, y: y, z: z},
                    { x: x + 1, y: y, z: z},
                    { x: x - 1, y: y + 1, z: z},
                    { x: x + 1, y: y + 1, z: z},
                    { x: x - 1, y: y + 2, z: z},
                    { x: x + 1, y: y + 2, z: z},
                    { x: x, y: y, z: z - 1},
                    { x: x, y: y, z: z + 1},
                    { x: x, y: y + 1, z: z - 1},
                    { x: x, y: y + 1, z: z + 1},
                    { x: x, y: y + 2, z: z - 1},
                    { x: x, y: y + 2, z: z + 1},
                    { x: x - 1, y: y, z: z - 1},
                    { x: x - 1, y: y, z: z + 1},
                    { x: x + 1, y: y, z: z - 1},
                    { x: x + 1, y: y, z: z + 1},
                    { x: x - 1, y: y + 1, z: z - 1},
                    { x: x - 1, y: y + 1, z: z + 1},
                    { x: x + 1, y: y + 1, z: z - 1},
                    { x: x + 1, y: y + 1, z: z + 1},
                    { x: x - 1, y: y + 2, z: z - 1},
                    { x: x - 1, y: y + 2, z: z + 1},
                    { x: x + 1, y: y + 2, z: z - 1},
                    { x: x + 1, y: y + 2, z: z + 1},
                    { x: x + 2, y: y, z: z},
                    { x: x - 2, y: y, z: z},
                    { x: x + 2, y: y + 1, z: z},
                    { x: x - 2, y: y + 1, z: z},
                    { x: x, y: y, z: z + 2},
                    { x: x, y: y, z: z - 2},
                    { x: x, y: y + 1, z: z + 2},
                    { x: x, y: y + 1, z: z - 2},
                    { x: x + 1, y: y + 3, z: z},
                    { x: x - 1, y: y + 3, z: z},
                    { x: x, y: y + 3, z: z - 1},
                    { x: x, y: y + 3, z: z + 1},
                ];
                
                for (let i = 0; i < spikeCoords.length; i++) {
                    const block = dimension.getBlock(spikeCoords[i])
                    if (block.isSolid) continue;

                    block.setType("minecraft:frosted_ice");
                    delayedFunc(entity, (removeIceBlock) => {
                        dimension.getBlock(spikeCoords[i]).setType("minecraft:air")
                    }, Math.random() * 20 + 30);
                }

                entity.teleport({ x: x, y: y + 6, z: z}, { dimension: dimension, keepVelociy: true });
                entity.applyKnockback(0, 0, 0, 2);
            });

            player.removeTag("hiddenWater");
        }, 5);
    }
}

export default command