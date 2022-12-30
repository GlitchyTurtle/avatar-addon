import { getScore, checkItemAmount } from "./../../util.js";

const command = {
    name: 'Metal Blast',
    description: 'Shoots a focused beam of metal that does damage (with no max damage cap) and knockback, as long as you have more than 4 iron in your inventory. Almost no cooldown because it consumes iron instead!',
    style: 'earth',
    unlockable: 25,
    unlockable_for_avatar: 60,
    cooldown: 'super_fast',
    sub_bending_required: 'metal',
    execute(player) {
		player.runCommandAsync("scoreboard players set @s cooldown1 0");
        if (checkItemAmount(player, 'minecraft:iron_ingot') < 2) {
            player.runCommandAsync(`tellraw @s {"rawtext":[{"text":"§cYou don't have 2+ iron ingots to expend for this."}]}`);
            return;
        }
		player.runCommandAsync("clear @s iron_ingot -1 2");
        player.runCommandAsync("playsound firework.blast @a[r=3]");
        for (let i = 1; i < 15; i++) {
            try {
	            player.runCommandAsync(`particle a:metal_blast ^^1^${i/2}`);
        	    player.runCommandAsync(`execute as @s positioned ^^^${i/2} run execute as @e[r=2,type=!item,name=!${player.name}] at @s run tp @s ^^^-0.5 facing @p[name=${player.name}]`);
	        } catch (error) {}
        }
        try { player.runCommandAsync(`execute as @s positioned ^^^7 run damage @e[r=3,type=!item,name=!${player.name}] ${Math.ceil(Math.min(getScore("level", player)/4, 100))} none entity @s`); } catch (error) {}
    }
}

export default command