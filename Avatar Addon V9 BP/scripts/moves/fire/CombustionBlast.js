import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Combustion Blast',
    description: 'Shoots out a beam that explodes when it hits either players or blocks!',
    style: 'fire',
    unlockable: 0,
    sub_bending_required: 'combustion',
    execute(player) {
        player.addTag("selfsense");
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound firework.blast @a[r=3]");
        for (let i = 1; i < 255; i++) {
            try {
		player.runCommand(`particle a:combustion_blast ^^1.5^${i/2}`);
		try { player.runCommand(`execute @s ^^1.5^${i/2} detect ~~~ air 0 testfor @s`); } catch (error) { return onhit(player, i); }
		player.runCommand(`execute @s ^^1.5^${i/2} execute @e[r=3,tag=!selfsense] ~~~ testfor @s`);
		return onhit(player, i);
	} catch (error) {}
        }
        player.removeTag("selfsense");
    }
}

export default command

function onhit(player, i) {
	player.runCommand(`summon a:explosion ^^1.5^${i/2}`);
	try { player.runCommand(`execute @s ^^^${i/2} damage @e[r=4] ${Math.ceil(Math.min(getScore("level", player)/4, 16))+2} none entity @s`); } catch (error) {}
	try { player.runCommand(`execute @s ^^^${i/2} damage @e[r=1] ${Math.ceil(getScore("level", player)/4)} none entity @s`); } catch (error) {}
}