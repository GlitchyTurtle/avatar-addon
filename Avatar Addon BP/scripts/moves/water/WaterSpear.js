import { World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Water Spear',
    description: 'Shoots a focused beam of water that does damage and knockback.',
    style: 'water',
    unlockable: 0,
    unlockable_for_avatar: 21,
    cooldown: 'super_fast',
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound mob.turtle.swim @a[r=3] ~ ~ ~ 0.9 1");
        for (let i = 1; i < 15; i++) {
	        player.runCommandAsync(`particle a:water_blast ^^1^${i/2}`);
        }
        try { player.runCommandAsync(`execute as @s positioned ^^^7 run damage @e[r=6,type=!item,name=!${player.name}] ${Math.ceil(Math.min(getScore("level", player)/4, 16))+2} none entity @s`); } catch (error) {}
        player.runCommandAsync(`particle a:water_blast_pop ^^1^7.2`);
    }
}

export default command