import { World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Fire Shockwave',
    description: 'Explodes out a shockwave of powerful fire that does damage.',
    style: 'fire',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound random.explode @a[r=3]");
        player.runCommand("particle a:fire_shockwave");
        try { player.runCommand(`damage @e[r=10,rm=1] ${Math.ceil(Math.min(getScore("level", player)/4, 18))} none entity @s`); } catch (error) {}
    }
}

export default command