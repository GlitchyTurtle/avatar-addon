import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Fire Finder',
    description: 'Shoots a blast of fire that locks on to the closest entity, and does damage on impact!',
    style: 'fire',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.shulker.shoot @a[r=3]");
        player.addTag("controllerfirefinder");
        player.runCommand("summon a:move_help ^ ^1 ^2");
        player.runCommand("tag @e[c=1,r=13,type=a:move_help] add fireseeking");
        let finderTick = world.events.tick.subscribe(event => {
	if (!startTick) startTick = event.currentTick;
            try {
				player.runCommand("execute @e[type=a:move_help,tag=fireseeking,c=1] ~~~ particle minecraft:large_explosion ~ ~1 ~");
				player.runCommand("execute @e[type=a:move_help,tag=fireseeking,c=1] ~~~ particle minecraft:mobflame_single ~ ~1 ~"); 
                player.runCommand("execute @e[type=a:move_help,tag=fireseeking,c=1] ~~~ tp @s ^ ^ ^1.5 facing @e[r=100,type=!a:move_help,tag=!controllerfirefinder,c=1,type=!item]");
                player.runCommand("execute @e[type=a:move_help,tag=fireseeking,c=1] ~~~ execute @e[r=2,tag=!controllerfirefinder,type=!a:move_help,type=!item] ~ ~ ~ summon a:explosion_low");
                player.runCommand("execute @e[type=a:move_help,tag=fireseeking,c=1] ~~~ event entity @s instant_despawn");
	} catch (error) {}
            if (event.currentTick - startTick > 40) {
	    world.events.tick.unsubscribe(finderTick);
	    try { player.runCommand("execute @e[type=a:move_help,tag=fireseeking,c=1] ~~~ event entity @s instant_despawn"); } catch (error) {}
	    player.removeTag("controllerfirefinder");
	    startTick = undefined;
	}
        })
    }
}

export default command