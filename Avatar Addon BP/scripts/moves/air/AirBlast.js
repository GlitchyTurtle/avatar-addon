import { getScore } from "./../../util.js";

const command = {
    name: 'Air Blast',
    description: 'Shoots a focused beam of air that does damage and knockback.',
    style: 'air',
    unlockable: 0,
    unlockable_for_avatar: 0,
	cooldown: 'super_fast',
    execute(player) {
        player.runCommandAsync("playsound firework.blast @a[r=3]");
        for (let i = 1; i < 15; i++) {
            try {
	            player.runCommandAsync(`particle a:air_blast ^^1^${i/2}`);
        	    player.runCommandAsync(`execute as @s positioned ^^^${i/2} run execute as @e[r=2,name=!"${player.name}"] at @s run tp @s ^^^-0.5 facing @p[name="${player.name}"]`);
	        } catch (error) {}
        }
        try { player.runCommandAsync(`execute as @s positioned ^^^7 run damage @e[r=3,type=!item,name=!"${player.name}"] ${Math.ceil(Math.min(getScore("level", player)/4, 16))+2} none entity @s`); } catch (error) {}
        player.runCommandAsync(`particle a:air_blast_pop ^^1^7.2`);
    }
}

export default command