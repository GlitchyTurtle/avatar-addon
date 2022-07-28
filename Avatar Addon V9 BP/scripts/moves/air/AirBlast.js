import { World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Air Blast',
    description: 'Shoots a focused beam of air that does damage and knockback.',
    style: 'air',
    unlockable: 0,
    execute(player) {
        player.addTag("selfshove");
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound firework.blast @a[r=3]");
        for (let i = 1; i < 15; i++) {
            try {
	    player.runCommand(`particle a:air_blast ^^1^${i/2}`);
        	    player.runCommand(`execute @s ^^^${i/2} execute @e[r=2,tag=!selfshove] ~~~ tp @s ^^^-0.5 facing @p[tag=selfshove]`);
	} catch (error) {}
        }
        try { player.runCommand(`execute @s ^^^7 damage @e[r=3] ${Math.ceil(Math.min(getScore("level", player)/4, 16))+2} none entity @s`); } catch (error) {}
        player.removeTag("selfshove");
        player.runCommand(`particle a:air_blast_pop ^^1^7.2`);
    }
}

export default command