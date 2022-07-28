import { World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Lava Blast',
    description: 'Shoots a focused beam of magma, as long as you have more than 8 dirt in your inventory. Almost no cooldown because it consumes dirt to convert to lava!',
    style: 'earth',
    unlockable: 20,
    sub_bending_required: 'lava',
    execute(player) {
		player.runCommand("scoreboard players set @s cooldown1 80");
        try { player.runCommand("testfor @s[hasitem={item=dirt,quantity=8..}]"); } catch (error) { player.runCommand(`tellraw @s {"rawtext":[{"text":"§cYou don't have 8+ dirt to expend for this."}]}`); return; }
		player.runCommand("clear @s dirt -1 8");
        player.runCommand("playsound firework.blast @a[r=3]");
        for (let i = 1; i < 15; i++) {
            try {
				player.runCommand(`particle minecraft:lava_drip_particle ^^1^${i/2}`);
			} catch (error) {}
        }
        try { player.runCommand(`execute @s ^^1^7 setblock ~~~ lava 0 keep`); } catch (error) {}
    }
}

export default command