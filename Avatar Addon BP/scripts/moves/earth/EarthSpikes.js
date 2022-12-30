import { world } from '@minecraft/server'
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Spikes',
    description: 'Summons spikes in a line out from the player, which can be steered by moving.',
    style: 'earth',
    unlockable: 8,
    unlockable_for_avatar: 49,
    cooldown: 'fast',
    async execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommandAsync("playsound dig.grass @a[r=10]");
			player.runCommandAsync("summon a:move_help ^ ^2 ^2");
	        player.runCommandAsync("tag @e[c=1,r=14,type=a:move_help] add spikesummoner");
			let earthSpikesTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
		        try {
					player.runCommandAsync(`execute as @e[type=a:move_help,tag=spikesummoner,c=1] at @s run tp @s ^^^-1 facing @p[name=${player.name}]`);
					player.runCommandAsync(`execute as @e[type=a:move_help,tag=spikesummoner,c=1] at @s run tp @s ~~-1~ true`);
				} catch (error) {}
				player.runCommandAsync(`execute as @e[type=a:move_help,tag=spikesummoner,c=1] at @s run summon evocation_fang ~~~`);
				if (event.currentTick - startTick > 20) {
					world.events.tick.unsubscribe(earthSpikesTick);
					player.runCommandAsync("execute as @e[type=a:move_help,tag=spikesummoner,c=1] at @s run event entity @s instant_despawn");
					startTick = undefined;
				}
			})
		}
    }
}

export default command