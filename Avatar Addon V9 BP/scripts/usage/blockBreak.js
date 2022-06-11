import { world, BlockLocation } from "mojang-minecraft";
import { getScore } from "./itemUse.js";

export function blockBreak(eventData) {
    // Properties from class
    let { block, player, dimension, brokenBlockPermutation } = eventData;
    // Block coordinates
    let { x, y, z } = block.location;
    //int rand_drop = rand.nextInt(5)
    if (player.hasTag("earth") && getScore("level", player) > 50 && brokenBlockPermutation.type.id === "minecraft:iron_ore" || brokenBlockPermutation.type.id === "minecraft:deepslate_iron_ore") {
        player.runCommand(`structure load raw_iron ${x} ${y} ${z}`);
    }
}