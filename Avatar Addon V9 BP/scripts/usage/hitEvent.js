import { world, Player } from "mojang-minecraft";
import { getScore } from "./itemUse.js";

export function hitEvent(eventData) {
    // Properties from class
    let { hitEntity, hitBlock, entity } = eventData;

    // If it's not a player then ignore
    if (!(entity instanceof Player) || !(hitEntity instanceof Player)) {
        return;
    }

    // If a block is hit then ignore
    if (hitBlock) {
        return;
    }    
    
    if (!entity.hasTag("avatar") && !entity.hasTag("earth") && !entity.hasTag("air") && !entity.hasTag("fire") && !entity.hasTag("water")) {
        entity.runCommand(`scoreboard players add ${entity.name} combo 1`)
        try {
        entity.runCommand(`execute @a[name=${entity.name},tag=human,scores={combo=1..5}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Hits needed to Block Chi: "},{"score":{"name": "@s","objective": "combo"}},{"text":"/6"}]}`);
        } catch (error) {}
        if (getScore("combo", entity) > 5) {
            try {
	    entity.runCommand(`scoreboard players set @s combo 0`);
	    entity.runCommand(`scoreboard players add @s sub_level 4`);
	    hitEntity.runCommand(`scoreboard players set @s cooldown1 ${100 - getScore("level", entity) * 20}`);
	    hitEntity.runCommand(`tag @s[tag=!human,tag=!avatar_state] add antimagic`);
	    hitEntity.runCommand(`tag @s[tag=!human,tag=!avatar_state] add chi_blocked`);
	    hitEntity.runCommand(`particle minecraft:egg_destroy_emitter ~~~`);
	    hitEntity.runCommand(`titleraw @a[name=${entity.name}] actionbar {"rawtext":[{"text":"§3Blocked ${hitEntity.name}'s Chi for ${getScore("level", entity)} seconds."}]}`);
            } catch (error) {}
        }
    }
}