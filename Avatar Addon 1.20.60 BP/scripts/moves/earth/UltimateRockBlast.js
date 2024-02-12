import { MolangVariableMap } from "@minecraft/server";
import { getScore, setScore, delayedFunc, playSound } from "./../../util.js";

const map = new MolangVariableMap();

const command = {
	name: 'Ultimate Rock Blast',
	description: 'Send curving blasts that do major damage. Punch use the next combo piece.',
	style: 'earth',
	unlockable: 11,
	unlockable_for_avatar: 55,
	cooldown: 'slow',
	execute(player) {
		
        if (!getScore("ground", player)) return player.sendMessage("§cYou must be grounded to use this move.");

		rockBlast(player, 1);
		rockBlast(player, 2);
		rockBlast(player, 3);
	}
}

function rockBlast(player, stage) {
	
	delayedFunc(player, (animation) => { 
		// Play animation first
		stage % 2 == 0 ? player.playAnimation("animation.earth.off_blast") : player.playAnimation("animation.earth.blast");

		// To be executed when the animation is done
		delayedFunc(player, (rockBlast) => {
			player.runCommand("summon a:dirt_block_small ^^2^1.5");

			// Particle effects and sound
			player.dimension.spawnParticle("a:earth_shockwave_small", player.location, map);
			playSound(player, 'dig.grass', 1, player.location, 3);

			if (stage == 3) player.runCommand("tag @e[r=10,type=a:dirt_block_small] add move");
		}, 12);
		
	}, 12 * stage);
}

export default command