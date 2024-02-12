import { Player, MolangVariableMap } from "@minecraft/server";
import { setScore, getScore, calcVectorOffset, getBendingStyle, getGamemode, enterCombatMode, setCooldown } from "../util.js";
import { playerHasSkill } from "../scroll/skillTreeMenu.js";

const map = new MolangVariableMap();

export function entityHitEntityEvent(eventData) {
    // Properties from class
    let { hitEntity, damagingEntity } = eventData;
	
	if (getGamemode(hitEntity) == "creative") return;

	// If it's not a player who was hit then ignore
	if (!(hitEntity instanceof Player)) {
		return;
	}

	// Waterbender squid shield passive
	if (playerHasSkill(hitEntity, "Squid Shield") && getScore("detect_water", hitEntity) >= 1) {
		hitEntity.dimension.spawnParticle('a:squid_ink', hitEntity.location, map);
		hitEntity.addEffect("invisibility", 20, { amplifier: 1, showParticles: false });
	}

    // If it's not a player who did the hit then ignore
    if (!(damagingEntity instanceof Player)) {
		return;
    }

	// Airbender weapon disarm
	if (damagingEntity.hasTag("air") && playerHasSkill(hitEntity, "Disarming Presence") && Math.random() < 0.15) {
		const inventory = hitEntity.getComponent("minecraft:inventory").container
		const item = inventory.getItem(hitEntity.selectedSlot);
		
		if (!inventory || !item || item.typeId == "a:bending_scroll" || item.typeId == "a:skill_point") return;
	
		hitEntity.getComponent('inventory').container.setItem(hitEntity.selectedSlot, undefined);
		hitEntity.dimension.spawnItem(item, calcVectorOffset(hitEntity, 0, 0, 2.5)).applyImpulse(hitEntity.getViewDirection());
	}

	// Combat log prevention!
	enterCombatMode(damagingEntity, hitEntity)

	// Chi blocking system
	const damagingEntityLevel = getScore("level", damagingEntity);
	const amplifier = damagingEntityLevel > 10 ? damagingEntityLevel * 40 : 400;
    if (getBendingStyle(damagingEntity) === "Non-bender") {
		damagingEntity.onScreenDisplay.setActionBar(`Combo Chi Block: ${getScore("combo", damagingEntity)}/12`);
		
		// If the nonbender has a combo of 6, disable the bender for 2 times the level of the nonbender seconds
		if (getScore("combo", damagingEntity) > 11) {
			setScore(damagingEntity, "combo", 0);
			setScore(damagingEntity, "sub_level", 5, true);

			hitEntity.addEffect("slowness", amplifier, { amplifier: 6, showParticles: false });
			hitEntity.addEffect("weakness", amplifier, { amplifier: 10, showParticles: false });

			if (getBendingStyle(hitEntity) === "Non-bender") {
				damagingEntity.sendMessage(`§7Blocked ${hitEntity.name}'s Chi for ${damagingEntityLevel * 2} seconds. They aren't a bender, so it just slows them down.`);
				hitEntity.dimension.spawnParticle('minecraft:egg_destroy_emitter', hitEntity.location, map);
			} else {
				damagingEntity.sendMessage(`§7Blocked ${hitEntity.name}'s Chi for ${damagingEntityLevel * 2} seconds.`);
				setCooldown(hitEntity, 100 - damagingEntityLevel * 20);
				hitEntity.addTag("chi_blocked")
				hitEntity.dimension.spawnParticle('minecraft:egg_destroy_emitter', hitEntity.location, map);
			}
        }
    }
}