import { system, MolangVariableMap } from '@minecraft/server'
import { setScore, getScore, delayedFunc, playSound } from "./../../util.js";

const command = {
    name: 'Supercharged Frost Breath',
    description: 'Breath ice cold air that freezes nearby opponents for a few seconds, however, they can still take damage. Are they about to mlg? You can stop that.',
    style: 'avatar',
    unlockable: 100,
    unlockable_for_avatar: 100,
    cooldown: 'slow',
    execute(player) {
		if (!player.hasTag("avatar_state")) return player.sendMessage("§cYou must be in avatar state to use this move!");

		// Set cooldown so they can't spam
		setScore(player, "cooldown", 0);

		// Check if they have water
		if (getScore("water_loaded", player) < 1) return player.sendMessage("§cYou don't have enough water to do that!")
		setScore(player, "water_loaded", -1, true);

		player.playAnimation("animation.water.blast");
		delayedFunc(player, (frostBreath) => {
			playSound(player, 'mob.turtle.swim', 0.9, player.location, 1);

			player.runCommand(`inputpermission set @a[r=10,name=!"${player.name}"] movement disabled`);
			player.runCommand(`inputpermission set @a[r=10,name=!"${player.name}"] camera disabled`);
	
			let currentTick = 0;
			const sched_ID = system.runInterval(function tick() {
				// In case of errors
				currentTick++;
				if (currentTick > 100) return system.clearRun(sched_ID);
				setScore(player, "cooldown", 0);
				player.runCommand(`execute as @e[type=!player,r=10] at @s run tp @s @s`);
				const entities = [...player.dimension.getEntities({ location: player.location, maxDistance: 40 })];
				entities.forEach(entity => {
					player.dimension.spawnParticle("a:frost_breath", entity.location, new MolangVariableMap());
				});
				if (currentTick > 50) {
					player.runCommand(`inputpermission set @a[r=10,name=!"${player.name}"] movement enabled`);
					player.runCommand(`inputpermission set @a[r=10,name=!"${player.name}"] camera enabled`);
					return system.clearRun(sched_ID);
				}
			}, 1)
		}, 10)
    }
}

export default command