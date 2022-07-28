import { world, World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

let startTick;

const command = {
    name: 'Fire Finale',
    description: 'Punch a massive combustive impact into the ground, killing you and all nearby entities, but with a five second fuse!',
    style: 'fire',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound mob.shulker.shoot @a[r=3]");
        player.runCommand("summon a:explosion_massive");
        player.runCommand("particle a:fire_last_ditch ~~~");
    }
}

export default command