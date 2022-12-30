import { MinecraftItemTypes, Items, MinecraftEnchantmentTypes, world, Player } from "@minecraft/server";
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
				// Do stuff
				if (enchant_data.type.id === "baneOfArthropods" && item.id != "minecraft:enchanted_book") {				
					if (entity.hasTag('air')) {
						try { hitEntity.runCommandAsync(`effect @s levitation 1 1 true`); } catch (error) {}
						try { hitEntity.runCommandAsync(`particle minecraft:egg_destroy_emitter ~~~`); } catch (error) {}
						try { hitEntity.runCommandAsync(`particle a:air_puff ~~~`); } catch (error) {}
					} else if (entity.hasTag('earth')) {
						try { hitEntity.runCommandAsync(`summon evocation_fang ~~~`); } catch (error) {}
						try { hitEntity.runCommandAsync(`particle a:earth_shockwave ~~~`); } catch (error) {}
					} else if (entity.hasTag('fire')) {
						try { hitEntity.runCommandAsync(`setblock ~~~ fire 0 keep`); } catch (error) {}
						try { hitEntity.runCommandAsync(`effect @s slowness 1 ${enchant_data.level} true`); } catch (error) {}
						try { hitEntity.runCommandAsync(`particle a:fire_wave ~~~`); } catch (error) {}
					} else if (entity.hasTag('water')) {
						try { hitEntity.runCommandAsync(`effect @s slowness 1 ${enchant_data.level} true`); } catch (error) {}
						try { hitEntity.runCommandAsync(`particle a:water_wave ~~~`); } catch (error) {}
					} else if (entity.hasTag('avatar')) {
						try { hitEntity.runCommandAsync(`setblock ~~~ fire 0 keep`); } catch (error) {}
						try { hitEntity.runCommandAsync(`particle minecraft:egg_destroy_emitter ~~~`); } catch (error) {}
						try { hitEntity.runCommandAsync(`summon evocation_fang ~~~`); } catch (error) {}
						try { hitEntity.runCommandAsync(`particle a:earth_shockwave ~~~`); } catch (error) {}
					}
					
				}
			}
		}
	} catch (error) {}
	
    //If it's not a player then ignore who got hit
    if (!(hitEntity instanceof Player)) {
		return;
    }

	if (getScore("combat", entity) === 0) {
		entity.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou are in combat! Do not leave the game!"}]}`);
		hitEntity.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou are in combat! Do not leave the game!"}]}`);
	}
	entity.runCommandAsync(`scoreboard players add @s combo 1`);
	hitEntity.runCommandAsync(`scoreboard players set @s combo 0`);
	entity.runCommandAsync(`scoreboard players set @s combat 220`);
	hitEntity.runCommandAsync(`scoreboard players set @s combat 220`);
	
    if (!entity.hasTag("avatar") && !entity.hasTag("earth") && !entity.hasTag("air") && !entity.hasTag("fire") && !entity.hasTag("water")) {
        try { entity.runCommandAsync(`execute as @s[scores={combo=1..5}] run titleraw @s actionbar {"rawtext":[{"text":"§3Hits needed to Block Chi: "},{"score":{"name": "@s","objective": "combo"}},{"text":"/6"}]}`); } catch (error) {}
        if (getScore("combo", entity) > 5) {
            try {
				if (!hitEntity.hasTag("avatar") && !hitEntity.hasTag("earth") && !hitEntity.hasTag("air") && !hitEntity.hasTag("fire") && !hitEntity.hasTag("water")) {
					entity.runCommandAsync(`scoreboard players set @s combo 0`);
					entity.runCommandAsync(`scoreboard players add @s sub_level 1`);
					entity.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§3Blocked ${hitEntity.name}'s Chi for ${getScore("level", entity)} seconds. They aren't a bender, so it just slows them down."}]}`);
					hitEntity.runCommandAsync(`effect @s slowness ${getScore("level", entity)} 3 true`);
					hitEntity.runCommandAsync(`particle minecraft:egg_destroy_emitter ~~~`);
				} else {
					entity.runCommandAsync(`scoreboard players set @s combo 0`);
					entity.runCommandAsync(`scoreboard players add @s sub_level 1`);
					entity.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§3Blocked ${hitEntity.name}'s Chi for ${getScore("level", entity)} seconds."}]}`);
					hitEntity.runCommandAsync(`scoreboard players set @s cooldown1 ${100 - getScore("level", entity) * 20}`);
					hitEntity.runCommandAsync(`tag @s add chi_blocked`);
					hitEntity.runCommandAsync(`effect @s slowness ${getScore("level", entity)} 3 true`);
					hitEntity.runCommandAsync(`particle minecraft:egg_destroy_emitter ~~~`);
				}
            } catch (error) {
				hitEntity.runCommandAsync(`tellraw @a[name=${entity.name}] actionbar {"rawtext":[{"text":"§cCould not block ${hitEntity.name}'s Chi because they are already blocked!"}]}`);
			}
        }
    }
}