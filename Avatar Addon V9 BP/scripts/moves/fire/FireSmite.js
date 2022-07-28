import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Fire Smite',
    description: 'Set all entities near you on fire and do some basic damage!',
    style: 'fire',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.shulker.shoot @a[r=3]");
        try { player.runCommand("execute @e[r=10,rm=0.4] ~~~ setblock ~~~ fire"); } catch (error) {}
        try { player.runCommand("execute @e[r=10,rm=0.4] ~~~ damage @s 5 none"); } catch (error) {}
    }
}

export default command