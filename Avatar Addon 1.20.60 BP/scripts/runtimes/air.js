import { system, MolangVariableMap } from "@minecraft/server";
import { getScore, delayedFunc, applyBasicDamage, calculateDistance, normalizeVector } from "./../util.js";
import { playerHasSkill } from "./../scroll/skillTreeMenu.js";

const map = new MolangVariableMap();


system.afterEvents.scriptEventReceive.subscribe((event) => {
    const { id, message, sourceEntity, sourceType } = event;

	if (id == "a:double_jump") {
		if (sourceEntity.hasTag("chi_blocked")) return;
		sourceEntity.dimension.spawnParticle("a:double_jump", sourceEntity.location, map);
		sourceEntity.applyKnockback(0, 0, 0, 0.8);
		sourceEntity.addTag("dash")
		delayedFunc(sourceEntity, (iceCage) => {
			sourceEntity.addEffect("slow_falling", 15, { amplifier: 0, showParticles: false });
		}, 15)
	}
	if (id == "a:dash") {
		if (sourceEntity.hasTag("chi_blocked")) return;
		if (!sourceEntity.hasTag("dash")) return;
		sourceEntity.removeTag("dash")
		sourceEntity.dimension.spawnParticle("a:air_leap", sourceEntity.location, map);
		const viewDirection = sourceEntity.getViewDirection();
		sourceEntity.applyKnockback(viewDirection.x, viewDirection.z, 8, 0);

        delayedFunc(sourceEntity, (iceCage) => {
			sourceEntity.addEffect("slow_falling", 15, { amplifier: 0, showParticles: false });
			sourceEntity.applyKnockback(-viewDirection.x, -viewDirection.z, 3, 0);
			sourceEntity.dimension.spawnParticle("a:air_leap", sourceEntity.location, map);
        }, 2);
	}
});

export function airRuntime(player) {
	if (player.hasTag('sub_projectile')) {
		const closestEntities = [...player.dimension.getEntities({ location: player.location, maxDistance: 100, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"], excludeTypes: ["arrow"] })];
		const target = closestEntities[0];

		if (!target) return;
		const nearbyArrows = [...player.dimension.getEntities({ location: player.location, maxDistance: 3, type: "arrow" })];
		nearbyArrows.forEach(arrow => arrow.addTag("pl"));

		const nearbyEntities = [...player.dimension.getEntities({ location: player.location, maxDistance: 100, type: "arrow", tags: ["pl"] })];

		const targetLoc = target.getHeadLocation();

		nearbyEntities.forEach(entity => {
			const velocity = entity.getVelocity();
			if (velocity.x == 0 && velocity.y == 0 && velocity.z == 0) return;
			entity.clearVelocity();
			const arrowPath = normalizeVector({ x: targetLoc.x - entity.location.x, y: targetLoc.y - entity.location.y, z: targetLoc.z - entity.location.z }, 1);
			entity.applyImpulse(arrowPath);
			player.dimension.spawnParticle("a:air_blast", entity.location, map);
			if (calculateDistance(targetLoc, entity.location) < 1) {
				target.applyDamage(3,  { cause: "entityAttack", damagingEntity: player })
				entity.kill();
			}
		});
	}

	if (getScore("sneak_time", player) > 120 && playerHasSkill(player, "Stealthly Presence")) {
		player.addEffect("invisibility", 10, { amplifier: 1, showParticles: false });
		player.dimension.spawnParticle("a:air_sneak", player.location, map);
	}
}