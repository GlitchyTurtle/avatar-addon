import { world, World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Air Tornado',
    description: 'Summon out a blade of air that you can steer by moving left and right.',
    style: 'air',
    unlockable: 10,
    unlockable_for_avatar: 10,
    cooldown: 'slow',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.shulker.shoot @a[r=3]");
        player.runCommandAsync("summon a:move_help ^ ^1 ^2");
        player.runCommandAsync("tag @e[c=1,r=13,type=a:move_help] add tornado");
        let bladeTick = world.events.tick.subscribe(event => {
	        if (!startTick) startTick = event.currentTick;
            try {
                player.runCommandAsync(`execute as @e[type=a:move_help,tag=tornado,c=1] at @s run tp @s ^^^-1 facing @p[name="${player.name}"]`);
                player.runCommandAsync(`execute as @e[type=a:move_help,tag=tornado,c=1] at @s run particle a:air_tornado`);
                player.runCommandAsync(`execute as @e[type=a:move_help,tag=tornado,c=1] at @s run execute as @e[r=16,name=!"${player.name}",tag=!tornado] at @s run tp @s ^ ^ ^1 facing @e[r=16,type=a:move_help,tag=tornado,c=1]`);
                player.runCommandAsync(`execute as @e[type=a:move_help,tag=tornado,c=1] at @s run damage @e[r=5,type=!a:move_help,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 4))} none entity @s`); 
            } catch (error) {}
            if (event.currentTick - startTick > 40) {
                world.events.tick.unsubscribe(bladeTick);
                player.runCommandAsync(`execute as @e[type=a:move_help,tag=tornado,c=1] at @s run event entity @s instant_despawn`);
                startTick = undefined;
            }
        })
    }
}

export default command