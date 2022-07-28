import { World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Metal Blast',
    description: 'Shoots a focused beam of metal that does damage (with no max damage cap) and knockback, as long as you have more than 4 iron in your inventory. Almost no cooldown because it consumes iron instead!',
    style: 'earth',
    unlockable: 25,
    sub_bending_required: 'metal',
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 80");
        try { player.runCommand("testfor @s[hasitem={item=iron_ingot,quantity=4..}]"); } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou don't have 4+ iron to expend for this."}]}`); return; }
		player.runCommand("clear @s iron_ingot -1 4");
        player.addTag("selfshove");
        player.runCommand("playsound firework.blast @a[r=3]");
        for (let i = 1; i < 15; i++) {
            try {
	    player.runCommand(`particle a:metal_blast ^^1^${i/2}`);
        	    player.runCommand(`execute @s ^^^${i/2} execute @e[r=2,tag=!selfshove] ~~~ tp @s ^^^-0.5 facing @p[tag=selfshove]`);
	} catch (error) {}
        }
        try { player.runCommand(`execute @s ^^^7 damage @e[r=3] ${Math.ceil(Math.min(getScore("level", player)/4, 100))} none entity @s`); } catch (error) {}
        player.removeTag("selfshove");
    }
}

export default command