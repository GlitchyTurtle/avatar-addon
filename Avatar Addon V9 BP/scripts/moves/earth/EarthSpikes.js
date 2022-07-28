import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Earth Spikes',
    description: 'Summons spikes in a line out from the player, which can be steered by moving.',
    style: 'earth',
    unlockable: 0,
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 0");
		if (getScore("ground", player) === 1) {
			player.runCommand("playsound dig.grass @a[r=10]");
			player.addTag("controllerspike");
			player.runCommand("summon a:move_help ^ ^1 ^2");
	        player.runCommand("tag @e[c=1,r=14,type=a:move_help] add spikesummoner");
			let earthSpikesTick = world.events.tick.subscribe(event => {
				if (!startTick) startTick = event.currentTick;
		        try {
					player.runCommand("execute @e[type=a:move_help,tag=spikesummoner,c=1] ~~~ tp @s ^^^-1 facing @p[tag=controllerspike]");
					player.runCommand(`execute @e[type=a:move_help,tag=spikesummoner,c=1] ~~~ tp @s ~~-1~ true`);
				} catch (error) {}
				player.runCommand(`execute @e[type=a:move_help,tag=spikesummoner,c=1] ~~~ summon evocation_fang ~~~`);
				if (event.currentTick - startTick > 20) {
					world.events.tick.unsubscribe(earthSpikesTick);
					player.runCommand("execute @e[type=a:move_help,tag=spikesummoner,c=1] ~~~ event entity @s instant_despawn");
					player.removeTag("controllerspike");
					startTick = undefined;
				}
			})
		}
    }
}

export default command