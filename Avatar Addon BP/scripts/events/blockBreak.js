import { getScore } from "./../util.js";

export function blockBreak(eventData) {
    // Properties from class
    let { block, player, dimension, brokenBlockPermutation } = eventData;
    // Block coordinates
    let { x, y, z } = block.location;

    if (player.hasTag("sub_metal") && getScore("level", player) > 25 && brokenBlockPermutation.type.id === "minecraft:iron_ore" || brokenBlockPermutation.type.id === "minecraft:deepslate_iron_ore") {
    	  player.runCommandAsync(`structure load raw_iron ${x} ${y} ${z}`);
		    player.runCommandAsync(`effect @s strength 10 1 true`);
    }
}