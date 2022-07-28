import { MinecraftItemTypes, Items, MinecraftEnchantmentTypes, world, Player } from "mojang-minecraft";
import { getScore } from "./../util.js";

export function hitEvent(eventData) {
    //Properties from class
    let { hitEntity, hitBlock, entity } = eventData;

    //If it's not a player who did the hit then ignore
    if (!(entity instanceof Player)) {
		return;
    }

    //If a block is hit then ignore
    if (hitBlock) {
        return;
    }    
	
	const item = entity.getComponent('inventory').container.getItem(entity.selectedSlot);
	try {
		let item_enchants = item.getComponent("enchantments").enchantments;
		if (item_enchants) {
			for (let enchants in MinecraftEnchantmentTypes) {
				// If no enchantment then move to next loop
				let enchanted = MinecraftEnchantmentTypes[enchants];
				if (!item_enchants.hasEnchantment(enchanted)) {
					continue;
				}
				// Get properties of this enchantment
				let enchant_data = item_enchants.getEnchantment(MinecraftEnchantmentTypes[enchants]);
				if (enchant_data.type.id === "baneOfArthropods" && item.id != "minecraft:enchanted_book") {
					if (entity.hasTag('air')) {
						try { hitEntity.runCommand(`effect @s levitation 1 ${enchant_data.level * 2} true`); } catch (error) {}
						try { hitEntity.runCommand(`particle minecraft:egg_destroy_emitter ~~~`); } catch (error) {}
						try { hitEntity.runCommand(`particle a:air_puff ~~~`); } catch (error) {}
					} else if (entity.hasTag('earth')) {
						try { hitEntity.runCommand(`effect @s levitation 1 ${enchant_data.level * 2} true`); } catch (error) {}
					} else if (entity.hasTag('fire')) {
						try { hitEntity.runCommand(`setblock ~~~ fire 0 keep`); } catch (error) {}
						try { hitEntity.runCommand(`effect @s slowness 1 ${enchant_data.level} true`); } catch (error) {}
						try { hitEntity.runCommand(`particle a:fire_wave ~~~`); } catch (error) {}
					}
				}
			}
		}
	} catch (error) {}
	
    //If it's not a player then ignore who got hit
    if (!(hitEntity instanceof Player)) {
		return;
    }
	
	entity.runCommand(`scoreboard players add @s combo 1`);
	hitEntity.runCommand(`scoreboard players set @s combo 0`);
    if (!entity.hasTag("avatar") && !entity.hasTag("earth") && !entity.hasTag("air") && !entity.hasTag("fire") && !entity.hasTag("water")) {
        try { entity.runCommand(`execute @s[scores={combo=1..5}] ~~~ titleraw @s actionbar {"rawtext":[{"text":"§3Hits needed to Block Chi: "},{"score":{"name": "@s","objective": "combo"}},{"text":"/6"}]}`); } catch (error) {}
        if (getScore("combo", entity) > 5) {
            try {
				if (!hitEntity.hasTag("avatar") && !hitEntity.hasTag("earth") && !hitEntity.hasTag("air") && !hitEntity.hasTag("fire") && !hitEntity.hasTag("water")) {
					entity.runCommand(`scoreboard players set @s combo 0`);
					entity.runCommand(`scoreboard players add @s sub_level 10`);
					hitEntity.runCommand(`effect @s slowness ${getScore("level", entity)} 3 true`);
					hitEntity.runCommand(`particle minecraft:egg_destroy_emitter ~~~`);
				} else {
					entity.runCommand(`scoreboard players set @s combo 0`);
					entity.runCommand(`scoreboard players add @s sub_level 10`);
					entity.runCommand(`tellraw @s {"rawtext":[{"text":"§3Blocked ${hitEntity.name}'s Chi for ${getScore("level", entity)} seconds."}]}`);
					hitEntity.runCommand(`scoreboard players set @s cooldown1 ${100 - getScore("level", entity) * 20}`);
					hitEntity.runCommand(`tag @s add chi_blocked`);
					hitEntity.runCommand(`effect @s slowness ${getScore("level", entity)} 3 true`);
					hitEntity.runCommand(`particle minecraft:egg_destroy_emitter ~~~`);
				}
            } catch (error) {
				hitEntity.runCommand(`tellraw @a[name=${entity.name}] actionbar {"rawtext":[{"text":"§cCould not block ${hitEntity.name}'s Chi because they are already blocked!"}]}`);
			}
        }
    }
}