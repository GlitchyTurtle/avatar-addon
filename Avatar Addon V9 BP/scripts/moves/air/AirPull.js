import { World } from 'mojang-minecraft'
import commands from '../import.js';

const world = World;

const command = {
    name: 'Air Pull',
    description: 'The opposite of air push, pulls all nearby entities close to you with strong winds - from up to 20 blocks away!',
    style: 'air',
    unlockable: 0,
    execute(player) {
        player.addTag("selfpull");
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("particle a:air_pull ~~~");
        player.runCommand("playsound mob.blaze.shoot @a[r=10]");
        for (let i = 1; i < 20; i++) {
	try { 
	    player.runCommand("execute @e[r=20,tag=!selfpull] ~ ~ ~ tp @s ^ ^ ^0.5 facing @p[tag=selfpull]")
	    player.runCommand("execute @e[r=20,tag=!selfpull] ~ ~ ~ particle minecraft:egg_destroy_emitter ~ ~ ~")
	} catch (error) {}
        }
        player.removeTag("selfpull");
        try { player.runCommand(`damage @e[r=5,rm=0.5] ${Math.ceil(Math.min(getScore("level", player)/4, 8))} none entity @s`); } catch (error) {}
    }
}

export default command