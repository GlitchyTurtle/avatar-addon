import { system, MolangVariableMap } from '@minecraft/server'
import { getScore, setScore, delayedFunc, calculateKnockbackVector } from "../../util.js";

const command = {
    name: 'Fire Dodge',
    description: 'Dodge all incoming blasts with the power of fire!',
    style: 'fire',
    unlockable: 2,
    unlockable_for_avatar: 63,
    cooldown: 'fast',
    execute(player) {
		// Setup
		
		player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
		player.playAnimation("animation.fire.push");

        player.addTag("bendingShield");
        player.addTag("dodge");
        if (getScore("level", player) >= 100) {
            player.dimension.spawnParticle("a:fire_shield_blue", player.location, new MolangVariableMap());
        } else {
            player.dimension.spawnParticle("a:fire_shield", player.location, new MolangVariableMap());
        }

        const viewDirection = player.getViewDirection();
        player.applyKnockback(-viewDirection.x, -viewDirection.z, 5, viewDirection.y);


		delayedFunc(player, (waterShield) => {
			player.removeTag("bendingShield");
            player.removeTag("dodge");
		}, 10);
    }
}

export default command