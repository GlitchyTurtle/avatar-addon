import { world, ItemStack } from "@minecraft/server";
import { getScore, groundBlocks } from "./../util.js";

export function blockBreak(eventData) {
    let { block, player, dimension, brokenBlockPermutation } = eventData;
    let { x, y, z } = block.location;

    if ((player.hasTag("earth") || player.hasTag("avatar")) && getScore("utiTier", player) >= 1 && brokenBlockPermutation.type.id === "minecraft:iron_ore" || brokenBlockPermutation.type.id === "minecraft:deepslate_iron_ore") {
    	player.runCommandAsync(`structure load raw_iron ${x} ${y} ${z}`);

        world.getDimension('overworld').spawnItem(new ItemStack("raw_iron"),{x:0,y:0,z:0})
        player.addEffect("strength", 100, { amplifier: 5, showParticles: false });
    }

    if ((player.hasTag("earth") || player.hasTag("avatar")) && getScore("utiTier", player) >= 2 && groundBlocks.includes(brokenBlockPermutation.type.id)) {
        player.addEffect("saturation", 200, { amplifier: 255, showParticles: false });
    }
}