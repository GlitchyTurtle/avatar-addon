import { Player, MolangVariableMap, MinecraftBlockTypes } from "@minecraft/server";
import { setScore, getScore, calcVectorOffset, getBendingStyle, getGamemode } from "./../util.js";

const map = new MolangVariableMap();

export function hitEvent(eventData) {
    // Properties from class
    let { hitEntity, hitBlock, entity } = eventData;

	// If a block is hit then ignore
	if (hitBlock) {
		if (entity.hasTag("water") && hitBlock.typeId === "minecraft:grass" && getScore("water_loaded", entity) < 8 && getScore("utiTier", entity) > 4) {
			entity.sendMessage("§7Consumed moisture from this block.")
			hitBlock.setType(MinecraftBlockTypes.dirt);
			setScore(entity, "water_loaded", 1, true);
		}

		if (entity.hasTag("earh") && hitBlock.typeId === "minecraft:grass") {
			const { x, y, z } = hitBlock.location;
			entity.runCommand(`clone ${x} ${y-4} ${z} ${x} ${y-1} ${z} ${x} ${y} ${z}`);
			entity.runCommand(`fill ${x} ${y-4} ${z} ${x} ${y-1} ${z} air`);
		}
		return;
	}

	if (getGamemode(hitEntity) == "creative") return;

    // If it's not a player who did the hit then ignore
    if (!(entity instanceof Player)) {
		return;
    }

    // If it's not a player who was hit then ignore
    if (!(hitEntity instanceof Player)) {
		return;
    }

	// Waterbender squid shield passive
	if (hitEntity.hasTag("water") && getScore("defTier", hitEntity) >= 2 && getScore("detect_water", hitEntity) > 1) {
		hitEntity.dimension.spawnParticle('a:squid_ink', hitEntity.location, map);
		hitEntity.addEffect("invisibility", 20, { amplifier: 1, showParticles: false });
	}

	// Airbender weapon disarm
	if (entity.hasTag("air") && getScore("utiTier", entity) >= 10 && Math.random() < 0.15) {
		const inventory = hitEntity.getComponent("minecraft:inventory").container
		const item = inventory.getItem(hitEntity.selectedSlot);
		if (!inventory || !item) return;
	
		hitEntity.dimension.spawnItem(item, calcVectorOffset(hitEntity, 0, 0, 2.5)).setVelocity(hitEntity.getViewDirection());
		hitEntity.getComponent('inventory').container.setItem(hitEntity.selectedSlot, null);
	}

	// Combat log prevention!
	if (getScore("combat", entity) === 0) {
		entity.sendMessage("§cYou are in combat! Do not leave the game!");
		hitEntity.sendMessage("§cYou are in combat! Do not leave the game!");
	}
	setScore(entity, "combo", 1, true);
	setScore(hitEntity, "combo", 0);
	setScore(entity, "combat", 220);
	setScore(hitEntity, "combat", 220);

	// Chi blocking system
	const amplifier = getScore("level", entity) * 40;
    if (getBendingStyle(entity) === "Non-bender") {
		//entity.onScreenDisplay.setActionBar(`Combo Chi Block: ${getScore("combo", entity)}/12`); - until bugs on apex are resolved
		player.runCommand(`title @s actionbar Combo Chi Block: ${getScore("combo", entity)}/12`);

		// If the nonbender has a combo of 6, disable the bender for 2 times the level of the nonbender seconds
		if (getScore("combo", entity) > 11) {
			setScore(entity, "combo", 0);
			setScore(entity, "sub_level", 1, true);

			hitEntity.addEffect("slowness", amplifier, { amplifier: 6, showParticles: false });
			hitEntity.addEffect("weakness", amplifier, { amplifier: 10, showParticles: false });
			
			if (getBendingStyle(hitEntity) === "Non-bender") {
				entity.sendMessage(`§7Blocked ${hitEntity.name}'s Chi for ${getScore("level", entity) * 2} seconds. They aren't a bender, so it just slows them down.`);
				hitEntity.dimension.spawnParticle('minecraft:egg_destroy_emitter', hitEntity.location, map);
			} else {
				entity.sendMessage(`§7Blocked ${hitEntity.name}'s Chi for ${getScore("level", entity) * 2} seconds.`);
				setScore(hitEntity, "cooldown", 100 - getScore("level", entity) * 20);
				hitEntity.addTag("chi_blocked")
				hitEntity.dimension.spawnParticle('minecraft:egg_destroy_emitter', hitEntity.location, map);
			}
        }
    }
}