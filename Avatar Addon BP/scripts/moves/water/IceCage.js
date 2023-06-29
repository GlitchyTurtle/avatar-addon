import { MinecraftBlockTypes } from "@minecraft/server";
import { getScore, setScore, playSound, delayedFunc } from "./../../util.js";

const command = {
    name: 'Ice Cage',
    description: 'Lock away all entities in a radius of 5 blocks in a cage of ice.',
    style: 'water',
    unlockable: 8,
    unlockable_for_avatar: 29,
    cooldown: 'slow',
    execute(player) {
        // Set cooldown so they can't spam
        setScore(player, "cooldown", 0);

        // Check if they have water
        if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
        setScore(player, "water_loaded", -1, true);

        // Start
        player.addTag("hiddenWater");
        player.playAnimation("animation.water.push");
        player.runCommandAsync("camerashake add @a[r=10] 0.4 0.1 positional");
        playSound(player, 'beacon.power', 1, player.location, 2);

        const dimension = player.dimension;

        // Cage creation
        delayedFunc(player, (iceCage) => {
            const entities = [...dimension.getEntities({ location: player.location, maxDistance: 10, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
            
            entities.forEach(entity => {
                let { x, y, z } = entity.location
                let cageCoords = [
                    { x: x, y: y+2, z: z},
                    { x: x + 1, y: y, z: z},
                    { x: x - 1, y: y, z: z},
                    { x: x, y: y, z: z + 1},
                    { x: x, y: y, z: z - 1},
                    { x: x + 1, y: y + 1, z: z},
                    { x: x - 1, y: y + 1, z: z},
                    { x: x, y: y + 1, z: z + 1},
                    { x: x, y: y + 1, z: z - 1}
                ];
        
                for (let i = 0; i < cageCoords.length; i++) {
                    const block = dimension.getBlock(cageCoords[i])
                    if (block.isSolid()) continue;

                    block.setType(MinecraftBlockTypes.frostedIce);
                    delayedFunc(entity, (removeIceBlock) => {
                        dimension.getBlock(cageCoords[i]).setType(MinecraftBlockTypes.air)
                    }, Math.random() * 10 + 40);
                }
            });

            player.removeTag("hiddenWater");
        }, 5);
    }
}

export default command