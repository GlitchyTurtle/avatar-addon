import { World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Water Wake',
    description: 'Shoot youself over 5 blocks to the left side to dodge other moves.',
    style: 'water',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.fox.spit @a[r=3]");
        for (let i = 1; i < 20; i++) {
	try { 
	    player.runCommand(`execute @s ~ ~ ~ tp @s ^0.2^^ true`);
	    player.runCommand(`execute @s ~ ~ ~ particle a:water_dodge ~ ~ ~`);
	} catch (error) {}
        }
    }
}

export default command