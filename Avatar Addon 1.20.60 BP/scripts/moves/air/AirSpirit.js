import { system } from "@minecraft/server";
import { getGamemode, setScore, playSound, calculateDistance } from '../../util.js';

const spawn = { x: -1456, y: 66, z: -138 };

const command = {
    name: 'Air Spirit',
    description: 'Become a spirit and float through blocks!',
    style: 'air',
    unlockable: 0,
    unlockable_for_avatar: 0,
    cooldown: 'slow',
    skill_required: "Air Spirit",
    execute(player) {
        setScore(player, 'cooldown', 0);
        playSound(player, 'mob.shulker.shoot', 2, player.location, 3);
		const saved = getGamemode(player);
		const entity = player.dimension.spawnEntity('a:spirit_player', player.location)
		player.runCommand("gamemode spectator @s");

		let currentTick = 0;
        const sched_ID = system.runInterval(function tick() {
			// In case of errors
			currentTick++;
			if (currentTick > 210) return system.clearRun(sched_ID);
			setScore(player, 'cooldown', 0);

			if (currentTick > 200) {
				player.removeTag("spirit");

				try {
					player.teleport(entity.location, { dimension: player.dimension });
					entity.triggerEvent("minecraft:despawn");
				} catch (error) {
					player.runCommand(`gamemode s @s`);
					player.sendMessage('§cYour spirit marker was killed.');
					player.kill();
				}
				
				player.runCommand(`gamemode ${saved} @s`);
				return system.clearRun(sched_ID);
			}
        }, 1);
    }
}

export default command