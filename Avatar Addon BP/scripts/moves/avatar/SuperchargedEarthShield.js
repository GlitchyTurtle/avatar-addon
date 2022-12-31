import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Supercharged Earth Shield',
    description: 'Protect yourself from damage!',
    style: 'avatar',
    unlockable: 100,
    unlockable_for_avatar: 100,
    cooldown: 'slow',
    execute(player) {
		if (!player.hasTag("avatar_state")) return player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou must be in avatar state to use this move!"}]}`);
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("camerashake add @s 0.4 19.1 positional");
			player.runCommandAsync("particle a:supercharged_earth_shield ~~~");
			player.runCommandAsync("playsound dig.grass @a[r=10]");
			let {x, y, z} = player.location;
			let earthShieldTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
				try { player.runCommandAsync(`execute as @e[x=${x},y=${y},z=${z},name=!"${player.name}",r=10] at @s run tp @s ^^^-1 facing ${x} ${y} ${z}`); } catch (error) {}
				if (event.currentTick - startTick > 350) {
					world.events.tick.unsubscribe(earthShieldTick);
					startTick = undefined;
				}
			})
		}
    }
}

export default command