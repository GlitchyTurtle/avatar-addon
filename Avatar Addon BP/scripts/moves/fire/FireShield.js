import { system, MolangVariableMap } from '@minecraft/server'
import { getScore, setScore, delayedFunc, calculateKnockbackVector } from "./../../util.js";

const command = {
    name: 'Fire Shield',
    description: 'Block all incoming blasts with the power of fire!',
    style: 'fire',
    unlockable: 2,
    unlockable_for_avatar: 63,
    cooldown: 'fast',
    execute(player) {
		// Setup
		setScore(player, "cooldown", 0);

		player.addEffect("resistance", 25, { amplifier: 255, showParticles: false });
		player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
		player.playAnimation("animation.fire.push");

		delayedFunc(player, (waterShield) => {
			player.addTag("bendingShield");
            if (getScore("level", player) >= 100) {
                player.dimension.spawnParticle("a:fire_shield_blue", player.location, new MolangVariableMap());
            } else {
                player.dimension.spawnParticle("a:fire_shield", player.location, new MolangVariableMap());
            }
			let spawnPos = player.location;
			let currentTick = 0;

			const sched_ID = system.runInterval(function tick() {
                // In case of errors
                currentTick++;
                if (currentTick > 100) return system.clearRun(sched_ID);

				// Get entities
				const dimension = player.dimension;
				const entities = [...dimension.getEntities({ location: spawnPos, maxDistance: 6, excludeNames: [player.name], excludeFamilies: ["inanimate"], excludeTypes: ["item"], excludeTags: ["bending_dmg_off"] })];
				const items = [...dimension.getEntities({ location: spawnPos, maxDistance: 6, type: "item" })];
			
				// Loop through all nearby entities (not items though)
				entities.forEach(entity => {
					const kbVector = calculateKnockbackVector(entity.location, spawnPos, 1);
					try {
                        entity.clearVelocity()
                    } catch (error) {
                        entity.runCommand("tp @s @s");
                    }
					try {
						entity.applyKnockback(kbVector.x, kbVector.z, 1, 0);
					} catch (error) {
						entity.applyImpulse(calculateKnockbackVector(entity.location, spawnPos, 0.1));
					}
				});
				items.forEach(item => { item.applyImpulse(calculateKnockbackVector(item.location, spawnPos, 0.3)); });

				// The end of the runtime
				if (currentTick > 35) {
					player.removeTag("bendingShield");
					return system.clearRun(sched_ID);
				}
			}, 1);
		}, 10);
    }
}

export default command