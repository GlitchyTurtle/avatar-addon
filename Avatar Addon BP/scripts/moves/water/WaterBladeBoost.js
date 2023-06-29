import { MolangVariableMap } from "@minecraft/server";
import { getScore, setScore, delayedFunc, playSound, createShockwave } from "./../../util.js";

const map = new MolangVariableMap();

const command = {
    name: 'Water Blade Boost',
    description: 'Boost yourself away from danger and do damage. Punch use the next combo piece.',
    style: 'water',
    unlockable: 11,
    unlockable_for_avatar: 35,
    cooldown: 'fast',
    execute(player) {
		setScore(player, "cooldown", 0);

		if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
		setScore(player, "water_loaded", -1, true);

		waterBladeBoost(player, 1);
		waterBladeBoost(player, 2);
		waterBladeBoost(player, 3);
	}
}

export default command

function waterBladeBoost(player, stage) {
	setScore(player, "cooldown", 0);
	delayedFunc(player, (animation) => { 
		// Play animation first
		stage % 2 == 0 ? player.playAnimation("animation.earth.off_blast") : player.playAnimation("animation.earth.blast");

		// To be executed when the animation is done
		delayedFunc(player, (rockBlast) => {

			// Particle effects and sound
			createShockwave(player, player.location, 5, 10, 1);
			const viewDirection = player.getViewDirection();
			player.applyKnockback(viewDirection.x, viewDirection.z, 15, viewDirection.y * 2);
			player.dimension.spawnParticle("a:water_slice", player.location, map);
			playSound(player, 'firework.launch', 1, player.location, 3);
		}, 12);
	}, 12 * stage);
}