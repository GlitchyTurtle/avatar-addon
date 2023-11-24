import { setScore, getScore, calcVectorOffset, delayedFunc, playSound, applyBasicDamage, groundBlocks } from "./../../util.js";

const illegalGroundBlocks = [
    "minecraft:coal_ore",
    "minecraft:copper_ore",
    "minecraft:iron_ore",
    "minecraft:gold_ore",
    "minecraft:redstone_ore",
    "minecraft:diamond_ore",
    "minecraft:lapis_ore",
    "minecraft:emerald_ore",
    "minecraft:ancient_debris",
    "minecraft:nether_gold_ore",
    "minecraft:deepslate_coal_ore",
    "minecraft:deepslate_copper_ore",
    "minecraft:deepslate_iron_ore",
    "minecraft:deepslate_gold_ore",
    "minecraft:deepslate_redstone_ore",
    "minecraft:deepslate_diamond_ore",
    "minecraft:deepslate_lapis_ore",
    "minecraft:deepslate_emerald_ore",
	"minecraft:bedrock"
];

const command = {
    name: 'Earth Big Spike',
    description: 'Summons a big spike five blocks out from the player, which launchs the nearby players and does damage.',
    style: 'earth',
    unlockable: 9,
    unlockable_for_avatar: 50,
    cooldown: 'slow',
    execute(player, decay) {
        setScore(player, "cooldown", 0);
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

        var currentPos = calcVectorOffset(player, 0, 0, 5);
        var currentBlock = player.dimension.getBlock(currentPos);
        var typeOfBlock;
        var canSpawn = false;

        while (currentBlock.isSolid) {
            canSpawn = true;
            currentPos = { x: currentPos.x, y: currentPos.y + 1, z: currentPos.z }
            typeOfBlock = currentBlock.type;
            currentBlock = player.dimension.getBlock(currentPos);
        }
        currentPos = { x: currentPos.x, y: currentPos.y - 1, z: currentPos.z }
        if (!canSpawn) return player.sendMessage("§cAim at the ground for this to work!");
        if (illegalGroundBlocks.includes(typeOfBlock.id)) typeOfBlock = "minecraft:dirt";
        if (!groundBlocks.includes(typeOfBlock.id)) return player.sendMessage("§cThat's not a block you can bend!");

        player.playAnimation("animation.earth.spikes");
        player.runCommand("inputpermission set @s movement disabled");

        const { x, y, z } = currentPos;
        const dimension = player.dimension;
        const earthSpikeCoords = [
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
            { x: x, y: y + 4, z: z},
            { x: x, y: y + 5, z: z},
        ];

        delayedFunc(player, (removeDirtBlock) => {
            const entities = [...dimension.getEntities({ location: currentPos, maxDistance: 4, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
            entities.forEach(entity => {
                applyBasicDamage(player, entity, "super_heavy", 2);
                entity.applyKnockback(0, 0, 0, 2.5/decay);
            });
        }, 15);
        delayedFunc(player, (removeDirtBlock) => {
            setScore(player, "cooldown", 0);
            playSound(player, 'dig.grass', 1, player.location, 2);
            for (let i = 0; i < earthSpikeCoords.length; i++) {
                const block = dimension.getBlock(earthSpikeCoords[i])
                if (block.isSolid) continue;

                block.setType(typeOfBlock);
                delayedFunc(player, (removeDirtBlock) => {
                    block.setType("minecraft:air")
                }, 50 + 20 - i);
            }
        }, 20);
        delayedFunc(player, (removeDirtBlock) => {
            player.runCommand("inputpermission set @s movement enabled");
        }, 35);
    }
}

export default command