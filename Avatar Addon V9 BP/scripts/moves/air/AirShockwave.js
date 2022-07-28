import { World } from 'mojang-minecraft'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Air Shockwave',
    description: 'Explodes out a shockwave of powerful air that does damage.',
    style: 'air',
    unlockable: 0,
    execute(player) {
        player.runCommand("scoreboard players set @s cooldown1 0");
        player.runCommand("playsound random.explode @a[r=3]");
        player.runCommand("particle a:air_puff");
        try { player.runCommand(`damage @e[r=10,rm=0.5] ${Math.ceil(Math.min(getScore("level", player)/4, 10))} none entity @s`); } catch (error) {}
    }
}

export default command