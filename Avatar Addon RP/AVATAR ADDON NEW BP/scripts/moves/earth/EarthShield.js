import { system, MolangVariableMap } from '@minecraft/server'
import { getScore, setScore, delayedFunc, calculateKnockbackVector } from "./../../util.js";

const command = {
    name: 'Earth Shield',
    description: 'Protect yourself from damage!',
    style: 'earth',
    unlockable: 4,
    unlockable_for_avatar: 45,
    execute(player) {
		// Setup
		setScore(player, "cooldown", 0);
		if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

		player.addEffect("resistance", 45, { amplifier: 255, showParticles: false });
		player.runCommandAsync("camerashake add @s 0.4 0.1 positional");
		player.playAnimation("animation.earth.push");

		delayedFunc(player, (waterShield) => {
			player.runCommand("structure load earth_shield ~-2~-1~-2");
		}, 10);
    }
}

export default command