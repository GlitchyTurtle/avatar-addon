import { MolangVariableMap } from "@minecraft/server";
import { getScore, setScore, playSound } from "../../util.js";

function formatBlockName(block) {
    const parts = block.split(':');
    const namespace = parts[0];
    const name = parts[1];
  
    const formattedName = name
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
  
    return formattedName;
}
  
const specialBlocks = [
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
    "minecraft:deepslate_emerald_ore"
];

const map = new MolangVariableMap();

const command = {
    name: 'Earth Search',
    description: 'Search the blocks under you for any kind of raw ore.',
    style: 'earth',
    unlockable: 3,
    unlockable_for_avatar: 44,
    cooldown: 'super_fast',
    execute(player) {
        
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");
        player.runCommand("camerashake add @s 0.4 0.1 positional");
        player.playAnimation("animation.earth.landing");
        player.dimension.spawnParticle("a:earth_shockwave_small", player.location, map);
        playSound(player, 'dig.gravel', 2, player.location, 2);
        let foundAnything = false;
        for (let i = 0; i < 1201; i++) {
            try {
                const currentBlock = player.dimension.getBlock({ x: player.location.x, y: player.location.y - i, z: player.location.z });
                if (specialBlocks.includes(currentBlock.typeId)) {
                    foundAnything = true;
                    playSound(player, 'dig.gravel', 2, player.location, 3);
                    playSound(player, 'dig.sand', 2, player.location, 3);
                    playSound(player, 'dig.glass', 2, player.location, 3);
                    player.sendMessage(`§7Found ${formatBlockName(currentBlock.typeId)} ${i} blocks below you!`)
                }
            } catch (error) {
                break;
            }
        }

        if (!foundAnything) player.sendMessage(`§7Found nothing.`)
    }
}

export default command