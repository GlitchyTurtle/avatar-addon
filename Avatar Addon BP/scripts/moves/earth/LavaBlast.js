import { checkItemAmount } from "./../../util.js";

const command = {
    name: 'Lava Blast',
    description: 'Shoots a focused beam of magma, as long as you have more than 8 dirt in your inventory. Almost no cooldown because it consumes dirt to convert to lava!',
    style: 'earth',
    unlockable: 20,
    unlockable_for_avatar: 0,
    cooldown: 'super_fast',
    sub_bending_required: 'lava',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        if (checkItemAmount(player, 'minecraft:dirt') < 8) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou don't have 8+ dirt to expend for this."}]}`);
            return;
        }
		player.runCommandAsync("clear @s dirt -1 8");
        player.runCommandAsync("playsound firework.blast @a[r=3]");
        for (let i = 1; i < 15; i++) {
            try {
				player.runCommandAsync(`particle minecraft:lava_drip_particle ^^1^${i/2}`);
			} catch (error) {}
        }
        try { player.runCommandAsync(`setblock ^^1^7 lava 0 keep`); } catch (error) {}
    }
}

export default command