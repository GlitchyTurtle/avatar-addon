import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Air Blade',
    description: 'Summon out a blade of air that you can steer by moving left and right.',
    style: 'air',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.shulker.shoot @a[r=3]");
        player.addTag("controllernado");
        player.runCommand("summon a:move_help ^ ^1 ^2");
        player.runCommand("tag @e[c=1,r=13,type=a:move_help] add tornado");
        let bladeTick = world.events.tick.subscribe(event => {
	if (!startTick) startTick = event.currentTick;
            try {
	    player.runCommand("execute @e[type=a:move_help,tag=tornado,c=1] ~~~ tp @s ^^^-1 facing @p[tag=controllernado]");
                player.runCommand("execute @e[type=a:move_help,tag=tornado,c=1] ~~~ particle a:air_tornado");
                player.runCommand("execute @e[type=a:move_help,tag=tornado,c=1] ~~~ execute @e[r=10,tag=!controllernado,tag=!tornado] ~ ~ ~ tp @s ^ ^ ^0.5 facing @e[r=16,type=a:move_help,tag=tornado,c=1]");
	    player.runCommand(`execute @e[type=a:move_help,tag=tornado,c=1] ~~~ damage @e[r=5,rm=0.5,tag=!controllernado] ${Math.ceil(Math.min(getScore("level", player)/4, 4))} none entity @s`); 
	} catch (error) {}
            if (event.currentTick - startTick > 40) {
	    world.events.tick.unsubscribe(bladeTick);
	    player.runCommand("execute @e[type=a:move_help,tag=tornado,c=1] ~~~ event entity @s instant_despawn");
	    player.removeTag("controllernado");
	    startTick = undefined;
	}
        })
    }
}

export default command