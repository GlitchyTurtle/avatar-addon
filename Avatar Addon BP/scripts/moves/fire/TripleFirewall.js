import { MolangVariableMap } from "@minecraft/server";
import { getScore, setScore, delayedFunc, playSound, createShockwave } from "./../../util.js";

function fireWall(player, stage, dmg_factor) {
	setScore(player, "cooldown", 0);
	delayedFunc(player, (animation) => { 
		// Play animation first
		const fireType = getScore("level", player) >= 100 ? "_blue" : "";
		stage % 2 == 0 ? player.playAnimation("animation.fire.off_blast") : player.playAnimation("animation.fire.blast");

		// To be executed when the animation is done
		delayedFunc(player, (fireWall) => {
			const map = new MolangVariableMap();
	
			playSound(player, 'random.explode', 1, player.location, 5);
            createShockwave(player, player.location, 10, 10, dmg_factor);

			player.dimension.spawnParticle(`a:fire_wave${fireType}`, player.location, map);
			player.dimension.spawnParticle(`a:fire_wall${fireType}`, player.location, map);
			playSound(player, 'fire.ignite', 1, player.location, 3);
		}, 12);
	}, 12 * stage);
}

const command = {
    name: 'Triple Firewall',
    description: 'Shoot up a wall of flames that does major damage. Punch use the next combo piece.',
    style: 'fire',
    unlockable: 10,
    unlockable_for_avatar: 75,
	damage_factor: 3,
    execute(player) {
		fireWall(player, 1, this.damage_factor);
		fireWall(player, 2, this.damage_factor);
		fireWall(player, 3, this.damage_factor);
	}
}

export default command