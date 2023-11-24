import { MolangVariableMap, Player } from "@minecraft/server";
import { getScore, setScore, delayedFunc, calcVectorOffset, playSound, applyBasicDamage } from "./../../util.js";

const curveOffset = [
	0.2,
	0.4,
	0.6,
	0.8,
	0.9,
	1.0,
	1.0,
	1.0,
	1.0,
	1.0,
	0.9,
	0.8,
	0.6,
	0.4,
	0.2,
	0.2
];

function airBlast(player, stage, dmg_factor) {
	setScore(player, "cooldown", 0);
	delayedFunc(player, (animation) => { 
		// Play animation first
		stage % 2 == 0 ? player.playAnimation("animation.air.off_blast") : player.playAnimation("animation.air.blast");

		// To be executed when the animation is done
		delayedFunc(player, (airBlast) => {
			const map = new MolangVariableMap();
			for (var i = 1; i < 15; i++) {
				// Create the needed variables for kb and pos
				const playerViewDir = player.getViewDirection()

				var xOffset = 0;
				if (stage == 1) xOffset = -curveOffset[i];
				if (stage == 2) xOffset = curveOffset[i];

				const currentPos = calcVectorOffset(player, xOffset, 1, i/2);
				const currentBlock = player.dimension.getBlock(currentPos);
				
				// Apply knockback (and a little bit of damage) to the entities
				const entities = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.2, excludeNames: [player.name], excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] })];
				let items = [...player.dimension.getEntities({ location: currentPos, maxDistance: 1.2, type: "item" })];
				entities.forEach(entity => applyBasicDamage(player, entity, "super_light", 1));
				items.forEach(item => { item.applyImpulse(playerViewDir) });

				// Check if we hit a solid block
				if (currentBlock.isSolid) break;

				// Spawn the particle
				player.dimension.spawnParticle("a:air_blast", currentPos, map);
			}

			// Apply full damage and knockback for good aim
			const playerViewDir = player.getViewDirection()
			const entities = player.getEntitiesFromViewDirection({ maxDistance: 10, excludeTypes: ["item"], excludeFamilies: ["inanimate"], excludeTags: ["bending_dmg_off"] });
			entities.forEach(eventEntity => applyBasicDamage(player, eventEntity.entity, "normal", 1));

			// Particle effects and sound
			player.dimension.spawnParticle("a:air_blast_pop", calcVectorOffset(player, xOffset, 1, i/2 - 0.5), map);
			playSound(player, 'firework.blast', 1, calcVectorOffset(player, xOffset, 1, i/2 - 0.5), 3);
		}, 12);
	}, 12 * stage);
}

const command = {
    name: 'Triple Air Blast',
    description: 'Send curving blasts that do major damage. Punch use the next combo piece.',
    style: 'air',
    unlockable: 14,
    unlockable_for_avatar: 14,
    cooldown: 'fast',
	damage_factor: 2,
    execute(player) {
		airBlast(player, 1, this.damage_factor);
		airBlast(player, 2, this.damage_factor);
		airBlast(player, 3, this.damage_factor);
	}
}

export default command