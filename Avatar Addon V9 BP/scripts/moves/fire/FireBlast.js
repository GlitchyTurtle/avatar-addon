import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Fire Blast',
    description: 'Shoots fire 10 blocks in front of you!',
    style: 'fire',
    unlockable: 0,
    execute(player) {
		player.addTag("selfshove");
        player.runCommand("scoreboard players set @s cooldown1 0");
		player.runCommand("playsound firework.blast @a[r=3]");
        for (let i = 1; i < 15; i++) {
            try {
				player.runCommand(`particle a:fire_blast ^^1^${i/2}`);
				player.runCommand(`particle a:fire_blast ^^${1 + i/20}^${i/2}`);
				player.runCommand(`particle a:fire_blast ^^${1 - i/20}^${i/2}`);
				player.runCommand(`particle a:fire_blast ^-${i/20}^1^${i/2}`);
				player.runCommand(`particle a:fire_blast ^${i/20}^1^${i/2}`);
        	    player.runCommand(`execute @s ^^^${i/2} execute @e[r=2,tag=!selfshove] ~~~ tp @s ^^^-0.5 facing @p[tag=selfshove] true`);
			} catch (error) {}
        }
		try { player.runCommand(`execute @s ^^^7 damage @e[r=3] ${Math.ceil(Math.min(getScore("level", player)/4, 19))} none entity @s`); } catch (error) {}
		player.removeTag("selfshove");
    }
}

export default command