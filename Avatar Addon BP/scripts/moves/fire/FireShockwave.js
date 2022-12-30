import { World } from '@minecraft/server'
import commands from '../import.js';
import { getScore } from "./../../util.js";

const command = {
    name: 'Fire Shockwave',
    description: 'Explodes out a shockwave of powerful fire that does damage.',
    style: 'fire',
    unlockable: 7,
    unlockable_for_avatar: 68,
    execute(player) {
        player.runCommandAsync("scoreboard players set @s cooldown1 0");
        player.runCommandAsync("playsound random.explode @a[r=3]");
        if (getScore("level", player) < 100) {
            player.runCommandAsync("particle a:fire_shockwave");
            try { player.runCommandAsync(`damage @e[r=10,type=!item,name=!${player.name}] ${Math.ceil(Math.min(getScore("level", player)/4, 18))} none entity @s`); } catch (error) {}
        } else {
            player.runCommandAsync("particle a:fire_blue_shockwave");
            try { player.runCommandAsync(`damage @e[r=10,type=!item,name=!${player.name}] ${Math.ceil(Math.min(getScore("level", player)/4, 100))} none entity @s`); } catch (error) {}
        }
    }
}

export default command